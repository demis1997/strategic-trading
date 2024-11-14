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
import { deployKelpAdapter } from "../../../scripts/_helpers/_deployContracts";
import { WETHMock, KelpAdapter, KelpMock } from "../../../types";

let snapshot: SnapshotRestorer;

let deployer: Signer;
let sender: Signer;
let receiver: Signer;

let txResult: ContractTransactionResponse;

let kelpAdapterFactory: ContractFactory;
let kelpAdapterContract: KelpAdapter;

let kelpMockContact: KelpMock;
let protocolAddress: string;

let rsETH: WETHMock;
let rsETHAddress: string;

let stETH: WETHMock;
let stETHAddress: string;

let tokenAmount: BigNumberish;

describe("Kelp Protocol Tests", function () {
    before(async () => {
        [deployer, sender, receiver] = await ethers.getSigners();

        tokenAmount = ethers.parseEther("100");

        // Deploy rsETH Mock contract
        rsETH = await (await ethers.getContractFactory("WETHMock")).deploy();
        rsETHAddress = await rsETH.getAddress();

        // Deploy kelp Mock contract
        kelpMockContact = await (await ethers.getContractFactory("KelpMock")).deploy(rsETHAddress);
        protocolAddress = await kelpMockContact.getAddress();

        // Deploy stETH Mock contract
        stETH = await (await ethers.getContractFactory("WETHMock")).deploy();
        stETHAddress = await stETH.getAddress();

        kelpAdapterFactory = await ethers.getContractFactory("KelpAdapter");
    });

    describe("WHEN trying to deploy kelpAdapter contract with incorrect parameters", function () {
        it("THEN it should FAIL when protocolAddress is ZERO address", async () => {
            await expect(upgrades.deployProxy(kelpAdapterFactory, [ZERO_ADDRESS, rsETHAddress]))
                .to.be.revertedWithCustomError(kelpAdapterFactory, "ZeroAddress")
                .withArgs("kelpProtocolAddress_");
        });

        it("THEN it should FAIL when rsETHAddress_ is ZERO address", async () => {
            await expect(upgrades.deployProxy(kelpAdapterFactory, [protocolAddress, ZERO_ADDRESS]))
                .to.be.revertedWithCustomError(kelpAdapterFactory, "ZeroAddress")
                .withArgs("rsETHAddress_");
        });

        it("THEN it should FAIL when contract has been initalized already", async () => {
            kelpAdapterContract = (await deployKelpAdapter(
                "KelpAdapter",
                protocolAddress,
                rsETHAddress,
            )) as unknown as KelpAdapter;

            await expect(
                kelpAdapterContract.initialize(protocolAddress, rsETHAddress),
            ).to.be.revertedWithCustomError(kelpAdapterFactory, "InvalidInitialization");
        });
    });

    describe("WHEN deploying kelpAdapter contract with correct parameters", function () {
        before(async () => {
            kelpAdapterContract = (await deployKelpAdapter(
                "KelpAdapter",
                protocolAddress,
                rsETHAddress,
            )) as unknown as KelpAdapter;
            await kelpAdapterContract.grantRole(
                await kelpAdapterContract.VAULT_STRATEGY_ROLE(),
                await deployer.getAddress(),
            );
            snapshot = await takeSnapshot();
        });

        it("THEN contract init functions should match", async () => {
            expect(await kelpAdapterContract.kelpProtocolAddress()).equals(protocolAddress);
            expect(await kelpAdapterContract.getProtocol()).equals(protocolAddress);
        });

        describe("WHEN trying to execute deposit", () => {
            describe("WHEN the adapter has been paused", () => {
                it("THEN it should FAIL", async () => {
                    await kelpAdapterContract.pause();
                    await expect(
                        kelpAdapterContract
                            .connect(sender)
                            .deposit(sender, receiver, rsETHAddress, tokenAmount, true),
                    ).to.be.revertedWithCustomError(kelpAdapterContract, "EnforcedPause");
                });
            });

            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await expect(
                        kelpAdapterContract
                            .connect(sender)
                            .deposit(sender, receiver, stETHAddress, tokenAmount, true),
                    ).to.be.revertedWithCustomError(
                        kelpAdapterContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });

            describe("WHEN token amount less than min deposit", () => {
                before(async () => {
                    await stETH.mint(await sender.getAddress(), tokenAmount);
                    await stETH
                        .connect(sender)
                        .approve(await kelpAdapterContract.getAddress(), tokenAmount);

                    snapshot = await takeSnapshot();
                });

                this.afterEach(async () => {
                    await snapshot.restore();
                });

                it("THEN it should fail with MinDeposit", async () => {
                    await kelpMockContact.setminAmountToDeposit(MaxUint256);
                    await expect(
                        kelpAdapterContract.deposit(
                            sender,
                            receiver,
                            stETHAddress,
                            tokenAmount,
                            false,
                        ),
                    ).to.be.revertedWithCustomError(kelpAdapterContract, "MinDeposit");
                });
            });

            describe("WHEN token amount more than protocol capacity", () => {
                before(async () => {
                    await stETH.mint(await sender.getAddress(), tokenAmount);
                    await stETH
                        .connect(sender)
                        .approve(await kelpAdapterContract.getAddress(), tokenAmount);

                    snapshot = await takeSnapshot();
                });

                this.afterEach(async () => {
                    await snapshot.restore();
                });
                it("THEN it should fail with ExceedCapacity", async () => {
                    await expect(
                        kelpAdapterContract.deposit(
                            sender,
                            receiver,
                            stETHAddress,
                            tokenAmount,
                            false,
                        ),
                    ).to.be.revertedWithCustomError(kelpAdapterContract, "ExceedCapacity");
                });
            });

            describe("WHEN calling with invalid parameters", () => {
                describe("WHEN sender is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(
                            kelpAdapterContract.deposit(
                                ZERO_ADDRESS,
                                receiver,
                                stETHAddress,
                                1,
                                false,
                            ),
                        )
                            .to.be.revertedWithCustomError(kelpAdapterContract, "ZeroAddress")
                            .withArgs("sender_");
                    });
                });
                describe("WHEN receiver is ZERO address", () => {
                    it("THEN it should FAIL ", async () => {
                        await expect(
                            kelpAdapterContract.deposit(
                                sender,
                                ZERO_ADDRESS,
                                stETHAddress,
                                1,
                                false,
                            ),
                        )
                            .to.be.revertedWithCustomError(kelpAdapterContract, "ZeroAddress")
                            .withArgs("receiver_");
                    });
                });
                describe("WHEN token is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(
                            kelpAdapterContract.deposit(sender, receiver, ZERO_ADDRESS, 1, false),
                        )
                            .to.be.revertedWithCustomError(kelpAdapterContract, "ZeroAddress")
                            .withArgs("token_");
                    });
                });
                describe("WHEN tokenAmount is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(
                            kelpAdapterContract.deposit(sender, receiver, stETHAddress, 0, false),
                        )
                            .to.be.revertedWithCustomError(kelpAdapterContract, "ZeroAmount")
                            .withArgs("tokenAmount_");
                    });
                });
            });

            describe("WHEN calling with valid parameters", () => {
                before(async () => {
                    await stETH.mint(await sender.getAddress(), tokenAmount);
                    await stETH
                        .connect(sender)
                        .approve(await kelpAdapterContract.getAddress(), tokenAmount);

                    snapshot = await takeSnapshot();
                });

                this.afterEach(async () => {
                    await snapshot.restore();
                });

                describe("WHEN calling deposit", () => {
                    before(async () => {
                        await kelpMockContact.setAssetCurrentLimit(MaxUint256);
                        await kelpMockContact.setrsETHAmountToMint(tokenAmount);
                        txResult = await kelpAdapterContract.deposit(
                            sender,
                            receiver,
                            stETHAddress,
                            tokenAmount,
                            false,
                        );
                    });
                    it("THEN event DepositedOnProtocol should be emitted", async () => {
                        await expect(txResult).to.emit(kelpAdapterContract, "DepositedOnProtocol");
                    });
                });
            });
        });

        describe("WHEN trying to set protocol address", () => {
            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await expect(
                        kelpAdapterContract
                            .connect(receiver)
                            .setKelpProtocolAddress(protocolAddress),
                    ).to.be.revertedWithCustomError(
                        kelpAdapterContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });

            describe("WHEN protocol address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await expect(kelpAdapterContract.setKelpProtocolAddress(ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(kelpAdapterContract, "ZeroAddress")
                        .withArgs("kelpProtocolAddress_");
                });
            });

            describe("WHEN protocol address is correct", () => {
                before(async () => {
                    // TODO: protocol address
                    txResult = await kelpAdapterContract.setKelpProtocolAddress(protocolAddress);
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await expect(txResult)
                        .to.emit(kelpAdapterContract, "AddressUpdated")
                        .withArgs("kelpProtocolAddress_", protocolAddress);
                });
            });
        });

        describe("WHEN trying to call withdraw", () => {
            it("THEN it should FAIL", async () => {
                await expect(
                    kelpAdapterContract.withdraw(
                        ZERO_ADDRESS,
                        ZERO_ADDRESS,
                        ZERO_ADDRESS,
                        0,
                        ZERO_ADDRESS,
                        0,
                        "0x00",
                    ),
                ).to.be.revertedWith(await kelpAdapterContract.REVERT_MSG());
            });
        });

        describe("WHEN trying to call claimEarnings", () => {
            it("THEN it should FAIL", async () => {
                await expect(
                    kelpAdapterContract.claimEarnings(ZERO_ADDRESS, ZERO_ADDRESS),
                ).to.be.revertedWith(await kelpAdapterContract.REVERT_MSG());
            });
        });

        describe("WHEN trying to call getTokenPrice", () => {
            it("THEN it should FAIL", async () => {
                await expect(kelpAdapterContract.getTokenPrice(ZERO_ADDRESS)).to.be.revertedWith(
                    await kelpAdapterContract.REVERT_MSG(),
                );
            });
        });
    });
});
