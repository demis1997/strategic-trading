/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers, network } from "hardhat";
import { Vault } from "../types";
import { deployedContracts, strategies, vaults, adapters } from "./_helpers/_deployAddresses";
import { ContractTransactionResponse } from "ethers";

/// ==========================================================================================
/// ASSIGNMENTS ==============================================================================
/// ==========================================================================================

const NETWORK = "SEPOLIA";

const USER_ADDRESS = "0x4736725fdD5F58C4aca74426042442e71CB97ef1";

// const GRANT_ON_MASTER_TOKEN = true;
const GRANT_ON_MASTER_TOKEN = false;

const GRANT_ON_VAULT = true;
// const GRANT_ON_VAULT = false;

// const GRANT_ON_STRATEGIES = true;
const GRANT_ON_STRATEGIES = false;
const STR_CONTRACT_NAME = "StrSimpleReStaking";

// const GRANT_ON_MOCK_ADAPTERS = true;
const GRANT_ON_MOCK_ADAPTERS = false;
const MOCK_ADAPTER_CONTRACT_NAME = "TestnetAdapterMock";

/// ==========================================================================================
/// ASSIGNMENTS ==============================================================================
/// ==========================================================================================

async function main(): Promise<void> {
    let txResult: ContractTransactionResponse;
    let roleToAssign;

    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    console.clear();

    const [deployer] = await ethers.getSigners();

    console.log("\n");
    console.log("Network:", network.name);
    console.log("deployerAddress :>> ", deployer.address);
    console.log("\n");
    console.log("\nCONFIGURING....");
    console.log("==================================================================");

    if (GRANT_ON_MASTER_TOKEN) {
        // VAULT MANAGER ROLE TO USER
        const contractAddress = deployedContracts[NETWORK].masterToken;

        // get the contrat
        const contract = await ethers.getContractAt("AggregatorToken", contractAddress);

        roleToAssign = await contract.DEFAULT_ADMIN_ROLE();
        txResult = await contract.grantRole(roleToAssign, USER_ADDRESS);
        console.log(
            `\nDEFAULT_ADMIN_ROLE granted to ${USER_ADDRESS} on Master Token ${contractAddress}.\nTxHash: ${txResult.hash}`,
        );
    }

    if (GRANT_ON_VAULT) {
        // VAULT MANAGER ROLE TO USER
        let vaultContract: Vault;
        let vaultAddress: string;
        for (const key in vaults[NETWORK] as any) {
            vaultAddress = (vaults[NETWORK] as any)[key];
            // get the contrat
            vaultContract = await ethers.getContractAt("Vault", vaultAddress);

            roleToAssign = await vaultContract.VAULT_MANAGER_ROLE();
            txResult = await vaultContract.grantRole(roleToAssign, USER_ADDRESS);
            console.log(
                `\nVAULT_MANAGER_ROLE granted to ${USER_ADDRESS} on Vault ${vaultAddress}.\nTxHash: ${txResult.hash}`,
            );

            roleToAssign = await vaultContract.DEFAULT_ADMIN_ROLE();
            txResult = await vaultContract.grantRole(roleToAssign, USER_ADDRESS);
            console.log(
                `\nDEFAULT_ADMIN_ROLE granted to ${USER_ADDRESS} on Vault ${vaultAddress}.\nTxHash: ${txResult.hash}`,
            );

            // give master token the role on vault to user
            roleToAssign = await vaultContract.MASTER_TOKEN_ROLE();
            txResult = await vaultContract.grantRole(roleToAssign, USER_ADDRESS);
            console.log(
                `\nMASTER_TOKEN_ROLE granted to ${USER_ADDRESS} on Vault ${vaultAddress}.\nTxHash: ${txResult.hash}`,
            );
        }
    }

    if (GRANT_ON_STRATEGIES) {
        let contract;
        let contractAddress: string;
        for (const key in strategies[NETWORK] as any) {
            contractAddress = (strategies[NETWORK] as any)[key];
            // get the contrat
            contract = await ethers.getContractAt(STR_CONTRACT_NAME, contractAddress);

            roleToAssign = await contract.DEFAULT_ADMIN_ROLE();
            txResult = await contract.grantRole(roleToAssign, USER_ADDRESS);
            console.log(
                `\nDEFAULT_ADMIN_ROLE granted to ${USER_ADDRESS} on Strategy ${contractAddress}.\nTxHash: ${txResult.hash}`,
            );
        }
    }

    if (GRANT_ON_MOCK_ADAPTERS) {
        let contract;
        let contractAddress: string;
        for (const key in adapters[NETWORK] as any) {
            contractAddress = (adapters[NETWORK] as any)[key];
            // get the contrat
            contract = await ethers.getContractAt(MOCK_ADAPTER_CONTRACT_NAME, contractAddress);

            roleToAssign = await contract.DEFAULT_ADMIN_ROLE();
            txResult = await contract.grantRole(roleToAssign, USER_ADDRESS);
            console.log(
                `\nDEFAULT_ADMIN_ROLE granted to ${USER_ADDRESS} on ${MOCK_ADAPTER_CONTRACT_NAME} ${contractAddress}.\nTxHash: ${txResult.hash}`,
            );
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
