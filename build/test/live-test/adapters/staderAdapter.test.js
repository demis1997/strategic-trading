"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const chai_1 = require("chai");
const _deployContracts_1 = require("../../../scripts/_deployContracts");
const emulation_1 = require("../../_helpers/emulation");
const constants_1 = require("../../_helpers/constants");
let deployer;
let deployerAddress;
let txResult;
let wethTokenContract;
let uniswapAdapterContract;
let uniswapAdapterContractAddress;
let adapterStaderContract;
let adapterStaderContractAddress;
let ETHxContract;
describe("Stader Tests -->> LIVE TESTS", function () {
    this.timeout(constants_1.TEST_TIMEOUT);
    before(async () => {
        [deployer] = await hardhat_1.ethers.getSigners();
        deployerAddress = await deployer.getAddress();
        wethTokenContract = (await (0, emulation_1.getWethContract)(constants_1.WETH_ADDRESS, deployer));
        ETHxContract = await (0, emulation_1.getStaderETHxContract)(constants_1.STADER_ETHx_ADDRESS, deployer);
        adapterStaderContract = (await (0, _deployContracts_1.deployStaderAdapter)("StaderAdapter", constants_1.STADER_STAKE_MANAGER_ADDRESS, constants_1.WETH_ADDRESS, constants_1.STADER_ETHx_ADDRESS));
        adapterStaderContractAddress = await adapterStaderContract.getAddress();
        uniswapAdapterContract = (await (0, _deployContracts_1.deployUniswapAdapter)("UniswapV3Adapter", constants_1.UNISWAP_ROUTER_ADDRESS, constants_1.UNISWAP_QUOTER_ADDRESS, constants_1.WETH_ADDRESS));
        uniswapAdapterContractAddress = await uniswapAdapterContract.getAddress();
        await uniswapAdapterContract.setPoolPerTokenForPrice(constants_1.STADER_ETHx_ADDRESS, constants_1.ETHx_WETH_POOL);
        let roleToAssign = await adapterStaderContract.VAULT_STRATEGY_ROLE();
        await adapterStaderContract.grantRole(roleToAssign, deployerAddress);
        roleToAssign = await uniswapAdapterContract.VAULT_STRATEGY_ROLE();
        await uniswapAdapterContract.grantRole(roleToAssign, deployerAddress);
    });
    describe("Getters", function () {
        it("Should set the storage correctly", async () => {
            (0, chai_1.expect)(await adapterStaderContract.protocolAddress()).to.equal(constants_1.STADER_STAKE_MANAGER_ADDRESS);
            (0, chai_1.expect)(await adapterStaderContract.ethxAddress()).to.equal(constants_1.STADER_ETHx_ADDRESS);
            (0, chai_1.expect)(await adapterStaderContract.wethAddress()).to.equal(constants_1.WETH_ADDRESS);
            (0, chai_1.expect)(await adapterStaderContract.protocolName()).to.equal("Stader");
        });
    });
    describe("WHEN executing deposit and withdraw", function () {
        const wrapToken = false;
        const AMOUNT = hardhat_1.ethers.parseEther("10");
        let ethxBalance;
        describe("WHEN deployer deposits and liquid token should be wrapped", function () {
            before(async () => {
                const depositTx = await wethTokenContract.deposit({ value: AMOUNT });
                await depositTx.wait();
                const approvalTx = await wethTokenContract.approve(adapterStaderContractAddress, AMOUNT);
                await approvalTx.wait();
                txResult = await adapterStaderContract.deposit(deployerAddress, deployerAddress, constants_1.WETH_ADDRESS, AMOUNT, wrapToken);
                ethxBalance = await ETHxContract.balanceOf(deployerAddress);
            });
            it("THEN it should emit an Event", async () => {
                await (0, chai_1.expect)(txResult)
                    .to.emit(adapterStaderContract, "DepositedOnProtocol")
                    .withArgs(deployerAddress, constants_1.WETH_ADDRESS, AMOUNT, constants_1.STADER_ETHx_ADDRESS, ethxBalance);
            });
            it("THEN deployer should receive ETHx", async () => {
                (0, chai_1.expect)(ethxBalance).to.be.greaterThan(0);
            });
        });
        describe("WHEN deployer withdraws", function () {
            let deployerETHxBalance;
            let deployerWETHBalanceB4;
            let expectedAmountOut;
            let tokenPrice;
            before(async () => {
                deployerETHxBalance = await ETHxContract.balanceOf(await deployer.getAddress());
                deployerWETHBalanceB4 = await wethTokenContract.balanceOf(await deployer.getAddress());
                tokenPrice = await uniswapAdapterContract.getTokenPrice(constants_1.STADER_ETHx_ADDRESS);
                expectedAmountOut = (deployerETHxBalance * 10n ** 18n) / tokenPrice;
                const approvalTx = await ETHxContract.approve(uniswapAdapterContractAddress, deployerETHxBalance);
                await approvalTx.wait();
                const path = hardhat_1.ethers.solidityPacked(["address", "uint24", "address"], [constants_1.WETH_ADDRESS, BigInt(500), constants_1.STADER_ETHx_ADDRESS]);
                txResult = await uniswapAdapterContract.withdraw(deployerAddress, deployerAddress, constants_1.WETH_ADDRESS, expectedAmountOut, constants_1.STADER_ETHx_ADDRESS, deployerETHxBalance, path);
            });
            it("THEN should increase weth deployer balance", async () => {
                const deployerWETHBalanceAfter = await wethTokenContract.balanceOf(deployerAddress);
                (0, chai_1.expect)(deployerWETHBalanceB4 + expectedAmountOut).to.equal(deployerWETHBalanceAfter);
            });
            it("THEN should decrease ETHx deployer balance", async () => {
                const deployerETHxBalanceAfter = await ETHxContract.balanceOf(deployerAddress);
                (0, chai_1.expect)(deployerETHxBalanceAfter).lt(deployerETHxBalance);
            });
        });
    });
});
//# sourceMappingURL=staderAdapter.test.js.map