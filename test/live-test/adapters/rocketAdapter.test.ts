/* 
THESE TESTS WERE WRITTEN IN ORDER TO TEST SPECIFIC ADAPTERS
TO RUN THESE TEST A MAINNET FORK IS NEEDED
*/

/*
   RUN ONLY ON MAINNET FORK BLOCK NUMBER 20019529,
   AFTER THIS BLOCK ROCKET HAS EXCEEDED CAPACITY AND CURRENTLY CANT ACCEPT NEW DEPSOITS
*/

/* eslint-disable @typescript-eslint/require-await */
import { ethers } from "hardhat";
import { Signer, ContractTransactionResponse } from "ethers";
import { expect } from "chai";
import * as chai from "chai";
import { RocketAdapter } from "../../../types";

import { WETH } from "../../../types/ethers-contracts";

import { deployRocketAdapter } from "../../../scripts/_helpers/_deployContracts";

import { getWethContract, getRETHContract } from "../../_helpers/emulation";

import {
    TEST_TIMEOUT,
    WETH_ADDRESS,
    ROCKET_RETH,
    ROCKET_DEPOSIT_POOL,
    ROCKET_DEPOSIT_SETTINGS,
} from "../../_helpers/constants";

let deployer: Signer;

let deployerAddress: string;

let txResult: ContractTransactionResponse;

let wethTokenContract: WETH;

let adapterRocketContract: RocketAdapter;
let adapterRocketContractAddress: string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let rETHContract: any; // RocketRETH;

describe("Rocket Tests -->> LIVE TESTS", function () {
    this.timeout(TEST_TIMEOUT);

    before(async () => {
        [deployer] = await ethers.getSigners();
        deployerAddress = await deployer.getAddress();

        // get weth token contract as underlying
        wethTokenContract = (await getWethContract(WETH_ADDRESS, deployer)) as unknown as WETH;

        // get Rocket rETH contracts
        rETHContract = await getRETHContract(ROCKET_RETH, deployer);

        // deploy RocketAdapter
        adapterRocketContract = (await deployRocketAdapter(
            "RocketAdapter",
            ROCKET_DEPOSIT_POOL,
            ROCKET_DEPOSIT_SETTINGS,
            WETH_ADDRESS,
            ROCKET_RETH,
        )) as unknown as RocketAdapter;
        adapterRocketContractAddress = await adapterRocketContract.getAddress();

        // give strategy manager role on adapter deposit
        let roleToAssign = await adapterRocketContract.VAULT_STRATEGY_ROLE();
        await adapterRocketContract.grantRole(roleToAssign, deployerAddress);

        // give strategy manager role on adapter withdraw
        roleToAssign = await adapterRocketContract.VAULT_STRATEGY_ROLE();
        await adapterRocketContract.grantRole(roleToAssign, deployerAddress);
    });

    describe("Getters", function () {
        it("Should set the storage correctly", async () => {
            expect(await adapterRocketContract.protocolAddress()).to.equal(ROCKET_DEPOSIT_POOL);
            expect(await adapterRocketContract.rocketSettingsAddress()).to.equal(
                ROCKET_DEPOSIT_SETTINGS,
            );
            expect(await adapterRocketContract.rETHAddress()).to.equal(ROCKET_RETH);
            expect(await adapterRocketContract.wethAddress()).to.equal(WETH_ADDRESS);
            expect(await adapterRocketContract.protocolName()).to.equal("Rocket");
        });

        it("Should retrieve correct rETH price", async () => {
            expect(await adapterRocketContract.getTokenPrice(ROCKET_RETH)).to.equal(
                await rETHContract.getExchangeRate(),
            );
        });
    });

    describe("WHEN executing deposit and withdraw", function () {
        let AMOUNT: bigint;
        let wrapToken: boolean;
        let rETHBalance: bigint;
        let expectedRETH: bigint;
        let rETHPrice: bigint;
        let TOLERANCE: bigint; // rocket pool fee

        describe("WHEN deployer deposits and liquid token should not be wrapped", function () {
            before(async () => {
                // Amount of ETH to deposit
                AMOUNT = ethers.parseEther("10");
                // There is no wrapper for rETH on mainnet
                wrapToken = false;
                // Get rETH Price
                rETHPrice = await adapterRocketContract.getTokenPrice(ROCKET_RETH);
                // Calculate expected amount of rETH after deposit
                expectedRETH = (AMOUNT * 10n ** 18n) / rETHPrice;
                // Set tolerance that is close to amount out that depends on exchange rate and rocket pool depsoit fee 0.05%
                TOLERANCE = ethers.parseEther("0.005");

                // Wrap ETH to WETH
                const depositTx = await wethTokenContract.deposit({ value: AMOUNT });
                await depositTx.wait();

                // Approve the router to spend WETH
                const approvalTx = await wethTokenContract.approve(
                    adapterRocketContractAddress,
                    AMOUNT,
                );
                await approvalTx.wait();

                // Deposit to Rocket Pool
                txResult = await adapterRocketContract.deposit(
                    deployerAddress,
                    deployerAddress,
                    WETH_ADDRESS,
                    AMOUNT,
                    wrapToken,
                );
                // Get rETH balance after deposit
                rETHBalance = await rETHContract.balanceOf(deployerAddress);
            });

            it("THEN it should emit an Event", async () => {
                await expect(txResult)
                    .to.emit(adapterRocketContract, "DepositedOnProtocol")
                    .withArgs(deployerAddress, WETH_ADDRESS, AMOUNT, ROCKET_RETH, rETHBalance);
            });

            it("THEN deployer should receive rETH", async () => {
                expect(rETHBalance).to.be.closeToBigInt(expectedRETH, TOLERANCE);
            });
        });

        describe("WHEN deployer withdraws", function () {
            let deployerRETHBalance: bigint;
            let deployerWETHBalance: bigint;
            let expectedAmountOut: bigint;
            before(async () => {
                deployerRETHBalance = await rETHContract.balanceOf(await deployer.getAddress());
                deployerWETHBalance = await wethTokenContract.balanceOf(
                    await deployer.getAddress(),
                );
                expectedAmountOut = await rETHContract.getEthValue(deployerRETHBalance);

                // Approve Rocket Adapter to spend your rETH tokens
                const approvalTx = await rETHContract.approve(
                    adapterRocketContractAddress,
                    deployerRETHBalance,
                );
                await approvalTx.wait();

                // Withdraw
                txResult = await adapterRocketContract.withdraw(
                    deployerAddress,
                    deployerAddress,
                    WETH_ADDRESS,
                    expectedAmountOut,
                    ROCKET_RETH,
                    deployerRETHBalance,
                    "0x",
                );
            });

            it("THEN should increase weth deployer balance", async () => {
                expect(deployerWETHBalance + expectedAmountOut).to.equal(
                    await wethTokenContract.balanceOf(deployerAddress),
                );
            });

            it("THEN should decrease rETH deployer balance to 0", async () => {
                expect(await rETHContract.balanceOf(deployerAddress)).to.equal(0n);
            });
        });
    });
});

// Extend Chai to include the custom assertion
// tolerance is expressed in WEI
chai.Assertion.addMethod("closeToBigInt", function (expected, tolerance) {
    const actual = this._obj;
    this.assert(
        actual >= expected - tolerance && actual <= expected + tolerance,
        "expected #{this} to be close to #{exp} +/- #{tol}",
        "expected #{this} not to be close to #{exp} +/- #{tol}",
        expected,
        actual,
    );
});
