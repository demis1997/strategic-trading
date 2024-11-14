import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";
import WETH_ABI from "./_abis/WETH.json";
// import LidoStETH_ABI from "./_abis/LIDO_proxy.json";
// import LidoImpl_ABI from "./_abis/LIDO_impl.json";
import LidoWstETH_ABI from "./_abis/LIDO_wstETH.json";
import UniswapRouterV2_ABI from "./_abis/UNISWAP_Router2.json";
import RETH_ABI from "./_abis/RETH.json";
import ERC20_ABI from "./_abis/ERC20.json";
import BalanceOf_ABI from "./_abis/ERC20_balanceOf.json";
import RenzoLiquifier_ABI from "./_abis/RenzoLiquifier.json";

export async function getUniswapV3RouterContract(
    contractAddress: string,
    signer: Signer,
): Promise<Contract> {
    // create instance of UniswapRouter contract
    return await ethers.getContractAt(UniswapRouterV2_ABI, contractAddress, signer);
}

export async function getWethContract(contractAddress: string, signer: Signer): Promise<Contract> {
    // create instance of weth contract
    return await ethers.getContractAt(WETH_ABI, contractAddress, signer);
}

export async function getRETHContract(contractAddress: string, signer: Signer): Promise<Contract> {
    // create instance of Rocket Pool rETH contract
    return await ethers.getContractAt(RETH_ABI, contractAddress, signer);
}

export async function getEethContract(contractAddress: string, signer: Signer): Promise<Contract> {
    // create instance of etherfi eeth contract
    return await ethers.getContractAt(ERC20_ABI, contractAddress, signer);
}

export async function getRsETHContract(contractAddress: string, signer: Signer): Promise<Contract> {
    // create instance of kelp eeth contract
    return await ethers.getContractAt(ERC20_ABI, contractAddress, signer);
}

export async function getStaderETHxContract(
    contractAddress: string,
    signer: Signer,
): Promise<Contract> {
    // create instance of etherfi eeth contract
    return await ethers.getContractAt(BalanceOf_ABI, contractAddress, signer);
}

export async function getWeEthContract(contractAddress: string, signer: Signer): Promise<Contract> {
    // create instance of etherfi weeth contract (using weth abi)
    return await ethers.getContractAt(WETH_ABI, contractAddress, signer);
}

export async function getLidoStETHContract(
    proxyAddress: string,
    signer: Signer,
): Promise<Contract> {
    // Create instance of Lido
    return await ethers.getContractAt(ERC20_ABI, proxyAddress, signer);
}
export async function getLidoWstETHContract(
    contractAddress: string,
    signer: Signer,
): Promise<Contract> {
    // Create instance of wrap stake eth Lido
    return await ethers.getContractAt(LidoWstETH_ABI, contractAddress, signer);
}
export async function getRenzoLiquifierContract(
    contractAddress: string,
    signer: Signer,
): Promise<Contract> {
    return await ethers.getContractAt(RenzoLiquifier_ABI, contractAddress, signer);
}

export async function getEzEthContract(contractAddress: string, signer: Signer): Promise<Contract> {
    return await ethers.getContractAt(ERC20_ABI, contractAddress, signer);
}