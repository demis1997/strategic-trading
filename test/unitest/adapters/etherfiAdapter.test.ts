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
import { deployEtherFiAdapter } from "../../../scripts/_helpers/_deployContracts";
import { WEETHMock, EtherFiAdapter, EtherFiMock, EETHMock, LidoMock } from "../../../types";

let snapshot: SnapshotRestorer;

let deployer: Signer;
let sender: Signer;
let receiver: Signer;

let txResult: ContractTransactionResponse;

let etherfiAdapterFactory: ContractFactory;
let etherfiAdapterContract: EtherFiAdapter;

let etherfiMockContact: EtherFiMock;
let protocolAddress: string;

let WEETHContract: WEETHMock;
let weethAddress: string;

let eETH: EETHMock;
let eETHAddress: string;

let stETH: LidoMock;
let stETHAddress: string;

let tokenAmount: BigNumberish;

describe("EtherFi Protocol Tests", function () {
    before(async () => {
        [deployer, sender, receiver] = await ethers.getSigners();

        tokenAmount = ethers.parseEther("1");

        // Deploy eETH Mock contract
        eETH = await (await ethers.getContractFactory("EETHMock")).deploy();
        eETHAddress = await eETH.getAddress();

        // Deploy stETH Mock contract
        stETH = await (await ethers.getContractFactory("LidoMock")).deploy();
        stETHAddress = await stETH.getAddress();

        // Deploy WEETH Mock contract
        WEETHContract = await (await ethers.getContractFactory("WEETHMock")).deploy(eETHAddress);
        weethAddress = await WEETHContract.getAddress();

        // Deploy etherfi Mock contract
        etherfiMockContact = await (
            await ethers.getContractFactory("EtherFiMock")
        ).deploy(stETHAddress, eETHAddress);
        protocolAddress = await etherfiMockContact.getAddress();

        etherfiAdapterFactory = await ethers.getContractFactory("EtherFiAdapter");
    });

    describe("WHEN trying to deploy etherfiAdapter contract with incorrect parameters", function () {
        it("THEN it should FAIL when protocolAddress is ZERO address", async () => {
            await expect(
                upgrades.deployProxy(etherfiAdapterFactory, [
                    ZERO_ADDRESS,
                    eETHAddress,
                    weethAddress,
                ]),
            )
                .to.be.revertedWithCustomError(etherfiAdapterFactory, "ZeroAddress")
                .withArgs("liquifierAddress_");
        });

        // TODO: add check in the contract
        xit("THEN it should FAIL when WEETH is ZERO address", async () => {
            await expect(
                upgrades.deployProxy(etherfiAdapterFactory, [
                    protocolAddress,
                    eETHAddress,
                    ZERO_ADDRESS,
                ]),
            )
                .to.be.revertedWithCustomError(etherfiAdapterFactory, "ZeroAddress")
                .withArgs("weETHAddress");
        });

        it("THEN it should FAIL when eETH is ZERO address", async () => {
            await expect(
                upgrades.deployProxy(etherfiAdapterFactory, [
                    protocolAddress,
                    ZERO_ADDRESS,
                    weethAddress,
                ]),
            )
                .to.be.revertedWithCustomError(etherfiAdapterFactory, "ZeroAddress")
                .withArgs("eETHAddress");
        });

        it("THEN it should FAIL when contract has been initalized already", async () => {
            etherfiAdapterContract = (await deployEtherFiAdapter(
                "EtherFiAdapter",
                protocolAddress,
                eETHAddress,
                weethAddress,
            )) as unknown as EtherFiAdapter;

            await expect(
                etherfiAdapterContract.initialize(protocolAddress, eETHAddress, weethAddress),
            ).to.be.revertedWithCustomError(etherfiAdapterFactory, "InvalidInitialization");
        });
    });

    describe("WHEN deploying etherfiAdapter contract with correct parameters", function () {
        before(async () => {
            etherfiAdapterContract = (await deployEtherFiAdapter(
                "EtherFiAdapter",
                protocolAddress,
                eETHAddress,
                weethAddress,
            )) as unknown as EtherFiAdapter;
            await etherfiAdapterContract.grantRole(
                await etherfiAdapterContract.VAULT_STRATEGY_ROLE(),
                await deployer.getAddress(),
            );

            snapshot = await takeSnapshot();
        });

        it("THEN contract init functions should match", async () => {
            expect(await etherfiAdapterContract.liquifierAddress()).equals(protocolAddress);
            expect(await etherfiAdapterContract.getProtocol()).equals(protocolAddress);
            expect(await etherfiAdapterContract.eETHAddress()).equals(eETHAddress);
            expect(await etherfiAdapterContract.weETHAddress()).equals(weethAddress);
            // TODO: fix in the contract
            // expect(await etherfiAdapterContract.protocolName()).equals("EtherFi");
            expect(await etherfiAdapterContract.getSlippage()).equals(ethers.parseEther("0.04"));
        });

        describe("WHEN trying to execute deposit", () => {
            describe("WHEN the adapter has been paused", () => {
                it("THEN it should FAIL", async () => {
                    await etherfiAdapterContract.pause();
                    await expect(
                        etherfiAdapterContract
                            .connect(sender)
                            .deposit(sender, receiver, eETHAddress, tokenAmount, true),
                    ).to.be.revertedWithCustomError(etherfiAdapterContract, "EnforcedPause");
                });
            });

            describe("WHEN the caller is not granted right role", () => {
                it("THEN it should FAIL", async () => {
                    await expect(
                        etherfiAdapterContract
                            .connect(sender)
                            .deposit(sender, receiver, weethAddress, tokenAmount, true),
                    ).to.be.revertedWithCustomError(
                        etherfiAdapterContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });

            describe("WHEN calling with invalid parameters", () => {
                describe("WHEN sender is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(
                            etherfiAdapterContract.deposit(
                                ZERO_ADDRESS,
                                receiver,
                                weethAddress,
                                1,
                                false,
                            ),
                        )
                            .to.be.revertedWithCustomError(etherfiAdapterContract, "ZeroAddress")
                            .withArgs("sender_");
                    });
                });
                describe("WHEN receiver is ZERO address", () => {
                    it("THEN it should FAIL ", async () => {
                        await expect(
                            etherfiAdapterContract.deposit(
                                sender,
                                ZERO_ADDRESS,
                                weethAddress,
                                1,
                                false,
                            ),
                        )
                            .to.be.revertedWithCustomError(etherfiAdapterContract, "ZeroAddress")
                            .withArgs("receiver_");
                    });
                });
                describe("WHEN token is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(
                            etherfiAdapterContract.deposit(
                                sender,
                                receiver,
                                ZERO_ADDRESS,
                                1,
                                false,
                            ),
                        )
                            .to.be.revertedWithCustomError(etherfiAdapterContract, "ZeroAddress")
                            .withArgs("token_");
                    });
                });
                describe("WHEN tokenAmount is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(
                            etherfiAdapterContract.deposit(
                                sender,
                                receiver,
                                weethAddress,
                                0,
                                false,
                            ),
                        )
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

                    snapshot = await takeSnapshot();
                });

                this.afterEach(async () => {
                    await snapshot.restore();
                });

                describe("WHEN calling deposit without wrapping", () => {
                    before(async () => {
                        txResult = await etherfiAdapterContract.deposit(
                            sender,
                            receiver,
                            stETHAddress,
                            tokenAmount,
                            false,
                        );
                    });
                    it("THEN event DepositedOnProtocol should be emitted", async () => {
                        await expect(txResult).to.emit(
                            etherfiAdapterContract,
                            "DepositedOnProtocol",
                        );
                    });
                });

                describe("WHEN calling deposit with wrapping", () => {
                    before(async () => {
                        txResult = await etherfiAdapterContract.deposit(
                            sender,
                            receiver,
                            stETHAddress,
                            tokenAmount,
                            true,
                        );
                    });
                    it("THEN event DepositedOnProtocol should be emitted", async () => {
                        await expect(txResult).to.emit(
                            etherfiAdapterContract,
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
                        etherfiAdapterContract
                            .connect(receiver)
                            .setLiquifierAddress(protocolAddress),
                    ).to.be.revertedWithCustomError(
                        etherfiAdapterContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });

            describe("WHEN protocol address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await expect(etherfiAdapterContract.setLiquifierAddress(ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(etherfiAdapterContract, "ZeroAddress")
                        .withArgs("liquifierAddress_");
                });
            });

            describe("WHEN protocol address is correct", () => {
                before(async () => {
                    // TODO: protocol address
                    txResult = await etherfiAdapterContract.setLiquifierAddress(protocolAddress);
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await expect(txResult)
                        .to.emit(etherfiAdapterContract, "AddressUpdated")
                        .withArgs("liquifierAddress_", protocolAddress);
                });
            });
        });

        describe("WHEN trying to call withdraw", () => {
            it("THEN it should FAIL", async () => {
                await expect(
                    etherfiAdapterContract.withdraw(
                        ZERO_ADDRESS,
                        ZERO_ADDRESS,
                        ZERO_ADDRESS,
                        0,
                        ZERO_ADDRESS,
                        0,
                        "0x00",
                    ),
                ).to.be.revertedWith(await etherfiAdapterContract.REVERT_MSG());
            });
        });

        describe("WHEN trying to call claimEarnings", () => {
            it("THEN it should FAIL", async () => {
                await expect(
                    etherfiAdapterContract.claimEarnings(ZERO_ADDRESS, ZERO_ADDRESS),
                ).to.be.revertedWith(await etherfiAdapterContract.REVERT_MSG());
            });
        });

        describe("WHEN trying to call getTokenPrice", () => {
            it("THEN it should FAIL", async () => {
                await expect(etherfiAdapterContract.getTokenPrice(ZERO_ADDRESS)).to.be.revertedWith(
                    await etherfiAdapterContract.REVERT_MSG(),
                );
            });
        });
    });
});
