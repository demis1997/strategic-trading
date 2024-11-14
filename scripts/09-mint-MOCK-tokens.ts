/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers, network } from "hardhat";
import { constants, adapters } from "./_helpers/_deployAddresses";
import { ContractTransactionResponse } from "ethers";

/// ==========================================================================================
/// ACTIONS ==================================================================================
/// ==========================================================================================

const MINT_LIQUID_TOKENS = true;
// const MINT_LIQUID_TOKENS = false;

const MINT_FAKE_WETH = true;
// const MINT_FAKE_WETH = false;

/// ==========================================================================================
/// ASSIGNMENTS ==============================================================================
/// ==========================================================================================

const NETWORK = "SEPOLIA";
const ADAPTER_CONTRACT_NAME = "TestnetAdapterMock";
const QTY = ethers.parseEther("100000");

const FAKE_WETH = constants[NETWORK].weth;

// const ADAPTER = adapters[NETWORK].weth_stader;
// const ADAPTER_TOKEN = constants[NETWORK].stader_ETHx;

// const ADAPTER = adapters[NETWORK].stader_kelp;
// const ADAPTER_TOKEN = constants[NETWORK].kelp_rsEth;

// const ADAPTER = adapters[NETWORK].weth_lido;
// const ADAPTER_TOKEN = constants[NETWORK].lidoStEth;

// const ADAPTER = adapters[NETWORK].lido_etherfi;
// const ADAPTER_TOKEN = constants[NETWORK].etherfi_eEth;

const ADAPTER = adapters[NETWORK].lido_kelp;
const ADAPTER_TOKEN = constants[NETWORK].kelp_rsEth;

/// ==========================================================================================
/// ASSIGNMENTS ==============================================================================
/// ==========================================================================================

async function main(): Promise<void> {
    let txResult: ContractTransactionResponse;

    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    console.clear();

    const [deployer] = await ethers.getSigners();

    console.log("\n");
    console.log("Network:", network.name);
    console.log("deployerAddress :>> ", deployer.address);
    console.log("\n");
    console.log("\nMINTING....");
    console.log("==================================================================");

    // get the adapter contract
    const adapterContract = await ethers.getContractAt(ADAPTER_CONTRACT_NAME, ADAPTER);
    const adapterName = await adapterContract.adapterName();
    if (MINT_LIQUID_TOKENS) {
        // get the token contract
        const tokenContract = await ethers.getContractAt("ERC20Mock", ADAPTER_TOKEN);
        const tokenName = await tokenContract.symbol();
        txResult = await tokenContract.mint(ADAPTER, QTY);
        console.log(`\nMINTED ${QTY} ${tokenName} to ${adapterName}.\nTxHash: ${txResult.hash}`);
    }

    if (MINT_FAKE_WETH) {
        // get the token contract
        const tokenContract = await ethers.getContractAt("ERC20Mock", FAKE_WETH);
        const tokenName = "WETH";
        txResult = await tokenContract.mint(ADAPTER, QTY);
        console.log(`\nMINTED ${QTY} ${tokenName} to ${adapterName}.\nTxHash: ${txResult.hash}`);
    }

    console.log("==================================================================");
}

main()
    .then(() => console.log("\nFinished..."))
    .catch((error: Error) => {
        console.error(error);
        throw new Error();
    });
