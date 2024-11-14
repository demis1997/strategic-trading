"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuoteFromUni = exports.getDelta = exports.getAllFromEvent = exports.getVariableFromEvent = exports.testDeployStrategyFailure = void 0;
const hardhat_1 = require("hardhat");
const ERC20_json_1 = __importDefault(require("./_abis/ERC20.json"));
const constants_1 = require("./constants");
const chai_1 = require("chai");
const testDeployStrategyFailure = async (contractName, vaultAddress, liquidTokenAddress, adapterDeployPath, adapterWithdrawPath, strategyName, expectedError, expectedErrorMessage) => {
    const factory = await hardhat_1.ethers.getContractFactory(contractName);
    await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(factory, [
        vaultAddress,
        liquidTokenAddress,
        adapterDeployPath,
        adapterWithdrawPath,
        strategyName,
    ]))
        .to.be.revertedWithCustomError(factory, expectedError)
        .withArgs(expectedErrorMessage);
};
exports.testDeployStrategyFailure = testDeployStrategyFailure;
const getVariableFromEvent = async (contract, eventName, txReceipt, index) => {
    if (!txReceipt)
        throw new Error("Empty txReceipt");
    let parsedEventLog;
    for (const log of txReceipt.logs) {
        try {
            const parsedLog = contract.interface.parseLog(log);
            if (parsedLog !== null && parsedLog.name === eventName) {
                parsedEventLog = parsedLog;
                break;
            }
        }
        catch (error) {
            console.error("Error parsing log:", error);
        }
    }
    if (!parsedEventLog)
        throw new Error("Event not found");
    if (!parsedEventLog.args || parsedEventLog.args.length <= index) {
        throw new Error(`Arguments not available or index ${index} is out of bounds. Args length: ${parsedEventLog.args.length}`);
    }
    return parsedEventLog.args[index].toString();
};
exports.getVariableFromEvent = getVariableFromEvent;
const getAllFromEvent = async (contract, eventName, txReceipt) => {
    if (!txReceipt)
        throw "Empty rxReceipt";
    const log = txReceipt?.logs.find(log => contract.interface.parseLog(log)?.name === eventName);
    return log.args;
};
exports.getAllFromEvent = getAllFromEvent;
const getDelta = async (tokenInAddress, tokenOutAddress, deployer, amountIn, adapterContract) => {
    const deployerAddress = await deployer.getAddress();
    const adapterContractAddress = await adapterContract.getAddress();
    const tokenIn = await hardhat_1.ethers.getContractAt(ERC20_json_1.default, tokenInAddress, deployer);
    const roleToAssign = await adapterContract.VAULT_STRATEGY_ROLE();
    let tx = await adapterContract.grantRole(roleToAssign, deployerAddress);
    await tx.wait();
    tx = await tokenIn.approve(adapterContractAddress, amountIn);
    await tx.wait();
    tx = await adapterContract.deposit(deployerAddress, deployerAddress, tokenInAddress, amountIn, false);
    await tx.wait();
    const stContract = await hardhat_1.ethers.getContractAt(ERC20_json_1.default, tokenOutAddress, deployer);
    const stBalance = await stContract.balanceOf(deployerAddress);
    const delta = (amountIn * constants_1.AMOUNT_1E18) / stBalance;
    return {
        tokenInAddress,
        inAmount: amountIn,
        tokenOutAddress,
        outAmount: stBalance,
        delta,
    };
};
exports.getDelta = getDelta;
const getQuoteFromUni = async (protocol, swapExchange, amountOut, tokenIn, tokenOut, fee) => {
    let path;
    if (protocol == "KELP")
        path = hardhat_1.ethers.solidityPacked(["address", "uint24", "address"], [tokenOut, fee, tokenIn]);
    const txResult = await swapExchange.getAmountInForexactOutput(path, amountOut);
    const txReceipt = await txResult.wait();
    const quoteReturn = await (0, exports.getVariableFromEvent)(swapExchange, "Quoted", txReceipt, 0);
    return BigInt(quoteReturn);
};
exports.getQuoteFromUni = getQuoteFromUni;
//# sourceMappingURL=utils.js.map