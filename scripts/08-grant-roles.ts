/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers, network } from "hardhat";
import { Vault, TestnetAdapterMock, StrSimpleReStaking } from "../types";
import { deployedContracts, vaults, strategies, adapters } from "./_helpers/_deployAddresses";
import { ContractTransactionResponse } from "ethers";

/// ==========================================================================================
/// ACTIONS ==================================================================================
/// ==========================================================================================

const VAULTS_ASSIGN = true;
// const VAULTS_ASSIGN = false;

const STRATEGY_ASSIGN = true;
// const STRATEGY_ASSIGN = false;

// const ADAPTER_ASSIGN = true;
const ADAPTER_ASSIGN = false;

/// ==========================================================================================
/// ASSIGNMENTS ==============================================================================
/// ==========================================================================================

const NETWORK = "SEPOLIA";

const MASTER_TOKEN = deployedContracts[NETWORK].masterToken;

const STR_CONTRACT_NAME = "StrSimpleReStaking";

const ADAPTER_NAME = "TestnetAdapterMock";

/// ==========================================================================================
/// ASSIGNMENTS ==============================================================================
/// ==========================================================================================

async function main(): Promise<void> {
    let txResult: ContractTransactionResponse;
    let roleToAssign;

    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    console.clear();

    const [deployer] = await ethers.getSigners();
    const [deployerAddress] = await Promise.all([deployer.getAddress()]);

    console.log("\n");
    console.log("Network:", network.name);
    console.log("deployerAddress :>> ", deployer.address);
    console.log("\n");
    console.log("\nCONFIGURING....");
    console.log("==================================================================");

    // VAULT MANAGER ROLE AND MASTER TOKEN ROLE ON VAULT TO MASTER TOKEN
    // VAULT MANAGER ROLE TO DEPLOYER
    if (VAULTS_ASSIGN) {
        let vaultContract: Vault;
        let vaultAddress: string;

        for (const key in vaults[NETWORK] as any) {
            vaultAddress = (vaults[NETWORK] as any)[key];
            // get the contrat
            vaultContract = await ethers.getContractAt("Vault", vaultAddress);
            roleToAssign = await vaultContract.VAULT_MANAGER_ROLE();

            txResult = await vaultContract.grantRole(roleToAssign, MASTER_TOKEN);
            console.log(
                `\nVAULT_MANAGER_ROLE granted to Master Token on Vault ${vaultAddress}.\nTxHash: ${txResult.hash}`,
            );

            txResult = await vaultContract.grantRole(roleToAssign, deployerAddress);
            console.log(
                `\nVAULT_MANAGER_ROLE granted to Deployer on Vault ${vaultAddress}.\nTxHash: ${txResult.hash}`,
            );

            // give master token the role on vault
            roleToAssign = await vaultContract.MASTER_TOKEN_ROLE();
            txResult = await vaultContract.grantRole(roleToAssign, MASTER_TOKEN);
            console.log(
                `\nMASTER_TOKEN_ROLE granted to Master Token on Vault ${vaultAddress}.\nTxHash: ${txResult.hash}`,
            );
        }
    }

    // VAULT MANAGER ROLE ON STRATEGY TO VAULTS
    // ASSIGNS FROM ALL STRATEGIES TO ALL VAULTS
    if (STRATEGY_ASSIGN) {
        let strategyContract: StrSimpleReStaking;
        let strategyAddress: string;
        let vaultAddress: string;

        for (const key1 in strategies[NETWORK] as any) {
            strategyAddress = (strategies[NETWORK] as any)[key1];

            // get the contract
            strategyContract = await ethers.getContractAt(STR_CONTRACT_NAME, strategyAddress);
            roleToAssign = await strategyContract.VAULT_MANAGER_ROLE();

            for (const key2 in vaults[NETWORK] as any) {
                vaultAddress = (vaults[NETWORK] as any)[key2];

                txResult = await strategyContract.grantRole(roleToAssign, vaultAddress);
                console.log(
                    `\nVAULT_MANAGER_ROLE granted to VAULT:\n${vaultAddress} on Strategy ${strategyAddress}.\nTxHash: ${txResult.hash}`,
                );
            }
        }
    }

    // VAULT STRATEGY ROLE ON ADAPTER TO STRATEGY
    // ASSIGNS FROM ALL ADAPTERS TO ALL STRATEGIES
    if (ADAPTER_ASSIGN) {
        let adapterContract: TestnetAdapterMock;
        let adapterAddress: string;
        let strategyAddress: string;

        for (const key1 in adapters[NETWORK] as any) {
            adapterAddress = (adapters[NETWORK] as any)[key1];

            adapterContract = await ethers.getContractAt(ADAPTER_NAME, adapterAddress);
            roleToAssign = await adapterContract.VAULT_STRATEGY_ROLE();

            for (const key2 in strategies[NETWORK] as any) {
                strategyAddress = (strategies[NETWORK] as any)[key2];

                txResult = await adapterContract.grantRole(roleToAssign, strategyAddress);
                console.log(
                    `\nVAULT_STRATEGY_ROLE granted to Strategy:\n${strategyAddress} on Adapter ${adapterAddress}.\nTxHash: ${txResult.hash}`,
                );
            }
        }
    }

    console.log("==================================================================");
}

main()
    .then(() => console.log("\nFinished..."))
    .catch((error: Error) => {
        console.error(error);
        throw new Error();
    });
