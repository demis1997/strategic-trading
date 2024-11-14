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
let LidoAdapterFactory;
let lidoAdapterContract;
let LidoMockContact;
let protocolAddress;
let WETHContract;
let wethAddress;
let wstETHContract;
let wstETHAddress;
let tokenAmount;
describe("Vaults Registry Tests", function () {
    before(async () => {
        [deployer, sender, receiver] = await hardhat_1.ethers.getSigners();
        tokenAmount = hardhat_1.ethers.parseEther("100");
        LidoMockContact = await (await hardhat_1.ethers.getContractFactory("LidoMock")).deploy();
        protocolAddress = await LidoMockContact.getAddress();
        WETHContract = await (await hardhat_1.ethers.getContractFactory("WETHMock")).deploy();
        wethAddress = await WETHContract.getAddress();
        await (0, hardhat_network_helpers_1.setBalance)(wethAddress, hardhat_1.ethers.parseEther("100000"));
        wstETHContract = await (await hardhat_1.ethers.getContractFactory("WstETHMock")).deploy(protocolAddress);
        wstETHAddress = await wstETHContract.getAddress();
        LidoAdapterFactory = await hardhat_1.ethers.getContractFactory("LidoAdapter");
    });
    describe("WHEN trying to deploy LidoAdapter contract with incorrect parameters", function () {
        it("THEN it should FAIL when protocolAddress is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(LidoAdapterFactory, [
                constants_1.ZERO_ADDRESS,
                wethAddress,
                wstETHAddress,
            ]))
                .to.be.revertedWithCustomError(LidoAdapterFactory, "ZeroAddress")
                .withArgs("protocolAddress_");
        });
        it("THEN it should FAIL when wethAddress is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(LidoAdapterFactory, [
                protocolAddress,
                constants_1.ZERO_ADDRESS,
                wstETHAddress,
            ]))
                .to.be.revertedWithCustomError(LidoAdapterFactory, "ZeroAddress")
                .withArgs("wethAddress_");
        });
        it("THEN it should FAIL when wstETHAddress is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(LidoAdapterFactory, [
                protocolAddress,
                wethAddress,
                constants_1.ZERO_ADDRESS,
            ]))
                .to.be.revertedWithCustomError(LidoAdapterFactory, "ZeroAddress")
                .withArgs("wstETHAddress_");
        });
        it("THEN it should FAIL when contract has been initalized already", async () => {
            lidoAdapterContract = (await (0, _deployContracts_1.deployLidoAdapter)("LidoAdapter", protocolAddress, wethAddress, wstETHAddress));
            await (0, chai_1.expect)(lidoAdapterContract.initialize(protocolAddress, wethAddress, wstETHAddress)).to.be.revertedWithCustomError(LidoAdapterFactory, "InvalidInitialization");
        });
    });
    describe("WHEN deploying LidoAdapter contract with correct parameters", function () {
        before(async () => {
            lidoAdapterContract = (await (0, _deployContracts_1.deployLidoAdapter)("LidoAdapter", protocolAddress, wethAddress, wstETHAddress));
            await lidoAdapterContract.grantRole(await lidoAdapterContract.VAULT_STRATEGY_ROLE(), await deployer.getAddress());
            snapshot = await (0, hardhat_network_helpers_1.takeSnapshot)();
        });
        it("THEN contract init functions should match", async () => {
            (0, chai_1.expect)(await lidoAdapterContract.protocolAddress()).equals(protocolAddress);
            (0, chai_1.expect)(await lidoAdapterContract.wstETHAddress()).equals(wstETHAddress);
            (0, chai_1.expect)(await lidoAdapterContract.getProtocol()).equals(protocolAddress);
        });
        describe("WHEN trying to execute deposit", () => {
            describe("WHEN the adapter has been paused", () => {
                it("THEN it should FAIL", async () => {
                    await lidoAdapterContract.pause();
                    await (0, chai_1.expect)(lidoAdapterContract
                        .connect(sender)
                        .deposit(sender, receiver, wethAddress, tokenAmount, true)).to.be.revertedWithCustomError(lidoAdapterContract, "EnforcedPause");
                });
            });
            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(lidoAdapterContract
                        .connect(sender)
                        .deposit(sender, receiver, wethAddress, tokenAmount, true)).to.be.revertedWithCustomError(lidoAdapterContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN calling with invalid parameters", () => {
                describe("WHEN sender is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(lidoAdapterContract.deposit(constants_1.ZERO_ADDRESS, receiver, wethAddress, 1, false))
                            .to.be.revertedWithCustomError(lidoAdapterContract, "ZeroAddress")
                            .withArgs("sender_");
                    });
                });
                describe("WHEN receiver is ZERO address", () => {
                    it("THEN it should FAIL ", async () => {
                        await (0, chai_1.expect)(lidoAdapterContract.deposit(sender, constants_1.ZERO_ADDRESS, wethAddress, 1, false))
                            .to.be.revertedWithCustomError(lidoAdapterContract, "ZeroAddress")
                            .withArgs("receiver_");
                    });
                });
                describe("WHEN token is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(lidoAdapterContract.deposit(sender, receiver, constants_1.ZERO_ADDRESS, 1, false))
                            .to.be.revertedWithCustomError(lidoAdapterContract, "ZeroAddress")
                            .withArgs("token_");
                    });
                });
                describe("WHEN tokenAmount is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(lidoAdapterContract.deposit(sender, receiver, wethAddress, 0, false))
                            .to.be.revertedWithCustomError(lidoAdapterContract, "ZeroAmount")
                            .withArgs("tokenAmount_");
                    });
                });
                describe("WHEN token is not WETH", () => {
                    it("THEN it should FAIL", async () => {
                        const tokenAddress = await deployer.getAddress();
                        await (0, chai_1.expect)(lidoAdapterContract.deposit(sender, receiver, tokenAddress, tokenAmount, false)).to.be.revertedWithCustomError(lidoAdapterContract, "OnlyWETHAllowed");
                    });
                });
            });
            describe("WHEN calling with valid parameters", () => {
                before(async () => {
                    await WETHContract.mint(await sender.getAddress(), tokenAmount);
                    await WETHContract.connect(sender).approve(await lidoAdapterContract.getAddress(), tokenAmount);
                    snapshot = await (0, hardhat_network_helpers_1.takeSnapshot)();
                });
                this.afterEach(async () => {
                    await snapshot.restore();
                });
                describe("WHEN Lido staking is paused", () => {
                    it("THEN it should FAIL", async () => {
                        await LidoMockContact.setPaused(true);
                        await (0, chai_1.expect)(lidoAdapterContract.deposit(sender, receiver, wethAddress, tokenAmount, false)).to.be.revertedWithCustomError(lidoAdapterContract, "StakingPaused");
                    });
                });
                describe("WHEN slippage exceeded on deposit", () => {
                    it("THEN it should fail", async () => {
                        await LidoMockContact.setSlippage(hardhat_1.ethers.parseEther("1"));
                        await (0, chai_1.expect)(lidoAdapterContract.deposit(sender, receiver, wethAddress, tokenAmount, false)).to.be.revertedWithCustomError(lidoAdapterContract, "SlippageExceededOnDeposit");
                    });
                });
                describe("WHEN calling deposit without wrapping", () => {
                    before(async () => {
                        txResult = await lidoAdapterContract.deposit(sender, receiver, wethAddress, tokenAmount, false);
                    });
                    it("THEN event DepositedOnProtocol should be emitted", async () => {
                        const tknAmount = await LidoMockContact.balanceOf(receiver);
                        await (0, chai_1.expect)(txResult)
                            .to.emit(lidoAdapterContract, "DepositedOnProtocol")
                            .withArgs(sender, wethAddress, tokenAmount, protocolAddress, tknAmount);
                    });
                });
                describe("WHEN calling deposit with wrapping", () => {
                    describe("WHEN wrapping is successful", () => {
                        before(async () => {
                            txResult = await lidoAdapterContract.deposit(sender, receiver, wethAddress, tokenAmount, true);
                        });
                        it("THEN event DepositedOnProtocol should be emitted", async () => {
                            const tknAmount = await wstETHContract.balanceOf(receiver);
                            await (0, chai_1.expect)(txResult)
                                .to.emit(lidoAdapterContract, "DepositedOnProtocol")
                                .withArgs(sender, wethAddress, tokenAmount, wstETHAddress, tknAmount);
                        });
                    });
                    describe("WHEN wrapping is unsuccessful", () => {
                        it("THEN it should FAIL", async () => {
                            await wstETHContract.setTokenPerShare(0);
                            await (0, chai_1.expect)(lidoAdapterContract.deposit(sender, receiver, wethAddress, tokenAmount, true)).to.be.revertedWithCustomError(lidoAdapterContract, "WrapError");
                        });
                    });
                });
            });
        });
        describe("WHEN trying to set protocol address", () => {
            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(lidoAdapterContract.connect(receiver).setprotocolAddress(protocolAddress)).to.be.revertedWithCustomError(lidoAdapterContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN protocol address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(lidoAdapterContract.setprotocolAddress(constants_1.ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(lidoAdapterContract, "ZeroAddress")
                        .withArgs("protocolAddress_");
                });
            });
            describe("WHEN protocol address is correct", () => {
                before(async () => {
                    txResult = await lidoAdapterContract.setprotocolAddress(protocolAddress);
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(lidoAdapterContract, "AddressUpdated")
                        .withArgs("protocolAddress", protocolAddress);
                });
            });
        });
        describe("WHEN trying to set wstETH address", () => {
            describe("WHEN wstETH address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(lidoAdapterContract.setWstETHAddress(constants_1.ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(lidoAdapterContract, "ZeroAddress")
                        .withArgs("wstETHAddress_");
                });
            });
            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(lidoAdapterContract.connect(receiver).setWstETHAddress(wstETHAddress)).to.be.revertedWithCustomError(lidoAdapterContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN protocol address is correct", () => {
                before(async () => {
                    txResult = await lidoAdapterContract.setWstETHAddress(wstETHAddress);
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(lidoAdapterContract, "AddressUpdated")
                        .withArgs("wstETHAddress", wstETHAddress);
                });
            });
        });
        describe("WHEN trying to set WETH address", () => {
            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(lidoAdapterContract.connect(receiver).setWETHAddress(wethAddress)).to.be.revertedWithCustomError(lidoAdapterContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN protocol address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(lidoAdapterContract.setWETHAddress(constants_1.ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(lidoAdapterContract, "ZeroAddress")
                        .withArgs("wethAddress_");
                });
            });
            describe("WHEN WETH address is correct", () => {
                before(async () => {
                    txResult = await lidoAdapterContract.setWETHAddress(wethAddress);
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(lidoAdapterContract, "AddressUpdated")
                        .withArgs("wethAddress", wethAddress);
                });
            });
        });
        describe("WHEN trying to set slippage address", () => {
            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(lidoAdapterContract.connect(receiver).setSlippage(1)).to.be.revertedWithCustomError(lidoAdapterContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN setSlippage is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(lidoAdapterContract.setSlippage(constants_1.ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(lidoAdapterContract, "ZeroAmount")
                        .withArgs("slippage_");
                });
            });
            describe("WHEN WETH address is correct", () => {
                before(async () => {
                    txResult = await lidoAdapterContract.setSlippage(1);
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(lidoAdapterContract, "SlippageUpdated")
                        .withArgs(1);
                });
            });
        });
        describe("WHEN trying to call withdraw", () => {
            it("THEN it should FAIL", async () => {
                await (0, chai_1.expect)(lidoAdapterContract.withdraw(constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, 0, constants_1.ZERO_ADDRESS, 0, "0x00")).to.be.revertedWith(await lidoAdapterContract.REVERT_MSG());
            });
        });
        describe("WHEN trying to call claimEarnings", () => {
            it("THEN it should FAIL", async () => {
                await (0, chai_1.expect)(lidoAdapterContract.claimEarnings(constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS)).to.be.revertedWith(await lidoAdapterContract.REVERT_MSG());
            });
        });
        describe("WHEN trying to call getTokenPrice", () => {
            describe("WHEN calling token is stETH", () => {
                it("THEN is should return value", async () => {
                    (0, chai_1.expect)(await lidoAdapterContract.getTokenPrice(protocolAddress)).to.be.equal(hardhat_1.ethers.parseEther("1"));
                });
            });
            describe("WHEN calling token is wstETH", () => {
                it("THEN is should return value", async () => {
                    const price = await LidoMockContact.getPooledEthByShares(hardhat_1.ethers.parseEther("1"));
                    (0, chai_1.expect)(await lidoAdapterContract.getTokenPrice(wstETHAddress)).to.be.equal(price);
                });
            });
            describe("WHEN calling token is invalid token", () => {
                it("THEN is should FAIL", async () => {
                    await (0, chai_1.expect)(lidoAdapterContract.getTokenPrice(constants_1.ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(lidoAdapterContract, "InvalidLidoPrice")
                        .withArgs(0, 0);
                });
            });
        });
    });
});
//# sourceMappingURL=lidoAdapter.test.js.map