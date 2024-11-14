import { ethers, network } from "hardhat";
import { Vault } from "../types";
import { deployVaultsRegistry, deployVaultImplementation } from "./_helpers/_deployContracts";
import { updateDeploymentLog } from "./_helpers/_logger";

/// ==========================================================================================
/// ACTIONS ==================================================================================
/// ==========================================================================================

const DEPLOY_REGISTRY = true;
// const DEPLOY_REGISTRY = false;

const NETWORK = "SEPOLIA";

const DEFAULT_FEE_RATE = ethers.parseEther("0.1");

/// ==========================================================================================
/// ADDRESSSES ===============================================================================
/// ==========================================================================================

async function main(): Promise<void> {
    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    console.clear();

    const [deployer] = await ethers.getSigners();

    console.log("\n");
    console.log("Network:", network.name);
    console.log("deployerAddress :>> ", deployer.address);
    console.log("\n");
    console.log("\nDEPLOYING....");
    console.log("==================================================================");

    if (DEPLOY_REGISTRY) {
        // first we need an implementation of the users vault contract
        const vaultImplementation = (await deployVaultImplementation()) as unknown as Vault;
        const vaultImplementationAddress = await vaultImplementation.getAddress();

        // deploy VaultsRegistry
        const contract = await deployVaultsRegistry(DEFAULT_FEE_RATE, vaultImplementationAddress);

        // log deployment data
        await updateDeploymentLog(NETWORK, "VaultRegistry", await contract.getAddress());
    }
    console.log("==================================================================");
}

main()
    .then(() => console.log("\nFinished..."))
    .catch((error: Error) => {
        console.error(error);
        throw new Error();
    });
