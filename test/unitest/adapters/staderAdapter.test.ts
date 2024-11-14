import {
    BigNumberish,
    ContractFactory,
    ContractTransactionResponse,
    MaxUint256,
    Signer,
} from "ethers";
import { ethers, upgrades } from "hardhat";
import { expect } from "chai";
import {
    SnapshotRestorer,
    takeSnapshot,
    setBalance,
} from "@nomicfoundation/hardhat-network-helpers";
import { ZERO_ADDRESS } from "../../_helpers/constants";
import { deployStaderAdapter } from "../../../scripts/_helpers/_deployContracts";
import { WETHMock, StaderAdapter, StaderMock } from "../../../types";

let snapshot: SnapshotRestorer;

let deployer: Signer;
let sender: Signer;
let receiver: Signer;

let txResult: ContractTransactionResponse;

let staderAdapterFactory: ContractFactory;
let staderAdapterContract: StaderAdapter;

let staderMockContact: StaderMock;
let protocolAddress: string;

let WETHContract: WETHMock;
let wethAddress: string;

let ethxContract: WETHMock;
let ethxAddress: string;

let tokenAmount: BigNumberish;

describe("Vaults Registry Tests", function () {
    before(async () => {
        [deployer, sender, receiver] = await ethers.getSigners();

        tokenAmount = ethers.parseEther("1");

        // Deploy stader Mock contract
        staderMockContact = await (await ethers.getContractFactory("StaderMock")).deploy();
        protocolAddress = await staderMockContact.getAddress();

        // Deploy WETH Mock contract
        WETHContract = await (await ethers.getContractFactory("WETHMock")).deploy();
        wethAddress = await WETHContract.getAddress();

        // Deploy WETH Mock contract
        ethxContract = await (await ethers.getContractFactory("WETHMock")).deploy();
        ethxAddress = await ethxContract.getAddress();

        await setBalance(wethAddress, ethers.parseEther("100000"));

        staderAdapterFactory = await ethers.getContractFactory("StaderAdapter");
    });

    describe("WHEN trying to deploy staderAdapter contract with incorrect parameters", function () {
        it("THEN it should FAIL when protocolAddress is ZERO address", async () => {
            await expect(
                upgrades.deployProxy(staderAdapterFactory, [
                    ZERO_ADDRESS,
                    wethAddress,
                    ethxAddress,
                ]),
            )
                .to.be.revertedWithCustomError(staderAdapterFactory, "ZeroAddress")
                .withArgs("protocolAddress_");
        });

        it("THEN it should FAIL when ethxAddress is ZERO address", async () => {
            await expect(
                upgrades.deployProxy(staderAdapterFactory, [
                    protocolAddress,
                    wethAddress,
                    ZERO_ADDRESS,
                ]),
            )
                .to.be.revertedWithCustomError(staderAdapterFactory, "ZeroAddress")
                .withArgs("ethxAddress_");
        });

        it("THEN it should FAIL when wethAddress is ZERO address", async () => {
            await expect(
                upgrades.deployProxy(staderAdapterFactory, [
                    protocolAddress,
                    ZERO_ADDRESS,
                    ethxAddress,
                ]),
            )
                .to.be.revertedWithCustomError(staderAdapterFactory, "ZeroAddress")
                .withArgs("wethAddress_");
        });

        it("THEN it should FAIL when contract has been initalized already", async () => {
            staderAdapterContract = (await deployStaderAdapter(
                "StaderAdapter",
                protocolAddress,
                wethAddress,
                ethxAddress,
            )) as unknown as StaderAdapter;

            await expect(
                staderAdapterContract.initialize(protocolAddress, wethAddress, ethxAddress),
            ).to.be.revertedWithCustomError(staderAdapterFactory, "InvalidInitialization");
        });
    });

    describe("WHEN deploying staderAdapter contract with correct parameters", function () {
        before(async () => {
            staderAdapterContract = (await deployStaderAdapter(
                "StaderAdapter",
                protocolAddress,
                wethAddress,
                ethxAddress,
            )) as unknown as StaderAdapter;
            await staderAdapterContract.grantRole(
                await staderAdapterContract.VAULT_STRATEGY_ROLE(),
                await deployer.getAddress(),
            );

            await WETHContract.mint(sender, ethers.parseEther("1000"));
            await WETHContract.connect(sender).approve(
                await staderAdapterContract.getAddress(),
                MaxUint256,
            );
            snapshot = await takeSnapshot();
        });

        it("THEN contract init functions should match", async () => {
            expect(await staderAdapterContract.protocolAddress()).equals(protocolAddress);
            expect(await staderAdapterContract.getProtocol()).equals(protocolAddress);
        });

        describe("WHEN trying to execute deposit", () => {
            this.afterEach(async () => {
                await snapshot.restore();
            });
            describe("WHEN the adapter has been paused", () => {
                it("THEN it should FAIL", async () => {
                    await staderAdapterContract.pause();
                    await expect(
                        staderAdapterContract
                            .connect(sender)
                            .deposit(sender, receiver, wethAddress, tokenAmount, true),
                    ).to.be.revertedWithCustomError(staderAdapterContract, "EnforcedPause");
                });
            });

            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await expect(
                        staderAdapterContract
                            .connect(sender)
                            .deposit(sender, receiver, wethAddress, tokenAmount, true),
                    ).to.be.revertedWithCustomError(
                        staderAdapterContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });

            describe("WHEN token is no WETH", () => {
                it("THEN it should FAIL with OnlyWETHAllowed", async () => {
                    await expect(
                        staderAdapterContract.deposit(
                            sender,
                            receiver,
                            ethxAddress,
                            tokenAmount,
                            false,
                        ),
                    ).to.be.revertedWithCustomError(staderAdapterContract, "OnlyWETHAllowed");
                });
            });

            describe("WHEN staking paused in protocol", () => {
                before(async () => {
                    await staderMockContact.pause(true);
                });

                it("THEN it should FAIL with StakingPaused", async () => {
                    await expect(
                        staderAdapterContract.deposit(
                            sender,
                            receiver,
                            wethAddress,
                            tokenAmount,
                            false,
                        ),
                    ).to.be.revertedWithCustomError(staderAdapterContract, "StakingPaused");
                });
            });

            describe("WHEN amount exceeds min deposit deposit on protocol", () => {
                before(async () => {
                    await staderMockContact.setMinDeposit(MaxUint256);
                });

                it("THEN it should FAIL with MinDeposit", async () => {
                    await expect(
                        staderAdapterContract.deposit(
                            sender,
                            receiver,
                            wethAddress,
                            tokenAmount,
                            false,
                        ),
                    ).to.be.revertedWithCustomError(staderAdapterContract, "MinDeposit");
                });
            });

            describe("WHEN amount exceeds max deposit deposit on protocol", () => {
                before(async () => {
                    await staderMockContact.setMaxDeposit(0);
                });
                it("THEN it should FAIL with MaxDeposit", async () => {
                    await expect(
                        staderAdapterContract.deposit(
                            sender,
                            receiver,
                            wethAddress,
                            tokenAmount,
                            false,
                        ),
                    ).to.be.revertedWithCustomError(staderAdapterContract, "MaxDeposit");
                });
            });

            describe("WHEN slipage exceeded on deposit", () => {
                it("THEN it should FAIL with SlippageExceededOnDeposit", async () => {
                    await expect(
                        staderAdapterContract.deposit(
                            sender,
                            receiver,
                            wethAddress,
                            tokenAmount,
                            false,
                        ),
                    ).to.be.revertedWithCustomError(
                        staderAdapterContract,
                        "SlippageExceededOnDeposit",
                    );
                });
            });

            describe("WHEN calling with invalid parameters", () => {
                describe("WHEN sender is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(
                            staderAdapterContract.deposit(
                                ZERO_ADDRESS,
                                receiver,
                                wethAddress,
                                1,
                                false,
                            ),
                        )
                            .to.be.revertedWithCustomError(staderAdapterContract, "ZeroAddress")
                            .withArgs("sender_");
                    });
                });
                describe("WHEN receiver is ZERO address", () => {
                    it("THEN it should FAIL ", async () => {
                        await expect(
                            staderAdapterContract.deposit(
                                sender,
                                ZERO_ADDRESS,
                                wethAddress,
                                1,
                                false,
                            ),
                        )
                            .to.be.revertedWithCustomError(staderAdapterContract, "ZeroAddress")
                            .withArgs("receiver_");
                    });
                });
                describe("WHEN token is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(
                            staderAdapterContract.deposit(sender, receiver, ZERO_ADDRESS, 1, false),
                        )
                            .to.be.revertedWithCustomError(staderAdapterContract, "ZeroAddress")
                            .withArgs("token_");
                    });
                });
                describe("WHEN tokenAmount is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(
                            staderAdapterContract.deposit(sender, receiver, wethAddress, 0, false),
                        )
                            .to.be.revertedWithCustomError(staderAdapterContract, "ZeroAmount")
                            .withArgs("tokenAmount_");
                    });
                });
            });

            describe("WHEN calling with valid parameters", () => {
                describe("WHEN calling deposit", () => {
                    before(async () => {
                        await ethxContract.mint(staderAdapterContract, MaxUint256);
                        await staderMockContact.setDeposit(tokenAmount);
                        tokenAmount = 1000;
                        txResult = await staderAdapterContract.deposit(
                            sender,
                            receiver,
                            wethAddress,
                            tokenAmount,
                            false,
                        );
                    });
                    it("THEN event DepositedOnProtocol should be emitted", async () => {
                        await expect(txResult).to.emit(
                            staderAdapterContract,
                            "DepositedOnProtocol",
                        );
                    });
                });
            });
        });

        describe("WHEN trying to set protocol address", () => {
            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await expect(
                        staderAdapterContract.connect(receiver).setprotocolAddress(protocolAddress),
                    ).to.be.revertedWithCustomError(
                        staderAdapterContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });

            describe("WHEN protocol address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await expect(staderAdapterContract.setprotocolAddress(ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(staderAdapterContract, "ZeroAddress")
                        .withArgs("protocolAddress_");
                });
            });

            describe("WHEN protocol address is correct", () => {
                before(async () => {
                    // TODO: protocol address
                    txResult = await staderAdapterContract.setprotocolAddress(protocolAddress);
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await expect(txResult)
                        .to.emit(staderAdapterContract, "AddressUpdated")
                        .withArgs("protocolAddress", protocolAddress);
                });
            });
        });

        describe("WHEN trying to set ethxAddress_ address", () => {
            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await expect(
                        staderAdapterContract.connect(receiver).setETHxAddress(ethxAddress),
                    ).to.be.revertedWithCustomError(
                        staderAdapterContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });

            describe("WHEN protocol address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await expect(staderAdapterContract.setETHxAddress(ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(staderAdapterContract, "ZeroAddress")
                        .withArgs("ethxAddress_");
                });
            });

            describe("WHEN protocol address is correct", () => {
                before(async () => {
                    // TODO: protocol address
                    txResult = await staderAdapterContract.setETHxAddress(ethxAddress);
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await expect(txResult)
                        .to.emit(staderAdapterContract, "AddressUpdated")
                        .withArgs("ethxAddress_", ethxAddress);
                });
            });
        });

        describe("WHEN trying to call withdraw", () => {
            it("THEN it should FAIL", async () => {
                await expect(
                    staderAdapterContract.withdraw(
                        ZERO_ADDRESS,
                        ZERO_ADDRESS,
                        ZERO_ADDRESS,
                        0,
                        ZERO_ADDRESS,
                        0,
                        "0x00",
                    ),
                ).to.be.revertedWith(await staderAdapterContract.REVERT_MSG());
            });
        });

        describe("WHEN trying to call claimEarnings", () => {
            it("THEN it should FAIL", async () => {
                await expect(
                    staderAdapterContract.claimEarnings(ZERO_ADDRESS, ZERO_ADDRESS),
                ).to.be.revertedWith(await staderAdapterContract.REVERT_MSG());
            });
        });

        describe("WHEN trying to call getTokenPrice", () => {
            it("THEN it should FAIL", async () => {
                await expect(staderAdapterContract.getTokenPrice(ZERO_ADDRESS)).to.be.revertedWith(
                    await staderAdapterContract.REVERT_MSG(),
                );
            });
        });
    });
});
