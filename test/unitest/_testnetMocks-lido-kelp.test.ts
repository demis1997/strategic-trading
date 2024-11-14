/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ethers } from "hardhat";
import { Contract, Signer, ContractTransactionResponse } from "ethers";
import { SnapshotRestorer, takeSnapshot } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import * as chai from "chai";
import {
    VaultsRegistry,
    Vault,
    StrSimpleReStaking,
    ERC20Mock,
    UniformTransferStrategy,
    AggregatorToken,
    TestnetAdapterMock,
    OracleMock,
} from "../../types";

import {
    deployVaultsRegistry,
    deployVaultImplementation,
    deployVaultStrategy,
    deployERC20,
    deployAggregatorToken,
    deployUniformTransferStrategy,
    deployOracleMock,
} from "../../scripts/_helpers/_deployContracts";

import { configVault } from "../../scripts/_helpers/_configContracts";

import { AMOUNT_1E18, TEST_TIMEOUT, ZERO_AMOUNT } from "../_helpers/constants";

import { getVariableFromEvent } from "./../_helpers/utils";

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

let masterTokenContract: AggregatorToken;
let transferStrategyContract: UniformTransferStrategy;
let transferStrategyContractAddress: string;

let wethTokenContract: ERC20Mock;
let liquidTokenContract: ERC20Mock;
let firstLiquidTokenContract: ERC20Mock;

let vaultsRegistryContract: VaultsRegistry;
let vaultContract: Vault;
let vaultAddress: string;
let vaultImplementation: Vault;
let vaultImplementationAddress: string;

let lidoAdapterContract: TestnetAdapterMock;
let lidoAdapterContractAddress: string;
let kelpAdapterContract: TestnetAdapterMock;
let kelpAdapterContractAddress: string;

let strategyContract: StrSimpleReStaking;
let strategyContractAddress: string;

let oracleMockContract: OracleMock;

const INITIAL_BALANCE_AFTER_DEPOSIT = ethers.parseEther("20");
const INTIAL_MINT = ethers.parseEther("100");

let oneRsETHinWETH: bigint;
let expectedBalanceAferDeployment: bigint;
let expectedInitialValuation: bigint;
const percentageDeposit: bigint[] = [];
const percentageWithdraw: bigint[] = [];

const TOKENS: any[] = [
    { protocol: "Wrapped - ETH", token: "WETH", deploy: true },
    { protocol: "lido - stETH", token: "stETH", deploy: true },
    { protocol: "etherfi - eETH", token: "eETH", deploy: true },
    { protocol: "kelp - rsETH", token: "rsETH", deploy: true },
    { protocol: "stader - ETHx", token: "ETHx", deploy: true },
];

const LIQUID_TKN_IN_WETH = 1017017400000000000n; // rseth

