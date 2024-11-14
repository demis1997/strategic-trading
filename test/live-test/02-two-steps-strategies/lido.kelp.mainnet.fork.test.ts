/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-explicit-any */

/* 
THESE TESTS WERE WRITTEN IN ORDER TO TEST SPECIFIC ADAPTERS
TO RUN THESE TEST A MAINNET FORK IS NEEDED
*/

import { ethers } from "hardhat";
import { Contract, Signer, ContractTransactionResponse } from "ethers";
import { SnapshotRestorer, takeSnapshot } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import * as chai from "chai";
import {
    MasterTokenMock,
    VaultsRegistry,
    Vault,
    StrSimpleReStaking,
    LidoAdapter,
    UniswapV3Adapter,
    KelpAdapter,
} from "../../../types";

import { WETH } from "../../../types/ethers-contracts";

import {
    deployVaultsRegistry,
    deployVaultImplementation,
    deployMasterTokenMock,
    deployVaultStrategy,
    deployLidoAdapter,
    deployUniswapAdapter,
    deployKelpAdapter,
} from "../../../scripts/_helpers/_deployContracts";

import { getWethContract, getRsETHContract } from "../../_helpers/emulation";

import { configVault, configSwapPath } from "../../../scripts/_helpers/_configContracts";

import {
    AMOUNT_1E18,
    TEST_TIMEOUT,
    ZERO_AMOUNT,
    LIDO_stETH_ADDRESS,
    WETH_ADDRESS,
    LIDO_WstETH_ADDRESS,
    UNISWAP_ROUTER_ADDRESS,
    UNISWAP_QUOTER_ADDRESS,
    ZERO_ADDRESS,
    KELP_DEPOSIT_POOL_ADDRESS,
    KELP_rsETH_ADDRESS,
    rsETH_WETH_POOL,
} from "../../_helpers/constants";

import {
    getVariableFromEvent,
    MainnetData,
    getDelta,
    getQuoteFromUni,
} from "./../../_helpers/utils";

let baseSnapshot: SnapshotRestorer;
let deployer: Signer;
let user1: Signer;
let user2: Signer;

let deployerAddress: string;
let user1Address: string;
let user2Address: string;
let masterTokenAddress: string;
let underlyingTokenAddress: string;

let txResult: ContractTransactionResponse;

let masterTokenContract: MasterTokenMock;
let wethTokenContract: WETH;
let liquidTokenContract: any;

let vaultsRegistryContract: VaultsRegistry;
let vaultContract: Vault;
let vaultAddress: string;
let vaultImplementation: Vault;
let vaultImplementationAddress: string;

let lidoAdapterContract: LidoAdapter;
let lidoAdapterContractAddress: string;
let uniswapAdapterContract: UniswapV3Adapter;
let uniswapAdapterContractAddress: string;
let kelpAdapterContract: KelpAdapter;
let kelpAdapterContractAddress: string;

let strategyContract: StrSimpleReStaking;
let strategyContractAddress: string;

const DEFAULT_FEE_RATE = ethers.parseEther("10");
const INTIAL_MINT = ethers.parseEther("100");
const INITIAL_DEPOSIT = ethers.parseEther("20");
const UNISWAP_PATH_FEE = 500n;

// what is put in stake protocol and what is received from it
let deltaLido: MainnetData;
let deltaKelp: MainnetData;
let uniQuote: bigint;

let oneRsETHinWETH: bigint;
let expectedBalanceAferDeployment: bigint;
let expectedInitialValuation: bigint;

