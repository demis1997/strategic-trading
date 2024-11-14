import { ethers, network } from "hardhat";
import { deployERC20 } from "./_helpers/_deployContracts";
import { updateDeploymentLog } from "./_helpers/_logger";
import { ERC20Mock } from "../types";

/// ==========================================================================================
/// ACTIONS ==================================================================================
/// ==========================================================================================

///
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TOKENS: any[] = [
    { protocol: "Wrapped - ETH", token: "WETH", deploy: true },
    { protocol: "lido - stETH", token: "stETH", deploy: true },
    { protocol: "lido - wstETH", token: "wstETH", deploy: false },
    { protocol: "etherfi - eETH", token: "eETH", deploy: true },
    { protocol: "etherfi - weETH", token: "weETH", deploy: false },
    { protocol: "kelp - rsETH", token: "rsETH", deploy: true },
    { protocol: "renzo - ezETH", token: "ezETH", deploy: true },
    { protocol: "stader - ETHx", token: "ETHx", deploy: true },
];

const DEPLOY_TOKENS = true;
// const DEPLOY_REGISTRY = false;

const NETWORK = "SEPOLIA";

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

    let tokenContract: ERC20Mock;
    if (DEPLOY_TOKENS) {
        for (let i = 0; i < TOKENS.length; i++) {
            if (TOKENS[i].deploy) {
                tokenContract = (await deployERC20(
                    TOKENS[i].protocol,
                    TOKENS[i].token,
                    18,
                )) as unknown as ERC20Mock;

                // log deployment data
                await updateDeploymentLog(
                    NETWORK,
                    TOKENS[i].token,
                    await tokenContract.getAddress(),
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

/*
    lido, "stETH",
    wlido, "wstETH",
    wetherfi, "weETH",

    etherfi, "eETH", 

    kelp, "rsETH",

    renzo, "ezETH",

    stader, "ETHx"
*/
