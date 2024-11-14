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
const _deployContracts_1 = require("../../../scripts/_deployContracts");
const emulation_1 = require("../../_helpers/emulation");
const constants_1 = require("../../_helpers/constants");
let deployer;
let deployerAddress;
let txResult;
let wethTokenContract;
let adapterRocketContract;
let adapterRocketContractAddress;
let rETHContract;
describe("Rocket Tests -->> LIVE TESTS", function () {
    this.timeout(constants_1.TEST_TIMEOUT);
    before(async () => {
        [deployer] = await hardhat_1.ethers.getSigners();
        deployerAddress = await deployer.getAddress();
        wethTokenContract = (await (0, emulation_1.getWethContract)(constants_1.WETH_ADDRESS, deployer));
        rETHContract = await (0, emulation_1.getRETHContract)(constants_1.ROCKET_RETH, deployer);
        adapterRocketContract = (await (0, _deployContracts_1.deployRocketAdapter)("RocketAdapter", constants_1.ROCKET_DEPOSIT_POOL, constants_1.ROCKET_DEPOSIT_SETTINGS, constants_1.WETH_ADDRESS, constants_1.ROCKET_RETH));
        adapterRocketContractAddress = await adapterRocketContract.getAddress();
        let roleToAssign = await adapterRocketContract.VAULT_STRATEGY_ROLE();
        await adapterRocketContract.grantRole(roleToAssign, deployerAddress);
        roleToAssign = await adapterRocketContract.VAULT_STRATEGY_ROLE();
        await adapterRocketContract.grantRole(roleToAssign, deployerAddress);
    });
    describe("Getters", function () {
        it("Should set the storage correctly", async () => {
            (0, chai_1.expect)(await adapterRocketContract.protocolAddress()).to.equal(constants_1.ROCKET_DEPOSIT_POOL);
            (0, chai_1.expect)(await adapterRocketContract.rocketSettingsAddress()).to.equal(constants_1.ROCKET_DEPOSIT_SETTINGS);
            (0, chai_1.expect)(await adapterRocketContract.rETHAddress()).to.equal(constants_1.ROCKET_RETH);
            (0, chai_1.expect)(await adapterRocketContract.wethAddress()).to.equal(constants_1.WETH_ADDRESS);
            (0, chai_1.expect)(await adapterRocketContract.protocolName()).to.equal("Rocket");
        });
        it("Should retrieve correct rETH price", async () => {
            (0, chai_1.expect)(await adapterRocketContract.getTokenPrice(constants_1.ROCKET_RETH)).to.equal(await rETHContract.getExchangeRate());
        });
    });
    describe("WHEN executing deposit and withdraw", function () {
        let AMOUNT;
        let wrapToken;
        let rETHBalance;
        let expectedRETH;
        let rETHPrice;
        let TOLERANCE;
        describe("WHEN deployer deposits and liquid token should not be wrapped", function () {
            before(async () => {
                AMOUNT = hardhat_1.ethers.parseEther("10");
                wrapToken = false;
                rETHPrice = await adapterRocketContract.getTokenPrice(constants_1.ROCKET_RETH);
                expectedRETH = (AMOUNT * 10n ** 18n) / rETHPrice;
                TOLERANCE = hardhat_1.ethers.parseEther("0.005");
                const depositTx = await wethTokenContract.deposit({ value: AMOUNT });
                await depositTx.wait();
                const approvalTx = await wethTokenContract.approve(adapterRocketContractAddress, AMOUNT);
                await approvalTx.wait();
                txResult = await adapterRocketContract.deposit(deployerAddress, deployerAddress, constants_1.WETH_ADDRESS, AMOUNT, wrapToken);
                rETHBalance = await rETHContract.balanceOf(deployerAddress);
            });
            it("THEN it should emit an Event", async () => {
                await (0, chai_1.expect)(txResult)
                    .to.emit(adapterRocketContract, "DepositedOnProtocol")
                    .withArgs(deployerAddress, constants_1.WETH_ADDRESS, AMOUNT, constants_1.ROCKET_RETH, rETHBalance);
            });
            it("THEN deployer should receive rETH", async () => {
                (0, chai_1.expect)(rETHBalance).to.be.closeToBigInt(expectedRETH, TOLERANCE);
            });
        });
        describe("WHEN deployer withdraws", function () {
            let deployerRETHBalance;
            let deployerWETHBalance;
            let expectedAmountOut;
            before(async () => {
                deployerRETHBalance = await rETHContract.balanceOf(await deployer.getAddress());
                deployerWETHBalance = await wethTokenContract.balanceOf(await deployer.getAddress());
                expectedAmountOut = await rETHContract.getEthValue(deployerRETHBalance);
                const approvalTx = await rETHContract.approve(adapterRocketContractAddress, deployerRETHBalance);
                await approvalTx.wait();
                txResult = await adapterRocketContract.withdraw(deployerAddress, deployerAddress, constants_1.WETH_ADDRESS, expectedAmountOut, constants_1.ROCKET_RETH, deployerRETHBalance, "0x");
            });
            it("THEN should increase weth deployer balance", async () => {
                (0, chai_1.expect)(deployerWETHBalance + expectedAmountOut).to.equal(await wethTokenContract.balanceOf(deployerAddress));
            });
            it("THEN should decrease rETH deployer balance to 0", async () => {
                (0, chai_1.expect)(await rETHContract.balanceOf(deployerAddress)).to.equal(0n);
            });
        });
    });
});
chai.Assertion.addMethod("closeToBigInt", function (expected, tolerance) {
    const actual = this._obj;
    this.assert(actual >= expected - tolerance && actual <= expected + tolerance, "expected #{this} to be close to #{exp} +/- #{tol}", "expected #{this} not to be close to #{exp} +/- #{tol}", expected, actual);
});
//# sourceMappingURL=rocketAdapter.test.js.map