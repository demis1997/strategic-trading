/* eslint-disable @typescript-eslint/require-await */
import { ethers } from "hardhat";
import { Contract, Signer, ContractTransactionResponse } from "ethers";
import { SnapshotRestorer, takeSnapshot } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import * as chai from "chai";
import {
    MasterTokenMock,
    ERC20Mock,
    VaultsRegistry,
    Vault,
    AdapterMock,
    ProtocolMock,
    DepositStrategyMock,
} from "../../types";

import {
    deployVaultsRegistry,
    deployVaultImplementation,
    deployProtocolMock,
    deployMockAdapter,
    deployERC20,
    deployMasterTokenMock,
} from "../../scripts/_helpers/_deployContracts";

import { configVault } from "../../scripts/_helpers/_configContracts";

import { ZERO_ADDRESS, AMOUNT_1E18, TEST_TIMEOUT, ZERO_AMOUNT } from "../_helpers/constants";
import { getVariableFromEvent } from "./../_helpers/utils";

let baseSnapshot: SnapshotRestorer;

let deployer: Signer;
let nonAuthorized: Signer;
let user1: Signer;
let user2: Signer;
let user3: Signer;

let deployerAddress: string;
let nonAuthorizedAddress: string;
let user1Address: string;
let user2Address: string;
let user3Address: string;
let masterTokenAddress: string;
let underlyingTokenAddress: string;
let liquidRSTokenContractAddress: string;

let txResult: ContractTransactionResponse;

let masterTokenContract: MasterTokenMock;
let wethTokenContract: ERC20Mock;
let liquidRSTokenContract: ERC20Mock;

let vaultsRegistryContract: VaultsRegistry;

let vaultContract: Vault;
let vaultAddress: string;
let vaultImplementation: Vault;
let vaultImplementationAddress: string;

let protocolContractLRS: ProtocolMock;
let protocolContractLRSAddress: string;

let adapterLRSContract: AdapterMock;
let adapterLRSContractAddress: string;

let strategyContract: DepositStrategyMock;
let strategyContractAddress: string;

const DEFAULT_FEE_RATE: bigint = ethers.parseEther("10");
const INITIAL_MINT: bigint = ethers.parseEther("100");
const INITIAL_VALUATION: bigint = ethers.parseEther("20");

