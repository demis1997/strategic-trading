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
import { deployRocketAdapter } from "../../../scripts/_helpers/_deployContracts";
import {
    WETHMock,
    RocketAdapter,
    RocketSettingsMock,
    RocketPoolMock,
    RETHMock,
} from "../../../types";

let snapshot: SnapshotRestorer;

let deployer: Signer;
let sender: Signer;
let receiver: Signer;

let txResult: ContractTransactionResponse;

let rocketAdapterFactory: ContractFactory;
let rocketAdapterContract: RocketAdapter;

let rocketMockContact: RocketPoolMock;
let protocolAddress: string;

let rocketSettingsMockContact: RocketSettingsMock;
let rocketSettingsMockAddress: string;

let WETHContract: WETHMock;
let wethAddress: string;

let rETH: RETHMock;
let rETHAddress: string;

let tokenAmount: BigNumberish;

describe("Rocket Protocol Tests", function () {
    before(async () => {
        [deployer, sender, receiver] = await ethers.getSigners();

        tokenAmount = ethers.parseEther("1");

        // Deploy WETH Mock contract
        WETHContract = await (await ethers.getContractFactory("WETHMock")).deploy();
        wethAddress = await WETHContract.getAddress();

        await setBalance(wethAddress, ethers.parseEther("10000"));

        // Deploy rETH Mock contract
        rETH = await (await ethers.getContractFactory("RETHMock")).deploy();
        rETHAddress = await rETH.getAddress();

        // Deploy rocket Mock contract
        rocketMockContact = await (
            await ethers.getContractFactory("RocketPoolMock")
        ).deploy(rETHAddress);
        protocolAddress = await rocketMockContact.getAddress();

        // Deploy rocket Mock contract
        rocketSettingsMockContact = await (
            await ethers.getContractFactory("RocketSettingsMock")
        ).deploy();
        rocketSettingsMockAddress = await rocketSettingsMockContact.getAddress();

        rocketAdapterFactory = await ethers.getContractFactory("RocketAdapter");
    });

    describe("WHEN trying to deploy rocketAdapter contract with incorrect parameters", function () {
        it("THEN it should FAIL when protocolAddress is ZERO address", async () => {
            await expect(
                upgrades.deployProxy(rocketAdapterFactory, [
                    ZERO_ADDRESS,
                    rocketSettingsMockAddress,
                    wethAddress,
                    rETHAddress,
                ]),
            )
                .to.be.revertedWithCustomError(rocketAdapterFactory, "ZeroAddress")
                .withArgs("protocolAddress_");
        });

        it("THEN it should FAIL when rocket settings is ZERO address", async () => {
            await expect(
                upgrades.deployProxy(rocketAdapterFactory, [
                    protocolAddress,
                    ZERO_ADDRESS,
                    wethAddress,
                    rETHAddress,
                ]),
            )
                .to.be.revertedWithCustomError(rocketAdapterFactory, "ZeroAddress")
                .withArgs("rocketSettingsAddress_");
        });

        it("THEN it should FAIL when WETH is ZERO address", async () => {
            await expect(
                upgrades.deployProxy(rocketAdapterFactory, [
                    protocolAddress,
                    rocketSettingsMockAddress,
                    ZERO_ADDRESS,
                    rETHAddress,
                ]),
            )
                .to.be.revertedWithCustomError(rocketAdapterFactory, "ZeroAddress")
                .withArgs("wethAddress_");
        });

        it("THEN it should FAIL when rETH is ZERO address", async () => {
            await expect(
                upgrades.deployProxy(rocketAdapterFactory, [
                    protocolAddress,
                    rocketSettingsMockAddress,
                    wethAddress,
                    ZERO_ADDRESS,
                ]),
            )
                .to.be.revertedWithCustomError(rocketAdapterFactory, "ZeroAddress")
                .withArgs("rETHAddress_");
        });

        it("THEN it should FAIL when contract has been initalized already", async () => {
            rocketAdapterContract = (await deployRocketAdapter(
                "RocketAdapter",
                protocolAddress,
                rocketSettingsMockAddress,
                wethAddress,
                rETHAddress,
            )) as unknown as RocketAdapter;

            await expect(
                rocketAdapterContract.initialize(
                    protocolAddress,
                    rocketSettingsMockAddress,
                    wethAddress,
                    rETHAddress,
                ),
            ).to.be.revertedWithCustomError(rocketAdapterFactory, "InvalidInitialization");
        });
    });

    describe("WHEN deploying rocketAdapter contract with correct parameters", function () {
        before(async () => {
            rocketAdapterContract = (await deployRocketAdapter(
                "RocketAdapter",
                protocolAddress,
                rocketSettingsMockAddress,
                wethAddress,
                rETHAddress,
            )) as unknown as RocketAdapter;
            await rocketAdapterContract.grantRole(
                await rocketAdapterContract.VAULT_STRATEGY_ROLE(),
                await deployer.getAddress(),
            );

            await rocketSettingsMockContact.setDepositEnabled(true);
            await rocketSettingsMockContact.setMinimumDeposit(0);
            await rocketSettingsMockContact.setMaximumDepositPoolSize(0);

            await rocketMockContact.setBalance(tokenAmount);

            await rETH.setExchangeRate(1);

            snapshot = await takeSnapshot();
        });

        it("THEN contract init functions should match", async () => {
            expect(await rocketAdapterContract.protocolAddress()).equals(protocolAddress);
            expect(await rocketAdapterContract.getProtocol()).equals(protocolAddress);
            expect(await rocketAdapterContract.rETHAddress()).equals(rETHAddress);
            expect(await rocketAdapterContract.rocketSettingsAddress()).equals(
                rocketSettingsMockAddress,
            );

            expect(await rocketAdapterContract.protocolName()).equals("Rocket");
            expect(await rocketAdapterContract.getSlippage()).equals(ethers.parseEther("0.1"));
        });

        describe("WHEN trying to execute deposit", () => {
            describe("WHEN the adapter has been paused", () => {
                it("THEN it should FAIL", async () => {
                    await rocketAdapterContract.pause();
                    await expect(
                        rocketAdapterContract
                            .connect(sender)
                            .deposit(sender, receiver, rETHAddress, tokenAmount, true),
                    ).to.be.revertedWithCustomError(rocketAdapterContract, "EnforcedPause");
                });
            });

            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await expect(
                        rocketAdapterContract
                            .connect(sender)
                            .deposit(sender, receiver, wethAddress, tokenAmount, true),
                    ).to.be.revertedWithCustomError(
                        rocketAdapterContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });

            describe("WHEN token amount less than min deposit", () => {
                before(async () => {
                    await WETHContract.mint(await sender.getAddress(), tokenAmount);
                    await WETHContract.connect(sender).approve(
                        await rocketAdapterContract.getAddress(),
                        tokenAmount,
                    );
                });

                it("THEN it should fail with MinDeposit", async () => {
                    await rocketSettingsMockContact.setMinimumDeposit(MaxUint256);
                    await expect(
                        rocketAdapterContract.deposit(
                            sender,
                            receiver,
                            wethAddress,
                            tokenAmount,
                            false,
                        ),
                    ).to.be.revertedWithCustomError(rocketAdapterContract, "MinDeposit");
                });
            });

            describe("WHEN token amount more than protocol capacity", () => {
                before(async () => {
                    await WETHContract.mint(await sender.getAddress(), tokenAmount);
                    await WETHContract.connect(sender).approve(
                        await rocketAdapterContract.getAddress(),
                        tokenAmount,
                    );
                });

                it("THEN it should fail with ExceedCapacity", async () => {
                    await expect(
                        rocketAdapterContract.deposit(
                            sender,
                            receiver,
                            wethAddress,
                            tokenAmount,
                            false,
                        ),
                    ).to.be.revertedWithCustomError(rocketAdapterContract, "ExceedCapacity");
                });
            });

            describe("WHEN token is not WETH", () => {
                it("THEN it should fail with OnlyWETHAllowed", async () => {
                    await expect(
                        rocketAdapterContract.deposit(
                            sender,
                            receiver,
                            rETHAddress,
                            tokenAmount,
                            false,
                        ),
                    ).to.be.revertedWithCustomError(rocketAdapterContract, "OnlyWETHAllowed");
                });
            });

            describe("WHEN staking is paused", () => {
                before(async () => {
                    await WETHContract.mint(await sender.getAddress(), tokenAmount);
                    await WETHContract.connect(sender).approve(
                        await rocketAdapterContract.getAddress(),
                        tokenAmount,
                    );
                    await rocketSettingsMockContact.setDepositEnabled(false);
                });

                it("THEN it should fail with StakingPaused", async () => {
                    await expect(
                        rocketAdapterContract.deposit(
                            sender,
                            receiver,
                            wethAddress,
                            tokenAmount,
                            false,
                        ),
                    ).to.be.revertedWithCustomError(rocketAdapterContract, "StakingPaused");
                });
            });

            describe("WHEN calling with invalid parameters", () => {
                describe("WHEN sender is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(
                            rocketAdapterContract.deposit(
                                ZERO_ADDRESS,
                                receiver,
                                wethAddress,
                                1,
                                false,
                            ),
                        )
                            .to.be.revertedWithCustomError(rocketAdapterContract, "ZeroAddress")
                            .withArgs("sender_");
                    });
                });
                describe("WHEN receiver is ZERO address", () => {
                    it("THEN it should FAIL ", async () => {
                        await expect(
                            rocketAdapterContract.deposit(
                                sender,
                                ZERO_ADDRESS,
                                wethAddress,
                                1,
                                false,
                            ),
                        )
                            .to.be.revertedWithCustomError(rocketAdapterContract, "ZeroAddress")
                            .withArgs("receiver_");
                    });
                });
                describe("WHEN token is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(
                            rocketAdapterContract.deposit(sender, receiver, ZERO_ADDRESS, 1, false),
                        )
                            .to.be.revertedWithCustomError(rocketAdapterContract, "ZeroAddress")
                            .withArgs("token_");
                    });
                });
                describe("WHEN tokenAmount is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(
                            rocketAdapterContract.deposit(sender, receiver, wethAddress, 0, false),
                        )
                            .to.be.revertedWithCustomError(rocketAdapterContract, "ZeroAmount")
                            .withArgs("tokenAmount_");
                    });
                });
            });

            describe("WHEN calling with valid parameters", () => {
                before(async () => {
                    await WETHContract.mint(await sender.getAddress(), tokenAmount);
                    await WETHContract.connect(sender).approve(
                        await rocketAdapterContract.getAddress(),
                        tokenAmount,
                    );

                    snapshot = await takeSnapshot();
                });

                this.afterEach(async () => {
                    await snapshot.restore();
                });

                describe("WHEN calling deposit", () => {
                    before(async () => {
                        await rocketSettingsMockContact.setMaximumDepositPoolSize(MaxUint256);
                        txResult = await rocketAdapterContract.deposit(
                            sender,
                            receiver,
                            wethAddress,
                            tokenAmount,
                            false,
                        );
                    });
                    it("THEN event DepositedOnProtocol should be emitted", async () => {
                        await expect(txResult).to.emit(
                            rocketAdapterContract,
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
                        rocketAdapterContract.connect(receiver).setprotocolAddress(protocolAddress),
                    ).to.be.revertedWithCustomError(
                        rocketAdapterContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });

            describe("WHEN protocol address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await expect(rocketAdapterContract.setprotocolAddress(ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(rocketAdapterContract, "ZeroAddress")
                        .withArgs("protocolAddress_");
                });
            });

            describe("WHEN protocol address is correct", () => {
                before(async () => {
                    // TODO: protocol address
                    txResult = await rocketAdapterContract.setprotocolAddress(protocolAddress);
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await expect(txResult)
                        .to.emit(rocketAdapterContract, "AddressUpdated")
                        .withArgs("protocolAddress", protocolAddress);
                });
            });
        });

        describe("WHEN trying to set setRETHAddress address", () => {
            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await expect(
                        rocketAdapterContract.connect(receiver).setRETHAddress(rETHAddress),
                    ).to.be.revertedWithCustomError(
                        rocketAdapterContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });

            describe("WHEN protocol address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await expect(rocketAdapterContract.setRETHAddress(ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(rocketAdapterContract, "ZeroAddress")
                        .withArgs("rETHAddress_");
                });
            });

            describe("WHEN protocol address is correct", () => {
                before(async () => {
                    // TODO: protocol address
                    txResult = await rocketAdapterContract.setRETHAddress(rETHAddress);
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await expect(txResult)
                        .to.emit(rocketAdapterContract, "AddressUpdated")
                        .withArgs("rETHAddress", rETHAddress);
                });
            });
        });

        describe("WHEN trying to call withdraw", () => {
            describe("WHEN ethValue exceed total collateral", () => {
                it("THEN it should fail", async () => {
                    await expect(
                        rocketAdapterContract.withdraw(
                            receiver,
                            sender,
                            wethAddress,
                            1,
                            rETHAddress,
                            1,
                            "0x00",
                        ),
                    ).to.be.revertedWithoutReason();
                });
            });
            xdescribe("WHEN executing the withdraw", () => {
                it("THEN it should emit event", async () => {
                    await rETH.setTotalCollateral(MaxUint256);
                    await setBalance(
                        await rocketAdapterContract.getAddress(),
                        ethers.parseEther("1000"),
                    );
                    await rETH.mint(receiver, 1);
                    await WETHContract.mint(
                        await rocketAdapterContract.getAddress(),
                        ethers.parseEther("100"),
                    );
                    await rETH
                        .connect(receiver)
                        .approve(await rocketAdapterContract.getAddress(), MaxUint256);

                    txResult = await rocketAdapterContract.withdraw(
                        receiver,
                        sender,
                        wethAddress,
                        1,
                        rETHAddress,
                        1,
                        "0x00",
                    );

                    await expect(txResult).to.emit(rocketAdapterContract, "WithdrawFromProtocol");
                });
            });
        });

        describe("WHEN trying to call claimEarnings", () => {
            it("THEN it should FAIL", async () => {
                await expect(
                    rocketAdapterContract.claimEarnings(ZERO_ADDRESS, ZERO_ADDRESS),
                ).to.be.revertedWith(await rocketAdapterContract.REVERT_MSG());
            });
        });

        describe("WHEN trying to call getTokenPrice", () => {
            it("THEN it should return a value", async () => {
                expect(await rocketAdapterContract.getTokenPrice(ZERO_ADDRESS)).to.be.equal(1);
            });
        });
    });
});
