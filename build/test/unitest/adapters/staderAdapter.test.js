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
let staderAdapterFactory;
let staderAdapterContract;
let staderMockContact;
let protocolAddress;
let WETHContract;
let wethAddress;
let ethxContract;
let ethxAddress;
let tokenAmount;
describe("Vaults Registry Tests", function () {
    before(async () => {
        [deployer, sender, receiver] = await hardhat_1.ethers.getSigners();
        tokenAmount = hardhat_1.ethers.parseEther("1");
        staderMockContact = await (await hardhat_1.ethers.getContractFactory("StaderMock")).deploy();
        protocolAddress = await staderMockContact.getAddress();
        WETHContract = await (await hardhat_1.ethers.getContractFactory("WETHMock")).deploy();
        wethAddress = await WETHContract.getAddress();
        ethxContract = await (await hardhat_1.ethers.getContractFactory("WETHMock")).deploy();
        ethxAddress = await ethxContract.getAddress();
        await (0, hardhat_network_helpers_1.setBalance)(wethAddress, hardhat_1.ethers.parseEther("100000"));
        staderAdapterFactory = await hardhat_1.ethers.getContractFactory("StaderAdapter");
    });
    describe("WHEN trying to deploy staderAdapter contract with incorrect parameters", function () {
        it("THEN it should FAIL when protocolAddress is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(staderAdapterFactory, [
                constants_1.ZERO_ADDRESS,
                wethAddress,
                ethxAddress,
            ]))
                .to.be.revertedWithCustomError(staderAdapterFactory, "ZeroAddress")
                .withArgs("protocolAddress_");
        });
        it("THEN it should FAIL when ethxAddress is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(staderAdapterFactory, [
                protocolAddress,
                wethAddress,
                constants_1.ZERO_ADDRESS,
            ]))
                .to.be.revertedWithCustomError(staderAdapterFactory, "ZeroAddress")
                .withArgs("ethxAddress_");
        });
        it("THEN it should FAIL when wethAddress is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(staderAdapterFactory, [
                protocolAddress,
                constants_1.ZERO_ADDRESS,
                ethxAddress,
            ]))
                .to.be.revertedWithCustomError(staderAdapterFactory, "ZeroAddress")
                .withArgs("wethAddress_");
        });
        it("THEN it should FAIL when contract has been initalized already", async () => {
            staderAdapterContract = (await (0, _deployContracts_1.deployStaderAdapter)("StaderAdapter", protocolAddress, wethAddress, ethxAddress));
            await (0, chai_1.expect)(staderAdapterContract.initialize(protocolAddress, wethAddress, ethxAddress)).to.be.revertedWithCustomError(staderAdapterFactory, "InvalidInitialization");
        });
    });
    describe("WHEN deploying staderAdapter contract with correct parameters", function () {
        before(async () => {
            staderAdapterContract = (await (0, _deployContracts_1.deployStaderAdapter)("StaderAdapter", protocolAddress, wethAddress, ethxAddress));
            await staderAdapterContract.grantRole(await staderAdapterContract.VAULT_STRATEGY_ROLE(), await deployer.getAddress());
            await WETHContract.mint(sender, hardhat_1.ethers.parseEther("1000"));
            await WETHContract.connect(sender).approve(await staderAdapterContract.getAddress(), ethers_1.MaxUint256);
            snapshot = await (0, hardhat_network_helpers_1.takeSnapshot)();
        });
        it("THEN contract init functions should match", async () => {
            (0, chai_1.expect)(await staderAdapterContract.protocolAddress()).equals(protocolAddress);
            (0, chai_1.expect)(await staderAdapterContract.getProtocol()).equals(protocolAddress);
        });
        describe("WHEN trying to execute deposit", () => {
            this.afterEach(async () => {
                await snapshot.restore();
            });
            describe("WHEN the adapter has been paused", () => {
                it("THEN it should FAIL", async () => {
                    await staderAdapterContract.pause();
                    await (0, chai_1.expect)(staderAdapterContract
                        .connect(sender)
                        .deposit(sender, receiver, wethAddress, tokenAmount, true)).to.be.revertedWithCustomError(staderAdapterContract, "EnforcedPause");
                });
            });
            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(staderAdapterContract
                        .connect(sender)
                        .deposit(sender, receiver, wethAddress, tokenAmount, true)).to.be.revertedWithCustomError(staderAdapterContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN token is no WETH", () => {
                it("THEN it should FAIL with OnlyWETHAllowed", async () => {
                    await (0, chai_1.expect)(staderAdapterContract.deposit(sender, receiver, ethxAddress, tokenAmount, false)).to.be.revertedWithCustomError(staderAdapterContract, "OnlyWETHAllowed");
                });
            });
            describe("WHEN staking paused in protocol", () => {
                before(async () => {
                    await staderMockContact.pause(true);
                });
                it("THEN it should FAIL with StakingPaused", async () => {
                    await (0, chai_1.expect)(staderAdapterContract.deposit(sender, receiver, wethAddress, tokenAmount, false)).to.be.revertedWithCustomError(staderAdapterContract, "StakingPaused");
                });
            });
            describe("WHEN amount exceeds min deposit deposit on protocol", () => {
                before(async () => {
                    await staderMockContact.setMinDeposit(ethers_1.MaxUint256);
                });
                it("THEN it should FAIL with MinDeposit", async () => {
                    await (0, chai_1.expect)(staderAdapterContract.deposit(sender, receiver, wethAddress, tokenAmount, false)).to.be.revertedWithCustomError(staderAdapterContract, "MinDeposit");
                });
            });
            describe("WHEN amount exceeds max deposit deposit on protocol", () => {
                before(async () => {
                    await staderMockContact.setMaxDeposit(0);
                });
                it("THEN it should FAIL with MaxDeposit", async () => {
                    await (0, chai_1.expect)(staderAdapterContract.deposit(sender, receiver, wethAddress, tokenAmount, false)).to.be.revertedWithCustomError(staderAdapterContract, "MaxDeposit");
                });
            });
            describe("WHEN slipage exceeded on deposit", () => {
                it("THEN it should FAIL with SlippageExceededOnDeposit", async () => {
                    await (0, chai_1.expect)(staderAdapterContract.deposit(sender, receiver, wethAddress, tokenAmount, false)).to.be.revertedWithCustomError(staderAdapterContract, "SlippageExceededOnDeposit");
                });
            });
            describe("WHEN calling with invalid parameters", () => {
                describe("WHEN sender is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(staderAdapterContract.deposit(constants_1.ZERO_ADDRESS, receiver, wethAddress, 1, false))
                            .to.be.revertedWithCustomError(staderAdapterContract, "ZeroAddress")
                            .withArgs("sender_");
                    });
                });
                describe("WHEN receiver is ZERO address", () => {
                    it("THEN it should FAIL ", async () => {
                        await (0, chai_1.expect)(staderAdapterContract.deposit(sender, constants_1.ZERO_ADDRESS, wethAddress, 1, false))
                            .to.be.revertedWithCustomError(staderAdapterContract, "ZeroAddress")
                            .withArgs("receiver_");
                    });
                });
                describe("WHEN token is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(staderAdapterContract.deposit(sender, receiver, constants_1.ZERO_ADDRESS, 1, false))
                            .to.be.revertedWithCustomError(staderAdapterContract, "ZeroAddress")
                            .withArgs("token_");
                    });
                });
                describe("WHEN tokenAmount is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(staderAdapterContract.deposit(sender, receiver, wethAddress, 0, false))
                            .to.be.revertedWithCustomError(staderAdapterContract, "ZeroAmount")
                            .withArgs("tokenAmount_");
                    });
                });
            });
            describe("WHEN calling with valid parameters", () => {
                describe("WHEN calling deposit", () => {
                    before(async () => {
                        await ethxContract.mint(staderAdapterContract, ethers_1.MaxUint256);
                        await staderMockContact.setDeposit(tokenAmount);
                        tokenAmount = 1000;
                        txResult = await staderAdapterContract.deposit(sender, receiver, wethAddress, tokenAmount, false);
                    });
                    it("THEN event DepositedOnProtocol should be emitted", async () => {
                        await (0, chai_1.expect)(txResult).to.emit(staderAdapterContract, "DepositedOnProtocol");
                    });
                });
            });
        });
        describe("WHEN trying to set protocol address", () => {
            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(staderAdapterContract.connect(receiver).setprotocolAddress(protocolAddress)).to.be.revertedWithCustomError(staderAdapterContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN protocol address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(staderAdapterContract.setprotocolAddress(constants_1.ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(staderAdapterContract, "ZeroAddress")
                        .withArgs("protocolAddress_");
                });
            });
            describe("WHEN protocol address is correct", () => {
                before(async () => {
                    txResult = await staderAdapterContract.setprotocolAddress(protocolAddress);
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(staderAdapterContract, "AddressUpdated")
                        .withArgs("protocolAddress", protocolAddress);
                });
            });
        });
        describe("WHEN trying to set ethxAddress_ address", () => {
            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(staderAdapterContract.connect(receiver).setETHxAddress(ethxAddress)).to.be.revertedWithCustomError(staderAdapterContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN protocol address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(staderAdapterContract.setETHxAddress(constants_1.ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(staderAdapterContract, "ZeroAddress")
                        .withArgs("ethxAddress_");
                });
            });
            describe("WHEN protocol address is correct", () => {
                before(async () => {
                    txResult = await staderAdapterContract.setETHxAddress(ethxAddress);
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(staderAdapterContract, "AddressUpdated")
                        .withArgs("ethxAddress_", ethxAddress);
                });
            });
        });
        describe("WHEN trying to call withdraw", () => {
            it("THEN it should FAIL", async () => {
                await (0, chai_1.expect)(staderAdapterContract.withdraw(constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, 0, constants_1.ZERO_ADDRESS, 0, "0x00")).to.be.revertedWith(await staderAdapterContract.REVERT_MSG());
            });
        });
        describe("WHEN trying to call claimEarnings", () => {
            it("THEN it should FAIL", async () => {
                await (0, chai_1.expect)(staderAdapterContract.claimEarnings(constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS)).to.be.revertedWith(await staderAdapterContract.REVERT_MSG());
            });
        });
        describe("WHEN trying to call getTokenPrice", () => {
            it("THEN it should FAIL", async () => {
                await (0, chai_1.expect)(staderAdapterContract.getTokenPrice(constants_1.ZERO_ADDRESS)).to.be.revertedWith(await staderAdapterContract.REVERT_MSG());
            });
        });
    });
});
//# sourceMappingURL=staderAdapter.test.js.map