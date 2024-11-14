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
const _deployContracts_1 = require("../../../scripts/_deployContracts");
const emulation_1 = require("../../_helpers/emulation");
const _configContracts_1 = require("../../../scripts/_configContracts");
const constants_1 = require("../../_helpers/constants");
const utils_1 = require("./../../_helpers/utils");
let baseSnapshot;
let deployer;
let user1;
let user2;
let user3;
let deployerAddress;
let user1Address;
let user2Address;
let masterTokenAddress;
let underlyingTokenAddress;
let txResult;
let masterTokenContract;
let wethTokenContract;
let liquidTokenContract;
let vaultsRegistryContract;
let vaultContract;
let vaultAddress;
let vaultImplementation;
let vaultImplementationAddress;
let lidoAdapterContract;
let lidoAdapterContractAddress;
let uniswapAdapterContract;
let uniswapAdapterContractAddress;
let strategyContract;
let strategyContractAddress;
const DEFAULT_FEE_RATE = hardhat_1.ethers.parseEther("10");
const INTIAL_MINT = hardhat_1.ethers.parseEther("100");
const INITIAL_DEPOSIT = hardhat_1.ethers.parseEther("20");
const UNISWAP_PATH_FEE = 100n;
let deltaLido;
let uniQuote;
let oneStETHinWETH;
let expectedBalanceAferDeployment;
let expectedInitialValuation;
describe("LIDO ==> Staking Strategy Tests -->> LIVE TESTS", function () {
    this.timeout(constants_1.TEST_TIMEOUT);
    before(async () => {
        [deployer, user1, user2, user3] = await hardhat_1.ethers.getSigners();
        [deployerAddress, user1Address, user2Address] = await Promise.all([
            deployer.getAddress(),
            user1.getAddress(),
            user2.getAddress(),
        ]);
        wethTokenContract = (await (0, emulation_1.getWethContract)(constants_1.WETH_ADDRESS, deployer));
        underlyingTokenAddress = await wethTokenContract.getAddress();
        liquidTokenContract = await (0, emulation_1.getLidoStETHContract)(constants_1.LIDO_stETH_ADDRESS, deployer);
        let tx = await wethTokenContract.connect(user1).deposit({ value: INTIAL_MINT });
        await tx.wait();
        tx = await wethTokenContract.connect(user2).deposit({ value: INTIAL_MINT });
        await tx.wait();
        tx = await wethTokenContract.connect(user3).deposit({ value: INTIAL_MINT });
        await tx.wait();
        vaultImplementation = (await (0, _deployContracts_1.deployVaultImplementation)());
        vaultImplementationAddress = await vaultImplementation.getAddress();
        vaultsRegistryContract = (await (0, _deployContracts_1.deployVaultsRegistry)(DEFAULT_FEE_RATE, vaultImplementationAddress));
        masterTokenContract = (await (0, _deployContracts_1.deployMasterTokenMock)("MasterTokenMock", await vaultsRegistryContract.getAddress(), "LYS", "LYS", BigInt(18)));
        masterTokenAddress = await masterTokenContract.getAddress();
        txResult = await vaultsRegistryContract.deployVault(underlyingTokenAddress, masterTokenAddress, deployerAddress, "whyETH Shares", "sWhyETH");
        const txReceipt = await txResult.wait();
        vaultAddress = await (0, utils_1.getVariableFromEvent)(vaultsRegistryContract, "VaultDeployed", txReceipt, 0);
        vaultContract = await hardhat_1.ethers.getContractAt("Vault", vaultAddress);
        await masterTokenContract.setAssetAddress(underlyingTokenAddress);
        lidoAdapterContract = (await (0, _deployContracts_1.deployLidoAdapter)("LidoAdapter", constants_1.LIDO_stETH_ADDRESS, constants_1.WETH_ADDRESS, constants_1.LIDO_WstETH_ADDRESS));
        lidoAdapterContractAddress = await lidoAdapterContract.getAddress();
        uniswapAdapterContract = (await (0, _deployContracts_1.deployUniswapAdapter)("UniswapV3Adapter", constants_1.UNISWAP_ROUTER_ADDRESS, constants_1.UNISWAP_QUOTER_ADDRESS, constants_1.WETH_ADDRESS));
        uniswapAdapterContractAddress = await uniswapAdapterContract.getAddress();
        strategyContract = (await (0, _deployContracts_1.deployVaultStrategy)("StrSimpleStaking", vaultAddress, constants_1.LIDO_stETH_ADDRESS, [lidoAdapterContractAddress], [uniswapAdapterContractAddress], "Simple Staking Strategy"));
        strategyContractAddress = await strategyContract.getAddress();
        await (0, _configContracts_1.configVault)(vaultAddress, strategyContractAddress, strategyContractAddress);
        await (0, _configContracts_1.configDepositStrategy)("StrSimpleStaking", strategyContractAddress, constants_1.ZERO_ADDRESS, constants_1.LIDO_WstETH_ADDRESS);
        await (0, _configContracts_1.configSwapPath)("StrSimpleStaking", strategyContractAddress, [constants_1.WETH_ADDRESS, constants_1.LIDO_WstETH_ADDRESS], [BigInt(100)]);
        await uniswapAdapterContract.setPoolPerTokenForPrice(constants_1.LIDO_WstETH_ADDRESS, constants_1.WstETH_WETH_POOL);
        await strategyContract.setPriceFeedPerToken(constants_1.LIDO_stETH_ADDRESS, constants_1.STETH_ETH_feed);
        let roleToAssign = await vaultContract.VAULT_MANAGER_ROLE();
        await vaultContract.grantRole(roleToAssign, deployerAddress);
        roleToAssign = await vaultContract.VAULT_MANAGER_ROLE();
        await vaultContract.grantRole(roleToAssign, masterTokenAddress);
        roleToAssign = await vaultContract.MASTER_TOKEN_ROLE();
        await vaultContract.grantRole(roleToAssign, masterTokenAddress);
        roleToAssign = await strategyContract.VAULT_MANAGER_ROLE();
        await strategyContract.grantRole(roleToAssign, vaultAddress);
        roleToAssign = await lidoAdapterContract.VAULT_STRATEGY_ROLE();
        await lidoAdapterContract.grantRole(roleToAssign, strategyContractAddress);
        roleToAssign = await uniswapAdapterContract.VAULT_STRATEGY_ROLE();
        await uniswapAdapterContract.grantRole(roleToAssign, strategyContractAddress);
        roleToAssign = await vaultContract.DEFAULT_ADMIN_ROLE();
        await masterTokenContract.grantRole(roleToAssign, deployerAddress);
        await masterTokenContract.grantRole(roleToAssign, user1Address);
        await masterTokenContract.grantRole(roleToAssign, user2Address);
        baseSnapshot = await (0, hardhat_network_helpers_1.takeSnapshot)();
        tx = await wethTokenContract.connect(deployer).deposit({ value: INTIAL_MINT });
        await tx.wait();
        const AMOUNT_IN = constants_1.AMOUNT_1E18 * 20n;
        deltaLido = await (0, utils_1.getDelta)(constants_1.WETH_ADDRESS, constants_1.LIDO_stETH_ADDRESS, deployer, AMOUNT_IN, lidoAdapterContract);
        const AMOUNT_OUT = constants_1.AMOUNT_1E18 * 5n;
        uniQuote = await (0, utils_1.getQuoteFromUni)("KELP", uniswapAdapterContract, AMOUNT_OUT, constants_1.LIDO_WstETH_ADDRESS, constants_1.WETH_ADDRESS, UNISWAP_PATH_FEE);
        oneStETHinWETH = await strategyContract.getTokenPrice(constants_1.LIDO_stETH_ADDRESS, 2);
        expectedBalanceAferDeployment = (deltaLido.outAmount * constants_1.AMOUNT_1E18) / deltaLido.delta;
        expectedInitialValuation = (expectedBalanceAferDeployment * oneStETHinWETH) / constants_1.AMOUNT_1E18;
    });
    describe("WHEN executing deposit", function () {
        describe("WHEN executing deposit with correct parameters", function () {
            let AMOUNT;
            let pendingDepositAssetsBefore;
            let sharesAmount;
            describe("WHEN user1 deposits 10 ETH", function () {
                before(async () => {
                    AMOUNT = hardhat_1.ethers.parseEther("10");
                    await wethTokenContract.connect(user1).approve(vaultAddress, AMOUNT);
                    pendingDepositAssetsBefore = await vaultContract.pendingDepositAssets();
                    txResult = await masterTokenContract
                        .connect(user1)
                        .deposit(vaultAddress, AMOUNT, user1Address);
                    const txReceipt = await txResult.wait();
                    sharesAmount = BigInt(await (0, utils_1.getVariableFromEvent)(vaultContract, "Deposit", txReceipt, 3));
                });
                it("THEN it should increase assetsToDeploy", async () => {
                    const pendingDepositAssetsAfter = await vaultContract.pendingDepositAssets();
                    (0, chai_1.expect)(pendingDepositAssetsBefore + AMOUNT).equals(pendingDepositAssetsAfter);
                });
                it("THEN pendingDepositAssets should be 10", async () => {
                    const pendingDepositAssets = await vaultContract.pendingDepositAssets();
                    (0, chai_1.expect)(AMOUNT).equals(pendingDepositAssets);
                });
                it("THEN shares amount should match AMOUNT (10) since exchange rate is 1", async () => {
                    (0, chai_1.expect)(AMOUNT).equals(sharesAmount);
                });
                it("THEN assets should decrease in user1 and increase in vault balances", async () => {
                    await (0, chai_1.expect)(txResult).to.changeTokenBalances(wethTokenContract, [user1Address, vaultAddress], [-AMOUNT, AMOUNT]);
                });
                it("THEN shares should increase in master token balance (10)", async () => {
                    await (0, chai_1.expect)(txResult).to.changeTokenBalance(vaultContract, masterTokenAddress, sharesAmount);
                });
                it("THEN mapping for user1 should update with 10 shares", async () => {
                    const sharesQty = await masterTokenContract.usersShares(user1Address);
                    (0, chai_1.expect)(sharesQty).equals(sharesAmount);
                });
                it("THEN it should emit an Event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(vaultContract, "Deposit")
                        .withArgs(user1Address, masterTokenAddress, AMOUNT, sharesAmount);
                });
            });
            describe("WHEN user2 deposits 5 ETH first time", function () {
                before(async () => {
                    AMOUNT = hardhat_1.ethers.parseEther("5");
                    await wethTokenContract.connect(user2).approve(vaultAddress, AMOUNT);
                    pendingDepositAssetsBefore = await vaultContract.pendingDepositAssets();
                    txResult = await masterTokenContract
                        .connect(user2)
                        .deposit(vaultAddress, AMOUNT, user2Address);
                    const txReceipt = await txResult.wait();
                    sharesAmount = BigInt(await (0, utils_1.getVariableFromEvent)(vaultContract, "Deposit", txReceipt, 3));
                });
                it("THEN it should increase assetsToDeploy", async () => {
                    const pendingDepositAssetsAfter = await vaultContract.pendingDepositAssets();
                    (0, chai_1.expect)(pendingDepositAssetsBefore + AMOUNT).equals(pendingDepositAssetsAfter);
                });
                it("THEN pendingDepositAssets should be 15", async () => {
                    const pendingDepositAssets = await vaultContract.pendingDepositAssets();
                    (0, chai_1.expect)(hardhat_1.ethers.parseEther("15")).equals(pendingDepositAssets);
                });
                it("THEN shares amount should match AMOUNT (5) since exchange rate is 1", async () => {
                    (0, chai_1.expect)(AMOUNT).equals(sharesAmount);
                });
                it("THEN assets should decrease in user2 and increase in vault balances", async () => {
                    await (0, chai_1.expect)(txResult).to.changeTokenBalances(wethTokenContract, [user2Address, vaultAddress], [-AMOUNT, AMOUNT]);
                });
                it("THEN shares should increase in master token balance (15)", async () => {
                    await (0, chai_1.expect)(txResult).to.changeTokenBalance(vaultContract, masterTokenAddress, sharesAmount);
                });
                it("THEN mapping for user2 should update with 5 shares", async () => {
                    const sharesQty = await masterTokenContract.usersShares(user2Address);
                    (0, chai_1.expect)(sharesQty).equals(sharesAmount);
                });
                it("THEN it should emit an Event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(vaultContract, "Deposit")
                        .withArgs(user2Address, masterTokenAddress, AMOUNT, sharesAmount);
                });
            });
            describe("WHEN user2 deposits second time", function () {
                before(async () => {
                    AMOUNT = hardhat_1.ethers.parseEther("5");
                    await wethTokenContract.connect(user2).approve(vaultAddress, AMOUNT);
                    pendingDepositAssetsBefore = await vaultContract.pendingDepositAssets();
                    txResult = await masterTokenContract
                        .connect(user2)
                        .deposit(vaultAddress, AMOUNT, user2Address);
                    const txReceipt = await txResult.wait();
                    sharesAmount = BigInt(await (0, utils_1.getVariableFromEvent)(vaultContract, "Deposit", txReceipt, 3));
                });
                it("THEN it should increase assetsToDeploy", async () => {
                    const pendingDepositAssetsAfter = await vaultContract.pendingDepositAssets();
                    (0, chai_1.expect)(pendingDepositAssetsBefore + AMOUNT).equals(pendingDepositAssetsAfter);
                });
                it("THEN pendingDepositAssets should be 20", async () => {
                    const pendingDepositAssets = await vaultContract.pendingDepositAssets();
                    (0, chai_1.expect)(hardhat_1.ethers.parseEther("20")).equals(pendingDepositAssets);
                });
                it("THEN shares amount should match AMOUNT since exchange rate it 1", async () => {
                    (0, chai_1.expect)(AMOUNT).equals(sharesAmount);
                });
                it("THEN assets should decrease in user2 and increase in vault balances", async () => {
                    await (0, chai_1.expect)(txResult).to.changeTokenBalances(wethTokenContract, [user2Address, vaultAddress], [-AMOUNT, AMOUNT]);
                });
                it("THEN shares should increase in master token balance (20)", async () => {
                    await (0, chai_1.expect)(txResult).to.changeTokenBalance(vaultContract, masterTokenAddress, sharesAmount);
                });
                it("THEN mapping for user2 should update with 10 shares", async () => {
                    const sharesQty = await masterTokenContract.usersShares(user2Address);
                    (0, chai_1.expect)(sharesQty).equals(sharesAmount * BigInt(2));
                });
                it("THEN it should emit an Event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(vaultContract, "Deposit")
                        .withArgs(user2Address, masterTokenAddress, AMOUNT, sharesAmount);
                });
            });
            describe("WHEN doing balances check", function () {
                it("THEN vaultValuation should match shares totalSupply (20 ETH)", async () => {
                    const vaultValuation = await vaultContract.totalAssets();
                    const totalSharesSupply = await vaultContract.totalSupply();
                    (0, chai_1.expect)(vaultValuation).equals(totalSharesSupply);
                });
                it("THEN master token shares balance should match vault totalSupply (20 shares)", async () => {
                    const masterTokenBalance = await vaultContract.balanceOf(masterTokenAddress);
                    const totalSharesSupply = await vaultContract.totalSupply();
                    (0, chai_1.expect)(masterTokenBalance).equals(totalSharesSupply);
                });
                it("THEN users balances should have decreased (90 eth e/o)", async () => {
                    const user1SharesBalance = await masterTokenContract.usersShares(user1Address);
                    const user2SharesBalance = await masterTokenContract.usersShares(user2Address);
                    const user1Balance = await wethTokenContract.balanceOf(user1Address);
                    const user2Balance = await wethTokenContract.balanceOf(user2Address);
                    (0, chai_1.expect)(INTIAL_MINT - user1SharesBalance).equals(user1Balance);
                    (0, chai_1.expect)(INTIAL_MINT - user2SharesBalance).equals(user2Balance);
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
            AMOUNT = hardhat_1.ethers.parseEther("1");
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
        it("THEN user1 shares balance should have decreased", async () => {
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
    describe("WHEN executing deploy assets from vault (no valuation update)", function () {
        let AMOUNT;
        let strategyWETHBalanceBefore;
        let vaultWETHBalanceBefore;
        let vaultTotalAssetsBefore;
        let pendingDepositAssetsBefore;
        before(async () => {
            AMOUNT = hardhat_1.ethers.parseEther("10");
            await setVaultWith200(AMOUNT, false);
            strategyWETHBalanceBefore = await wethTokenContract.balanceOf(strategyContractAddress);
            vaultWETHBalanceBefore = await wethTokenContract.balanceOf(vaultAddress);
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
        it("THEN vault assets balance should decrease from 20 ETH to 0 ETH", async () => {
            const vaultWETHBalance = await wethTokenContract.balanceOf(vaultAddress);
            (0, chai_1.expect)(vaultWETHBalanceBefore - vaultWETHBalance).equals(pendingDepositAssetsBefore);
            (0, chai_1.expect)(constants_1.ZERO_AMOUNT).equals(vaultWETHBalance);
        });
        it("THEN vault totalAssets should decrease from 20 ETH to 0 ETH", async () => {
            const vaultTotalAssets = await vaultContract.totalAssets();
            (0, chai_1.expect)(vaultTotalAssetsBefore - vaultTotalAssets).equals(pendingDepositAssetsBefore);
            (0, chai_1.expect)(constants_1.ZERO_AMOUNT).equals(vaultTotalAssets);
        });
        it("THEN vault strategy liquid token balance should increase", async () => {
            const tolerance = 100n;
            const strategySTKtokenBalance = await liquidTokenContract.balanceOf(strategyContractAddress);
            (0, chai_1.expect)(strategySTKtokenBalance).to.be.closeToBigInt(expectedBalanceAferDeployment, tolerance);
        });
        it("THEN vault strategy WETH balance should be ZERO", async () => {
            const strategyWETHBalance = await wethTokenContract.balanceOf(strategyContractAddress);
            (0, chai_1.expect)(strategyWETHBalanceBefore + strategyWETHBalance).equals(constants_1.ZERO_AMOUNT);
        });
        it("THEN vault valuation is still ZERO", async () => {
            const vaultValuation = await vaultContract.totalAssets();
            (0, chai_1.expect)(vaultValuation).equals(constants_1.ZERO_AMOUNT);
        });
    });
    describe("WHEN executing update valuation from vault", function () {
        before(async () => {
            const AMOUNT = hardhat_1.ethers.parseEther("10");
            await setVaultWith200(AMOUNT, true);
            txResult = await vaultContract.updateVaultValuation(2);
        });
        after(async () => {
            await baseSnapshot.restore();
        });
        it("THEN vault valuation should update", async () => {
            const tolerance = 100n;
            const vaultValuation = await vaultContract.totalAssets();
            (0, chai_1.expect)(vaultValuation).to.be.closeToBigInt(expectedInitialValuation, tolerance);
        });
        it("THEN strategy valuation should update", async () => {
            const tolerance = 100n;
            const strategyValuation = await strategyContract.deployedAssetsValue();
            (0, chai_1.expect)(strategyValuation).to.be.closeToBigInt(expectedInitialValuation, tolerance);
        });
    });
    describe("WHEN executing redeem by user1", function () {
        let sharesAmount;
        let assetsAmount;
        let strategyLStokenBalanceBefore;
        let vaultValuationBefore;
        let vaultTotalSupplyBefore;
        let userWETHbalanceBefore;
        let userSharesBalanceBefore;
        before(async () => {
            const AMOUNT = hardhat_1.ethers.parseEther("10");
            await setVaultWith200(AMOUNT, true);
            await vaultContract.updateVaultValuation(2);
            vaultValuationBefore = await vaultContract.totalAssets();
            vaultTotalSupplyBefore = await vaultContract.totalSupply();
            userWETHbalanceBefore = await wethTokenContract.balanceOf(user1Address);
            userSharesBalanceBefore = await masterTokenContract.usersShares(user1Address);
            strategyLStokenBalanceBefore =
                await liquidTokenContract.balanceOf(strategyContractAddress);
            sharesAmount = hardhat_1.ethers.parseEther("5");
            assetsAmount = await vaultContract.convertToAssets(sharesAmount);
            txResult = await masterTokenContract
                .connect(user1)
                .redeem(vaultAddress, sharesAmount, masterTokenAddress, user1Address);
        });
        after(async () => {
            await baseSnapshot.restore();
        });
        it("THEN user shares should decrease from 10 to 5 (redeemed 5)", async () => {
            const userShares = await masterTokenContract.usersShares(user1Address);
            (0, chai_1.expect)(userShares).equals(userSharesBalanceBefore - sharesAmount);
        });
        it("THEN user weth balance should increase from 90 to 95 ETH", async () => {
            const tolerance = 1n;
            const userWETHbalance = await wethTokenContract.balanceOf(user1Address);
            (0, chai_1.expect)(userWETHbalance).to.be.closeToBigInt(userWETHbalanceBefore + assetsAmount, tolerance);
        });
        it("THEN vault total supply (shares) should decrease from 20 to 15 (5 redeemed)", async () => {
            const vaultTotalSupply = await vaultContract.totalSupply();
            (0, chai_1.expect)(vaultTotalSupply).equals(vaultTotalSupplyBefore - sharesAmount);
        });
        it("THEN strategy balance should decrease", async () => {
            oneStETHinWETH = await strategyContract.getTokenPrice(constants_1.LIDO_stETH_ADDRESS, 2);
            const oneWstEthInWETH = await strategyContract.getTokenPrice(constants_1.LIDO_WstETH_ADDRESS, 2);
            const qtyWrapped = uniQuote;
            const qtyUnWrapped = (oneWstEthInWETH * qtyWrapped) / oneStETHinWETH;
            const strategyStokenBalance = await liquidTokenContract.balanceOf(strategyContractAddress);
            const tolerance = 2000000000000000n;
            (0, chai_1.expect)(strategyStokenBalance).to.be.closeToBigInt(strategyLStokenBalanceBefore - qtyUnWrapped, tolerance);
        });
        it("THEN vault valuation should remain the same (valuation not updated)", async () => {
            const vaultValuation = await vaultContract.totalAssets();
            (0, chai_1.expect)(vaultValuation).equals(vaultValuationBefore);
        });
        describe("WHEN executing update valuation from vault (C)", function () {
            before(async () => {
                txResult = await vaultContract.updateVaultValuation(2);
            });
            it("THEN vault valuation should decrease to 15 ETH", async () => {
                const newValuation = vaultValuationBefore - assetsAmount;
                const vaultValuation = await vaultContract.totalAssets();
                const tolerance = 500000000000000n;
                (0, chai_1.expect)(vaultValuation).to.be.closeToBigInt(newValuation, tolerance);
            });
        });
    });
});
chai.Assertion.addMethod("closeToBigInt", function (expected, tolerance) {
    const actual = this._obj;
    this.assert(actual >= expected - tolerance && actual <= expected + tolerance, "expected #{this} to be close to #{exp} +/- #{tol}", "expected #{this} not to be close to #{exp} +/- #{tol}", expected, actual);
});
async function setVaultWith200(AMOUNT, deployAsstes) {
    await wethTokenContract.connect(user1).approve(vaultAddress, AMOUNT);
    await wethTokenContract.connect(user2).approve(vaultAddress, AMOUNT);
    await masterTokenContract.connect(user1).deposit(vaultAddress, AMOUNT, user1Address);
    await masterTokenContract.connect(user2).deposit(vaultAddress, AMOUNT, user2Address);
    if (deployAsstes) {
        await vaultContract.connect(deployer).deployAssets();
    }
}
//# sourceMappingURL=lido.mainnet.fork.test.js.map