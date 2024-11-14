"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const hardhat_network_helpers_1 = require("@nomicfoundation/hardhat-network-helpers");
const chai_1 = require("chai");
const chai = __importStar(require("chai"));
const _deployContracts_1 = require("../../scripts/_deployContracts");
const _configContracts_1 = require("../../scripts/_configContracts");
const constants_1 = require("../_helpers/constants");
const utils_1 = require("./../_helpers/utils");
let baseSnapshot;
let deployer;
let nonAuthorized;
let user1;
let user2;
let user3;
let deployerAddress;
let nonAuthorizedAddress;
let user1Address;
let user2Address;
let user3Address;
let masterTokenAddress;
let underlyingTokenAddress;
let liquidTokenContractAddress;
let liquidRSTokenContractAddress;
let txResult;
let defaultAdminRole;
let masterTokenContract;
let wethTokenContract;
let liquidTokenContract;
let liquidRSTokenContract;
let vaultsRegistryContract;
let vaultContract;
let vaultAddress;
let vaultImplementation;
let vaultImplementationAddress;
let protocolContractLS;
let protocolContractLSAddress;
let protocolContractLRS;
let protocolContractLRSAddress;
let adapterLSContract;
let adapterLSContractAddress;
let adapterLRSContract;
let adapterLRSContractAddress;
let strategyContract;
let strategyContractAddress;
const DEFAULT_FEE_RATE = hardhat_1.ethers.parseEther("10");
const INITIAL_MINT = hardhat_1.ethers.parseEther("100");
const INITIAL_VALUATION = hardhat_1.ethers.parseEther("20");
describe("Vaults Tests", function () {
    this.timeout(constants_1.TEST_TIMEOUT);
    before(async () => {
        [deployer, nonAuthorized, user1, user2, user3] = await hardhat_1.ethers.getSigners();
        [deployerAddress, nonAuthorizedAddress, user1Address, user2Address, user3Address] =
            await Promise.all([
                deployer.getAddress(),
                nonAuthorized.getAddress(),
                user1.getAddress(),
                user2.getAddress(),
                user3.getAddress(),
            ]);
        vaultImplementation = (await (0, _deployContracts_1.deployVaultImplementation)());
        vaultImplementationAddress = await vaultImplementation.getAddress();
        vaultsRegistryContract = (await (0, _deployContracts_1.deployVaultsRegistry)(DEFAULT_FEE_RATE, vaultImplementationAddress));
        masterTokenContract = (await (0, _deployContracts_1.deployMasterTokenMock)("MasterTokenMock", await vaultsRegistryContract.getAddress(), "LYS", "LYS", BigInt(18)));
        masterTokenAddress = await masterTokenContract.getAddress();
        wethTokenContract = (await (0, _deployContracts_1.deployERC20)("WETH", "WETH", 18));
        underlyingTokenAddress = await wethTokenContract.getAddress();
        liquidTokenContract = (await (0, _deployContracts_1.deployERC20)("LT", "LT", 18));
        liquidTokenContractAddress = await liquidTokenContract.getAddress();
        liquidRSTokenContract = (await (0, _deployContracts_1.deployERC20)("LRT", "LRT", 18));
        liquidRSTokenContractAddress = await liquidRSTokenContract.getAddress();
        await wethTokenContract.mint(deployerAddress, INITIAL_MINT);
        await wethTokenContract.mint(user1Address, INITIAL_MINT);
        await wethTokenContract.mint(user2Address, INITIAL_MINT);
        await wethTokenContract.mint(user3Address, INITIAL_MINT);
        txResult = await vaultsRegistryContract.deployVault(underlyingTokenAddress, masterTokenAddress, deployerAddress, "whyETH Shares", "sWhyETH");
        const txReceipt = await txResult.wait();
        vaultAddress = await (0, utils_1.getVariableFromEvent)(vaultsRegistryContract, "VaultDeployed", txReceipt, 0);
        vaultContract = await hardhat_1.ethers.getContractAt("Vault", vaultAddress);
        await masterTokenContract.setAssetAddress(underlyingTokenAddress);
        protocolContractLRS = (await (0, _deployContracts_1.deployProtocolMock)("Protocol01Mock", "Staking Protocol", underlyingTokenAddress, liquidRSTokenContractAddress));
        protocolContractLRSAddress = await protocolContractLRS.getAddress();
        await liquidRSTokenContract.mint(protocolContractLRSAddress, INITIAL_MINT);
        await wethTokenContract.mint(protocolContractLRSAddress, INITIAL_MINT);
        adapterLRSContract = (await (0, _deployContracts_1.deployMockAdapter)("AdapterMock", protocolContractLRSAddress));
        adapterLRSContractAddress = await adapterLRSContract.getAddress();
        const StrategyContractFactory = await hardhat_1.ethers.getContractFactory("DepositStrategyMock");
        strategyContract = (await StrategyContractFactory.deploy(vaultAddress));
        await strategyContract.waitForDeployment();
        strategyContractAddress = await strategyContract.getAddress();
        await vaultContract.setLiveValuation(true, 0);
        await vaultContract.setLiveValuation(true, 1);
        let roleToAssign = await vaultContract.VAULT_MANAGER_ROLE();
        await vaultContract.grantRole(roleToAssign, deployerAddress);
        await vaultContract.grantRole(roleToAssign, masterTokenAddress);
        roleToAssign = await vaultContract.MASTER_TOKEN_ROLE();
        await vaultContract.grantRole(roleToAssign, masterTokenAddress);
        await vaultContract.grantRole(roleToAssign, deployerAddress);
        roleToAssign = await strategyContract.DEFAULT_ADMIN_ROLE();
        await strategyContract.grantRole(roleToAssign, vaultAddress);
        await strategyContract.grantRole(roleToAssign, deployerAddress);
        roleToAssign = await adapterLRSContract.VAULT_STRATEGY_ROLE();
        await adapterLRSContract.grantRole(roleToAssign, strategyContractAddress);
        roleToAssign = await protocolContractLRS.DEFAULT_ADMIN_ROLE();
        await protocolContractLRS.grantRole(roleToAssign, adapterLRSContractAddress);
        roleToAssign = await masterTokenContract.DEFAULT_ADMIN_ROLE();
        await masterTokenContract.grantRole(roleToAssign, user1Address);
        await masterTokenContract.grantRole(roleToAssign, user2Address);
        await masterTokenContract.grantRole(roleToAssign, deployerAddress);
        baseSnapshot = await (0, hardhat_network_helpers_1.takeSnapshot)();
    });
    describe("WHEN trying to mint directly", function () {
        it("THEN it should revert", async () => {
            await (0, chai_1.expect)(vaultContract.mint(1n, user1Address)).to.be.revertedWith("Function not allowed");
        });
    });
    describe("WHEN sending ethers to contract", function () {
        after(async () => {
            await baseSnapshot.restore();
        });
        it("THEN contract balance should update", async () => {
            await deployer.sendTransaction({
                to: vaultAddress,
                value: hardhat_1.ethers.parseEther("1"),
            });
            const balance = await deployer.provider?.getBalance(vaultAddress);
            (0, chai_1.expect)(balance).equals(hardhat_1.ethers.parseEther("1"));
        });
    });
    describe("WHEN trying to setVaultStrategyAddress", function () {
        describe("WHEN executing with wrong context", function () {
            describe("WHEN caller is not authorized", function () {
                it("THEN it should fail", async () => {
                    await (0, chai_1.expect)(vaultContract.connect(nonAuthorized).setVaultStrategyAddress(user1Address)).to.be.revertedWithCustomError(vaultContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN address is zero", function () {
                it("THEN it should fail", async () => {
                    await (0, chai_1.expect)(vaultContract.setVaultStrategyAddress(constants_1.ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                        .withArgs("vaultStrategyAddress_");
                });
            });
        });
        describe("WHEN executing with right context", function () {
            let anyAddress;
            before(async () => {
                anyAddress = user1Address;
                txResult = await vaultContract
                    .connect(deployer)
                    .setVaultStrategyAddress(anyAddress);
            });
            it("THEN it should update state variable vaultStrategyAddress", async () => {
                const newAddress = await vaultContract.vaultStrategyAddress();
                (0, chai_1.expect)(newAddress).equals(anyAddress);
            });
            it("THEN it should emit an Event", async () => {
                await (0, chai_1.expect)(txResult)
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
                    await (0, chai_1.expect)(vaultContract
                        .connect(nonAuthorized)
                        .setWithdrawStrategyAddress(user1Address)).to.be.revertedWithCustomError(vaultContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN address is zero", function () {
                it("THEN it should fail", async () => {
                    await (0, chai_1.expect)(vaultContract.setWithdrawStrategyAddress(constants_1.ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                        .withArgs("withdrawStrategyAddress_");
                });
            });
        });
        describe("WHEN executing with right context", function () {
            let anyAddress;
            before(async () => {
                anyAddress = user1Address;
                txResult = await vaultContract
                    .connect(deployer)
                    .setWithdrawStrategyAddress(anyAddress);
            });
            it("THEN it should update state variable withdrawStrategyAddress", async () => {
                const newAddress = await vaultContract.withdrawStrategyAddress();
                (0, chai_1.expect)(newAddress).equals(anyAddress);
            });
            it("THEN it should emit an Event", async () => {
                await (0, chai_1.expect)(txResult)
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
                    await (0, chai_1.expect)(vaultContract.connect(nonAuthorized).setMasterTokenAddress(user1Address)).to.be.revertedWithCustomError(vaultContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN address is zero", function () {
                it("THEN it should fail", async () => {
                    await (0, chai_1.expect)(vaultContract.setMasterTokenAddress(constants_1.ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                        .withArgs("masterTokenAddress_");
                });
            });
        });
        describe("WHEN executing with right context", function () {
            let anyAddress;
            before(async () => {
                anyAddress = user1Address;
                txResult = await vaultContract.connect(deployer).setMasterTokenAddress(anyAddress);
            });
            it("THEN it should update state variable masterTokenAddress", async () => {
                const newAddress = await vaultContract.masterTokenAddress();
                (0, chai_1.expect)(newAddress).equals(anyAddress);
            });
            it("THEN it should emit an Event", async () => {
                await (0, chai_1.expect)(txResult)
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
                    await (0, chai_1.expect)(vaultContract.connect(nonAuthorized).setVaultsRegistryAddress(user1Address)).to.be.revertedWithCustomError(vaultContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN address is zero", function () {
                it("THEN it should fail", async () => {
                    await (0, chai_1.expect)(vaultContract.setVaultsRegistryAddress(constants_1.ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                        .withArgs("vaultsRegistryAddress_");
                });
            });
        });
        describe("WHEN executing with right context", function () {
            let anyAddress;
            before(async () => {
                anyAddress = user1Address;
                txResult = await vaultContract
                    .connect(deployer)
                    .setVaultsRegistryAddress(anyAddress);
            });
            it("THEN it should update state variable vaultsRegistryAddress", async () => {
                const newAddress = await vaultContract.vaultsRegistryAddress();
                (0, chai_1.expect)(newAddress).equals(anyAddress);
            });
            it("THEN it should emit an Event", async () => {
                await (0, chai_1.expect)(txResult)
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
                    await (0, chai_1.expect)(vaultContract.connect(nonAuthorized).setLiveValuation(false, 0n)).to.be.revertedWithCustomError(vaultContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN targe is invalid", function () {
                it("THEN it should fail", async () => {
                    await (0, chai_1.expect)(vaultContract.setLiveValuation(false, 8n)).to.be.revertedWithCustomError(vaultContract, "InvalidTarget");
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
                (0, chai_1.expect)(liveValuationOnDeposit).to.be.true;
            });
            it("THEN it should emit an Event", async () => {
                await (0, chai_1.expect)(txResult)
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
                (0, chai_1.expect)(liveValuationOnWithdraw).to.be.true;
            });
            it("THEN it should emit an Event", async () => {
                await (0, chai_1.expect)(txResult)
                    .to.emit(vaultContract, "LiveValuationSet")
                    .withArgs(true, 1n);
            });
        });
    });
    describe("WHEN trying to setValuationSource", function () {
        describe("WHEN executing with wrong context", function () {
            describe("WHEN caller is not authorized", function () {
                it("THEN it should fail", async () => {
                    await (0, chai_1.expect)(vaultContract.connect(nonAuthorized).setValuationSource(1n)).to.be.revertedWithCustomError(vaultContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN targe is invalid", function () {
                it("THEN it should fail", async () => {
                    await (0, chai_1.expect)(vaultContract.setValuationSource(8n)).to.be.revertedWith("Invalid valuationSource_");
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
                (0, chai_1.expect)(valuationSource_).equals(1n);
            });
            it("THEN it should emit an Event", async () => {
                await (0, chai_1.expect)(txResult).to.emit(vaultContract, "ValuationSourceSet").withArgs(1n);
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
                    await (0, chai_1.expect)(vaultContract.connect(nonAuthorized).pause()).to.be.revertedWithCustomError(vaultContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN it is already paused", function () {
                it("THEN it should fail", async () => {
                    await vaultContract.pause();
                    await (0, chai_1.expect)(vaultContract.pause()).to.be.revertedWithCustomError(vaultContract, "EnforcedPause");
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
                (0, chai_1.expect)(await vaultContract.paused()).to.be.true;
            });
            it("THEN it should emit an Event", async () => {
                await (0, chai_1.expect)(txResult).to.emit(vaultContract, "Paused").withArgs(deployerAddress);
            });
        });
    });
    describe("WHEN trying to unpause the contract", function () {
        describe("WHEN executing with wrong context", function () {
            describe("WHEN caller is not authorized", function () {
                it("THEN it should fail", async () => {
                    await (0, chai_1.expect)(vaultContract.connect(nonAuthorized).unpause()).to.be.revertedWithCustomError(vaultContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN is not paused", function () {
                it("THEN it should fail", async () => {
                    await (0, chai_1.expect)(vaultContract.unpause()).to.be.revertedWithCustomError(vaultContract, "ExpectedPause");
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
                (0, chai_1.expect)(await vaultContract.paused()).to.be.false;
            });
            it("THEN it should emit an Event", async () => {
                await (0, chai_1.expect)(txResult).to.emit(vaultContract, "Unpaused").withArgs(deployerAddress);
            });
        });
    });
    describe("WHEN trying to updateVaultValuation", function () {
        describe("WHEN executing with wrong context", function () {
            describe("WHEN caller is not authorized", function () {
                it("THEN it should fail", async () => {
                    await (0, chai_1.expect)(vaultContract.connect(nonAuthorized).updateVaultValuation(1n)).to.be.revertedWithCustomError(vaultContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN target is invalid", function () {
                it("THEN it should fail", async () => {
                    await (0, chai_1.expect)(vaultContract.updateVaultValuation(8n)).to.be.revertedWith("Invalid valuationSource_");
                });
            });
            describe("WHEN no strategy is defined", function () {
                it("THEN it should fail", async () => {
                    await (0, chai_1.expect)(vaultContract.updateVaultValuation(1n))
                        .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                        .withArgs("vaultStrategyAddress");
                });
            });
        });
        describe("WHEN executing with right context", function () {
            before(async () => {
                await strategyContract.setDeployedAssetsValue(INITIAL_VALUATION);
                await vaultContract.setVaultStrategyAddress(strategyContractAddress);
            });
            after(async () => {
                await baseSnapshot.restore();
            });
            it("THEN it should emit an Event with source 1", async () => {
                txResult = await vaultContract.connect(deployer).updateVaultValuation(1n);
                await (0, chai_1.expect)(txResult)
                    .to.emit(vaultContract, "VaultValuationUpdated")
                    .withArgs(INITIAL_VALUATION, INITIAL_VALUATION, constants_1.ZERO_AMOUNT, deployerAddress);
            });
            it("THEN it should emit an Event with source 2", async () => {
                txResult = await vaultContract.connect(deployer).updateVaultValuation(2n);
                await (0, chai_1.expect)(txResult)
                    .to.emit(vaultContract, "VaultValuationUpdated")
                    .withArgs(INITIAL_VALUATION, INITIAL_VALUATION, constants_1.ZERO_AMOUNT, deployerAddress);
            });
        });
    });
    describe("WHEN trying to getVaultValuation", function () {
        describe("WHEN executing with wrong context", function () {
            describe("WHEN no strategy is defined", function () {
                it("THEN it should fail", async () => {
                    await (0, chai_1.expect)(vaultContract.updateVaultValuation(1n))
                        .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                        .withArgs("vaultStrategyAddress");
                });
            });
        });
        describe("WHEN executing with right context", function () {
            let vaultValuation;
            before(async () => {
                await strategyContract.setDeployedAssetsValue(INITIAL_VALUATION);
                await vaultContract.setVaultStrategyAddress(strategyContractAddress);
                vaultValuation = await vaultContract.totalAssets();
            });
            after(async () => {
                await baseSnapshot.restore();
            });
            it("THEN valuation should match INITIAL VALUATION", async () => {
                (0, chai_1.expect)(INITIAL_VALUATION).equals(vaultValuation);
            });
        });
    });
    describe("WHEN executing deposit", function () {
        describe("WHEN executing deposit with wrong context", function () {
            after(async () => {
                await baseSnapshot.restore();
            });
            describe("WHEN caller is not authorized", function () {
                it("THEN it should fail", async () => {
                    const role = await vaultContract.MASTER_TOKEN_ROLE();
                    await (0, chai_1.expect)(vaultContract.connect(nonAuthorized).deposit(1n, user1Address))
                        .to.be.revertedWithCustomError(vaultContract, "AccessControlUnauthorizedAccount")
                        .withArgs(nonAuthorizedAddress, role);
                });
            });
            describe("WHEN account is ZERO address", function () {
                it("THEN it should fail", async () => {
                    await (0, chai_1.expect)(vaultContract.deposit(1n, constants_1.ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                        .withArgs("receiver_");
                });
            });
            describe("WHEN amount is ZERO", function () {
                it("THEN it should fail", async () => {
                    await (0, chai_1.expect)(vaultContract.deposit(constants_1.ZERO_AMOUNT, user1Address))
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
                    await (0, chai_1.expect)(vaultContract.deposit(constants_1.AMOUNT_1E18, deployerAddress)).to.be.revertedWithCustomError(vaultContract, "EnforcedPause");
                });
            });
        });
        describe("WHEN executing deposit with correct parameters", function () {
            let AMOUNT1;
            let AMOUNT2;
            let pendingDepositAssetsBefore;
            let sharesAmountPreview;
            let sharesAmount;
            after(async () => {
                await baseSnapshot.restore();
            });
            describe("WHEN user1 deposits 10 ETH", function () {
                before(async () => {
                    await vaultContract.setVaultStrategyAddress(strategyContractAddress);
                    AMOUNT1 = hardhat_1.ethers.parseEther("10");
                    await wethTokenContract.connect(user1).approve(vaultAddress, AMOUNT1);
                    pendingDepositAssetsBefore = await vaultContract.pendingDepositAssets();
                    sharesAmountPreview = await vaultContract.previewDeposit(AMOUNT1);
                    txResult = await masterTokenContract
                        .connect(user1)
                        .deposit(vaultAddress, AMOUNT1, user1Address);
                    const txReceipt = await txResult.wait();
                    sharesAmount = BigInt(await (0, utils_1.getVariableFromEvent)(vaultContract, "Deposit", txReceipt, 3));
                });
                it("THEN preview shares and obtained shares should match", async () => {
                    (0, chai_1.expect)(sharesAmountPreview).equals(sharesAmount);
                });
                it("THEN it should increase assetsToDeploy", async () => {
                    const pendingDepositAssetsAfter = await vaultContract.pendingDepositAssets();
                    (0, chai_1.expect)(pendingDepositAssetsBefore + AMOUNT1).equals(pendingDepositAssetsAfter);
                });
                it("THEN pendingDepositAssets should be AMOUNT1 (10)", async () => {
                    const pendingDepositAssets = await vaultContract.pendingDepositAssets();
                    (0, chai_1.expect)(AMOUNT1).equals(pendingDepositAssets);
                });
                it("THEN shares amount should match AMOUNT1 since exchange rate is 1", async () => {
                    (0, chai_1.expect)(AMOUNT1).equals(sharesAmount);
                });
                it("THEN assets should decrease in user1 and increase in vault balances", async () => {
                    await (0, chai_1.expect)(txResult).to.changeTokenBalances(wethTokenContract, [user1Address, vaultAddress], [-AMOUNT1, AMOUNT1]);
                });
                it("THEN shares should increase in master token balance", async () => {
                    await (0, chai_1.expect)(txResult).to.changeTokenBalance(vaultContract, masterTokenAddress, sharesAmount);
                });
                it("THEN mapping for user1 should update with 10 shares", async () => {
                    const sharesQty = await masterTokenContract.usersShares(user1Address);
                    (0, chai_1.expect)(sharesQty).equals(sharesAmount);
                });
                it("THEN it should emit an Event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(vaultContract, "Deposit")
                        .withArgs(user1Address, masterTokenAddress, AMOUNT1, sharesAmount);
                });
            });
            describe("WHEN user2 deposits 5 ETH first time", function () {
                before(async () => {
                    AMOUNT2 = hardhat_1.ethers.parseEther("5");
                    await wethTokenContract.connect(user2).approve(vaultAddress, AMOUNT2);
                    pendingDepositAssetsBefore = await vaultContract.pendingDepositAssets();
                    txResult = await masterTokenContract
                        .connect(user2)
                        .deposit(vaultAddress, AMOUNT2, user2Address);
                    const txReceipt = await txResult.wait();
                    sharesAmount = BigInt(await (0, utils_1.getVariableFromEvent)(vaultContract, "Deposit", txReceipt, 3));
                });
                it("THEN it should increase assetsToDeploy", async () => {
                    const pendingDepositAssetsAfter = await vaultContract.pendingDepositAssets();
                    (0, chai_1.expect)(pendingDepositAssetsBefore + AMOUNT2).equals(pendingDepositAssetsAfter);
                });
                it("THEN pendingDepositAssets should increase to AMOUNT1 + AMOUNT2 (15)", async () => {
                    const pendingDepositAssets = await vaultContract.pendingDepositAssets();
                    (0, chai_1.expect)(AMOUNT1 + AMOUNT2).equals(pendingDepositAssets);
                });
                it("THEN shares amount should match AMOUNT2 (5) since exchange rate is 1", async () => {
                    (0, chai_1.expect)(AMOUNT2).equals(sharesAmount);
                });
                it("THEN assets should decrease in user2 and increase in vault balances", async () => {
                    await (0, chai_1.expect)(txResult).to.changeTokenBalances(wethTokenContract, [user2Address, vaultAddress], [-AMOUNT2, AMOUNT2]);
                });
                it("THEN shares should increase in master token balance AMOUNT1 + AMOUNT2 (15)", async () => {
                    await (0, chai_1.expect)(txResult).to.changeTokenBalance(vaultContract, masterTokenAddress, sharesAmount);
                });
                it("THEN mapping for user2 should update with AMOUNT2 (5) shares", async () => {
                    const sharesQty = await masterTokenContract.usersShares(user2Address);
                    (0, chai_1.expect)(sharesQty).equals(sharesAmount);
                });
                it("THEN it should emit an Event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(vaultContract, "Deposit")
                        .withArgs(user2Address, masterTokenAddress, AMOUNT2, sharesAmount);
                });
            });
            describe("WHEN user2 deposits second time", function () {
                before(async () => {
                    await wethTokenContract.connect(user2).approve(vaultAddress, AMOUNT2);
                    pendingDepositAssetsBefore = await vaultContract.pendingDepositAssets();
                    txResult = await masterTokenContract
                        .connect(user2)
                        .deposit(vaultAddress, AMOUNT2, user2Address);
                    const txReceipt = await txResult.wait();
                    sharesAmount = BigInt(await (0, utils_1.getVariableFromEvent)(vaultContract, "Deposit", txReceipt, 3));
                });
                it("THEN it should increase assetsToDeploy", async () => {
                    const pendingDepositAssetsAfter = await vaultContract.pendingDepositAssets();
                    (0, chai_1.expect)(pendingDepositAssetsBefore + AMOUNT2).equals(pendingDepositAssetsAfter);
                });
                it("THEN pendingDepositAssets should be AMOUNT1 + AMOUNT2 + AMOUNT2 (20)", async () => {
                    const pendingDepositAssets = await vaultContract.pendingDepositAssets();
                    (0, chai_1.expect)(AMOUNT1 + AMOUNT2 + AMOUNT2).equals(pendingDepositAssets);
                });
                it("THEN shares amount should match since exchange rate it 1", async () => {
                    (0, chai_1.expect)(AMOUNT2).equals(sharesAmount);
                });
                it("THEN assets should decrease in user2 and increase in vault balances", async () => {
                    await (0, chai_1.expect)(txResult).to.changeTokenBalances(wethTokenContract, [user2Address, vaultAddress], [-AMOUNT2, AMOUNT2]);
                });
                it("THEN shares should increase in master token balance to AMOUNT1 + AMOUNT2 + AMOUNT2 (20)", async () => {
                    await (0, chai_1.expect)(txResult).to.changeTokenBalance(vaultContract, masterTokenAddress, sharesAmount);
                });
                it("THEN mapping for user2 should update with AMOUNT2 + AMOUNT2 (100) shares", async () => {
                    const sharesQty = await masterTokenContract.usersShares(user2Address);
                    (0, chai_1.expect)(sharesQty).equals(AMOUNT2 + AMOUNT2);
                });
                it("THEN it should emit an Event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(vaultContract, "Deposit")
                        .withArgs(user2Address, masterTokenAddress, AMOUNT2, sharesAmount);
                });
            });
            describe("WHEN doing balances check", function () {
                it(`THEN vaultValuation should match shares totalSupply ${INITIAL_VALUATION}`, async () => {
                    const vaultValuation = await vaultContract.totalAssets();
                    const totalSharesSupply = await vaultContract.totalSupply();
                    (0, chai_1.expect)(vaultValuation).equals(totalSharesSupply);
                });
                it(`THEN master token shares balance should match vault totalSupply ${INITIAL_VALUATION}`, async () => {
                    const masterTokenBalance = await vaultContract.balanceOf(masterTokenAddress);
                    const totalSharesSupply = await vaultContract.totalSupply();
                    (0, chai_1.expect)(masterTokenBalance).equals(totalSharesSupply);
                });
                it("THEN users balances should have decreased by AMOUNT1 (10)", async () => {
                    const user1SharesBalance = await masterTokenContract.usersShares(user1Address);
                    const user2SharesBalance = await masterTokenContract.usersShares(user2Address);
                    const user1Balance = await wethTokenContract.balanceOf(user1Address);
                    const user2Balance = await wethTokenContract.balanceOf(user2Address);
                    (0, chai_1.expect)(INITIAL_MINT - user1SharesBalance).equals(user1Balance);
                    (0, chai_1.expect)(INITIAL_MINT - user2SharesBalance).equals(user2Balance);
                });
            });
        });
    });
    describe("WHEN trying to execute withdraw (no assets deployment)", function () {
        before(async () => {
            await vaultContract.setVaultStrategyAddress(strategyContractAddress);
            await setVaultWith20(hardhat_1.ethers.parseEther("10"), false);
        });
        describe("WHEN executing withdraw with wrong context", function () {
            describe("WHEN executing deposit with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        const role = await vaultContract.MASTER_TOKEN_ROLE();
                        await (0, chai_1.expect)(vaultContract
                            .connect(nonAuthorized)
                            .withdraw(1n, user1Address, user2Address))
                            .to.be.revertedWithCustomError(vaultContract, "AccessControlUnauthorizedAccount")
                            .withArgs(nonAuthorizedAddress, role);
                    });
                });
                describe("WHEN caller is ZERO address", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(vaultContract.withdraw(1n, constants_1.ZERO_ADDRESS, user2Address))
                            .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                            .withArgs("owner_");
                    });
                });
                describe("WHEN account is ZERO address", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(vaultContract.withdraw(1n, user1Address, constants_1.ZERO_ADDRESS))
                            .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                            .withArgs("receiver_");
                    });
                });
                describe("WHEN amount is ZERO", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(vaultContract.withdraw(constants_1.ZERO_AMOUNT, user1Address, user2Address))
                            .to.be.revertedWithCustomError(vaultContract, "ZeroAmount")
                            .withArgs("assets_");
                    });
                });
                describe("WHEN withdraw strategy is not defined", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(vaultContract.withdraw(1n, user1Address, user2Address))
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
                        await (0, chai_1.expect)(vaultContract.withdraw(constants_1.AMOUNT_1E18, user1Address, user2Address)).to.be.revertedWithCustomError(vaultContract, "EnforcedPause");
                    });
                });
            });
        });
        describe("WHEN executing withdraw with correct parameters (no assets deployment)", function () {
            let AMOUNT;
            let userWETHBalanceBefore;
            let userSharesBalanceBefore;
            let masterTokenSharesBalanceBefore;
            let vaultWETHBalanceBefore;
            let vaultTotalSupplyBefore;
            before(async () => {
                await vaultContract.setWithdrawStrategyAddress(strategyContractAddress);
                AMOUNT = hardhat_1.ethers.parseEther("10");
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
                await baseSnapshot.restore();
            });
            it("THEN it should emit an Event", async () => {
                await (0, chai_1.expect)(txResult)
                    .to.emit(vaultContract, "Withdraw")
                    .withArgs(masterTokenAddress, user1Address, masterTokenAddress, AMOUNT, AMOUNT);
            });
            it("THEN user1 shares mapping on master token should have decreased", async () => {
                const user1SharesBalance = await masterTokenContract.usersShares(user1Address);
                (0, chai_1.expect)(userSharesBalanceBefore - AMOUNT).equals(user1SharesBalance);
            });
            it("THEN user1 weth balance should have increased", async () => {
                const userWETHBalance = await wethTokenContract.balanceOf(user1Address);
                (0, chai_1.expect)(userWETHBalanceBefore + AMOUNT).equals(userWETHBalance);
            });
            it("THEN master token shares balance should have decreased", async () => {
                const masterTokenSharesBalance = await vaultContract.balanceOf(masterTokenAddress);
                (0, chai_1.expect)(masterTokenSharesBalanceBefore - AMOUNT).equals(masterTokenSharesBalance);
            });
            it("THEN vault total supply shares should have decreased", async () => {
                const vaultTotalSupply = await vaultContract.totalSupply();
                (0, chai_1.expect)(vaultTotalSupplyBefore - AMOUNT).equals(vaultTotalSupply);
            });
            it("THEN vault weth balance should have decreased", async () => {
                const vaultWETHethBalance = await wethTokenContract.balanceOf(vaultAddress);
                (0, chai_1.expect)(vaultWETHBalanceBefore - AMOUNT).equals(vaultWETHethBalance);
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
                    await (0, chai_1.expect)(vaultContract.connect(nonAuthorized).deployAssets())
                        .to.be.revertedWithCustomError(vaultContract, "AccessControlUnauthorizedAccount")
                        .withArgs(nonAuthorizedAddress, role);
                });
            });
            describe("WHEN deposit strategy is not defined", function () {
                it("THEN it should fail", async () => {
                    await (0, chai_1.expect)(vaultContract.deployAssets())
                        .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                        .withArgs("vaultStrategyAddress");
                });
            });
            describe("WHEN pendingDepositAssets is ZERO", function () {
                it("THEN it should fail", async () => {
                    await vaultContract.setVaultStrategyAddress(strategyContractAddress);
                    await (0, chai_1.expect)(vaultContract.deployAssets())
                        .to.be.revertedWithCustomError(vaultContract, "ZeroAmount")
                        .withArgs("pendingDepositAssets");
                });
            });
            describe("WHEN strategy returns Zero value", function () {
                let AMOUNT;
                it("THEN it should fail", async () => {
                    await (0, _configContracts_1.configVault)(vaultAddress, strategyContractAddress, strategyContractAddress);
                    AMOUNT = hardhat_1.ethers.parseEther("10");
                    await setVaultWith20(AMOUNT, false);
                    await strategyContract.setTokenAmounts(constants_1.ZERO_AMOUNT, 1n);
                    await strategyContract.setTokenAddress(liquidRSTokenContractAddress, 1n);
                    await (0, chai_1.expect)(vaultContract.deployAssets()).to.be.revertedWith("Invalid return from Strategy");
                });
            });
            describe("WHEN strategy returns invalid liquid token", function () {
                let AMOUNT;
                it("THEN it should fail", async () => {
                    await (0, _configContracts_1.configVault)(vaultAddress, strategyContractAddress, strategyContractAddress);
                    AMOUNT = hardhat_1.ethers.parseEther("10");
                    await setVaultWith20(AMOUNT, false);
                    await strategyContract.setTokenAmounts(1n, 1n);
                    await strategyContract.setTokenAddress(constants_1.ZERO_ADDRESS, 1n);
                    await (0, chai_1.expect)(vaultContract.deployAssets()).to.be.revertedWith("Invalid return from Strategy");
                });
            });
        });
        describe("WHEN executing with right context", function () {
            let AMOUNT;
            let vaultTotalAssetsBefore;
            let pendingDepositAssetsBefore;
            before(async () => {
                await (0, _configContracts_1.configVault)(vaultAddress, strategyContractAddress, strategyContractAddress);
                AMOUNT = hardhat_1.ethers.parseEther("10");
                await setVaultWith20(AMOUNT, false);
                AMOUNT = constants_1.AMOUNT_1E18 * 10n;
                await strategyContract.setTokenAmounts(AMOUNT, 1n);
                await strategyContract.setTokenAddress(liquidRSTokenContractAddress, 1n);
                vaultTotalAssetsBefore = await vaultContract.totalAssets();
                pendingDepositAssetsBefore = await vaultContract.pendingDepositAssets();
                txResult = await vaultContract.connect(deployer).deployAssets();
            });
            after(async () => {
                await baseSnapshot.restore();
            });
            it("THEN pendingDepositAssets should be ZERO", async () => {
                const pendingDepositAssets = await vaultContract.pendingDepositAssets();
                (0, chai_1.expect)(pendingDepositAssets).equals(constants_1.ZERO_AMOUNT);
            });
            it("THEN vault assets balance should decrease to 0 WETH", async () => {
                const vaultWETHBalance = await wethTokenContract.balanceOf(vaultAddress);
                (0, chai_1.expect)(constants_1.ZERO_AMOUNT).equals(vaultWETHBalance);
                await (0, chai_1.expect)(txResult).to.changeTokenBalances(wethTokenContract, [strategyContractAddress, vaultAddress], [INITIAL_VALUATION, -INITIAL_VALUATION]);
            });
            it("THEN vault totalAssets should decrease to 0 WETH", async () => {
                const vaultTotalAssets = await vaultContract.totalAssets();
                (0, chai_1.expect)(vaultTotalAssetsBefore - vaultTotalAssets).equals(pendingDepositAssetsBefore);
                (0, chai_1.expect)(constants_1.ZERO_AMOUNT).equals(vaultTotalAssets);
            });
            it("THEN vault valuation is still ZERO", async () => {
                const vaultValuation = await vaultContract.totalAssets();
                (0, chai_1.expect)(vaultValuation).equals(constants_1.ZERO_AMOUNT);
            });
            it("THEN it should emit an Event", async () => {
                await (0, chai_1.expect)(txResult)
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
                    await (0, chai_1.expect)(vaultContract.connect(nonAuthorized).harvest())
                        .to.be.revertedWithCustomError(vaultContract, "AccessControlUnauthorizedAccount")
                        .withArgs(nonAuthorizedAddress, role);
                });
            });
            describe("WHEN deposit strategy is not defined", function () {
                it("THEN it should fail", async () => {
                    await (0, chai_1.expect)(vaultContract.harvest())
                        .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                        .withArgs("vaultStrategyAddress");
                });
            });
        });
        describe("WHEN executing with right context", function () {
            let AMOUNT;
            before(async () => {
                AMOUNT = constants_1.AMOUNT_1E18 * 10n;
                await strategyContract.setTokenAmounts(AMOUNT, 1n);
                await strategyContract.setTokenAddress(liquidRSTokenContractAddress, 1n);
                await (0, _configContracts_1.configVault)(vaultAddress, strategyContractAddress, strategyContractAddress);
                AMOUNT = hardhat_1.ethers.parseEther("10");
                await setVaultWith20(AMOUNT, true);
                txResult = await vaultContract.connect(deployer).harvest();
            });
            it("THEN it should emit an Event", async () => {
                await (0, chai_1.expect)(txResult)
                    .to.emit(vaultContract, "HarvestExecuted")
                    .withArgs(liquidRSTokenContractAddress, AMOUNT, deployerAddress);
            });
            describe("WHEN evaluating shares and assets ratio on vault", function () {
                let totalSharesBF;
                let totalAssetsBF;
                let totalShares;
                let totalAssets;
                let oneShareInAssetsBefore;
                let oneAssetInSharesBefore;
                let oneShareInAssets;
                let oneAssetInShares;
                before(async () => {
                    await strategyContract.setDeployedAssetsValue(INITIAL_VALUATION);
                    totalSharesBF = await vaultContract.totalSupply();
                    totalAssetsBF = await vaultContract.totalAssets();
                    oneShareInAssetsBefore = (totalAssetsBF * constants_1.AMOUNT_1E18) / totalSharesBF;
                    oneAssetInSharesBefore = (totalSharesBF * constants_1.AMOUNT_1E18) / totalAssetsBF;
                    await strategyContract.setDeployedAssetsValue(hardhat_1.ethers.parseEther("25"));
                    totalShares = await vaultContract.totalSupply();
                    totalAssets = await vaultContract.totalAssets();
                    oneShareInAssets = (totalAssets * constants_1.AMOUNT_1E18) / totalShares;
                    oneAssetInShares = (totalShares * constants_1.AMOUNT_1E18) / totalAssets;
                });
                it("THEN shares valuation should increase by 25%", async () => {
                    const prevRedeem = await vaultContract.previewRedeem(constants_1.AMOUNT_1E18);
                    const tolerance = 1n;
                    (0, chai_1.expect)(oneShareInAssets).equals((oneShareInAssetsBefore * hardhat_1.ethers.parseEther("1.25")) / constants_1.AMOUNT_1E18);
                    (0, chai_1.expect)(oneShareInAssets).to.be.closeToBigInt(prevRedeem, tolerance);
                });
                it("THEN assets to share valuation should decrease by the propportional amount", async () => {
                    const prevDeposit = await vaultContract.previewDeposit(constants_1.AMOUNT_1E18);
                    const tolerance = 1n;
                    (0, chai_1.expect)(oneAssetInShares).equals((oneAssetInSharesBefore * constants_1.AMOUNT_1E18) / hardhat_1.ethers.parseEther("1.25"));
                    (0, chai_1.expect)(oneAssetInShares).to.be.closeToBigInt(prevDeposit, tolerance);
                });
            });
        });
    });
    describe("WHEN trying to execute redeem", function () {
        let AMOUNT;
        let assetsToWithdraw;
        before(async () => {
            await vaultContract.setVaultStrategyAddress(strategyContractAddress);
            await setVaultWith20(hardhat_1.ethers.parseEther("10"), false);
        });
        describe("WHEN executing with wrong context", function () {
            describe("WHEN executing deposit with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        const role = await vaultContract.MASTER_TOKEN_ROLE();
                        await (0, chai_1.expect)(vaultContract
                            .connect(nonAuthorized)
                            .redeem(1n, user1Address, user2Address))
                            .to.be.revertedWithCustomError(vaultContract, "AccessControlUnauthorizedAccount")
                            .withArgs(nonAuthorizedAddress, role);
                    });
                });
                describe("WHEN caller is ZERO address", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(vaultContract.redeem(1n, constants_1.ZERO_ADDRESS, user2Address))
                            .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                            .withArgs("owner_");
                    });
                });
                describe("WHEN account is ZERO address", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(vaultContract.redeem(1n, user1Address, constants_1.ZERO_ADDRESS))
                            .to.be.revertedWithCustomError(vaultContract, "ZeroAddress")
                            .withArgs("receiver_");
                    });
                });
                describe("WHEN amount is ZERO", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(vaultContract.redeem(constants_1.ZERO_AMOUNT, user1Address, user2Address))
                            .to.be.revertedWithCustomError(vaultContract, "ZeroAmount")
                            .withArgs("shares_");
                    });
                });
                describe("WHEN withdraw strategy is not defined", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(vaultContract.redeem(1n, user1Address, user2Address))
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
                        await (0, chai_1.expect)(vaultContract.redeem(constants_1.AMOUNT_1E18, user1Address, user2Address)).to.be.revertedWithCustomError(vaultContract, "EnforcedPause");
                    });
                });
                describe("WHEN strategy returns ZERO amount after withdrawing", function () {
                    before(async () => {
                        AMOUNT = constants_1.AMOUNT_1E18 * 10n;
                        await strategyContract.setTokenAmounts(AMOUNT, 1n);
                        await strategyContract.setTokenAddress(liquidRSTokenContractAddress, 1n);
                        await (0, _configContracts_1.configVault)(vaultAddress, strategyContractAddress, strategyContractAddress);
                        AMOUNT = hardhat_1.ethers.parseEther("10");
                        await setVaultWith20(AMOUNT, true);
                        await strategyContract.setDeployedAssetsValue(hardhat_1.ethers.parseEther("25"));
                        AMOUNT = hardhat_1.ethers.parseEther("4");
                        assetsToWithdraw = await vaultContract.previewWithdraw(AMOUNT);
                        await strategyContract.setTokenAmounts(constants_1.ZERO_AMOUNT, 2n);
                        await strategyContract.setTokenAddress(underlyingTokenAddress, 2n);
                        await wethTokenContract.mint(vaultAddress, assetsToWithdraw);
                    });
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(vaultContract.redeem(constants_1.AMOUNT_1E18, user1Address, user2Address))
                            .to.be.revertedWithCustomError(vaultContract, "ZeroAmount")
                            .withArgs("assetsAmount");
                    });
                });
            });
        });
        describe("WHEN executing with right context", function () {
            let userWETHBalanceBefore;
            let userSharesBalanceBefore;
            let masterTokenSharesBalanceBefore;
            let vaultWETHBalanceBefore;
            let vaultTotalSupplyBefore;
            before(async () => {
                AMOUNT = constants_1.AMOUNT_1E18 * 10n;
                await strategyContract.setTokenAmounts(AMOUNT, 1n);
                await strategyContract.setTokenAddress(liquidRSTokenContractAddress, 1n);
                await (0, _configContracts_1.configVault)(vaultAddress, strategyContractAddress, strategyContractAddress);
                AMOUNT = hardhat_1.ethers.parseEther("10");
                await setVaultWith20(AMOUNT, true);
                await strategyContract.setDeployedAssetsValue(hardhat_1.ethers.parseEther("25"));
                AMOUNT = hardhat_1.ethers.parseEther("4");
                assetsToWithdraw = await vaultContract.previewWithdraw(AMOUNT);
                await strategyContract.setTokenAmounts(assetsToWithdraw, 2n);
                await strategyContract.setTokenAddress(underlyingTokenAddress, 2n);
                await wethTokenContract.mint(vaultAddress, assetsToWithdraw);
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
                await baseSnapshot.restore();
            });
            it("THEN it should emit an Event", async () => {
                await (0, chai_1.expect)(txResult)
                    .to.emit(vaultContract, "Withdraw")
                    .withArgs(masterTokenAddress, user1Address, masterTokenAddress, assetsToWithdraw, AMOUNT);
            });
            it("THEN user1 shares mapping on master token should have decreased", async () => {
                const user1SharesBalance = await masterTokenContract.usersShares(user1Address);
                (0, chai_1.expect)(userSharesBalanceBefore - AMOUNT).equals(user1SharesBalance);
            });
            it("THEN user1 weth balance should have increased", async () => {
                const userWETHBalance = await wethTokenContract.balanceOf(user1Address);
                (0, chai_1.expect)(userWETHBalanceBefore + assetsToWithdraw).equals(userWETHBalance);
            });
            it("THEN master token shares balance should have decreased", async () => {
                const masterTokenSharesBalance = await vaultContract.balanceOf(masterTokenAddress);
                (0, chai_1.expect)(masterTokenSharesBalanceBefore - AMOUNT).equals(masterTokenSharesBalance);
            });
            it("THEN vault total supply shares should have decreased", async () => {
                const vaultTotalSupply = await vaultContract.totalSupply();
                (0, chai_1.expect)(vaultTotalSupplyBefore - AMOUNT).equals(vaultTotalSupply);
            });
            it("THEN vault weth balance should have decreased", async () => {
                const tolerance = 1n;
                const vaultWETHethBalance = await wethTokenContract.balanceOf(vaultAddress);
                (0, chai_1.expect)(vaultWETHethBalance).to.be.closeToBigInt(vaultWETHBalanceBefore - assetsToWithdraw, tolerance);
            });
        });
    });
});
chai.Assertion.addMethod("closeToBigInt", function (expected, tolerance) {
    const actual = this._obj;
    this.assert(actual >= expected - tolerance && actual <= expected + tolerance, "expected #{this} to be close to #{exp} +/- #{tol}", "expected #{this} not to be close to #{exp} +/- #{tol}", expected, actual);
});
async function setVaultWith20(AMOUNT, deployAsstes) {
    await wethTokenContract.connect(user1).approve(vaultAddress, AMOUNT);
    await wethTokenContract.connect(user2).approve(vaultAddress, AMOUNT);
    await masterTokenContract.connect(user1).deposit(vaultAddress, AMOUNT, user1Address);
    await masterTokenContract.connect(user2).deposit(vaultAddress, AMOUNT, user2Address);
    if (deployAsstes) {
        await vaultContract.connect(deployer).deployAssets();
    }
}
//# sourceMappingURL=vault.test.js.map