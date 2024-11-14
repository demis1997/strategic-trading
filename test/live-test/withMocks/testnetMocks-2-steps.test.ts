/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ethers } from "hardhat";
import { Contract, Signer, ContractTransactionResponse } from "ethers";
import { SnapshotRestorer, takeSnapshot } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import * as chai from "chai";
import { Vault, StrSimpleReStaking, ERC20Mock, AggregatorToken } from "../../../types";

import {
    constants,
    deployedContracts,
    vaults,
    strategies,
    adapters,
} from "../../../scripts/_helpers/_deployAddresses";

import { AMOUNT_1E18, TEST_TIMEOUT, ZERO_AMOUNT } from "../../_helpers/constants";

import { getVariableFromEvent } from "./../../_helpers/utils";

let baseSnapshot: SnapshotRestorer;
let user1: Signer;
let user2: Signer;
let deployer: Signer;

let user1Address: string;
let user2Address: string;
let deployerAddress: string;
let masterTokenAddress: string;

let txResult: ContractTransactionResponse;

let masterTokenContract: AggregatorToken;

let wethTokenContract: ERC20Mock;
let liquidTokenContract: ERC20Mock;
let firstLiquidTokenContract: ERC20Mock;

let vaultContract: Vault;
let vaultAddress: string;

let firstAdapterContractAddress: string;
let secondAdapterContractAddress: string;

let strategyContract: StrSimpleReStaking;
let strategyContractAddress: string;

const INITIAL_BALANCE_AFTER_DEPOSIT = ethers.parseEther("20");
const INTIAL_MINT = ethers.parseEther("100");

let oneLTinWETH: bigint;
let expectedBalanceAferDeployment: bigint;
let expectedInitialValuation: bigint;
// const percentageDeposit: bigint[] = [1n, 1n];
// const percentageWithdraw: bigint[] = [1n, 1n];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// DEFINE THIS BEFORE TESTING
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const NETWORK = "SEPOLIA";
const STR_CONTRACT_NAME = "StrSimpleReStaking";

/// NAME OF THE TESTS TO PRINT
//////////////////////////////////////////////////////////////////
// const TEST_NAME = "LIDO - KELP";
// const TEST_NAME = "LIDO - ETHERFI";
const TEST_NAME = "STADER - KELP";

/// VAULT AND STRATEGY
//////////////////////////////////////////////////////////////////
// const VAULT = vaults[NETWORK].vault1;
// const STRATEGY = strategies[NETWORK].strategy1;
// const VAULT = vaults[NETWORK].vault2;
// const STRATEGY = strategies[NETWORK].strategy2;
const VAULT = vaults[NETWORK].vault3;
const STRATEGY = strategies[NETWORK].strategy3;

/// FIRST ADAPTER ON PATH
//////////////////////////////////////////////////////////////////
// const FIRST_ADAPTER = adapters[NETWORK].weth_lido;
// const FIRST_ADAPTER_TOKEN = constants[NETWORK].lidoStEth;
const FIRST_ADAPTER = adapters[NETWORK].weth_stader;
const FIRST_ADAPTER_TOKEN = constants[NETWORK].stader_ETHx;

