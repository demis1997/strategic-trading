import { BigNumberish, ContractFactory, ContractTransactionResponse, Signer } from "ethers";
import { ethers, upgrades } from "hardhat";
import { expect } from "chai";
import {
    SnapshotRestorer,
    takeSnapshot,
    setBalance,
} from "@nomicfoundation/hardhat-network-helpers";
import { ZERO_ADDRESS } from "../../_helpers/constants";
import { deployUniswapAdapter } from "../../../scripts/_helpers/_deployContracts";
import {
    WETHMock,
    UniswapV3Adapter,
    UniswapV3RouterMock,
    UniswapV3QuoterMock,
    ERC20Mock,
    UniswapPoolMock,
} from "../../../types";

let snapshot: SnapshotRestorer;

let deployer: Signer;
let strategy: Signer;
let vault: Signer;

let txResult: ContractTransactionResponse;

let UniswapV3AdapterFactory: ContractFactory;

let UniswapV3AdapterContract: UniswapV3Adapter;

let UniswapV3RouterContract: UniswapV3RouterMock;
let uniswapV3RouterAddress: string;

let UniswapV3QuoterContract: UniswapV3QuoterMock;
let uniswapV3QuoterAddress: string;

let UniswapPoolContract: UniswapPoolMock;
let UniswapPoolAddress: string;

let WETHContract: WETHMock;
let wethAddress: string;

let TokenContract: ERC20Mock;
let tokenAddress: string;

