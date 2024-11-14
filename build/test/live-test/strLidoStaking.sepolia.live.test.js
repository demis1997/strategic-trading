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
const chai_1 = require("chai");
const chai = __importStar(require("chai"));
const emulation_1 = require("../_helpers/emulation");
const constants_1 = require("../_helpers/constants");
const _deployAddresses_1 = require("./../../scripts/_helpers/_deployAddresses");
const utils_1 = require("./../_helpers/utils");
let deployer;
let user1;
let deployerAddress;
let user1Address;
let masterTokenAddress;
let txResult;
let masterTokenContract;
let wethTokenContract;
let liquidTokenContract;
let vaultContract;
let vaultAddress;
let strategyContract;
let strategyContractAddress;
let oneStETHinETH;
const INTIAL_MINT = BigInt("100000000000000000");
const INITIAL_VALUATION = BigInt("100000000000000000");
const NETWORK = "SEPOLIA";
describe("Vaults Tests -->> LIVE TESTS SEPOLIA", function () {
    this.timeout(constants_1.TEST_TIMEOUT);
    before(async () => {
        [deployer, user1] = await hardhat_1.ethers.getSigners();
        [deployerAddress, user1Address] = await Promise.all([
            deployer.getAddress(),
            user1.getAddress(),
        ]);
        wethTokenContract = (await (0, emulation_1.getWethContract)(_deployAddresses_1.constants[NETWORK].weth, deployer));
        liquidTokenContract = await (0, emulation_1.getLidoStETHContract)(_deployAddresses_1.constants[NETWORK].lidoStEth, deployer);
        user1 = deployer;
        user1Address = deployerAddress;
        masterTokenAddress = _deployAddresses_1.deployedContracts[NETWORK].masterToken;
        masterTokenContract = await hardhat_1.ethers.getContractAt("MasterTokenMock", masterTokenAddress);
        vaultAddress = _deployAddresses_1.deployedContracts[NETWORK].vaultSimpleStaking;
        vaultContract = await hardhat_1.ethers.getContractAt("Vault", vaultAddress);
        strategyContractAddress = _deployAddresses_1.deployedContracts[NETWORK].strSimpleStrategy;
        strategyContract = await hardhat_1.ethers.getContractAt("StrSimpleStaking", strategyContractAddress);
        oneStETHinETH = await strategyContract.getTokenPrice(_deployAddresses_1.constants[NETWORK].lidoStEth, 2n);
    });
    xdescribe("WHEN executing deposit", function () {
        describe("WHEN executing deposit with correct parameters", function () {
            let AMOUNT;
            let pendingDepositAssetsBefore;
            let sharesAmount;
            describe("WHEN user1 deposits 0.1 ETH", function () {
                before(async () => {
                    AMOUNT = INTIAL_MINT;
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
                it("THEN pendingDepositAssets should be 0.1", async () => {
                    const pendingDepositAssets = await vaultContract.pendingDepositAssets();
                    (0, chai_1.expect)(AMOUNT).equals(pendingDepositAssets);
                });
                it("THEN shares amount should match AMOUNT (0.1) since exchange rate is 1", async () => {
                    (0, chai_1.expect)(AMOUNT).equals(sharesAmount);
                });
                it("THEN mapping for user1 should update with 0.1 shares", async () => {
                    const sharesQty = await masterTokenContract.usersShares(user1Address);
                    (0, chai_1.expect)(sharesQty).equals(sharesAmount);
                });
            });
            describe("WHEN doing balances check", function () {
                it("THEN vaultValuation should match shares totalSupply (0.1 ETH)", async () => {
                    const vaultValuation = await vaultContract.totalAssets();
                    const totalSharesSupply = await vaultContract.totalSupply();
                    (0, chai_1.expect)(vaultValuation).equals(totalSharesSupply);
                });
                it("THEN users balances should have decreased", async () => {
                    const user1SharesBalance = await masterTokenContract.usersShares(user1Address);
                    const user1Balance = await wethTokenContract.balanceOf(user1Address);
                    (0, chai_1.expect)(INTIAL_MINT - user1SharesBalance).equals(user1Balance);
                });
            });
        });
    });
    xdescribe("WHEN executing deploy assets from vault (no valuation update)", function () {
        let strategyWETHBalanceBefore;
        let strategyLTBalanceBefore;
        let vaultWETHBalanceBefore;
        let vaultTotalAssetsBefore;
        let deployedAssetsAmount;
        before(async () => {
            strategyWETHBalanceBefore = await wethTokenContract.balanceOf(strategyContractAddress);
            strategyLTBalanceBefore = await liquidTokenContract.balanceOf(strategyContractAddress);
            vaultWETHBalanceBefore = await wethTokenContract.balanceOf(vaultAddress);
            vaultTotalAssetsBefore = await vaultContract.totalAssets();
            deployedAssetsAmount = await strategyContract.deployedAssetsValue();
            txResult = await masterTokenContract.connect(deployer).deployAssets(vaultAddress);
        });
        it("THEN pendingDepositAssets should be ZERO", async () => {
            const pendingDepositAssets = await vaultContract.pendingDepositAssets();
            (0, chai_1.expect)(pendingDepositAssets).equals(constants_1.ZERO_AMOUNT);
        });
        it("THEN vault assets balance should decrease", async () => {
            const vaultWETHBalance = await wethTokenContract.balanceOf(vaultAddress);
            (0, chai_1.expect)(vaultWETHBalanceBefore - deployedAssetsAmount).equals(vaultWETHBalance);
            (0, chai_1.expect)(constants_1.ZERO_AMOUNT).equals(vaultWETHBalance);
        });
        it("THEN vault totalAssets should decrease", async () => {
            const vaultTotalAssets = await vaultContract.totalAssets();
            (0, chai_1.expect)(vaultTotalAssetsBefore - deployedAssetsAmount).equals(vaultTotalAssets);
            (0, chai_1.expect)(constants_1.ZERO_AMOUNT).equals(vaultTotalAssets);
        });
        it("THEN vault strategy liquid token balance should increase", async () => {
            const tolerance = BigInt("2");
            const strategySTKtokenBalance = await liquidTokenContract.balanceOf(strategyContractAddress);
            const tokenAmount = (constants_1.AMOUNT_1E18 * INITIAL_VALUATION) / oneStETHinETH;
            (0, chai_1.expect)(strategySTKtokenBalance).to.be.closeToBigInt(strategyLTBalanceBefore + tokenAmount, tolerance);
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
    xdescribe("WHEN executing update valuation from vault", function () {
        let TOLERANCE;
        let liquidTokenBalance;
        let expectedBalance;
        before(async () => {
            TOLERANCE = BigInt("1");
            txResult = await vaultContract.updateVaultValuation(2n);
            liquidTokenBalance = await liquidTokenContract.balanceOf(strategyContractAddress);
            expectedBalance = (liquidTokenBalance * oneStETHinETH) / constants_1.AMOUNT_1E18;
        });
        it("THEN vault valuation should update", async () => {
            const vaultValuation = await vaultContract.totalAssets();
            (0, chai_1.expect)(vaultValuation).to.be.closeToBigInt(expectedBalance, TOLERANCE);
        });
        it("THEN strategy valuation should update", async () => {
            const strategyValuation = await strategyContract.deployedAssetsValue();
            (0, chai_1.expect)(strategyValuation).to.be.closeToBigInt(expectedBalance, TOLERANCE);
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
            vaultValuationBefore = await vaultContract.totalAssets();
            vaultTotalSupplyBefore = await vaultContract.totalSupply();
            userWETHbalanceBefore = await wethTokenContract.balanceOf(user1Address);
            userSharesBalanceBefore = await masterTokenContract.usersShares(user1Address);
            strategyLStokenBalanceBefore =
                await liquidTokenContract.balanceOf(strategyContractAddress);
            sharesAmount = BigInt("50000000000000000");
            assetsAmount = await vaultContract.convertToAssets(sharesAmount);
            txResult = await masterTokenContract
                .connect(user1)
                .redeem(vaultAddress, sharesAmount, masterTokenAddress, user1Address);
        });
        it("THEN user shares should decrease", async () => {
            const userShares = await masterTokenContract.usersShares(user1Address);
            (0, chai_1.expect)(userShares).equals(userSharesBalanceBefore - sharesAmount);
        });
        it("THEN user weth balance should increase", async () => {
            const tolerance = BigInt("5");
            const userWETHbalance = await wethTokenContract.balanceOf(user1Address);
            (0, chai_1.expect)(userWETHbalance).to.be.closeToBigInt(userWETHbalanceBefore + assetsAmount, tolerance);
        });
        it("THEN vault total supply (shares) should decrease", async () => {
            const vaultTotalSupply = await vaultContract.totalSupply();
            (0, chai_1.expect)(vaultTotalSupply).equals(vaultTotalSupplyBefore - sharesAmount);
        });
        it("THEN strategy balance should decrease", async () => {
            const tolerance = BigInt("2500000000000000");
            const tokenAmount = (constants_1.AMOUNT_1E18 * assetsAmount) / oneStETHinETH;
            const strategyStokenBalance = await liquidTokenContract.balanceOf(strategyContractAddress);
            (0, chai_1.expect)(strategyStokenBalance).to.be.closeToBigInt(strategyLStokenBalanceBefore - tokenAmount, tolerance);
        });
        it("THEN vault valuation should remain the same (valuation not updated)", async () => {
            const vaultValuation = await vaultContract.totalAssets();
            (0, chai_1.expect)(vaultValuation).equals(vaultValuationBefore);
        });
        xdescribe("WHEN executing update valuation from vault (C)", function () {
            before(async () => {
                txResult = await vaultContract.updateVaultValuation(2n);
            });
            it("THEN vault valuation should decrease to 150 ETH", async () => {
                const tolerance = BigInt("36100000000000000");
                const newValuation = INITIAL_VALUATION - assetsAmount;
                const vaultValuation = await vaultContract.totalAssets();
                (0, chai_1.expect)(vaultValuation).to.be.closeToBigInt(newValuation, tolerance);
            });
        });
    });
});
chai.Assertion.addMethod("closeToBigInt", function (expected, tolerance) {
    const actual = this._obj;
    this.assert(actual >= expected - tolerance && actual <= expected + tolerance, "expected #{this} to be close to #{exp} +/- #{tol}", "expected #{this} not to be close to #{exp} +/- #{tol}", expected, actual);
});
//# sourceMappingURL=strLidoStaking.sepolia.live.test.js.map