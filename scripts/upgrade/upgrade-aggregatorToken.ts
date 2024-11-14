import {ethers , upgrades} from "hardhat";
import { deployedContracts } from "../_helpers/_deployAddresses";

const NETWORK = "SEPOLIA";
let MASTER_TOKEN_ADDRESS = deployedContracts[NETWORK].masterToken;

async function main() {
    const AggregatorTokenV2Factory = await ethers.getContractFactory("AggregatorToken");
    const aggregatorTokenV2Factory = (await upgrades.upgradeProxy(
        MASTER_TOKEN_ADDRESS,
        AggregatorTokenV2Factory,
    ));
    await aggregatorTokenV2Factory.waitForDeployment();
}

main()
    .then(() => console.log("\nFinished..."))
    .catch((error: Error) => {
        console.error(error);
        throw new Error();
    });