import { ethers, network } from "hardhat";
import { AggregatorToken, UniformTransferStrategy } from "../types";
import { deployAggregatorToken, deployUniformTransferStrategy } from "./_helpers/_deployContracts";
import { configureMasterToken } from "./_helpers/_configContracts";
import { constants, deployedContracts } from "./_helpers/_deployAddresses";
import { updateDeploymentLog } from "./_helpers/_logger";

/// ==========================================================================================
/// ACTIONS ==================================================================================
/// ==========================================================================================

// const DEPLOY_MASTER_TOKEN = true;
const DEPLOY_MASTER_TOKEN = false;

// const DEPLOY_TRANSFER_STRATEGY = true;
const DEPLOY_TRANSFER_STRATEGY = false;

const CONFIG = true;
// const CONFIG = false;

const MAX_VAULTS_PER_HOLDER = 5;
const NETWORK = "SEPOLIA";

/// ==========================================================================================
/// ADDRESSES ==================================================================================
/// ==========================================================================================
const WETH = constants[NETWORK].weth;
const VAULTS_REGISTRY = deployedContracts[NETWORK].vaultRegistry;

let MASTER_TOKEN = deployedContracts[NETWORK].masterToken;
let TRANSFER_STRATEGY = deployedContracts[NETWORK].uniformTransferStrategy;

async function main(): Promise<void> {
    const [deployer] = await ethers.getSigners();
    const deployerAddress = await deployer.getAddress();

    console.clear();
    console.log("\nNetwork:", network.name);
    console.log("Deployer Address:", deployer.address);
    console.log("\nDEPLOYING....");
    console.log("==================================================================");

    let aggregatorTokenContract: AggregatorToken;
    if (DEPLOY_MASTER_TOKEN) {
        aggregatorTokenContract = (await deployAggregatorToken(
            "AggregatorToken",
            WETH,
            VAULTS_REGISTRY,
            deployerAddress,
            "LYS",
            "LYS",
        )) as unknown as AggregatorToken;
        MASTER_TOKEN = await aggregatorTokenContract.getAddress();
        // log deployment data
        await updateDeploymentLog(NETWORK, "AggregatorToken", MASTER_TOKEN);
    } else {
        aggregatorTokenContract = await ethers.getContractAt("AggregatorToken", MASTER_TOKEN);
    }

    let transferStrategyContract: UniformTransferStrategy;
    if (DEPLOY_TRANSFER_STRATEGY) {
        transferStrategyContract = (await deployUniformTransferStrategy(
            MASTER_TOKEN,
            deployerAddress,
        )) as unknown as UniformTransferStrategy;
        TRANSFER_STRATEGY = await transferStrategyContract.getAddress();
        // log deployment data
        await updateDeploymentLog(NETWORK, "UniformTransferStrategy", TRANSFER_STRATEGY);
    } else {
        transferStrategyContract = await ethers.getContractAt(
            "UniformTransferStrategy",
            TRANSFER_STRATEGY,
        );
    }

    if (CONFIG) {
        await configureMasterToken(
            "AggregatorToken",
            MASTER_TOKEN,
            BigInt(MAX_VAULTS_PER_HOLDER),
            TRANSFER_STRATEGY,
            deployerAddress,
        );
    }

    console.log("==================================================================");
}

main()
    .then(() => console.log("\nFinished..."))
    .catch((error: Error) => {
        console.error(error);
        throw new Error();
    });