describe("LIDO - KELP ==> Restaking Strategy Tests -->> MOCK TESTS", function () {
    this.timeout(TEST_TIMEOUT);

    before(async () => {
        [deployer, user1, user2] = await ethers.getSigners();
        [deployerAddress, user1Address, user2Address] = await Promise.all([
            deployer.getAddress(),
            user1.getAddress(),
            user2.getAddress(),
        ]);

        // get weth token contract as underlying
        wethTokenContract = (await deployERC20(
            TOKENS[0].protocol,
            TOKENS[0].token,
            18,
        )) as unknown as ERC20Mock;
        underlyingTokenAddress = await wethTokenContract.getAddress();

        // MINT underlying for users
        let tx;
        tx = await wethTokenContract.mint(user1Address, INTIAL_MINT);
        await tx.wait();
        tx = await wethTokenContract.mint(user2Address, INTIAL_MINT);
        await tx.wait();

        // first we need an implementation of the users vault contract
        vaultImplementation = (await deployVaultImplementation()) as unknown as Vault;
        vaultImplementationAddress = await vaultImplementation.getAddress();

        // deploy VaultsRegistry
        vaultsRegistryContract = (await deployVaultsRegistry(
            ethers.parseEther("10"),
            vaultImplementationAddress,
        )) as unknown as VaultsRegistry;
        const vaultsRegistryContractAddress = await vaultsRegistryContract.getAddress();

        // deploy master token
        masterTokenContract = (await deployAggregatorToken(
            "AggregatorToken",
            underlyingTokenAddress,
            vaultsRegistryContractAddress,
            deployerAddress,
            "LYS",
            "LYS",
        )) as unknown as AggregatorToken;
        masterTokenAddress = await masterTokenContract.getAddress();

        transferStrategyContract = (await deployUniformTransferStrategy(
            masterTokenAddress,
            deployerAddress,
        )) as unknown as UniformTransferStrategy;
        transferStrategyContractAddress = await transferStrategyContract.getAddress();

        await masterTokenContract.setMaxVaultsPerHolder(5);
        await masterTokenContract.setTransferStrategy(transferStrategyContractAddress);

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

        // deploy LIDO token contract
        firstLiquidTokenContract = (await deployERC20(
            TOKENS[1].protocol,
            TOKENS[1].token,
            18,
        )) as unknown as ERC20Mock;
        const firstLiquidTokenContractAddress = await firstLiquidTokenContract.getAddress();

        // deploy KELP token contract
        liquidTokenContract = (await deployERC20(
            TOKENS[3].protocol,
            TOKENS[3].token,
            18,
        )) as unknown as ERC20Mock;
        const liquidTokenContractAddress = await liquidTokenContract.getAddress();

        // deploy weth-lido adapter for staking protocol
        const MockAdapterFactory = await ethers.getContractFactory("TestnetAdapterMock");
        lidoAdapterContract = (await MockAdapterFactory.deploy(
            "weth-lido-weth",
            underlyingTokenAddress,
            firstLiquidTokenContractAddress,
            firstLiquidTokenContractAddress,
            underlyingTokenAddress,
        )) as unknown as TestnetAdapterMock;
        lidoAdapterContractAddress = await lidoAdapterContract.getAddress();

        // deploy lido-kelp
        kelpAdapterContract = (await MockAdapterFactory.deploy(
            "lido-kelp-weth",
            firstLiquidTokenContractAddress,
            liquidTokenContractAddress,
            liquidTokenContractAddress,
            underlyingTokenAddress,
        )) as unknown as TestnetAdapterMock;
        kelpAdapterContractAddress = await kelpAdapterContract.getAddress();

        // mint weth to final protocol
        tx = await wethTokenContract.mint(kelpAdapterContractAddress, INTIAL_MINT * 100n);
        await tx.wait();
        // mint firstLT to first adapter
        tx = await firstLiquidTokenContract.mint(lidoAdapterContractAddress, INTIAL_MINT * 100n);
        await tx.wait();

        // mint liquidToken to last adapter
        tx = await liquidTokenContract.mint(kelpAdapterContractAddress, INTIAL_MINT * 100n);
        await tx.wait();

        // deploy VaultStrategy
        strategyContract = (await deployVaultStrategy(
            "StrSimpleReStaking",
            vaultAddress,
            liquidTokenContractAddress,
            [lidoAdapterContractAddress, kelpAdapterContractAddress],
            [kelpAdapterContractAddress],
            "Simple Re-Staking Strategy",
        )) as unknown as StrSimpleReStaking;
        strategyContractAddress = await strategyContract.getAddress();

        // put withdraw strategy the same as standard strategy to get immediate withdraw
        await configVault(vaultAddress, strategyContractAddress, strategyContractAddress);

        // deploy oracle of liquidToken to weth
        oracleMockContract = (await deployOracleMock(
            "OracleMock",
            "kelp-weth",
            liquidTokenContractAddress,
            "kelp token",
            LIQUID_TKN_IN_WETH,
        )) as unknown as OracleMock;
        const oracleMockContractAddress = await oracleMockContract.getAddress();
        // set price feed in strategy
        await strategyContract.setPriceFeedPerToken(
            liquidTokenContractAddress,
            oracleMockContractAddress,
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
        // await strategyContract.grantRole(roleToAssign, withdrawStrategyContractAddress);

        // give strategy manager role on adapter deposit
        roleToAssign = await lidoAdapterContract.VAULT_STRATEGY_ROLE();
        await lidoAdapterContract.grantRole(roleToAssign, strategyContractAddress);

        // give strategy manager role on adapter deposit
        roleToAssign = await kelpAdapterContract.VAULT_STRATEGY_ROLE();
        await kelpAdapterContract.grantRole(roleToAssign, strategyContractAddress);

        // give deployer admin role in master token
        roleToAssign = await masterTokenContract.DEFAULT_ADMIN_ROLE();
        await masterTokenContract.grantRole(roleToAssign, deployerAddress);
        await masterTokenContract.grantRole(roleToAssign, user1Address);
        await masterTokenContract.grantRole(roleToAssign, user2Address);

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // // set percenteges
        await lidoAdapterContract.setPercentageDeposit(0);
        await lidoAdapterContract.setPercentageDeposit(0);
        await kelpAdapterContract.setPercentageDeposit(0);
        await kelpAdapterContract.setPercentageDeposit(4);

        // // get percentages to calculate right
        percentageDeposit.push(await lidoAdapterContract.percentageModifierDeposit());
        percentageWithdraw.push(await lidoAdapterContract.percentageModifierWithdraw());
        percentageDeposit.push(await kelpAdapterContract.percentageModifierDeposit());
        percentageWithdraw.push(await kelpAdapterContract.percentageModifierWithdraw());

        // calculate expectedBalance
        // 20 - 1%
        // 20 - 100 || 20/100 = 1
        const balanceAferDeployment1 =
            INITIAL_BALANCE_AFTER_DEPOSIT +
            (INITIAL_BALANCE_AFTER_DEPOSIT / 100n) * percentageDeposit[0];

        expectedBalanceAferDeployment =
            balanceAferDeployment1 + (balanceAferDeployment1 / 100n) * percentageDeposit[1];

        // get token price
        oneRsETHinWETH = await strategyContract.getTokenPrice(liquidTokenContractAddress, 2);
        // calculate initial valuation
        expectedInitialValuation = (expectedBalanceAferDeployment * oneRsETHinWETH) / AMOUNT_1E18;

        // console.log("\n");
        // console.log("percentageDeposit  :>> ", percentageDeposit);
        // console.log("percentageWithdraw :>> ", percentageWithdraw);
        // console.log("balanceAferDeployment1        :>> ", balanceAferDeployment1);
        // console.log("expectedBalanceAferDeployment :>> ", expectedBalanceAferDeployment);
        // console.log("oneRsETHinWETH                :>> ", oneRsETHinWETH);
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
            });
            it("THEN event Deposit should be emitted", async () => {
                const txReceipt = await txResult.wait();
                mintedShares = BigInt(
                    await getVariableFromEvent(
                        masterTokenContract as unknown as Contract,
                        "Deposit",
                        txReceipt,
                        4,
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
            await vaultContract.updateVaultValuation(2);

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
            // oneRsETHinWETH :>>  1,017017400000000000 weth
            //      = 5 1eth ?
            // 1 rs = 1.07 weth
            // 1 rs / 1.07 = 1 weth
            // (1 rs / 1.07) * 5 = 5 weth

            const liquidTokenAmount = (AMOUNT_1E18 * assetsAmount) / oneRsETHinWETH;

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
                txResult = await vaultContract.updateVaultValuation(2);
            });

            it("THEN vault valuation should decrease close to 15 WETH", async () => {
                // oneRsETHinWETH = await strategyContract.getTokenPrice(liqui, 2);
                // oneRsETHinWETH = await strategyContract.getTokenPrice(liquidTokenContractAddress, 2);
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
        await vaultContract.connect(deployer).deployAssets();
    }
}

// underlyingTokenAddress          :>>  0x33426420385B43EB2EcE8AA1C20140D9a19fa882
// firstLiquidTokenContractAddress :>>  0x27F85F9dBC665cf316bD2F98E9A3952a92F872F3
// liquidTokenContractAddress      :>>  0x494624C0639620FCD719375a3F4CfCd4C2FEb800
