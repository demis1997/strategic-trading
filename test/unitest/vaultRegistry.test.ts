/* eslint-disable @typescript-eslint/require-await */
import { ethers, upgrades } from "hardhat";
import { Contract, ContractFactory, Signer, ContractTransactionResponse } from "ethers";
import { SnapshotRestorer, takeSnapshot } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ERC20Mock, Vault, VaultV2, VaultsRegistry, VaultsRegistryV2 } from "../../types";

import {
    deployVaultsRegistry,
    deployVaultImplementation,
    deployVaultV2Implementation,
    deployERC20,
} from "../../scripts/_helpers/_deployContracts";

import { ZERO_ADDRESS, AMOUNT_1E18, TEST_TIMEOUT } from "../_helpers/constants";
import { getVariableFromEvent } from "./../_helpers/utils";

let snapshot: SnapshotRestorer;

let deployer: Signer;
let nonAuthorized: Signer;
let other1: Signer;
let other2: Signer;
let owner: Signer;

let deployerAddress: string;
let nonAuthorizedAddress: string;
let otherAddress1: string;
let otherAddress2: string;
let ownerAddress: string;
let underlyingTokenAddress: string;

let txResult: ContractTransactionResponse;
let defaultAdminRole: string;

let VaultsRegistryFactory: ContractFactory;
let usdcTokenContract: ERC20Mock;
let vaultsRegistryContract: VaultsRegistry;

let vaultAddress: string;
let vaultContract: Vault;
let vaultImplementation: Vault;
let vaultImplementationAddress: string;
let vaultImplementationV2: VaultV2;
let vaultImplementationV2Address: string;

const DEFAULT_FEE_RATE = ethers.parseEther("10");
const NEW_FEE_RATE = ethers.parseEther("30");