describe("Uniswap Adapter Tests", function () {
    before(async () => {
        [deployer, strategy, vault] = await ethers.getSigners();

        // Deploy Uniswap Router V3 Mock contract
        UniswapV3RouterContract = await (
            await ethers.getContractFactory("UniswapV3RouterMock")
        ).deploy();
        uniswapV3RouterAddress = await UniswapV3RouterContract.getAddress();

        // Deploy Uniswap Quoter V3 Mock contract
        UniswapV3QuoterContract = await (
            await ethers.getContractFactory("UniswapV3QuoterMock")
        ).deploy();
        uniswapV3QuoterAddress = await UniswapV3QuoterContract.getAddress();

        // Deploy Pool Mock contract
        UniswapPoolContract = await (await ethers.getContractFactory("UniswapPoolMock")).deploy();
        UniswapPoolAddress = await UniswapPoolContract.getAddress();
        // Deploy WETH Mock contract
        WETHContract = await (await ethers.getContractFactory("WETHMock")).deploy();
        wethAddress = await WETHContract.getAddress();
        await setBalance(wethAddress, ethers.parseEther("100000"));

        // Deploy Token Mock contract
        TokenContract = await (
            await ethers.getContractFactory("ERC20Mock")
        ).deploy("TKN", "TKN", 18);
        tokenAddress = await TokenContract.getAddress();

        UniswapV3AdapterFactory = await ethers.getContractFactory("UniswapV3Adapter");
    });

    describe("WHEN trying to deploy UniswapV3Adapter contract with incorrect parameters", function () {
        it("THEN it should FAIL when uniswapV3RouterAddress is ZERO address", async () => {
            await expect(
                upgrades.deployProxy(UniswapV3AdapterFactory, [
                    ZERO_ADDRESS,
                    uniswapV3QuoterAddress,
                    wethAddress,
                ]),
            )
                .to.be.revertedWithCustomError(UniswapV3AdapterFactory, "ZeroAddress")
                .withArgs("uniswapV3Router_");
        });

        it("THEN it should FAIL when uniswapV3QuoterAddress is ZERO address", async () => {
            await expect(
                upgrades.deployProxy(UniswapV3AdapterFactory, [
                    uniswapV3RouterAddress,
                    ZERO_ADDRESS,
                    wethAddress,
                ]),
            )
                .to.be.revertedWithCustomError(UniswapV3AdapterFactory, "ZeroAddress")
                .withArgs("uniswapQuoter_");
        });

        it("THEN it should FAIL when WETHContract is ZERO address", async () => {
            await expect(
                upgrades.deployProxy(UniswapV3AdapterFactory, [
                    uniswapV3RouterAddress,
                    uniswapV3QuoterAddress,
                    ZERO_ADDRESS,
                ]),
            )
                .to.be.revertedWithCustomError(UniswapV3AdapterFactory, "ZeroAddress")
                .withArgs("wethAddress_");
        });
    });

    describe("WHEN deploying UniswapV3Adapter contract with correct parameters", function () {
        before(async () => {
            UniswapV3AdapterContract = (await deployUniswapAdapter(
                "UniswapV3Adapter",
                uniswapV3RouterAddress,
                uniswapV3QuoterAddress,
                wethAddress,
            )) as unknown as UniswapV3Adapter;

            await UniswapV3AdapterContract.grantRole(
                await UniswapV3AdapterContract.VAULT_STRATEGY_ROLE(),
                await deployer.getAddress(),
            );
            snapshot = await takeSnapshot();
        });

        it("THEN contract init functions should match", async () => {
            expect(await UniswapV3AdapterContract.uniswapV3Router()).equals(uniswapV3RouterAddress);
            expect(await UniswapV3AdapterContract.uniswapQuoter()).equals(uniswapV3QuoterAddress);
        });

        describe("WHEN trying to set UniswapRouterV3 address", () => {
            describe("WHEN protocol address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await expect(UniswapV3AdapterContract.setUniswapRouterAddress(ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(UniswapV3AdapterContract, "ZeroAddress")
                        .withArgs("uniswapRouterAddress_");
                });
            });
            describe("WHEN protocol address is correct", () => {
                before(async () => {
                    // TODO: protocol address
                    txResult =
                        await UniswapV3AdapterContract.setUniswapRouterAddress(
                            UniswapV3RouterContract,
                        );
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await expect(txResult)
                        .to.emit(UniswapV3AdapterContract, "AddressUpdated")
                        .withArgs("uniswapRouterAddress", UniswapV3RouterContract);
                });
            });
        });

        describe("WHEN trying to set UniswapQuoter address", () => {
            describe("WHEN wstETH address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await expect(UniswapV3AdapterContract.setUniswapQuoterAddress(ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(UniswapV3AdapterContract, "ZeroAddress")
                        .withArgs("uniswapQuoter_");
                });
            });
            describe("WHEN protocol address is correct", () => {
                before(async () => {
                    // TODO: protocol address
                    txResult =
                        await UniswapV3AdapterContract.setUniswapQuoterAddress(
                            uniswapV3QuoterAddress,
                        );
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await expect(txResult)
                        .to.emit(UniswapV3AdapterContract, "AddressUpdated")
                        .withArgs("uniswapQuoter", uniswapV3QuoterAddress);
                });
            });
        });

        describe("WHEN trying to set PoolPerTokenForPrice address", () => {
            describe("WHEN token address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await expect(
                        UniswapV3AdapterContract.setPoolPerTokenForPrice(ZERO_ADDRESS, wethAddress),
                    )
                        .to.be.revertedWithCustomError(UniswapV3AdapterContract, "ZeroAddress")
                        .withArgs("token_");
                });
            });

            describe("WHEN pool address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await expect(
                        UniswapV3AdapterContract.setPoolPerTokenForPrice(wethAddress, ZERO_ADDRESS),
                    )
                        .to.be.revertedWithCustomError(UniswapV3AdapterContract, "ZeroAddress")
                        .withArgs("pool_");
                });
            });
            describe("WHEN all parameters are correct", () => {
                before(async () => {
                    // TODO: protocol address
                    txResult = await UniswapV3AdapterContract.setPoolPerTokenForPrice(
                        wethAddress,
                        wethAddress,
                    );
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await expect(txResult)
                        .to.emit(UniswapV3AdapterContract, "PoolForTokenPriceSet")
                        .withArgs(wethAddress, wethAddress);
                });

                it("THEN it should change poolsPerTokenForPrice", async () => {
                    expect(
                        await UniswapV3AdapterContract.poolsPerTokenForPrice(wethAddress),
                    ).to.be.eq(wethAddress);
                });
            });
        });

        describe("WHEN trying to withdraw", () => {
            describe("WHEN trying to call with invalid parameters", () => {
                describe("WHEN caller is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(
                            UniswapV3AdapterContract.withdraw(
                                ZERO_ADDRESS,
                                vault,
                                wethAddress,
                                1,
                                tokenAddress,
                                1,
                                "0x00",
                            ),
                        )
                            .to.be.revertedWithCustomError(UniswapV3AdapterContract, "ZeroAddress")
                            .withArgs("caller_");
                    });
                });
                describe("WHEN vault is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(
                            UniswapV3AdapterContract.withdraw(
                                strategy,
                                ZERO_ADDRESS,
                                wethAddress,
                                1,
                                tokenAddress,
                                1,
                                "0x00",
                            ),
                        )
                            .to.be.revertedWithCustomError(UniswapV3AdapterContract, "ZeroAddress")
                            .withArgs("receiver_");
                    });
                });
                describe("WHEN asset is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(
                            UniswapV3AdapterContract.withdraw(
                                strategy,
                                vault,
                                ZERO_ADDRESS,
                                1,
                                tokenAddress,
                                1,
                                "0x00",
                            ),
                        )
                            .to.be.revertedWithCustomError(UniswapV3AdapterContract, "ZeroAddress")
                            .withArgs("asset_");
                    });
                });
                describe("WHEN liquidToken is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(
                            UniswapV3AdapterContract.withdraw(
                                strategy,
                                vault,
                                wethAddress,
                                1,
                                ZERO_ADDRESS,
                                1,
                                "0x00",
                            ),
                        )
                            .to.be.revertedWithCustomError(UniswapV3AdapterContract, "ZeroAddress")
                            .withArgs("liquidTokenAddress_");
                    });
                });
                describe("WHEN assetsAmount_ is ZERO", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(
                            UniswapV3AdapterContract.withdraw(
                                strategy,
                                vault,
                                wethAddress,
                                0,
                                tokenAddress,
                                1,
                                "0x00",
                            ),
                        )
                            .to.be.revertedWithCustomError(UniswapV3AdapterContract, "ZeroAmount")
                            .withArgs("assetsAmount_");
                    });
                });
                describe("WHEN amountInMaximum_ is ZERO", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(
                            UniswapV3AdapterContract.withdraw(
                                strategy,
                                vault,
                                wethAddress,
                                1,
                                tokenAddress,
                                0,
                                "0x00",
                            ),
                        )
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
                    await expect(
                        UniswapV3AdapterContract.withdraw(
                            strategy,
                            vault,
                            wethAddress,
                            1,
                            tokenAddress,
                            2,
                            "0x00",
                        ),
                    ).to.be.revertedWithCustomError(UniswapV3AdapterContract, "EnforcedPause");
                });
            });

            describe("WHEN trying to call from unathorised caller", () => {
                it("THEN it should fail", async () => {
                    await expect(
                        UniswapV3AdapterContract.connect(strategy).withdraw(
                            strategy,
                            vault,
                            wethAddress,
                            1,
                            tokenAddress,
                            2,
                            "0x00",
                        ),
                    ).to.be.revertedWithCustomError(
                        UniswapV3AdapterContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });

            describe("WHEN execute withdraw with leftover", () => {
                before(async () => {
                    // strategy should has tokens
                    await TokenContract.mint(strategy, 2);

                    // strategy should approve tokens to the adapter
                    await TokenContract.connect(strategy).approve(
                        await UniswapV3AdapterContract.getAddress(),
                        2,
                    );

                    // set amountSpent
                    await UniswapV3RouterContract.setExactOutput(1);
                });

                it("THEN it should emit event", async () => {
                    txResult = await UniswapV3AdapterContract.withdraw(
                        strategy,
                        vault,
                        wethAddress,
                        1,
                        tokenAddress,
                        2,
                        "0x00",
                    );

                    await expect(txResult)
                        .to.emit(UniswapV3AdapterContract, "WithdrawFromProtocol")
                        .withArgs(strategy, vault, tokenAddress, 1, wethAddress, 1);
                });
            });

            describe("WHEN execute withdraw without leftover", () => {
                before(async () => {
                    // strategy should has tokens
                    await TokenContract.mint(strategy, 1);

                    // strategy should approve tokens to the adapter
                    await TokenContract.connect(strategy).approve(
                        await UniswapV3AdapterContract.getAddress(),
                        2,
                    );

                    // set amountSpent
                    await UniswapV3RouterContract.setExactOutput(1);
                });

                it("THEN it should emit event", async () => {
                    txResult = await UniswapV3AdapterContract.withdraw(
                        strategy,
                        vault,
                        wethAddress,
                        1,
                        tokenAddress,
                        1,
                        "0x00",
                    );

                    await expect(txResult)
                        .to.emit(UniswapV3AdapterContract, "WithdrawFromProtocol")
                        .withArgs(strategy, vault, tokenAddress, 1, wethAddress, 1);
                });
            });
        });

        describe("WHEN trying to call deposit", () => {
            it("THEN it should FAIL", async () => {
                await expect(
                    UniswapV3AdapterContract.deposit(
                        ZERO_ADDRESS,
                        ZERO_ADDRESS,
                        ZERO_ADDRESS,
                        0,
                        false,
                    ),
                ).to.be.revertedWith(await UniswapV3AdapterContract.REVERT_MSG());
            });
        });

        describe("WHEN call getAmountInForexactOutput", () => {
            it("THEN it should return value", async () => {
                await UniswapV3AdapterContract.getAmountInForexactOutput("0x00", 1);
            });
        });

        describe("WHEN trying to call claimEarnings", () => {
            it("THEN it should FAIL", async () => {
                await expect(
                    UniswapV3AdapterContract.claimEarnings(ZERO_ADDRESS, ZERO_ADDRESS),
                ).to.be.revertedWith(await UniswapV3AdapterContract.REVERT_MSG());
            });
        });

        describe("WHEN call getProtocol", () => {
            it("THEN is should return value", async () => {
                expect(await UniswapV3AdapterContract.getProtocol()).to.be.equal(
                    uniswapV3RouterAddress,
                );
            });
        });

        describe("WHEN call getTokenPrice", () => {
            describe("WHEN pool adress is ZERO", () => {
                it("THEN it should FAIL", async () => {
                    await expect(
                        UniswapV3AdapterContract.getTokenPrice(tokenAddress),
                    ).to.be.revertedWith("No pool defined for token");
                });
            });
            describe("WHEN all parameters are valid", () => {
                it("THEN is should return value", async () => {
                    await UniswapV3AdapterContract.setPoolPerTokenForPrice(
                        tokenAddress,
                        UniswapPoolAddress,
                    );

                    await UniswapPoolContract.setToken0(tokenAddress);

                    await UniswapPoolContract.setSlot0(ethers.parseEther("100"));

                    expect(await UniswapV3AdapterContract.getTokenPrice(tokenAddress)).to.be.equal(
                        1,
                    );
                });

                it("THEN is should return value", async () => {
                    await UniswapV3AdapterContract.setPoolPerTokenForPrice(
                        tokenAddress,
                        UniswapPoolAddress,
                    );

                    await UniswapPoolContract.setToken0(wethAddress);

                    await UniswapPoolContract.setSlot0(ethers.parseEther("100"));

                    expect(await UniswapV3AdapterContract.getTokenPrice(tokenAddress)).to.be.equal(
                        ethers.parseEther("1000000000000000000"),
                    );
                });
            });
        });
    });
});
