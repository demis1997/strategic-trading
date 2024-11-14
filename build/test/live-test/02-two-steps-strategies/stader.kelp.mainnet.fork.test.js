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
let staderAdapterContract;
let staderAdapterContractAddress;
let uniswapAdapterContract;
let uniswapAdapterContractAddress;
let kelpAdapterContract;
let kelpAdapterContractAddress;
let strategyContract;
let strategyContractAddress;
const DEFAULT_FEE_RATE = hardhat_1.ethers.parseEther("10");
const INTIAL_MINT = hardhat_1.ethers.parseEther("100");
const INITIAL_DEPOSIT = hardhat_1.ethers.parseEther("20");
const UNISWAP_PATH_FEE = 500n;
let deltaStader;
let deltaKelp;
let uniQuote;
let oneRsETHinWETH;
let expectedBalanceAferDeployment;
let expectedInitialValuation;
describe("STADER - KELP ==> Restaking Strategy Tests -->> LIVE TESTS", function () {
    this.timeout(constants_1.TEST_TIMEOUT);
    before(async () => {
        [deployer, user1, user2] = await hardhat_1.ethers.getSigners();
        [deployerAddress, user1Address, user2Address] = await Promise.all([
            deployer.getAddress(),
            user1.getAddress(),
            user2.getAddress(),
        ]);
        wethTokenContract = (await (0, emulation_1.getWethContract)(constants_1.WETH_ADDRESS, deployer));
        underlyingTokenAddress = await wethTokenContract.getAddress();
        liquidTokenContract = await (0, emulation_1.getRsETHContract)(constants_1.KELP_rsETH_ADDRESS, deployer);
        let tx = await wethTokenContract.connect(user1).deposit({ value: INTIAL_MINT });
        await tx.wait();
        tx = await wethTokenContract.connect(user2).deposit({ value: INTIAL_MINT });
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
        staderAdapterContract = (await (0, _deployContracts_1.deployStaderAdapter)("StaderAdapter", constants_1.STADER_STAKE_MANAGER_ADDRESS, constants_1.WETH_ADDRESS, constants_1.STADER_ETHx_ADDRESS));
        staderAdapterContractAddress = await staderAdapterContract.getAddress();
        kelpAdapterContract = (await (0, _deployContracts_1.deployKelpAdapter)("KelpAdapter", constants_1.KELP_DEPOSIT_POOL_ADDRESS, constants_1.KELP_rsETH_ADDRESS));
        kelpAdapterContractAddress = await kelpAdapterContract.getAddress();
        uniswapAdapterContract = (await (0, _deployContracts_1.deployUniswapAdapter)("UniswapV3Adapter", constants_1.UNISWAP_ROUTER_ADDRESS, constants_1.UNISWAP_QUOTER_ADDRESS, constants_1.WETH_ADDRESS));
        uniswapAdapterContractAddress = await uniswapAdapterContract.getAddress();
        await uniswapAdapterContract.setPoolPerTokenForPrice(constants_1.KELP_rsETH_ADDRESS, constants_1.ETHx_WETH_POOL);
        strategyContract = (await (0, _deployContracts_1.deployVaultStrategy)("StrSimpleReStaking", vaultAddress, constants_1.KELP_rsETH_ADDRESS, [staderAdapterContractAddress, kelpAdapterContractAddress], [uniswapAdapterContractAddress], "Simple Re-Staking Strategy"));
        strategyContractAddress = await strategyContract.getAddress();
        await (0, _configContracts_1.configVault)(vaultAddress, strategyContractAddress, strategyContractAddress);
        await (0, _configContracts_1.configSwapPath)("StrSimpleReStaking", strategyContractAddress, [constants_1.WETH_ADDRESS, constants_1.KELP_rsETH_ADDRESS], [UNISWAP_PATH_FEE]);
        let roleToAssign = await vaultContract.VAULT_MANAGER_ROLE();
        await vaultContract.grantRole(roleToAssign, deployerAddress);
        roleToAssign = await vaultContract.VAULT_MANAGER_ROLE();
        await vaultContract.grantRole(roleToAssign, masterTokenAddress);
        roleToAssign = await vaultContract.MASTER_TOKEN_ROLE();
        await vaultContract.grantRole(roleToAssign, masterTokenAddress);
        roleToAssign = await strategyContract.VAULT_MANAGER_ROLE();
        await strategyContract.grantRole(roleToAssign, vaultAddress);
        roleToAssign = await staderAdapterContract.VAULT_STRATEGY_ROLE();
        await staderAdapterContract.grantRole(roleToAssign, strategyContractAddress);
        roleToAssign = await kelpAdapterContract.VAULT_STRATEGY_ROLE();
        await kelpAdapterContract.grantRole(roleToAssign, strategyContractAddress);
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
        deltaStader = await (0, utils_1.getDelta)(constants_1.WETH_ADDRESS, constants_1.STADER_ETHx_ADDRESS, deployer, AMOUNT_IN, staderAdapterContract);
        deltaKelp = await (0, utils_1.getDelta)(constants_1.STADER_ETHx_ADDRESS, constants_1.KELP_rsETH_ADDRESS, deployer, deltaStader.outAmount, kelpAdapterContract);
        const AMOUNT_OUT = constants_1.AMOUNT_1E18 * 5n;
        uniQuote = await (0, utils_1.getQuoteFromUni)("KELP", uniswapAdapterContract, AMOUNT_OUT, constants_1.KELP_rsETH_ADDRESS, constants_1.WETH_ADDRESS, UNISWAP_PATH_FEE);
        oneRsETHinWETH = await strategyContract.getTokenPrice(constants_1.KELP_rsETH_ADDRESS, 2);
        expectedBalanceAferDeployment = (deltaStader.outAmount * constants_1.AMOUNT_1E18) / deltaKelp.delta;
        expectedInitialValuation = (expectedBalanceAferDeployment * oneRsETHinWETH) / constants_1.AMOUNT_1E18;
    });
    describe("WHEN executing deploy assets from vault (no valuation update)", function () {
        let AMOUNT;
        let strategyWETHBalanceBefore;
        let vaultWETHBalanceBefore;
        let vaultTotalAssetsBefore;
        let pendingDepositAssetsBefore;
        before(async () => {
            AMOUNT = hardhat_1.ethers.parseEther("10");
            await setVaultWith20(AMOUNT, false);
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
            await setVaultWith20(AMOUNT, true);
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
    describe("WHEN executing withdraw by user1", function () {
        let sharesAmount;
        let assetsAmount;
        let strategyLStokenBalanceBefore;
        let vaultValuationBefore;
        let vaultTotalSupplyBefore;
        let userWETHbalanceBefore;
        let userSharesBalanceBefore;
        let strategyStokenBalance;
        before(async () => {
            const AMOUNT = hardhat_1.ethers.parseEther("10");
            await setVaultWith20(AMOUNT, true);
            await vaultContract.updateVaultValuation(2);
            vaultValuationBefore = await vaultContract.totalAssets();
            vaultTotalSupplyBefore = await vaultContract.totalSupply();
            userWETHbalanceBefore = await wethTokenContract.balanceOf(user1Address);
            userSharesBalanceBefore = await masterTokenContract.usersShares(user1Address);
            strategyLStokenBalanceBefore =
                await liquidTokenContract.balanceOf(strategyContractAddress);
            assetsAmount = hardhat_1.ethers.parseEther("5");
            sharesAmount = await vaultContract.convertToShares(assetsAmount);
            txResult = await masterTokenContract
                .connect(user1)
                .withdraw(vaultAddress, assetsAmount, masterTokenAddress, user1Address);
            strategyStokenBalance = await liquidTokenContract.balanceOf(strategyContractAddress);
        });
        it("THEN user shares should decrease from 10 to 5 (withdraw 5)", async () => {
            const tolerance = 1n;
            const userShares = await masterTokenContract.usersShares(user1Address);
            (0, chai_1.expect)(userShares).to.be.closeToBigInt(userSharesBalanceBefore - sharesAmount, tolerance);
        });
        it("THEN user weth balance should increase from 90 to 95 WETH", async () => {
            const tolerance = 1n;
            const userWETHbalance = await wethTokenContract.balanceOf(user1Address);
            (0, chai_1.expect)(userWETHbalance).to.be.closeToBigInt(userWETHbalanceBefore + assetsAmount, tolerance);
        });
        it("THEN vault total supply (shares) should decrease from 20 to 15 (5 withdraw)", async () => {
            const tolerance = 1n;
            const vaultTotalSupply = await vaultContract.totalSupply();
            (0, chai_1.expect)(vaultTotalSupply).to.be.closeToBigInt(vaultTotalSupplyBefore - sharesAmount, tolerance);
        });
        it("THEN strategy balance should decrease", async () => {
            const liquidTokenAmount = uniQuote;
            const tolerance = 100n;
            (0, chai_1.expect)(strategyStokenBalance).to.be.closeToBigInt(strategyLStokenBalanceBefore - liquidTokenAmount, tolerance);
        });
        it("THEN vault valuation should remain the same (valuation not updated)", async () => {
            const vaultValuation = await vaultContract.totalAssets();
            (0, chai_1.expect)(vaultValuation).equals(vaultValuationBefore);
        });
        describe("WHEN executing update valuation from vault (C)", function () {
            before(async () => {
                txResult = await vaultContract.updateVaultValuation(2);
            });
            it("THEN vault valuation should decrease close to 15 WETH", async () => {
                oneRsETHinWETH = await strategyContract.getTokenPrice(constants_1.KELP_rsETH_ADDRESS, 2);
                const newValuation = (strategyStokenBalance * oneRsETHinWETH) / constants_1.AMOUNT_1E18;
                const vaultValuation = await vaultContract.totalAssets();
                const tolerance = 1n;
                (0, chai_1.expect)(vaultValuation).to.be.closeToBigInt(newValuation, tolerance);
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
//# sourceMappingURL=stader.kelp.mainnet.fork.test.js.map