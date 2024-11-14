"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
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
let kelpAdapterFactory;
let kelpAdapterContract;
let kelpMockContact;
let protocolAddress;
let rsETH;
let rsETHAddress;
let stETH;
let stETHAddress;
let tokenAmount;
describe("Kelp Protocol Tests", function () {
    before(async () => {
        [deployer, sender, receiver] = await hardhat_1.ethers.getSigners();
        tokenAmount = hardhat_1.ethers.parseEther("100");
        rsETH = await (await hardhat_1.ethers.getContractFactory("WETHMock")).deploy();
        rsETHAddress = await rsETH.getAddress();
        kelpMockContact = await (await hardhat_1.ethers.getContractFactory("KelpMock")).deploy(rsETHAddress);
        protocolAddress = await kelpMockContact.getAddress();
        stETH = await (await hardhat_1.ethers.getContractFactory("WETHMock")).deploy();
        stETHAddress = await stETH.getAddress();
        kelpAdapterFactory = await hardhat_1.ethers.getContractFactory("KelpAdapter");
    });
    describe("WHEN trying to deploy kelpAdapter contract with incorrect parameters", function () {
        it("THEN it should FAIL when protocolAddress is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(kelpAdapterFactory, [constants_1.ZERO_ADDRESS, rsETHAddress]))
                .to.be.revertedWithCustomError(kelpAdapterFactory, "ZeroAddress")
                .withArgs("kelpProtocolAddress_");
        });
        it("THEN it should FAIL when rsETHAddress_ is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(kelpAdapterFactory, [protocolAddress, constants_1.ZERO_ADDRESS]))
                .to.be.revertedWithCustomError(kelpAdapterFactory, "ZeroAddress")
                .withArgs("rsETHAddress_");
        });
        it("THEN it should FAIL when contract has been initalized already", async () => {
            kelpAdapterContract = (await (0, _deployContracts_1.deployKelpAdapter)("KelpAdapter", protocolAddress, rsETHAddress));
            await (0, chai_1.expect)(kelpAdapterContract.initialize(protocolAddress, rsETHAddress)).to.be.revertedWithCustomError(kelpAdapterFactory, "InvalidInitialization");
        });
    });
    describe("WHEN deploying kelpAdapter contract with correct parameters", function () {
        before(async () => {
            kelpAdapterContract = (await (0, _deployContracts_1.deployKelpAdapter)("KelpAdapter", protocolAddress, rsETHAddress));
            await kelpAdapterContract.grantRole(await kelpAdapterContract.VAULT_STRATEGY_ROLE(), await deployer.getAddress());
            snapshot = await (0, hardhat_network_helpers_1.takeSnapshot)();
        });
        it("THEN contract init functions should match", async () => {
            (0, chai_1.expect)(await kelpAdapterContract.kelpProtocolAddress()).equals(protocolAddress);
            (0, chai_1.expect)(await kelpAdapterContract.getProtocol()).equals(protocolAddress);
        });
        describe("WHEN trying to execute deposit", () => {
            describe("WHEN the adapter has been paused", () => {
                it("THEN it should FAIL", async () => {
                    await kelpAdapterContract.pause();
                    await (0, chai_1.expect)(kelpAdapterContract
                        .connect(sender)
                        .deposit(sender, receiver, rsETHAddress, tokenAmount, true)).to.be.revertedWithCustomError(kelpAdapterContract, "EnforcedPause");
                });
            });
            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(kelpAdapterContract
                        .connect(sender)
                        .deposit(sender, receiver, stETHAddress, tokenAmount, true)).to.be.revertedWithCustomError(kelpAdapterContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN token amount less than min deposit", () => {
                before(async () => {
                    await stETH.mint(await sender.getAddress(), tokenAmount);
                    await stETH
                        .connect(sender)
                        .approve(await kelpAdapterContract.getAddress(), tokenAmount);
                    snapshot = await (0, hardhat_network_helpers_1.takeSnapshot)();
                });
                this.afterEach(async () => {
                    await snapshot.restore();
                });
                it("THEN it should fail with MinDeposit", async () => {
                    await kelpMockContact.setminAmountToDeposit(ethers_1.MaxUint256);
                    await (0, chai_1.expect)(kelpAdapterContract.deposit(sender, receiver, stETHAddress, tokenAmount, false)).to.be.revertedWithCustomError(kelpAdapterContract, "MinDeposit");
                });
            });
            describe("WHEN token amount more than protocol capacity", () => {
                before(async () => {
                    await stETH.mint(await sender.getAddress(), tokenAmount);
                    await stETH
                        .connect(sender)
                        .approve(await kelpAdapterContract.getAddress(), tokenAmount);
                    snapshot = await (0, hardhat_network_helpers_1.takeSnapshot)();
                });
                this.afterEach(async () => {
                    await snapshot.restore();
                });
                it("THEN it should fail with ExceedCapacity", async () => {
                    await (0, chai_1.expect)(kelpAdapterContract.deposit(sender, receiver, stETHAddress, tokenAmount, false)).to.be.revertedWithCustomError(kelpAdapterContract, "ExceedCapacity");
                });
            });
            describe("WHEN calling with invalid parameters", () => {
                describe("WHEN sender is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(kelpAdapterContract.deposit(constants_1.ZERO_ADDRESS, receiver, stETHAddress, 1, false))
                            .to.be.revertedWithCustomError(kelpAdapterContract, "ZeroAddress")
                            .withArgs("sender_");
                    });
                });
                describe("WHEN receiver is ZERO address", () => {
                    it("THEN it should FAIL ", async () => {
                        await (0, chai_1.expect)(kelpAdapterContract.deposit(sender, constants_1.ZERO_ADDRESS, stETHAddress, 1, false))
                            .to.be.revertedWithCustomError(kelpAdapterContract, "ZeroAddress")
                            .withArgs("receiver_");
                    });
                });
                describe("WHEN token is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(kelpAdapterContract.deposit(sender, receiver, constants_1.ZERO_ADDRESS, 1, false))
                            .to.be.revertedWithCustomError(kelpAdapterContract, "ZeroAddress")
                            .withArgs("token_");
                    });
                });
                describe("WHEN tokenAmount is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(kelpAdapterContract.deposit(sender, receiver, stETHAddress, 0, false))
                            .to.be.revertedWithCustomError(kelpAdapterContract, "ZeroAmount")
                            .withArgs("tokenAmount_");
                    });
                });
            });
            describe("WHEN calling with valid parameters", () => {
                before(async () => {
                    await stETH.mint(await sender.getAddress(), tokenAmount);
                    await stETH
                        .connect(sender)
                        .approve(await kelpAdapterContract.getAddress(), tokenAmount);
                    snapshot = await (0, hardhat_network_helpers_1.takeSnapshot)();
                });
                this.afterEach(async () => {
                    await snapshot.restore();
                });
                describe("WHEN calling deposit", () => {
                    before(async () => {
                        await kelpMockContact.setAssetCurrentLimit(ethers_1.MaxUint256);
                        await kelpMockContact.setrsETHAmountToMint(tokenAmount);
                        txResult = await kelpAdapterContract.deposit(sender, receiver, stETHAddress, tokenAmount, false);
                    });
                    it("THEN event DepositedOnProtocol should be emitted", async () => {
                        await (0, chai_1.expect)(txResult).to.emit(kelpAdapterContract, "DepositedOnProtocol");
                    });
                });
            });
        });
        describe("WHEN trying to set protocol address", () => {
            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(kelpAdapterContract
                        .connect(receiver)
                        .setKelpProtocolAddress(protocolAddress)).to.be.revertedWithCustomError(kelpAdapterContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN protocol address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(kelpAdapterContract.setKelpProtocolAddress(constants_1.ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(kelpAdapterContract, "ZeroAddress")
                        .withArgs("kelpProtocolAddress_");
                });
            });
            describe("WHEN protocol address is correct", () => {
                before(async () => {
                    txResult = await kelpAdapterContract.setKelpProtocolAddress(protocolAddress);
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(kelpAdapterContract, "AddressUpdated")
                        .withArgs("kelpProtocolAddress_", protocolAddress);
                });
            });
        });
        describe("WHEN trying to call withdraw", () => {
            it("THEN it should FAIL", async () => {
                await (0, chai_1.expect)(kelpAdapterContract.withdraw(constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, 0, constants_1.ZERO_ADDRESS, 0, "0x00")).to.be.revertedWith(await kelpAdapterContract.REVERT_MSG());
            });
        });
        describe("WHEN trying to call claimEarnings", () => {
            it("THEN it should FAIL", async () => {
                await (0, chai_1.expect)(kelpAdapterContract.claimEarnings(constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS)).to.be.revertedWith(await kelpAdapterContract.REVERT_MSG());
            });
        });
        describe("WHEN trying to call getTokenPrice", () => {
            it("THEN it should FAIL", async () => {
                await (0, chai_1.expect)(kelpAdapterContract.getTokenPrice(constants_1.ZERO_ADDRESS)).to.be.revertedWith(await kelpAdapterContract.REVERT_MSG());
            });
        });
    });
});
//# sourceMappingURL=kelpAdapter.test.js.map