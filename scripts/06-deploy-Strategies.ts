import { ethers, network } from "hardhat";
import { StrSimpleStaking } from "../types";
import { deployVaultStrategy } from "./_helpers/_deployContracts";
import { configVault } from "./_helpers/_configContracts";
import { constants, vaults, strategies, adapters } from "./_helpers/_deployAddresses";
import { updateDeploymentLog } from "./_helpers/_logger";

/// ==========================================================================================
/// ACTIONS ==================================================================================
/// ==========================================================================================
// const DEPLOY_STD_STRATEGY = true;
const DEPLOY_STD_STRATEGY = false;

const CONFIG = true;
// const CONFIG = false;
const CONFIG_DEPLOY_STRATEGY_AS_WITHDRAW = true;
// const CONFIG_DEPLOY_STRATEGY_AS_WITHDRAW = false;

// const DEPLOY_WTD_STRATEGY = true;
// const DEPLOY_WTD_STRATEGY = false;

/// ==========================================================================================
/// ADDRESSSES ===============================================================================
/// ==========================================================================================

const NETWORK = "SEPOLIA";
const CONTRACT_NAME_STR = "StrSimpleReStaking";

// const STR_NAME = "Re-Staking Lido - Kelp";
// const WETH_LIDO = adapters[NETWORK].weth_lido;
// const LIDO_KELP = adapters[NETWORK].lido_kelp;
// const LIQUID_TKN = constants[NETWORK].kelp_rsEth;
// const DEPLOY_PATH = [WETH_LIDO, LIDO_KELP];
// const WITHDRAW_PATH = [LIDO_KELP];
// const VAULT = vaults[NETWORK].vault1;
// let VAULT_STRATEGY = strategies[NETWORK].strategy1;

// const STR_NAME = "Re-Staking Lido - EtherFi";
// const WETH_LIDO = adapters[NETWORK].weth_lido;
// const LIDO_ETHERFI = adapters[NETWORK].lido_etherfi;
// const LIQUID_TKN = constants[NETWORK].etherfi_eEth;
// const DEPLOY_PATH = [WETH_LIDO, LIDO_ETHERFI];
// const WITHDRAW_PATH = [LIDO_ETHERFI];
// const VAULT = vaults[NETWORK].vault2;
// let VAULT_STRATEGY = strategies[NETWORK].strategy2;

const STR_NAME = "Re-Staking Stader - Kelp";
const WETH_STADER = adapters[NETWORK].weth_stader;
const STADER_KELP = adapters[NETWORK].stader_kelp;
const LIQUID_TKN = constants[NETWORK].kelp_rsEth;
const DEPLOY_PATH = [WETH_STADER, STADER_KELP];
const WITHDRAW_PATH = [STADER_KELP];
const VAULT = vaults[NETWORK].vault3;
let VAULT_STRATEGY = strategies[NETWORK].strategy3;

/// ==========================================================================================
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

    let strategyContract: StrSimpleStaking;
    if (DEPLOY_STD_STRATEGY) {
        // deploy VaultStrategy
        strategyContract = (await deployVaultStrategy(
            CONTRACT_NAME_STR,
            VAULT,
            LIQUID_TKN,
            DEPLOY_PATH,
            WITHDRAW_PATH,
            STR_NAME,
        )) as unknown as StrSimpleStaking;
        VAULT_STRATEGY = await strategyContract.getAddress();
        // log deployment data
        await updateDeploymentLog(NETWORK, STR_NAME, VAULT_STRATEGY);
    } else {
        strategyContract = await ethers.getContractAt(CONTRACT_NAME_STR, VAULT_STRATEGY);
    }

    if (CONFIG) {
        // for immediate withdraw this should be true
        if (CONFIG_DEPLOY_STRATEGY_AS_WITHDRAW)
            await configVault(VAULT, VAULT_STRATEGY, VAULT_STRATEGY);
    }

    console.log("==================================================================");
}

main()
    .then(() => console.log("\nFinished..."))
    .catch((error: Error) => {
        console.error(error);
        throw new Error();
    });
