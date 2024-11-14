/* 
THESE TESTS WERE WRITTEN IN ORDER TO TEST SPECIFIC ADAPTERS
TO RUN THESE TEST A MAINNET FORK IS NEEDED
*/

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/require-await */
import { ethers } from "hardhat";
import { Signer, ContractTransactionResponse } from "ethers";
import { expect } from "chai";
import { UniswapV3Adapter, KelpAdapter } from "../../../types";

import { WETH } from "../../../types/ethers-contracts";

import { deployKelpAdapter, deployUniswapAdapter } from "../../../scripts/_helpers/_deployContracts";

import {
    getWethContract,
    getLidoStETHContract,
    getUniswapV3RouterContract,
    getLidoWstETHContract,
    getRsETHContract,
} from "../../_helpers/emulation";

import {
    TEST_TIMEOUT,
    LIDO_stETH_ADDRESS,
    WETH_ADDRESS,
    LIDO_WstETH_ADDRESS,
    UNISWAP_ROUTER_ADDRESS,
    UNISWAP_QUOTER_ADDRESS,
    KELP_DEPOSIT_POOL_ADDRESS,
    KELP_rsETH_ADDRESS,
    rsETH_WETH_POOL,
} from "../../_helpers/constants";

let deployer: Signer;

let deployerAddress: string;

let txResult: ContractTransactionResponse;

let wethTokenContract: WETH;
let uniswapRouterContract: any;
let stETHContract: any; // LIDOstETH;

let uniswapAdapterContract: UniswapV3Adapter;
let uniswapAdapterContractAddress: string;

let adapterKelpContract: KelpAdapter;
let adapterKelpContractAddress: string;

let wstETHContract: any;

let rsETHContract: any;