describe("Vaults Registry Tests", function () {
    this.timeout(TEST_TIMEOUT);

    before(async () => {
        [deployer, nonAuthorized, other1, other2, owner] = await ethers.getSigners();
        [deployerAddress, nonAuthorizedAddress, otherAddress1, otherAddress2, ownerAddress] =
            await Promise.all([
                deployer.getAddress(),
                nonAuthorized.getAddress(),
                other1.getAddress(),
                other2.getAddress(),
                owner.getAddress(),
            ]);

        usdcTokenContract = (await deployERC20("USDC", "USDC", 6)) as unknown as ERC20Mock;
        underlyingTokenAddress = await usdcTokenContract.getAddress();

        // first we need an implementation of the users vault contract
        vaultImplementation = (await deployVaultImplementation()) as unknown as Vault;
        vaultImplementationAddress = await vaultImplementation.getAddress();

        // deploy an implementation of VaultV2 to test upgradability
        vaultImplementationV2 = (await deployVaultV2Implementation()) as unknown as VaultV2;
        vaultImplementationV2Address = await vaultImplementationV2.getAddress();

        // get factory of Vault Registry
        VaultsRegistryFactory = await ethers.getContractFactory("VaultsRegistry");
    });

    describe("WHEN trying to deploy Vaults Registry contract with incorrect parameters", function () {
        it("THEN it should FAIL when defaultFeeRate is greater than 100%", async () => {
            await expect(
                upgrades.deployProxy(VaultsRegistryFactory, [
                    AMOUNT_1E18 * 100n + 1n,
                    vaultImplementationAddress,
                ]),
            ).to.be.revertedWithCustomError(VaultsRegistryFactory, "DefaultFeeRateError");
        });

        it("THEN it should FAIL when vaultImplementation is ZERO address", async () => {
            await expect(
                upgrades.deployProxy(VaultsRegistryFactory, [AMOUNT_1E18 * 80n, ZERO_ADDRESS]),
            )
                .to.be.revertedWithCustomError(VaultsRegistryFactory, "ZeroAddress")
                .withArgs("vaultImplementation_");
        });
    });

    describe("WHEN deploying Vaults Registry contract with correct parameters", function () {
        before(async () => {
            vaultsRegistryContract = (await deployVaultsRegistry(
                DEFAULT_FEE_RATE,
                vaultImplementationAddress,
            )) as unknown as VaultsRegistry;

            defaultAdminRole = await vaultsRegistryContract.DEFAULT_ADMIN_ROLE();
            // take a snapshot
            snapshot = await takeSnapshot();
        });

        it("THEN contract init functions should match", async () => {
            const defaultFee = await vaultsRegistryContract.defaultFeeRate();
            expect(defaultFee).equals(ethers.parseEther("10"));
        });

        describe("WHEN trying to set the defaultFeeRate", async () => {
            describe("WHEN calling with invalid caller or parameters", function () {
                describe("WHEN caller is not owner", function () {
                    it("THEN it should fail", async () => {
                        await expect(
                            vaultsRegistryContract
                                .connect(nonAuthorized)
                                .setDefaultFeeRate(DEFAULT_FEE_RATE),
                        )
                            .to.be.revertedWithCustomError(
                                vaultsRegistryContract,
                                "AccessControlUnauthorizedAccount",
                            )
                            .withArgs(nonAuthorizedAddress, defaultAdminRole);
                    });
                });

                describe("WHEN value is invalid", function () {
                    it("THEN it should fail", async () => {
                        await expect(
                            vaultsRegistryContract
                                .connect(deployer)
                                .setDefaultFeeRate(AMOUNT_1E18 * 100n + 1n),
                        ).to.be.revertedWithCustomError(
                            vaultsRegistryContract,
                            "DefaultFeeRateError",
                        );
                    });
                });
            });

            describe("WHEN calling with correct caller and parameter", function () {
                before(async () => {
                    txResult = await vaultsRegistryContract
                        .connect(deployer)
                        .setDefaultFeeRate(NEW_FEE_RATE);
                });
                after(async () => {
                    await snapshot.restore();
                });
                it("THEN new DefaultFeeRate should be stored", async () => {
                    expect(await vaultsRegistryContract.defaultFeeRate()).to.equal(NEW_FEE_RATE);
                });
                it("THEN it should emit an Event", async () => {
                    await expect(txResult)
                        .to.emit(vaultsRegistryContract, "DefaultFeeRateSet")
                        .withArgs(NEW_FEE_RATE);
                });
            });
        });

        describe("WHEN trying to set the vaultImplementation", async () => {
            describe("WHEN calling with invalid caller or parameters", function () {
                describe("WHEN caller is not owner", function () {
                    it("THEN it should fail", async () => {
                        await expect(
                            vaultsRegistryContract
                                .connect(nonAuthorized)
                                .setVaultImplementation(otherAddress1),
                        )
                            .to.be.revertedWithCustomError(
                                vaultsRegistryContract,
                                "AccessControlUnauthorizedAccount",
                            )
                            .withArgs(nonAuthorizedAddress, defaultAdminRole);
                    });
                });

                describe("WHEN value is invalid", function () {
                    it("THEN it should fail", async () => {
                        await expect(
                            vaultsRegistryContract
                                .connect(deployer)
                                .setVaultImplementation(ZERO_ADDRESS),
                        )
                            .to.be.revertedWithCustomError(vaultsRegistryContract, "ZeroAddress")
                            .withArgs("newImplementation_");
                    });
                });

                describe("WHEN new implementation is not a contract", () => {
                    it("THEN it should fail", async () => {
                        // get beacon contract
                        const beaconAddress = await vaultsRegistryContract.getbeaconProxyAddress();
                        const beaconContract = await ethers.getContractAt(
                            "UpgradeableBeacon",
                            beaconAddress,
                        );

                        await expect(
                            vaultsRegistryContract
                                .connect(deployer)
                                .setVaultImplementation(otherAddress1),
                        )
                            .to.be.revertedWithCustomError(
                                beaconContract,
                                "BeaconInvalidImplementation",
                            )
                            .withArgs(otherAddress1);
                    });
                });
            });

            describe("WHEN calling with correct caller and parameter", function () {
                before(async () => {
                    txResult = await vaultsRegistryContract
                        .connect(deployer)
                        .setVaultImplementation(vaultImplementationV2Address);
                });
                after(async () => {
                    await snapshot.restore();
                });

                it("THEN new implementation address should be stored", async () => {
                    expect(await vaultsRegistryContract.getVaultImplementationAddress()).to.equal(
                        vaultImplementationV2Address,
                    );
                });

                it("THEN it should emit an Event", async () => {
                    await expect(txResult)
                        .to.emit(vaultsRegistryContract, "VaultImplementationChanged")
                        .withArgs(vaultImplementationV2Address);
                });

                it("THEN implementation should change", async () => {
                    await expect(txResult)
                        .to.emit(vaultsRegistryContract, "VaultImplementationChanged")
                        .withArgs(vaultImplementationV2Address);
                });
            });
        });

        describe("WHEN trying to setVaultStatus", function () {
            describe("WHEN caller is not authorized", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        const role = await vaultsRegistryContract.DEFAULT_ADMIN_ROLE();

                        // put any parameters, it doesn't matter
                        await expect(
                            vaultsRegistryContract
                                .connect(nonAuthorized)
                                .setVaultStatus(ZERO_ADDRESS, false),
                        )
                            .to.be.revertedWithCustomError(
                                vaultsRegistryContract,
                                "AccessControlUnauthorizedAccount",
                            )
                            .withArgs(nonAuthorizedAddress, role);
                    });
                });
                describe("WHEN address is invalid", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(vaultsRegistryContract.setVaultStatus(ZERO_ADDRESS, false))
                            .to.be.revertedWithCustomError(vaultsRegistryContract, "ZeroAddress")
                            .withArgs("vaultAddress_");
                    });
                });
            });
        });

        describe("WHEN trying to deploy Users Vault", function () {
            after(async () => {
                await snapshot.restore();
            });
            describe("WHEN trying to deploy Users Vault with incorrect parameters", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        const role = await vaultsRegistryContract.DEFAULT_ADMIN_ROLE();

                        // put any parameters, it doesn't matter
                        await expect(
                            vaultsRegistryContract
                                .connect(nonAuthorized)
                                .deployVault(
                                    ZERO_ADDRESS,
                                    deployerAddress,
                                    deployerAddress,
                                    "whyETH Token",
                                    "whyETH",
                                ),
                        )
                            .to.be.revertedWithCustomError(
                                vaultsRegistryContract,
                                "AccessControlUnauthorizedAccount",
                            )
                            .withArgs(nonAuthorizedAddress, role);
                    });
                });
                describe("WHEN underlying token is zero", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            vaultsRegistryContract.deployVault(
                                ZERO_ADDRESS,
                                deployerAddress,
                                deployerAddress,
                                "whyETH Token",
                                "whyETH",
                            ),
                        )
                            .to.be.revertedWithCustomError(vaultsRegistryContract, "ZeroAddress")
                            .withArgs("underlyingTokenAddress_");
                    });
                });
                describe("WHEN master token token is zero", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            vaultsRegistryContract.deployVault(
                                deployerAddress,
                                ZERO_ADDRESS,
                                deployerAddress,
                                "whyETH Token",
                                "whyETH",
                            ),
                        )
                            .to.be.revertedWithCustomError(vaultsRegistryContract, "ZeroAddress")
                            .withArgs("masterTokenAddress_");
                    });
                });
                describe("WHEN owner token is zero", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            vaultsRegistryContract.deployVault(
                                deployerAddress,
                                deployerAddress,
                                ZERO_ADDRESS,
                                "whyETH Token",
                                "whyETH",
                            ),
                        )
                            .to.be.revertedWithCustomError(vaultsRegistryContract, "ZeroAddress")
                            .withArgs("ownerAddress_");
                    });
                });
                describe("WHEN shares name is empty", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            vaultsRegistryContract.deployVault(
                                deployerAddress,
                                deployerAddress,
                                deployerAddress,
                                "",
                                "whyETH",
                            ),
                        ).to.be.revertedWith("Invalid sharesName");
                    });
                });
                describe("WHEN shares symbol is empty", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            vaultsRegistryContract.deployVault(
                                deployerAddress,
                                deployerAddress,
                                deployerAddress,
                                "whyETH Token",
                                "",
                            ),
                        ).to.be.revertedWith("Invalid sharesSymbol");
                    });
                });
            });

            describe("WHEN deploying Users Vault with correct parameters", function () {
                before(async () => {
                    // deploy Users Vault
                    txResult = await vaultsRegistryContract.deployVault(
                        underlyingTokenAddress,
                        otherAddress1, // masterTokenAddress,
                        ownerAddress, //owner
                        "whyETH Shares",
                        "sWhyETH",
                    );
                    const txReceipt = await txResult.wait();

                    // get address from emitted event
                    vaultAddress = await getVariableFromEvent(
                        vaultsRegistryContract as unknown as Contract,
                        "VaultDeployed",
                        txReceipt,
                        0,
                    );
                    // get contract from address
                    vaultContract = await ethers.getContractAt("Vault", vaultAddress);
                });

                it("THEN it should emit an Event", async () => {
                    await expect(txResult)
                        .to.emit(vaultsRegistryContract, "VaultDeployed")
                        .withArgs(vaultAddress);
                });

                it("THEN Vaults Registry contract should store Users Vault address", async () => {
                    expect(await vaultsRegistryContract.validVaults(vaultAddress)).to.be.true;
                });

                it("THEN Users Vault contract init functions should match", async () => {
                    expect(underlyingTokenAddress).equals(await vaultContract.asset());
                    expect(otherAddress1).equals(await vaultContract.masterTokenAddress());
                    expect(await vaultsRegistryContract.getAddress()).equals(
                        await vaultContract.vaultsRegistryAddress(),
                    );
                    expect(await vaultContract.hasRole(defaultAdminRole, ownerAddress)).to.be.true;
                });

                describe("WHEN changing the implementation", function () {
                    let newVaultContract: VaultV2;

                    before(async () => {
                        // change some values to test storage later
                        await vaultContract.connect(owner).setMasterTokenAddress(otherAddress2);
                        await vaultContract
                            .connect(owner)
                            .setWithdrawStrategyAddress(otherAddress2);

                        // make sure current implementation is correct
                        expect(await vaultsRegistryContract.getVaultImplementationAddress()).equals(
                            vaultImplementationAddress,
                        );

                        // change implementation on registry
                        await vaultsRegistryContract
                            .connect(deployer)
                            .setVaultImplementation(vaultImplementationV2Address);

                        // make sure new implementation is now stored
                        expect(await vaultsRegistryContract.getVaultImplementationAddress()).equals(
                            vaultImplementationV2Address,
                        );
                    });

                    it("THEN new function and storage should exists in upgraded contract", async () => {
                        const VaultV2Factory = await ethers.getContractFactory("VaultV2");
                        newVaultContract = VaultV2Factory.attach(vaultAddress) as VaultV2;
                    });

                    it("THEN new function and storage should exists in upgraded contract", async () => {
                        await newVaultContract.addedMethodVaultV2(DEFAULT_FEE_RATE);
                        expect(await newVaultContract.addedVariableVaultV2()).to.equal(
                            DEFAULT_FEE_RATE,
                        );
                    });

                    it("THEN Vault previous values should remain intact", async () => {
                        expect(await newVaultContract.asset()).to.equal(underlyingTokenAddress);
                        expect(await newVaultContract.vaultsRegistryAddress()).to.equal(
                            await vaultsRegistryContract.getAddress(),
                        );
                        expect(await newVaultContract.masterTokenAddress()).to.equal(otherAddress2);
                        expect(await newVaultContract.withdrawStrategyAddress()).to.equal(
                            otherAddress2,
                        );
                    });
                });
            });
        });

        describe("WHEN trying to upgrade Vaults Registry", function () {
            let vaultsRegistryV2Contract: VaultsRegistryV2;
            let vaultAddress1: string;
            let vaultAddress2: string;

            before(async () => {
                // change fee to test storage
                await vaultsRegistryContract.connect(deployer).setDefaultFeeRate(NEW_FEE_RATE);

                // deploy two vault to store in mapping
                txResult = await vaultsRegistryContract.deployVault(
                    underlyingTokenAddress,
                    otherAddress1, // masterTokenAddress,
                    deployerAddress, //owner
                    "token1",
                    "tkn1",
                );
                const txReceipt1 = await txResult.wait();
                // get address from emitted event
                vaultAddress1 = await getVariableFromEvent(
                    vaultsRegistryContract as unknown as Contract,
                    "VaultDeployed",
                    txReceipt1,
                    0,
                );

                txResult = await vaultsRegistryContract.deployVault(
                    underlyingTokenAddress,
                    otherAddress2, // masterTokenAddress,
                    deployerAddress, //owner
                    "token2",
                    "tkn2",
                );
                const txReceipt2 = await txResult.wait();
                // get address from emitted event
                vaultAddress2 = await getVariableFromEvent(
                    vaultsRegistryContract as unknown as Contract,
                    "VaultDeployed",
                    txReceipt2,
                    0,
                );

                // set Vault1 to not active
                await vaultsRegistryContract.setVaultStatus(vaultAddress1, false);

                // upgrade the contract
                const VaultsRegistryV2Factory = await ethers.getContractFactory("VaultsRegistryV2");
                vaultsRegistryV2Contract = (await upgrades.upgradeProxy(
                    await vaultsRegistryContract.getAddress(),
                    VaultsRegistryV2Factory,
                )) as unknown as VaultsRegistryV2;
                await vaultsRegistryV2Contract.waitForDeployment();
            });

            it("THEN Vaults Registry previous values should remain intact", async () => {
                expect(await vaultsRegistryV2Contract.validVaults(vaultAddress1)).to.be.false;
                expect(await vaultsRegistryV2Contract.validVaults(vaultAddress2)).to.be.true;
            });

            it("THEN DefaultFeeRate should remain intact", async () => {
                expect(await vaultsRegistryV2Contract.defaultFeeRate()).to.equal(NEW_FEE_RATE);
            });

            it("THEN new function and storage should exists in upgraded contract", async () => {
                await vaultsRegistryV2Contract.addedMethodRegistryV2(DEFAULT_FEE_RATE);

                expect(await vaultsRegistryV2Contract.addedVariableRegistryV2()).to.equal(
                    DEFAULT_FEE_RATE,
                );
            });
        });
    });
});
