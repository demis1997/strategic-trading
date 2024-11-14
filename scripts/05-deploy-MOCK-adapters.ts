import { ethers, network } from "hardhat";
import { TestnetAdapterMock } from "../types";
import { constants } from "./_helpers/_deployAddresses";
import { updateDeploymentLog } from "./_helpers/_logger";

/// ==========================================================================================
/// ACTIONS ==================================================================================
/// ==========================================================================================

const DEPLOY_ADAPTERS = true;
// const DEPLOY_ADAPTERS = false;

/// ==========================================================================================
/// ADDRESSSES ===============================================================================
/// ==========================================================================================

const NETWORK = "SEPOLIA";

// strategies
// - lido-etherfi
// - lido-kelp
// - stader-kelp

const WETH_TOKEN = constants[NETWORK].weth;
const LIDO_TOKEN = constants[NETWORK].lidoStEth;
const ETHERFI_TOKEN = constants[NETWORK].etherfi_eEth;
const KELP_TOKEN = constants[NETWORK].kelp_rsEth;
const STADER_TOKEN = constants[NETWORK].stader_ETHx;

const ADAPTERS = [
    {
        name: "weth-lido-weth",
        tokenInDep: WETH_TOKEN,
        tokenOutDep: LIDO_TOKEN,
        tokenInWit: LIDO_TOKEN,
        tokenOutWit: WETH_TOKEN,
    },
    {
        name: "lido-etherfi-weth",
        tokenInDep: LIDO_TOKEN,
        tokenOutDep: ETHERFI_TOKEN,
        tokenInWit: ETHERFI_TOKEN, // does not happen
        tokenOutWit: WETH_TOKEN, // does not happen
    },
    {
        name: "lido-kelp-weth",
        tokenInDep: LIDO_TOKEN,
        tokenOutDep: KELP_TOKEN,
        tokenInWit: KELP_TOKEN,
        tokenOutWit: WETH_TOKEN,
    },
    {
        name: "weth-stader-weth",
        tokenInDep: WETH_TOKEN,
        tokenOutDep: STADER_TOKEN,
        tokenInWit: STADER_TOKEN, // does not happen
        tokenOutWit: WETH_TOKEN, // does not happen
    },
    {
        name: "stader-kelp-weth",
        tokenInDep: STADER_TOKEN,
        tokenOutDep: KELP_TOKEN,
        tokenInWit: KELP_TOKEN,
        tokenOutWit: WETH_TOKEN,
    },
];

async function main(): Promise<void> {
    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    console.clear();

    const [deployer] = await ethers.getSigners();

    if (DEPLOY_ADAPTERS) {
        console.log("\n");
        console.log("Network:", network.name);
        console.log("deployerAddress :>> ", deployer.address);
        console.log("\n");
        console.log("\nDEPLOYING....");
        console.log("==================================================================");

        const MockAdapterFactory = await ethers.getContractFactory("TestnetAdapterMock");
        let mockAdapterContract: TestnetAdapterMock;
        for (let i = 0; i < ADAPTERS.length; i++) {
            mockAdapterContract = (await MockAdapterFactory.deploy(
                ADAPTERS[i].name,
                ADAPTERS[i].tokenInDep,
                ADAPTERS[i].tokenOutDep,
                ADAPTERS[i].tokenInWit,
                ADAPTERS[i].tokenOutWit,
            )) as unknown as TestnetAdapterMock;

            console.log(
                `${ADAPTERS[i].name} contract deployed at: ${await mockAdapterContract.getAddress()}`,
            );

            // log deployment data
            await updateDeploymentLog(
                NETWORK,
                ADAPTERS[i].name,
                await mockAdapterContract.getAddress(),
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
