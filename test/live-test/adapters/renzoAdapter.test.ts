/* 
THESE TESTS WERE WRITTEN IN ORDER TO TEST SPECIFIC ADAPTERS
TO RUN THESE TESTS, A MAINNET FORK IS NEEDED
*/

import { ethers } from "hardhat";
import { Signer, ContractTransactionResponse } from "ethers";
import { expect } from "chai";
import { RenzoAdapter, UniswapV3Adapter } from "../../../types";
import { WETH } from "../../../types/ethers-contracts";
import { deployRenzoAdapter, deployUniswapAdapter } from "../../../scripts/_helpers/_deployContracts";

import {
    getWethContract,
    getLidoStETHContract,
    getEzEthContract,
    getUniswapV3RouterContract,
    getLidoWstETHContract
} from "../../_helpers/emulation";

import {
    TEST_TIMEOUT,
    WETH_ADDRESS,
    LIDO_stETH_ADDRESS,
    RENZO_LIQUIFIER_ADDRESS,
    RENZO_ezETH_ADDRESS,
    UNISWAP_ROUTER_ADDRESS,
    LIDO_WstETH_ADDRESS,
    UNISWAP_QUOTER_ADDRESS
} from "../../_helpers/constants";

let deployer: Signer;

let deployerAddress: string;
let txResult: ContractTransactionResponse;

let wethTokenContract: WETH;
let stETHContract: any; // LIDOstETH;
let uniswapRouterContract: any;
let wstETHContract: any;

let adapterRenzoContract: RenzoAdapter;
let adapterRenzoContractAddress: string;
let ezETHContract: any;
let ezETHContractAddress: string;

let uniswapAdapterContract: UniswapV3Adapter;
let uniswapAdapterContractAddress: string;

describe("Renzo Adapter Tests -->> LIVE TESTS", function () {
    this.timeout(TEST_TIMEOUT);

    before(async () => {
        [deployer] = await ethers.getSigners();
        deployerAddress = await deployer.getAddress();

        // get weth token contract as underlying
        wethTokenContract = (await getWethContract(WETH_ADDRESS, deployer)) as unknown as WETH;
        ezETHContract = await getEzEthContract(RENZO_ezETH_ADDRESS, deployer);

        // get lido token contract
        stETHContract = await getLidoStETHContract(LIDO_stETH_ADDRESS, deployer);
        uniswapRouterContract = await getUniswapV3RouterContract(UNISWAP_ROUTER_ADDRESS, deployer);
        wstETHContract = await getLidoWstETHContract(LIDO_WstETH_ADDRESS, deployer);

        // Ensure deployer has stETH balance
        const AMOUNT = ethers.parseEther("100");

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
            amountOutMinimum: 0,
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

        const stEthDeployerBalance = await stETHContract.balanceOf(deployerAddress);

        if (stEthDeployerBalance === 0n) {
            throw new Error("Deployer stETH balance is zero.");
        }

        // deploy Renzo adapter for staking protocol
        adapterRenzoContract = (await deployRenzoAdapter(
            "RenzoAdapter",
            RENZO_LIQUIFIER_ADDRESS,
            RENZO_ezETH_ADDRESS,
            LIDO_stETH_ADDRESS,
        )) as unknown as RenzoAdapter;
        adapterRenzoContractAddress = await adapterRenzoContract.getAddress();

        // Approve the adapter to spend stETH
        const approveTx = await stETHContract.approve(adapterRenzoContractAddress, stEthDeployerBalance);
        await approveTx.wait();

        // give strategy manager role on adapter deposit
        const roleToAssign = await adapterRenzoContract.VAULT_STRATEGY_ROLE();
        const grantRoleTx = await adapterRenzoContract.grantRole(roleToAssign, deployerAddress);
        await grantRoleTx.wait();

        // deploy uniswap adapter
        uniswapAdapterContract = (await deployUniswapAdapter(
            "UniswapV3Adapter",
            UNISWAP_ROUTER_ADDRESS, // SwapRouter02
            UNISWAP_QUOTER_ADDRESS,
            WETH_ADDRESS,
        )) as unknown as UniswapV3Adapter;
        uniswapAdapterContractAddress = await uniswapAdapterContract.getAddress();

        // give strategy manager role on adapter withdraw
        const roleToAssignUniswap = await uniswapAdapterContract.VAULT_STRATEGY_ROLE();
        await uniswapAdapterContract.grantRole(roleToAssignUniswap, deployerAddress);
    });

    describe("WHEN executing deposit", function () {
        let wrapToken: boolean;
        let stEthDeployerBalance: bigint;
        let ezETHBalance: bigint;

        describe("WHEN deployer deposits", function () {
            before(async () => {
                wrapToken = false;

                // Check stETH balance
                stEthDeployerBalance = await stETHContract.balanceOf(deployerAddress);
                console.log(`stETH balance of deployer: ${stEthDeployerBalance.toString()}`);

                // Ensure stEthDeployerBalance is non-zero
                if (stEthDeployerBalance === 0n) {
                    throw new Error("Deployer stETH balance is zero.");
                }

                // Approve the adapter to spend stETH
                const approveTx = await stETHContract.approve(adapterRenzoContractAddress, stEthDeployerBalance);
                await approveTx.wait();

                // Log before deposit
                console.log('Attempting to deposit stETH into Renzo Adapter');

                // Deposit stETH to receive ezETH
                try {
                    txResult = await adapterRenzoContract.deposit(
                        deployerAddress,
                        deployerAddress,
                        LIDO_stETH_ADDRESS,
                        stEthDeployerBalance,
                        wrapToken,
                    );
                } catch (error) {
                    console.error('Deposit transaction failed', error);
                    throw error;
                }

                // Check ezETH balance
                ezETHBalance = await ezETHContract.balanceOf(deployerAddress);
                console.log(`ezETH balance of deployer: ${ezETHBalance.toString()}`);
            });

            it("THEN deployer should receive ezETH", async () => {
                expect(ezETHBalance).to.be.greaterThan(0);
            });
        });
    });

    describe("WHEN deployer withdraws", function () {
        let deployerEzETHBalance: bigint;
        let deployerWETHBalanceB4: bigint;
        let expectedAmountOut: bigint;

        before(async () => {
            // Approve the Uniswap router to spend your ezETH tokens
            deployerEzETHBalance = await ezETHContract.balanceOf(deployer.getAddress());
            expectedAmountOut = await ezETHContract.balanceOf(await deployer.getAddress());
            deployerWETHBalanceB4 = await wethTokenContract.balanceOf(deployer.getAddress());

            const approvalTx = await ezETHContract.approve(uniswapAdapterContractAddress, deployerEzETHBalance);
            await approvalTx.wait();

            const uniswapSwapPath = ethers.solidityPacked(
                ["address", "uint24", "address"],
                [WETH_ADDRESS, BigInt(500), RENZO_ezETH_ADDRESS],
            );

            // Swap ezETH for wETH
            txResult = await uniswapAdapterContract.withdraw(
                deployerAddress,
                deployerAddress,
                WETH_ADDRESS,
                expectedAmountOut,
                ezETHContractAddress,
                deployerEzETHBalance,
                uniswapSwapPath,
            );
            console.log("Swap transaction successful.");
        });
    });
});