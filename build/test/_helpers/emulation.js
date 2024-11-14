"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEzEthContract = exports.getRenzoLiquifierContract = exports.getLidoWstETHContract = exports.getLidoStETHContract = exports.getWeEthContract = exports.getStaderETHxContract = exports.getRsETHContract = exports.getEethContract = exports.getRETHContract = exports.getWethContract = exports.getUniswapV3RouterContract = void 0;
const hardhat_1 = require("hardhat");
const WETH_json_1 = __importDefault(require("./_abis/WETH.json"));
const LIDO_wstETH_json_1 = __importDefault(require("./_abis/LIDO_wstETH.json"));
const UNISWAP_Router2_json_1 = __importDefault(require("./_abis/UNISWAP_Router2.json"));
const RETH_json_1 = __importDefault(require("./_abis/RETH.json"));
const ERC20_json_1 = __importDefault(require("./_abis/ERC20.json"));
const ERC20_balanceOf_json_1 = __importDefault(require("./_abis/ERC20_balanceOf.json"));
const RenzoLiquifier_json_1 = __importDefault(require("./_abis/RenzoLiquifier.json"));
async function getUniswapV3RouterContract(contractAddress, signer) {
    return await hardhat_1.ethers.getContractAt(UNISWAP_Router2_json_1.default, contractAddress, signer);
}
exports.getUniswapV3RouterContract = getUniswapV3RouterContract;
async function getWethContract(contractAddress, signer) {
    return await hardhat_1.ethers.getContractAt(WETH_json_1.default, contractAddress, signer);
}
exports.getWethContract = getWethContract;
async function getRETHContract(contractAddress, signer) {
    return await hardhat_1.ethers.getContractAt(RETH_json_1.default, contractAddress, signer);
}
exports.getRETHContract = getRETHContract;
async function getEethContract(contractAddress, signer) {
    return await hardhat_1.ethers.getContractAt(ERC20_json_1.default, contractAddress, signer);
}
exports.getEethContract = getEethContract;
async function getRsETHContract(contractAddress, signer) {
    return await hardhat_1.ethers.getContractAt(ERC20_json_1.default, contractAddress, signer);
}
exports.getRsETHContract = getRsETHContract;
async function getStaderETHxContract(contractAddress, signer) {
    return await hardhat_1.ethers.getContractAt(ERC20_balanceOf_json_1.default, contractAddress, signer);
}
exports.getStaderETHxContract = getStaderETHxContract;
async function getWeEthContract(contractAddress, signer) {
    return await hardhat_1.ethers.getContractAt(WETH_json_1.default, contractAddress, signer);
}
exports.getWeEthContract = getWeEthContract;
async function getLidoStETHContract(proxyAddress, signer) {
    return await hardhat_1.ethers.getContractAt(ERC20_json_1.default, proxyAddress, signer);
}
exports.getLidoStETHContract = getLidoStETHContract;
async function getLidoWstETHContract(contractAddress, signer) {
    return await hardhat_1.ethers.getContractAt(LIDO_wstETH_json_1.default, contractAddress, signer);
}
exports.getLidoWstETHContract = getLidoWstETHContract;
async function getRenzoLiquifierContract(contractAddress, signer) {
    return await hardhat_1.ethers.getContractAt(RenzoLiquifier_json_1.default, contractAddress, signer);
}
exports.getRenzoLiquifierContract = getRenzoLiquifierContract;
async function getEzEthContract(contractAddress, signer) {
    return await hardhat_1.ethers.getContractAt(ERC20_json_1.default, contractAddress, signer);
}
exports.getEzEthContract = getEzEthContract;
//# sourceMappingURL=emulation.js.map