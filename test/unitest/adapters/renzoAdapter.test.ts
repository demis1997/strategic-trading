import { BigNumberish, ContractFactory, ContractTransactionResponse, Signer } from "ethers";
import { ethers, upgrades } from "hardhat";
import { expect } from "chai";
import { SnapshotRestorer, takeSnapshot } from "@nomicfoundation/hardhat-network-helpers";
import { ZERO_ADDRESS } from "../../_helpers/constants";
import { deployRenzoAdapter } from "../../../scripts/_helpers/_deployContracts";
import { ERC20Mock, RenzoAdapter, RenzoProtocolMock } from "../../../types";

let snapshot: SnapshotRestorer;

let deployer: Signer;
let sender: Signer;
let receiver: Signer;

let txResult: ContractTransactionResponse;

let renzoAdapterFactory: ContractFactory;
let renzoAdapterContract: RenzoAdapter;

let renzoProtocolMockContract: RenzoProtocolMock;
let protocolAddress: string;

let stETHContract: ERC20Mock;
let stETHAddress: string;

let ezETHContract: ERC20Mock;
let ezETHAddress: string;

let tokenAmount: BigNumberish;

describe("Renzo Protocol Tests", function () {
    before(async () => {
        [deployer, sender, receiver] = await ethers.getSigners();

        tokenAmount = ethers.parseEther("1");

        // Deploy stETH Mock contract
        stETHContract = await (await ethers.getContractFactory("ERC20Mock")).deploy("stETH", "stETH", 18) as ERC20Mock;
        stETHAddress = await stETHContract.getAddress();

        // Deploy ezETH Mock contract
        ezETHContract = await (await ethers.getContractFactory("ERC20Mock")).deploy("ezETH", "ezETH", 18) as ERC20Mock;
        ezETHAddress = await ezETHContract.getAddress();

        // Deploy RenzoProtocol mock contract
        renzoProtocolMockContract = await (
            await ethers.getContractFactory("RenzoProtocolMock")
        ).deploy(stETHAddress, ezETHAddress);
        protocolAddress = await renzoProtocolMockContract.getAddress();

        renzoAdapterFactory = await ethers.getContractFactory("RenzoAdapter");
    });
    


    

    describe("WHEN trying to deploy renzoAdapter contract with incorrect parameters", function () {
        it("THEN it should FAIL when protocolAddress is ZERO address", async () => {
            await expect(
                upgrades.deployProxy(renzoAdapterFactory, [
                    ZERO_ADDRESS,
                    ezETHAddress,
                    stETHAddress,
                ]),
            )
                .to.be.revertedWithCustomError(renzoAdapterFactory, "ZeroAddress")
                .withArgs("liquifierAddress_");
        });

        it("THEN it should FAIL when ezETH is ZERO address", async () => {
            await expect(
                upgrades.deployProxy(renzoAdapterFactory, [
                    protocolAddress,
                    ZERO_ADDRESS,
                    stETHAddress,
                ]),
            )
                .to.be.revertedWithCustomError(renzoAdapterFactory, "ZeroAddress")
                .withArgs("ezETHAddress");
        });

        it("THEN it should FAIL when stETH is ZERO address", async () => {
            await expect(
                upgrades.deployProxy(renzoAdapterFactory, [
                    protocolAddress,
                    ezETHAddress,
                    ZERO_ADDRESS,
                ]),
            )
                .to.be.revertedWithCustomError(renzoAdapterFactory, "ZeroAddress")
                .withArgs("stETHAddress");
        });

        it("THEN it should FAIL when contract has been initialized already", async () => {
            renzoAdapterContract = (await deployRenzoAdapter(
                "RenzoAdapter",
                protocolAddress,
                ezETHAddress,
                stETHAddress,
            )) as unknown as RenzoAdapter;

            await expect(
                renzoAdapterContract.initialize(protocolAddress, ezETHAddress, stETHAddress),
            ).to.be.revertedWithCustomError(renzoAdapterFactory, "InvalidInitialization");
        });
    });

    describe("WHEN deploying renzoAdapter contract with correct parameters", function () {
        before(async () => {
            renzoAdapterContract = (await deployRenzoAdapter(
                "RenzoAdapter",
                protocolAddress,
                ezETHAddress,
                stETHAddress,
            )) as unknown as RenzoAdapter;
            await renzoAdapterContract.grantRole(
                await renzoAdapterContract.VAULT_STRATEGY_ROLE(),
                await deployer.getAddress(),
            );

            snapshot = await takeSnapshot();
        });

        it("THEN contract init functions should match", async () => {
            expect(await renzoAdapterContract.liquifierAddress()).equals(protocolAddress);
            expect(await renzoAdapterContract.getProtocol()).equals(protocolAddress);
            expect(await renzoAdapterContract.ezETHAddress()).equals(ezETHAddress);
            expect(await renzoAdapterContract.stETHAddress()).equals(stETHAddress);
            expect(await renzoAdapterContract.getSlippage()).equals(ethers.parseEther("0.04"));
        });

        describe("WHEN trying to execute deposit", () => {
            describe("WHEN the adapter has been paused", () => {
                it("THEN it should FAIL", async () => {
                    await renzoAdapterContract.pause();
                    await expect(
                        renzoAdapterContract
                            .connect(sender)
                            .deposit(sender, receiver, stETHAddress, tokenAmount, false),
                    ).to.be.revertedWithCustomError(renzoAdapterContract, "EnforcedPause");
                });
            });

            describe("WHEN the caller is not granted the right role", () => {
                it("THEN it should FAIL", async () => {
                    await expect(
                        renzoAdapterContract
                            .connect(sender)
                            .deposit(sender, receiver, stETHAddress, tokenAmount, false),
                    ).to.be.revertedWithCustomError(
                        renzoAdapterContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });

            describe("WHEN calling with invalid parameters", () => {
                describe("WHEN sender is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(
                            renzoAdapterContract.deposit(
                                ZERO_ADDRESS,
                                receiver,
                                stETHAddress,
                                1,
                                false,
                            ),
                        )
                            .to.be.revertedWithCustomError(renzoAdapterContract, "ZeroAddress")
                            .withArgs("sender_");
                    });
                });
                describe("WHEN receiver is ZERO address", () => {
                    it("THEN it should FAIL ", async () => {
                        await expect(
                            renzoAdapterContract.deposit(
                                sender,
                                ZERO_ADDRESS,
                                stETHAddress,
                                1,
                                false,
                            ),
                        )
                            .to.be.revertedWithCustomError(renzoAdapterContract, "ZeroAddress")
                            .withArgs("receiver_");
                    });
                });
                describe("WHEN token is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(
                            renzoAdapterContract.deposit(
                                sender,
                                receiver,
                                ZERO_ADDRESS,
                                1,
                                false,
                            ),
                        )
                            .to.be.revertedWithCustomError(renzoAdapterContract, "ZeroAddress")
                            .withArgs("token_");
                    });
                });
                describe("WHEN tokenAmount is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(
                            renzoAdapterContract.deposit(
                                sender,
                                receiver,
                                stETHAddress,
                                0,
                                false,
                            ),
                        )
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

                    snapshot = await takeSnapshot();
                });

                this.afterEach(async () => {
                    await snapshot.restore();
                });

                describe("WHEN calling deposit", () => {
                    before(async () => {
                        txResult = await renzoAdapterContract.deposit(
                            sender,
                            receiver,
                            stETHAddress,
                            tokenAmount,
                            false,
                        );
                    });

               

                    it("THEN it should correctly calculate minEzEthAmount considering slippage", async () => {
                        const slippage = await renzoAdapterContract.getSlippage();
                        expect(await renzoAdapterContract.getSlippage()).to.equal(ethers.parseEther("0.04"));

                    });

                });
            });
        });

        describe("WHEN trying to set protocol address", () => {
            describe("WHEN the caller is not granted the right role", () => {
                it("THEN it should FAIL", async () => {
                    await expect(
                        renzoAdapterContract
                            .connect(receiver)
                            .setLiquifierAddress(protocolAddress),
                    ).to.be.revertedWithCustomError(
                        renzoAdapterContract,
                        "AccessControlUnauthorizedAccount",
                    );
                });
            });

            describe("WHEN protocol address is ZERO address", () => {
                it("THEN it should FAIL", async () => {
                    await expect(renzoAdapterContract.setLiquifierAddress(ZERO_ADDRESS))
                        .to.be.revertedWithCustomError(renzoAdapterContract, "ZeroAddress")
                        .withArgs("liquifierAddress_");
                });
            });

            describe("WHEN protocol address is correct", () => {
                before(async () => {
                    txResult = await renzoAdapterContract.setLiquifierAddress(protocolAddress);
                });
                it("THEN it should emit AddressUpdated event", async () => {
                    await expect(txResult)
                        .to.emit(renzoAdapterContract, "AddressUpdated")
                        .withArgs("liquifierAddress_", protocolAddress);
                });
            });
        });

        describe("WHEN trying to call claimEarnings", () => {
            it("THEN it should FAIL", async () => {
                await expect(
                    renzoAdapterContract.claimEarnings(ZERO_ADDRESS, ZERO_ADDRESS),
                ).to.be.revertedWith("claimEarnings not implemented");
            });
        });
        describe("WHEN trying to call withdraw", () => {
            it("THEN it should FAIL", async () => {
                await expect(
                    renzoAdapterContract.withdraw(
                        ZERO_ADDRESS,
                        ZERO_ADDRESS,
                        ZERO_ADDRESS,
                        0,
                        ZERO_ADDRESS,
                        0,
                        "0x00",
                    ),
                ).to.be.revertedWith(await renzoAdapterContract.REVERT_MSG());
            });
        });
        describe("WHEN trying to call getTokenPrice", () => {
            it("THEN it should FAIL", async () => {
                await expect(renzoAdapterContract.getTokenPrice(ZERO_ADDRESS)).to.be.revertedWith(
                    "getTokenPrice not implemented",
                );
            });
        });
    });
});
