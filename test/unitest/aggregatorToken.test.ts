/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/require-await */
import { ethers, upgrades } from "hardhat";
import { Contract, ContractFactory, Signer, ContractTransactionResponse } from "ethers";
import { SnapshotRestorer, takeSnapshot } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import {
    ERC20Mock,
    VaultMock,
    VaultsRegistryMock,
    AggregatorToken,
    UniformTransferStrategy,
} from "../../types";

import {
    deployVaultsRegistryMock,
    deployVaultMock,
    deployAggregatorToken,
    deployERC20,
    deployUniformTransferStrategy,
} from "../../scripts/_helpers/_deployContracts";

import { ZERO_ADDRESS, TEST_TIMEOUT } from "../_helpers/constants";
import { getVariableFromEvent } from "./../_helpers/utils";

let snapshot: SnapshotRestorer;

let deployer: Signer;
let other1: Signer;
let other2: Signer;

let deployerAddress: string;
let otherAddress1: string;
let otherAddress2: string;

let txResult: ContractTransactionResponse;

let AggregatorTokenFactory: ContractFactory;
let aggregatorTokenContract: AggregatorToken;
let aggregatorTokenContractAddress: string;

let transferStrategyContract: UniformTransferStrategy;
let transferStrategyContractAddress: string;

let vaultsRegistryContract: VaultsRegistryMock;
let vaultsRegistryContractAddress: string;

let underlyingAssetContract: ERC20Mock;
let underlyingAssetContractAddress: string;

const vaultContracts: VaultMock[] = [];
const vaultAddresses: string[] = [];

const name = "WHYETH";
const symbol = "whyETH";

async function mintAndApproveUnderlyingAsset(amount: bigint) {
    await underlyingAssetContract.mint(deployerAddress, amount);
    await underlyingAssetContract.approve(aggregatorTokenContractAddress, amount);
}

async function deposit(receiver: string, vaults: string[], values: bigint[], totalAmount: bigint) {
    return await aggregatorTokenContract.deposit(receiver, vaults, values, totalAmount);
}

async function withdraw(vaults: string[], values: bigint[], maxSlippage: bigint) {
    return await aggregatorTokenContract.withdraw(vaults, values, maxSlippage);
}

