/*
import { ethers, network } from "hardhat";
import {
    EtherFiAdapter,
    KelpAdapter,
    LidoAdapter,
    StaderAdapter,
    UniswapV3Adapter,
} from "../types";
import {
    deployUniswapAdapter,
    deployLidoAdapter,
    deployKelpAdapter,
    deployEtherFiAdapter,
    deployStaderAdapter,
} from "./_helpers/_deployContracts";
import { constants, deployedContracts } from "./_helpers/_deployAddresses";
import { updateDeploymentLog } from "./_helpers/_logger";

/// ==========================================================================================
/// ACTIONS ==================================================================================
/// ==========================================================================================

const DEPLOY_UNISWAP = true;
// const DEPLOY_UNISWAP = false;

const DEPLOY_LIDO = true;
// const DEPLOY_LIDO = false;

const DEPLOY_KELP = true;
// const DEPLOY_KELP = false;

const DEPLOY_ETHERFI = true;
// const DEPLOY_ETHERFI = false;

const DEPLOY_STADER = true;
// const DEPLOY_STADER = false;

// const CONFIG = true;
const CONFIG = false;

/// ==========================================================================================
/// ADDRESSSES ===============================================================================
/// ==========================================================================================

const NETWORK = "SEPOLIA";

const WETH = constants[NETWORK].weth;
const UNISWAP_ROUTER_ADDRESS = constants[NETWORK].uniswapRouter;
const UNISWAP_QUOTER_ADDRESS = constants[NETWORK].uniswapQuoterV2;

const LIDO_stETH_ADDRESS = constants[NETWORK].lidoStEth;
const LIDO_WstETH_ADDRESS = constants[NETWORK].lidoWstEth;

const KELP_DEPOSIT_POOL_ADDRESS = constants[NETWORK].kelp_deposit;
const KELP_rsETH_ADDRESS = constants[NETWORK].kelp_rsEth;

const ETHERFI_LIQUIFIER_ADDRESS = constants[NETWORK].etherfi_liquifier;
const ETHERFI_eETH_ADDRESS = constants[NETWORK].etherfi_eEth;
const ETHERFI_weETH_ADDRESS = constants[NETWORK].etherfi_weEth;

const STADER_STAKE_MANAGER_ADDRESS = constants[NETWORK].stader_stake_manager;
const STADER_ETHx_ADDRESS = constants[NETWORK].stader_ETHx;

let UNISWAP_ADAPTER = deployedContracts[NETWORK].uniswapAdapter;
let LIDO_ADAPTER = deployedContracts[NETWORK].lidoAdapter;
let KELP_ADAPTER = deployedContracts[NETWORK].kelpAdapter;
let ETHERFI_ADAPTER = deployedContracts[NETWORK].etherFiAdapter;
let STADER_ADAPTER = deployedContracts[NETWORK].staderAdaper;

async function main(): Promise<void> {
    // let txResult: ContractTransactionResponse;
    // let roleToAssign;

    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    console.clear();

    const [deployer] = await ethers.getSigners();
    // const [deployerAddress] = await Promise.all([deployer.getAddress()]);

    console.log("\n");
    console.log("Network:", network.name);
    console.log("deployerAddress :>> ", deployer.address);
    console.log("\n");
    console.log("\nDEPLOYING....");
    console.log("==================================================================");

    let uniswapAdapterContract: UniswapV3Adapter;
    if (DEPLOY_UNISWAP) {
        // deploy uniswap adapter
        uniswapAdapterContract = (await deployUniswapAdapter(
            "UniswapV3Adapter",
            // NETWORK == "SEPOLIA" ? PROTOCOL_MOCK : UNISWAP_ROUTER_ADDRESS,
            UNISWAP_ROUTER_ADDRESS,
            UNISWAP_QUOTER_ADDRESS,
            WETH,
        )) as unknown as UniswapV3Adapter;
        UNISWAP_ADAPTER = await uniswapAdapterContract.getAddress();
        // update log
        await updateDeploymentLog(NETWORK, "UniswapV3Adapter", UNISWAP_ADAPTER);

        // // config pools to get price
        // await uniswapAdapterContract.setPoolPerTokenForPrice(
        //     constants[NETWORK].etherfi_weEth,
        //     constants[NETWORK].weEth_weth_uni_pool,
        // );
        // // config pools to get price
        // await uniswapAdapterContract.setPoolPerTokenForPrice(
        //     LIDO_WstETH_ADDRESS,
        //     constants[NETWORK].wsEth_weth_uni_pool,
        // );
    } else {
        uniswapAdapterContract = await ethers.getContractAt("UniswapV3Adapter", UNISWAP_ADAPTER);
    }

    let lidoAdapterContract: LidoAdapter;
    if (DEPLOY_LIDO) {
        // deploy LIDO adapter for staking protocol
        lidoAdapterContract = (await deployLidoAdapter(
            "LidoAdapter",
            LIDO_stETH_ADDRESS,
            WETH,
            LIDO_WstETH_ADDRESS,
        )) as unknown as LidoAdapter;
        LIDO_ADAPTER = await lidoAdapterContract.getAddress();
        // update log
        await updateDeploymentLog(NETWORK, "LidoAdapter", LIDO_ADAPTER);
    } else {
        lidoAdapterContract = await ethers.getContractAt("LidoAdapter", LIDO_ADAPTER);
    }

    let kelpAdapterContract: KelpAdapter;
    if (DEPLOY_KELP) {
        // deploy KELP adapter for staking protocol
        kelpAdapterContract = (await deployKelpAdapter(
            "KelpAdapter",
            KELP_DEPOSIT_POOL_ADDRESS,
            KELP_rsETH_ADDRESS,
        )) as unknown as KelpAdapter;
        KELP_ADAPTER = await kelpAdapterContract.getAddress();
        // update log
        await updateDeploymentLog(NETWORK, "KelpAdapter", KELP_ADAPTER);
    } else {
        kelpAdapterContract = await ethers.getContractAt("KelpAdapter", KELP_ADAPTER);
    }

    let etherFiAdapterContract: EtherFiAdapter;
    if (DEPLOY_ETHERFI) {
        // deploy ETHERFI adapter for staking protocol
        etherFiAdapterContract = (await deployEtherFiAdapter(
            "EtherFiAdapter",
            ETHERFI_LIQUIFIER_ADDRESS,
            ETHERFI_eETH_ADDRESS,
            ETHERFI_weETH_ADDRESS,
        )) as unknown as EtherFiAdapter;
        ETHERFI_ADAPTER = await etherFiAdapterContract.getAddress();
        // update log
        await updateDeploymentLog(NETWORK, "EtherFiAdapter", ETHERFI_ADAPTER);
    } else {
        etherFiAdapterContract = await ethers.getContractAt("EtherFiAdapter", ETHERFI_ADAPTER);
    }

    let staderAdapterContract: StaderAdapter;
    if (DEPLOY_STADER) {
        // deploy STADER adapter for staking protocol
        staderAdapterContract = (await deployStaderAdapter(
            "StaderAdapter",
            STADER_STAKE_MANAGER_ADDRESS,
            WETH,
            STADER_ETHx_ADDRESS,
        )) as unknown as StaderAdapter;
        STADER_ADAPTER = await staderAdapterContract.getAddress();
        // update log
        await updateDeploymentLog(NETWORK, "StaderAdapter", STADER_ADAPTER);
    } else {
        staderAdapterContract = await ethers.getContractAt("StaderAdapter", STADER_ADAPTER);
    }

    if (CONFIG) {
        // execute this only if protocol mock is deployed again
        await uniswapAdapterContract.setUniswapRouterAddress(
            // NETWORK == "SEPOLIA" ? PROTOCOL_MOCK : UNISWAP_ROUTER_ADDRESS,
            UNISWAP_ROUTER_ADDRESS,
        );

        // // give adapters admin role on protocol
        // // need to get protocol first
        // const roleToAssign = await protocolMockContract.DEFAULT_ADMIN_ROLE();
        // await protocolMockContract.grantRole(roleToAssign, LIDO_ADAPTER);
        // await protocolMockContract.grantRole(roleToAssign, UNISWAP_ADAPTER);
    }

    console.log("==================================================================");
}

main()
    .then(() => console.log("\nFinished..."))
    .catch((error: Error) => {
        console.error(error);
        throw new Error();
    });
*/