describe("Vaults Tests", function () {
    this.timeout(TEST_TIMEOUT);

    before(async () => {
        [deployer, nonAuthorized, user1, user2, user3] = await ethers.getSigners();
        [deployerAddress, nonAuthorizedAddress, user1Address, user2Address, user3Address] =
            await Promise.all([
                deployer.getAddress(),
                nonAuthorized.getAddress(),
                user1.getAddress(),
                user2.getAddress(),
                user3.getAddress(),
            ]);

        // first we need an implementation of the users vault contract
        vaultImplementation = (await deployVaultImplementation()) as unknown as Vault;
        vaultImplementationAddress = await vaultImplementation.getAddress();

        // deploy VaultsRegistry
        vaultsRegistryContract = (await deployVaultsRegistry(
            DEFAULT_FEE_RATE,
            vaultImplementationAddress,
        )) as unknown as VaultsRegistry;

        masterTokenContract = (await deployMasterTokenMock(
            "MasterTokenMock",
            await vaultsRegistryContract.getAddress(),
            "LYS",
            "LYS",
            BigInt(18),
        )) as unknown as MasterTokenMock;
        masterTokenAddress = await masterTokenContract.getAddress();

        // deploy token contract as underlying
        wethTokenContract = (await deployERC20("WETH", "WETH", 18)) as unknown as ERC20Mock;
        underlyingTokenAddress = await wethTokenContract.getAddress();

        // deploy token contract as liquidToken
        await deployERC20("LT", "LT", 18);

        // deploy token contract as restaking liquidToken
        liquidRSTokenContract = (await deployERC20("LRT", "LRT", 18)) as unknown as ERC20Mock;
        liquidRSTokenContractAddress = await liquidRSTokenContract.getAddress();

        // MINT underlying for users and deployer
        await wethTokenContract.mint(deployerAddress, INITIAL_MINT);
        await wethTokenContract.mint(user1Address, INITIAL_MINT);
        await wethTokenContract.mint(user2Address, INITIAL_MINT);
        await wethTokenContract.mint(user3Address, INITIAL_MINT);

        // deploy Vault
        txResult = await vaultsRegistryContract.deployVault(
            underlyingTokenAddress,
            masterTokenAddress, // masterTokenAddress,
            deployerAddress, //owner
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

        // set weth address in master token
        await masterTokenContract.setAssetAddress(underlyingTokenAddress);

        //protocol mock
        protocolContractLRS = (await deployProtocolMock(
            "ProtocolMock",
            "Staking Protocol",
            underlyingTokenAddress,
            liquidRSTokenContractAddress,
        )) as unknown as ProtocolMock;
        protocolContractLRSAddress = await protocolContractLRS.getAddress();

        // MINT liquidTokens to protocols
        await liquidRSTokenContract.mint(protocolContractLRSAddress, INITIAL_MINT);

        // MINT WETH to last protocol to withdraw
        await wethTokenContract.mint(protocolContractLRSAddress, INITIAL_MINT);

        // deploy adapter for re-staking protocol mock
        adapterLRSContract = (await deployMockAdapter(
            "AdapterMock",
            protocolContractLRSAddress,
        )) as unknown as AdapterMock;
        adapterLRSContractAddress = await adapterLRSContract.getAddress();

        // deploy mock strategy
        const StrategyContractFactory = await ethers.getContractFactory("DepositStrategyMock");
        strategyContract = (await StrategyContractFactory.deploy(
            vaultAddress,
        )) as unknown as DepositStrategyMock;
        await strategyContract.waitForDeployment();
        strategyContractAddress = await strategyContract.getAddress();

        // await configVault(vaultAddress, strategyContractAddress, strategyContractAddress);

        // set live valuation to true
        await vaultContract.setLiveValuation(true, 0);
        await vaultContract.setLiveValuation(true, 1);

        // give deployer and vault the vault manager role
        let roleToAssign = await vaultContract.VAULT_MANAGER_ROLE();
        await vaultContract.grantRole(roleToAssign, deployerAddress);
        await vaultContract.grantRole(roleToAssign, masterTokenAddress);

        // give master token and deployer the role on vault
        roleToAssign = await vaultContract.MASTER_TOKEN_ROLE();
        await vaultContract.grantRole(roleToAssign, masterTokenAddress);
        await vaultContract.grantRole(roleToAssign, deployerAddress);

        // give vault and deployer admin role on strategy
        roleToAssign = await strategyContract.DEFAULT_ADMIN_ROLE();
        await strategyContract.grantRole(roleToAssign, vaultAddress);
        await strategyContract.grantRole(roleToAssign, deployerAddress);

        // give strategy manager role on adapter
        roleToAssign = await adapterLRSContract.VAULT_STRATEGY_ROLE();
        await adapterLRSContract.grantRole(roleToAssign, strategyContractAddress);

        // give adapters admin role on protocols
        roleToAssign = await protocolContractLRS.DEFAULT_ADMIN_ROLE();
        await protocolContractLRS.grantRole(roleToAssign, adapterLRSContractAddress);

        // give users admin role on master token
        roleToAssign = await masterTokenContract.DEFAULT_ADMIN_ROLE();
        await masterTokenContract.grantRole(roleToAssign, user1Address);
        await masterTokenContract.grantRole(roleToAssign, user2Address);
        await masterTokenContract.grantRole(roleToAssign, deployerAddress);

        // take a baseSnapshot
        baseSnapshot = await takeSnapshot();
    });

    describe("WHEN trying to mint directly", function () {
        it("THEN it should revert", async () => {
            // put any parameters, it doesn't matter
            await expect(vaultContract.mint(1n, user1Address)).to.be.revertedWith(
                "Function not allowed",
            );
        });
    });

    describe("WHEN sending ethers to contract", function () {
        after(async () => {
            await baseSnapshot.restore();
        });
        it("THEN contract balance should update", async () => {
            await deployer.sendTransaction({
                to: vaultAddress,
                value: ethers.parseEther("1"),
            });

            const balance = await deployer.provider?.getBalance(vaultAddress);
            expect(balance).equals(ethers.parseEther("1"));
        });
    });

    describe("WHEN trying to setVaultStrategyAddress", function () {
        describe("WHEN executing with wrong context", function () {
            describe("WHEN caller is not authorized", function () {
                it("THEN it should fail", async () => {
                    // put any parameters, it doesn't matter
                    await expect(
                        vaultContract.connect(nonAuthorized).setVaultStrategyAddress(user1Address),
                    ).to.be.revertedWithCustomError(
                        vaultContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });
            describe("WHEN address is zero", function () {
                it("THEN it should fail", async () => {
                    await expect(vaultContract.setVaultStrategyAddress(ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                        .withArgs("vaultStrategyAddress_");
                });
            });
        });

        describe("WHEN executing with right context", function () {
            let anyAddress: string;

            before(async () => {
                anyAddress = user1Address;
                txResult = await vaultContract
                    .connect(deployer)
                    .setVaultStrategyAddress(anyAddress);
            });

            it("THEN it should update state variable vaultStrategyAddress", async () => {
                const newAddress = await vaultContract.vaultStrategyAddress();
                expect(newAddress).equals(anyAddress);
            });

            it("THEN it should emit an Event", async () => {
                await expect(txResult)
                    .to.emit(vaultContract, "VaultStrategyAddressSet")
                    .withArgs(anyAddress);
            });

            after(async () => {
                await baseSnapshot.restore();
            });
        });
    });

    describe("WHEN trying to setWithdrawStrategyAddress", function () {
        describe("WHEN executing with wrong context", function () {
            describe("WHEN caller is not authorized", function () {
                it("THEN it should fail", async () => {
                    // put any parameters, it doesn't matter
                    await expect(
                        vaultContract
                            .connect(nonAuthorized)
                            .setWithdrawStrategyAddress(user1Address),
                    ).to.be.revertedWithCustomError(
                        vaultContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });
            describe("WHEN address is zero", function () {
                it("THEN it should fail", async () => {
                    await expect(vaultContract.setWithdrawStrategyAddress(ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                        .withArgs("withdrawStrategyAddress_");
                });
            });
        });

        describe("WHEN executing with right context", function () {
            let anyAddress: string;

            before(async () => {
                anyAddress = user1Address;
                txResult = await vaultContract
                    .connect(deployer)
                    .setWithdrawStrategyAddress(anyAddress);
            });

            it("THEN it should update state variable withdrawStrategyAddress", async () => {
                const newAddress = await vaultContract.withdrawStrategyAddress();
                expect(newAddress).equals(anyAddress);
            });

            it("THEN it should emit an Event", async () => {
                await expect(txResult)
                    .to.emit(vaultContract, "WithdrawStrategyAddressSet")
                    .withArgs(anyAddress);
            });

            after(async () => {
                await baseSnapshot.restore();
            });
        });
    });

    describe("WHEN trying to setMasterTokenAddress", function () {
        describe("WHEN executing with wrong context", function () {
            describe("WHEN caller is not authorized", function () {
                it("THEN it should fail", async () => {
                    // put any parameters, it doesn't matter
                    await expect(
                        vaultContract.connect(nonAuthorized).setMasterTokenAddress(user1Address),
                    ).to.be.revertedWithCustomError(
                        vaultContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });
            describe("WHEN address is zero", function () {
                it("THEN it should fail", async () => {
                    await expect(vaultContract.setMasterTokenAddress(ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                        .withArgs("masterTokenAddress_");
                });
            });
        });

        describe("WHEN executing with right context", function () {
            let anyAddress: string;

            before(async () => {
                anyAddress = user1Address;
                txResult = await vaultContract.connect(deployer).setMasterTokenAddress(anyAddress);
            });

            it("THEN it should update state variable masterTokenAddress", async () => {
                const newAddress = await vaultContract.masterTokenAddress();
                expect(newAddress).equals(anyAddress);
            });

            it("THEN it should emit an Event", async () => {
                await expect(txResult)
                    .to.emit(vaultContract, "MasterTokenAddressSet")
                    .withArgs(anyAddress);
            });

            after(async () => {
                await baseSnapshot.restore();
            });
        });
    });

    describe("WHEN trying to setVaultsRegistryAddress", function () {
        describe("WHEN executing with wrong context", function () {
            describe("WHEN caller is not authorized", function () {
                it("THEN it should fail", async () => {
                    // put any parameters, it doesn't matter
                    await expect(
                        vaultContract.connect(nonAuthorized).setVaultsRegistryAddress(user1Address),
                    ).to.be.revertedWithCustomError(
                        vaultContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });
            describe("WHEN address is zero", function () {
                it("THEN it should fail", async () => {
                    await expect(vaultContract.setVaultsRegistryAddress(ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                        .withArgs("vaultsRegistryAddress_");
                });
            });
        });

        describe("WHEN executing with right context", function () {
            let anyAddress: string;

            before(async () => {
                anyAddress = user1Address;
                txResult = await vaultContract
                    .connect(deployer)
                    .setVaultsRegistryAddress(anyAddress);
            });

            it("THEN it should update state variable vaultsRegistryAddress", async () => {
                const newAddress = await vaultContract.vaultsRegistryAddress();
                expect(newAddress).equals(anyAddress);
            });

            it("THEN it should emit an Event", async () => {
                await expect(txResult)
                    .to.emit(vaultContract, "VaultsRegistryAddressSet")
                    .withArgs(anyAddress);
            });

            after(async () => {
                await baseSnapshot.restore();
            });
        });
    });

    describe("WHEN trying to setLiveValuation", function () {
        describe("WHEN executing with wrong context", function () {
            describe("WHEN caller is not authorized", function () {
                it("THEN it should fail", async () => {
                    // put any parameters, it doesn't matter
                    await expect(
                        vaultContract.connect(nonAuthorized).setLiveValuation(false, 0n),
                    ).to.be.revertedWithCustomError(
                        vaultContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });
            describe("WHEN targe is invalid", function () {
                it("THEN it should fail", async () => {
                    await expect(
                        vaultContract.setLiveValuation(false, 8n),
                    ).to.be.revertedWithCustomError(vaultContract, "InvalidTarget");
                });
            });
        });

        describe("WHEN executing with right context for deposit", function () {
            before(async () => {
                txResult = await vaultContract.connect(deployer).setLiveValuation(true, 0n);
            });
            after(async () => {
                await baseSnapshot.restore();
            });

            it("THEN it should update state variable liveValuationOnDeposit", async () => {
                const liveValuationOnDeposit = await vaultContract.liveValuationOnDeposit();
                expect(liveValuationOnDeposit).to.be.true;
            });

            it("THEN it should emit an Event", async () => {
                await expect(txResult)
                    .to.emit(vaultContract, "LiveValuationSet")
                    .withArgs(true, 0n);
            });
        });
        describe("WHEN executing with right context for withdraw", function () {
            before(async () => {
                txResult = await vaultContract.connect(deployer).setLiveValuation(true, 1n);
            });
            after(async () => {
                await baseSnapshot.restore();
            });

            it("THEN it should update state variable liveValuationOnWithdraw", async () => {
                const liveValuationOnWithdraw = await vaultContract.liveValuationOnWithdraw();
                expect(liveValuationOnWithdraw).to.be.true;
            });

            it("THEN it should emit an Event", async () => {
                await expect(txResult)
                    .to.emit(vaultContract, "LiveValuationSet")
                    .withArgs(true, 1n);
            });
        });
    });

    describe("WHEN trying to setValuationSource", function () {
        describe("WHEN executing with wrong context", function () {
            describe("WHEN caller is not authorized", function () {
                it("THEN it should fail", async () => {
                    // put any parameters, it doesn't matter
                    await expect(
                        vaultContract.connect(nonAuthorized).setValuationSource(1n),
                    ).to.be.revertedWithCustomError(
                        vaultContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });
            describe("WHEN targe is invalid", function () {
                it("THEN it should fail", async () => {
                    await expect(vaultContract.setValuationSource(8n)).to.be.revertedWith(
                        "Invalid valuationSource_",
                    );
                });
            });
        });

        describe("WHEN executing with right context", function () {
            before(async () => {
                txResult = await vaultContract.connect(deployer).setValuationSource(1n);
            });
            after(async () => {
                await baseSnapshot.restore();
            });

            it("THEN it should update state variable valuationSource", async () => {
                const valuationSource_ = await vaultContract.valuationSource();
                expect(valuationSource_).equals(1n);
            });

            it("THEN it should emit an Event", async () => {
                await expect(txResult).to.emit(vaultContract, "ValuationSourceSet").withArgs(1n);
            });
        });
    });

    describe("WHEN trying to pause the contract", function () {
        describe("WHEN executing with wrong context", function () {
            after(async () => {
                await baseSnapshot.restore();
            });
            describe("WHEN caller is not authorized", function () {
                it("THEN it should fail", async () => {
                    // put any parameters, it doesn't matter
                    await expect(
                        vaultContract.connect(nonAuthorized).pause(),
                    ).to.be.revertedWithCustomError(
                        vaultContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });
            describe("WHEN it is already paused", function () {
                it("THEN it should fail", async () => {
                    await vaultContract.pause();

                    await expect(vaultContract.pause()).to.be.revertedWithCustomError(
                        vaultContract,
                        "EnforcedPause",
                    );
                });
            });
        });
        describe("WHEN executing with right context", function () {
            before(async () => {
                txResult = await vaultContract.pause();
            });
            after(async () => {
                await baseSnapshot.restore();
            });

            it("THEN pause state variable should be true", async () => {
                expect(await vaultContract.paused()).to.be.true;
            });
            it("THEN it should emit an Event", async () => {
                await expect(txResult).to.emit(vaultContract, "Paused").withArgs(deployerAddress);
            });
        });
    });

    describe("WHEN trying to unpause the contract", function () {
        describe("WHEN executing with wrong context", function () {
            describe("WHEN caller is not authorized", function () {
                it("THEN it should fail", async () => {
                    await expect(
                        vaultContract.connect(nonAuthorized).unpause(),
                    ).to.be.revertedWithCustomError(
                        vaultContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });
            describe("WHEN is not paused", function () {
                it("THEN it should fail", async () => {
                    await expect(vaultContract.unpause()).to.be.revertedWithCustomError(
                        vaultContract,
                        "ExpectedPause",
                    );
                });
            });
        });

        describe("WHEN executing with right context", function () {
            before(async () => {
                await vaultContract.pause();
                txResult = await vaultContract.unpause();
            });
            after(async () => {
                await baseSnapshot.restore();
            });
            it("THEN pause state variable should be false", async () => {
                expect(await vaultContract.paused()).to.be.false;
            });
            it("THEN it should emit an Event", async () => {
                await expect(txResult).to.emit(vaultContract, "Unpaused").withArgs(deployerAddress);
            });
        });
    });

    describe("WHEN trying to updateVaultValuation", function () {
        describe("WHEN executing with wrong context", function () {
            describe("WHEN caller is not authorized", function () {
                it("THEN it should fail", async () => {
                    // put any parameters, it doesn't matter
                    await expect(
                        vaultContract.connect(nonAuthorized).updateVaultValuation(1n),
                    ).to.be.revertedWithCustomError(
                        vaultContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });
            describe("WHEN target is invalid", function () {
                it("THEN it should fail", async () => {
                    await expect(vaultContract.updateVaultValuation(8n)).to.be.revertedWith(
                        "Invalid valuationSource_",
                    );
                });
            });
            describe("WHEN no strategy is defined", function () {
                it("THEN it should fail", async () => {
                    await expect(vaultContract.updateVaultValuation(1n))
                        .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                        .withArgs("vaultStrategyAddress");
                });
            });
        });

        describe("WHEN executing with right context", function () {
            before(async () => {
                // set strategy to return a value
                await strategyContract.setDeployedAssetsValue(INITIAL_VALUATION);

                // set strategy address in vault
                await vaultContract.setVaultStrategyAddress(strategyContractAddress);
            });
            after(async () => {
                await baseSnapshot.restore();
            });

            it("THEN it should emit an Event with source 1", async () => {
                txResult = await vaultContract.connect(deployer).updateVaultValuation(1n);
                await expect(txResult)
                    .to.emit(vaultContract, "VaultValuationUpdated")
                    .withArgs(INITIAL_VALUATION);
            });

            it("THEN it should emit an Event with source 2", async () => {
                txResult = await vaultContract.connect(deployer).updateVaultValuation(2n);
                await expect(txResult)
                    .to.emit(vaultContract, "VaultValuationUpdated")
                    .withArgs(INITIAL_VALUATION);
            });
        });
    });

    describe("WHEN trying to getVaultValuation", function () {
        describe("WHEN executing with wrong context", function () {
            describe("WHEN no strategy is defined", function () {
                it("THEN it should fail", async () => {
                    await expect(vaultContract.updateVaultValuation(1n))
                        .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                        .withArgs("vaultStrategyAddress");
                });
            });
        });

        describe("WHEN executing with right context", function () {
            let vaultValuation: bigint;

            before(async () => {
                // set strategy to return a value
                await strategyContract.setDeployedAssetsValue(INITIAL_VALUATION);

                // set strategy address in vault
                await vaultContract.setVaultStrategyAddress(strategyContractAddress);

                vaultValuation = await vaultContract.totalAssets();
            });
            after(async () => {
                await baseSnapshot.restore();
            });

            it("THEN valuation should match INITIAL VALUATION", async () => {
                expect(INITIAL_VALUATION).equals(vaultValuation);
            });
        });
    });

    // this deposit test should be executed without skiping any test to show addition of deposits
    describe("WHEN executing deposit", function () {
        describe("WHEN executing deposit with wrong context", function () {
            after(async () => {
                await baseSnapshot.restore();
            });

            describe("WHEN caller is not authorized", function () {
                it("THEN it should fail", async () => {
                    const role = await vaultContract.MASTER_TOKEN_ROLE();

                    // put any parameters, it doesn't matter
                    await expect(vaultContract.connect(nonAuthorized).deposit(1n, user1Address))
                        .to.be.revertedWithCustomError(
                            vaultContract,
                            "AccessControlUnauthorizedAccount",
                        )
                        .withArgs(nonAuthorizedAddress, role);
                });
            });

            describe("WHEN account is ZERO address", function () {
                it("THEN it should fail", async () => {
                    // put any parameters, it doesn't matter
                    await expect(vaultContract.deposit(1n, ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                        .withArgs("receiver_");
                });
            });

            describe("WHEN amount is ZERO", function () {
                it("THEN it should fail", async () => {
                    // put any parameters, it doesn't matter
                    await expect(vaultContract.deposit(ZERO_AMOUNT, user1Address))
                        .to.be.revertedWithCustomError(vaultContract, "ZeroAmount")
                        .withArgs("assets_");
                });
            });

            describe("WHEN contract is paused", function () {
                before(async () => {
                    await vaultContract.pause();
                });
                after(async () => {
                    await baseSnapshot.restore();
                });

                it("THEN it should fail", async () => {
                    // put any parameters, it doesn't matter
                    await expect(
                        vaultContract.deposit(AMOUNT_1E18, deployerAddress),
                    ).to.be.revertedWithCustomError(vaultContract, "EnforcedPause");
                });
            });
        });

        describe("WHEN executing deposit with correct parameters", function () {
            let AMOUNT1: bigint;
            let AMOUNT2: bigint;
            let pendingDepositAssetsBefore: bigint;
            let sharesAmountPreview: bigint;
            let sharesAmount: bigint;

            after(async () => {
                await baseSnapshot.restore();
            });

            describe("WHEN user1 deposits 10 ETH", function () {
                before(async () => {
                    // set strategy address in vault
                    await vaultContract.setVaultStrategyAddress(strategyContractAddress);

                    // set the amount
                    AMOUNT1 = ethers.parseEther("10");

                    // approve vault to take asset from user
                    await wethTokenContract.connect(user1).approve(vaultAddress, AMOUNT1);

                    // store pending assets to deposit
                    pendingDepositAssetsBefore = await vaultContract.pendingDepositAssets();

                    // preview shares
                    sharesAmountPreview = await vaultContract.previewDeposit(AMOUNT1);

                    // execute deposit
                    txResult = await masterTokenContract
                        .connect(user1)
                        .deposit(vaultAddress, AMOUNT1, user1Address);
                    const txReceipt = await txResult.wait();

                    // get shares from emitted event
                    sharesAmount = BigInt(
                        await getVariableFromEvent(
                            vaultContract as unknown as Contract,
                            "Deposit",
                            txReceipt,
                            3,
                        ),
                    );
                });

                it("THEN preview shares and obtained shares should match", async () => {
                    expect(sharesAmountPreview).equals(sharesAmount);
                });

                it("THEN it should increase assetsToDeploy", async () => {
                    const pendingDepositAssetsAfter = await vaultContract.pendingDepositAssets();
                    expect(pendingDepositAssetsBefore + AMOUNT1).equals(pendingDepositAssetsAfter);
                });

                it("THEN pendingDepositAssets should be AMOUNT1 (10)", async () => {
                    const pendingDepositAssets = await vaultContract.pendingDepositAssets();
                    expect(AMOUNT1).equals(pendingDepositAssets);
                });

                it("THEN shares amount should match AMOUNT1 since exchange rate is 1", async () => {
                    expect(AMOUNT1).equals(sharesAmount);
                });

                it("THEN assets should decrease in user1 and increase in vault balances", async () => {
                    await expect(txResult).to.changeTokenBalances(
                        wethTokenContract,
                        [user1Address, vaultAddress],
                        [-AMOUNT1, AMOUNT1],
                    );
                });

                it("THEN shares should increase in master token balance", async () => {
                    await expect(txResult).to.changeTokenBalance(
                        vaultContract,
                        masterTokenAddress,
                        sharesAmount,
                    );
                });

                it("THEN mapping for user1 should update with 10 shares", async () => {
                    const sharesQty = await masterTokenContract.usersShares(user1Address);
                    expect(sharesQty).equals(sharesAmount);
                });

                it("THEN it should emit an Event", async () => {
                    await expect(txResult)
                        .to.emit(vaultContract, "Deposit")
                        .withArgs(user1Address, masterTokenAddress, AMOUNT1, sharesAmount);
                });
            });

            describe("WHEN user2 deposits 5 ETH first time", function () {
                before(async () => {
                    AMOUNT2 = ethers.parseEther("5");

                    // approve vault to take asset from user
                    await wethTokenContract.connect(user2).approve(vaultAddress, AMOUNT2);

                    // // store pending assets to deposit
                    pendingDepositAssetsBefore = await vaultContract.pendingDepositAssets();

                    // // execute deposit
                    txResult = await masterTokenContract
                        .connect(user2)
                        .deposit(vaultAddress, AMOUNT2, user2Address);
                    const txReceipt = await txResult.wait();

                    // get shares from emitted event
                    sharesAmount = BigInt(
                        await getVariableFromEvent(
                            vaultContract as unknown as Contract,
                            "Deposit",
                            txReceipt,
                            3,
                        ),
                    );
                });

                it("THEN it should increase assetsToDeploy", async () => {
                    const pendingDepositAssetsAfter = await vaultContract.pendingDepositAssets();
                    expect(pendingDepositAssetsBefore + AMOUNT2).equals(pendingDepositAssetsAfter);
                });

                it("THEN pendingDepositAssets should increase to AMOUNT1 + AMOUNT2 (15)", async () => {
                    const pendingDepositAssets = await vaultContract.pendingDepositAssets();
                    expect(AMOUNT1 + AMOUNT2).equals(pendingDepositAssets);
                });

                it("THEN shares amount should match AMOUNT2 (5) since exchange rate is 1", async () => {
                    expect(AMOUNT2).equals(sharesAmount);
                });

                it("THEN assets should decrease in user2 and increase in vault balances", async () => {
                    await expect(txResult).to.changeTokenBalances(
                        wethTokenContract,
                        [user2Address, vaultAddress],
                        [-AMOUNT2, AMOUNT2],
                    );
                });

                it("THEN shares should increase in master token balance AMOUNT1 + AMOUNT2 (15)", async () => {
                    await expect(txResult).to.changeTokenBalance(
                        vaultContract,
                        masterTokenAddress,
                        sharesAmount,
                    );
                });

                it("THEN mapping for user2 should update with AMOUNT2 (5) shares", async () => {
                    const sharesQty = await masterTokenContract.usersShares(user2Address);
                    expect(sharesQty).equals(sharesAmount);
                });

                it("THEN it should emit an Event", async () => {
                    await expect(txResult)
                        .to.emit(vaultContract, "Deposit")
                        .withArgs(user2Address, masterTokenAddress, AMOUNT2, sharesAmount);
                });
            });

            describe("WHEN user2 deposits second time", function () {
                before(async () => {
                    // approve vault to take asset from user
                    await wethTokenContract.connect(user2).approve(vaultAddress, AMOUNT2);

                    // // store pending assets to deposit
                    pendingDepositAssetsBefore = await vaultContract.pendingDepositAssets();

                    // // execute deposit
                    txResult = await masterTokenContract
                        .connect(user2)
                        .deposit(vaultAddress, AMOUNT2, user2Address);
                    const txReceipt = await txResult.wait();

                    // get shares from emitted event
                    sharesAmount = BigInt(
                        await getVariableFromEvent(
                            vaultContract as unknown as Contract,
                            "Deposit",
                            txReceipt,
                            3,
                        ),
                    );
                });

                it("THEN it should increase assetsToDeploy", async () => {
                    const pendingDepositAssetsAfter = await vaultContract.pendingDepositAssets();
                    expect(pendingDepositAssetsBefore + AMOUNT2).equals(pendingDepositAssetsAfter);
                });

                it("THEN pendingDepositAssets should be AMOUNT1 + AMOUNT2 + AMOUNT2 (20)", async () => {
                    const pendingDepositAssets = await vaultContract.pendingDepositAssets();
                    expect(AMOUNT1 + AMOUNT2 + AMOUNT2).equals(pendingDepositAssets);
                });

                it("THEN shares amount should match since exchange rate it 1", async () => {
                    expect(AMOUNT2).equals(sharesAmount);
                });

                it("THEN assets should decrease in user2 and increase in vault balances", async () => {
                    await expect(txResult).to.changeTokenBalances(
                        wethTokenContract,
                        [user2Address, vaultAddress],
                        [-AMOUNT2, AMOUNT2],
                    );
                });

                it("THEN shares should increase in master token balance to AMOUNT1 + AMOUNT2 + AMOUNT2 (20)", async () => {
                    await expect(txResult).to.changeTokenBalance(
                        vaultContract,
                        masterTokenAddress,
                        sharesAmount,
                    );
                });

                it("THEN mapping for user2 should update with AMOUNT2 + AMOUNT2 (100) shares", async () => {
                    const sharesQty = await masterTokenContract.usersShares(user2Address);
                    expect(sharesQty).equals(AMOUNT2 + AMOUNT2);
                });

                it("THEN it should emit an Event", async () => {
                    await expect(txResult)
                        .to.emit(vaultContract, "Deposit")
                        .withArgs(user2Address, masterTokenAddress, AMOUNT2, sharesAmount);
                });

                it("THEN it should emit a VaultValuationUpdated Event", async () => {
                    await expect(txResult)
                        .to.emit(vaultContract, "VaultValuationUpdated")
                        .withArgs(INITIAL_VALUATION);
                });
            });

            describe("WHEN doing balances check", function () {
                it(`THEN vaultValuation should match shares totalSupply ${INITIAL_VALUATION}`, async () => {
                    const vaultValuation = await vaultContract.totalAssets();
                    const totalSharesSupply = await vaultContract.totalSupply();
                    expect(vaultValuation).equals(totalSharesSupply);
                });

                it(`THEN master token shares balance should match vault totalSupply ${INITIAL_VALUATION}`, async () => {
                    const masterTokenBalance = await vaultContract.balanceOf(masterTokenAddress);
                    const totalSharesSupply = await vaultContract.totalSupply();
                    expect(masterTokenBalance).equals(totalSharesSupply);
                });

                it("THEN users balances should have decreased by AMOUNT1 (10)", async () => {
                    // can do it with shares since ratio is still 1
                    const user1SharesBalance = await masterTokenContract.usersShares(user1Address);
                    const user2SharesBalance = await masterTokenContract.usersShares(user2Address);

                    const user1Balance = await wethTokenContract.balanceOf(user1Address);
                    const user2Balance = await wethTokenContract.balanceOf(user2Address);

                    expect(INITIAL_MINT - user1SharesBalance).equals(user1Balance);
                    expect(INITIAL_MINT - user2SharesBalance).equals(user2Balance);
                });
            });
        });
    });

    describe("WHEN trying to execute withdraw (no assets deployment)", function () {
        before(async () => {
            // set deposit strategy
            await vaultContract.setVaultStrategyAddress(strategyContractAddress);

            // restore to 20 weth deposit and no asset deployment
            await setVaultWith20(ethers.parseEther("10"), false);
        });
        describe("WHEN executing withdraw with wrong context", function () {
            describe("WHEN executing deposit with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        const role = await vaultContract.MASTER_TOKEN_ROLE();

                        // put any parameters, it doesn't matter
                        await expect(
                            vaultContract
                                .connect(nonAuthorized)
                                .withdraw(1n, user1Address, user2Address),
                        )
                            .to.be.revertedWithCustomError(
                                vaultContract,
                                "AccessControlUnauthorizedAccount",
                            )
                            .withArgs(nonAuthorizedAddress, role);
                    });
                });

                describe("WHEN caller is ZERO address", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(vaultContract.withdraw(1n, ZERO_ADDRESS, user2Address))
                            .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                            .withArgs("owner_");
                    });
                });

                describe("WHEN account is ZERO address", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(vaultContract.withdraw(1n, user1Address, ZERO_ADDRESS))
                            .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                            .withArgs("receiver_");
                    });
                });

                describe("WHEN amount is ZERO", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            vaultContract.withdraw(ZERO_AMOUNT, user1Address, user2Address),
                        )
                            .to.be.revertedWithCustomError(vaultContract, "ZeroAmount")
                            .withArgs("assets_");
                    });
                });

                describe("WHEN withdraw strategy is not defined", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(vaultContract.withdraw(1n, user1Address, user2Address))
                            .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                            .withArgs("withdrawStrategyAddress");
                    });
                });

                describe("WHEN contract is paused", function () {
                    before(async () => {
                        await vaultContract.pause();
                    });
                    after(async () => {
                        await vaultContract.unpause();
                    });
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            vaultContract.withdraw(AMOUNT_1E18, user1Address, user2Address),
                        ).to.be.revertedWithCustomError(vaultContract, "EnforcedPause");
                    });
                });
            });
        });

        describe("WHEN executing withdraw with correct parameters (no assets deployment)", function () {
            let AMOUNT: bigint;
            let userWETHBalanceBefore: bigint;
            let userSharesBalanceBefore: bigint;
            let masterTokenSharesBalanceBefore: bigint;
            let vaultWETHBalanceBefore: bigint;
            let vaultTotalSupplyBefore: bigint;

            before(async () => {
                // set the withdraw strategy
                await vaultContract.setWithdrawStrategyAddress(strategyContractAddress);

                AMOUNT = ethers.parseEther("10");

                // balances before
                userSharesBalanceBefore = await masterTokenContract.usersShares(user1Address);
                userWETHBalanceBefore = await wethTokenContract.balanceOf(user1Address);
                masterTokenSharesBalanceBefore = await vaultContract.balanceOf(masterTokenAddress);
                vaultWETHBalanceBefore = await wethTokenContract.balanceOf(vaultAddress);
                vaultTotalSupplyBefore = await vaultContract.totalSupply();

                txResult = await masterTokenContract
                    .connect(user1)
                    .withdraw(vaultAddress, AMOUNT, masterTokenAddress, user1Address);
            });
            after(async () => {
                // go back to two deposits valued 20 eth, 10 shares per user
                await baseSnapshot.restore();
            });

            it("THEN it should emit an Event", async () => {
                await expect(txResult)
                    .to.emit(vaultContract, "Withdraw")
                    .withArgs(masterTokenAddress, user1Address, masterTokenAddress, AMOUNT, AMOUNT);
            });
            it("THEN it should emit a VaultValuationUpdated Event", async () => {
                await expect(txResult)
                    .to.emit(vaultContract, "VaultValuationUpdated")
                    .withArgs(INITIAL_VALUATION - AMOUNT);
            });
            it("THEN user1 shares mapping on master token should have decreased", async () => {
                const user1SharesBalance = await masterTokenContract.usersShares(user1Address);
                expect(userSharesBalanceBefore - AMOUNT).equals(user1SharesBalance);
            });
            it("THEN user1 weth balance should have increased", async () => {
                const userWETHBalance = await wethTokenContract.balanceOf(user1Address);
                expect(userWETHBalanceBefore + AMOUNT).equals(userWETHBalance);
            });
            it("THEN master token shares balance should have decreased", async () => {
                const masterTokenSharesBalance = await vaultContract.balanceOf(masterTokenAddress);
                expect(masterTokenSharesBalanceBefore - AMOUNT).equals(masterTokenSharesBalance);
            });
            it("THEN vault total supply shares should have decreased", async () => {
                const vaultTotalSupply = await vaultContract.totalSupply();
                expect(vaultTotalSupplyBefore - AMOUNT).equals(vaultTotalSupply);
            });
            it("THEN vault weth balance should have decreased", async () => {
                const vaultWETHethBalance = await wethTokenContract.balanceOf(vaultAddress);
                expect(vaultWETHBalanceBefore - AMOUNT).equals(vaultWETHethBalance);
            });
        });
    });

    describe("WHEN trying to execute deployAssets from vault", function () {
        describe("WHEN executing with wrong context", function () {
            afterEach(async () => {
                await baseSnapshot.restore();
            });
            describe("WHEN caller is not authorized", function () {
                it("THEN it should fail", async () => {
                    const role = await vaultContract.VAULT_MANAGER_ROLE();

                    // put any parameters, it doesn't matter
                    await expect(vaultContract.connect(nonAuthorized).deployAssets())
                        .to.be.revertedWithCustomError(
                            vaultContract,
                            "AccessControlUnauthorizedAccount",
                        )
                        .withArgs(nonAuthorizedAddress, role);
                });
            });

            describe("WHEN deposit strategy is not defined", function () {
                it("THEN it should fail", async () => {
                    // put any parameters, it doesn't matter
                    await expect(vaultContract.deployAssets())
                        .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                        .withArgs("vaultStrategyAddress");
                });
            });

            describe("WHEN pendingDepositAssets is ZERO", function () {
                it("THEN it should fail", async () => {
                    // set strategy to bypass first check
                    await vaultContract.setVaultStrategyAddress(strategyContractAddress);

                    // put any parameters, it doesn't matter
                    await expect(vaultContract.deployAssets())
                        .to.be.revertedWithCustomError(vaultContract, "ZeroAmount")
                        .withArgs("pendingDepositAssets");
                });
            });

            describe("WHEN strategy returns Zero value", function () {
                let AMOUNT: bigint;

                it("THEN it should fail", async () => {
                    // set both strategies
                    await configVault(
                        vaultAddress,
                        strategyContractAddress,
                        strategyContractAddress,
                    );

                    // restore to 20 weth no assets deployment
                    AMOUNT = ethers.parseEther("10");
                    await setVaultWith20(AMOUNT, false);

                    // set strategy to return zero value
                    await strategyContract.setTokenAmounts(ZERO_AMOUNT, 1n);
                    // set strategy to return a valid token
                    await strategyContract.setTokenAddress(liquidRSTokenContractAddress, 1n);

                    // put any parameters, it doesn't matter
                    await expect(vaultContract.deployAssets()).to.be.revertedWith(
                        "Invalid return from Strategy",
                    );
                });
            });

            describe("WHEN strategy returns invalid liquid token", function () {
                let AMOUNT: bigint;

                it("THEN it should fail", async () => {
                    // set both strategies
                    await configVault(
                        vaultAddress,
                        strategyContractAddress,
                        strategyContractAddress,
                    );

                    // restore to 20 weth no assets deployment
                    AMOUNT = ethers.parseEther("10");
                    await setVaultWith20(AMOUNT, false);

                    // set strategy to return zero value
                    await strategyContract.setTokenAmounts(1n, 1n);
                    // set strategy to return a valid token
                    await strategyContract.setTokenAddress(ZERO_ADDRESS, 1n);

                    // put any parameters, it doesn't matter
                    await expect(vaultContract.deployAssets()).to.be.revertedWith(
                        "Invalid return from Strategy",
                    );
                });
            });
        });

        describe("WHEN executing with right context", function () {
            let AMOUNT: bigint;
            let vaultTotalAssetsBefore: bigint;
            let pendingDepositAssetsBefore: bigint;

            before(async () => {
                // set both strategies
                await configVault(vaultAddress, strategyContractAddress, strategyContractAddress);

                // restore to 20 weth no assets deployment
                AMOUNT = ethers.parseEther("10");
                await setVaultWith20(AMOUNT, false);

                // change amount to set return value
                AMOUNT = AMOUNT_1E18 * 10n;
                // set return values for strategies
                await strategyContract.setTokenAmounts(AMOUNT, 1n);
                await strategyContract.setTokenAddress(liquidRSTokenContractAddress, 1n);

                vaultTotalAssetsBefore = await vaultContract.totalAssets();
                pendingDepositAssetsBefore = await vaultContract.pendingDepositAssets();

                // execute deployAssets
                txResult = await vaultContract.connect(deployer).deployAssets();
            });

            after(async () => {
                await baseSnapshot.restore();
            });

            it("THEN pendingDepositAssets should be ZERO", async () => {
                const pendingDepositAssets = await vaultContract.pendingDepositAssets();
                expect(pendingDepositAssets).equals(ZERO_AMOUNT);
            });

            it("THEN vault assets balance should decrease to 0 WETH", async () => {
                const vaultWETHBalance = await wethTokenContract.balanceOf(vaultAddress);

                expect(ZERO_AMOUNT).equals(vaultWETHBalance);

                await expect(txResult).to.changeTokenBalances(
                    wethTokenContract,
                    [strategyContractAddress, vaultAddress],
                    [INITIAL_VALUATION, -INITIAL_VALUATION],
                );
            });

            it("THEN vault totalAssets should decrease to 0 WETH", async () => {
                const vaultTotalAssets = await vaultContract.totalAssets();
                expect(vaultTotalAssetsBefore - vaultTotalAssets).equals(
                    pendingDepositAssetsBefore,
                );
                expect(ZERO_AMOUNT).equals(vaultTotalAssets);
            });

            it("THEN vault valuation is still ZERO", async () => {
                const vaultValuation = await vaultContract.totalAssets();
                expect(vaultValuation).equals(ZERO_AMOUNT);
            });

            it("THEN it should emit an Event", async () => {
                await expect(txResult)
                    .to.emit(vaultContract, "AssetsDeployed")
                    .withArgs(liquidRSTokenContractAddress, AMOUNT, 0, deployerAddress);
            });
        });
    });

    describe("WHEN trying to execute harvest from vault", function () {
        after(async () => {
            await baseSnapshot.restore();
        });

        describe("WHEN executing with wrong context", function () {
            describe("WHEN caller is not authorized", function () {
                it("THEN it should fail", async () => {
                    const role = await vaultContract.DEFAULT_ADMIN_ROLE();

                    // put any parameters, it doesn't matter
                    await expect(vaultContract.connect(nonAuthorized).harvest())
                        .to.be.revertedWithCustomError(
                            vaultContract,
                            "AccessControlUnauthorizedAccount",
                        )
                        .withArgs(nonAuthorizedAddress, role);
                });
            });

            describe("WHEN deposit strategy is not defined", function () {
                it("THEN it should fail", async () => {
                    // put any parameters, it doesn't matter
                    await expect(vaultContract.harvest())
                        .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                        .withArgs("vaultStrategyAddress");
                });
            });
        });

        describe("WHEN executing with right context", function () {
            let AMOUNT: bigint;

            before(async () => {
                // change amount to set return value
                AMOUNT = AMOUNT_1E18 * 10n;
                // set return values for strategies
                await strategyContract.setTokenAmounts(AMOUNT, 1n);
                await strategyContract.setTokenAddress(liquidRSTokenContractAddress, 1n);

                // set both strategies
                await configVault(vaultAddress, strategyContractAddress, strategyContractAddress);

                // restore to 20 weth and deploy assets
                AMOUNT = ethers.parseEther("10");
                await setVaultWith20(AMOUNT, true);

                // execute harvest
                txResult = await vaultContract.connect(deployer).harvest();
            });

            it("THEN it should emit an Event", async () => {
                await expect(txResult)
                    .to.emit(vaultContract, "HarvestExecuted")
                    .withArgs(liquidRSTokenContractAddress, AMOUNT, deployerAddress);
            });

            describe("WHEN evaluating shares and assets ratio on vault", function () {
                let totalSharesBF: bigint;
                let totalAssetsBF: bigint;
                let totalShares: bigint;
                let totalAssets: bigint;
                let oneShareInAssetsBefore: bigint;
                let oneAssetInSharesBefore: bigint;
                let oneShareInAssets: bigint;
                let oneAssetInShares: bigint;

                before(async () => {
                    // set valuation
                    await strategyContract.setDeployedAssetsValue(INITIAL_VALUATION);

                    // get shares value before harvest
                    totalSharesBF = await vaultContract.totalSupply();
                    totalAssetsBF = await vaultContract.totalAssets();

                    oneShareInAssetsBefore = (totalAssetsBF * AMOUNT_1E18) / totalSharesBF; // ratio 1:1
                    oneAssetInSharesBefore = (totalSharesBF * AMOUNT_1E18) / totalAssetsBF; // ratio 1:1

                    // change valuation so shares ratio is changed
                    await strategyContract.setDeployedAssetsValue(ethers.parseEther("25"));

                    // get shares value before harvest
                    totalShares = await vaultContract.totalSupply();
                    totalAssets = await vaultContract.totalAssets();

                    oneShareInAssets = (totalAssets * AMOUNT_1E18) / totalShares;
                    oneAssetInShares = (totalShares * AMOUNT_1E18) / totalAssets;
                });

                it("THEN shares valuation should increase by 25%", async () => {
                    const prevRedeem = await vaultContract.previewRedeem(AMOUNT_1E18);
                    const tolerance = 1n;
                    expect(oneShareInAssets).equals(
                        (oneShareInAssetsBefore * ethers.parseEther("1.25")) / AMOUNT_1E18,
                    );

                    expect(oneShareInAssets).to.be.closeToBigInt(prevRedeem, tolerance);
                });

                it("THEN assets to share valuation should decrease by the propportional amount", async () => {
                    const prevDeposit = await vaultContract.previewDeposit(AMOUNT_1E18);
                    const tolerance = 1n;

                    expect(oneAssetInShares).equals(
                        (oneAssetInSharesBefore * AMOUNT_1E18) / ethers.parseEther("1.25"),
                    );
                    expect(oneAssetInShares).to.be.closeToBigInt(prevDeposit, tolerance);
                });
            });
        });
    });

    describe("WHEN executing putUnderlying", function () {
        let valuationBefore: bigint;
        let valuationAfter: bigint;
        let userWethBefore: bigint;
        let userWethAfter: bigint;

        before(async () => {
            // set both strategies
            await configVault(vaultAddress, strategyContractAddress, strategyContractAddress);

            // get valuation before
            valuationBefore = await vaultContract.totalAssets();

            // get weth from user
            userWethBefore = await wethTokenContract.balanceOf(deployerAddress);

            await wethTokenContract.approve(vaultAddress, AMOUNT_1E18);

            // call updateValuation
            txResult = await vaultContract.putUnderlying(AMOUNT_1E18);
        });

        it("THEN vault valuation should increase by 1 WETH", async () => {
            valuationAfter = await vaultContract.totalAssets();

            const tolerance = 1n;
            expect(valuationAfter).to.be.closeToBigInt(valuationBefore + AMOUNT_1E18, tolerance);
        });

        it("THEN user weth should decrease by 1 WETH", async () => {
            // get weth from user
            userWethAfter = await wethTokenContract.balanceOf(deployerAddress);

            const tolerance = 1n;
            expect(userWethAfter).to.be.closeToBigInt(userWethBefore - AMOUNT_1E18, tolerance);
        });

        it("THEN it should emit an event", async () => {
            await expect(txResult)
                .to.emit(vaultContract, "VaultValuationUpdated")
                .withArgs(valuationAfter);
        });

        describe("WHEN executing getUnderlying", function () {
            before(async () => {
                // get valuation before
                valuationBefore = await vaultContract.totalAssets();

                // get weth from user
                userWethBefore = await wethTokenContract.balanceOf(deployerAddress);

                // call updateValuation
                txResult = await vaultContract.getUnderlying(AMOUNT_1E18 / 2n);
            });

            it("THEN vault valuation should decrease by 0.5 WETH", async () => {
                valuationAfter = await vaultContract.totalAssets();

                const tolerance = 1n;
                expect(valuationAfter).to.be.closeToBigInt(
                    valuationBefore - AMOUNT_1E18 / 2n,
                    tolerance,
                );
            });

            it("THEN user weth should increase by 0.5 WETH", async () => {
                // get weth from user
                userWethAfter = await wethTokenContract.balanceOf(deployerAddress);

                const tolerance = 1n;
                expect(userWethAfter).to.be.closeToBigInt(
                    userWethBefore + AMOUNT_1E18 / 2n,
                    tolerance,
                );
            });

            it("THEN it should emit an event", async () => {
                await expect(txResult)
                    .to.emit(vaultContract, "VaultValuationUpdated")
                    .withArgs(valuationAfter);
            });
        });
    });

    xdescribe("WHEN trying to execute redeem", function () {
        let AMOUNT: bigint;
        let assetsToWithdraw: bigint;

        before(async () => {
            // set deposit strategy
            await vaultContract.setVaultStrategyAddress(strategyContractAddress);

            // restore to 20 weth deposit and no asset deployment
            await setVaultWith20(ethers.parseEther("10"), false);
        });

        describe("WHEN executing with wrong context", function () {
            describe("WHEN executing deposit with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        const role = await vaultContract.MASTER_TOKEN_ROLE();

                        // put any parameters, it doesn't matter
                        await expect(
                            vaultContract
                                .connect(nonAuthorized)
                                .redeem(1n, user1Address, user2Address),
                        )
                            .to.be.revertedWithCustomError(
                                vaultContract,
                                "AccessControlUnauthorizedAccount",
                            )
                            .withArgs(nonAuthorizedAddress, role);
                    });
                });

                describe("WHEN caller is ZERO address", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(vaultContract.redeem(1n, ZERO_ADDRESS, user2Address))
                            .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                            .withArgs("owner_");
                    });
                });

                describe("WHEN account is ZERO address", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(vaultContract.redeem(1n, user1Address, ZERO_ADDRESS))
                            .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                            .withArgs("receiver_");
                    });
                });

                describe("WHEN amount is ZERO", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(vaultContract.redeem(ZERO_AMOUNT, user1Address, user2Address))
                            .to.be.revertedWithCustomError(vaultContract, "ZeroAmount")
                            .withArgs("shares_");
                    });
                });

                describe("WHEN withdraw strategy is not defined", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(vaultContract.redeem(1n, user1Address, user2Address))
                            .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                            .withArgs("withdrawStrategyAddress");
                    });
                });

                describe("WHEN contract is paused", function () {
                    before(async () => {
                        await vaultContract.pause();
                    });
                    after(async () => {
                        await vaultContract.unpause();
                    });
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            vaultContract.redeem(AMOUNT_1E18, user1Address, user2Address),
                        ).to.be.revertedWithCustomError(vaultContract, "EnforcedPause");
                    });
                });

                describe("WHEN strategy returns ZERO amount after withdrawing", function () {
                    before(async () => {
                        // change amount to set return value
                        AMOUNT = AMOUNT_1E18 * 10n;

                        // set return values for strategies on deposit
                        await strategyContract.setTokenAmounts(AMOUNT, 1n);
                        await strategyContract.setTokenAddress(liquidRSTokenContractAddress, 1n);

                        // set both strategies
                        await configVault(
                            vaultAddress,
                            strategyContractAddress,
                            strategyContractAddress,
                        );

                        // restore to 20 weth and deploy assets
                        AMOUNT = ethers.parseEther("10");
                        await setVaultWith20(AMOUNT, true);

                        // change valuation so shares ratio is changed
                        await strategyContract.setDeployedAssetsValue(ethers.parseEther("25"));

                        // set amount and get preview
                        AMOUNT = ethers.parseEther("4");
                        assetsToWithdraw = await vaultContract.previewWithdraw(AMOUNT);

                        // set return values for strategies on withdraw
                        await strategyContract.setTokenAmounts(ZERO_AMOUNT, 2n);
                        await strategyContract.setTokenAddress(underlyingTokenAddress, 2n);

                        // mint weth to vault
                        await wethTokenContract.mint(vaultAddress, assetsToWithdraw);
                    });
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(vaultContract.redeem(AMOUNT_1E18, user1Address, user2Address))
                            .to.be.revertedWithCustomError(vaultContract, "ZeroAmount")
                            .withArgs("assetsAmount");
                    });
                });
            });
        });

        describe("WHEN executing with right context", function () {
            let userWETHBalanceBefore: bigint;
            let userSharesBalanceBefore: bigint;
            let masterTokenSharesBalanceBefore: bigint;
            let vaultWETHBalanceBefore: bigint;
            let vaultTotalSupplyBefore: bigint;

            before(async () => {
                // change amount to set return value
                AMOUNT = AMOUNT_1E18 * 10n;

                // set return values for strategies on deposit
                await strategyContract.setTokenAmounts(AMOUNT, 1n);
                await strategyContract.setTokenAddress(liquidRSTokenContractAddress, 1n);

                // set both strategies
                await configVault(vaultAddress, strategyContractAddress, strategyContractAddress);

                // restore to 20 weth and deploy assets
                AMOUNT = ethers.parseEther("10");
                await setVaultWith20(AMOUNT, true);

                // change valuation so shares ratio is changed
                await strategyContract.setDeployedAssetsValue(ethers.parseEther("25"));

                // set amount and get preview
                AMOUNT = ethers.parseEther("4");
                assetsToWithdraw = await vaultContract.previewWithdraw(AMOUNT);

                // set return values for strategies on withdraw
                await strategyContract.setTokenAmounts(assetsToWithdraw, 2n);
                await strategyContract.setTokenAddress(underlyingTokenAddress, 2n);

                // mint weth to vault
                await wethTokenContract.mint(vaultAddress, assetsToWithdraw);

                // balances before
                userSharesBalanceBefore = await masterTokenContract.usersShares(user1Address);
                userWETHBalanceBefore = await wethTokenContract.balanceOf(user1Address);
                masterTokenSharesBalanceBefore = await vaultContract.balanceOf(masterTokenAddress);
                vaultWETHBalanceBefore = await wethTokenContract.balanceOf(vaultAddress);
                vaultTotalSupplyBefore = await vaultContract.totalSupply();

                txResult = await masterTokenContract
                    .connect(user1)
                    .redeem(vaultAddress, AMOUNT, masterTokenAddress, user1Address);
            });
            after(async () => {
                // go back to two deposits valued 20 eth, 10 shares per user
                await baseSnapshot.restore();
            });

            it("THEN it should emit an Event", async () => {
                await expect(txResult)
                    .to.emit(vaultContract, "Withdraw")
                    .withArgs(
                        masterTokenAddress,
                        user1Address,
                        masterTokenAddress,
                        assetsToWithdraw,
                        AMOUNT,
                    );
            });
            it("THEN user1 shares mapping on master token should have decreased", async () => {
                const user1SharesBalance = await masterTokenContract.usersShares(user1Address);
                expect(userSharesBalanceBefore - AMOUNT).equals(user1SharesBalance);
            });
            it("THEN user1 weth balance should have increased", async () => {
                const userWETHBalance = await wethTokenContract.balanceOf(user1Address);
                expect(userWETHBalanceBefore + assetsToWithdraw).equals(userWETHBalance);
            });
            it("THEN master token shares balance should have decreased", async () => {
                const masterTokenSharesBalance = await vaultContract.balanceOf(masterTokenAddress);
                expect(masterTokenSharesBalanceBefore - AMOUNT).equals(masterTokenSharesBalance);
            });
            it("THEN vault total supply shares should have decreased", async () => {
                const vaultTotalSupply = await vaultContract.totalSupply();
                expect(vaultTotalSupplyBefore - AMOUNT).equals(vaultTotalSupply);
            });
            it("THEN vault weth balance should have decreased", async () => {
                const tolerance = 1n;
                const vaultWETHethBalance = await wethTokenContract.balanceOf(vaultAddress);

                expect(vaultWETHethBalance).to.be.closeToBigInt(
                    vaultWETHBalanceBefore - assetsToWithdraw,
                    tolerance,
                );
            });
        });
    });
});

// Extend Chai to include the custom assertion
// tolerance is expressed in WEI
chai.Assertion.addMethod("closeToBigInt", function (expected, tolerance) {
    const actual = this._obj;
    this.assert(
        actual >= expected - tolerance && actual <= expected + tolerance,
        "expected #{this} to be close to #{exp} +/- #{tol}",
        "expected #{this} not to be close to #{exp} +/- #{tol}",
        expected,
        actual,
    );
});

async function setVaultWith20(AMOUNT: bigint, deployAsstes: boolean): Promise<void> {
    // approve vault to take asset from users
    await wethTokenContract.connect(user1).approve(vaultAddress, AMOUNT);
    await wethTokenContract.connect(user2).approve(vaultAddress, AMOUNT);

    // execute deposits
    await masterTokenContract.connect(user1).deposit(vaultAddress, AMOUNT, user1Address);
    await masterTokenContract.connect(user2).deposit(vaultAddress, AMOUNT, user2Address);

    if (deployAsstes) {
        await vaultContract.connect(deployer).deployAssets();
    }
}
