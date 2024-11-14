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
let etherfiAdapterFactory;
let etherfiAdapterContract;
let etherfiMockContact;
let protocolAddress;
let WEETHContract;
let weethAddress;
let eETH;
let eETHAddress;
let stETH;
let stETHAddress;
let tokenAmount;
describe("EtherFi Protocol Tests", function () {
    before(async () => {
        [deployer, sender, receiver] = await hardhat_1.ethers.getSigners();
        tokenAmount = hardhat_1.ethers.parseEther("1");
        eETH = await (await hardhat_1.ethers.getContractFactory("EETHMock")).deploy();
        eETHAddress = await eETH.getAddress();
        stETH = await (await hardhat_1.ethers.getContractFactory("LidoMock")).deploy();
        stETHAddress = await stETH.getAddress();
        WEETHContract = await (await hardhat_1.ethers.getContractFactory("WEETHMock")).deploy(eETHAddress);
        weethAddress = await WEETHContract.getAddress();
        etherfiMockContact = await (await hardhat_1.ethers.getContractFactory("EtherFiMock")).deploy(stETHAddress, eETHAddress);
        protocolAddress = await etherfiMockContact.getAddress();
        etherfiAdapterFactory = await hardhat_1.ethers.getContractFactory("EtherFiAdapter");
    });
    describe("WHEN trying to deploy etherfiAdapter contract with incorrect parameters", function () {
        it("THEN it should FAIL when protocolAddress is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(etherfiAdapterFactory, [
                constants_1.ZERO_ADDRESS,
                eETHAddress,
                weethAddress,
            ]))
                .to.be.revertedWithCustomError(etherfiAdapterFactory, "ZeroAddress")
                .withArgs("liquifierAddress_");
        });
        xit("THEN it should FAIL when WEETH is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(etherfiAdapterFactory, [
                protocolAddress,
                eETHAddress,
                constants_1.ZERO_ADDRESS,
            ]))
                .to.be.revertedWithCustomError(etherfiAdapterFactory, "ZeroAddress")
                .withArgs("weETHAddress");
        });
        it("THEN it should FAIL when eETH is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(etherfiAdapterFactory, [
                protocolAddress,
                constants_1.ZERO_ADDRESS,
                weethAddress,
            ]))
                .to.be.revertedWithCustomError(etherfiAdapterFactory, "ZeroAddress")
                .withArgs("eETHAddress");
        });
        it("THEN it should FAIL when contract has been initalized already", async () => {
            etherfiAdapterContract = (await (0, _deployContracts_1.deployEtherFiAdapter)("EtherFiAdapter", protocolAddress, eETHAddress, weethAddress));
            await (0, chai_1.expect)(etherfiAdapterContract.initialize(protocolAddress, eETHAddress, weethAddress)).to.be.revertedWithCustomError(etherfiAdapterFactory, "InvalidInitialization");
        });
    });
    describe("WHEN deploying etherfiAdapter contract with correct parameters", function () {
        before(async () => {
            etherfiAdapterContract = (await (0, _deployContracts_1.deployEtherFiAdapter)("EtherFiAdapter", protocolAddress, eETHAddress, weethAddress));
            await etherfiAdapterContract.grantRole(await etherfiAdapterContract.VAULT_STRATEGY_ROLE(), await deployer.getAddress());
            snapshot = await (0, hardhat_network_helpers_1.takeSnapshot)();
        });
        it("THEN contract init functions should match", async () => {
            (0, chai_1.expect)(await etherfiAdapterContract.liquifierAddress()).equals(protocolAddress);
            (0, chai_1.expect)(await etherfiAdapterContract.getProtocol()).equals(protocolAddress);
            (0, chai_1.expect)(await etherfiAdapterContract.eETHAddress()).equals(eETHAddress);
            (0, chai_1.expect)(await etherfiAdapterContract.weETHAddress()).equals(weethAddress);
            (0, chai_1.expect)(await etherfiAdapterContract.getSlippage()).equals(hardhat_1.ethers.parseEther("0.04"));
        });
        describe("WHEN trying to execute deposit", () => {
            describe("WHEN the adapter has been paused", () => {
                it("THEN it should FAIL", async () => {
                    await etherfiAdapterContract.pause();
                    await (0, chai_1.expect)(etherfiAdapterContract
                        .connect(sender)
                        .deposit(sender, receiver, eETHAddress, tokenAmount, true)).to.be.revertedWithCustomError(etherfiAdapterContract, "EnforcedPause");
                });
            });
            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(etherfiAdapterContract
                        .connect(sender)
                        .deposit(sender, receiver, weethAddress, tokenAmount, true)).to.be.revertedWithCustomError(etherfiAdapterContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN calling with invalid parameters", () => {
                describe("WHEN sender is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(etherfiAdapterContract.deposit(constants_1.ZERO_ADDRESS, receiver, weethAddress, 1, false))
                            .to.be.revertedWithCustomError(etherfiAdapterContract, "ZeroAddress")
                            .withArgs("sender_");
                    });
                });
                describe("WHEN receiver is ZERO address", () => {
                    it("THEN it should FAIL ", async () => {
                        await (0, chai_1.expect)(etherfiAdapterContract.deposit(sender, constants_1.ZERO_ADDRESS, weethAddress, 1, false))
                            .to.be.revertedWithCustomError(etherfiAdapterContract, "ZeroAddress")
                            .withArgs("receiver_");
                    });
                });
                describe("WHEN token is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(etherfiAdapterContract.deposit(sender, receiver, constants_1.ZERO_ADDRESS, 1, false))
                            .to.be.revertedWithCustomError(etherfiAdapterContract, "ZeroAddress")
                            .withArgs("token_");
                    });
                });
                describe("WHEN tokenAmount is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(etherfiAdapterContract.deposit(sender, receiver, weethAddress, 0, false))
                            .to.be.revertedWithCustomError(etherfiAdapterContract, "ZeroAmount")
                            .withArgs("tokenAmount_");
                    });
                });
            });
            describe("WHEN calling with valid parameters", () => {
                before(async () => {
                    await stETH.mint(await sender.getAddress(), tokenAmount);
                    await stETH
                        .connect(sender)
                        .approve(await etherfiAdapterContract.getAddress(), tokenAmount);
                    snapshot = await (0, hardhat_network_helpers_1.takeSnapshot)();
                });
                this.afterEach(async () => {
                    await snapshot.restore();
                });
                describe("WHEN calling deposit without wrapping", () => {
                    before(async () => {
                        txResult = await etherfiAdapterContract.deposit(sender, receiver, stETHAddress, tokenAmount, false);
                    });
                    it("THEN event DepositedOnProtocol should be emitted", async () => {
                        await (0, chai_1.expect)(txResult).to.emit(etherfiAdapterContract, "DepositedOnProtocol");
                    });
                });
                describe("WHEN calling deposit with wrapping", () => {
                    before(async () => {
                        txResult = await etherfiAdapterContract.deposit(sender, receiver, stETHAddress, tokenAmount, true);
                    });
                    it("THEN event DepositedOnProtocol should be emitted", async () => {
                        await (0, chai_1.expect)(txResult).to.emit(etherfiAdapterContract, "DepositedOnProtocol");
                    });
                });
            });
        });
        describe("WHEN trying to set protocol address", () => {
            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(etherfiAdapterContract
                        .connect(receiver)
                        .setLiquifierAddress(protocolAddress)).to.be.revertedWithCustomError(etherfiAdapterContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN protocol address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(etherfiAdapterContract.setLiquifierAddress(constants_1.ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(etherfiAdapterContract, "ZeroAddress")
                        .withArgs("liquifierAddress_");
                });
            });
            describe("WHEN protocol address is correct", () => {
                before(async () => {
                    txResult = await etherfiAdapterContract.setLiquifierAddress(protocolAddress);
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(etherfiAdapterContract, "AddressUpdated")
                        .withArgs("liquifierAddress_", protocolAddress);
                });
            });
        });
        describe("WHEN trying to call withdraw", () => {
            it("THEN it should FAIL", async () => {
                await (0, chai_1.expect)(etherfiAdapterContract.withdraw(constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, 0, constants_1.ZERO_ADDRESS, 0, "0x00")).to.be.revertedWith(await etherfiAdapterContract.REVERT_MSG());
            });
        });
        describe("WHEN trying to call claimEarnings", () => {
            it("THEN it should FAIL", async () => {
                await (0, chai_1.expect)(etherfiAdapterContract.claimEarnings(constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS)).to.be.revertedWith(await etherfiAdapterContract.REVERT_MSG());
            });
        });
        describe("WHEN trying to call getTokenPrice", () => {
            it("THEN it should FAIL", async () => {
                await (0, chai_1.expect)(etherfiAdapterContract.getTokenPrice(constants_1.ZERO_ADDRESS)).to.be.revertedWith(await etherfiAdapterContract.REVERT_MSG());
            });
        });
    });
});
//# sourceMappingURL=etherfiAdapter.test.js.map