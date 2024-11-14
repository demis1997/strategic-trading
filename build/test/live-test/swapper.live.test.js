"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const chai_1 = require("chai");
const chai = __importStar(require("chai"));
const emulation_1 = require("../_helpers/emulation");
const _deployAddresses_1 = require("../../scripts/_helpers/_deployAddresses");
const hardhat_network_helpers_1 = require("@nomicfoundation/hardhat-network-helpers");
const _deployContracts_1 = require("scripts/_deployContracts");
const utils_1 = require("ethers/lib/utils");
let deployer;
let user1;
let deployerAddress;
let user1Address;
let txResult;
let wethTokenContract;
let tokenContract;
let swapperContract;
let swapperContractAddress;
const INTIAL_MINT = hardhat_1.ethers.parseEther("1000");
const AMOUNT_TO_SWAP = hardhat_1.ethers.parseEther("10");
const INITIAL_VALUATION = hardhat_1.ethers.parseEther("100");
const NETWORK = "MAINNET";
describe("Swapper Tests -->> LIVE TESTS MAINNET FORK", function () {
    this.timeout(60000);
    before(async () => {
        [deployer, user1] = await hardhat_1.ethers.getSigners();
        deployerAddress = await deployer.getAddress();
        user1Address = await user1.getAddress();
        const ERC20MockFactory = await hardhat_1.ethers.getContractFactory("ERC20Mock");
        tokenContract = (await ERC20MockFactory.deploy("TKN", "TKN", 18));
        await tokenContract.waitForDeployment();
        await tokenContract.mint(deployerAddress, INTIAL_MINT);
        await (0, hardhat_network_helpers_1.setBalance)(await tokenContract.getAddress(), INTIAL_MINT);
        wethTokenContract = (await (0, emulation_1.getWethContract)(_deployAddresses_1.constants[NETWORK].weth, deployer));
        swapperContract = (await (0, _deployContracts_1.deploySwapper)("Swapper", 2, deployerAddress));
        swapperContractAddress = await swapperContract.getAddress();
    });
    describe("WHEN configuring and using the Swapper contract", function () {
        let dexData;
        before(async () => {
            dexData = {
                dexLocation: _deployAddresses_1.constants[NETWORK].one_inch,
                swapFunction: utils_1.defaultAbiCoder.encode(["address", "uint256", "bytes"], [deployerAddress, AMOUNT_TO_SWAP, "0x"]),
            };
            await swapperContract.setDexData(await tokenContract.getAddress(), _deployAddresses_1.constants[NETWORK].weth, dexData);
        });
        it("THEN it should execute a swap successfully", async () => {
            await tokenContract.approve(swapperContractAddress, AMOUNT_TO_SWAP);
            txResult = await swapperContract.swap(deployerAddress, deployerAddress, AMOUNT_TO_SWAP, await tokenContract.getAddress(), _deployAddresses_1.constants[NETWORK].weth, 400, 0);
            await (0, chai_1.expect)(txResult)
                .to.emit(swapperContract, "SwapExecuted")
                .withArgs(deployerAddress, deployerAddress, await tokenContract.getAddress(), _deployAddresses_1.constants[NETWORK].weth, AMOUNT_TO_SWAP, 1);
        });
    });
});
chai.Assertion.addMethod("closeToBigInt", function (expected, tolerance) {
    const actual = this._obj;
    this.assert(actual >= expected - tolerance && actual <= expected + tolerance, "expected #{this} to be close to #{exp} +/- #{tol}", "expected #{this} not to be close to #{exp} +/- #{tol}", expected, actual);
});
//# sourceMappingURL=swapper.live.test.js.map