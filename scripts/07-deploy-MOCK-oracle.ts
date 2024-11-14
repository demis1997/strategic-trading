import { ethers, network } from "hardhat";
import { OracleMock } from "../types";
import { deployOracleMock } from "./_helpers/_deployContracts";
import { constants, oracles, strategies } from "./_helpers/_deployAddresses";
import { updateDeploymentLog } from "./_helpers/_logger";

/// ==========================================================================================
/// ACTIONS ==================================================================================
/// ==========================================================================================

// const DEPLOY_ORACLE_MOCK = true;
const DEPLOY_ORACLE_MOCK = false;

const CONFIG = true;
// const CONFIG = false;

/// ==========================================================================================
/// ADDRESSSES ===============================================================================
/// ==========================================================================================

const NETWORK = "SEPOLIA";

/// kelp
const ORACLE_TOKEN_NAMES = "kelp-weth";
const ORACLE_CURRENT_TOKEN = constants[NETWORK].kelp_rsEth;
const ORACLE_CURRENT_TOKEN_NAME = "Kelp - rsETH";
const ORACLE_CURRENT_TOKEN_PRICE = 1017017400000000000n;
const STRATEGY = strategies[NETWORK].strategy3;
let ORACLE_MOCK = oracles[NETWORK].oracle1Mock;

/// etherfi
// const ORACLE_TOKEN_NAMES = "etherfi-weth";
// const ORACLE_CURRENT_TOKEN = constants[NETWORK].etherfi_eEth;
// const ORACLE_CURRENT_TOKEN_NAME = "Etherfi - eEth";
// const ORACLE_CURRENT_TOKEN_PRICE = 999500000000000000n;
// const STRATEGY = strategies[NETWORK].strategy2;
// let ORACLE_MOCK = oracles[NETWORK].oracle2Mock;

const CONTRACT_NAME_STR = "StrSimpleReStaking";

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

    let oracleMockContract: OracleMock;
    if (DEPLOY_ORACLE_MOCK) {
        oracleMockContract = (await deployOracleMock(
            "OracleMock",
            ORACLE_TOKEN_NAMES,
            ORACLE_CURRENT_TOKEN,
            ORACLE_CURRENT_TOKEN_NAME,
            ORACLE_CURRENT_TOKEN_PRICE,
        )) as unknown as OracleMock;
        ORACLE_MOCK = await oracleMockContract.getAddress();
        // update log
        await updateDeploymentLog(NETWORK, "OracleMock", ORACLE_MOCK);
    } else {
        oracleMockContract = await ethers.getContractAt("OracleMock", ORACLE_MOCK);
    }

    if (CONFIG) {
        const strategyContract = await ethers.getContractAt(CONTRACT_NAME_STR, STRATEGY);
        // set price feed in strategy
        await strategyContract.setPriceFeedPerToken(ORACLE_CURRENT_TOKEN, ORACLE_MOCK);
    }

    console.log("==================================================================");
}

main()
    .then(() => console.log("\nFinished..."))
    .catch((error: Error) => {
        console.error(error);
        throw new Error();
    });
