"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSwapPath = exports.configDepositStrategy = exports.configVault = void 0;
const hardhat_1 = require("hardhat");
const constants_1 = require("../test/_helpers/constants");
let txResult;
const VEBOSE = false;
async function configVault(vaultContractAddress, vaultStrategyAddress, withdrawStrategyAddress) {
    if (VEBOSE)
        console.log("\nSet Strategies addresses on Vault contract and LiveValuation");
    const vaultContract = await hardhat_1.ethers.getContractAt("Vault", vaultContractAddress);
    txResult = await vaultContract.setVaultStrategyAddress(vaultStrategyAddress);
    if (VEBOSE)
        console.log(`Vault Strategy set.\nTxHash: ${txResult.hash}`);
    txResult = await vaultContract.setWithdrawStrategyAddress(withdrawStrategyAddress);
    if (VEBOSE)
        console.log(`Withdraw Strategy set.\nTxHash: ${txResult.hash}`);
    txResult = await vaultContract.setLiveValuation(true, 0);
    if (VEBOSE)
        console.log(`Live Valuation on deposit set.\nTxHash: ${txResult.hash}`);
    txResult = await vaultContract.setLiveValuation(true, 1);
    if (VEBOSE)
        console.log(`Live Valuation on withdraw set.\nTxHash: ${txResult.hash}`);
}
exports.configVault = configVault;
async function configDepositStrategy(contractName, vaultStrategyAddress, withdrawStrategyAddress, wrapperAddress) {
    if (VEBOSE)
        console.log("\nSet Strategy and liquidToken addresses on Vault Strategy Contract");
    const vaultStrategyContract = await hardhat_1.ethers.getContractAt(contractName, vaultStrategyAddress);
    if (withdrawStrategyAddress != constants_1.ZERO_ADDRESS) {
        txResult = await vaultStrategyContract.setWhitdrawStrategyAddress(withdrawStrategyAddress);
        if (VEBOSE)
            console.log(`Withdraw Strategy set.\nTxHash: ${txResult.hash}`);
    }
    if (wrapperAddress != constants_1.ZERO_ADDRESS) {
        txResult = await vaultStrategyContract.setWrappedLiquidTokenAddress(wrapperAddress);
        if (VEBOSE)
            console.log(`Wrapper set.\nTxHash: ${txResult.hash}`);
    }
}
exports.configDepositStrategy = configDepositStrategy;
async function configSwapPath(contractName, strDeployContractAddress, tokens, fees) {
    if (VEBOSE)
        console.log("\nSet PATH Swap");
    const strategyContract = await hardhat_1.ethers.getContractAt(contractName, strDeployContractAddress);
    txResult = await strategyContract.buildPath(tokens, fees);
    if (VEBOSE)
        console.log(`Path built.\nTxHash: ${txResult.hash}`);
}
exports.configSwapPath = configSwapPath;
//# sourceMappingURL=_configContracts.js.map