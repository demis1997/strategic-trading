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
let rocketAdapterFactory;
let rocketAdapterContract;
let rocketMockContact;
let protocolAddress;
let rocketSettingsMockContact;
let rocketSettingsMockAddress;
let WETHContract;
let wethAddress;
let rETH;
let rETHAddress;
let tokenAmount;
describe("Rocket Protocol Tests", function () {
    before(async () => {
        [deployer, sender, receiver] = await hardhat_1.ethers.getSigners();
        tokenAmount = hardhat_1.ethers.parseEther("1");
        WETHContract = await (await hardhat_1.ethers.getContractFactory("WETHMock")).deploy();
        wethAddress = await WETHContract.getAddress();
        await (0, hardhat_network_helpers_1.setBalance)(wethAddress, hardhat_1.ethers.parseEther("10000"));
        rETH = await (await hardhat_1.ethers.getContractFactory("RETHMock")).deploy();
        rETHAddress = await rETH.getAddress();
        rocketMockContact = await (await hardhat_1.ethers.getContractFactory("RocketPoolMock")).deploy(rETHAddress);
        protocolAddress = await rocketMockContact.getAddress();
        rocketSettingsMockContact = await (await hardhat_1.ethers.getContractFactory("RocketSettingsMock")).deploy();
        rocketSettingsMockAddress = await rocketSettingsMockContact.getAddress();
        rocketAdapterFactory = await hardhat_1.ethers.getContractFactory("RocketAdapter");
    });
    describe("WHEN trying to deploy rocketAdapter contract with incorrect parameters", function () {
        it("THEN it should FAIL when protocolAddress is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(rocketAdapterFactory, [
                constants_1.ZERO_ADDRESS,
                rocketSettingsMockAddress,
                wethAddress,
                rETHAddress,
            ]))
                .to.be.revertedWithCustomError(rocketAdapterFactory, "ZeroAddress")
                .withArgs("protocolAddress_");
        });
        it("THEN it should FAIL when rocket settings is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(rocketAdapterFactory, [
                protocolAddress,
                constants_1.ZERO_ADDRESS,
                wethAddress,
                rETHAddress,
            ]))
                .to.be.revertedWithCustomError(rocketAdapterFactory, "ZeroAddress")
                .withArgs("rocketSettingsAddress_");
        });
        it("THEN it should FAIL when WETH is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(rocketAdapterFactory, [
                protocolAddress,
                rocketSettingsMockAddress,
                constants_1.ZERO_ADDRESS,
                rETHAddress,
            ]))
                .to.be.revertedWithCustomError(rocketAdapterFactory, "ZeroAddress")
                .withArgs("wethAddress_");
        });
        it("THEN it should FAIL when rETH is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(rocketAdapterFactory, [
                protocolAddress,
                rocketSettingsMockAddress,
                wethAddress,
                constants_1.ZERO_ADDRESS,
            ]))
                .to.be.revertedWithCustomError(rocketAdapterFactory, "ZeroAddress")
                .withArgs("rETHAddress_");
        });
        it("THEN it should FAIL when contract has been initalized already", async () => {
            rocketAdapterContract = (await (0, _deployContracts_1.deployRocketAdapter)("RocketAdapter", protocolAddress, rocketSettingsMockAddress, wethAddress, rETHAddress));
            await (0, chai_1.expect)(rocketAdapterContract.initialize(protocolAddress, rocketSettingsMockAddress, wethAddress, rETHAddress)).to.be.revertedWithCustomError(rocketAdapterFactory, "InvalidInitialization");
        });
    });
    describe("WHEN deploying rocketAdapter contract with correct parameters", function () {
        before(async () => {
            rocketAdapterContract = (await (0, _deployContracts_1.deployRocketAdapter)("RocketAdapter", protocolAddress, rocketSettingsMockAddress, wethAddress, rETHAddress));
            await rocketAdapterContract.grantRole(await rocketAdapterContract.VAULT_STRATEGY_ROLE(), await deployer.getAddress());
            await rocketSettingsMockContact.setDepositEnabled(true);
            await rocketSettingsMockContact.setMinimumDeposit(0);
            await rocketSettingsMockContact.setMaximumDepositPoolSize(0);
            await rocketMockContact.setBalance(tokenAmount);
            await rETH.setExchangeRate(1);
            snapshot = await (0, hardhat_network_helpers_1.takeSnapshot)();
        });
        it("THEN contract init functions should match", async () => {
            (0, chai_1.expect)(await rocketAdapterContract.protocolAddress()).equals(protocolAddress);
            (0, chai_1.expect)(await rocketAdapterContract.getProtocol()).equals(protocolAddress);
            (0, chai_1.expect)(await rocketAdapterContract.rETHAddress()).equals(rETHAddress);
            (0, chai_1.expect)(await rocketAdapterContract.rocketSettingsAddress()).equals(rocketSettingsMockAddress);
            (0, chai_1.expect)(await rocketAdapterContract.protocolName()).equals("Rocket");
            (0, chai_1.expect)(await rocketAdapterContract.getSlippage()).equals(hardhat_1.ethers.parseEther("0.1"));
        });
        describe("WHEN trying to execute deposit", () => {
            describe("WHEN the adapter has been paused", () => {
                it("THEN it should FAIL", async () => {
                    await rocketAdapterContract.pause();
                    await (0, chai_1.expect)(rocketAdapterContract
                        .connect(sender)
                        .deposit(sender, receiver, rETHAddress, tokenAmount, true)).to.be.revertedWithCustomError(rocketAdapterContract, "EnforcedPause");
                });
            });
            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(rocketAdapterContract
                        .connect(sender)
                        .deposit(sender, receiver, wethAddress, tokenAmount, true)).to.be.revertedWithCustomError(rocketAdapterContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN token amount less than min deposit", () => {
                before(async () => {
                    await WETHContract.mint(await sender.getAddress(), tokenAmount);
                    await WETHContract.connect(sender).approve(await rocketAdapterContract.getAddress(), tokenAmount);
                });
                it("THEN it should fail with MinDeposit", async () => {
                    await rocketSettingsMockContact.setMinimumDeposit(ethers_1.MaxUint256);
                    await (0, chai_1.expect)(rocketAdapterContract.deposit(sender, receiver, wethAddress, tokenAmount, false)).to.be.revertedWithCustomError(rocketAdapterContract, "MinDeposit");
                });
            });
            describe("WHEN token amount more than protocol capacity", () => {
                before(async () => {
                    await WETHContract.mint(await sender.getAddress(), tokenAmount);
                    await WETHContract.connect(sender).approve(await rocketAdapterContract.getAddress(), tokenAmount);
                });
                it("THEN it should fail with ExceedCapacity", async () => {
                    await (0, chai_1.expect)(rocketAdapterContract.deposit(sender, receiver, wethAddress, tokenAmount, false)).to.be.revertedWithCustomError(rocketAdapterContract, "ExceedCapacity");
                });
            });
            describe("WHEN token is not WETH", () => {
                it("THEN it should fail with OnlyWETHAllowed", async () => {
                    await (0, chai_1.expect)(rocketAdapterContract.deposit(sender, receiver, rETHAddress, tokenAmount, false)).to.be.revertedWithCustomError(rocketAdapterContract, "OnlyWETHAllowed");
                });
            });
            describe("WHEN staking is paused", () => {
                before(async () => {
                    await WETHContract.mint(await sender.getAddress(), tokenAmount);
                    await WETHContract.connect(sender).approve(await rocketAdapterContract.getAddress(), tokenAmount);
                    await rocketSettingsMockContact.setDepositEnabled(false);
                });
                it("THEN it should fail with StakingPaused", async () => {
                    await (0, chai_1.expect)(rocketAdapterContract.deposit(sender, receiver, wethAddress, tokenAmount, false)).to.be.revertedWithCustomError(rocketAdapterContract, "StakingPaused");
                });
            });
            describe("WHEN calling with invalid parameters", () => {
                describe("WHEN sender is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(rocketAdapterContract.deposit(constants_1.ZERO_ADDRESS, receiver, wethAddress, 1, false))
                            .to.be.revertedWithCustomError(rocketAdapterContract, "ZeroAddress")
                            .withArgs("sender_");
                    });
                });
                describe("WHEN receiver is ZERO address", () => {
                    it("THEN it should FAIL ", async () => {
                        await (0, chai_1.expect)(rocketAdapterContract.deposit(sender, constants_1.ZERO_ADDRESS, wethAddress, 1, false))
                            .to.be.revertedWithCustomError(rocketAdapterContract, "ZeroAddress")
                            .withArgs("receiver_");
                    });
                });
                describe("WHEN token is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(rocketAdapterContract.deposit(sender, receiver, constants_1.ZERO_ADDRESS, 1, false))
                            .to.be.revertedWithCustomError(rocketAdapterContract, "ZeroAddress")
                            .withArgs("token_");
                    });
                });
                describe("WHEN tokenAmount is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(rocketAdapterContract.deposit(sender, receiver, wethAddress, 0, false))
                            .to.be.revertedWithCustomError(rocketAdapterContract, "ZeroAmount")
                            .withArgs("tokenAmount_");
                    });
                });
            });
            describe("WHEN calling with valid parameters", () => {
                before(async () => {
                    await WETHContract.mint(await sender.getAddress(), tokenAmount);
                    await WETHContract.connect(sender).approve(await rocketAdapterContract.getAddress(), tokenAmount);
                    snapshot = await (0, hardhat_network_helpers_1.takeSnapshot)();
                });
                this.afterEach(async () => {
                    await snapshot.restore();
                });
                describe("WHEN calling deposit", () => {
                    before(async () => {
                        await rocketSettingsMockContact.setMaximumDepositPoolSize(ethers_1.MaxUint256);
                        txResult = await rocketAdapterContract.deposit(sender, receiver, wethAddress, tokenAmount, false);
                    });
                    it("THEN event DepositedOnProtocol should be emitted", async () => {
                        await (0, chai_1.expect)(txResult).to.emit(rocketAdapterContract, "DepositedOnProtocol");
                    });
                });
            });
        });
        describe("WHEN trying to set protocol address", () => {
            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(rocketAdapterContract.connect(receiver).setprotocolAddress(protocolAddress)).to.be.revertedWithCustomError(rocketAdapterContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN protocol address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(rocketAdapterContract.setprotocolAddress(constants_1.ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(rocketAdapterContract, "ZeroAddress")
                        .withArgs("protocolAddress_");
                });
            });
            describe("WHEN protocol address is correct", () => {
                before(async () => {
                    txResult = await rocketAdapterContract.setprotocolAddress(protocolAddress);
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(rocketAdapterContract, "AddressUpdated")
                        .withArgs("protocolAddress", protocolAddress);
                });
            });
        });
        describe("WHEN trying to set setRETHAddress address", () => {
            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(rocketAdapterContract.connect(receiver).setRETHAddress(rETHAddress)).to.be.revertedWithCustomError(rocketAdapterContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN protocol address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(rocketAdapterContract.setRETHAddress(constants_1.ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(rocketAdapterContract, "ZeroAddress")
                        .withArgs("rETHAddress_");
                });
            });
            describe("WHEN protocol address is correct", () => {
                before(async () => {
                    txResult = await rocketAdapterContract.setRETHAddress(rETHAddress);
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(rocketAdapterContract, "AddressUpdated")
                        .withArgs("rETHAddress", rETHAddress);
                });
            });
        });
        describe("WHEN trying to call withdraw", () => {
            describe("WHEN ethValue exceed total collateral", () => {
                it("THEN it should fail", async () => {
                    await (0, chai_1.expect)(rocketAdapterContract.withdraw(receiver, sender, wethAddress, 1, rETHAddress, 1, "0x00")).to.be.revertedWithoutReason();
                });
            });
            describe("WHEN executing the withdraw", () => {
                it("THEN it should emit event", async () => {
                    await rETH.setTotalCollateral(ethers_1.MaxUint256);
                    await (0, hardhat_network_helpers_1.setBalance)(await rocketAdapterContract.getAddress(), hardhat_1.ethers.parseEther("1000"));
                    await rETH.mint(receiver, 1);
                    await WETHContract.mint(await rocketAdapterContract.getAddress(), hardhat_1.ethers.parseEther("100"));
                    await rETH
                        .connect(receiver)
                        .approve(await rocketAdapterContract.getAddress(), ethers_1.MaxUint256);
                    txResult = await rocketAdapterContract.withdraw(receiver, sender, wethAddress, 1, rETHAddress, 1, "0x00");
                    await (0, chai_1.expect)(txResult).to.emit(rocketAdapterContract, "WithdrawFromProtocol");
                });
            });
        });
        describe("WHEN trying to call claimEarnings", () => {
            it("THEN it should FAIL", async () => {
                await (0, chai_1.expect)(rocketAdapterContract.claimEarnings(constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS)).to.be.revertedWith(await rocketAdapterContract.REVERT_MSG());
            });
        });
        describe("WHEN trying to call getTokenPrice", () => {
            it("THEN it should return a value", async () => {
                (0, chai_1.expect)(await rocketAdapterContract.getTokenPrice(constants_1.ZERO_ADDRESS)).to.be.equal(1);
            });
        });
    });
});
//# sourceMappingURL=rocketAdapter.test.js.map