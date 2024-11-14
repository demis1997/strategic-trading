/* eslint-disable @typescript-eslint/require-await */
import { ethers, upgrades } from "hardhat";
import {
    EventLog,
    ContractTransactionReceipt,
    Contract,
    LogDescription,
    ContractFactory,
    Signer,
} from "ethers";

import ERC20_ABI from "./_abis/ERC20.json";

import { AMOUNT_1E18 } from "./constants";

import { expect } from "chai";

// Function to perform the deployment tests with different parameters on strategy
export const testDeployStrategyFailure = async (
    contractName: string,
    vaultAddress: string,
    liquidTokenAddress: string,
    adapterDeployPath: string[],
    adapterWithdrawPath: string[],
    strategyName: string,
    expectedError: string,
    expectedErrorMessage: string,
): Promise<void> => {
    const factory: ContractFactory = await ethers.getContractFactory(contractName);

    await expect(
        upgrades.deployProxy(factory, [
            vaultAddress,
            liquidTokenAddress,
            adapterDeployPath,
            adapterWithdrawPath,
            strategyName,
        ]),
    )
        .to.be.revertedWithCustomError(factory, expectedError)
        .withArgs(expectedErrorMessage);
};

export const getVariableFromEvent = async (
    contract: Contract,
    eventName: string,
    txReceipt: ContractTransactionReceipt | null,
    index: number,
): Promise<string> => {
    // if (!txReceipt) throw "Empty rxReceipt";
    // const log = txReceipt?.logs.find(
    //     log => contract.interface.parseLog(log as EventLog)?.name === eventName,
    // ) as EventLog;
    // return log.args[index].toString();
    // --------------------
    if (!txReceipt) throw new Error("Empty txReceipt");

    let parsedEventLog: LogDescription | undefined;

    for (const log of txReceipt.logs) {
        try {
            // Attempt to parse each log against the contract's interface
            const parsedLog = contract.interface.parseLog(log);
            if (parsedLog !== null && parsedLog.name === eventName) {
                parsedEventLog = parsedLog;
                break; // Stop if we find the correct event
            }
        } catch (error) {
            console.error("Error parsing log:", error);
        }
    }

    if (!parsedEventLog) throw new Error("Event not found");

    // Validate the existence and accessibility of the desired index in args
    if (!parsedEventLog.args || parsedEventLog.args.length <= index) {
        throw new Error(
            `Arguments not available or index ${index} is out of bounds. Args length: ${parsedEventLog.args.length}`,
        );
    }

    // console.log("Found Log Args:", parsedEventLog.args);
    return parsedEventLog.args[index].toString();
};

export const getAllFromEvent = async (
    contract: Contract,
    eventName: string,
    txReceipt: ContractTransactionReceipt | null,
): Promise<object> => {
    if (!txReceipt) throw "Empty rxReceipt";

    const log = txReceipt?.logs.find(
        log => contract.interface.parseLog(log as EventLog)?.name === eventName,
    ) as EventLog;

    return log.args;
};

export interface MainnetData {
    tokenInAddress: string;
    inAmount: bigint;
    tokenOutAddress: string;
    outAmount: bigint;
    delta: bigint;
}

export const getDelta = async (
    // tokenIn: Contract,
    tokenInAddress: string,
    tokenOutAddress: string,
    deployer: Signer,
    amountIn: bigint,
    adapterContract: Contract,
): Promise<MainnetData> => {
    // get addresses
    const deployerAddress = await deployer.getAddress();
    const adapterContractAddress = await adapterContract.getAddress();

    // get contract of the token to put
    const tokenIn = await ethers.getContractAt(ERC20_ABI, tokenInAddress, deployer);

    // give deployer VAULT_STRATEGY_ROLE role on adapters
    const roleToAssign = await adapterContract.VAULT_STRATEGY_ROLE();
    let tx = await adapterContract.grantRole(roleToAssign, deployerAddress);
    await tx.wait();

    // approve to take amountIn
    tx = await tokenIn.approve(adapterContractAddress, amountIn);
    await tx.wait();

    // deposit on adapter
    tx = await adapterContract.deposit(
        deployerAddress,
        deployerAddress,
        tokenInAddress,
        amountIn,
        false,
    );
    await tx.wait();

    // get returned token balance
    const stContract = await ethers.getContractAt(ERC20_ABI, tokenOutAddress, deployer);
    const stBalance = await stContract.balanceOf(deployerAddress);

    // calculate delta
    const delta = (amountIn * AMOUNT_1E18) / stBalance;

    return {
        tokenInAddress,
        inAmount: amountIn,
        tokenOutAddress,
        outAmount: stBalance,
        delta,
    };
};

export const getQuoteFromUni = async (
    protocol: string,
    swapExchange: Contract,
    amountOut: bigint,
    tokenIn: string,
    tokenOut: string,
    fee: bigint,
): Promise<bigint> => {
    let path;
    if (protocol == "KELP")
        path = ethers.solidityPacked(["address", "uint24", "address"], [tokenOut, fee, tokenIn]);

    const txResult = await swapExchange.getAmountInForexactOutput(path, amountOut);
    const txReceipt = await txResult.wait();

    // get amounts from emitted event
    const quoteReturn = await getVariableFromEvent(
        swapExchange as unknown as Contract,
        "Quoted",
        txReceipt,
        0,
    );

    return BigInt(quoteReturn);
};
