/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers, network } from "hardhat";
import {
    AggregatorToken,
    ERC20Mock,
    StrSimpleReStaking,
    TestnetAdapterMock,
    Vault,
    VaultsRegistry,
} from "../../types";
import { vaults } from "./_deployAddresses";

/// ==========================================================================================
/// ASSIGNMENTS ==============================================================================
/// ==========================================================================================

const NETWORK = "SEPOLIA";

/// ==========================================================================================
/// ASSIGNMENTS ==============================================================================
/// ==========================================================================================

async function main(): Promise<void> {
    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    console.clear();

    const [deployer] = await ethers.getSigners();

    console.log("\n");
    console.log("Network:", network.name);
    console.log("deployerAddress :>> ", deployer.address);
    console.log("\n");
    console.log("\nCHECKING....");
    console.log("==================================================================");

    let registryContract: VaultsRegistry;
    let vaultContract: Vault;
    let strategyContract: StrSimpleReStaking;
    let whyEthContract: AggregatorToken;
    let underlyingContract: ERC20Mock;
    let adapterContract: TestnetAdapterMock;

    let vaultAddress: string;
    let whyEthAddress: string;
    let underlyingAddress: string;
    let underlyingSymbol: string;
    let strategyAddress: string;
    let strategyName: string;
    let registryAddress: string;
    let adapterAddress: string;
    let adapterName: string;
    let protocolAddress: string;
    let protocolName: string;
    let adaptersQty;

    for (const key in vaults[NETWORK] as any) {
        vaultAddress = (vaults[NETWORK] as any)[key];
        vaultContract = await ethers.getContractAt("Vault", vaultAddress);
        strategyAddress = await vaultContract.vaultStrategyAddress();
        registryAddress = await vaultContract.vaultsRegistryAddress();
        whyEthAddress = await vaultContract.masterTokenAddress();
        underlyingAddress = await vaultContract.asset();

        registryContract = await ethers.getContractAt("VaultsRegistry", registryAddress);

        underlyingContract = await ethers.getContractAt("ERC20Mock", underlyingAddress);
        whyEthContract = await ethers.getContractAt("AggregatorToken", whyEthAddress);

        underlyingSymbol = await underlyingContract.symbol();
        strategyContract = await ethers.getContractAt("StrSimpleReStaking", strategyAddress);
        strategyName = await strategyContract.strategyName();
        adaptersQty = await strategyContract.DEPLOYMENT_ADAPTERS_QTY();

        console.log(`\nVAULT :   ${vaultAddress} - RegistryAddress: ${registryAddress}`);
        console.log(`Strategy: ${strategyAddress} - StrategyName ${strategyName}`);
        console.log(`whyETH:   ${whyEthAddress}`);
        console.log(`weth  :   ${underlyingAddress} - Symbol: ${underlyingSymbol}`);
        console.log(
            "==============================================================================",
        );

        for (let i = 0; i < adaptersQty; i++) {
            adapterAddress = await strategyContract.adaptersDeployPath(i);
            adapterContract = await ethers.getContractAt("TestnetAdapterMock", adapterAddress);

            adapterName = await adapterContract.adapterName();
            protocolAddress = await adapterContract.protocolAddress();
            protocolName = await adapterContract.protocolName();

            console.log(`Adapter : ${adapterAddress} - AdapterName: ${adapterName}`);
            console.log(`Protocol: ${protocolAddress} - ProtocolName: ${protocolName}`);
        }

        console.log(
            "==============================================================================",
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
