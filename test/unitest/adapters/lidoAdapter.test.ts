import { BigNumberish, ContractFactory, ContractTransactionResponse, Signer } from "ethers";
import { ethers, upgrades } from "hardhat";
import { expect } from "chai";
import {
    SnapshotRestorer,
    takeSnapshot,
    setBalance,
} from "@nomicfoundation/hardhat-network-helpers";
import { ZERO_ADDRESS } from "../../_helpers/constants";
import { deployLidoAdapter } from "../../../scripts/_helpers/_deployContracts";
import { WETHMock, LidoAdapter, WstETHMock, LidoMock } from "../../../types";

let snapshot: SnapshotRestorer;

let deployer: Signer;
let sender: Signer;
let receiver: Signer;

let txResult: ContractTransactionResponse;

let LidoAdapterFactory: ContractFactory;
let lidoAdapterContract: LidoAdapter;

let LidoMockContact: LidoMock;
let protocolAddress: string;

let WETHContract: WETHMock;
let wethAddress: string;

let wstETHContract: WstETHMock;
let wstETHAddress: string;

let tokenAmount: BigNumberish;

describe("Vaults Registry Tests", function () {
    before(async () => {
        [deployer, sender, receiver] = await ethers.getSigners();

        tokenAmount = ethers.parseEther("100");

        // Deploy Lido Mock contract
        LidoMockContact = await (await ethers.getContractFactory("LidoMock")).deploy();
        protocolAddress = await LidoMockContact.getAddress();

        // Deploy WETH Mock contract
        WETHContract = await (await ethers.getContractFactory("WETHMock")).deploy();
        wethAddress = await WETHContract.getAddress();
        await setBalance(wethAddress, ethers.parseEther("100000"));

        // Deploy wstETH mock contract
        wstETHContract = await (
            await ethers.getContractFactory("WstETHMock")
        ).deploy(protocolAddress);
        wstETHAddress = await wstETHContract.getAddress();

        LidoAdapterFactory = await ethers.getContractFactory("LidoAdapter");
    });

    describe("WHEN trying to deploy LidoAdapter contract with incorrect parameters", function () {
        it("THEN it should FAIL when protocolAddress is ZERO address", async () => {
            await expect(
                upgrades.deployProxy(LidoAdapterFactory, [
                    ZERO_ADDRESS,
                    wethAddress,
                    wstETHAddress,
                ]),
            )
                .to.be.revertedWithCustomError(LidoAdapterFactory, "ZeroAddress")
                .withArgs("protocolAddress_");
        });

        it("THEN it should FAIL when wethAddress is ZERO address", async () => {
            await expect(
                upgrades.deployProxy(LidoAdapterFactory, [
                    protocolAddress,
                    ZERO_ADDRESS,
                    wstETHAddress,
                ]),
            )
                .to.be.revertedWithCustomError(LidoAdapterFactory, "ZeroAddress")
                .withArgs("wethAddress_");
        });

        it("THEN it should FAIL when wstETHAddress is ZERO address", async () => {
            await expect(
                upgrades.deployProxy(LidoAdapterFactory, [
                    protocolAddress,
                    wethAddress,
                    ZERO_ADDRESS,
                ]),
            )
                .to.be.revertedWithCustomError(LidoAdapterFactory, "ZeroAddress")
                .withArgs("wstETHAddress_");
        });

        it("THEN it should FAIL when contract has been initalized already", async () => {
            lidoAdapterContract = (await deployLidoAdapter(
                "LidoAdapter",
                protocolAddress,
                wethAddress,
                wstETHAddress,
            )) as unknown as LidoAdapter;

            await expect(
                lidoAdapterContract.initialize(protocolAddress, wethAddress, wstETHAddress),
            ).to.be.revertedWithCustomError(LidoAdapterFactory, "InvalidInitialization");
        });
    });

    describe("WHEN deploying LidoAdapter contract with correct parameters", function () {
        before(async () => {
            lidoAdapterContract = (await deployLidoAdapter(
                "LidoAdapter",
                protocolAddress,
                wethAddress,
                wstETHAddress,
            )) as unknown as LidoAdapter;
            await lidoAdapterContract.grantRole(
                await lidoAdapterContract.VAULT_STRATEGY_ROLE(),
                await deployer.getAddress(),
            );
            snapshot = await takeSnapshot();
        });

        it("THEN contract init functions should match", async () => {
            expect(await lidoAdapterContract.protocolAddress()).equals(protocolAddress);
            expect(await lidoAdapterContract.wstETHAddress()).equals(wstETHAddress);
            expect(await lidoAdapterContract.getProtocol()).equals(protocolAddress);
        });

        describe("WHEN trying to execute deposit", () => {
            describe("WHEN the adapter has been paused", () => {
                it("THEN it should FAIL", async () => {
                    await lidoAdapterContract.pause();
                    await expect(
                        lidoAdapterContract
                            .connect(sender)
                            .deposit(sender, receiver, wethAddress, tokenAmount, true),
                    ).to.be.revertedWithCustomError(lidoAdapterContract, "EnforcedPause");
                });
            });

            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await expect(
                        lidoAdapterContract
                            .connect(sender)
                            .deposit(sender, receiver, wethAddress, tokenAmount, true),
                    ).to.be.revertedWithCustomError(
                        lidoAdapterContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });

            describe("WHEN calling with invalid parameters", () => {
                describe("WHEN sender is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(
                            lidoAdapterContract.deposit(
                                ZERO_ADDRESS,
                                receiver,
                                wethAddress,
                                1,
                                false,
                            ),
                        )
                            .to.be.revertedWithCustomError(lidoAdapterContract, "ZeroAddress")
                            .withArgs("sender_");
                    });
                });
                describe("WHEN receiver is ZERO address", () => {
                    it("THEN it should FAIL ", async () => {
                        await expect(
                            lidoAdapterContract.deposit(
                                sender,
                                ZERO_ADDRESS,
                                wethAddress,
                                1,
                                false,
                            ),
                        )
                            .to.be.revertedWithCustomError(lidoAdapterContract, "ZeroAddress")
                            .withArgs("receiver_");
                    });
                });
                describe("WHEN token is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(
                            lidoAdapterContract.deposit(sender, receiver, ZERO_ADDRESS, 1, false),
                        )
                            .to.be.revertedWithCustomError(lidoAdapterContract, "ZeroAddress")
                            .withArgs("token_");
                    });
                });
                describe("WHEN tokenAmount is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(
                            lidoAdapterContract.deposit(sender, receiver, wethAddress, 0, false),
                        )
                            .to.be.revertedWithCustomError(lidoAdapterContract, "ZeroAmount")
                            .withArgs("tokenAmount_");
                    });
                });
                describe("WHEN token is not WETH", () => {
                    it("THEN it should FAIL", async () => {
                        // TODO: random address?
                        const tokenAddress = await deployer.getAddress();
                        await expect(
                            lidoAdapterContract.deposit(
                                sender,
                                receiver,
                                tokenAddress,
                                tokenAmount,
                                false,
                            ),
                        ).to.be.revertedWithCustomError(lidoAdapterContract, "OnlyWETHAllowed");
                    });
                });
            });
            describe("WHEN calling with valid parameters", () => {
                before(async () => {
                    await WETHContract.mint(await sender.getAddress(), tokenAmount);
                    await WETHContract.connect(sender).approve(
                        await lidoAdapterContract.getAddress(),
                        tokenAmount,
                    );

                    snapshot = await takeSnapshot();
                });

                this.afterEach(async () => {
                    await snapshot.restore();
                });

                describe("WHEN Lido staking is paused", () => {
                    it("THEN it should FAIL", async () => {
                        // set paused as true
                        await LidoMockContact.setPaused(true);
                        await expect(
                            lidoAdapterContract.deposit(
                                sender,
                                receiver,
                                wethAddress,
                                tokenAmount,
                                false,
                            ),
                        ).to.be.revertedWithCustomError(lidoAdapterContract, "StakingPaused");
                    });
                });

                describe("WHEN slippage exceeded on deposit", () => {
                    it("THEN it should fail", async () => {
                        // set slippage 100%
                        await LidoMockContact.setSlippage(ethers.parseEther("1"));
                        await expect(
                            lidoAdapterContract.deposit(
                                sender,
                                receiver,
                                wethAddress,
                                tokenAmount,
                                false,
                            ),
                        ).to.be.revertedWithCustomError(
                            lidoAdapterContract,
                            "SlippageExceededOnDeposit",
                        );
                    });
                });

                describe("WHEN calling deposit without wrapping", () => {
                    before(async () => {
                        txResult = await lidoAdapterContract.deposit(
                            sender,
                            receiver,
                            wethAddress,
                            tokenAmount,
                            false,
                        );
                    });
                    it("THEN event DepositedOnProtocol should be emitted", async () => {
                        const tknAmount = await LidoMockContact.balanceOf(receiver);
                        await expect(txResult)
                            .to.emit(lidoAdapterContract, "DepositedOnProtocol")
                            .withArgs(sender, wethAddress, tokenAmount, protocolAddress, tknAmount);
                    });
                });

                describe("WHEN calling deposit with wrapping", () => {
                    describe("WHEN wrapping is successful", () => {
                        before(async () => {
                            txResult = await lidoAdapterContract.deposit(
                                sender,
                                receiver,
                                wethAddress,
                                tokenAmount,
                                true,
                            );
                        });

                        it("THEN event DepositedOnProtocol should be emitted", async () => {
                            const tknAmount = await wstETHContract.balanceOf(receiver);
                            await expect(txResult)
                                .to.emit(lidoAdapterContract, "DepositedOnProtocol")
                                .withArgs(
                                    sender,
                                    wethAddress,
                                    tokenAmount,
                                    wstETHAddress,
                                    tknAmount,
                                );
                        });
                    });
                    describe("WHEN wrapping is unsuccessful", () => {
                        it("THEN it should FAIL", async () => {
                            await wstETHContract.setTokenPerShare(0);
                            await expect(
                                lidoAdapterContract.deposit(
                                    sender,
                                    receiver,
                                    wethAddress,
                                    tokenAmount,
                                    true,
                                ),
                            ).to.be.revertedWithCustomError(lidoAdapterContract, "WrapError");
                        });
                    });
                });
            });
        });

        describe("WHEN trying to set protocol address", () => {
            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await expect(
                        lidoAdapterContract.connect(receiver).setprotocolAddress(protocolAddress),
                    ).to.be.revertedWithCustomError(
                        lidoAdapterContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });

            describe("WHEN protocol address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await expect(lidoAdapterContract.setprotocolAddress(ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(lidoAdapterContract, "ZeroAddress")
                        .withArgs("protocolAddress_");
                });
            });

            describe("WHEN protocol address is correct", () => {
                before(async () => {
                    // TODO: protocol address
                    txResult = await lidoAdapterContract.setprotocolAddress(protocolAddress);
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await expect(txResult)
                        .to.emit(lidoAdapterContract, "AddressUpdated")
                        .withArgs("protocolAddress", protocolAddress);
                });
            });
        });

        describe("WHEN trying to set wstETH address", () => {
            describe("WHEN wstETH address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await expect(lidoAdapterContract.setWstETHAddress(ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(lidoAdapterContract, "ZeroAddress")
                        .withArgs("wstETHAddress_");
                });
            });

            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await expect(
                        lidoAdapterContract.connect(receiver).setWstETHAddress(wstETHAddress),
                    ).to.be.revertedWithCustomError(
                        lidoAdapterContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });
            describe("WHEN protocol address is correct", () => {
                before(async () => {
                    // TODO: protocol address
                    txResult = await lidoAdapterContract.setWstETHAddress(wstETHAddress);
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await expect(txResult)
                        .to.emit(lidoAdapterContract, "AddressUpdated")
                        .withArgs("wstETHAddress", wstETHAddress);
                });
            });
        });

        describe("WHEN trying to set WETH address", () => {
            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await expect(
                        lidoAdapterContract.connect(receiver).setWETHAddress(wethAddress),
                    ).to.be.revertedWithCustomError(
                        lidoAdapterContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });

            describe("WHEN protocol address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await expect(lidoAdapterContract.setWETHAddress(ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(lidoAdapterContract, "ZeroAddress")
                        .withArgs("wethAddress_");
                });
            });

            describe("WHEN WETH address is correct", () => {
                before(async () => {
                    // TODO: protocol address
                    txResult = await lidoAdapterContract.setWETHAddress(wethAddress);
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await expect(txResult)
                        .to.emit(lidoAdapterContract, "AddressUpdated")
                        .withArgs("wethAddress", wethAddress);
                });
            });
        });

        describe("WHEN trying to set slippage address", () => {
            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await expect(
                        lidoAdapterContract.connect(receiver).setSlippage(1),
                    ).to.be.revertedWithCustomError(
                        lidoAdapterContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });

            describe("WHEN setSlippage is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await expect(lidoAdapterContract.setSlippage(ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(lidoAdapterContract, "ZeroAmount")
                        .withArgs("slippage_");
                });
            });

            describe("WHEN WETH address is correct", () => {
                before(async () => {
                    // TODO: protocol address
                    txResult = await lidoAdapterContract.setSlippage(1);
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await expect(txResult)
                        .to.emit(lidoAdapterContract, "SlippageUpdated")
                        .withArgs(1);
                });
            });
        });

        describe("WHEN trying to call withdraw", () => {
            it("THEN it should FAIL", async () => {
                await expect(
                    lidoAdapterContract.withdraw(
                        ZERO_ADDRESS,
                        ZERO_ADDRESS,
                        ZERO_ADDRESS,
                        0,
                        ZERO_ADDRESS,
                        0,
                        "0x00",
                    ),
                ).to.be.revertedWith(await lidoAdapterContract.REVERT_MSG());
            });
        });

        describe("WHEN trying to call claimEarnings", () => {
            it("THEN it should FAIL", async () => {
                await expect(
                    lidoAdapterContract.claimEarnings(ZERO_ADDRESS, ZERO_ADDRESS),
                ).to.be.revertedWith(await lidoAdapterContract.REVERT_MSG());
            });
        });

        describe("WHEN trying to call getTokenPrice", () => {
            describe("WHEN calling token is stETH", () => {
                it("THEN is should return value", async () => {
                    expect(await lidoAdapterContract.getTokenPrice(protocolAddress)).to.be.equal(
                        ethers.parseEther("1"),
                    );
                });
            });
            describe("WHEN calling token is wstETH", () => {
                it("THEN is should return value", async () => {
                    const price = await LidoMockContact.getPooledEthByShares(
                        ethers.parseEther("1"),
                    );
                    expect(await lidoAdapterContract.getTokenPrice(wstETHAddress)).to.be.equal(
                        price,
                    );
                });
            });
            describe("WHEN calling token is invalid token", () => {
                it("THEN is should FAIL", async () => {
                    await expect(lidoAdapterContract.getTokenPrice(ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(lidoAdapterContract, "InvalidLidoPrice")
                        .withArgs(0, 0);
                });
            });
        });
    });
});
