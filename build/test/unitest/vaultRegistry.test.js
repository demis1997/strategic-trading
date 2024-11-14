"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const hardhat_network_helpers_1 = require("@nomicfoundation/hardhat-network-helpers");
const chai_1 = require("chai");
const _deployContracts_1 = require("../../scripts/_deployContracts");
const constants_1 = require("../_helpers/constants");
const utils_1 = require("./../_helpers/utils");
let snapshot;
let deployer;
let nonAuthorized;
let other1;
let other2;
let owner;
let deployerAddress;
let nonAuthorizedAddress;
let otherAddress1;
let otherAddress2;
let ownerAddress;
let underlyingTokenAddress;
let txResult;
let defaultAdminRole;
let VaultsRegistryFactory;
let usdcTokenContract;
let vaultsRegistryContract;
let vaultAddress;
let vaultContract;
let vaultImplementation;
let vaultImplementationAddress;
let vaultImplementationV2;
let vaultImplementationV2Address;
const DEFAULT_FEE_RATE = hardhat_1.ethers.parseEther("10");
const NEW_FEE_RATE = hardhat_1.ethers.parseEther("30");
describe("Vaults Registry Tests", function () {
    this.timeout(constants_1.TEST_TIMEOUT);
    before(async () => {
        [deployer, nonAuthorized, other1, other2, owner] = await hardhat_1.ethers.getSigners();
        [deployerAddress, nonAuthorizedAddress, otherAddress1, otherAddress2, ownerAddress] =
            await Promise.all([
                deployer.getAddress(),
                nonAuthorized.getAddress(),
                other1.getAddress(),
                other2.getAddress(),
                owner.getAddress(),
            ]);
        usdcTokenContract = (await (0, _deployContracts_1.deployERC20)("USDC", "USDC", 6));
        underlyingTokenAddress = await usdcTokenContract.getAddress();
        vaultImplementation = (await (0, _deployContracts_1.deployVaultImplementation)());
        vaultImplementationAddress = await vaultImplementation.getAddress();
        vaultImplementationV2 = (await (0, _deployContracts_1.deployVaultV2Implementation)());
        vaultImplementationV2Address = await vaultImplementationV2.getAddress();
        VaultsRegistryFactory = await hardhat_1.ethers.getContractFactory("VaultsRegistry");
    });
    describe("WHEN trying to deploy Vaults Registry contract with incorrect parameters", function () {
        it("THEN it should FAIL when defaultFeeRate is greater than 100%", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(VaultsRegistryFactory, [
                constants_1.AMOUNT_1E18 * 100n + 1n,
                vaultImplementationAddress,
            ])).to.be.revertedWithCustomError(VaultsRegistryFactory, "DefaultFeeRateError");
        });
        it("THEN it should FAIL when vaultImplementation is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(VaultsRegistryFactory, [constants_1.AMOUNT_1E18 * 80n, constants_1.ZERO_ADDRESS]))
                .to.be.revertedWithCustomError(VaultsRegistryFactory, "ZeroAddress")
                .withArgs("vaultImplementation_");
        });
    });
    describe("WHEN deploying Vaults Registry contract with correct parameters", function () {
        before(async () => {
            vaultsRegistryContract = (await (0, _deployContracts_1.deployVaultsRegistry)(DEFAULT_FEE_RATE, vaultImplementationAddress));
            defaultAdminRole = await vaultsRegistryContract.DEFAULT_ADMIN_ROLE();
            snapshot = await (0, hardhat_network_helpers_1.takeSnapshot)();
        });
        it("THEN contract init functions should match", async () => {
            const defaultFee = await vaultsRegistryContract.defaultFeeRate();
            (0, chai_1.expect)(defaultFee).equals(hardhat_1.ethers.parseEther("10"));
        });
        describe("WHEN trying to set the defaultFeeRate", async () => {
            describe("WHEN calling with invalid caller or parameters", function () {
                describe("WHEN caller is not owner", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(vaultsRegistryContract
                            .connect(nonAuthorized)
                            .setDefaultFeeRate(DEFAULT_FEE_RATE))
                            .to.be.revertedWithCustomError(vaultsRegistryContract, "AccessControlUnauthorizedAccount")
                            .withArgs(nonAuthorizedAddress, defaultAdminRole);
                    });
                });
                describe("WHEN value is invalid", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(vaultsRegistryContract
                            .connect(deployer)
                            .setDefaultFeeRate(constants_1.AMOUNT_1E18 * 100n + 1n)).to.be.revertedWithCustomError(vaultsRegistryContract, "DefaultFeeRateError");
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
                    (0, chai_1.expect)(await vaultsRegistryContract.defaultFeeRate()).to.equal(NEW_FEE_RATE);
                });
                it("THEN it should emit an Event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(vaultsRegistryContract, "DefaultFeeRateSet")
                        .withArgs(NEW_FEE_RATE);
                });
            });
        });
        describe("WHEN trying to set the vaultImplementation", async () => {
            describe("WHEN calling with invalid caller or parameters", function () {
                describe("WHEN caller is not owner", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(vaultsRegistryContract
                            .connect(nonAuthorized)
                            .setVaultImplementation(otherAddress1))
                            .to.be.revertedWithCustomError(vaultsRegistryContract, "AccessControlUnauthorizedAccount")
                            .withArgs(nonAuthorizedAddress, defaultAdminRole);
                    });
                });
                describe("WHEN value is invalid", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(vaultsRegistryContract
                            .connect(deployer)
                            .setVaultImplementation(constants_1.ZERO_ADDRESS))
                            .to.be.revertedWithCustomError(vaultsRegistryContract, "ZeroAddress")
                            .withArgs("newImplementation_");
                    });
                });
                describe("WHEN new implementation is not a contract", () => {
                    it("THEN it should fail", async () => {
                        const beaconAddress = await vaultsRegistryContract.getbeaconProxyAddress();
                        const beaconContract = await hardhat_1.ethers.getContractAt("UpgradeableBeacon", beaconAddress);
                        await (0, chai_1.expect)(vaultsRegistryContract
                            .connect(deployer)
                            .setVaultImplementation(otherAddress1))
                            .to.be.revertedWithCustomError(beaconContract, "BeaconInvalidImplementation")
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
                    (0, chai_1.expect)(await vaultsRegistryContract.getVaultImplementationAddress()).to.equal(vaultImplementationV2Address);
                });
                it("THEN it should emit an Event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(vaultsRegistryContract, "VaultImplementationChanged")
                        .withArgs(vaultImplementationV2Address);
                });
                it("THEN implementation should change", async () => {
                    await (0, chai_1.expect)(txResult)
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
                        await (0, chai_1.expect)(vaultsRegistryContract
                            .connect(nonAuthorized)
                            .setVaultStatus(constants_1.ZERO_ADDRESS, false))
                            .to.be.revertedWithCustomError(vaultsRegistryContract, "AccessControlUnauthorizedAccount")
                            .withArgs(nonAuthorizedAddress, role);
                    });
                });
                describe("WHEN address is invalid", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(vaultsRegistryContract.setVaultStatus(constants_1.ZERO_ADDRESS, false))
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
                        await (0, chai_1.expect)(vaultsRegistryContract
                            .connect(nonAuthorized)
                            .deployVault(constants_1.ZERO_ADDRESS, deployerAddress, deployerAddress, "whyETH Token", "whyETH"))
                            .to.be.revertedWithCustomError(vaultsRegistryContract, "AccessControlUnauthorizedAccount")
                            .withArgs(nonAuthorizedAddress, role);
                    });
                });
                describe("WHEN underlying token is zero", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(vaultsRegistryContract.deployVault(constants_1.ZERO_ADDRESS, deployerAddress, deployerAddress, "whyETH Token", "whyETH"))
                            .to.be.revertedWithCustomError(vaultsRegistryContract, "ZeroAddress")
                            .withArgs("underlyingTokenAddress_");
                    });
                });
                describe("WHEN master token token is zero", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(vaultsRegistryContract.deployVault(deployerAddress, constants_1.ZERO_ADDRESS, deployerAddress, "whyETH Token", "whyETH"))
                            .to.be.revertedWithCustomError(vaultsRegistryContract, "ZeroAddress")
                            .withArgs("masterTokenAddress_");
                    });
                });
                describe("WHEN owner token is zero", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(vaultsRegistryContract.deployVault(deployerAddress, deployerAddress, constants_1.ZERO_ADDRESS, "whyETH Token", "whyETH"))
                            .to.be.revertedWithCustomError(vaultsRegistryContract, "ZeroAddress")
                            .withArgs("ownerAddress_");
                    });
                });
                describe("WHEN shares name is empty", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(vaultsRegistryContract.deployVault(deployerAddress, deployerAddress, deployerAddress, "", "whyETH")).to.be.revertedWith("Invalid sharesName");
                    });
                });
                describe("WHEN shares symbol is empty", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(vaultsRegistryContract.deployVault(deployerAddress, deployerAddress, deployerAddress, "whyETH Token", "")).to.be.revertedWith("Invalid sharesSymbol");
                    });
                });
            });
            describe("WHEN deploying Users Vault with correct parameters", function () {
                before(async () => {
                    txResult = await vaultsRegistryContract.deployVault(underlyingTokenAddress, otherAddress1, ownerAddress, "whyETH Shares", "sWhyETH");
                    const txReceipt = await txResult.wait();
                    vaultAddress = await (0, utils_1.getVariableFromEvent)(vaultsRegistryContract, "VaultDeployed", txReceipt, 0);
                    vaultContract = await hardhat_1.ethers.getContractAt("Vault", vaultAddress);
                });
                it("THEN it should emit an Event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(vaultsRegistryContract, "VaultDeployed")
                        .withArgs(vaultAddress);
                });
                it("THEN Vaults Registry contract should store Users Vault address", async () => {
                    (0, chai_1.expect)(await vaultsRegistryContract.validVaults(vaultAddress)).to.be.true;
                });
                it("THEN Users Vault contract init functions should match", async () => {
                    (0, chai_1.expect)(underlyingTokenAddress).equals(await vaultContract.asset());
                    (0, chai_1.expect)(otherAddress1).equals(await vaultContract.masterTokenAddress());
                    (0, chai_1.expect)(await vaultsRegistryContract.getAddress()).equals(await vaultContract.vaultsRegistryAddress());
                    (0, chai_1.expect)(await vaultContract.hasRole(defaultAdminRole, ownerAddress)).to.be.true;
                });
                describe("WHEN changing the implementation", function () {
                    let newVaultContract;
                    before(async () => {
                        await vaultContract.connect(owner).setMasterTokenAddress(otherAddress2);
                        await vaultContract
                            .connect(owner)
                            .setWithdrawStrategyAddress(otherAddress2);
                        (0, chai_1.expect)(await vaultsRegistryContract.getVaultImplementationAddress()).equals(vaultImplementationAddress);
                        await vaultsRegistryContract
                            .connect(deployer)
                            .setVaultImplementation(vaultImplementationV2Address);
                        (0, chai_1.expect)(await vaultsRegistryContract.getVaultImplementationAddress()).equals(vaultImplementationV2Address);
                    });
                    it("THEN new function and storage should exists in upgraded contract", async () => {
                        const VaultV2Factory = await hardhat_1.ethers.getContractFactory("VaultV2");
                        newVaultContract = VaultV2Factory.attach(vaultAddress);
                    });
                    it("THEN new function and storage should exists in upgraded contract", async () => {
                        await newVaultContract.addedMethodVaultV2(DEFAULT_FEE_RATE);
                        (0, chai_1.expect)(await newVaultContract.addedVariableVaultV2()).to.equal(DEFAULT_FEE_RATE);
                    });
                    it("THEN Vault previous values should remain intact", async () => {
                        (0, chai_1.expect)(await newVaultContract.asset()).to.equal(underlyingTokenAddress);
                        (0, chai_1.expect)(await newVaultContract.vaultsRegistryAddress()).to.equal(await vaultsRegistryContract.getAddress());
                        (0, chai_1.expect)(await newVaultContract.masterTokenAddress()).to.equal(otherAddress2);
                        (0, chai_1.expect)(await newVaultContract.withdrawStrategyAddress()).to.equal(otherAddress2);
                    });
                });
            });
        });
        describe("WHEN trying to upgrade Vaults Registry", function () {
            let vaultsRegistryV2Contract;
            let vaultAddress1;
            let vaultAddress2;
            before(async () => {
                await vaultsRegistryContract.connect(deployer).setDefaultFeeRate(NEW_FEE_RATE);
                txResult = await vaultsRegistryContract.deployVault(underlyingTokenAddress, otherAddress1, deployerAddress, "token1", "tkn1");
                const txReceipt1 = await txResult.wait();
                vaultAddress1 = await (0, utils_1.getVariableFromEvent)(vaultsRegistryContract, "VaultDeployed", txReceipt1, 0);
                txResult = await vaultsRegistryContract.deployVault(underlyingTokenAddress, otherAddress2, deployerAddress, "token2", "tkn2");
                const txReceipt2 = await txResult.wait();
                vaultAddress2 = await (0, utils_1.getVariableFromEvent)(vaultsRegistryContract, "VaultDeployed", txReceipt2, 0);
                await vaultsRegistryContract.setVaultStatus(vaultAddress1, false);
                const VaultsRegistryV2Factory = await hardhat_1.ethers.getContractFactory("VaultsRegistryV2");
                vaultsRegistryV2Contract = (await hardhat_1.upgrades.upgradeProxy(await vaultsRegistryContract.getAddress(), VaultsRegistryV2Factory));
                await vaultsRegistryV2Contract.waitForDeployment();
            });
            it("THEN Vaults Registry previous values should remain intact", async () => {
                (0, chai_1.expect)(await vaultsRegistryV2Contract.validVaults(vaultAddress1)).to.be.false;
                (0, chai_1.expect)(await vaultsRegistryV2Contract.validVaults(vaultAddress2)).to.be.true;
            });
            it("THEN DefaultFeeRate should remain intact", async () => {
                (0, chai_1.expect)(await vaultsRegistryV2Contract.defaultFeeRate()).to.equal(NEW_FEE_RATE);
            });
            it("THEN new function and storage should exists in upgraded contract", async () => {
                await vaultsRegistryV2Contract.addedMethodRegistryV2(DEFAULT_FEE_RATE);
                (0, chai_1.expect)(await vaultsRegistryV2Contract.addedVariableRegistryV2()).to.equal(DEFAULT_FEE_RATE);
            });
        });
    });
});
//# sourceMappingURL=vaultRegistry.test.js.map