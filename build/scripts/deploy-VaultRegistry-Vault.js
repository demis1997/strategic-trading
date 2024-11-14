"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const _deployContracts_1 = require("./_deployContracts");
const utils_1 = require("./../test/_helpers/utils");
const _deployAddresses_1 = require("./_helpers/_deployAddresses");
const DEPLOY_MASTER_TOKEN = true;
const DEPLOY_REGISTRY = false;
const DEPLOY_VAULT = false;
const CONFIG = true;
const NETWORK = "SEPOLIA";
const WETH = _deployAddresses_1.constants[NETWORK].weth;
let VAULT = _deployAddresses_1.deployedContracts[NETWORK].vaultSimpleStaking;
let VAULTS_REGISTRY = _deployAddresses_1.deployedContracts[NETWORK].vaultRegistry;
let MASTER_TOKEN = _deployAddresses_1.deployedContracts[NETWORK].masterToken;
const DEFAULT_FEE_RATE = hardhat_1.ethers.parseEther("10");
async function main() {
    let txResult;
    let roleToAssign;
    console.clear();
    const [deployer] = await hardhat_1.ethers.getSigners();
    const [deployerAddress] = await Promise.all([deployer.getAddress()]);
    console.log("\n");
    console.log("Network:", hardhat_1.network.name);
    console.log("deployerAddress :>> ", deployer.address);
    console.log("\n");
    console.log("\nDEPLOYING....");
    console.log("==================================================================");
    let vaultsRegistryContract;
    if (DEPLOY_REGISTRY) {
        const vaultImplementation = (await (0, _deployContracts_1.deployVaultImplementation)());
        const vaultImplementationAddress = await vaultImplementation.getAddress();
        vaultsRegistryContract = (await (0, _deployContracts_1.deployVaultsRegistry)(DEFAULT_FEE_RATE, vaultImplementationAddress));
        VAULTS_REGISTRY = await vaultsRegistryContract.getAddress();
    }
    else {
        vaultsRegistryContract = await hardhat_1.ethers.getContractAt("VaultsRegistry", VAULTS_REGISTRY);
    }
    let masterTokenContract;
    if (DEPLOY_MASTER_TOKEN) {
        masterTokenContract = (await (0, _deployContracts_1.deployMasterTokenMock)("MasterTokenMock", VAULTS_REGISTRY, "LYS", "LYS", BigInt(18)));
        MASTER_TOKEN = await masterTokenContract.getAddress();
    }
    else {
        masterTokenContract = await hardhat_1.ethers.getContractAt("MasterTokenMock", MASTER_TOKEN);
    }
    let vaultContract;
    if (DEPLOY_VAULT) {
        txResult = await vaultsRegistryContract.deployVault(WETH, deployerAddress, deployerAddress, "whyETH Shares", "sWhyETH");
        const txReceipt = await txResult.wait();
        VAULT = await (0, utils_1.getVariableFromEvent)(vaultsRegistryContract, "VaultDeployed", txReceipt, 0);
        vaultContract = await hardhat_1.ethers.getContractAt("Vault", VAULT);
        console.log(`Vault contract deployed at: ${VAULT}`);
        txResult = await vaultContract.setLiveValuation(true, 0);
        console.log(`Live Valuation on deposit set.\nTxHash: ${txResult.hash}`);
        txResult = await vaultContract.setLiveValuation(true, 1);
        console.log(`Live Valuation on withdraw set.\nTxHash: ${txResult.hash}`);
        roleToAssign = await vaultContract.VAULT_MANAGER_ROLE();
        txResult = await vaultContract.grantRole(roleToAssign, deployerAddress);
        console.log(`Vault manager role granted to deployer.\nTxHash: ${txResult.hash}`);
        roleToAssign = await vaultContract.MASTER_TOKEN_ROLE();
        txResult = await vaultContract.grantRole(roleToAssign, deployerAddress);
        console.log(`Master token role granted to deployer.\nTxHash: ${txResult.hash}`);
    }
    else {
        vaultContract = await hardhat_1.ethers.getContractAt("Vault", VAULT);
    }
    if (CONFIG) {
        await masterTokenContract.setAssetAddress(WETH);
        roleToAssign = await vaultContract.VAULT_MANAGER_ROLE();
        await vaultContract.grantRole(roleToAssign, MASTER_TOKEN);
        roleToAssign = await vaultContract.MASTER_TOKEN_ROLE();
        await vaultContract.grantRole(roleToAssign, MASTER_TOKEN);
    }
    console.log("==================================================================");
}
main()
    .then(() => console.log("\nFinished..."))
    .catch((error) => {
    console.error(error);
    throw new Error();
});
//# sourceMappingURL=deploy-VaultRegistry-Vault.js.map