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
let stETHContract;
let uniswapRouterContract;
let wstETHContract;
let adapterRenzoContract;
let adapterRenzoContractAddress;
let ezETHContract;
let ezETHContractAddress;
let uniswapAdapterContract;
let uniswapAdapterContractAddress;
describe("Renzo Adapter Tests -->> LIVE TESTS", function () {
    this.timeout(constants_1.TEST_TIMEOUT);
    before(async () => {
        [deployer] = await hardhat_1.ethers.getSigners();
        deployerAddress = await deployer.getAddress();
        wethTokenContract = (await (0, emulation_1.getWethContract)(constants_1.WETH_ADDRESS, deployer));
        ezETHContract = await (0, emulation_1.getEzEthContract)(constants_1.RENZO_ezETH_ADDRESS, deployer);
        stETHContract = await (0, emulation_1.getLidoStETHContract)(constants_1.LIDO_stETH_ADDRESS, deployer);
        uniswapRouterContract = await (0, emulation_1.getUniswapV3RouterContract)(constants_1.UNISWAP_ROUTER_ADDRESS, deployer);
        wstETHContract = await (0, emulation_1.getLidoWstETHContract)(constants_1.LIDO_WstETH_ADDRESS, deployer);
        const AMOUNT = hardhat_1.ethers.parseEther("100");
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
        const stEthDeployerBalance = await stETHContract.balanceOf(deployerAddress);
        if (stEthDeployerBalance === 0n) {
            throw new Error("Deployer stETH balance is zero.");
        }
        adapterRenzoContract = (await (0, _deployContracts_1.deployRenzoAdapter)("RenzoAdapter", constants_1.RENZO_LIQUIFIER_ADDRESS, constants_1.RENZO_ezETH_ADDRESS, constants_1.LIDO_stETH_ADDRESS));
        adapterRenzoContractAddress = await adapterRenzoContract.getAddress();
        const approveTx = await stETHContract.approve(adapterRenzoContractAddress, stEthDeployerBalance);
        await approveTx.wait();
        const roleToAssign = await adapterRenzoContract.VAULT_STRATEGY_ROLE();
        const grantRoleTx = await adapterRenzoContract.grantRole(roleToAssign, deployerAddress);
        await grantRoleTx.wait();
        uniswapAdapterContract = (await (0, _deployContracts_1.deployUniswapAdapter)("UniswapV3Adapter", constants_1.UNISWAP_ROUTER_ADDRESS, constants_1.UNISWAP_QUOTER_ADDRESS, constants_1.WETH_ADDRESS));
        uniswapAdapterContractAddress = await uniswapAdapterContract.getAddress();
        const roleToAssignUniswap = await uniswapAdapterContract.VAULT_STRATEGY_ROLE();
        await uniswapAdapterContract.grantRole(roleToAssignUniswap, deployerAddress);
    });
    describe("WHEN executing deposit", function () {
        let wrapToken;
        let stEthDeployerBalance;
        let ezETHBalance;
        describe("WHEN deployer deposits", function () {
            before(async () => {
                wrapToken = false;
                stEthDeployerBalance = await stETHContract.balanceOf(deployerAddress);
                console.log(`stETH balance of deployer: ${stEthDeployerBalance.toString()}`);
                if (stEthDeployerBalance === 0n) {
                    throw new Error("Deployer stETH balance is zero.");
                }
                const approveTx = await stETHContract.approve(adapterRenzoContractAddress, stEthDeployerBalance);
                await approveTx.wait();
                console.log('Attempting to deposit stETH into Renzo Adapter');
                try {
                    txResult = await adapterRenzoContract.deposit(deployerAddress, deployerAddress, constants_1.LIDO_stETH_ADDRESS, stEthDeployerBalance, wrapToken);
                }
                catch (error) {
                    console.error('Deposit transaction failed', error);
                    throw error;
                }
                ezETHBalance = await ezETHContract.balanceOf(deployerAddress);
                console.log(`ezETH balance of deployer: ${ezETHBalance.toString()}`);
            });
            it("THEN deployer should receive ezETH", async () => {
                (0, chai_1.expect)(ezETHBalance).to.be.greaterThan(0);
            });
        });
    });
    describe("WHEN deployer withdraws", function () {
        let deployerEzETHBalance;
        let deployerWETHBalanceB4;
        let expectedAmountOut;
        before(async () => {
            deployerEzETHBalance = await ezETHContract.balanceOf(deployer.getAddress());
            expectedAmountOut = await ezETHContract.balanceOf(await deployer.getAddress());
            deployerWETHBalanceB4 = await wethTokenContract.balanceOf(deployer.getAddress());
            const approvalTx = await ezETHContract.approve(uniswapAdapterContractAddress, deployerEzETHBalance);
            await approvalTx.wait();
            const uniswapSwapPath = hardhat_1.ethers.solidityPacked(["address", "uint24", "address"], [constants_1.WETH_ADDRESS, BigInt(500), constants_1.RENZO_ezETH_ADDRESS]);
            txResult = await uniswapAdapterContract.withdraw(deployerAddress, deployerAddress, constants_1.WETH_ADDRESS, expectedAmountOut, ezETHContractAddress, deployerEzETHBalance, uniswapSwapPath);
            console.log("Swap transaction successful.");
        });
    });
});
//# sourceMappingURL=renzoAdapter.test.js.map