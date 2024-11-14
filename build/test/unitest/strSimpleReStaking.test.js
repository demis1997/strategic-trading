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
let underlyingTokenAddress;
let liquidTokenContractAddress;
let liquidRSTokenContractAddress;
let txResult;
let defaultAdminRole;
let wethTokenContract;
let liquidTokenContract;
let liquidRSTokenContract;
let vaultAddress;
let oracleContract;
let oracleContractAddress;
let protocolContractLS;
let protocolContractLSAddress;
let protocolContractLRS;
let protocolContractLRSAddress;
let adapterLSContract;
let adapterLSContractAddress;
let adapterLRSContract;
let adapterLRSContractAddress;
let genericWrapperMockContract;
let genericWrapperMockContractAddress;
let strategyContract;
let strategyContractAddress;
const INTIAL_MINT = hardhat_1.ethers.parseEther("1000");
const CONTRACT_STRATEGY_NAME = "Standard Re-Staking Strategy";
describe("UNITEST ==> Simple Re-Staking Strategy", function () {
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
        vaultAddress = deployerAddress;
        wethTokenContract = (await (0, _deployContracts_1.deployERC20)("WETH", "WETH", 18));
        underlyingTokenAddress = await wethTokenContract.getAddress();
        liquidTokenContract = (await (0, _deployContracts_1.deployERC20)("LT", "LT", 18));
        liquidTokenContractAddress = await liquidTokenContract.getAddress();
        liquidRSTokenContract = (await (0, _deployContracts_1.deployERC20)("LRT", "LRT", 18));
        liquidRSTokenContractAddress = await liquidRSTokenContract.getAddress();
        await wethTokenContract.mint(deployerAddress, INTIAL_MINT);
        await wethTokenContract.mint(user1Address, INTIAL_MINT);
        await wethTokenContract.mint(user2Address, INTIAL_MINT);
        await wethTokenContract.mint(user3Address, INTIAL_MINT);
        protocolContractLS = (await (0, _deployContracts_1.deployProtocolMock)("Protocol01Mock", "Staking Protocol", underlyingTokenAddress, liquidTokenContractAddress));
        protocolContractLSAddress = await protocolContractLS.getAddress();
        protocolContractLRS = (await (0, _deployContracts_1.deployProtocolMock)("Protocol01Mock", "RE-Staking Protocol", underlyingTokenAddress, liquidRSTokenContractAddress));
        protocolContractLRSAddress = await protocolContractLRS.getAddress();
        await liquidTokenContract.mint(protocolContractLSAddress, INTIAL_MINT);
        await liquidRSTokenContract.mint(protocolContractLRSAddress, INTIAL_MINT);
        await wethTokenContract.mint(protocolContractLRSAddress, INTIAL_MINT);
        adapterLSContract = (await (0, _deployContracts_1.deployMockAdapter)("AdapterMock", protocolContractLSAddress));
        adapterLSContractAddress = await adapterLSContract.getAddress();
        adapterLRSContract = (await (0, _deployContracts_1.deployMockAdapter)("AdapterMock", protocolContractLRSAddress));
        adapterLRSContractAddress = await adapterLRSContract.getAddress();
        defaultAdminRole = await adapterLSContract.DEFAULT_ADMIN_ROLE();
        await protocolContractLS.grantRole(defaultAdminRole, adapterLSContractAddress);
        defaultAdminRole = await adapterLRSContract.DEFAULT_ADMIN_ROLE();
        await protocolContractLRS.grantRole(defaultAdminRole, adapterLRSContractAddress);
        genericWrapperMockContract = (await (0, _deployContracts_1.deployGenericWrapperMock)("GenericWrapperMock", liquidRSTokenContractAddress, "wLT", "wLT", 18n));
        genericWrapperMockContractAddress = await genericWrapperMockContract.getAddress();
    });
    describe("WHEN preparing context for strategy deployment", function () {
        it("THEN Adapters, Protocols and Roles should be as deployed", async () => {
            (0, chai_1.expect)(protocolContractLRSAddress).equals(await adapterLRSContract.protocolAddress());
            (0, chai_1.expect)(protocolContractLSAddress).equals(await adapterLSContract.protocolAddress());
            (0, chai_1.expect)(underlyingTokenAddress).equals(await protocolContractLRS.assetAddress());
            (0, chai_1.expect)(underlyingTokenAddress).equals(await protocolContractLS.assetAddress());
            (0, chai_1.expect)(liquidRSTokenContractAddress).equals(await protocolContractLRS.liquidAssetAddress());
            (0, chai_1.expect)(liquidTokenContractAddress).equals(await protocolContractLS.liquidAssetAddress());
            defaultAdminRole = await adapterLRSContract.DEFAULT_ADMIN_ROLE();
            (0, chai_1.expect)(await adapterLRSContract.hasRole(defaultAdminRole, deployerAddress)).to.be.true;
            defaultAdminRole = await adapterLSContract.DEFAULT_ADMIN_ROLE();
            (0, chai_1.expect)(await adapterLSContract.hasRole(defaultAdminRole, deployerAddress)).to.be.true;
        });
    });
    describe("WHEN trying to deploy Strategy with wrong parameters", function () {
        const CONTRACT_NAME = "StrSimpleReStaking";
        it("THEN should fail when vaultAddress is ZERO ADDRESS", async () => {
            await (0, utils_1.testDeployStrategyFailure)(CONTRACT_NAME, constants_1.ZERO_ADDRESS, liquidRSTokenContractAddress, [adapterLSContractAddress, adapterLRSContractAddress], [adapterLRSContractAddress], CONTRACT_STRATEGY_NAME, "ZeroAddress", "vaultAddress_");
        });
        it("THEN should fail when liquidTokenAddress is ZERO ADDRESS", async () => {
            await (0, utils_1.testDeployStrategyFailure)(CONTRACT_NAME, vaultAddress, constants_1.ZERO_ADDRESS, [adapterLSContractAddress, adapterLRSContractAddress], [adapterLRSContractAddress], CONTRACT_STRATEGY_NAME, "ZeroAddress", "liquidTokenAddress_");
        });
        it("THEN should fail when strategyName is empty", async () => {
            await (0, utils_1.testDeployStrategyFailure)(CONTRACT_NAME, vaultAddress, liquidRSTokenContractAddress, [adapterLSContractAddress, adapterLRSContractAddress], [adapterLRSContractAddress], "", "EmptyString", "strategyName_");
        });
        it("THEN should fail when deployAdapterPath is different from defined DEPLOYMENT_ADAPTERS_QTY", async () => {
            await (0, utils_1.testDeployStrategyFailure)(CONTRACT_NAME, vaultAddress, liquidRSTokenContractAddress, [adapterLRSContractAddress, constants_1.ZERO_ADDRESS, adapterLSContractAddress], [adapterLRSContractAddress], CONTRACT_STRATEGY_NAME, "InvalidAdaptersPath", "deploy");
        });
        it("THEN should fail when deployAdapterPath has a ZERO ADDRESS", async () => {
            await (0, utils_1.testDeployStrategyFailure)(CONTRACT_NAME, vaultAddress, liquidRSTokenContractAddress, [adapterLRSContractAddress, constants_1.ZERO_ADDRESS], [adapterLRSContractAddress], CONTRACT_STRATEGY_NAME, "ZeroAddress", "adaptersDeployPath_[]");
        });
        it("THEN should fail when withdrawAdapterPath is different from defined WITHDRAW_ADAPTERS_QTY", async () => {
            await (0, utils_1.testDeployStrategyFailure)(CONTRACT_NAME, vaultAddress, liquidRSTokenContractAddress, [adapterLRSContractAddress, adapterLSContractAddress], [adapterLRSContractAddress, adapterLSContractAddress], CONTRACT_STRATEGY_NAME, "InvalidAdaptersPath", "withdraw");
        });
        it("THEN should fail when withdrawAdapterPath is different from defined WITHDRAW_ADAPTERS_QTY", async () => {
            await (0, utils_1.testDeployStrategyFailure)(CONTRACT_NAME, vaultAddress, liquidRSTokenContractAddress, [adapterLRSContractAddress, adapterLSContractAddress], [constants_1.ZERO_ADDRESS], CONTRACT_STRATEGY_NAME, "ZeroAddress", "adaptersWithdrawPath_[]");
        });
    });
    describe("WHEN deploying Strategies with correct parameters", function () {
        before(async () => {
            strategyContract = (await (0, _deployContracts_1.deployVaultStrategy)("StrSimpleReStaking", vaultAddress, liquidRSTokenContractAddress, [adapterLSContractAddress, adapterLRSContractAddress], [adapterLRSContractAddress], "Standard Re-Staking Strategy"));
            strategyContractAddress = await strategyContract.getAddress();
            await (0, _configContracts_1.configVault)(vaultAddress, strategyContractAddress, strategyContractAddress);
            let roleToAssign = await strategyContract.VAULT_MANAGER_ROLE();
            await strategyContract.grantRole(roleToAssign, deployerAddress);
            roleToAssign = await adapterLSContract.VAULT_STRATEGY_ROLE();
            await adapterLSContract.grantRole(roleToAssign, strategyContractAddress);
            roleToAssign = await adapterLRSContract.VAULT_STRATEGY_ROLE();
            await adapterLRSContract.grantRole(roleToAssign, strategyContractAddress);
            baseSnapshot = await (0, hardhat_network_helpers_1.takeSnapshot)();
        });
        it("THEN state variables should contain deployment values", async () => {
            (0, chai_1.expect)(vaultAddress).equals(await strategyContract.vaultAddress());
            (0, chai_1.expect)(CONTRACT_STRATEGY_NAME).equals(await strategyContract.strategyName());
            (0, chai_1.expect)(liquidRSTokenContractAddress).equals(await strategyContract.liquidTokenAddress());
            (0, chai_1.expect)(vaultAddress).equals(await strategyContract.vaultAddress());
            (0, chai_1.expect)(constants_1.ZERO_ADDRESS).equals(await strategyContract.wrappedLiquidTokenAddress());
            (0, chai_1.expect)(constants_1.ZERO_ADDRESS).equals(await strategyContract.withdrawStrategyAddress());
            (0, chai_1.expect)(constants_1.ZERO_AMOUNT).equals(await strategyContract.deployedAssetsValue());
            (0, chai_1.expect)(adapterLSContractAddress).equals(await strategyContract.getFirstDepositAdapter());
        });
        describe("WHEN trying to getTokenPrice", function () {
            describe("WHEN executing with wrong context", function () {
                describe("WHEN token is invalid", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.getTokenPrice(user1Address, 2)).to.be.revertedWith("Invalid token requested");
                    });
                });
                describe("WHEN source is invalid", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.getTokenPrice(liquidRSTokenContractAddress, 5)).to.be.revertedWith("Invalid source to get price");
                    });
                });
            });
            describe("WHEN executing with right context", function () {
                let tokenPrice;
                before(async () => {
                    oracleContract = (await (0, _deployContracts_1.deployOracleMock)("OracleMock", liquidRSTokenContractAddress, "LRS", hardhat_1.ethers.parseEther("1.5")));
                    oracleContractAddress = await oracleContract.getAddress();
                    await strategyContract.setPriceFeedPerToken(liquidRSTokenContractAddress, oracleContractAddress);
                    tokenPrice = await strategyContract.getTokenPrice(liquidRSTokenContractAddress, 1);
                });
                after(async () => {
                    await baseSnapshot.restore();
                });
                it("THEN token price should match", async () => {
                    const expectedTokenPrice = hardhat_1.ethers.parseEther("1.5");
                    (0, chai_1.expect)(expectedTokenPrice).equals(tokenPrice);
                });
            });
        });
        describe("WHEN trying to executeHarvest", function () {
            it("THEN it should revert", async () => {
                await (0, chai_1.expect)(strategyContract.executeHarvest()).to.be.revertedWith("Function not allowed");
            });
        });
        describe("WHEN sending ethers to contract", function () {
            after(async () => {
                await baseSnapshot.restore();
            });
            it("THEN contract balance should update", async () => {
                await deployer.sendTransaction({
                    to: strategyContractAddress,
                    value: hardhat_1.ethers.parseEther("1"),
                });
                const balance = await deployer.provider?.getBalance(strategyContractAddress);
                (0, chai_1.expect)(balance).equals(hardhat_1.ethers.parseEther("1"));
            });
        });
        describe("WHEN trying to setVaultAddress", function () {
            describe("WHEN executing with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.connect(nonAuthorized).setVaultAddress(user1Address)).to.be.revertedWithCustomError(strategyContract, "AccessControlUnauthorizedAccount");
                    });
                });
                describe("WHEN address is zero", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.setVaultAddress(constants_1.ZERO_ADDRESS))
                            .to.be.revertedWithCustomError(strategyContract, "ZeroAddress")
                            .withArgs("vaultAddress_");
                    });
                });
            });
            describe("WHEN executing with right context", function () {
                let anyAddress;
                before(async () => {
                    anyAddress = user1Address;
                    txResult = await strategyContract.connect(deployer).setVaultAddress(anyAddress);
                });
                it("THEN it should update state variable vaultAddress", async () => {
                    const newVaultAddress = await strategyContract.vaultAddress();
                    (0, chai_1.expect)(newVaultAddress).equals(anyAddress);
                });
                it("THEN it should emit an Event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(strategyContract, "VaultAddressSet")
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
                        await (0, chai_1.expect)(strategyContract
                            .connect(nonAuthorized)
                            .setWithdrawStrategyAddress(user1Address)).to.be.revertedWithCustomError(strategyContract, "AccessControlUnauthorizedAccount");
                    });
                });
                describe("WHEN address is zero", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.setWithdrawStrategyAddress(constants_1.ZERO_ADDRESS))
                            .to.be.revertedWithCustomError(strategyContract, "ZeroAddress")
                            .withArgs("withdrawStrategyAddress_");
                    });
                });
            });
            describe("WHEN executing with right context", function () {
                let anyAddress;
                before(async () => {
                    anyAddress = user1Address;
                    txResult = await strategyContract
                        .connect(deployer)
                        .setWithdrawStrategyAddress(anyAddress);
                });
                it("THEN it should update state variable withdrawStrategyAddress", async () => {
                    const newAddress = await strategyContract.withdrawStrategyAddress();
                    (0, chai_1.expect)(newAddress).equals(anyAddress);
                });
                it("THEN it should emit an Event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(strategyContract, "WithdrawStrategyAddressSet")
                        .withArgs(anyAddress);
                });
                after(async () => {
                    await baseSnapshot.restore();
                });
            });
        });
        describe("WHEN trying to setStrategyName", function () {
            describe("WHEN executing with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.connect(nonAuthorized).setStrategyName("newName")).to.be.revertedWithCustomError(strategyContract, "AccessControlUnauthorizedAccount");
                    });
                });
                describe("WHEN strategyName is empty", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.setStrategyName(""))
                            .to.be.revertedWithCustomError(strategyContract, "EmptyString")
                            .withArgs("strategyName_");
                    });
                });
            });
            describe("WHEN executing with right context", function () {
                let anyString;
                before(async () => {
                    anyString = "New Name";
                    txResult = await strategyContract.connect(deployer).setStrategyName(anyString);
                });
                it("THEN it should update state variable vaultAddress", async () => {
                    const newName = await strategyContract.strategyName();
                    (0, chai_1.expect)(newName).equals(anyString);
                });
                it("THEN it should emit an Event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(strategyContract, "StrategyNameSet")
                        .withArgs(anyString);
                });
                after(async () => {
                    await baseSnapshot.restore();
                });
            });
        });
        describe("WHEN trying to setLiquidTokenAddress", function () {
            describe("WHEN executing with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract
                            .connect(nonAuthorized)
                            .setLiquidTokenAddress(user1Address)).to.be.revertedWithCustomError(strategyContract, "AccessControlUnauthorizedAccount");
                    });
                });
                describe("WHEN address is zero", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.setLiquidTokenAddress(constants_1.ZERO_ADDRESS))
                            .to.be.revertedWithCustomError(strategyContract, "ZeroAddress")
                            .withArgs("liquidTokenAddress_");
                    });
                });
            });
            describe("WHEN executing with right context", function () {
                let anyAddress;
                before(async () => {
                    anyAddress = user1Address;
                    txResult = await strategyContract
                        .connect(deployer)
                        .setLiquidTokenAddress(anyAddress);
                });
                it("THEN it should update state variable liquidTokenAddress", async () => {
                    const newAddress = await strategyContract.liquidTokenAddress();
                    (0, chai_1.expect)(newAddress).equals(anyAddress);
                });
                it("THEN it should emit an Event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(strategyContract, "LiquidTokenSet")
                        .withArgs(anyAddress);
                });
                after(async () => {
                    await baseSnapshot.restore();
                });
            });
        });
        describe("WHEN trying to setWrappedLiquidTokenAddress", function () {
            describe("WHEN executing with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract
                            .connect(nonAuthorized)
                            .setWrappedLiquidTokenAddress(user1Address)).to.be.revertedWithCustomError(strategyContract, "AccessControlUnauthorizedAccount");
                    });
                });
                describe("WHEN address is zero", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.setWrappedLiquidTokenAddress(constants_1.ZERO_ADDRESS))
                            .to.be.revertedWithCustomError(strategyContract, "ZeroAddress")
                            .withArgs("wrappedLiquidTokenAddress_");
                    });
                });
            });
            describe("WHEN executing with right context", function () {
                let anyAddress;
                before(async () => {
                    anyAddress = user1Address;
                    txResult = await strategyContract
                        .connect(deployer)
                        .setWrappedLiquidTokenAddress(anyAddress);
                });
                it("THEN it should update state variable wrappedLiquidTokenAddress", async () => {
                    const newAddress = await strategyContract.wrappedLiquidTokenAddress();
                    (0, chai_1.expect)(newAddress).equals(anyAddress);
                });
                it("THEN it should emit an Event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(strategyContract, "TokenWrapperSet")
                        .withArgs(anyAddress);
                });
                after(async () => {
                    await baseSnapshot.restore();
                });
            });
        });
        describe("WHEN trying to setPriceFeedPerToken", function () {
            describe("WHEN executing with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract
                            .connect(nonAuthorized)
                            .setPriceFeedPerToken(user1Address, user1Address)).to.be.revertedWithCustomError(strategyContract, "AccessControlUnauthorizedAccount");
                    });
                });
                describe("WHEN token is zero address", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.setPriceFeedPerToken(constants_1.ZERO_ADDRESS, user1Address)).to.be.revertedWith("Invalid token entered");
                    });
                });
                describe("WHEN feed is zero address", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.setPriceFeedPerToken(user1Address, constants_1.ZERO_ADDRESS)).to.be.revertedWith("Invalid token entered");
                    });
                });
                describe("WHEN token and feed area zero address", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.setPriceFeedPerToken(constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS)).to.be.revertedWith("Invalid token entered");
                    });
                });
                describe("WHEN token is not the liquidToken or the wrapped liquid token", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.setPriceFeedPerToken(deployerAddress, underlyingTokenAddress)).to.be.revertedWith("Invalid token entered");
                    });
                });
            });
            describe("WHEN executing with right context for liquid token", function () {
                let anyAddress;
                before(async () => {
                    anyAddress = user1Address;
                    txResult = await strategyContract
                        .connect(deployer)
                        .setPriceFeedPerToken(liquidRSTokenContractAddress, anyAddress);
                });
                it("THEN it should update mapping priceFeedPerToken", async () => {
                    const newAddress = await strategyContract.priceFeedPerToken(liquidRSTokenContractAddress);
                    (0, chai_1.expect)(newAddress).equals(anyAddress);
                });
                it("THEN it should emit an Event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(strategyContract, "PriceFeedSet")
                        .withArgs(liquidRSTokenContractAddress, anyAddress);
                });
                after(async () => {
                    await baseSnapshot.restore();
                });
            });
            describe("WHEN executing with right context for wrapped liquid token", function () {
                let anyAddress;
                before(async () => {
                    anyAddress = user1Address;
                    await strategyContract.setWrappedLiquidTokenAddress(underlyingTokenAddress);
                    txResult = await strategyContract
                        .connect(deployer)
                        .setPriceFeedPerToken(underlyingTokenAddress, anyAddress);
                });
                it("THEN it should update mapping priceFeedPerToken", async () => {
                    const newAddress = await strategyContract.priceFeedPerToken(underlyingTokenAddress);
                    (0, chai_1.expect)(newAddress).equals(anyAddress);
                });
                it("THEN it should emit an Event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(strategyContract, "PriceFeedSet")
                        .withArgs(underlyingTokenAddress, anyAddress);
                });
                after(async () => {
                    await baseSnapshot.restore();
                });
            });
        });
        describe("WHEN trying to setAdaptersDeployPath", function () {
            describe("WHEN executing with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract
                            .connect(nonAuthorized)
                            .setAdaptersDeployPath([user1Address, user1Address])).to.be.revertedWithCustomError(strategyContract, "AccessControlUnauthorizedAccount");
                    });
                });
            });
            describe("WHEN executing with right context", function () {
                let anyAddress1;
                let anyAddress2;
                let path;
                before(async () => {
                    anyAddress1 = user1Address;
                    anyAddress2 = user2Address;
                    path = [anyAddress1, anyAddress2];
                    txResult = await strategyContract.connect(deployer).setAdaptersDeployPath(path);
                });
                it("THEN it should update array", async () => {
                    const deployPath0 = await strategyContract.adaptersDeployPath(0);
                    const deployPath1 = await strategyContract.adaptersDeployPath(1);
                    (0, chai_1.expect)(deployPath0).equals(anyAddress1);
                    (0, chai_1.expect)(deployPath1).equals(anyAddress2);
                });
                it("THEN it should emit an Event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(strategyContract, "AdaptersDeployPathSet")
                        .withArgs(path);
                });
                after(async () => {
                    await baseSnapshot.restore();
                });
            });
        });
        describe("WHEN trying to setAdaptersWithdrawPath", function () {
            describe("WHEN executing with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract
                            .connect(nonAuthorized)
                            .setAdaptersWithdrawPath([user1Address, user1Address])).to.be.revertedWithCustomError(strategyContract, "AccessControlUnauthorizedAccount");
                    });
                });
            });
            describe("WHEN executing with right context", function () {
                let anyAddress;
                let path;
                before(async () => {
                    anyAddress = user1Address;
                    path = [anyAddress];
                    txResult = await strategyContract
                        .connect(deployer)
                        .setAdaptersWithdrawPath(path);
                });
                it("THEN it should update array", async () => {
                    const deployPath0 = await strategyContract.adaptersWithdrawPath(0);
                    (0, chai_1.expect)(deployPath0).equals(anyAddress);
                });
                it("THEN it should emit an Event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(strategyContract, "AdaptersWithdrawPathSet")
                        .withArgs(path);
                });
                after(async () => {
                    await baseSnapshot.restore();
                });
            });
        });
        describe("WHEN trying to buildPath", function () {
            let tokens;
            let fees;
            describe("WHEN executing with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        tokens = [];
                        fees = [];
                        await (0, chai_1.expect)(strategyContract.connect(nonAuthorized).buildPath(tokens, fees)).to.be.revertedWithCustomError(strategyContract, "AccessControlUnauthorizedAccount");
                    });
                });
                describe("WHEN tokens array is empty", function () {
                    it("THEN it should fail", async () => {
                        tokens = [];
                        fees = [];
                        await (0, chai_1.expect)(strategyContract.buildPath(tokens, fees)).to.be.revertedWithCustomError(strategyContract, "MinTwoTokensNeeded");
                    });
                });
                describe("WHEN tokens array is less than 2 elements", function () {
                    it("THEN it should fail", async () => {
                        tokens = [deployerAddress];
                        fees = [];
                        await (0, chai_1.expect)(strategyContract.buildPath(tokens, fees)).to.be.revertedWithCustomError(strategyContract, "MinTwoTokensNeeded");
                    });
                });
                describe("WHEN arrays not respect pattern", function () {
                    it("THEN it should fail", async () => {
                        tokens = [user1Address, user1Address];
                        fees = [100n, 200n];
                        await (0, chai_1.expect)(strategyContract.buildPath(tokens, fees)).to.be.revertedWithCustomError(strategyContract, "MalformedPath");
                    });
                });
                describe("WHEN arrays not respect pattern", function () {
                    it("THEN it should fail", async () => {
                        tokens = [user1Address, user1Address, user1Address];
                        fees = [100n];
                        await (0, chai_1.expect)(strategyContract.buildPath(tokens, fees)).to.be.revertedWithCustomError(strategyContract, "MalformedPath");
                    });
                });
                describe("WHEN token array has ZERO address in it", function () {
                    it("THEN it should fail", async () => {
                        tokens = [user1Address, constants_1.ZERO_ADDRESS, user1Address];
                        fees = [100n, 200n];
                        await (0, chai_1.expect)(strategyContract.buildPath(tokens, fees))
                            .to.be.revertedWithCustomError(strategyContract, "ZeroAddress")
                            .withArgs("tokens_");
                    });
                });
                describe("WHEN fees array has a ZERO amount in it", function () {
                    it("THEN it should fail", async () => {
                        tokens = [user1Address, user1Address, user1Address];
                        fees = [100n, 0n];
                        await (0, chai_1.expect)(strategyContract.buildPath(tokens, fees))
                            .to.be.revertedWithCustomError(strategyContract, "ZeroAmount")
                            .withArgs("fees_");
                    });
                });
            });
            describe("WHEN executing with right context", function () {
                let anyAddress1;
                let anyAddress2;
                let path;
                before(async () => {
                    anyAddress1 = user1Address;
                    anyAddress2 = user2Address;
                    tokens = [anyAddress1, anyAddress2];
                    fees = [100n];
                    path = hardhat_1.ethers.solidityPacked(["address", "uint24", "address"], [anyAddress1, 100n, anyAddress2]);
                    txResult = await strategyContract.connect(deployer).buildPath(tokens, fees);
                    await txResult.wait();
                });
                it("THEN it should update state variable swapPath", async () => {
                    const swapPath = await strategyContract.swapPath();
                    (0, chai_1.expect)(swapPath).equals(path);
                });
                it("THEN it should emit an Event", async () => {
                    await (0, chai_1.expect)(txResult).to.emit(strategyContract, "PathUpdated").withArgs(path);
                });
                after(async () => {
                    await baseSnapshot.restore();
                });
            });
        });
        describe("WHEN trying to wrapToken", function () {
            describe("WHEN executing with wrong context", function () {
                before(async () => {
                    await liquidRSTokenContract
                        .connect(deployer)
                        .mint(strategyContractAddress, 10n);
                });
                after(async () => {
                    await baseSnapshot.restore();
                });
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.connect(nonAuthorized).wrapToken(1n)).to.be.revertedWithCustomError(strategyContract, "AccessControlUnauthorizedAccount");
                    });
                });
                describe("WHEN wrapper is not defined", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.wrapToken(1n)).to.be.revertedWith("No defined wrapper");
                    });
                });
                describe("WHEN wrapper returned zero amount", function () {
                    it("THEN it should fail", async () => {
                        await strategyContract.setWrappedLiquidTokenAddress(genericWrapperMockContractAddress);
                        await genericWrapperMockContract.setAmountToReturn(0n);
                        await (0, chai_1.expect)(strategyContract.wrapToken(1n))
                            .to.be.revertedWithCustomError(strategyContract, "StrategyWrapError")
                            .withArgs(genericWrapperMockContractAddress, 1n, true);
                    });
                });
            });
            describe("WHEN executing with right context", function () {
                before(async () => {
                    await liquidRSTokenContract
                        .connect(deployer)
                        .mint(strategyContractAddress, constants_1.AMOUNT_1E18 * 5n);
                    await strategyContract.setWrappedLiquidTokenAddress(genericWrapperMockContractAddress);
                    txResult = await strategyContract.connect(deployer).wrapToken(constants_1.AMOUNT_1E18);
                });
                after(async () => {
                    await baseSnapshot.restore();
                });
                it("THEN it should update balances of liquid restaking token", async () => {
                    await (0, chai_1.expect)(txResult).to.changeTokenBalances(liquidRSTokenContract, [strategyContractAddress, genericWrapperMockContractAddress], [-constants_1.AMOUNT_1E18, constants_1.AMOUNT_1E18]);
                });
                it("THEN it should update balances of wrapped token for strategy", async () => {
                    await (0, chai_1.expect)(txResult).to.changeTokenBalances(genericWrapperMockContract, [strategyContractAddress], [constants_1.AMOUNT_1E18]);
                });
                it("THEN it should emit an Event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(strategyContract, "WrappedAmount")
                        .withArgs(liquidRSTokenContractAddress, constants_1.AMOUNT_1E18, genericWrapperMockContractAddress, constants_1.AMOUNT_1E18);
                });
            });
        });
        describe("WHEN trying to unwrapToken", function () {
            describe("WHEN executing with wrong context", function () {
                before(async () => {
                    await liquidRSTokenContract
                        .connect(deployer)
                        .mint(genericWrapperMockContractAddress, constants_1.AMOUNT_1E18 * 5n);
                    await genericWrapperMockContract
                        .connect(deployer)
                        .mint(strategyContractAddress, constants_1.AMOUNT_1E18 * 5n);
                });
                after(async () => {
                    await baseSnapshot.restore();
                });
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.connect(nonAuthorized).unwrapToken(1n)).to.be.revertedWithCustomError(strategyContract, "AccessControlUnauthorizedAccount");
                    });
                });
                describe("WHEN wrapper is not defined", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.unwrapToken(1n)).to.be.revertedWith("No defined wrapper");
                    });
                });
                describe("WHEN wrapper returned zero amount", function () {
                    it("THEN it should fail", async () => {
                        await strategyContract.setWrappedLiquidTokenAddress(genericWrapperMockContractAddress);
                        await genericWrapperMockContract.setAmountToReturn(0n);
                        await (0, chai_1.expect)(strategyContract.unwrapToken(1n))
                            .to.be.revertedWithCustomError(strategyContract, "StrategyWrapError")
                            .withArgs(genericWrapperMockContractAddress, 1n, false);
                    });
                });
            });
            describe("WHEN executing with right context", function () {
                before(async () => {
                    await liquidRSTokenContract
                        .connect(deployer)
                        .mint(genericWrapperMockContractAddress, constants_1.AMOUNT_1E18 * 5n);
                    await genericWrapperMockContract
                        .connect(deployer)
                        .mint(strategyContractAddress, constants_1.AMOUNT_1E18 * 5n);
                    await strategyContract.setWrappedLiquidTokenAddress(genericWrapperMockContractAddress);
                    txResult = await strategyContract.connect(deployer).unwrapToken(constants_1.AMOUNT_1E18);
                });
                after(async () => {
                    await baseSnapshot.restore();
                });
                it("THEN it should update balances of liquid restaking token", async () => {
                    await (0, chai_1.expect)(txResult).to.changeTokenBalances(liquidRSTokenContract, [strategyContractAddress, genericWrapperMockContractAddress], [constants_1.AMOUNT_1E18, -constants_1.AMOUNT_1E18]);
                });
                it("THEN it should update balances of wrapped token for strategy", async () => {
                    await (0, chai_1.expect)(txResult).to.changeTokenBalances(genericWrapperMockContract, [strategyContractAddress, genericWrapperMockContractAddress], [-constants_1.AMOUNT_1E18, constants_1.AMOUNT_1E18]);
                });
                it("THEN it should emit an Event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(strategyContract, "UnwrappedAmount")
                        .withArgs(genericWrapperMockContractAddress, constants_1.AMOUNT_1E18, liquidRSTokenContractAddress, constants_1.AMOUNT_1E18);
                });
            });
        });
        describe("WHEN trying to updateDeployedAssetVaule", function () {
            describe("WHEN executing with wrong context", function () {
                after(async () => {
                    await baseSnapshot.restore();
                });
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.connect(nonAuthorized).updateDeployedAssetVaule(0n)).to.be.revertedWithCustomError(strategyContract, "AccessControlUnauthorizedAccount");
                    });
                });
                describe("WHEN source is wrong", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.updateDeployedAssetVaule(3n)).to.be.revertedWith("Invalid source to get price");
                    });
                });
            });
            describe("WHEN executing with right context (price from withdraw adapter)", function () {
                let expectedValuation;
                before(async () => {
                    await liquidRSTokenContract
                        .connect(deployer)
                        .mint(strategyContractAddress, constants_1.AMOUNT_1E18 * 5n);
                    const tokenPrice = 500000000000000000n;
                    await protocolContractLRS.setTokenPrice(tokenPrice);
                    const balanceLRT = await liquidRSTokenContract.balanceOf(strategyContractAddress);
                    expectedValuation = (balanceLRT * tokenPrice) / constants_1.AMOUNT_1E18;
                    txResult = await strategyContract.connect(deployer).updateDeployedAssetVaule(2);
                });
                after(async () => {
                    await baseSnapshot.restore();
                });
                it("THEN it should update valuation of liquid restaking token", async () => {
                    (0, chai_1.expect)(expectedValuation).equals(await strategyContract.deployedAssetsValue());
                });
                it("THEN getDeployedAssetsValue() should return correct amount", async () => {
                    (0, chai_1.expect)(expectedValuation).equals(await strategyContract.getDeployedAssetsValue());
                });
                it("THEN it should emit an Event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(strategyContract, "DeployedAssetsValueUpdated")
                        .withArgs(liquidRSTokenContractAddress, expectedValuation, strategyContractAddress);
                });
            });
            describe("WHEN executing with right context (price from deposit adapter)", function () {
                let expectedValuation;
                before(async () => {
                    await liquidRSTokenContract
                        .connect(deployer)
                        .mint(strategyContractAddress, constants_1.AMOUNT_1E18 * 5n);
                    const tokenPrice = 500000000000000000n;
                    await protocolContractLRS.setTokenPrice(tokenPrice);
                    const balanceLRT = await liquidRSTokenContract.balanceOf(strategyContractAddress);
                    expectedValuation = (balanceLRT * tokenPrice) / constants_1.AMOUNT_1E18;
                    txResult = await strategyContract.connect(deployer).updateDeployedAssetVaule(1);
                });
                after(async () => {
                    await baseSnapshot.restore();
                });
                it("THEN it should update valuation of liquid restaking token", async () => {
                    (0, chai_1.expect)(expectedValuation).equals(await strategyContract.deployedAssetsValue());
                });
                it("THEN getDeployedAssetsValue() should return correct amount", async () => {
                    (0, chai_1.expect)(expectedValuation).equals(await strategyContract.getDeployedAssetsValue());
                });
                it("THEN it should emit an Event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(strategyContract, "DeployedAssetsValueUpdated")
                        .withArgs(liquidRSTokenContractAddress, expectedValuation, strategyContractAddress);
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
                        await (0, chai_1.expect)(strategyContract.connect(nonAuthorized).pause()).to.be.revertedWithCustomError(strategyContract, "AccessControlUnauthorizedAccount");
                    });
                });
                describe("WHEN it is already paused", function () {
                    it("THEN it should fail", async () => {
                        await strategyContract.pause();
                        await (0, chai_1.expect)(strategyContract.pause()).to.be.revertedWithCustomError(strategyContract, "EnforcedPause");
                    });
                });
            });
            describe("WHEN executing with right context", function () {
                before(async () => {
                    txResult = await strategyContract.pause();
                });
                after(async () => {
                    await baseSnapshot.restore();
                });
                it("THEN pause state variable should be true", async () => {
                    (0, chai_1.expect)(await strategyContract.paused()).to.be.true;
                });
                it("THEN it should emit an Event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(strategyContract, "Paused")
                        .withArgs(deployerAddress);
                });
            });
        });
        describe("WHEN trying to unpause the contract", function () {
            describe("WHEN executing with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.connect(nonAuthorized).unpause()).to.be.revertedWithCustomError(strategyContract, "AccessControlUnauthorizedAccount");
                    });
                });
                describe("WHEN is not paused", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.unpause()).to.be.revertedWithCustomError(strategyContract, "ExpectedPause");
                    });
                });
            });
            describe("WHEN executing with right context", function () {
                before(async () => {
                    await strategyContract.pause();
                    txResult = await strategyContract.unpause();
                });
                after(async () => {
                    await baseSnapshot.restore();
                });
                it("THEN pause state variable should be false", async () => {
                    (0, chai_1.expect)(await strategyContract.paused()).to.be.false;
                });
                it("THEN it should emit an Event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(strategyContract, "Unpaused")
                        .withArgs(deployerAddress);
                });
            });
        });
        describe("WHEN trying to run executeDeploymentStrategy", function () {
            describe("WHEN executing deposit with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        const vaultManagerRole = await strategyContract.VAULT_MANAGER_ROLE();
                        await (0, chai_1.expect)(strategyContract
                            .connect(nonAuthorized)
                            .executeDeploymentStrategy(user1Address, user1Address, user1Address, 1n))
                            .to.be.revertedWithCustomError(strategyContract, "AccessControlUnauthorizedAccount")
                            .withArgs(nonAuthorizedAddress, vaultManagerRole);
                    });
                });
                describe("WHEN sender is ZERO address", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.executeDeploymentStrategy(constants_1.ZERO_ADDRESS, user1Address, user1Address, 1n))
                            .to.be.revertedWithCustomError(strategyContract, "ZeroAddress")
                            .withArgs("sender_");
                    });
                });
                describe("WHEN receiver is ZERO address", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.executeDeploymentStrategy(user1Address, constants_1.ZERO_ADDRESS, user1Address, 1n))
                            .to.be.revertedWithCustomError(strategyContract, "ZeroAddress")
                            .withArgs("receiver_");
                    });
                });
                describe("WHEN asset is ZERO address", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.executeDeploymentStrategy(user1Address, user1Address, constants_1.ZERO_ADDRESS, 1n))
                            .to.be.revertedWithCustomError(strategyContract, "ZeroAddress")
                            .withArgs("asset_");
                    });
                });
                describe("WHEN assetsAmount is ZERO", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.executeDeploymentStrategy(user1Address, user1Address, user1Address, 0n))
                            .to.be.revertedWithCustomError(strategyContract, "ZeroAmount")
                            .withArgs("assetsAmount_");
                    });
                });
                describe("WHEN contract is paused", function () {
                    before(async () => {
                        await strategyContract.pause();
                    });
                    after(async () => {
                        await baseSnapshot.restore();
                    });
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.executeDeploymentStrategy(deployerAddress, strategyContractAddress, underlyingTokenAddress, constants_1.AMOUNT_1E18)).to.be.revertedWithCustomError(strategyContract, "EnforcedPause");
                    });
                });
                describe("WHEN first deposit on protocol returns 0 liquid tokens", function () {
                    let amount;
                    before(async () => {
                        amount = constants_1.AMOUNT_1E18 * 5n;
                        await wethTokenContract.approve(adapterLSContractAddress, amount);
                        await protocolContractLS.setAmounts(0, 0);
                    });
                    after(async () => {
                        await baseSnapshot.restore();
                    });
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.executeDeploymentStrategy(deployerAddress, strategyContractAddress, underlyingTokenAddress, amount))
                            .to.be.revertedWithCustomError(strategyContract, "ErrorStep")
                            .withArgs("1");
                    });
                });
                describe("WHEN second deposit on protocol returns 0 liquid tokens", function () {
                    let amount;
                    before(async () => {
                        amount = constants_1.AMOUNT_1E18 * 5n;
                        await wethTokenContract.approve(adapterLSContractAddress, amount);
                        await protocolContractLS.setAmounts(0, constants_1.AMOUNT_1E18 * 4n);
                        await protocolContractLRS.setAmounts(0, 0);
                    });
                    after(async () => {
                        await baseSnapshot.restore();
                    });
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.executeDeploymentStrategy(deployerAddress, strategyContractAddress, underlyingTokenAddress, amount))
                            .to.be.revertedWithCustomError(strategyContract, "ErrorStep")
                            .withArgs("2");
                    });
                });
                describe("WHEN second deposit on protocol returns a not expected token", function () {
                    let amount;
                    before(async () => {
                        amount = constants_1.AMOUNT_1E18 * 5n;
                        await wethTokenContract.approve(adapterLSContractAddress, amount);
                        await protocolContractLS.setAmounts(amount, amount);
                        await protocolContractLRS.setAmounts(amount, amount);
                        await adapterLRSContract.setReturnWrongAddress(true);
                    });
                    after(async () => {
                        await baseSnapshot.restore();
                    });
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.executeDeploymentStrategy(deployerAddress, strategyContractAddress, underlyingTokenAddress, amount))
                            .to.be.revertedWithCustomError(strategyContract, "ErrorStep")
                            .withArgs("2");
                    });
                });
            });
            describe("WHEN executing with right context", function () {
                let amount;
                before(async () => {
                    amount = constants_1.AMOUNT_1E18 * 5n;
                    await wethTokenContract.approve(adapterLSContractAddress, amount);
                    await protocolContractLS.setAmounts(0, constants_1.AMOUNT_1E18 * 4n);
                    await protocolContractLRS.setAmounts(0, constants_1.AMOUNT_1E18 * 6n);
                    txResult = await strategyContract.executeDeploymentStrategy(deployerAddress, strategyContractAddress, underlyingTokenAddress, amount);
                });
                after(async () => {
                    await baseSnapshot.restore();
                });
                it("THEN weth should decrease in deployer and increase in protocol", async () => {
                    await (0, chai_1.expect)(txResult).to.changeTokenBalances(wethTokenContract, [deployerAddress, protocolContractLSAddress], [-amount, amount]);
                });
                it("THEN liquid token should decrease in protocol 1", async () => {
                    await (0, chai_1.expect)(txResult).to.changeTokenBalances(liquidTokenContract, [protocolContractLSAddress, protocolContractLRSAddress], [-constants_1.AMOUNT_1E18 * 4n, constants_1.AMOUNT_1E18 * 4n]);
                });
                it("THEN Rliquid token should decrease in protocol 2 and increase in strategy", async () => {
                    await (0, chai_1.expect)(txResult).to.changeTokenBalances(liquidRSTokenContract, [strategyContractAddress, protocolContractLRSAddress], [constants_1.AMOUNT_1E18 * 6n, -constants_1.AMOUNT_1E18 * 6n]);
                });
                it("THEN it should emit an Event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(strategyContract, "DeploymentStrategyExecuted")
                        .withArgs(underlyingTokenAddress, amount, liquidRSTokenContractAddress, constants_1.AMOUNT_1E18 * 6n);
                });
            });
        });
        describe("WHEN trying to executeWithdrawStrategy", function () {
            describe("WHEN executing with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        const vaultManagerRole = await strategyContract.VAULT_MANAGER_ROLE();
                        await (0, chai_1.expect)(strategyContract
                            .connect(nonAuthorized)
                            .executeWithdrawStrategy(user1Address, user1Address, 1n))
                            .to.be.revertedWithCustomError(strategyContract, "AccessControlUnauthorizedAccount")
                            .withArgs(nonAuthorizedAddress, vaultManagerRole);
                    });
                });
                describe("WHEN receiver is ZERO address", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.executeWithdrawStrategy(constants_1.ZERO_ADDRESS, user1Address, 1n))
                            .to.be.revertedWithCustomError(strategyContract, "ZeroAddress")
                            .withArgs("receiver_");
                    });
                });
                describe("WHEN asset is ZERO address", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.executeWithdrawStrategy(user1Address, constants_1.ZERO_ADDRESS, 1n))
                            .to.be.revertedWithCustomError(strategyContract, "ZeroAddress")
                            .withArgs("asset_");
                    });
                });
                describe("WHEN assetsAmount is ZERO", function () {
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.executeWithdrawStrategy(user1Address, user1Address, 0n))
                            .to.be.revertedWithCustomError(strategyContract, "ZeroAmount")
                            .withArgs("assetsAmount_");
                    });
                });
                describe("WHEN contract is paused", function () {
                    before(async () => {
                        await strategyContract.pause();
                    });
                    after(async () => {
                        await baseSnapshot.restore();
                    });
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.executeWithdrawStrategy(deployerAddress, deployerAddress, constants_1.AMOUNT_1E18)).to.be.revertedWithCustomError(strategyContract, "EnforcedPause");
                    });
                });
                describe("WHEN strategy does not have enough lrs tokens", function () {
                    let amountToPut;
                    let amountToReceive;
                    before(async () => {
                        amountToPut = 8000000000000000000n;
                        amountToReceive = 15000000000000000000n;
                        await liquidRSTokenContract.mint(strategyContractAddress, amountToPut);
                        await protocolContractLRS.setTokenPrice(1500000000000000000n);
                        await protocolContractLRS.setAmounts(amountToReceive, 0);
                    });
                    after(async () => {
                        await baseSnapshot.restore();
                    });
                    it("THEN it should fail", async () => {
                        const amountRequested = (constants_1.AMOUNT_1E18 * amountToReceive) / 1500000000000000000n;
                        await (0, chai_1.expect)(strategyContract.executeWithdrawStrategy(deployerAddress, underlyingTokenAddress, amountToReceive))
                            .to.be.revertedWithCustomError(strategyContract, "InsufficientFundsToWithdraw")
                            .withArgs(amountToPut, amountRequested);
                    });
                });
                describe("WHEN protocol returns 0 assets", function () {
                    let amountToPut;
                    let amountToReceive;
                    before(async () => {
                        amountToPut = 10000000000000000000n;
                        amountToReceive = 15000000000000000000n;
                        await liquidRSTokenContract.mint(strategyContractAddress, amountToPut);
                        await protocolContractLRS.setTokenPrice(1500000000000000000n);
                        await protocolContractLRS.setAmounts(0, 0);
                    });
                    after(async () => {
                        await baseSnapshot.restore();
                    });
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.executeWithdrawStrategy(deployerAddress, underlyingTokenAddress, amountToReceive)).to.be.revertedWithCustomError(strategyContract, "ExecuteWithdrawWStrategyError");
                    });
                });
                describe("WHEN amount to be wrapped is not enough on strategy", function () {
                    let amountToPut;
                    let amountToReceive;
                    before(async () => {
                        amountToPut = 10000000000000000000n;
                        amountToReceive = 50000000000000000000n;
                        await strategyContract.setWrappedLiquidTokenAddress(genericWrapperMockContractAddress);
                        await liquidRSTokenContract.mint(strategyContractAddress, amountToPut);
                        await protocolContractLRS.setTokenPrice(1500000000000000000n);
                        await protocolContractLRS.setAmounts(0, 0);
                    });
                    after(async () => {
                        await baseSnapshot.restore();
                    });
                    it("THEN it should fail", async () => {
                        await (0, chai_1.expect)(strategyContract.executeWithdrawStrategy(deployerAddress, underlyingTokenAddress, amountToReceive)).to.be.revertedWith("Not enough tokens to wrap");
                    });
                });
            });
            describe("WHEN executing with right context", function () {
                let amountToPut;
                let amountToReceive;
                describe("WHEN executing with right context (NO WRAPPER)", function () {
                    before(async () => {
                        amountToPut = 10000000000000000000n;
                        amountToReceive = 15000000000000000000n;
                        await liquidRSTokenContract.mint(strategyContractAddress, amountToPut);
                        await protocolContractLRS.setTokenPrice(1500000000000000000n);
                        await protocolContractLRS.setAmounts(amountToReceive, 0);
                        txResult = await strategyContract.executeWithdrawStrategy(deployerAddress, underlyingTokenAddress, amountToReceive);
                    });
                    after(async () => {
                        await baseSnapshot.restore();
                    });
                    it("THEN it should emit an Event", async () => {
                        await (0, chai_1.expect)(txResult)
                            .to.emit(strategyContract, "WithdrawStrategyExecuted")
                            .withArgs(deployerAddress, underlyingTokenAddress, amountToReceive);
                    });
                    it("THEN Rliquid token should decrease in strategy and increase in protocol", async () => {
                        await (0, chai_1.expect)(txResult).to.changeTokenBalances(liquidRSTokenContract, [strategyContractAddress, protocolContractLRSAddress], [-amountToPut, amountToPut]);
                    });
                    it("THEN weth balance should increase in deployer and decrease in protocol", async () => {
                        await (0, chai_1.expect)(txResult).to.changeTokenBalances(wethTokenContract, [deployerAddress, protocolContractLRSAddress], [amountToReceive, -amountToReceive]);
                    });
                });
                describe("WHEN executing with right context (WITH WRAPPER)", function () {
                    let leftover;
                    before(async () => {
                        leftover = hardhat_1.ethers.parseEther("2");
                        amountToPut = 10000000000000000000n;
                        amountToReceive = 15000000000000000000n;
                        await adapterLRSContract.setSlippage(200000000000000000n);
                        await strategyContract.setWrappedLiquidTokenAddress(genericWrapperMockContractAddress);
                        await liquidRSTokenContract.mint(genericWrapperMockContractAddress, amountToPut + leftover);
                        await protocolContractLRS.setStrategyAddress(strategyContractAddress);
                        await liquidRSTokenContract.mint(strategyContractAddress, amountToPut + leftover);
                        await protocolContractLRS.setTokenPrice(1500000000000000000n);
                        await protocolContractLRS.setAmounts(amountToReceive, 0);
                        await protocolContractLRS.setLeftover(hardhat_1.ethers.parseEther("2"));
                        txResult = await strategyContract.executeWithdrawStrategy(deployerAddress, underlyingTokenAddress, amountToReceive);
                    });
                    after(async () => {
                        await baseSnapshot.restore();
                    });
                    it("THEN it should emit an Event", async () => {
                        await (0, chai_1.expect)(txResult)
                            .to.emit(strategyContract, "WithdrawStrategyExecuted")
                            .withArgs(deployerAddress, underlyingTokenAddress, amountToReceive);
                    });
                    it("THEN Rliquid token should decrease in strategy", async () => {
                        await (0, chai_1.expect)(txResult).to.changeTokenBalances(liquidRSTokenContract, [strategyContractAddress], [-amountToPut]);
                    });
                    it("THEN wrapped Rliquid token should increase in protocol", async () => {
                        await (0, chai_1.expect)(txResult).to.changeTokenBalances(genericWrapperMockContract, [protocolContractLRSAddress], [amountToPut]);
                    });
                    it("THEN weth balance should increase in deployer and decrease in protocol", async () => {
                        await (0, chai_1.expect)(txResult).to.changeTokenBalances(wethTokenContract, [deployerAddress, protocolContractLRSAddress], [amountToReceive, -amountToReceive]);
                    });
                });
            });
        });
        describe("WHEN trying to upgrade Strategy", function () {
            let strategyV2Contract;
            before(async () => {
                await strategyContract.connect(deployer).setStrategyName("Strategy V1");
                const StrategyV2Factory = await hardhat_1.ethers.getContractFactory("StrSimpleReStakingV2");
                strategyV2Contract = (await hardhat_1.upgrades.upgradeProxy(strategyContractAddress, StrategyV2Factory));
                await strategyV2Contract.waitForDeployment();
            });
            it("THEN Strategy previous values should remain intact", async () => {
                (0, chai_1.expect)(await strategyV2Contract.strategyName()).to.equal("Strategy V1");
            });
            it("THEN new function and storage should exists in upgraded contract", async () => {
                await strategyV2Contract.addedMethodStrategyV2(1000000n);
                (0, chai_1.expect)(await strategyV2Contract.addedVariableStrategyV2()).to.equal(1000000n);
            });
        });
    });
});
chai.Assertion.addMethod("closeToBigInt", function (expected, tolerance) {
    const actual = this._obj;
    this.assert(actual >= expected - tolerance && actual <= expected + tolerance, "expected #{this} to be close to #{exp} +/- #{tol}", "expected #{this} not to be close to #{exp} +/- #{tol}", expected, actual);
});
//# sourceMappingURL=strSimpleReStaking.test.js.map