describe("LIDO - KELP ==> Restaking Strategy Tests -->> LIVE TESTS", function () {
    this.timeout(TEST_TIMEOUT);

    before(async () => {
        [deployer, user1, user2] = await ethers.getSigners();
        [deployerAddress, user1Address, user2Address] = await Promise.all([
            deployer.getAddress(),
            user1.getAddress(),
            user2.getAddress(),
        ]);

        // get weth token contract as underlying
        wethTokenContract = (await getWethContract(WETH_ADDRESS, deployer)) as unknown as WETH;
        underlyingTokenAddress = await wethTokenContract.getAddress();

        // get rsETH token contract
        liquidTokenContract = await getRsETHContract(KELP_rsETH_ADDRESS, deployer);

        // MINT underlying for users
        let tx = await wethTokenContract.connect(user1).deposit({ value: INTIAL_MINT });
        await tx.wait();
        tx = await wethTokenContract.connect(user2).deposit({ value: INTIAL_MINT });
        await tx.wait();

        // first we need an implementation of the users vault contract
        vaultImplementation = (await deployVaultImplementation()) as unknown as Vault;
        vaultImplementationAddress = await vaultImplementation.getAddress();

        // deploy VaultsRegistry
        vaultsRegistryContract = (await deployVaultsRegistry(
            DEFAULT_FEE_RATE,
            vaultImplementationAddress,
        )) as unknown as VaultsRegistry;

        masterTokenContract = (await deployMasterTokenMock(
            "MasterTokenMock",
            await vaultsRegistryContract.getAddress(),
            "LYS",
            "LYS",
            BigInt(18),
        )) as unknown as MasterTokenMock;
        masterTokenAddress = await masterTokenContract.getAddress();

        // deploy Vault
        txResult = await vaultsRegistryContract.deployVault(
            underlyingTokenAddress,
            masterTokenAddress, // masterTokenAddress,
            deployerAddress, //owner
            "whyETH Shares",
            "sWhyETH",
        );
        const txReceipt = await txResult.wait();

        // get address from emitted event
        vaultAddress = await getVariableFromEvent(
            vaultsRegistryContract as unknown as Contract,
            "VaultDeployed",
            txReceipt,
            0,
        );
        // get contract from address
        vaultContract = await ethers.getContractAt("Vault", vaultAddress);

        // set weth address in master token
        await masterTokenContract.setAssetAddress(underlyingTokenAddress);

        // deploy LIDO adapter for staking protocol
        lidoAdapterContract = (await deployLidoAdapter(
            "LidoAdapter",
            LIDO_stETH_ADDRESS,
            WETH_ADDRESS,
            LIDO_WstETH_ADDRESS,
        )) as unknown as LidoAdapter;
        lidoAdapterContractAddress = await lidoAdapterContract.getAddress();

        // deploy KelpAdapter
        kelpAdapterContract = (await deployKelpAdapter(
            "KelpAdapter",
            KELP_DEPOSIT_POOL_ADDRESS,
            KELP_rsETH_ADDRESS,
        )) as unknown as KelpAdapter;
        kelpAdapterContractAddress = await kelpAdapterContract.getAddress();

        // deploy uniswap adapter
        uniswapAdapterContract = (await deployUniswapAdapter(
            "UniswapV3Adapter",
            UNISWAP_ROUTER_ADDRESS,
            UNISWAP_QUOTER_ADDRESS,
            WETH_ADDRESS,
        )) as unknown as UniswapV3Adapter;
        uniswapAdapterContractAddress = await uniswapAdapterContract.getAddress();

        // config token pools to withdraw
        await uniswapAdapterContract.setPoolPerTokenForPrice(KELP_rsETH_ADDRESS, rsETH_WETH_POOL);

        // deploy VaultStrategy
        strategyContract = (await deployVaultStrategy(
            "StrSimpleReStaking",
            vaultAddress,
            KELP_rsETH_ADDRESS,
            [lidoAdapterContractAddress, kelpAdapterContractAddress],
            [uniswapAdapterContractAddress],
            "Simple Re-Staking Strategy",
        )) as unknown as StrSimpleReStaking;
        strategyContractAddress = await strategyContract.getAddress();

        // put withdraw strategy the same as standard strategy to get immediate withdraw
        await configVault(vaultAddress, strategyContractAddress, strategyContractAddress);

        // set the swap path on strategy
        await configSwapPath(
            "StrSimpleReStaking",
            strategyContractAddress,
            [WETH_ADDRESS, KELP_rsETH_ADDRESS],
            [UNISWAP_PATH_FEE],
        );

        /// ROLES ASSIGNMENTS
        // give deployer vault manager role
        let roleToAssign = await vaultContract.VAULT_MANAGER_ROLE();
        await vaultContract.grantRole(roleToAssign, deployerAddress);

        // give master token manager role on vault
        roleToAssign = await vaultContract.VAULT_MANAGER_ROLE();
        await vaultContract.grantRole(roleToAssign, masterTokenAddress);

        // give master token the role on vault
        roleToAssign = await vaultContract.MASTER_TOKEN_ROLE();
        await vaultContract.grantRole(roleToAssign, masterTokenAddress);

        // give vault vault manager role on strategy to vault and to withdraw strategy
        roleToAssign = await strategyContract.VAULT_MANAGER_ROLE();
        await strategyContract.grantRole(roleToAssign, vaultAddress);

        // give strategy manager role on adapter deposit
        roleToAssign = await lidoAdapterContract.VAULT_STRATEGY_ROLE();
        await lidoAdapterContract.grantRole(roleToAssign, strategyContractAddress);

        // give strategy manager role on adapter deposit
        roleToAssign = await kelpAdapterContract.VAULT_STRATEGY_ROLE();
        await kelpAdapterContract.grantRole(roleToAssign, strategyContractAddress);

        // give strategy manager role on adapter withdraw
        roleToAssign = await uniswapAdapterContract.VAULT_STRATEGY_ROLE();
        await uniswapAdapterContract.grantRole(roleToAssign, strategyContractAddress);

        // give deployer admin role in master token
        roleToAssign = await vaultContract.DEFAULT_ADMIN_ROLE();
        await masterTokenContract.grantRole(roleToAssign, deployerAddress);
        await masterTokenContract.grantRole(roleToAssign, user1Address);
        await masterTokenContract.grantRole(roleToAssign, user2Address);

        baseSnapshot = await takeSnapshot();

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        ////// FIND DELTAS AND PRICES
        ////// THIS IS DONE TO GET EXACT VALUES IN TESTS FROM LIVE MAINNET FORK

        // MINT weth for deployer
        tx = await wethTokenContract.connect(deployer).deposit({ value: INTIAL_MINT });
        await tx.wait();

        const AMOUNT_IN = AMOUNT_1E18 * 20n;
        // get from lido
        deltaLido = await getDelta(
            WETH_ADDRESS,
            LIDO_stETH_ADDRESS,
            deployer,
            AMOUNT_IN,
            lidoAdapterContract as unknown as Contract,
        );

        // get from kelp
        deltaKelp = await getDelta(
            LIDO_stETH_ADDRESS,
            KELP_rsETH_ADDRESS,
            deployer,
            deltaLido.outAmount,
            kelpAdapterContract as unknown as Contract,
        );

        const AMOUNT_OUT = AMOUNT_1E18 * 5n;
        // get from uniswap
        uniQuote = await getQuoteFromUni(
            "KELP",
            uniswapAdapterContract as unknown as Contract,
            AMOUNT_OUT,
            KELP_rsETH_ADDRESS,
            WETH_ADDRESS,
            UNISWAP_PATH_FEE,
        );

        // get token price
        oneRsETHinWETH = await strategyContract.getTokenPrice(KELP_rsETH_ADDRESS, 2);
        // calculate expectedBalance
        expectedBalanceAferDeployment = (deltaLido.outAmount * AMOUNT_1E18) / deltaKelp.delta;
        // calculate initial valuation
        expectedInitialValuation = (expectedBalanceAferDeployment * oneRsETHinWETH) / AMOUNT_1E18;

        // console.log("\n");
        // console.log("DELTA Lido  :>> ", deltaLido);
        // console.log("DELTA Kelp  :>> ", deltaKelp);
        // console.log("quoteReturn :>> ", uniQuote);
        // console.log("expectedBalanceAferDeployment :>> ", expectedBalanceAferDeployment);
        // console.log("expectedInitialValuation      :>> ", expectedInitialValuation);
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
            txResult = await vaultContract.connect(deployer).deployAssets();
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
            txResult = await vaultContract.updateVaultValuation(2);
        });

        after(async () => {
            await baseSnapshot.restore();
        });

        it("THEN vault valuation should update", async () => {
            const tolerance = 100n; // (0.0000000000000001)
            const vaultValuation = await vaultContract.totalAssets(); // +/- 20
            expect(vaultValuation).to.be.closeToBigInt(expectedInitialValuation, tolerance);
        });

        it("THEN strategy valuation should update", async () => {
            const tolerance = 100n; // (0.0000000000000001)
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
            await vaultContract.updateVaultValuation(2);

            // get balances
            vaultValuationBefore = await vaultContract.totalAssets(); // +/- 20 eth
            vaultTotalSupplyBefore = await vaultContract.totalSupply(); // +/- 20 shares
            userWETHbalanceBefore = await wethTokenContract.balanceOf(user1Address); // 90
            userSharesBalanceBefore = await masterTokenContract.usersShares(user1Address); // 10
            strategyLStokenBalanceBefore =
                await liquidTokenContract.balanceOf(strategyContractAddress);

            assetsAmount = ethers.parseEther("5");
            sharesAmount = await vaultContract.convertToShares(assetsAmount);

            // call withdraw
            txResult = await masterTokenContract
                .connect(user1)
                .withdraw(vaultAddress, assetsAmount, masterTokenAddress, user1Address);

            strategyStokenBalance = await liquidTokenContract.balanceOf(strategyContractAddress);
        });

        it("THEN user shares should decrease from 10 to 5 (withdraw 5)", async () => {
            const tolerance = 1n;
            const userShares = await masterTokenContract.usersShares(user1Address);

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
            const liquidTokenAmount = uniQuote; // obtained at the "before all" of the tests

            const tolerance = 100n; // (0.0000000000000001)
            expect(strategyStokenBalance).to.be.closeToBigInt(
                strategyLStokenBalanceBefore - liquidTokenAmount,
                tolerance,
            );
        });

        it("THEN vault valuation should remain the same (valuation not updated)", async () => {
            const vaultValuation = await vaultContract.totalAssets();
            expect(vaultValuation).equals(vaultValuationBefore);
        });

        describe("WHEN executing update valuation from vault (C)", function () {
            before(async () => {
                // call updateValuation
                txResult = await vaultContract.updateVaultValuation(2);
            });

            it("THEN vault valuation should decrease close to 15 WETH", async () => {
                oneRsETHinWETH = await strategyContract.getTokenPrice(KELP_rsETH_ADDRESS, 2);
                const newValuation = (strategyStokenBalance * oneRsETHinWETH) / AMOUNT_1E18;
                const vaultValuation = await vaultContract.totalAssets();

                const tolerance = 1n;
                expect(vaultValuation).to.be.closeToBigInt(newValuation, tolerance);
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
    await wethTokenContract.connect(user1).approve(vaultAddress, AMOUNT);
    await wethTokenContract.connect(user2).approve(vaultAddress, AMOUNT);

    // execute deposits
    await masterTokenContract.connect(user1).deposit(vaultAddress, AMOUNT, user1Address);
    await masterTokenContract.connect(user2).deposit(vaultAddress, AMOUNT, user2Address);

    if (deployAsstes) {
        await vaultContract.connect(deployer).deployAssets();
    }
}
