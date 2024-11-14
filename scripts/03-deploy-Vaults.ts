import { ethers, network } from "hardhat";
import { Contract, ContractTransactionResponse } from "ethers";
import { VaultsRegistry } from "../types";
import { getVariableFromEvent } from "./../test/_helpers/utils";
import { constants, deployedContracts, vaults } from "./_helpers/_deployAddresses";
import { updateDeploymentLog } from "./_helpers/_logger";

/// ==========================================================================================
/// ACTIONS ==================================================================================
/// ==========================================================================================

const DEPLOY_VAULT = true;
// const DEPLOY_VAULT = false;

const NETWORK = "SEPOLIA";

/// ==========================================================================================
/// ADDRESSSES ===============================================================================
/// ==========================================================================================

const WETH = constants[NETWORK].weth;
const MASTER_TOKEN = deployedContracts[NETWORK].masterToken;
const VAULTS_REGISTRY = deployedContracts[NETWORK].vaultRegistry;

let VAULT = vaults[NETWORK].vault1;

async function main(): Promise<void> {
    let txResult: ContractTransactionResponse;

    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    console.clear();

    const [deployer] = await ethers.getSigners();
    const [deployerAddress] = await Promise.all([deployer.getAddress()]);

    console.log("\n");
    console.log("Network:", network.name);
    console.log("deployerAddress :>> ", deployer.address);
    console.log("\n");
    console.log("\nDEPLOYING....");
    console.log("==================================================================");

    if (DEPLOY_VAULT) {
        // get registry
        const vaultsRegistryContract: VaultsRegistry = await ethers.getContractAt(
            "VaultsRegistry",
            VAULTS_REGISTRY,
        );

        // deploy Vault
        txResult = await vaultsRegistryContract.deployVault(
            WETH,
            MASTER_TOKEN, // masterTokenAddress,
            deployerAddress, //owner
            "whyETH Shares",
            "sWhyETH",
        );
        const txReceipt = await txResult.wait();

        // get address from emitted event
        VAULT = await getVariableFromEvent(
            vaultsRegistryContract as unknown as Contract,
            "VaultDeployed",
            txReceipt,
            0,
        );
        // get contract from address
        await ethers.getContractAt("Vault", VAULT);
        console.log(`Vault contract deployed at: ${VAULT}`);
        // update log
        await updateDeploymentLog(NETWORK, "VAULT", VAULT);
    }

    console.log("==================================================================");
}

main()
    .then(() => console.log("\nFinished..."))
    .catch((error: Error) => {
        console.error(error);
        throw new Error();
    });
