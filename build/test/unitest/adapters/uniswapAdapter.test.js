"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const chai_1 = require("chai");
const hardhat_network_helpers_1 = require("@nomicfoundation/hardhat-network-helpers");
const constants_1 = require("../../_helpers/constants");
const _deployContracts_1 = require("../../../scripts/_deployContracts");
let snapshot;
let deployer;
let strategy;
let vault;
let txResult;
let UniswapV3AdapterFactory;
let UniswapV3AdapterContract;
let UniswapV3RouterContract;
let uniswapV3RouterAddress;
let UniswapV3QuoterContract;
let uniswapV3QuoterAddress;
let UniswapPoolContract;
let UniswapPoolAddress;
let WETHContract;
let wethAddress;
let TokenContract;
let tokenAddress;
describe("Uniswap Adapter Tests", function () {
    before(async () => {
        [deployer, strategy, vault] = await hardhat_1.ethers.getSigners();
        UniswapV3RouterContract = await (await hardhat_1.ethers.getContractFactory("UniswapV3RouterMock")).deploy();
        uniswapV3RouterAddress = await UniswapV3RouterContract.getAddress();
        UniswapV3QuoterContract = await (await hardhat_1.ethers.getContractFactory("UniswapV3QuoterMock")).deploy();
        uniswapV3QuoterAddress = await UniswapV3QuoterContract.getAddress();
        UniswapPoolContract = await (await hardhat_1.ethers.getContractFactory("UniswapPoolMock")).deploy();
        UniswapPoolAddress = await UniswapPoolContract.getAddress();
        WETHContract = await (await hardhat_1.ethers.getContractFactory("WETHMock")).deploy();
        wethAddress = await WETHContract.getAddress();
        await (0, hardhat_network_helpers_1.setBalance)(wethAddress, hardhat_1.ethers.parseEther("100000"));
        TokenContract = await (await hardhat_1.ethers.getContractFactory("ERC20Mock")).deploy("TKN", "TKN", 18);
        tokenAddress = await TokenContract.getAddress();
        UniswapV3AdapterFactory = await hardhat_1.ethers.getContractFactory("UniswapV3Adapter");
    });
    describe("WHEN trying to deploy UniswapV3Adapter contract with incorrect parameters", function () {
        it("THEN it should FAIL when uniswapV3RouterAddress is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(UniswapV3AdapterFactory, [
                constants_1.ZERO_ADDRESS,
                uniswapV3QuoterAddress,
                wethAddress,
            ]))
                .to.be.revertedWithCustomError(UniswapV3AdapterFactory, "ZeroAddress")
                .withArgs("uniswapV3Router_");
        });
        it("THEN it should FAIL when uniswapV3QuoterAddress is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(UniswapV3AdapterFactory, [
                uniswapV3RouterAddress,
                constants_1.ZERO_ADDRESS,
                wethAddress,
            ]))
                .to.be.revertedWithCustomError(UniswapV3AdapterFactory, "ZeroAddress")
                .withArgs("uniswapQuoter_");
        });
        it("THEN it should FAIL when WETHContract is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(UniswapV3AdapterFactory, [
                uniswapV3RouterAddress,
                uniswapV3QuoterAddress,
                constants_1.ZERO_ADDRESS,
            ]))
                .to.be.revertedWithCustomError(UniswapV3AdapterFactory, "ZeroAddress")
                .withArgs("wethAddress_");
        });
    });
    describe("WHEN deploying UniswapV3Adapter contract with correct parameters", function () {
        before(async () => {
            UniswapV3AdapterContract = (await (0, _deployContracts_1.deployUniswapAdapter)("UniswapV3Adapter", uniswapV3RouterAddress, uniswapV3QuoterAddress, wethAddress));
            await UniswapV3AdapterContract.grantRole(await UniswapV3AdapterContract.VAULT_STRATEGY_ROLE(), await deployer.getAddress());
            snapshot = await (0, hardhat_network_helpers_1.takeSnapshot)();
        });
        it("THEN contract init functions should match", async () => {
            (0, chai_1.expect)(await UniswapV3AdapterContract.uniswapV3Router()).equals(uniswapV3RouterAddress);
            (0, chai_1.expect)(await UniswapV3AdapterContract.uniswapQuoter()).equals(uniswapV3QuoterAddress);
        });
        describe("WHEN trying to set UniswapRouterV3 address", () => {
            describe("WHEN protocol address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(UniswapV3AdapterContract.setUniswapRouterAddress(constants_1.ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(UniswapV3AdapterContract, "ZeroAddress")
                        .withArgs("uniswapRouterAddress_");
                });
            });
            describe("WHEN protocol address is correct", () => {
                before(async () => {
                    txResult =
                        await UniswapV3AdapterContract.setUniswapRouterAddress(UniswapV3RouterContract);
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(UniswapV3AdapterContract, "AddressUpdated")
                        .withArgs("uniswapRouterAddress", UniswapV3RouterContract);
                });
            });
        });
        describe("WHEN trying to set UniswapQuoter address", () => {
            describe("WHEN wstETH address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(UniswapV3AdapterContract.setUniswapQuoterAddress(constants_1.ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(UniswapV3AdapterContract, "ZeroAddress")
                        .withArgs("uniswapQuoter_");
                });
            });
            describe("WHEN protocol address is correct", () => {
                before(async () => {
                    txResult =
                        await UniswapV3AdapterContract.setUniswapQuoterAddress(uniswapV3QuoterAddress);
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(UniswapV3AdapterContract, "AddressUpdated")
                        .withArgs("uniswapQuoter", uniswapV3QuoterAddress);
                });
            });
        });
        describe("WHEN trying to set PoolPerTokenForPrice address", () => {
            describe("WHEN token address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(UniswapV3AdapterContract.setPoolPerTokenForPrice(constants_1.ZERO_ADDRESS, wethAddress))
                        .to.be.revertedWithCustomError(UniswapV3AdapterContract, "ZeroAddress")
                        .withArgs("token_");
                });
            });
            describe("WHEN pool address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(UniswapV3AdapterContract.setPoolPerTokenForPrice(wethAddress, constants_1.ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(UniswapV3AdapterContract, "ZeroAddress")
                        .withArgs("pool_");
                });
            });
            describe("WHEN all parameters are correct", () => {
                before(async () => {
                    txResult = await UniswapV3AdapterContract.setPoolPerTokenForPrice(wethAddress, wethAddress);
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(UniswapV3AdapterContract, "PoolForTokenPriceSet")
                        .withArgs(wethAddress, wethAddress);
                });
                it("THEN it should change poolsPerTokenForPrice", async () => {
                    (0, chai_1.expect)(await UniswapV3AdapterContract.poolsPerTokenForPrice(wethAddress)).to.be.eq(wethAddress);
                });
            });
        });
        describe("WHEN trying to withdraw", () => {
            describe("WHEN trying to call with invalid parameters", () => {
                describe("WHEN caller is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(UniswapV3AdapterContract.withdraw(constants_1.ZERO_ADDRESS, vault, wethAddress, 1, tokenAddress, 1, "0x00"))
                            .to.be.revertedWithCustomError(UniswapV3AdapterContract, "ZeroAddress")
                            .withArgs("caller_");
                    });
                });
                describe("WHEN vault is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(UniswapV3AdapterContract.withdraw(strategy, constants_1.ZERO_ADDRESS, wethAddress, 1, tokenAddress, 1, "0x00"))
                            .to.be.revertedWithCustomError(UniswapV3AdapterContract, "ZeroAddress")
                            .withArgs("receiver_");
                    });
                });
                describe("WHEN asset is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(UniswapV3AdapterContract.withdraw(strategy, vault, constants_1.ZERO_ADDRESS, 1, tokenAddress, 1, "0x00"))
                            .to.be.revertedWithCustomError(UniswapV3AdapterContract, "ZeroAddress")
                            .withArgs("asset_");
                    });
                });
                describe("WHEN liquidToken is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(UniswapV3AdapterContract.withdraw(strategy, vault, wethAddress, 1, constants_1.ZERO_ADDRESS, 1, "0x00"))
                            .to.be.revertedWithCustomError(UniswapV3AdapterContract, "ZeroAddress")
                            .withArgs("liquidTokenAddress_");
                    });
                });
                describe("WHEN assetsAmount_ is ZERO", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(UniswapV3AdapterContract.withdraw(strategy, vault, wethAddress, 0, tokenAddress, 1, "0x00"))
                            .to.be.revertedWithCustomError(UniswapV3AdapterContract, "ZeroAmount")
                            .withArgs("assetsAmount_");
                    });
                });
                describe("WHEN amountInMaximum_ is ZERO", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(UniswapV3AdapterContract.withdraw(strategy, vault, wethAddress, 1, tokenAddress, 0, "0x00"))
                            .to.be.revertedWithCustomError(UniswapV3AdapterContract, "ZeroAmount")
                            .withArgs("amountInMaximum_");
                    });
                });
            });
            describe("WHEN trying to call when adapter has been paused", () => {
                before(async () => {
                    await UniswapV3AdapterContract.pause();
                });
                after(async () => {
                    await UniswapV3AdapterContract.unpause();
                });
                it("THEN it should fail", async () => {
                    await (0, chai_1.expect)(UniswapV3AdapterContract.withdraw(strategy, vault, wethAddress, 1, tokenAddress, 2, "0x00")).to.be.revertedWithCustomError(UniswapV3AdapterContract, "EnforcedPause");
                });
            });
            describe("WHEN trying to call from unathorised caller", () => {
                it("THEN it should fail", async () => {
                    await (0, chai_1.expect)(UniswapV3AdapterContract.connect(strategy).withdraw(strategy, vault, wethAddress, 1, tokenAddress, 2, "0x00")).to.be.revertedWithCustomError(UniswapV3AdapterContract, "AccessControlUnauthorizedAccount");
                });
            });
            describe("WHEN execute withdraw with leftover", () => {
                before(async () => {
                    await TokenContract.mint(strategy, 2);
                    await TokenContract.connect(strategy).approve(await UniswapV3AdapterContract.getAddress(), 2);
                    await UniswapV3RouterContract.setExactOutput(1);
                });
                it("THEN it should emit event", async () => {
                    txResult = await UniswapV3AdapterContract.withdraw(strategy, vault, wethAddress, 1, tokenAddress, 2, "0x00");
                    await (0, chai_1.expect)(txResult)
                        .to.emit(UniswapV3AdapterContract, "WithdrawFromProtocol")
                        .withArgs(strategy, vault, tokenAddress, 1, wethAddress, 1);
                });
            });
            describe("WHEN execute withdraw without leftover", () => {
                before(async () => {
                    await TokenContract.mint(strategy, 1);
                    await TokenContract.connect(strategy).approve(await UniswapV3AdapterContract.getAddress(), 2);
                    await UniswapV3RouterContract.setExactOutput(1);
                });
                it("THEN it should emit event", async () => {
                    txResult = await UniswapV3AdapterContract.withdraw(strategy, vault, wethAddress, 1, tokenAddress, 1, "0x00");
                    await (0, chai_1.expect)(txResult)
                        .to.emit(UniswapV3AdapterContract, "WithdrawFromProtocol")
                        .withArgs(strategy, vault, tokenAddress, 1, wethAddress, 1);
                });
            });
        });
        describe("WHEN trying to call deposit", () => {
            it("THEN it should FAIL", async () => {
                await (0, chai_1.expect)(UniswapV3AdapterContract.deposit(constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, 0, false)).to.be.revertedWith(await UniswapV3AdapterContract.REVERT_MSG());
            });
        });
        describe("WHEN call getAmountInForexactOutput", () => {
            it("THEN it should return value", async () => {
                await UniswapV3AdapterContract.getAmountInForexactOutput("0x00", 1);
            });
        });
        describe("WHEN trying to call claimEarnings", () => {
            it("THEN it should FAIL", async () => {
                await (0, chai_1.expect)(UniswapV3AdapterContract.claimEarnings(constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS)).to.be.revertedWith(await UniswapV3AdapterContract.REVERT_MSG());
            });
        });
        describe("WHEN call getProtocol", () => {
            it("THEN is should return value", async () => {
                (0, chai_1.expect)(await UniswapV3AdapterContract.getProtocol()).to.be.equal(uniswapV3RouterAddress);
            });
        });
        describe("WHEN call getTokenPrice", () => {
            describe("WHEN pool adress is ZERO", () => {
                it("THEN it should FAIL", async () => {
                    await (0, chai_1.expect)(UniswapV3AdapterContract.getTokenPrice(tokenAddress)).to.be.revertedWith("No pool defined for token");
                });
            });
            describe("WHEN all parameters are valid", () => {
                it("THEN is should return value", async () => {
                    await UniswapV3AdapterContract.setPoolPerTokenForPrice(tokenAddress, UniswapPoolAddress);
                    await UniswapPoolContract.setToken0(tokenAddress);
                    await UniswapPoolContract.setSlot0(hardhat_1.ethers.parseEther("100"));
                    (0, chai_1.expect)(await UniswapV3AdapterContract.getTokenPrice(tokenAddress)).to.be.equal(1);
                });
                it("THEN is should return value", async () => {
                    await UniswapV3AdapterContract.setPoolPerTokenForPrice(tokenAddress, UniswapPoolAddress);
                    await UniswapPoolContract.setToken0(wethAddress);
                    await UniswapPoolContract.setSlot0(hardhat_1.ethers.parseEther("100"));
                    (0, chai_1.expect)(await UniswapV3AdapterContract.getTokenPrice(tokenAddress)).to.be.equal(hardhat_1.ethers.parseEther("1000000000000000000"));
                });
            });
        });
    });
});
//# sourceMappingURL=uniswapAdapter.test.js.map