describe("Aggregator Token Tests", function () {
    this.timeout(TEST_TIMEOUT);

    before(async () => {
        [deployer, other1, other2] = await ethers.getSigners();
        [deployerAddress, otherAddress1, otherAddress2] = await Promise.all([
            deployer.getAddress(),
            other1.getAddress(),
            other2.getAddress(),
        ]);

        underlyingAssetContract = (await deployERC20("WETH", "WETH", 18)) as unknown as ERC20Mock;
        underlyingAssetContractAddress = await underlyingAssetContract.getAddress();

        // Define vault names
        const vaultNames = ["Vault 1", "Vault 2", "Vault 3", "Vault 4", "Vault 5"];

        // Deploy mock vaults
        for (const vaultName of vaultNames) {
            const vaultContract = (await deployVaultMock(
                underlyingAssetContractAddress,
                vaultName,
                vaultName,
            )) as unknown as VaultMock;
            const vaultAddress = await vaultContract.getAddress();
            vaultContracts.push(vaultContract);
            vaultAddresses.push(vaultAddress);
        }

        // Deploy vaults registry
        vaultsRegistryContract =
            (await deployVaultsRegistryMock()) as unknown as VaultsRegistryMock;
        vaultsRegistryContractAddress = await vaultsRegistryContract.getAddress();

        // Set vaults into the vaults registry
        for (const vaultAddress of vaultAddresses) {
            await vaultsRegistryContract.setVaultStatus(vaultAddress, true);
        }

        AggregatorTokenFactory = await ethers.getContractFactory("AggregatorToken");
    });

    describe("WHEN trying to deploy Aggregator token contract with incorrect parameters", function () {
        it("THEN it should FAIL when underlyingAsset_ is ZERO address", async () => {
            await expect(
                upgrades.deployProxy(AggregatorTokenFactory, [
                    ZERO_ADDRESS,
                    vaultsRegistryContractAddress,
                    deployerAddress,
                    name,
                    symbol,
                ]),
            )
                .to.be.revertedWithCustomError(AggregatorTokenFactory, "ZeroAddress")
                .withArgs("underlyingAsset_");
        });

        it("THEN it should FAIL when vaultsRegistry_ is ZERO address", async () => {
            await expect(
                upgrades.deployProxy(AggregatorTokenFactory, [
                    underlyingAssetContractAddress,
                    ZERO_ADDRESS,
                    deployerAddress,
                    name,
                    symbol,
                ]),
            )
                .to.be.revertedWithCustomError(AggregatorTokenFactory, "ZeroAddress")
                .withArgs("vaultsRegistry_");
        });

        it("THEN it should FAIL when ownerAddress_ is ZERO address", async () => {
            await expect(
                upgrades.deployProxy(AggregatorTokenFactory, [
                    underlyingAssetContractAddress,
                    vaultsRegistryContractAddress,
                    ZERO_ADDRESS,
                    name,
                    symbol,
                ]),
            )
                .to.be.revertedWithCustomError(AggregatorTokenFactory, "ZeroAddress")
                .withArgs("ownerAddress_");
        });

        it("THEN it should FAIL when name_ is empty string", async () => {
            await expect(
                upgrades.deployProxy(AggregatorTokenFactory, [
                    underlyingAssetContractAddress,
                    vaultsRegistryContractAddress,
                    deployerAddress,
                    "",
                    symbol,
                ]),
            )
                .to.be.revertedWithCustomError(AggregatorTokenFactory, "EmptyString")
                .withArgs("name_");
        });

        it("THEN it should FAIL when symbol_ is empty string", async () => {
            await expect(
                upgrades.deployProxy(AggregatorTokenFactory, [
                    underlyingAssetContractAddress,
                    vaultsRegistryContractAddress,
                    deployerAddress,
                    name,
                    "",
                ]),
            )
                .to.be.revertedWithCustomError(AggregatorTokenFactory, "EmptyString")
                .withArgs("symbol_");
        });
    });

    describe("WHEN deploying Aggregator Token contract with correct parameters", function () {
        before(async () => {
            // Deploy Aggregator Token
            aggregatorTokenContract = (await deployAggregatorToken(
                "AggregatorToken",
                underlyingAssetContractAddress,
                vaultsRegistryContractAddress,
                deployerAddress,
                name,
                symbol,
            )) as unknown as AggregatorToken;

            aggregatorTokenContractAddress = await aggregatorTokenContract.getAddress();

            transferStrategyContract = (await deployUniformTransferStrategy(
                aggregatorTokenContractAddress,
                deployerAddress,
            )) as unknown as UniformTransferStrategy;
            transferStrategyContractAddress = await transferStrategyContract.getAddress();

            await aggregatorTokenContract.setMaxVaultsPerHolder(5);
            await aggregatorTokenContract.setTransferStrategy(transferStrategyContractAddress);

            snapshot = await takeSnapshot();
        });

        this.afterEach(async () => {
            await snapshot.restore();
        });

        it("THEN contract storage variables should be set correctly", async () => {
            expect(await aggregatorTokenContract.getUnderlyingAsset()).equals(
                underlyingAssetContractAddress,
            );
            expect(await aggregatorTokenContract.vaultsRegistry()).equals(
                vaultsRegistryContractAddress,
            );
            expect(await aggregatorTokenContract.maxVaultsPerHolder()).equals(5n);

            expect(await aggregatorTokenContract.name()).equals(name);
            expect(await aggregatorTokenContract.symbol()).equals(symbol);
            expect(await aggregatorTokenContract.totalSupply()).equals(0n);
            expect(await aggregatorTokenContract.decimals()).equals(18n);
        });

        describe("WHEN trying to execute deposit", () => {
            describe("WHEN calling with invalid parameters", () => {
                const totalAmount = 50n;

                describe("WHEN receiver is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(
                            deposit(
                                ZERO_ADDRESS,
                                vaultAddresses,
                                [10n, 10n, 10n, 10n, 10n],
                                totalAmount,
                            ),
                        )
                            .to.be.revertedWithCustomError(aggregatorTokenContract, "ZeroAddress")
                            .withArgs("receiver_");
                    });
                });

                describe("WHEN one of the vaults is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await mintAndApproveUnderlyingAsset(totalAmount);
                        await expect(
                            deposit(
                                deployerAddress,
                                [
                                    ZERO_ADDRESS,
                                    ZERO_ADDRESS,
                                    ZERO_ADDRESS,
                                    ZERO_ADDRESS,
                                    ZERO_ADDRESS,
                                ],
                                [10n, 10n, 10n, 10n, 10n],
                                totalAmount,
                            ),
                        )
                            .to.be.revertedWithCustomError(aggregatorTokenContract, "ZeroAddress")
                            .withArgs("vault");
                    });
                });

                describe("WHEN one of the values is ZERO ", () => {
                    it("THEN it should FAIL", async () => {
                        await mintAndApproveUnderlyingAsset(totalAmount);
                        await expect(
                            deposit(
                                deployerAddress,
                                vaultAddresses,
                                [10n, 0n, 10n, 10n, 10n],
                                totalAmount,
                            ),
                        )
                            .to.be.revertedWithCustomError(aggregatorTokenContract, "ZeroAmount")
                            .withArgs("value");
                    });
                });

                describe("WHEN vaults and values doesn't match", () => {
                    it("THEN it should FAIL", async () => {
                        await mintAndApproveUnderlyingAsset(totalAmount);
                        await expect(
                            deposit(
                                deployerAddress,
                                vaultAddresses,
                                [10n, 0n, 10n, 10n],
                                totalAmount,
                            ),
                        ).to.be.revertedWithCustomError(
                            aggregatorTokenContract,
                            "DifferentArgumentsLenght",
                        );
                    });
                });

                describe("WHEN accumulation of values and totalAmount doesn't match", () => {
                    it("THEN it should FAIL", async () => {
                        await mintAndApproveUnderlyingAsset(totalAmount);
                        await expect(
                            deposit(
                                deployerAddress,
                                vaultAddresses,
                                [10n, 5n, 10n, 10n, 10n],
                                totalAmount,
                            ),
                        ).to.be.revertedWithCustomError(
                            aggregatorTokenContract,
                            "WrongDepositValues",
                        );
                    });
                });

                describe("WHEN one of the vaults is not registered", () => {
                    it("THEN it should FAIL", async () => {
                        await mintAndApproveUnderlyingAsset(totalAmount);
                        await expect(
                            deposit(deployerAddress, [deployerAddress], [10n], totalAmount),
                        ).to.be.revertedWithCustomError(
                            aggregatorTokenContract,
                            "UnsupportedVault",
                        );
                    });
                });

                describe("WHEN exceeds max vaults per user", () => {
                    before(async () => {
                        await aggregatorTokenContract.setMaxVaultsPerHolder(4);
                    });

                    it("THEN it should FAIL", async () => {
                        await mintAndApproveUnderlyingAsset(totalAmount);
                        await expect(
                            deposit(
                                deployerAddress,
                                vaultAddresses,
                                [10n, 10n, 10n, 10n, 10n],
                                totalAmount,
                            ),
                        ).to.be.revertedWithCustomError(
                            aggregatorTokenContract,
                            "MaxVaultsPerUser",
                        );
                    });
                });

                describe("WHEN calling with valid parameters", () => {
                    const totalAmount = ethers.parseEther("10");
                    const values = Array(5).fill(totalAmount / 5n);

                    describe("WHEN staking is paused", () => {
                        before(async () => {
                            // set paused as true
                            await aggregatorTokenContract.pause();
                        });
                        it("THEN it should FAIL", async () => {
                            await expect(
                                deposit(deployerAddress, vaultAddresses, values, totalAmount),
                            ).to.be.revertedWithCustomError(
                                aggregatorTokenContract,
                                "EnforcedPause",
                            );
                        });
                    });

                    describe("WHEN everything is ALRIGHT", () => {
                        let mintedShares: bigint;
                        beforeEach(async () => {
                            await mintAndApproveUnderlyingAsset(totalAmount);
                            txResult = await deposit(
                                deployerAddress,
                                vaultAddresses,
                                values,
                                totalAmount,
                            );
                        });

                        it("THEN event Deposit should be emitted", async () => {
                            const txReceipt = await txResult.wait();
                            mintedShares = BigInt(
                                await getVariableFromEvent(
                                    aggregatorTokenContract as unknown as Contract,
                                    "Deposit",
                                    txReceipt,
                                    5,
                                ),
                            );
                            await expect(txResult)
                                .to.emit(aggregatorTokenContract, "Deposit")
                                .withArgs(
                                    deployerAddress,
                                    deployerAddress,
                                    vaultAddresses,
                                    values,
                                    values, // supposed to be an array shares minted from the vault
                                    mintedShares,
                                );
                        });

                        it("THEN should increase aggregator token shares for deployer", async () => {
                            expect(await aggregatorTokenContract.balanceOf(deployerAddress)).equals(
                                mintedShares,
                            );
                        });

                        it("THEN unerlying asset of deployer balance should be 0", async () => {
                            expect(await underlyingAssetContract.balanceOf(deployerAddress)).equals(
                                0n,
                            );
                        });

                        it("THEN should increase total supply", async () => {
                            expect(await aggregatorTokenContract.totalSupply()).equals(
                                mintedShares,
                            );
                        });

                        it("THEN should increment vaults shares", async () => {
                            for (let i = 0; i < vaultAddresses.length; i++) {
                                expect(
                                    await aggregatorTokenContract.vaultsShares(vaultAddresses[i]),
                                ).to.equal(values[i]);
                            }
                        });

                        it("THEN should update user vaults correctly", async () => {
                            expect(
                                await aggregatorTokenContract.vaultsOf(deployerAddress),
                            ).to.deep.equal(vaultAddresses);
                        });

                        it("THEN should update number of user vaults correctly", async () => {
                            expect(
                                await aggregatorTokenContract.numberOfVaults(deployerAddress),
                            ).equal(vaultAddresses.length);
                        });

                        it("THEN should update last shares per vault correctly", async () => {
                            expect(
                                await aggregatorTokenContract.lastSharesPerVault(deployerAddress),
                            ).to.deep.equal([vaultAddresses, values]);
                        });

                        it("THEN should update last assets per vault correctly", async () => {
                            expect(
                                await aggregatorTokenContract.lastAssetsPerVault(deployerAddress),
                            ).to.deep.equal([vaultAddresses, values]);
                        });

                        it("THEN should update current shares per vault correctly", async () => {
                            expect(
                                await aggregatorTokenContract.currentSharesPerVault(
                                    deployerAddress,
                                ),
                            ).to.deep.equal([vaultAddresses, values]);
                        });

                        it("THEN should update current assets per vault correctly", async () => {
                            expect(
                                await aggregatorTokenContract.currentAssetsPerVault(
                                    deployerAddress,
                                ),
                            ).to.deep.equal([vaultAddresses, values]);
                        });

                        it("THEN should retrun the correct exchange rate", async () => {
                            expect(await aggregatorTokenContract.exchangeRate()).equal(
                                totalAmount / mintedShares,
                            );
                        });
                    });
                });
            });
        });

        describe("WHEN executing withdraw", () => {
            const totalAmount = ethers.parseEther("10");
            const values = Array(5).fill(totalAmount / 5n);

            beforeEach(async () => {
                await mintAndApproveUnderlyingAsset(totalAmount);
                await deposit(deployerAddress, vaultAddresses, values, totalAmount);
            });

            describe("WHEN executing withdraw with incorrect parameters", () => {
                describe("WHEN one of the vaults is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(withdraw([ZERO_ADDRESS], [totalAmount], 0n))
                            .to.be.revertedWithCustomError(aggregatorTokenContract, "ZeroAddress")
                            .withArgs("vault");
                    });
                });

                describe("WHEN one of the values is ZERO", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(withdraw(vaultAddresses, [0n, 0n, 0n, 0n, 0n], 0n))
                            .to.be.revertedWithCustomError(aggregatorTokenContract, "ZeroAmount")
                            .withArgs("value");
                    });
                });

                describe("WHEN vaults doesnt match values", () => {
                    it("THEN it should FAIL", async () => {
                        await expect(
                            withdraw(vaultAddresses, [100n, 100n, 100n, 100n], 0n),
                        ).to.be.revertedWithCustomError(
                            aggregatorTokenContract,
                            "DifferentArgumentsLenght",
                        );
                    });
                });
            });

            describe("WHEN executing withdraw with correct parameters", () => {
                let withdrawnFunds: bigint;
                beforeEach(async () => {
                    txResult = await withdraw(vaultAddresses, values, totalAmount);
                });

                it("THEN event Withdrawal should be emitted", async () => {
                    const txReceipt = await txResult.wait();
                    withdrawnFunds = BigInt(
                        await getVariableFromEvent(
                            aggregatorTokenContract as unknown as Contract,
                            "Withdrawal",
                            txReceipt,
                            5,
                        ),
                    );

                    await expect(txResult).to.emit(aggregatorTokenContract, "Withdrawal").withArgs(
                        aggregatorTokenContractAddress,
                        deployerAddress,
                        vaultAddresses,
                        values,
                        values, // supposed to be an array of burned shares from the vault
                        withdrawnFunds,
                    );
                });

                it("THEN should transfer withdrawn funds to deployer address", async () => {
                    expect(await underlyingAssetContract.balanceOf(deployerAddress)).equals(
                        withdrawnFunds,
                    );
                });

                it("THEN should burn deployer shares", async () => {
                    expect(await aggregatorTokenContract.balanceOf(deployerAddress)).equals(0n);
                });

                it("THEN should decrease total supply", async () => {
                    expect(await aggregatorTokenContract.totalSupply()).equals(0n);
                });

                it("THEN should decrement vaults shares", async () => {
                    for (let i = 0; i < vaultAddresses.length; i++) {
                        expect(
                            await aggregatorTokenContract.vaultsShares(vaultAddresses[i]),
                        ).to.equal(0n);
                    }
                });

                it("THEN should remove all the vaults from portfolio", async () => {
                    expect(await aggregatorTokenContract.vaultsOf(deployerAddress)).to.deep.equal(
                        [],
                    );
                });

                it("THEN should update number of user vaults correctly", async () => {
                    expect(await aggregatorTokenContract.numberOfVaults(deployerAddress)).equal(0n);
                });

                it("THEN should update last shares per vault correctly", async () => {
                    expect(
                        await aggregatorTokenContract.lastSharesPerVault(deployerAddress),
                    ).to.deep.equal([[], []]);
                });

                it("THEN should update last assets per vault correctly", async () => {
                    expect(
                        await aggregatorTokenContract.lastAssetsPerVault(deployerAddress),
                    ).to.deep.equal([[], []]);
                });

                it("THEN should update current shares per vault correctly", async () => {
                    expect(
                        await aggregatorTokenContract.currentSharesPerVault(deployerAddress),
                    ).to.deep.equal([[], []]);
                });

                it("THEN should update current assets per vault correctly", async () => {
                    expect(
                        await aggregatorTokenContract.currentAssetsPerVault(deployerAddress),
                    ).to.deep.equal([[], []]);
                });

                it("THEN should retrun the correct exchange rate", async () => {
                    expect(await aggregatorTokenContract.exchangeRate()).equal(0n);
                });
            });
        });

        describe("WHEN executing ERC20 functions", () => {
            describe("WHEN executing approve", () => {
                let SPENDER_ADDRESS: string;
                const AMOUNT: bigint = ethers.parseEther("10");

                describe("WHEN executing approve with incorrect parameters", () => {
                    describe("WHEN spender is ADDRESS ZERO", () => {
                        before(async () => {
                            SPENDER_ADDRESS = ZERO_ADDRESS;
                        });
                        it("THEN it should FAIL", async () => {
                            await expect(
                                aggregatorTokenContract.approve(SPENDER_ADDRESS, AMOUNT),
                            ).to.be.revertedWithCustomError(
                                aggregatorTokenContract,
                                "ERC20InvalidSpender",
                            );
                        });
                    });
                });

                describe("WHEN executing approve with correct parameters", () => {
                    beforeEach(async () => {
                        SPENDER_ADDRESS = otherAddress1;
                        txResult = await aggregatorTokenContract.approve(SPENDER_ADDRESS, AMOUNT);
                    });

                    it("THEN event Approval should be emitted", async () => {
                        await expect(txResult)
                            .to.emit(aggregatorTokenContract, "Approval")
                            .withArgs(deployerAddress, SPENDER_ADDRESS, AMOUNT);
                    });

                    it("THEN it should increase allowance", async () => {
                        expect(
                            await aggregatorTokenContract.allowance(
                                deployerAddress,
                                SPENDER_ADDRESS,
                            ),
                        ).equals(AMOUNT);
                    });
                });
            });

            describe("WHEN executing transfer", () => {
                let TO_ADDRESS: string;
                const AMOUNT: bigint = ethers.parseEther("10");
                const values = Array(5).fill(AMOUNT / 5n);

                describe("WHEN executing transfer with incorrect parameters", () => {
                    describe("WHEN TO_ADDRESS is ADDRESS ZERO", () => {
                        before(async () => {
                            TO_ADDRESS = ZERO_ADDRESS;
                            await mintAndApproveUnderlyingAsset(AMOUNT);
                            txResult = await deposit(
                                deployerAddress,
                                vaultAddresses,
                                values,
                                AMOUNT,
                            );
                        });

                        it("THEN it should FAIL", async () => {
                            await expect(
                                aggregatorTokenContract.transfer(TO_ADDRESS, AMOUNT),
                            ).to.be.revertedWithCustomError(
                                aggregatorTokenContract,
                                "ERC20InvalidReceiver",
                            );
                        });
                    });

                    describe("WHEN sender has insufficient balance", () => {
                        before(async () => {
                            TO_ADDRESS = otherAddress1;
                        });
                        it("THEN it should FAIL", async () => {
                            await expect(
                                aggregatorTokenContract.transfer(TO_ADDRESS, AMOUNT),
                            ).to.be.revertedWithCustomError(
                                aggregatorTokenContract,
                                "ERC20InsufficientBalance",
                            );
                        });
                    });
                });

                describe("WHEN executing transfer with correct parameters", () => {
                    beforeEach(async () => {
                        TO_ADDRESS = otherAddress1;
                        await mintAndApproveUnderlyingAsset(AMOUNT);
                        await deposit(deployerAddress, vaultAddresses, values, AMOUNT);

                        txResult = await aggregatorTokenContract.transfer(TO_ADDRESS, AMOUNT);
                    });

                    it("THEN it should emit Transfer event", async () => {
                        await expect(txResult)
                            .to.emit(aggregatorTokenContract, "Transfer")
                            .withArgs(deployerAddress, TO_ADDRESS, AMOUNT);
                    });

                    it("THEN it should update sender and receiver balances", async () => {
                        expect(await aggregatorTokenContract.balanceOf(deployerAddress)).equals(0n);
                        expect(await aggregatorTokenContract.balanceOf(TO_ADDRESS)).equals(AMOUNT);
                    });
                });
            });

            describe("WHEN executing transferFrom", () => {
                let TO_ADDRESS: string;
                let SPENDER: string;
                let OWNER: string;
                const AMOUNT: bigint = ethers.parseEther("10");
                const values = Array(5).fill(AMOUNT / 5n);

                describe("WHEN executing transferFrom with incorrect parameters", () => {
                    describe("WHEN TO_ADDRESS is ADDRESS ZERO", () => {
                        before(async () => {
                            TO_ADDRESS = ZERO_ADDRESS;
                            SPENDER = otherAddress1;
                            OWNER = deployerAddress;

                            await mintAndApproveUnderlyingAsset(AMOUNT);
                            await deposit(deployerAddress, vaultAddresses, values, AMOUNT);

                            await aggregatorTokenContract.approve(SPENDER, AMOUNT);
                        });

                        it("THEN it should FAIL", async () => {
                            await expect(
                                aggregatorTokenContract
                                    .connect(other1)
                                    .transferFrom(OWNER, TO_ADDRESS, AMOUNT),
                            ).to.be.revertedWithCustomError(
                                aggregatorTokenContract,
                                "ERC20InvalidReceiver",
                            );
                        });
                    });

                    describe("WHEN insufficent allowance", () => {
                        before(async () => {
                            TO_ADDRESS = ZERO_ADDRESS;
                            SPENDER = otherAddress1;
                            OWNER = deployerAddress;

                            await mintAndApproveUnderlyingAsset(AMOUNT);
                            await deposit(deployerAddress, vaultAddresses, values, AMOUNT);
                        });

                        it("THEN it should FAIL", async () => {
                            await expect(
                                aggregatorTokenContract
                                    .connect(other1)
                                    .transferFrom(OWNER, TO_ADDRESS, AMOUNT),
                            )
                                .to.be.revertedWithCustomError(
                                    aggregatorTokenContract,
                                    "ERC20InsufficientAllowance",
                                )
                                .withArgs(SPENDER, 0n, AMOUNT);
                        });
                    });
                });

                describe("WHEN executing transferFrom with correct parameters", () => {
                    beforeEach(async () => {
                        TO_ADDRESS = otherAddress2;
                        SPENDER = otherAddress1;
                        OWNER = deployerAddress;

                        await mintAndApproveUnderlyingAsset(AMOUNT);
                        await deposit(deployerAddress, vaultAddresses, values, AMOUNT);

                        await aggregatorTokenContract.approve(SPENDER, AMOUNT);

                        txResult = await aggregatorTokenContract
                            .connect(other1)
                            .transferFrom(OWNER, TO_ADDRESS, AMOUNT);
                    });

                    it("THEN it should emit Transfer event", async () => {
                        await expect(txResult)
                            .to.emit(aggregatorTokenContract, "Transfer")
                            .withArgs(OWNER, TO_ADDRESS, AMOUNT);
                    });
                });
            });

            describe("WHEN updating user portfolio", () => {
                const AMOUNT: bigint = ethers.parseEther("10");
                const values = Array(5).fill(AMOUNT / 5n);

                before(async () => {
                    await mintAndApproveUnderlyingAsset(AMOUNT);
                    await deposit(deployerAddress, vaultAddresses, values, AMOUNT);
                    txResult =
                        await aggregatorTokenContract.updatePortfolioValuation(deployerAddress);
                });

                it("THEN it should emit PortfolioValuationUpdated event", async () => {
                    await expect(txResult)
                        .to.emit(aggregatorTokenContract, "PortfolioValuationUpdated")
                        .withArgs(deployerAddress);
                });
            });
        });
    });
});
