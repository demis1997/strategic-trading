"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployCounter = void 0;
const hardhat_1 = require("hardhat");
async function deployCounter(print, initCount, gasOpts) {
    if (initCount === undefined) {
        initCount = 0;
    }
    const counterFactory = await hardhat_1.ethers.getContractFactory("Counter");
    const counterContract = await (await counterFactory.deploy(initCount, {
        maxFeePerGas: gasOpts?.maxFeePerGas,
        maxPriorityFeePerGas: gasOpts?.maxPriorityFeePerGas,
        gasLimit: gasOpts?.gasLimit,
    })).waitForDeployment();
    if (print)
        console.log("Counter deployed to:", await counterContract.getAddress());
    return counterContract;
}
exports.deployCounter = deployCounter;
//# sourceMappingURL=deploySample.js.map