"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const chai_1 = require("chai");
const hardhat_network_helpers_1 = require("@nomicfoundation/hardhat-network-helpers");
const constants_1 = require("../../_helpers/constants");
const _deployContracts_1 = require("../../../scripts/_deployContracts");
let snapshot;
let deployer;
let sender;
let receiver;
let txResult;
let fraxAdapterFactory;
let fraxAdapterContract;
let fraxMinterMock;
let frxETH;
let sfrxETH;
let weth;
let frxETHAddress;
let sfrxETHAddress;
let protocolAddress;
let wethAddress;
let tokenAmount;
describe("Frax Protocol Tests", function () {
    before(async () => {
        [deployer, sender, receiver] = await hardhat_1.ethers.getSigners();
        tokenAmount = hardhat_1.ethers.parseEther("100");
        frxETH = await (await hardhat_1.ethers.getContractFactory("FraxETHMock")).deploy();
        frxETHAddress = await frxETH.getAddress();
        sfrxETH = await (await hardhat_1.ethers.getContractFactory("SfrxETHMock")).deploy();
        sfrxETHAddress = await sfrxETH.getAddress();
        fraxMinterMock = await (await hardhat_1.ethers.getContractFactory("FraxMinterMock")).deploy(frxETHAddress, sfrxETHAddress);
        protocolAddress = await fraxMinterMock.getAddress();
        weth = await (await hardhat_1.ethers.getContractFactory("WETHMock")).deploy();
        wethAddress = await weth.getAddress();
        fraxAdapterFactory = await hardhat_1.ethers.getContractFactory("FraxAdapter");
    });
    describe("WHEN trying to deploy FraxAdapter contract with incorrect parameters", function () {
        it("THEN it should FAIL when protocolAddress is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(fraxAdapterFactory, [constants_1.ZERO_ADDRESS, frxETHAddress, sfrxETHAddress]))
                .to.be.reverted;
        });
        it("THEN it should FAIL when frxETHAddress is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(fraxAdapterFactory, [protocolAddress, constants_1.ZERO_ADDRESS, sfrxETHAddress]))
                .to.be.reverted;
        });
        it("THEN it should FAIL when sfrxETHAddress is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(fraxAdapterFactory, [protocolAddress, frxETHAddress, constants_1.ZERO_ADDRESS]))
                .to.be.reverted;
        });
    });
    describe("WHEN deploying FraxAdapter contract with correct parameters", function () {
        before(async () => {
            fraxAdapterContract = (await (0, _deployContracts_1.deployFraxAdapter)("FraxAdapter", protocolAddress, frxETHAddress, sfrxETHAddress, wethAddress));
            await fraxAdapterContract.grantRole(await fraxAdapterContract.VAULT_STRATEGY_ROLE(), await deployer.getAddress());
            snapshot = await (0, hardhat_network_helpers_1.takeSnapshot)();
        });
        it("THEN contract init functions should match", async () => {
            (0, chai_1.expect)(await fraxAdapterContract.getProtocol()).equals(protocolAddress);
            (0, chai_1.expect)(await fraxAdapterContract.frxETHAddress()).equals(frxETHAddress);
            (0, chai_1.expect)(await fraxAdapterContract.sfrxETHAddress()).equals(sfrxETHAddress);
        });
        describe("WHEN trying to execute deposit", () => {
            describe("WHEN the adapter has been paused", () => {
                it("THEN it should FAIL", async () => {
                    await fraxAdapterContract.pause();
                    await (0, chai_1.expect)(fraxAdapterContract
                        .connect(sender)
                        .deposit(sender, receiver, wethAddress, tokenAmount, false)).to.be.revertedWith("Pausable: paused");
                });
            });
            describe("WHEN the caller is not granted the right role", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(fraxAdapterContract
                        .connect(sender)
                        .deposit(sender, receiver, wethAddress, tokenAmount, false)).to.be.revertedWith("AccessControl: account");
                });
            });
            describe("WHEN calling with invalid parameters", () => {
                describe("WHEN sender is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(fraxAdapterContract.deposit(constants_1.ZERO_ADDRESS, receiver, wethAddress, 1, false)).to.be.revertedWith("ZeroAddress");
                    });
                });
                describe("WHEN receiver is ZERO address", () => {
                    it("THEN it should FAIL ", async () => {
                        await (0, chai_1.expect)(fraxAdapterContract.deposit(sender, constants_1.ZERO_ADDRESS, wethAddress, 1, false)).to.be.revertedWith("ZeroAddress");
                    });
                });
                describe("WHEN token is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(fraxAdapterContract.deposit(sender, receiver, constants_1.ZERO_ADDRESS, 1, false)).to.be.revertedWith("ZeroAddress");
                    });
                });
                describe("WHEN tokenAmount is ZERO", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(fraxAdapterContract.deposit(sender, receiver, wethAddress, 0, false)).to.be.revertedWith("ZeroAmount");
                    });
                });
            });
            describe("WHEN calling with valid parameters", () => {
                before(async () => {
                    await weth.mint(await sender.getAddress(), tokenAmount);
                    await weth
                        .connect(sender)
                        .approve(await fraxAdapterContract.getAddress(), tokenAmount);
                    snapshot = await (0, hardhat_network_helpers_1.takeSnapshot)();
                });
                this.afterEach(async () => {
                    await snapshot.restore();
                });
                describe("WHEN calling deposit", () => {
                    before(async () => {
                        txResult = await fraxAdapterContract.deposit(sender, receiver, wethAddress, tokenAmount, false);
                    });
                    it("THEN event DepositedOnProtocol should be emitted", async () => {
                        await (0, chai_1.expect)(txResult).to.emit(fraxAdapterContract, "DepositedOnProtocol");
                    });
                });
            });
        });
        describe("WHEN trying to set protocol address", () => {
            describe("WHEN the caller is not granted the right role", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(fraxAdapterContract
                        .connect(receiver)
                        .setMinterAddress(protocolAddress)).to.be.revertedWith("AccessControl: account");
                });
            });
            describe("WHEN protocol address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(fraxAdapterContract.setMinterAddress(constants_1.ZERO_ADDRESS))
                        .to.be.revertedWith("ZeroAddress");
                });
            });
            describe("WHEN protocol address is correct", () => {
                before(async () => {
                    txResult = await fraxAdapterContract.setMinterAddress(protocolAddress);
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(fraxAdapterContract, "AddressUpdated")
                        .withArgs("minterAddress_", protocolAddress);
                });
            });
        });
        describe("WHEN trying to call unsupported functions", () => {
            it("THEN it should fail when calling withdraw", async () => {
                await (0, chai_1.expect)(fraxAdapterContract.withdraw(constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, 0, constants_1.ZERO_ADDRESS, 0, "0x00")).to.be.revertedWith(await fraxAdapterContract.REVERT_MSG());
            });
            it("THEN it should fail when calling claimEarnings", async () => {
                await (0, chai_1.expect)(fraxAdapterContract.claimEarnings(constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS))
                    .to.be.revertedWith(await fraxAdapterContract.REVERT_MSG());
            });
        });
    });
});
//# sourceMappingURL=fraxAdapter.test.js.map