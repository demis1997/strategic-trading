"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const chai_1 = require("chai");
const hardhat_network_helpers_1 = require("@nomicfoundation/hardhat-network-helpers");
const constants_1 = require("../_helpers/constants");
const _deployContracts_1 = require("../../scripts/_deployContracts");
let snapshot;
let deployer;
let strategy;
let vault;
let txResult;
let SwapperContract;
let GenericRouterContract;
let genericRouterAddress;
let MockAggregationExecutorContract;
let mockAggregationExecutorAddress;
let TokenContract;
let tokenAddress;
describe("Swapper Tests", function () {
    before(async () => {
        [deployer, strategy, vault] = await hardhat_1.ethers.getSigners();
        MockAggregationExecutorContract = await (await hardhat_1.ethers.getContractFactory("MockAggregationExecutor")).deploy();
        mockAggregationExecutorAddress = await MockAggregationExecutorContract.getAddress();
        GenericRouterContract = await (await hardhat_1.ethers.getContractFactory("GenericRouter")).deploy();
        genericRouterAddress = await GenericRouterContract.getAddress();
        TokenContract = await (await hardhat_1.ethers.getContractFactory("ERC20Mock")).deploy("TKN", "TKN", 18);
        tokenAddress = await TokenContract.getAddress();
    });
    describe("WHEN trying to deploy Swapper contract with incorrect parameters", function () {
        it("THEN it should FAIL when defaultSlippage is 0", async () => {
            const SwapperFactory = await hardhat_1.ethers.getContractFactory("Swapper");
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(SwapperFactory, [0, await deployer.getAddress()])).to.be.revertedWithCustomError(SwapperFactory, "InvalidSlippage").withArgs(0);
        });
        it("THEN it should FAIL when adminAddress is ZERO address", async () => {
            const SwapperFactory = await hardhat_1.ethers.getContractFactory("Swapper");
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(SwapperFactory, [400, constants_1.ZERO_ADDRESS])).to.be.revertedWithCustomError(SwapperFactory, "InvalidAddress").withArgs(constants_1.ZERO_ADDRESS);
        });
    });
    describe("WHEN deploying Swapper contract with correct parameters", function () {
        before(async () => {
            SwapperContract = await (0, _deployContracts_1.deploySwapper)("Swapper", 400, await deployer.getAddress());
            await SwapperContract.grantRole(await SwapperContract.SWAPPER_EXECUTOR(), await deployer.getAddress());
            await SwapperContract.grantRole(await SwapperContract.SWAPPER_RESOLVER(), await deployer.getAddress());
            snapshot = await (0, hardhat_network_helpers_1.takeSnapshot)();
        });
        it("THEN contract init functions should match", async () => {
            (0, chai_1.expect)(await SwapperContract.defaultSlippage()).equals(400);
        });
        describe("WHEN trying to set DexData", () => {
            it("THEN it should FAIL when tokenIn is ZERO address", async () => {
                await (0, chai_1.expect)(SwapperContract.setDexData(constants_1.ZERO_ADDRESS, tokenAddress, {
                    dexLocation: genericRouterAddress,
                    swapFunction: "0x00",
                })).to.be.revertedWithCustomError(SwapperContract, "ZeroAddressNotAllowed");
            });
            it("THEN it should FAIL when tokenOut is ZERO address", async () => {
                await (0, chai_1.expect)(SwapperContract.setDexData(tokenAddress, constants_1.ZERO_ADDRESS, {
                    dexLocation: genericRouterAddress,
                    swapFunction: "0x00",
                })).to.be.revertedWithCustomError(SwapperContract, "ZeroAddressNotAllowed");
            });
            it("THEN it should set the DexData correctly", async () => {
                await SwapperContract.setDexData(tokenAddress, tokenAddress, {
                    dexLocation: genericRouterAddress,
                    swapFunction: MockAggregationExecutorContract.interface.encodeFunctionData("execute", [
                        await strategy.getAddress(),
                        hardhat_1.ethers.parseEther("1"),
                        "0x00"
                    ]),
                });
                const dexData = await SwapperContract.swapData(tokenAddress, tokenAddress);
                (0, chai_1.expect)(dexData.dexLocation).to.equal(genericRouterAddress);
                (0, chai_1.expect)(dexData.swapFunction).to.equal(MockAggregationExecutorContract.interface.encodeFunctionData("execute", [
                    await strategy.getAddress(),
                    hardhat_1.ethers.parseEther("1"),
                    "0x00"
                ]));
            });
        });
        describe("WHEN trying to swap tokens", () => {
            before(async () => {
                await TokenContract.mint(strategy, hardhat_1.ethers.parseEther("1000"));
                await TokenContract.connect(strategy).approve(await SwapperContract.getAddress(), hardhat_1.ethers.parseEther("1000"));
                await SwapperContract.setDexData(tokenAddress, tokenAddress, {
                    dexLocation: genericRouterAddress,
                    swapFunction: MockAggregationExecutorContract.interface.encodeFunctionData("execute", [
                        await strategy.getAddress(),
                        hardhat_1.ethers.parseEther("1"),
                        "0x00"
                    ]),
                });
            });
            it("THEN it should FAIL when owner is ZERO address", async () => {
                await (0, chai_1.expect)(SwapperContract.swap(constants_1.ZERO_ADDRESS, vault, hardhat_1.ethers.parseEther("1"), tokenAddress, tokenAddress, 400, 0)).to.be.revertedWith("ERC20: transfer from the zero address");
            });
            it("THEN it should FAIL when receiver is ZERO address", async () => {
                await (0, chai_1.expect)(SwapperContract.swap(await strategy.getAddress(), constants_1.ZERO_ADDRESS, hardhat_1.ethers.parseEther("1"), tokenAddress, tokenAddress, 400, 0)).to.be.revertedWith("Swap execution failed");
            });
        });
    });
});
//# sourceMappingURL=swapper.test.js.map