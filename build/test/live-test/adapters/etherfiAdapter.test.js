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
let adapterEtherFiContract;
let adapterEtherFiContractAddress;
let wstETHContract;
let weETHContract;
let weETHContractAddress;
describe("EherFi Tests -->> LIVE TESTS", function () {
    this.timeout(constants_1.TEST_TIMEOUT);
    before(async () => {
        [deployer] = await hardhat_1.ethers.getSigners();
        [deployerAddress] = await Promise.all([deployer.getAddress()]);
        wethTokenContract = (await (0, emulation_1.getWethContract)(constants_1.WETH_ADDRESS, deployer));
        uniswapRouterContract = await (0, emulation_1.getUniswapV3RouterContract)(constants_1.UNISWAP_ROUTER_ADDRESS, deployer);
        wstETHContract = await (0, emulation_1.getLidoWstETHContract)(constants_1.LIDO_WstETH_ADDRESS, deployer);
        stETHContract = await (0, emulation_1.getLidoStETHContract)(constants_1.LIDO_stETH_ADDRESS, deployer);
        weETHContract = await (0, emulation_1.getWeEthContract)(constants_1.ETHERFI_weETH_ADDRESS, deployer);
        weETHContractAddress = await weETHContract.getAddress();
        adapterEtherFiContract = (await (0, _deployContracts_1.deployEtherFiAdapter)("EtherFiAdapter", constants_1.ETHERFI_LIQUIFIER_ADDRESS, constants_1.ETHERFI_eETH_ADDRESS, constants_1.ETHERFI_weETH_ADDRESS));
        adapterEtherFiContractAddress = await adapterEtherFiContract.getAddress();
        uniswapAdapterContract = (await (0, _deployContracts_1.deployUniswapAdapter)("UniswapV3Adapter", constants_1.UNISWAP_ROUTER_ADDRESS, constants_1.UNISWAP_QUOTER_ADDRESS, constants_1.WETH_ADDRESS));
        uniswapAdapterContractAddress = await uniswapAdapterContract.getAddress();
        let roleToAssign = await adapterEtherFiContract.VAULT_STRATEGY_ROLE();
        await adapterEtherFiContract.grantRole(roleToAssign, deployerAddress);
        roleToAssign = await uniswapAdapterContract.VAULT_STRATEGY_ROLE();
        await uniswapAdapterContract.grantRole(roleToAssign, deployerAddress);
    });
    describe("WHEN executing deposit and withdraw", function () {
        let AMOUNT;
        let wrapToken;
        let stEthDeployerBalance;
        let weETHBalance;
        describe("WHEN deployer deposits and liquid token should be wrapped", function () {
            before(async () => {
                AMOUNT = hardhat_1.ethers.parseEther("100");
                wrapToken = true;
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
                await stETHContract.approve(adapterEtherFiContractAddress, stEthDeployerBalance);
                txResult = await adapterEtherFiContract.deposit(deployerAddress, deployerAddress, constants_1.LIDO_stETH_ADDRESS, stEthDeployerBalance, wrapToken);
                weETHBalance = await weETHContract.balanceOf(deployerAddress);
            });
            it("THEN it should emit an Event", async () => {
                await (0, chai_1.expect)(txResult)
                    .to.emit(adapterEtherFiContract, "DepositedOnProtocol")
                    .withArgs(deployerAddress, constants_1.LIDO_stETH_ADDRESS, stEthDeployerBalance, weETHContractAddress, weETHBalance);
            });
            it("THEN deployer should receive weETH", async () => {
                (0, chai_1.expect)(weETHBalance).to.be.greaterThan(0);
            });
        });
        describe("WHEN deployer withdraws", function () {
            let deployerWeETHBalance;
            let deployerWETHBalanceB4;
            let expectedAmountOut;
            before(async () => {
                deployerWeETHBalance = await weETHContract.balanceOf(await deployer.getAddress());
                expectedAmountOut = await weETHContract.balanceOf(await deployer.getAddress());
                deployerWETHBalanceB4 = await wethTokenContract.balanceOf(await deployer.getAddress());
                const approvalTx = await weETHContract.approve(uniswapAdapterContractAddress, deployerWeETHBalance);
                await approvalTx.wait();
                const uniswapSwapPath = hardhat_1.ethers.solidityPacked(["address", "uint24", "address"], [constants_1.WETH_ADDRESS, BigInt(500), constants_1.ETHERFI_weETH_ADDRESS]);
                txResult = await uniswapAdapterContract.withdraw(deployerAddress, deployerAddress, constants_1.WETH_ADDRESS, expectedAmountOut, weETHContractAddress, deployerWeETHBalance, uniswapSwapPath);
                console.log("Swap transaction successful.");
            });
            it("THEN should increase weth deployer balance", async () => {
                const deployerWETHBalanceAfter = await wethTokenContract.balanceOf(deployerAddress);
                (0, chai_1.expect)(deployerWETHBalanceB4 + expectedAmountOut).to.equal(deployerWETHBalanceAfter);
            });
            it("THEN should decrease weeth deployer balance", async () => {
                const deployerWEETHBalanceAfter = await weETHContract.balanceOf(deployerAddress);
                (0, chai_1.expect)(deployerWEETHBalanceAfter).lt(deployerWeETHBalance);
            });
        });
    });
});
//# sourceMappingURL=etherfiAdapter.test.js.map