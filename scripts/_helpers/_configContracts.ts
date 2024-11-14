/* eslint-disable @typescript-eslint/require-await */
import { ethers } from "hardhat";
import { ContractTransactionResponse } from "ethers";
import { ZERO_ADDRESS } from "../../test/_helpers/constants";

let txResult: ContractTransactionResponse;

const VEBOSE = true;
// const VEBOSE = false;

export async function configVault(
    vaultContractAddress: string,
    vaultStrategyAddress: string,
    withdrawStrategyAddress: string,
): Promise<void> {
    if (VEBOSE) console.log("\nSet Strategies addresses on Vault contract and LiveValuation");

    const vaultContract = await ethers.getContractAt("Vault", vaultContractAddress);

    txResult = await vaultContract.setVaultStrategyAddress(vaultStrategyAddress);
    if (VEBOSE) console.log(`Vault Strategy set.\nTxHash: ${txResult.hash}`);

    txResult = await vaultContract.setWithdrawStrategyAddress(withdrawStrategyAddress);
    if (VEBOSE) console.log(`Withdraw Strategy set.\nTxHash: ${txResult.hash}`);

    txResult = await vaultContract.setLiveValuation(true, 0);
    if (VEBOSE) console.log(`Live Valuation on deposit set.\nTxHash: ${txResult.hash}`);

    txResult = await vaultContract.setLiveValuation(true, 1);
    if (VEBOSE) console.log(`Live Valuation on withdraw set.\nTxHash: ${txResult.hash}`);
}

export async function setWithdrawAndWrapper(
    contractName: string,
    vaultStrategyAddress: string,
    withdrawStrategyAddress: string,
    wrapperAddress: string | null,
): Promise<void> {
    if (VEBOSE) console.log("\nSet Strategy and liquidToken addresses on Vault Strategy Contract");

    const vaultStrategyContract = await ethers.getContractAt(contractName, vaultStrategyAddress);

    if (withdrawStrategyAddress != ZERO_ADDRESS) {
        txResult = await vaultStrategyContract.setWhitdrawStrategyAddress(withdrawStrategyAddress);
        if (VEBOSE) console.log(`Withdraw Strategy set.\nTxHash: ${txResult.hash}`);
    }

    if (wrapperAddress != ZERO_ADDRESS) {
        txResult = await vaultStrategyContract.setWrappedLiquidTokenAddress(wrapperAddress);
        if (VEBOSE) console.log(`Wrapper set.\nTxHash: ${txResult.hash}`);
    }
}

export async function configSwapPath(
    contractName: string,
    strDeployContractAddress: string,
    tokens: string[],
    fees: bigint[],
): Promise<void> {
    if (VEBOSE) console.log("\nSet PATH Swap");

    const strategyContract = await ethers.getContractAt(contractName, strDeployContractAddress);

    txResult = await strategyContract.buildPath(tokens, fees);
    if (VEBOSE) console.log(`Path built.\nTxHash: ${txResult.hash}`);
}

export async function configureMasterToken(
    contractName: string,
    aggregatorTokenAddress: string,
    maxVaultsPerHolder: bigint,
    transferStrategy: string,
    deployerAddress: string,
): Promise<void> {
    const aggregatorTokenContract = await ethers.getContractAt(
        contractName,
        aggregatorTokenAddress,
    );

    let txResult = await aggregatorTokenContract.setMaxVaultsPerHolder(maxVaultsPerHolder);
    await txResult.wait();
    console.log(`Set max vaults per holder.\nTxHash: ${txResult.hash}`);

    txResult = await aggregatorTokenContract.setTransferStrategy(transferStrategy);
    await txResult.wait();
    console.log(`Set transfer strategy.\nTxHash: ${txResult.hash}`);

    // const roleToAssign = await aggregatorTokenContract.DEFAULT_ADMIN_ROLE();
    // txResult = await aggregatorTokenContract.grantRole(roleToAssign, deployerAddress);
    // await txResult.wait();
    // console.log(`Granted admin role to deployer.\nTxHash: ${txResult.hash}`);
}
