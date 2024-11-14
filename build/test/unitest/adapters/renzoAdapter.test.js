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
let renzoAdapterFactory;
let renzoAdapterContract;
let renzoProtocolMockContract;
let protocolAddress;
let stETHContract;
let stETHAddress;
let ezETHContract;
let ezETHAddress;
let tokenAmount;
describe("Renzo Protocol Tests", function () {
    before(async () => {
        [deployer, sender, receiver] = await hardhat_1.ethers.getSigners();
        tokenAmount = hardhat_1.ethers.parseEther("1");
        stETHContract = await (await hardhat_1.ethers.getContractFactory("ERC20Mock")).deploy("stETH", "stETH", 18);
        stETHAddress = await stETHContract.getAddress();
        ezETHContract = await (await hardhat_1.ethers.getContractFactory("ERC20Mock")).deploy("ezETH", "ezETH", 18);
        ezETHAddress = await ezETHContract.getAddress();
        renzoProtocolMockContract = await (await hardhat_1.ethers.getContractFactory("RenzoProtocolMock")).deploy(stETHAddress, ezETHAddress);
        protocolAddress = await renzoProtocolMockContract.getAddress();
        renzoAdapterFactory = await hardhat_1.ethers.getContractFactory("RenzoAdapter");
    });
    describe("WHEN trying to deploy renzoAdapter contract with incorrect parameters", function () {
        it("THEN it should FAIL when protocolAddress is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(renzoAdapterFactory, [
                constants_1.ZERO_ADDRESS,
                ezETHAddress,
                stETHAddress,
            ]))
                .to.be.revertedWithCustomError(renzoAdapterFactory, "ZeroAddress")
                .withArgs("liquifierAddress_");
        });
        it("THEN it should FAIL when ezETH is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(renzoAdapterFactory, [
                protocolAddress,
                constants_1.ZERO_ADDRESS,
                stETHAddress,
            ]))
                .to.be.revertedWithCustomError(renzoAdapterFactory, "ZeroAddress")
                .withArgs("ezETHAddress");
        });
        it("THEN it should FAIL when stETH is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(renzoAdapterFactory, [
                protocolAddress,
                ezETHAddress,
                constants_1.ZERO_ADDRESS,
            ]))
                .to.be.revertedWithCustomError(renzoAdapterFactory, "ZeroAddress")
                .withArgs("stETHAddress");
        });
        it("THEN it should FAIL when contract has been initialized already", async () => {
            renzoAdapterContract = (await (0, _deployContracts_1.deployRenzoAdapter)("RenzoAdapter", protocolAddress, ezETHAddress, stETHAddress));
            await (0, chai_1.expect)(renzoAdapterContract.initialize(protocolAddress, ezETHAddress, stETHAddress)).to.be.revertedWithCustomError(renzoAdapterFactory, "InvalidInitialization");
        });
    });
    describe("WHEN deploying renzoAdapter contract with correct parameters", function () {
        before(async () => {
            renzoAdapterContract = (await (0, _deployContracts_1.deployRenzoAdapter)("RenzoAdapter", protocolAddress, ezETHAddress, stETHAddress));
            await renzoAdapterContract.grantRole(await renzoAdapterContract.VAULT_STRATEGY_ROLE(), await deployer.getAddress());
            snapshot = await (0, hardhat_network_helpers_1.takeSnapshot)();
        });
        it("THEN contract init functions should match", async () => {
            (0, chai_1.expect)(await renzoAdapterContract.liquifierAddress()).equals(protocolAddress);
            (0, chai_1.expect)(await renzoAdapterContract.getProtocol()).equals(protocolAddress);
            (0, chai_1.expect)(await renzoAdapterContract.ezETHAddress()).equals(ezETHAddress);
            (0, chai_1.expect)(await renzoAdapterContract.stETHAddress()).equals(stETHAddress);
            (0, chai_1.expect)(await renzoAdapterContract.getSlippage()).equals(hardhat_1.ethers.parseEther("0.04"));
        });
        describe("WHEN trying to execute deposit", () => {
            describe("WHEN the adapter has been paused", () => {
                it("THEN it should FAIL", async () => {
                    await renzoAdapterContract.pause();
                    await (0, chai_1.expect)(renzoAdapterContract
                        .connect(sender)
                        .deposit(sender, receiver, stETHAddress, tokenAmount, false)).to.be.revertedWithCustomError(renzoAdapterContract, "EnforcedPause");
                });
            });
            describe("WHEN the caller is not granted the right role", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(renzoAdapterContract
                        .connect(sender)
                        .deposit(sender, receiver, stETHAddress, tokenAmount, false)).to.be.revertedWithCustomError(renzoAdapterContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN calling with invalid parameters", () => {
                describe("WHEN sender is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(renzoAdapterContract.deposit(constants_1.ZERO_ADDRESS, receiver, stETHAddress, 1, false))
                            .to.be.revertedWithCustomError(renzoAdapterContract, "ZeroAddress")
                            .withArgs("sender_");
                    });
                });
                describe("WHEN receiver is ZERO address", () => {
                    it("THEN it should FAIL ", async () => {
                        await (0, chai_1.expect)(renzoAdapterContract.deposit(sender, constants_1.ZERO_ADDRESS, stETHAddress, 1, false))
                            .to.be.revertedWithCustomError(renzoAdapterContract, "ZeroAddress")
                            .withArgs("receiver_");
                    });
                });
                describe("WHEN token is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(renzoAdapterContract.deposit(sender, receiver, constants_1.ZERO_ADDRESS, 1, false))
                            .to.be.revertedWithCustomError(renzoAdapterContract, "ZeroAddress")
                            .withArgs("token_");
                    });
                });
                describe("WHEN tokenAmount is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(renzoAdapterContract.deposit(sender, receiver, stETHAddress, 0, false))
                            .to.be.revertedWithCustomError(renzoAdapterContract, "ZeroAmount")
                            .withArgs("tokenAmount_");
                    });
                });
            });
            describe("WHEN calling with valid parameters", () => {
                before(async () => {
                    await stETHContract.mint(await sender.getAddress(), tokenAmount);
                    await stETHContract
                        .connect(sender)
                        .approve(await renzoAdapterContract.getAddress(), tokenAmount);
                    snapshot = await (0, hardhat_network_helpers_1.takeSnapshot)();
                });
                this.afterEach(async () => {
                    await snapshot.restore();
                });
                describe("WHEN calling deposit", () => {
                    before(async () => {
                        txResult = await renzoAdapterContract.deposit(sender, receiver, stETHAddress, tokenAmount, false);
                    });
                    it("THEN it should correctly calculate minEzEthAmount considering slippage", async () => {
                        const slippage = await renzoAdapterContract.getSlippage();
                        (0, chai_1.expect)(await renzoAdapterContract.getSlippage()).to.equal(hardhat_1.ethers.parseEther("0.04"));
                    });
                });
            });
        });
        describe("WHEN trying to set protocol address", () => {
            describe("WHEN the caller is not granted the right role", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(renzoAdapterContract
                        .connect(receiver)
                        .setLiquifierAddress(protocolAddress)).to.be.revertedWithCustomError(renzoAdapterContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN protocol address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(renzoAdapterContract.setLiquifierAddress(constants_1.ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(renzoAdapterContract, "ZeroAddress")
                        .withArgs("liquifierAddress_");
                });
            });
            describe("WHEN protocol address is correct", () => {
                before(async () => {
                    txResult = await renzoAdapterContract.setLiquifierAddress(protocolAddress);
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(renzoAdapterContract, "AddressUpdated")
                        .withArgs("liquifierAddress_", protocolAddress);
                });
            });
        });
        describe("WHEN trying to call claimEarnings", () => {
            it("THEN it should FAIL", async () => {
                await (0, chai_1.expect)(renzoAdapterContract.claimEarnings(constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS)).to.be.revertedWith("claimEarnings not implemented");
            });
        });
        describe("WHEN trying to call withdraw", () => {
            it("THEN it should FAIL", async () => {
                await (0, chai_1.expect)(renzoAdapterContract.withdraw(constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, 0, constants_1.ZERO_ADDRESS, 0, "0x00")).to.be.revertedWith(await renzoAdapterContract.REVERT_MSG());
            });
        });
        describe("WHEN trying to call getTokenPrice", () => {
            it("THEN it should FAIL", async () => {
                await (0, chai_1.expect)(renzoAdapterContract.getTokenPrice(constants_1.ZERO_ADDRESS)).to.be.revertedWith("getTokenPrice not implemented");
            });
        });
    });
});
//# sourceMappingURL=renzoAdapter.test.js.map