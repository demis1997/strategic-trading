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
let uniswapRouterContract;
let stETHContract;
let uniswapAdapterContract;
let uniswapAdapterContractAddress;
let adapterKelpContract;
let adapterKelpContractAddress;
let wstETHContract;
let rsETHContract;
describe("Kelp Tests -->> LIVE TESTS", function () {
    this.timeout(constants_1.TEST_TIMEOUT);
    before(async () => {
        [deployer] = await hardhat_1.ethers.getSigners();
        deployerAddress = await deployer.getAddress();
        wethTokenContract = (await (0, emulation_1.getWethContract)(constants_1.WETH_ADDRESS, deployer));
        uniswapRouterContract = await (0, emulation_1.getUniswapV3RouterContract)(constants_1.UNISWAP_ROUTER_ADDRESS, deployer);
        stETHContract = await (0, emulation_1.getLidoStETHContract)(constants_1.LIDO_stETH_ADDRESS, deployer);
        wstETHContract = await (0, emulation_1.getLidoWstETHContract)(constants_1.LIDO_WstETH_ADDRESS, deployer);
        rsETHContract = await (0, emulation_1.getRsETHContract)(constants_1.KELP_rsETH_ADDRESS, deployer);
        adapterKelpContract = (await (0, _deployContracts_1.deployKelpAdapter)("KelpAdapter", constants_1.KELP_DEPOSIT_POOL_ADDRESS, constants_1.KELP_rsETH_ADDRESS));
        adapterKelpContractAddress = await adapterKelpContract.getAddress();
        uniswapAdapterContract = (await (0, _deployContracts_1.deployUniswapAdapter)("UniswapV3Adapter", constants_1.UNISWAP_ROUTER_ADDRESS, constants_1.UNISWAP_QUOTER_ADDRESS, constants_1.WETH_ADDRESS));
        uniswapAdapterContractAddress = await uniswapAdapterContract.getAddress();
        await uniswapAdapterContract.setPoolPerTokenForPrice(constants_1.KELP_rsETH_ADDRESS, constants_1.rsETH_WETH_POOL);
        let roleToAssign = await adapterKelpContract.VAULT_STRATEGY_ROLE();
        await adapterKelpContract.grantRole(roleToAssign, deployerAddress);
        roleToAssign = await uniswapAdapterContract.VAULT_STRATEGY_ROLE();
        await uniswapAdapterContract.grantRole(roleToAssign, deployerAddress);
    });
    describe("WHEN executing deposit and withdraw", function () {
        const AMOUNT = hardhat_1.ethers.parseEther("10");
        const wrapToken = false;
        let stEthDeployerBalance;
        let rsETHBalanceB4;
        let rsETHBalance;
        describe("WHEN deployer deposits", function () {
            before(async () => {
                rsETHBalanceB4 = await rsETHContract.balanceOf(deployerAddress);
                const depositTx = await wethTokenContract.deposit({ value: AMOUNT });
                await depositTx.wait();
                const approvalTx = await wethTokenContract.approve(constants_1.UNISWAP_ROUTER_ADDRESS, AMOUNT);
                await approvalTx.wait();
                const params = {
                    tokenIn: constants_1.WETH_ADDRESS,
                    tokenOut: constants_1.LIDO_WstETH_ADDRESS,
                    fee: 100,
                    recipient: deployerAddress,
                    amountIn: AMOUNT,
                    amountOutMinimum: 0,
                    sqrtPriceLimitX96: 0,
                };
                const swapTx = await uniswapRouterContract.exactInputSingle(params);
                await swapTx.wait();
                const wstETHBalance = await wstETHContract.balanceOf(deployerAddress);
                console.log(`Swapped ${hardhat_1.ethers.formatEther(AMOUNT)} WETH for ${hardhat_1.ethers.formatEther(wstETHBalance)} wstETH`);
                await wstETHContract.unwrap(await wstETHContract.balanceOf(deployerAddress));
                stEthDeployerBalance = await stETHContract.balanceOf(deployerAddress);
                await stETHContract.approve(adapterKelpContractAddress, stEthDeployerBalance);
                txResult = await adapterKelpContract.deposit(deployerAddress, deployerAddress, constants_1.LIDO_stETH_ADDRESS, stEthDeployerBalance, wrapToken);
                rsETHBalance = await rsETHContract.balanceOf(deployerAddress);
            });
            it("THEN it should emit an Event", async () => {
                await (0, chai_1.expect)(txResult)
                    .to.emit(adapterKelpContract, "DepositedOnProtocol")
                    .withArgs(deployerAddress, constants_1.LIDO_stETH_ADDRESS, stEthDeployerBalance, constants_1.KELP_rsETH_ADDRESS, rsETHBalance);
            });
            it("THEN deployer should receive rsETH", async () => {
                (0, chai_1.expect)(rsETHBalance).to.be.greaterThan(rsETHBalanceB4);
            });
        });
        describe("WHEN deployer withdraws", function () {
            let deployerRsETHBalanceB4;
            let deployerRsETHBalanceAfter;
            let deployerWETHBalanceB4;
            let deployerWETHBalanceAfter;
            let expectedAmountOut;
            let tokenPrice;
            before(async () => {
                deployerRsETHBalanceB4 = await rsETHContract.balanceOf(await deployer.getAddress());
                deployerWETHBalanceB4 = await wethTokenContract.balanceOf(await deployer.getAddress());
                tokenPrice = await uniswapAdapterContract.getTokenPrice(constants_1.KELP_rsETH_ADDRESS);
                expectedAmountOut = (deployerRsETHBalanceB4 * 10n ** 18n) / tokenPrice;
                const approvalTx = await rsETHContract.approve(uniswapAdapterContractAddress, deployerRsETHBalanceB4);
                await approvalTx.wait();
                const path = hardhat_1.ethers.solidityPacked(["address", "uint24", "address"], [constants_1.WETH_ADDRESS, BigInt(500), constants_1.KELP_rsETH_ADDRESS]);
                await uniswapAdapterContract.withdraw(deployerAddress, deployerAddress, constants_1.WETH_ADDRESS, expectedAmountOut, constants_1.KELP_rsETH_ADDRESS, deployerRsETHBalanceB4, path);
                deployerWETHBalanceAfter = await wethTokenContract.balanceOf(deployerAddress);
                deployerRsETHBalanceAfter = await rsETHContract.balanceOf(deployerAddress);
            });
            it("THEN should increase weth deployer balance", async () => {
                (0, chai_1.expect)(deployerWETHBalanceB4 + expectedAmountOut).to.equal(deployerWETHBalanceAfter);
            });
            it("THEN should decrease rsETH deployer balance", async () => {
                (0, chai_1.expect)(deployerRsETHBalanceAfter).lt(deployerRsETHBalanceB4);
            });
        });
    });
});
//# sourceMappingURL=kelpAdapter.test.js.map