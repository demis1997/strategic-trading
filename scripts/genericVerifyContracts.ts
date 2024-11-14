/* eslint-disable no-process-exit */
import hre from "hardhat";
import { constants } from "./_helpers/_deployAddresses";

const NETWORK = "SEPOLIA";

const ORACLE_TOKEN_NAMES = "etherfi-weth";
const ORACLE_CURRENT_TOKEN = constants[NETWORK].etherfi_eEth;
const ORACLE_CURRENT_TOKEN_NAME = "Etherfi - eEth";
const ORACLE_CURRENT_TOKEN_PRICE = 999500000000000000n;

const WETH_TOKEN = constants[NETWORK].weth;
const LIDO_TOKEN = constants[NETWORK].lidoStEth;
const ETHERFI_TOKEN = constants[NETWORK].etherfi_eEth;
const KELP_TOKEN = constants[NETWORK].kelp_rsEth;
const STADER_TOKEN = constants[NETWORK].stader_ETHx;

const name = "stader-kelp-weth";
const tokenInDep = STADER_TOKEN;
const tokenOutDep = KELP_TOKEN;
const tokenInWit = KELP_TOKEN;
const tokenOutWit = WETH_TOKEN;

const IMPLEMENTATION = "0xaf29dA4A47f6037E33e7bAB6Ad315fcb956B4Ff3";
// const IMPLEMENTATION = "0x794Ea219ecF9a27D64D813f116c5313326043F65";

async function main(): Promise<void> {
    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    console.clear();
    if (!IMPLEMENTATION) {
        throw new Error("Invalid parameters detected");
    }

    await hre
        .run("verify:verify", {
            address: IMPLEMENTATION,
            constructorArguments: [],
            // constructorArguments: [name, tokenInDep, tokenOutDep, tokenInWit, tokenOutWit],
            // constructorArguments: [
            //     ORACLE_TOKEN_NAMES,
            //     ORACLE_CURRENT_TOKEN,
            //     ORACLE_CURRENT_TOKEN_NAME,
            //     ORACLE_CURRENT_TOKEN_PRICE,
            // ],
        })
        .catch(ignoreAlreadyVerifiedError);
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function ignoreAlreadyVerifiedError(err: Error) {
    if (err.message.includes("Contract source code already verified")) {
        console.log("contract already verfied, skipping");
        return;
    } else {
        throw err;
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error: Error) => {
        console.error(error);
        process.exit(1);
    });
