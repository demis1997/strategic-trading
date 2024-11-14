/* 
THESE TESTS WERE WRITTEN IN ORDER TO TEST SPECIFIC ADAPTERS
TO RUN THESE TEST A MAINNET FORK IS NEEDED
*/

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/require-await */
import { ethers } from "hardhat";
import { Signer, ContractTransactionResponse } from "ethers";
import { expect } from "chai";
import { UniswapV3Adapter, EtherFiAdapter } from "../../../types";

import { WETH } from "../../../types/ethers-contracts";

import { deployEtherFiAdapter, deployUniswapAdapter } from "../../../scripts/_helpers/_deployContracts";

import {
    getWethContract,
    getLidoStETHContract,
    getUniswapV3RouterContract,
    getLidoWstETHContract,
    getWeEthContract,
} from "../../_helpers/emulation";

import {
    TEST_TIMEOUT,
    LIDO_stETH_ADDRESS,
    WETH_ADDRESS,
    LIDO_WstETH_ADDRESS,
    UNISWAP_ROUTER_ADDRESS,
    UNISWAP_QUOTER_ADDRESS,
    ETHERFI_LIQUIFIER_ADDRESS,
    ETHERFI_eETH_ADDRESS,
    ETHERFI_weETH_ADDRESS,
} from "../../_helpers/constants";

let deployer: Signer;

let deployerAddress: string;
let txResult: ContractTransactionResponse;

let wethTokenContract: WETH;
let uniswapRouterContract: any;
let stETHContract: any; // LIDOstETH;

let uniswapAdapterContract: UniswapV3Adapter;
let uniswapAdapterContractAddress: string;
let adapterEtherFiContract: EtherFiAdapter;
let adapterEtherFiContractAddress: string;
let wstETHContract: any;

let weETHContract: any;
let weETHContractAddress: any;

describe("EherFi Tests -->> LIVE TESTS", function () {
    this.timeout(TEST_TIMEOUT);

    before(async () => {
        [deployer] = await ethers.getSigners();
        [deployerAddress] = await Promise.all([deployer.getAddress()]);

        // get weth token contract as underlying
        wethTokenContract = (await getWethContract(WETH_ADDRESS, deployer)) as unknown as WETH;
        uniswapRouterContract = await getUniswapV3RouterContract(UNISWAP_ROUTER_ADDRESS, deployer);
        wstETHContract = await getLidoWstETHContract(LIDO_WstETH_ADDRESS, deployer);

        // get lido token contract
        stETHContract = await getLidoStETHContract(LIDO_stETH_ADDRESS, deployer);

        // get weETH token contract
        weETHContract = await getWeEthContract(ETHERFI_weETH_ADDRESS, deployer);
        weETHContractAddress = await weETHContract.getAddress();

        // deploy EtherFi adapter for staking protocol
        adapterEtherFiContract = (await deployEtherFiAdapter(
            "EtherFiAdapter",
            ETHERFI_LIQUIFIER_ADDRESS,
            ETHERFI_eETH_ADDRESS,
            ETHERFI_weETH_ADDRESS,
        )) as unknown as EtherFiAdapter;
        adapterEtherFiContractAddress = await adapterEtherFiContract.getAddress();

        // deploy uniswap adapter
        uniswapAdapterContract = (await deployUniswapAdapter(
            "UniswapV3Adapter",
            UNISWAP_ROUTER_ADDRESS, // SwapRouter02
            UNISWAP_QUOTER_ADDRESS,
            WETH_ADDRESS,
        )) as unknown as UniswapV3Adapter;
        uniswapAdapterContractAddress = await uniswapAdapterContract.getAddress();

        // give strategy manager role on adapter deposit
        let roleToAssign = await adapterEtherFiContract.VAULT_STRATEGY_ROLE();
        await adapterEtherFiContract.grantRole(roleToAssign, deployerAddress);

        // give strategy manager role on adapter withdraw
        roleToAssign = await uniswapAdapterContract.VAULT_STRATEGY_ROLE();
        await uniswapAdapterContract.grantRole(roleToAssign, deployerAddress);
    });

    describe("WHEN executing deposit and withdraw", function () {
        let AMOUNT: bigint;
        let wrapToken: boolean;
        let stEthDeployerBalance: bigint;
        let weETHBalance: bigint;

        describe("WHEN deployer deposits and liquid token should be wrapped", function () {
            before(async () => {
                // Amount of ETH to swap
                AMOUNT = ethers.parseEther("100");
                wrapToken = true;

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

                await stETHContract.approve(adapterEtherFiContractAddress, stEthDeployerBalance);

                txResult = await adapterEtherFiContract.deposit(
                    deployerAddress,
                    deployerAddress,
                    LIDO_stETH_ADDRESS,
                    stEthDeployerBalance,
                    wrapToken,
                );

                weETHBalance = await weETHContract.balanceOf(deployerAddress);
            });

            it("THEN it should emit an Event", async () => {
                await expect(txResult)
                    .to.emit(adapterEtherFiContract, "DepositedOnProtocol")
                    .withArgs(
                        deployerAddress,
                        LIDO_stETH_ADDRESS,
                        stEthDeployerBalance,
                        weETHContractAddress,
                        weETHBalance,
                    );
            });

            it("THEN deployer should receive weETH", async () => {
                expect(weETHBalance).to.be.greaterThan(0);
            });
        });

        describe("WHEN deployer withdraws", function () {
            let deployerWeETHBalance: bigint;
            let deployerWETHBalanceB4: bigint;
            let expectedAmountOut: bigint;
            before(async () => {
                // Approve the Uniswap router to spend your weETH tokens
                deployerWeETHBalance = await weETHContract.balanceOf(await deployer.getAddress());
                expectedAmountOut = await weETHContract.balanceOf(await deployer.getAddress());
                deployerWETHBalanceB4 = await wethTokenContract.balanceOf(
                    await deployer.getAddress(),
                );

                const approvalTx = await weETHContract.approve(
                    uniswapAdapterContractAddress,
                    deployerWeETHBalance,
                );
                await approvalTx.wait();

                const uniswapSwapPath = ethers.solidityPacked(
                    ["address", "uint24", "address"],
                    [WETH_ADDRESS, BigInt(500), ETHERFI_weETH_ADDRESS],
                );

                // Swap wEETH for wETH
                txResult = await uniswapAdapterContract.withdraw(
                    deployerAddress,
                    deployerAddress,
                    WETH_ADDRESS,
                    expectedAmountOut,
                    weETHContractAddress,
                    deployerWeETHBalance,
                    uniswapSwapPath,
                );
                console.log("Swap transaction successful.");
            });

            it("THEN should increase weth deployer balance", async () => {
                const deployerWETHBalanceAfter = await wethTokenContract.balanceOf(deployerAddress);
                expect(deployerWETHBalanceB4 + expectedAmountOut).to.equal(
                    deployerWETHBalanceAfter,
                );
            });

            it("THEN should decrease weeth deployer balance", async () => {
                const deployerWEETHBalanceAfter = await weETHContract.balanceOf(deployerAddress);
                expect(deployerWEETHBalanceAfter).lt(deployerWeETHBalance);
            });
        });
    });
});
