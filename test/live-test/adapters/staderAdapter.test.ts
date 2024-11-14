/* 
THESE TESTS WERE WRITTEN IN ORDER TO TEST SPECIFIC ADAPTERS
TO RUN THESE TEST A MAINNET FORK IS NEEDED
*/

/* eslint-disable @typescript-eslint/require-await */
import { ethers } from "hardhat";
import { Signer, ContractTransactionResponse } from "ethers";
import { expect } from "chai";
import { UniswapV3Adapter, StaderAdapter } from "../../../types";

import { WETH } from "../../../types/ethers-contracts";

import { deployStaderAdapter, deployUniswapAdapter } from "../../../scripts/_helpers/_deployContracts";

import { getWethContract, getStaderETHxContract } from "../../_helpers/emulation";

import {
    TEST_TIMEOUT,
    WETH_ADDRESS,
    STADER_ETHx_ADDRESS,
    UNISWAP_ROUTER_ADDRESS,
    UNISWAP_QUOTER_ADDRESS,
    STADER_STAKE_MANAGER_ADDRESS,
    ETHx_WETH_POOL,
} from "../../_helpers/constants";

let deployer: Signer;
let deployerAddress: string;

let txResult: ContractTransactionResponse;

let wethTokenContract: WETH;

let uniswapAdapterContract: UniswapV3Adapter;
let uniswapAdapterContractAddress: string;

let adapterStaderContract: StaderAdapter;
let adapterStaderContractAddress: string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let ETHxContract: any;

describe("Stader Tests -->> LIVE TESTS", function () {
    this.timeout(TEST_TIMEOUT);

    before(async () => {
        [deployer] = await ethers.getSigners();
        deployerAddress = await deployer.getAddress();

        // get weth token contract as underlying
        wethTokenContract = (await getWethContract(WETH_ADDRESS, deployer)) as unknown as WETH;

        // get ETHx token contract
        ETHxContract = await getStaderETHxContract(STADER_ETHx_ADDRESS, deployer);

        // deploy Stader adapter for staking protocol
        adapterStaderContract = (await deployStaderAdapter(
            "StaderAdapter",
            STADER_STAKE_MANAGER_ADDRESS,
            WETH_ADDRESS,
            STADER_ETHx_ADDRESS,
        )) as unknown as StaderAdapter;
        adapterStaderContractAddress = await adapterStaderContract.getAddress();

        // deploy uniswap adapter
        uniswapAdapterContract = (await deployUniswapAdapter(
            "UniswapV3Adapter",
            UNISWAP_ROUTER_ADDRESS, // SwapRouter02
            UNISWAP_QUOTER_ADDRESS,
            WETH_ADDRESS,
        )) as unknown as UniswapV3Adapter;
        uniswapAdapterContractAddress = await uniswapAdapterContract.getAddress();

        // config token pools to withdraw
        await uniswapAdapterContract.setPoolPerTokenForPrice(STADER_ETHx_ADDRESS, ETHx_WETH_POOL);

        // give strategy manager role on adapter deposit
        let roleToAssign = await adapterStaderContract.VAULT_STRATEGY_ROLE();
        await adapterStaderContract.grantRole(roleToAssign, deployerAddress);

        // give strategy manager role on adapter withdraw
        roleToAssign = await uniswapAdapterContract.VAULT_STRATEGY_ROLE();
        await uniswapAdapterContract.grantRole(roleToAssign, deployerAddress);
    });

    describe("Getters", function () {
        it("Should set the storage correctly", async () => {
            expect(await adapterStaderContract.protocolAddress()).to.equal(
                STADER_STAKE_MANAGER_ADDRESS,
            );
            expect(await adapterStaderContract.ethxAddress()).to.equal(STADER_ETHx_ADDRESS);
            expect(await adapterStaderContract.wethAddress()).to.equal(WETH_ADDRESS);
            expect(await adapterStaderContract.protocolName()).to.equal("Stader");
        });
    });

    describe("WHEN executing deposit and withdraw", function () {
        const wrapToken: boolean = false; // No wrapper on mainnet
        const AMOUNT: bigint = ethers.parseEther("10");
        let ethxBalance: bigint;

        describe("WHEN deployer deposits and liquid token should be wrapped", function () {
            before(async () => {
                // Wrap ETH to WETH
                const depositTx = await wethTokenContract.deposit({ value: AMOUNT });
                await depositTx.wait();

                // Approve the router to spend WETH
                const approvalTx = await wethTokenContract.approve(
                    adapterStaderContractAddress,
                    AMOUNT,
                );
                await approvalTx.wait();

                // Deposit through Stader adapter
                txResult = await adapterStaderContract.deposit(
                    deployerAddress,
                    deployerAddress,
                    WETH_ADDRESS,
                    AMOUNT,
                    wrapToken,
                );

                // Get ETHx balance after deposit
                ethxBalance = await ETHxContract.balanceOf(deployerAddress);
            });

            it("THEN it should emit an Event", async () => {
                await expect(txResult)
                    .to.emit(adapterStaderContract, "DepositedOnProtocol")
                    .withArgs(
                        deployerAddress,
                        WETH_ADDRESS,
                        AMOUNT,
                        STADER_ETHx_ADDRESS,
                        ethxBalance,
                    );
            });

            it("THEN deployer should receive ETHx", async () => {
                expect(ethxBalance).to.be.greaterThan(0);
            });
        });

        describe("WHEN deployer withdraws", function () {
            let deployerETHxBalance: bigint;
            let deployerWETHBalanceB4: bigint;
            let expectedAmountOut: bigint;
            let tokenPrice: bigint;

            before(async () => {
                deployerETHxBalance = await ETHxContract.balanceOf(await deployer.getAddress());
                deployerWETHBalanceB4 = await wethTokenContract.balanceOf(
                    await deployer.getAddress(),
                );
                // get ETHx price
                tokenPrice = await uniswapAdapterContract.getTokenPrice(STADER_ETHx_ADDRESS);
                // calculate the amount out
                expectedAmountOut = (deployerETHxBalance * 10n ** 18n) / tokenPrice;

                // Approve the Uniswap router to spend your ETHx tokens
                const approvalTx = await ETHxContract.approve(
                    uniswapAdapterContractAddress,
                    deployerETHxBalance,
                );
                await approvalTx.wait();

                const path = ethers.solidityPacked(
                    ["address", "uint24", "address"],
                    [WETH_ADDRESS, BigInt(500), STADER_ETHx_ADDRESS],
                );

                // Swap ETHx for wETH
                txResult = await uniswapAdapterContract.withdraw(
                    deployerAddress,
                    deployerAddress,
                    WETH_ADDRESS,
                    expectedAmountOut,
                    STADER_ETHx_ADDRESS,
                    deployerETHxBalance,
                    path,
                );
            });

            it("THEN should increase weth deployer balance", async () => {
                const deployerWETHBalanceAfter = await wethTokenContract.balanceOf(deployerAddress);
                expect(deployerWETHBalanceB4 + expectedAmountOut).to.equal(
                    deployerWETHBalanceAfter,
                );
            });

            it("THEN should decrease ETHx deployer balance", async () => {
                const deployerETHxBalanceAfter = await ETHxContract.balanceOf(deployerAddress);
                expect(deployerETHxBalanceAfter).lt(deployerETHxBalance);
            });
        });
    });
});