/// SECOND ADAPTER ON PATH
//////////////////////////////////////////////////////////////////
// const SECOND_ADAPTER = adapters[NETWORK].lido_kelp;
// const SECOND_ADAPTER_TOKEN = constants[NETWORK].kelp_rsEth;
// const SECOND_ADAPTER = adapters[NETWORK].lido_etherfi;
// const SECOND_ADAPTER_TOKEN = constants[NETWORK].etherfi_eEth;
const SECOND_ADAPTER = adapters[NETWORK].stader_kelp;
const SECOND_ADAPTER_TOKEN = constants[NETWORK].kelp_rsEth;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe(`${TEST_NAME} ==> Restaking Strategy Tests -->> LIVE TEST WITH MOCKED CONTRACTS`, function () {
    this.timeout(TEST_TIMEOUT);

    before(async () => {
        [deployer, user1, user2] = await ethers.getSigners();
        [deployerAddress, user1Address, user2Address] = await Promise.all([
            deployer.getAddress(),
            user1.getAddress(),
            user2.getAddress(),
        ]);

        // get weth token contract as underlying
        wethTokenContract = await ethers.getContractAt("ERC20Mock", constants[NETWORK].weth);

        // get master token
        masterTokenContract = (await ethers.getContractAt(
            "AggregatorToken",
            deployedContracts[NETWORK].masterToken,
        )) as unknown as AggregatorToken;
        masterTokenAddress = deployedContracts[NETWORK].masterToken;

        // get vault
        vaultContract = (await ethers.getContractAt("Vault", VAULT)) as unknown as Vault;
        vaultAddress = VAULT;

        // get token contract
        firstLiquidTokenContract = await ethers.getContractAt("ERC20Mock", FIRST_ADAPTER_TOKEN);

        // get token contract
        liquidTokenContract = await ethers.getContractAt("ERC20Mock", SECOND_ADAPTER_TOKEN);
        const liquidTokenContractAddress = SECOND_ADAPTER_TOKEN;

        // get first adapter
        await ethers.getContractAt("TestnetAdapterMock", FIRST_ADAPTER);
        firstAdapterContractAddress = FIRST_ADAPTER;

        // get second adapter
        await ethers.getContractAt("TestnetAdapterMock", SECOND_ADAPTER);
        secondAdapterContractAddress = SECOND_ADAPTER;

        // get VaultStrategy
        strategyContract = await ethers.getContractAt(STR_CONTRACT_NAME, STRATEGY);
        strategyContractAddress = STRATEGY;

        // MINT underlying for users
        let tx;
        tx = await wethTokenContract.mint(user1Address, INTIAL_MINT);
        await tx.wait();
        tx = await wethTokenContract.mint(user2Address, INTIAL_MINT);
        await tx.wait();

        // mint weth to final protocol
        tx = await wethTokenContract.mint(secondAdapterContractAddress, INTIAL_MINT * 100n);
        await tx.wait();

        // mint firstLT to first adapter
        tx = await firstLiquidTokenContract.mint(firstAdapterContractAddress, INTIAL_MINT * 100n);
        await tx.wait();

        // mint liquidToken to last adapter
        tx = await liquidTokenContract.mint(secondAdapterContractAddress, INTIAL_MINT * 100n);
        await tx.wait();

        ////////////////////////////////////////////////////////////////////////////////////////////
        // // set percenteges
        // await firstAdapterContract.setPercentageDeposit(0);
        // await firstAdapterContract.setPercentageDeposit(0);
        // await secondAdapterContract.setPercentageDeposit(0);
        // await secondAdapterContract.setPercentageDeposit(4);

        // // get percentages to calculate right
        // percentageDeposit.push(await firstAdapterContract.percentageModifierDeposit());
        // percentageWithdraw.push(await firstAdapterContract.percentageModifierWithdraw());
        // percentageDeposit.push(await secondAdapterContract.percentageModifierDeposit());
        // percentageWithdraw.push(await secondAdapterContract.percentageModifierWithdraw());

        // calculate expectedBalance
        // 20 - 1%
        // 20 - 100 || 20/100 = 1

        // const balanceAferDeployment1 =
        //     INITIAL_BALANCE_AFTER_DEPOSIT +
        //     (INITIAL_BALANCE_AFTER_DEPOSIT / 100n) * percentageDeposit[0];

        // expectedBalanceAferDeployment =
        //     balanceAferDeployment1 + (balanceAferDeployment1 / 100n) * percentageDeposit[1];
        ////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////

        const balanceAferDeployment1 = INITIAL_BALANCE_AFTER_DEPOSIT;
        expectedBalanceAferDeployment = balanceAferDeployment1;

        // get token price
        oneLTinWETH = await strategyContract.getTokenPrice(liquidTokenContractAddress, 2);
        // calculate initial valuation
        expectedInitialValuation = (expectedBalanceAferDeployment * oneLTinWETH) / AMOUNT_1E18;

        // console.log("\n");
        // console.log("percentageDeposit  :>> ", percentageDeposit);
        // console.log("percentageWithdraw :>> ", percentageWithdraw);
        // console.log("balanceAferDeployment1        :>> ", balanceAferDeployment1);
        // console.log("expectedBalanceAferDeployment :>> ", expectedBalanceAferDeployment);
        // console.log("oneLTinWETH                :>> ", oneLTinWETH);
        // console.log("expectedInitialValuation      :>> ", expectedInitialValuation);

        baseSnapshot = await takeSnapshot();
    });

    describe("WHEN trying to execute deposit", () => {
        after(async () => {
            await baseSnapshot.restore();
        });
        describe("WHEN calling with valid parameters", () => {
            const totalAmount = ethers.parseEther("10");
            let user1BlanaceBefore: bigint;
            let totalSupplyBefore: bigint;
            let mintedShares: bigint;

            before(async () => {
                // get balances
                user1BlanaceBefore = await masterTokenContract.balanceOf(user1Address);
                totalSupplyBefore = await masterTokenContract.totalSupply();

                // approve master token to get funds from user1
                await wethTokenContract.connect(user1).approve(masterTokenAddress, totalAmount);

                // deposit
                txResult = await masterTokenContract
                    .connect(user1)
                    .deposit(user1Address, [vaultAddress], [totalAmount], totalAmount);

                /// DELETE THIS
                mintedShares = totalAmount;
            });
            it("THEN event Deposit should be emitted", async () => {
                const txReceipt = await txResult.wait();

                mintedShares = BigInt(
                    await getVariableFromEvent(
                        masterTokenContract as unknown as Contract,
                        "Deposit",
                        txReceipt,
                        5,
                    ),
                );

                await expect(txResult)
                    .to.emit(masterTokenContract, "Deposit")
                    .withArgs(
                        user1Address,
                        user1Address,
                        [vaultAddress],
                        [totalAmount],
                        [mintedShares],
                        mintedShares,
                    );
            });
            it("THEN should increase aggregator token shares for user1", async () => {
                expect(await masterTokenContract.balanceOf(user1Address)).equals(
                    user1BlanaceBefore + mintedShares,
                );
            });
            it("THEN should increase total supply", async () => {
                expect(await masterTokenContract.totalSupply()).equals(
                    totalSupplyBefore + mintedShares,
                );
            });
            it("THEN should update user vaults correctly", async () => {
                expect(await masterTokenContract.vaultsOf(user1Address)).to.deep.equal([
                    vaultAddress,
                ]);
            });
            it("THEN should update number of user vaults correctly", async () => {
                expect(await masterTokenContract.numberOfVaults(user1Address)).equal(
                    [vaultAddress].length,
                );
            });

            it("THEN should retrun the correct exchange rate", async () => {
                expect(await masterTokenContract.exchangeRate()).equal(totalAmount / mintedShares);
            });

            it("THEN it should emit a VaultValuationUpdated Event", async () => {
                await expect(txResult)
                    .to.emit(vaultContract, "VaultValuationUpdated")
                    .withArgs(totalAmount);
            });
        });
    });

    describe("WHEN executing deploy assets from vault (no valuation update)", function () {
        let AMOUNT: bigint;
        let strategyWETHBalanceBefore: bigint;
        let vaultWETHBalanceBefore: bigint;
        let vaultTotalAssetsBefore: bigint;
        let pendingDepositAssetsBefore: bigint;

        before(async () => {
            // amount to deposit
            AMOUNT = ethers.parseEther("10");

            // put 20 in the vault from user 1 and 2
            await setVaultWith20(AMOUNT, false);

            // get balances
            strategyWETHBalanceBefore = await wethTokenContract.balanceOf(strategyContractAddress); // 0
            vaultWETHBalanceBefore = await wethTokenContract.balanceOf(vaultAddress); // 20
            vaultTotalAssetsBefore = await vaultContract.totalAssets(); // 20
            pendingDepositAssetsBefore = await vaultContract.pendingDepositAssets(); // 20

            // execute deployAssets
            txResult = await vaultContract.deployAssets();
        });

        after(async () => {
            await baseSnapshot.restore();
        });

        it("THEN pendingDepositAssets should be ZERO", async () => {
            const pendingDepositAssets = await vaultContract.pendingDepositAssets();
            expect(pendingDepositAssets).equals(ZERO_AMOUNT);
        });

        it("THEN vault assets balance should decrease from 20 ETH to 0 ETH", async () => {
            const vaultWETHBalance = await wethTokenContract.balanceOf(vaultAddress);

            expect(vaultWETHBalanceBefore - vaultWETHBalance).equals(pendingDepositAssetsBefore);
            expect(ZERO_AMOUNT).equals(vaultWETHBalance);
        });

        it("THEN vault totalAssets should decrease from 20 ETH to 0 ETH", async () => {
            const vaultTotalAssets = await vaultContract.totalAssets();
            expect(vaultTotalAssetsBefore - vaultTotalAssets).equals(pendingDepositAssetsBefore);
            expect(ZERO_AMOUNT).equals(vaultTotalAssets);
        });

        it("THEN vault strategy liquid token balance should increase", async () => {
            const tolerance = 100n; // (0.0000000000000001)

            const strategySTKtokenBalance =
                await liquidTokenContract.balanceOf(strategyContractAddress);

            expect(strategySTKtokenBalance).to.be.closeToBigInt(
                expectedBalanceAferDeployment,
                tolerance,
            );
        });

        it("THEN vault strategy WETH balance should be ZERO", async () => {
            const strategyWETHBalance = await wethTokenContract.balanceOf(strategyContractAddress); // 0
            expect(strategyWETHBalanceBefore + strategyWETHBalance).equals(ZERO_AMOUNT);
        });

        it("THEN vault valuation is still ZERO", async () => {
            const vaultValuation = await vaultContract.totalAssets();
            expect(vaultValuation).equals(ZERO_AMOUNT);
        });
    });

    describe("WHEN executing update valuation from vault", function () {
        before(async () => {
            // amount to deposit
            const AMOUNT = ethers.parseEther("10");

            // set vault and deploy assets
            await setVaultWith20(AMOUNT, true);

            // call updateValuation
            txResult = await vaultContract.updateVaultValuation(2n);
        });

        after(async () => {
            await baseSnapshot.restore();
        });

        it("THEN vault valuation should update", async () => {
            const tolerance = 1n;
            const vaultValuation = await vaultContract.totalAssets(); // +/- 20
            expect(vaultValuation).to.be.closeToBigInt(expectedInitialValuation, tolerance);
        });

        it("THEN strategy valuation should update", async () => {
            const tolerance = 1n;
            const strategyValuation = await strategyContract.deployedAssetsValue(); // +/- 20
            expect(strategyValuation).to.be.closeToBigInt(expectedInitialValuation, tolerance);
        });
    });

    describe("WHEN executing withdraw by user1", function () {
        let sharesAmount: bigint;
        let assetsAmount: bigint;
        let strategyLStokenBalanceBefore: bigint;
        let vaultValuationBefore: bigint;
        let vaultTotalSupplyBefore: bigint;
        let userWETHbalanceBefore: bigint;
        let userSharesBalanceBefore: bigint;
        let strategyStokenBalance: bigint;

        before(async () => {
            // set vault and deploy assets
            const AMOUNT = ethers.parseEther("10");
            await setVaultWith20(AMOUNT, true);

            // update valuation
            await vaultContract.updateVaultValuation(2n);

            // get balances
            vaultValuationBefore = await vaultContract.totalAssets(); // +/- 20 eth
            vaultTotalSupplyBefore = await vaultContract.totalSupply(); // +/- 20 shares
            userWETHbalanceBefore = await wethTokenContract.balanceOf(user1Address); // 90
            userSharesBalanceBefore = await masterTokenContract.balanceOf(user1Address); // 10
            strategyLStokenBalanceBefore =
                await liquidTokenContract.balanceOf(strategyContractAddress);

            assetsAmount = ethers.parseEther("5");
            sharesAmount = await vaultContract.convertToShares(assetsAmount);

            // call withdraw
            txResult = await masterTokenContract
                .connect(user1)
                .withdraw([vaultAddress], [assetsAmount], 1);

            strategyStokenBalance = await liquidTokenContract.balanceOf(strategyContractAddress);
        });

        it("THEN user shares should decrease from 10 to 5 (withdraw 5)", async () => {
            const tolerance = 1n;
            const userShares = await masterTokenContract.balanceOf(user1Address);

            expect(userShares).to.be.closeToBigInt(
                userSharesBalanceBefore - sharesAmount,
                tolerance,
            );
        });

        it("THEN user weth balance should increase from 90 to 95 WETH", async () => {
            const tolerance = 1n;
            const userWETHbalance = await wethTokenContract.balanceOf(user1Address);

            expect(userWETHbalance).to.be.closeToBigInt(
                userWETHbalanceBefore + assetsAmount,
                tolerance,
            );
        });

        it("THEN vault total supply (shares) should decrease from 20 to 15 (5 withdraw)", async () => {
            const tolerance = 1n;
            const vaultTotalSupply = await vaultContract.totalSupply();

            expect(vaultTotalSupply).to.be.closeToBigInt(
                vaultTotalSupplyBefore - sharesAmount,
                tolerance,
            );
        });

        it("THEN strategy balance should decrease", async () => {
            // oneLTinWETH :>>  1,017017400000000000 weth
            //      = 5 1eth ?
            // 1 rs = 1.07 weth
            // 1 rs / 1.07 = 1 weth
            // (1 rs / 1.07) * 5 = 5 weth

            const liquidTokenAmount = (AMOUNT_1E18 * assetsAmount) / oneLTinWETH;

            const tolerance = 1n;
            expect(strategyStokenBalance).to.be.closeToBigInt(
                strategyLStokenBalanceBefore - liquidTokenAmount,
                tolerance,
            );
        });

        it("THEN vault valuation should remain the same (valuation not updated)", async () => {
            const vaultValuation = await vaultContract.totalAssets();
            expect(vaultValuation).equals(vaultValuationBefore);
        });

        it("THEN vault pending deposit asset  valuation should remain the same (valuation not updated)", async () => {
            const vaultValuation = await vaultContract.totalAssets();
            expect(vaultValuation).equals(vaultValuationBefore);
        });

        describe("WHEN executing update valuation from vault (C)", function () {
            before(async () => {
                // call updateValuation
                txResult = await vaultContract.updateVaultValuation(2n);
            });

            it("THEN vault valuation should decrease close to 15 WETH", async () => {
                const newValuation = (strategyStokenBalance * oneLTinWETH) / AMOUNT_1E18;
                const vaultValuation = await vaultContract.totalAssets();

                const tolerance = 1n;
                expect(vaultValuation).to.be.closeToBigInt(newValuation, tolerance);
            });

            it("THEN it should emit a VaultValuationUpdated Event", async () => {
                const totalAssets = await vaultContract.totalAssets();
                await expect(txResult)
                    .to.emit(vaultContract, "VaultValuationUpdated")
                    .withArgs(totalAssets);
            });
        });

        describe("WHEN executing putUnderlying", function () {
            let valuationBefore: bigint;
            let valuationAfter: bigint;
            let userWethBefore: bigint;
            let userWethAfter: bigint;

            before(async () => {
                // get valuation before
                valuationBefore = await vaultContract.totalAssets();

                // get weth from user
                userWethBefore = await wethTokenContract.balanceOf(deployerAddress);

                await wethTokenContract.approve(vaultAddress, AMOUNT_1E18);

                // call updateValuation
                txResult = await vaultContract.putUnderlying(AMOUNT_1E18);
            });

            it("THEN vault valuation should increase by 1 WETH", async () => {
                valuationAfter = await vaultContract.totalAssets();

                const tolerance = 1n;
                expect(valuationAfter).to.be.closeToBigInt(
                    valuationBefore + AMOUNT_1E18,
                    tolerance,
                );
            });

            it("THEN user weth should decrease by 1 WETH", async () => {
                // get weth from user
                userWethAfter = await wethTokenContract.balanceOf(deployerAddress);

                const tolerance = 1n;
                expect(userWethAfter).to.be.closeToBigInt(userWethBefore - AMOUNT_1E18, tolerance);
            });

            it("THEN it should emit an event", async () => {
                await expect(txResult)
                    .to.emit(vaultContract, "VaultValuationUpdated")
                    .withArgs(valuationAfter);
            });

            describe("WHEN executing getUnderlying", function () {
                before(async () => {
                    // get valuation before
                    valuationBefore = await vaultContract.totalAssets();

                    // get weth from user
                    userWethBefore = await wethTokenContract.balanceOf(deployerAddress);

                    // call updateValuation
                    txResult = await vaultContract.getUnderlying(AMOUNT_1E18 / 2n);
                });

                it("THEN vault valuation should decrease by 0.5 WETH", async () => {
                    valuationAfter = await vaultContract.totalAssets();

                    const tolerance = 1n;
                    expect(valuationAfter).to.be.closeToBigInt(
                        valuationBefore - AMOUNT_1E18 / 2n,
                        tolerance,
                    );
                });

                it("THEN user weth should increase by 0.5 WETH", async () => {
                    // get weth from user
                    userWethAfter = await wethTokenContract.balanceOf(deployerAddress);

                    const tolerance = 1n;
                    expect(userWethAfter).to.be.closeToBigInt(
                        userWethBefore + AMOUNT_1E18 / 2n,
                        tolerance,
                    );
                });

                it("THEN it should emit an event", async () => {
                    await expect(txResult)
                        .to.emit(vaultContract, "VaultValuationUpdated")
                        .withArgs(valuationAfter);
                });
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

async function setVaultWith20(AMOUNT: bigint, deployAsstes: boolean): Promise<void> {
    // approve vault to take asset from users
    await wethTokenContract.connect(user1).approve(masterTokenAddress, AMOUNT);
    await wethTokenContract.connect(user2).approve(masterTokenAddress, AMOUNT);

    // Execute deposits
    try {
        await masterTokenContract
            .connect(user1)
            .deposit(user1Address, [vaultAddress], [AMOUNT], AMOUNT);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error during deposit by user1: ${error.message}`);
        } else {
            console.error(`Unknown error during deposit by user1: ${String(error)}`);
        }
        throw error;
    }

    try {
        await masterTokenContract
            .connect(user2)
            .deposit(user2Address, [vaultAddress], [AMOUNT], AMOUNT);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error during deposit by user2: ${error.message}`);
        } else {
            console.error(`Unknown error during deposit by user2: ${String(error)}`);
        }
        throw error;
    }

    if (deployAsstes) {
        await vaultContract.deployAssets();
    }
}