describe("Kelp Tests -->> LIVE TESTS", function () {
    this.timeout(TEST_TIMEOUT);

    before(async () => {
        [deployer] = await ethers.getSigners();
        deployerAddress = await deployer.getAddress();

        // get weth token contract as underlying
        wethTokenContract = (await getWethContract(WETH_ADDRESS, deployer)) as unknown as WETH;
        uniswapRouterContract = await getUniswapV3RouterContract(UNISWAP_ROUTER_ADDRESS, deployer);

        // get lido stETH/wstETH contracts
        stETHContract = await getLidoStETHContract(LIDO_stETH_ADDRESS, deployer);
        wstETHContract = await getLidoWstETHContract(LIDO_WstETH_ADDRESS, deployer);

        // get rsETH token contract
        rsETHContract = await getRsETHContract(KELP_rsETH_ADDRESS, deployer);

        // deploy KelpAdapter
        adapterKelpContract = (await deployKelpAdapter(
            "KelpAdapter",
            KELP_DEPOSIT_POOL_ADDRESS,
            KELP_rsETH_ADDRESS,
        )) as unknown as KelpAdapter;
        adapterKelpContractAddress = await adapterKelpContract.getAddress();

        // deploy uniswap adapter
        uniswapAdapterContract = (await deployUniswapAdapter(
            "UniswapV3Adapter",
            UNISWAP_ROUTER_ADDRESS, // SwapRouter02
            UNISWAP_QUOTER_ADDRESS,
            WETH_ADDRESS,
        )) as unknown as UniswapV3Adapter;
        uniswapAdapterContractAddress = await uniswapAdapterContract.getAddress();

        // config token pools to withdraw
        await uniswapAdapterContract.setPoolPerTokenForPrice(KELP_rsETH_ADDRESS, rsETH_WETH_POOL);

        // give strategy manager role on adapter deposit
        let roleToAssign = await adapterKelpContract.VAULT_STRATEGY_ROLE();
        await adapterKelpContract.grantRole(roleToAssign, deployerAddress);

        // give strategy manager role on adapter withdraw
        roleToAssign = await uniswapAdapterContract.VAULT_STRATEGY_ROLE();
        await uniswapAdapterContract.grantRole(roleToAssign, deployerAddress);
    });

    describe("WHEN executing deposit and withdraw", function () {
        const AMOUNT: bigint = ethers.parseEther("10");
        const wrapToken: boolean = false; // Always false bc there is no wrapper for rsETH on mainnet
        let stEthDeployerBalance: bigint;
        let rsETHBalanceB4: bigint;
        let rsETHBalance: bigint;

        describe("WHEN deployer deposits", function () {
            before(async () => {
                rsETHBalanceB4 = await rsETHContract.balanceOf(deployerAddress);

                // Wrap ETH to WETH
                const depositTx = await wethTokenContract.deposit({ value: AMOUNT });
                await depositTx.wait();

                // Approve the router to spend WETH
                const approvalTx = await wethTokenContract.approve(UNISWAP_ROUTER_ADDRESS, AMOUNT);
                await approvalTx.wait();

                const params = {
                    tokenIn: WETH_ADDRESS,
                    tokenOut: LIDO_WstETH_ADDRESS,
                    fee: 100,
                    recipient: deployerAddress,
                    amountIn: AMOUNT,
                    amountOutMinimum: 0, // Set to 0 to accept any amount of wsETH
                    sqrtPriceLimitX96: 0,
                };

                // Swap WETH to wsETH
                const swapTx = await uniswapRouterContract.exactInputSingle(params);
                await swapTx.wait();

                const wstETHBalance = await wstETHContract.balanceOf(deployerAddress);

                console.log(
                    `Swapped ${ethers.formatEther(AMOUNT)} WETH for ${ethers.formatEther(wstETHBalance)} wstETH`,
                );

                // Unwrap stETH in order to deposit
                await wstETHContract.unwrap(await wstETHContract.balanceOf(deployerAddress));

                stEthDeployerBalance = await stETHContract.balanceOf(deployerAddress);

                await stETHContract.approve(adapterKelpContractAddress, stEthDeployerBalance);

                txResult = await adapterKelpContract.deposit(
                    deployerAddress,
                    deployerAddress,
                    LIDO_stETH_ADDRESS,
                    stEthDeployerBalance,
                    wrapToken,
                );

                rsETHBalance = await rsETHContract.balanceOf(deployerAddress);
            });

            it("THEN it should emit an Event", async () => {
                await expect(txResult)
                    .to.emit(adapterKelpContract, "DepositedOnProtocol")
                    .withArgs(
                        deployerAddress,
                        LIDO_stETH_ADDRESS,
                        stEthDeployerBalance,
                        KELP_rsETH_ADDRESS,
                        rsETHBalance,
                    );
            });

            it("THEN deployer should receive rsETH", async () => {
                expect(rsETHBalance).to.be.greaterThan(rsETHBalanceB4);
            });
        });

        describe("WHEN deployer withdraws", function () {
            let deployerRsETHBalanceB4: bigint;
            let deployerRsETHBalanceAfter: bigint;
            let deployerWETHBalanceB4: bigint;
            let deployerWETHBalanceAfter: bigint;
            let expectedAmountOut: bigint;
            let tokenPrice: bigint;

            before(async () => {
                // Get balances before withdraw
                deployerRsETHBalanceB4 = await rsETHContract.balanceOf(await deployer.getAddress());
                deployerWETHBalanceB4 = await wethTokenContract.balanceOf(
                    await deployer.getAddress(),
                );

                // get ETHx price
                tokenPrice = await uniswapAdapterContract.getTokenPrice(KELP_rsETH_ADDRESS);
                // calculate the amount out
                expectedAmountOut = (deployerRsETHBalanceB4 * 10n ** 18n) / tokenPrice;

                // Approve the Uniswap adapter to spend rsETH tokens
                const approvalTx = await rsETHContract.approve(
                    uniswapAdapterContractAddress,
                    deployerRsETHBalanceB4,
                );
                await approvalTx.wait();

                const path = ethers.solidityPacked(
                    ["address", "uint24", "address"],
                    [WETH_ADDRESS, BigInt(500), KELP_rsETH_ADDRESS],
                );

                // Withdraw through Uniswap adapter
                await uniswapAdapterContract.withdraw(
                    deployerAddress,
                    deployerAddress,
                    WETH_ADDRESS,
                    expectedAmountOut,
                    KELP_rsETH_ADDRESS,
                    deployerRsETHBalanceB4,
                    path,
                );

                // Get balances after withdraw
                deployerWETHBalanceAfter = await wethTokenContract.balanceOf(deployerAddress);
                deployerRsETHBalanceAfter = await rsETHContract.balanceOf(deployerAddress);
            });

            it("THEN should increase weth deployer balance", async () => {
                expect(deployerWETHBalanceB4 + expectedAmountOut).to.equal(
                    deployerWETHBalanceAfter,
                );
            });

            it("THEN should decrease rsETH deployer balance", async () => {
                expect(deployerRsETHBalanceAfter).lt(deployerRsETHBalanceB4);
            });
        });
    });
});
