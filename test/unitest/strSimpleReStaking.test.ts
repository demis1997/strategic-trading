/* eslint-disable @typescript-eslint/require-await */
import { ethers, upgrades } from "hardhat";
import { Signer, ContractTransactionResponse } from "ethers";
import { SnapshotRestorer, takeSnapshot } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import * as chai from "chai";
import {
    ERC20Mock,
    AdapterMock,
    ProtocolMock,
    StrSimpleReStaking,
    GenericWrapperMock,
    OracleMock,
    StrSimpleReStakingV2,
} from "../../types";

import {
    deployProtocolMock,
    deployMockAdapter,
    deployVaultStrategy,
    deployERC20,
    deployGenericWrapperMock,
    deployOracleMock,
} from "../../scripts/_helpers/_deployContracts";

import { configVault } from "../../scripts/_helpers/_configContracts";

import { ZERO_ADDRESS, AMOUNT_1E18, TEST_TIMEOUT, ZERO_AMOUNT } from "../_helpers/constants";
import { testDeployStrategyFailure } from "./../_helpers/utils";

let baseSnapshot: SnapshotRestorer;

let deployer: Signer;
let nonAuthorized: Signer;
let user1: Signer;
let user2: Signer;
let user3: Signer;

let deployerAddress: string;
let nonAuthorizedAddress: string;
let user1Address: string;
let user2Address: string;
let user3Address: string;
let underlyingTokenAddress: string;
let liquidTokenContractAddress: string;
let liquidRSTokenContractAddress: string;

let txResult: ContractTransactionResponse;
let defaultAdminRole: string;

let wethTokenContract: ERC20Mock;
let liquidTokenContract: ERC20Mock;
let liquidRSTokenContract: ERC20Mock;
let vaultAddress: string;

let oracleContract: OracleMock;
let oracleContractAddress: string;
let protocolContractLS: ProtocolMock;
let protocolContractLSAddress: string;
let protocolContractLRS: ProtocolMock;
let protocolContractLRSAddress: string;

let adapterLSContract: AdapterMock;
let adapterLSContractAddress: string;
let adapterLRSContract: AdapterMock;
let adapterLRSContractAddress: string;
let genericWrapperMockContract: GenericWrapperMock;
let genericWrapperMockContractAddress: string;

let strategyContract: StrSimpleReStaking;
let strategyContractAddress: string;

const INTIAL_MINT = ethers.parseEther("1000");
const CONTRACT_STRATEGY_NAME = "Standard Re-Staking Strategy";

describe("UNITEST ==> Simple Re-Staking Strategy", function () {
    this.timeout(TEST_TIMEOUT);

    before(async () => {
        [deployer, nonAuthorized, user1, user2, user3] = await ethers.getSigners();
        [deployerAddress, nonAuthorizedAddress, user1Address, user2Address, user3Address] =
            await Promise.all([
                deployer.getAddress(),
                nonAuthorized.getAddress(),
                user1.getAddress(),
                user2.getAddress(),
                user3.getAddress(),
            ]);

        vaultAddress = deployerAddress; // any value is ok for these tests

        // deploy token contract as underlying
        wethTokenContract = (await deployERC20("WETH", "WETH", 18)) as unknown as ERC20Mock;
        underlyingTokenAddress = await wethTokenContract.getAddress();

        // deploy token contract as liquidToken
        liquidTokenContract = (await deployERC20("LT", "LT", 18)) as unknown as ERC20Mock;
        liquidTokenContractAddress = await liquidTokenContract.getAddress();

        // deploy token contract as restaking liquidToken
        liquidRSTokenContract = (await deployERC20("LRT", "LRT", 18)) as unknown as ERC20Mock;
        liquidRSTokenContractAddress = await liquidRSTokenContract.getAddress();

        // MINT underlying for deployer
        await wethTokenContract.mint(deployerAddress, INTIAL_MINT);

        // MINT underlying for users
        await wethTokenContract.mint(user1Address, INTIAL_MINT);
        await wethTokenContract.mint(user2Address, INTIAL_MINT);
        await wethTokenContract.mint(user3Address, INTIAL_MINT);

        // deploy staking protocol mock
        protocolContractLS = (await deployProtocolMock(
            "ProtocolMock",
            "Staking Protocol",
            underlyingTokenAddress,
            liquidTokenContractAddress,
        )) as unknown as ProtocolMock;
        protocolContractLSAddress = await protocolContractLS.getAddress();

        // deploy restaking protocol mock
        protocolContractLRS = (await deployProtocolMock(
            "ProtocolMock",
            "RE-Staking Protocol",
            underlyingTokenAddress,
            liquidRSTokenContractAddress,
        )) as unknown as ProtocolMock;
        protocolContractLRSAddress = await protocolContractLRS.getAddress();

        // MINT liquidTokens to protocols
        await liquidTokenContract.mint(protocolContractLSAddress, INTIAL_MINT);
        await liquidRSTokenContract.mint(protocolContractLRSAddress, INTIAL_MINT);

        // MINT WETH to last protocol to withdraw
        await wethTokenContract.mint(protocolContractLRSAddress, INTIAL_MINT);

        // deploy adapter for staking protocol mock
        adapterLSContract = (await deployMockAdapter(
            "AdapterMock",
            protocolContractLSAddress,
        )) as unknown as AdapterMock;
        adapterLSContractAddress = await adapterLSContract.getAddress();

        // deploy adapter for re-staking protocol mock
        adapterLRSContract = (await deployMockAdapter(
            "AdapterMock",
            protocolContractLRSAddress,
        )) as unknown as AdapterMock;
        adapterLRSContractAddress = await adapterLRSContract.getAddress();

        // give roles to adapter to use protocol
        defaultAdminRole = await adapterLSContract.DEFAULT_ADMIN_ROLE();
        await protocolContractLS.grantRole(defaultAdminRole, adapterLSContractAddress);
        defaultAdminRole = await adapterLRSContract.DEFAULT_ADMIN_ROLE();
        await protocolContractLRS.grantRole(defaultAdminRole, adapterLRSContractAddress);

        // deploy genericWrapper
        genericWrapperMockContract = (await deployGenericWrapperMock(
            "GenericWrapperMock",
            liquidRSTokenContractAddress,
            "wLT",
            "wLT",
            18n,
        )) as unknown as GenericWrapperMock;
        genericWrapperMockContractAddress = await genericWrapperMockContract.getAddress();
    });

    describe("WHEN preparing context for strategy deployment", function () {
        it("THEN Adapters, Protocols and Roles should be as deployed", async () => {
            expect(protocolContractLRSAddress).equals(await adapterLRSContract.protocolAddress());
            expect(protocolContractLSAddress).equals(await adapterLSContract.protocolAddress());

            expect(underlyingTokenAddress).equals(await protocolContractLRS.assetAddress());
            expect(underlyingTokenAddress).equals(await protocolContractLS.assetAddress());

            expect(liquidRSTokenContractAddress).equals(
                await protocolContractLRS.liquidAssetAddress(),
            );
            expect(liquidTokenContractAddress).equals(
                await protocolContractLS.liquidAssetAddress(),
            );

            // get admin role from contract
            defaultAdminRole = await adapterLRSContract.DEFAULT_ADMIN_ROLE();
            expect(await adapterLRSContract.hasRole(defaultAdminRole, deployerAddress)).to.be.true;

            // get admin role from contract
            defaultAdminRole = await adapterLSContract.DEFAULT_ADMIN_ROLE();
            expect(await adapterLSContract.hasRole(defaultAdminRole, deployerAddress)).to.be.true;

            /// @TODO check roles on protocol
            // expect(deployerAddress).equals(await protocolContractLRS.owner());
            // expect(deployerAddress).equals(await protocolContractLS.owner());
        });
    });

    describe("WHEN trying to deploy Strategy with wrong parameters", function () {
        const CONTRACT_NAME = "StrSimpleReStaking";

        it("THEN should fail when vaultAddress is ZERO ADDRESS", async () => {
            await testDeployStrategyFailure(
                CONTRACT_NAME,
                ZERO_ADDRESS,
                liquidRSTokenContractAddress,
                [adapterLSContractAddress, adapterLRSContractAddress],
                [adapterLRSContractAddress],
                CONTRACT_STRATEGY_NAME,
                "ZeroAddress",
                "vaultAddress_",
            );
        });

        it("THEN should fail when liquidTokenAddress is ZERO ADDRESS", async () => {
            await testDeployStrategyFailure(
                CONTRACT_NAME,
                vaultAddress,
                ZERO_ADDRESS,
                [adapterLSContractAddress, adapterLRSContractAddress],
                [adapterLRSContractAddress],
                CONTRACT_STRATEGY_NAME,
                "ZeroAddress",
                "liquidTokenAddress_",
            );
        });

        it("THEN should fail when strategyName is empty", async () => {
            await testDeployStrategyFailure(
                CONTRACT_NAME,
                vaultAddress,
                liquidRSTokenContractAddress,
                [adapterLSContractAddress, adapterLRSContractAddress],
                [adapterLRSContractAddress],
                "",
                "EmptyString",
                "strategyName_",
            );
        });

        it("THEN should fail when deployAdapterPath is different from defined DEPLOYMENT_ADAPTERS_QTY", async () => {
            await testDeployStrategyFailure(
                CONTRACT_NAME,
                vaultAddress,
                liquidRSTokenContractAddress,
                [adapterLRSContractAddress, ZERO_ADDRESS, adapterLSContractAddress],
                [adapterLRSContractAddress],
                CONTRACT_STRATEGY_NAME,
                "InvalidAdaptersPath",
                "deploy",
            );
        });

        it("THEN should fail when deployAdapterPath has a ZERO ADDRESS", async () => {
            await testDeployStrategyFailure(
                CONTRACT_NAME,
                vaultAddress,
                liquidRSTokenContractAddress,
                [adapterLRSContractAddress, ZERO_ADDRESS],
                [adapterLRSContractAddress],
                CONTRACT_STRATEGY_NAME,
                "ZeroAddress",
                "adaptersDeployPath_[]",
            );
        });

        it("THEN should fail when withdrawAdapterPath is different from defined WITHDRAW_ADAPTERS_QTY", async () => {
            await testDeployStrategyFailure(
                CONTRACT_NAME,
                vaultAddress,
                liquidRSTokenContractAddress,
                [adapterLRSContractAddress, adapterLSContractAddress],
                [adapterLRSContractAddress, adapterLSContractAddress],
                CONTRACT_STRATEGY_NAME,
                "InvalidAdaptersPath",
                "withdraw",
            );
        });

        it("THEN should fail when withdrawAdapterPath is different from defined WITHDRAW_ADAPTERS_QTY", async () => {
            await testDeployStrategyFailure(
                CONTRACT_NAME,
                vaultAddress,
                liquidRSTokenContractAddress,
                [adapterLRSContractAddress, adapterLSContractAddress],
                [ZERO_ADDRESS],
                CONTRACT_STRATEGY_NAME,
                "ZeroAddress",
                "adaptersWithdrawPath_[]",
            );
        });
    });

    describe("WHEN deploying Strategies with correct parameters", function () {
        before(async () => {
            // deploy VaultStrategy
            strategyContract = (await deployVaultStrategy(
                "StrSimpleReStaking",
                vaultAddress,
                liquidRSTokenContractAddress,
                [adapterLSContractAddress, adapterLRSContractAddress],
                [adapterLRSContractAddress],
                "Standard Re-Staking Strategy",
            )) as unknown as StrSimpleReStaking;
            strategyContractAddress = await strategyContract.getAddress();

            // put withdraw strategy the same as standard strategy to get immediate withdraw
            await configVault(vaultAddress, strategyContractAddress, strategyContractAddress);

            // give vault manager role on strategy to deployer and to withdraw strategy
            let roleToAssign = await strategyContract.VAULT_MANAGER_ROLE();
            await strategyContract.grantRole(roleToAssign, deployerAddress);

            // give strategy manager role on adapter
            roleToAssign = await adapterLSContract.VAULT_STRATEGY_ROLE();
            await adapterLSContract.grantRole(roleToAssign, strategyContractAddress);

            // give strategy manager role on adapter
            roleToAssign = await adapterLRSContract.VAULT_STRATEGY_ROLE();
            await adapterLRSContract.grantRole(roleToAssign, strategyContractAddress);

            // take a baseSnapshot
            baseSnapshot = await takeSnapshot();
        });

        it("THEN state variables should contain deployment values", async () => {
            expect(vaultAddress).equals(await strategyContract.vaultAddress());

            expect(CONTRACT_STRATEGY_NAME).equals(await strategyContract.strategyName());

            expect(liquidRSTokenContractAddress).equals(
                await strategyContract.liquidTokenAddress(),
            );

            expect(vaultAddress).equals(await strategyContract.vaultAddress());

            expect(ZERO_ADDRESS).equals(await strategyContract.wrappedLiquidTokenAddress());

            expect(ZERO_ADDRESS).equals(await strategyContract.withdrawStrategyAddress());

            expect(ZERO_AMOUNT).equals(await strategyContract.deployedAssetsValue());

            expect(adapterLSContractAddress).equals(
                await strategyContract.getFirstDepositAdapter(),
            );
        });

        describe("WHEN trying to getTokenPrice", function () {
            describe("WHEN executing with wrong context", function () {
                describe("WHEN token is invalid", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract.getTokenPrice(user1Address, 2),
                        ).to.be.revertedWith("Invalid token requested");
                    });
                });
                describe("WHEN source is invalid", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract.getTokenPrice(liquidRSTokenContractAddress, 5),
                        ).to.be.revertedWith("Invalid source to get price");
                    });
                });
            });
            describe("WHEN executing with right context", function () {
                let tokenPrice: bigint;

                before(async () => {
                    // define an oracle
                    // deploy oracle for eETH
                    // 1 LRS = 1.5 WETH
                    oracleContract = (await deployOracleMock(
                        "OracleMock",
                        "LRS to ETH",
                        liquidRSTokenContractAddress,
                        "LRS",
                        ethers.parseEther("1.5"),
                    )) as unknown as OracleMock;
                    oracleContractAddress = await oracleContract.getAddress();
                    // set oracle on strategy
                    // set priceFeed on Strategy for eETH
                    await strategyContract.setPriceFeedPerToken(
                        liquidRSTokenContractAddress,
                        oracleContractAddress,
                    );

                    tokenPrice = await strategyContract.getTokenPrice(
                        liquidRSTokenContractAddress,
                        1,
                    );
                });
                after(async () => {
                    await baseSnapshot.restore();
                });

                it("THEN token price should match", async () => {
                    const expectedTokenPrice = ethers.parseEther("1.5");
                    expect(expectedTokenPrice).equals(tokenPrice);
                });
            });
        });

        describe("WHEN trying to executeHarvest", function () {
            it("THEN it should revert", async () => {
                // put any parameters, it doesn't matter
                await expect(strategyContract.executeHarvest()).to.be.revertedWith(
                    "Function not allowed",
                );
            });
        });

        describe("WHEN sending ethers to contract", function () {
            after(async () => {
                await baseSnapshot.restore();
            });
            it("THEN contract balance should update", async () => {
                await deployer.sendTransaction({
                    to: strategyContractAddress,
                    value: ethers.parseEther("1"),
                });

                const balance = await deployer.provider?.getBalance(strategyContractAddress);
                expect(balance).equals(ethers.parseEther("1"));
            });
        });

        describe("WHEN trying to setVaultAddress", function () {
            describe("WHEN executing with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract.connect(nonAuthorized).setVaultAddress(user1Address),
                        ).to.be.revertedWithCustomError(
                            strategyContract,
                            "AccessControlUnauthorizedAccount",
                        );
                    });
                });
                describe("WHEN address is zero", function () {
                    it("THEN it should fail", async () => {
                        await expect(strategyContract.setVaultAddress(ZERO_ADDRESS))
                            .to.be.revertedWithCustomError(strategyContract, "ZeroAddress")
                            .withArgs("vaultAddress_");
                    });
                });
            });

            describe("WHEN executing with right context", function () {
                let anyAddress: string;

                before(async () => {
                    anyAddress = user1Address;
                    txResult = await strategyContract.connect(deployer).setVaultAddress(anyAddress);
                });

                it("THEN it should update state variable vaultAddress", async () => {
                    const newVaultAddress = await strategyContract.vaultAddress();
                    expect(newVaultAddress).equals(anyAddress);
                });

                it("THEN it should emit an Event", async () => {
                    await expect(txResult)
                        .to.emit(strategyContract, "VaultAddressSet")
                        .withArgs(anyAddress);
                });

                after(async () => {
                    await baseSnapshot.restore();
                });
            });
        });

        describe("WHEN trying to setWithdrawStrategyAddress", function () {
            describe("WHEN executing with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract
                                .connect(nonAuthorized)
                                .setWithdrawStrategyAddress(user1Address),
                        ).to.be.revertedWithCustomError(
                            strategyContract,
                            "AccessControlUnauthorizedAccount",
                        );
                    });
                });
                describe("WHEN address is zero", function () {
                    it("THEN it should fail", async () => {
                        await expect(strategyContract.setWithdrawStrategyAddress(ZERO_ADDRESS))
                            .to.be.revertedWithCustomError(strategyContract, "ZeroAddress")
                            .withArgs("withdrawStrategyAddress_");
                    });
                });
            });

            describe("WHEN executing with right context", function () {
                let anyAddress: string;

                before(async () => {
                    anyAddress = user1Address;
                    txResult = await strategyContract
                        .connect(deployer)
                        .setWithdrawStrategyAddress(anyAddress);
                });

                it("THEN it should update state variable withdrawStrategyAddress", async () => {
                    const newAddress = await strategyContract.withdrawStrategyAddress();
                    expect(newAddress).equals(anyAddress);
                });

                it("THEN it should emit an Event", async () => {
                    await expect(txResult)
                        .to.emit(strategyContract, "WithdrawStrategyAddressSet")
                        .withArgs(anyAddress);
                });

                after(async () => {
                    await baseSnapshot.restore();
                });
            });
        });

        describe("WHEN trying to setStrategyName", function () {
            describe("WHEN executing with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract.connect(nonAuthorized).setStrategyName("newName"),
                        ).to.be.revertedWithCustomError(
                            strategyContract,
                            "AccessControlUnauthorizedAccount",
                        );
                    });
                });
                describe("WHEN strategyName is empty", function () {
                    it("THEN it should fail", async () => {
                        await expect(strategyContract.setStrategyName(""))
                            .to.be.revertedWithCustomError(strategyContract, "EmptyString")
                            .withArgs("strategyName_");
                    });
                });
            });

            describe("WHEN executing with right context", function () {
                let anyString: string;

                before(async () => {
                    anyString = "New Name";
                    txResult = await strategyContract.connect(deployer).setStrategyName(anyString);
                });

                it("THEN it should update state variable vaultAddress", async () => {
                    const newName = await strategyContract.strategyName();
                    expect(newName).equals(anyString);
                });

                it("THEN it should emit an Event", async () => {
                    await expect(txResult)
                        .to.emit(strategyContract, "StrategyNameSet")
                        .withArgs(anyString);
                });

                after(async () => {
                    await baseSnapshot.restore();
                });
            });
        });

        describe("WHEN trying to setLiquidTokenAddress", function () {
            describe("WHEN executing with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract
                                .connect(nonAuthorized)
                                .setLiquidTokenAddress(user1Address),
                        ).to.be.revertedWithCustomError(
                            strategyContract,
                            "AccessControlUnauthorizedAccount",
                        );
                    });
                });
                describe("WHEN address is zero", function () {
                    it("THEN it should fail", async () => {
                        await expect(strategyContract.setLiquidTokenAddress(ZERO_ADDRESS))
                            .to.be.revertedWithCustomError(strategyContract, "ZeroAddress")
                            .withArgs("liquidTokenAddress_");
                    });
                });
            });

            describe("WHEN executing with right context", function () {
                let anyAddress: string;

                before(async () => {
                    anyAddress = user1Address;
                    txResult = await strategyContract
                        .connect(deployer)
                        .setLiquidTokenAddress(anyAddress);
                });

                it("THEN it should update state variable liquidTokenAddress", async () => {
                    const newAddress = await strategyContract.liquidTokenAddress();
                    expect(newAddress).equals(anyAddress);
                });

                it("THEN it should emit an Event", async () => {
                    await expect(txResult)
                        .to.emit(strategyContract, "LiquidTokenSet")
                        .withArgs(anyAddress);
                });

                after(async () => {
                    await baseSnapshot.restore();
                });
            });
        });

        describe("WHEN trying to setWrappedLiquidTokenAddress", function () {
            describe("WHEN executing with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract
                                .connect(nonAuthorized)
                                .setWrappedLiquidTokenAddress(user1Address),
                        ).to.be.revertedWithCustomError(
                            strategyContract,
                            "AccessControlUnauthorizedAccount",
                        );
                    });
                });
                describe("WHEN address is zero", function () {
                    it("THEN it should fail", async () => {
                        await expect(strategyContract.setWrappedLiquidTokenAddress(ZERO_ADDRESS))
                            .to.be.revertedWithCustomError(strategyContract, "ZeroAddress")
                            .withArgs("wrappedLiquidTokenAddress_");
                    });
                });
            });

            describe("WHEN executing with right context", function () {
                let anyAddress: string;

                before(async () => {
                    anyAddress = user1Address;
                    txResult = await strategyContract
                        .connect(deployer)
                        .setWrappedLiquidTokenAddress(anyAddress);
                });

                it("THEN it should update state variable wrappedLiquidTokenAddress", async () => {
                    const newAddress = await strategyContract.wrappedLiquidTokenAddress();
                    expect(newAddress).equals(anyAddress);
                });

                it("THEN it should emit an Event", async () => {
                    await expect(txResult)
                        .to.emit(strategyContract, "TokenWrapperSet")
                        .withArgs(anyAddress);
                });

                after(async () => {
                    await baseSnapshot.restore();
                });
            });
        });

        describe("WHEN trying to setPriceFeedPerToken", function () {
            describe("WHEN executing with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract
                                .connect(nonAuthorized)
                                .setPriceFeedPerToken(user1Address, user1Address),
                        ).to.be.revertedWithCustomError(
                            strategyContract,
                            "AccessControlUnauthorizedAccount",
                        );
                    });
                });
                describe("WHEN token is zero address", function () {
                    it("THEN it should fail", async () => {
                        await expect(
                            strategyContract.setPriceFeedPerToken(ZERO_ADDRESS, user1Address),
                        ).to.be.revertedWith("Invalid token entered");
                    });
                });
                describe("WHEN feed is zero address", function () {
                    it("THEN it should fail", async () => {
                        await expect(
                            strategyContract.setPriceFeedPerToken(user1Address, ZERO_ADDRESS),
                        ).to.be.revertedWith("Invalid token entered");
                    });
                });
                describe("WHEN token and feed area zero address", function () {
                    it("THEN it should fail", async () => {
                        await expect(
                            strategyContract.setPriceFeedPerToken(ZERO_ADDRESS, ZERO_ADDRESS),
                        ).to.be.revertedWith("Invalid token entered");
                    });
                });
                describe("WHEN token is not the liquidToken or the wrapped liquid token", function () {
                    it("THEN it should fail", async () => {
                        await expect(
                            strategyContract.setPriceFeedPerToken(
                                deployerAddress,
                                underlyingTokenAddress,
                            ),
                        ).to.be.revertedWith("Invalid token entered");
                    });
                });
            });
            describe("WHEN executing with right context for liquid token", function () {
                let anyAddress: string;

                before(async () => {
                    anyAddress = user1Address;

                    txResult = await strategyContract
                        .connect(deployer)
                        .setPriceFeedPerToken(liquidRSTokenContractAddress, anyAddress);
                });

                it("THEN it should update mapping priceFeedPerToken", async () => {
                    const newAddress = await strategyContract.priceFeedPerToken(
                        liquidRSTokenContractAddress,
                    );
                    expect(newAddress).equals(anyAddress);
                });

                it("THEN it should emit an Event", async () => {
                    await expect(txResult)
                        .to.emit(strategyContract, "PriceFeedSet")
                        .withArgs(liquidRSTokenContractAddress, anyAddress);
                });

                after(async () => {
                    await baseSnapshot.restore();
                });
            });
            describe("WHEN executing with right context for wrapped liquid token", function () {
                let anyAddress: string;

                before(async () => {
                    anyAddress = user1Address;

                    await strategyContract.setWrappedLiquidTokenAddress(underlyingTokenAddress);

                    txResult = await strategyContract
                        .connect(deployer)
                        .setPriceFeedPerToken(underlyingTokenAddress, anyAddress);
                });

                it("THEN it should update mapping priceFeedPerToken", async () => {
                    const newAddress =
                        await strategyContract.priceFeedPerToken(underlyingTokenAddress);
                    expect(newAddress).equals(anyAddress);
                });

                it("THEN it should emit an Event", async () => {
                    await expect(txResult)
                        .to.emit(strategyContract, "PriceFeedSet")
                        .withArgs(underlyingTokenAddress, anyAddress);
                });

                after(async () => {
                    await baseSnapshot.restore();
                });
            });
        });

        describe("WHEN trying to setAdaptersDeployPath", function () {
            describe("WHEN executing with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract
                                .connect(nonAuthorized)
                                .setAdaptersDeployPath([user1Address, user1Address]),
                        ).to.be.revertedWithCustomError(
                            strategyContract,
                            "AccessControlUnauthorizedAccount",
                        );
                    });
                });
            });
            describe("WHEN executing with right context", function () {
                let anyAddress1: string;
                let anyAddress2: string;
                let path: string[];

                before(async () => {
                    anyAddress1 = user1Address;
                    anyAddress2 = user2Address;
                    path = [anyAddress1, anyAddress2];
                    txResult = await strategyContract.connect(deployer).setAdaptersDeployPath(path);
                });

                it("THEN it should update array", async () => {
                    const deployPath0 = await strategyContract.adaptersDeployPath(0);
                    const deployPath1 = await strategyContract.adaptersDeployPath(1);

                    expect(deployPath0).equals(anyAddress1);
                    expect(deployPath1).equals(anyAddress2);
                });

                it("THEN it should emit an Event", async () => {
                    await expect(txResult)
                        .to.emit(strategyContract, "AdaptersDeployPathSet")
                        .withArgs(path);
                });

                after(async () => {
                    await baseSnapshot.restore();
                });
            });
        });

        describe("WHEN trying to setAdaptersWithdrawPath", function () {
            describe("WHEN executing with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract
                                .connect(nonAuthorized)
                                .setAdaptersWithdrawPath([user1Address, user1Address]),
                        ).to.be.revertedWithCustomError(
                            strategyContract,
                            "AccessControlUnauthorizedAccount",
                        );
                    });
                });
            });
            describe("WHEN executing with right context", function () {
                let anyAddress: string;
                let path: string[];

                before(async () => {
                    anyAddress = user1Address;
                    path = [anyAddress];
                    txResult = await strategyContract
                        .connect(deployer)
                        .setAdaptersWithdrawPath(path);
                });

                it("THEN it should update array", async () => {
                    const deployPath0 = await strategyContract.adaptersWithdrawPath(0);
                    expect(deployPath0).equals(anyAddress);
                });

                it("THEN it should emit an Event", async () => {
                    await expect(txResult)
                        .to.emit(strategyContract, "AdaptersWithdrawPathSet")
                        .withArgs(path);
                });

                after(async () => {
                    await baseSnapshot.restore();
                });
            });
        });

        describe("WHEN trying to buildPath", function () {
            let tokens: string[];
            let fees: bigint[];
            describe("WHEN executing with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        tokens = [];
                        fees = [];

                        await expect(
                            strategyContract.connect(nonAuthorized).buildPath(tokens, fees),
                        ).to.be.revertedWithCustomError(
                            strategyContract,
                            "AccessControlUnauthorizedAccount",
                        );
                    });
                });
                describe("WHEN tokens array is empty", function () {
                    it("THEN it should fail", async () => {
                        tokens = [];
                        fees = [];

                        await expect(
                            strategyContract.buildPath(tokens, fees),
                        ).to.be.revertedWithCustomError(strategyContract, "MinTwoTokensNeeded");
                    });
                });
                describe("WHEN tokens array is less than 2 elements", function () {
                    it("THEN it should fail", async () => {
                        tokens = [deployerAddress]; // any address is ok to test
                        fees = [];

                        await expect(
                            strategyContract.buildPath(tokens, fees),
                        ).to.be.revertedWithCustomError(strategyContract, "MinTwoTokensNeeded");
                    });
                });
                describe("WHEN arrays not respect pattern", function () {
                    it("THEN it should fail", async () => {
                        tokens = [user1Address, user1Address];
                        fees = [100n, 200n];

                        await expect(
                            strategyContract.buildPath(tokens, fees),
                        ).to.be.revertedWithCustomError(strategyContract, "MalformedPath");
                    });
                });
                describe("WHEN arrays not respect pattern", function () {
                    it("THEN it should fail", async () => {
                        tokens = [user1Address, user1Address, user1Address];
                        fees = [100n];

                        await expect(
                            strategyContract.buildPath(tokens, fees),
                        ).to.be.revertedWithCustomError(strategyContract, "MalformedPath");
                    });
                });
                describe("WHEN token array has ZERO address in it", function () {
                    it("THEN it should fail", async () => {
                        tokens = [user1Address, ZERO_ADDRESS, user1Address];
                        fees = [100n, 200n];

                        await expect(strategyContract.buildPath(tokens, fees))
                            .to.be.revertedWithCustomError(strategyContract, "ZeroAddress")
                            .withArgs("tokens_");
                    });
                });
                describe("WHEN fees array has a ZERO amount in it", function () {
                    it("THEN it should fail", async () => {
                        tokens = [user1Address, user1Address, user1Address];
                        fees = [100n, 0n];

                        await expect(strategyContract.buildPath(tokens, fees))
                            .to.be.revertedWithCustomError(strategyContract, "ZeroAmount")
                            .withArgs("fees_");
                    });
                });
            });

            describe("WHEN executing with right context", function () {
                let anyAddress1: string;
                let anyAddress2: string;
                let path: string;

                before(async () => {
                    anyAddress1 = user1Address;
                    anyAddress2 = user2Address;

                    tokens = [anyAddress1, anyAddress2];
                    fees = [100n];

                    path = ethers.solidityPacked(
                        ["address", "uint24", "address"],
                        [anyAddress1, 100n, anyAddress2],
                    );

                    txResult = await strategyContract.connect(deployer).buildPath(tokens, fees);
                    await txResult.wait();
                });

                it("THEN it should update state variable swapPath", async () => {
                    const swapPath = await strategyContract.swapPath();
                    expect(swapPath).equals(path);
                });

                it("THEN it should emit an Event", async () => {
                    await expect(txResult).to.emit(strategyContract, "PathUpdated").withArgs(path);
                });

                after(async () => {
                    await baseSnapshot.restore();
                });
            });
        });

        describe("WHEN trying to wrapToken", function () {
            describe("WHEN executing with wrong context", function () {
                before(async () => {
                    // send some liquid token to strategy
                    await liquidRSTokenContract
                        .connect(deployer)
                        .mint(strategyContractAddress, 10n);
                });
                after(async () => {
                    await baseSnapshot.restore();
                });

                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract.connect(nonAuthorized).wrapToken(1n),
                        ).to.be.revertedWithCustomError(
                            strategyContract,
                            "AccessControlUnauthorizedAccount",
                        );
                    });
                });
                describe("WHEN wrapper is not defined", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(strategyContract.wrapToken(1n)).to.be.revertedWith(
                            "No defined wrapper",
                        );
                    });
                });
                describe("WHEN wrapper returned zero amount", function () {
                    it("THEN it should fail", async () => {
                        // set the wrapper in the strategy
                        await strategyContract.setWrappedLiquidTokenAddress(
                            genericWrapperMockContractAddress,
                        );
                        // set the wrapper to return zero
                        await genericWrapperMockContract.setAmountToReturn(0n);

                        // expect to fail
                        await expect(strategyContract.wrapToken(1n))
                            .to.be.revertedWithCustomError(strategyContract, "StrategyWrapError")
                            .withArgs(genericWrapperMockContractAddress, 1n, true);
                    });
                });
            });
            describe("WHEN executing with right context", function () {
                before(async () => {
                    // send some liquid token to strategy
                    await liquidRSTokenContract
                        .connect(deployer)
                        .mint(strategyContractAddress, AMOUNT_1E18 * 5n);

                    // set the wrapper in the strategy
                    await strategyContract.setWrappedLiquidTokenAddress(
                        genericWrapperMockContractAddress,
                    );

                    txResult = await strategyContract.connect(deployer).wrapToken(AMOUNT_1E18);
                });
                after(async () => {
                    await baseSnapshot.restore();
                });

                it("THEN it should update balances of liquid restaking token", async () => {
                    await expect(txResult).to.changeTokenBalances(
                        liquidRSTokenContract,
                        [strategyContractAddress, genericWrapperMockContractAddress],
                        [-AMOUNT_1E18, AMOUNT_1E18],
                    );
                });

                it("THEN it should update balances of wrapped token for strategy", async () => {
                    await expect(txResult).to.changeTokenBalances(
                        genericWrapperMockContract,
                        [strategyContractAddress],
                        [AMOUNT_1E18],
                    );
                });

                it("THEN it should emit an Event", async () => {
                    await expect(txResult)
                        .to.emit(strategyContract, "WrappedAmount")
                        .withArgs(
                            liquidRSTokenContractAddress,
                            AMOUNT_1E18,
                            genericWrapperMockContractAddress,
                            AMOUNT_1E18,
                        );
                });
            });
        });

        describe("WHEN trying to unwrapToken", function () {
            describe("WHEN executing with wrong context", function () {
                before(async () => {
                    // send some liquid token to wrapper
                    await liquidRSTokenContract
                        .connect(deployer)
                        .mint(genericWrapperMockContractAddress, AMOUNT_1E18 * 5n);

                    // send some wrapped liquid token to strategy
                    await genericWrapperMockContract
                        .connect(deployer)
                        .mint(strategyContractAddress, AMOUNT_1E18 * 5n);
                });
                after(async () => {
                    await baseSnapshot.restore();
                });

                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract.connect(nonAuthorized).unwrapToken(1n),
                        ).to.be.revertedWithCustomError(
                            strategyContract,
                            "AccessControlUnauthorizedAccount",
                        );
                    });
                });
                describe("WHEN wrapper is not defined", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(strategyContract.unwrapToken(1n)).to.be.revertedWith(
                            "No defined wrapper",
                        );
                    });
                });
                describe("WHEN wrapper returned zero amount", function () {
                    it("THEN it should fail", async () => {
                        // set the wrapper in the strategy
                        await strategyContract.setWrappedLiquidTokenAddress(
                            genericWrapperMockContractAddress,
                        );
                        // set the wrapper to return zero
                        await genericWrapperMockContract.setAmountToReturn(0n);

                        // expect to fail
                        await expect(strategyContract.unwrapToken(1n))
                            .to.be.revertedWithCustomError(strategyContract, "StrategyWrapError")
                            .withArgs(genericWrapperMockContractAddress, 1n, false);
                    });
                });
            });
            describe("WHEN executing with right context", function () {
                before(async () => {
                    // send some liquid token to wrapper
                    await liquidRSTokenContract
                        .connect(deployer)
                        .mint(genericWrapperMockContractAddress, AMOUNT_1E18 * 5n);

                    // send some wrapped liquid token to strategy
                    await genericWrapperMockContract
                        .connect(deployer)
                        .mint(strategyContractAddress, AMOUNT_1E18 * 5n);

                    // set the wrapper in the strategy
                    await strategyContract.setWrappedLiquidTokenAddress(
                        genericWrapperMockContractAddress,
                    );

                    txResult = await strategyContract.connect(deployer).unwrapToken(AMOUNT_1E18);
                });
                after(async () => {
                    await baseSnapshot.restore();
                });

                it("THEN it should update balances of liquid restaking token", async () => {
                    await expect(txResult).to.changeTokenBalances(
                        liquidRSTokenContract,
                        [strategyContractAddress, genericWrapperMockContractAddress],
                        [AMOUNT_1E18, -AMOUNT_1E18],
                    );
                });

                it("THEN it should update balances of wrapped token for strategy", async () => {
                    await expect(txResult).to.changeTokenBalances(
                        genericWrapperMockContract,
                        [strategyContractAddress, genericWrapperMockContractAddress],
                        [-AMOUNT_1E18, AMOUNT_1E18],
                    );
                });

                it("THEN it should emit an Event", async () => {
                    await expect(txResult)
                        .to.emit(strategyContract, "UnwrappedAmount")
                        .withArgs(
                            genericWrapperMockContractAddress,
                            AMOUNT_1E18,
                            liquidRSTokenContractAddress,
                            AMOUNT_1E18,
                        );
                });
            });
        });

        describe("WHEN trying to updateDeployedAssetVaule", function () {
            describe("WHEN executing with wrong context", function () {
                after(async () => {
                    await baseSnapshot.restore();
                });

                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract.connect(nonAuthorized).updateDeployedAssetVaule(0n),
                        ).to.be.revertedWithCustomError(
                            strategyContract,
                            "AccessControlUnauthorizedAccount",
                        );
                    });
                });
                describe("WHEN source is wrong", function () {
                    it("THEN it should fail", async () => {
                        await expect(
                            strategyContract.updateDeployedAssetVaule(3n),
                        ).to.be.revertedWith("Invalid source to get price");
                    });
                });
            });
            describe("WHEN executing with right context (price from withdraw adapter)", function () {
                let expectedValuation: bigint;

                before(async () => {
                    // send some liquid token to strategy
                    await liquidRSTokenContract
                        .connect(deployer)
                        .mint(strategyContractAddress, AMOUNT_1E18 * 5n);

                    const tokenPrice = 500000000000000000n;
                    // set token price on protocol
                    await protocolContractLRS.setTokenPrice(tokenPrice);

                    // get lrt balance
                    const balanceLRT =
                        await liquidRSTokenContract.balanceOf(strategyContractAddress);

                    // calculate expected valuation
                    expectedValuation = (balanceLRT * tokenPrice) / AMOUNT_1E18;

                    txResult = await strategyContract.connect(deployer).updateDeployedAssetVaule(2);
                });
                after(async () => {
                    await baseSnapshot.restore();
                });

                it("THEN it should update valuation of liquid restaking token", async () => {
                    expect(expectedValuation).equals(await strategyContract.deployedAssetsValue());
                });

                it("THEN getDeployedAssetsValue() should return correct amount", async () => {
                    expect(expectedValuation).equals(
                        await strategyContract.getDeployedAssetsValue(),
                    );
                });

                it("THEN it should emit an Event", async () => {
                    await expect(txResult)
                        .to.emit(strategyContract, "DeployedAssetsValueUpdated")
                        .withArgs(
                            liquidRSTokenContractAddress,
                            expectedValuation,
                            strategyContractAddress,
                        );
                });
            });
            describe("WHEN executing with right context (price from deposit adapter)", function () {
                let expectedValuation: bigint;

                before(async () => {
                    // send some liquid token to strategy
                    await liquidRSTokenContract
                        .connect(deployer)
                        .mint(strategyContractAddress, AMOUNT_1E18 * 5n);

                    const tokenPrice = 500000000000000000n;
                    // set token price on protocol
                    await protocolContractLRS.setTokenPrice(tokenPrice);

                    // get lrt balance
                    const balanceLRT =
                        await liquidRSTokenContract.balanceOf(strategyContractAddress);

                    // calculate expected valuation
                    expectedValuation = (balanceLRT * tokenPrice) / AMOUNT_1E18;

                    txResult = await strategyContract.connect(deployer).updateDeployedAssetVaule(1);
                });
                after(async () => {
                    await baseSnapshot.restore();
                });

                it("THEN it should update valuation of liquid restaking token", async () => {
                    expect(expectedValuation).equals(await strategyContract.deployedAssetsValue());
                });

                it("THEN getDeployedAssetsValue() should return correct amount", async () => {
                    expect(expectedValuation).equals(
                        await strategyContract.getDeployedAssetsValue(),
                    );
                });

                it("THEN it should emit an Event", async () => {
                    await expect(txResult)
                        .to.emit(strategyContract, "DeployedAssetsValueUpdated")
                        .withArgs(
                            liquidRSTokenContractAddress,
                            expectedValuation,
                            strategyContractAddress,
                        );
                });
            });
        });

        describe("WHEN trying to pause the contract", function () {
            describe("WHEN executing with wrong context", function () {
                after(async () => {
                    await baseSnapshot.restore();
                });
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract.connect(nonAuthorized).pause(),
                        ).to.be.revertedWithCustomError(
                            strategyContract,
                            "AccessControlUnauthorizedAccount",
                        );
                    });
                });
                describe("WHEN it is already paused", function () {
                    it("THEN it should fail", async () => {
                        await strategyContract.pause();

                        await expect(strategyContract.pause()).to.be.revertedWithCustomError(
                            strategyContract,
                            "EnforcedPause",
                        );
                    });
                });
            });
            describe("WHEN executing with right context", function () {
                before(async () => {
                    txResult = await strategyContract.pause();
                });
                after(async () => {
                    await baseSnapshot.restore();
                });

                it("THEN pause state variable should be true", async () => {
                    expect(await strategyContract.paused()).to.be.true;
                });
                it("THEN it should emit an Event", async () => {
                    await expect(txResult)
                        .to.emit(strategyContract, "Paused")
                        .withArgs(deployerAddress);
                });
            });
        });

        describe("WHEN trying to unpause the contract", function () {
            describe("WHEN executing with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        await expect(
                            strategyContract.connect(nonAuthorized).unpause(),
                        ).to.be.revertedWithCustomError(
                            strategyContract,
                            "AccessControlUnauthorizedAccount",
                        );
                    });
                });
                describe("WHEN is not paused", function () {
                    it("THEN it should fail", async () => {
                        await expect(strategyContract.unpause()).to.be.revertedWithCustomError(
                            strategyContract,
                            "ExpectedPause",
                        );
                    });
                });
            });
            describe("WHEN executing with right context", function () {
                before(async () => {
                    await strategyContract.pause();
                    txResult = await strategyContract.unpause();
                });
                after(async () => {
                    await baseSnapshot.restore();
                });
                it("THEN pause state variable should be false", async () => {
                    expect(await strategyContract.paused()).to.be.false;
                });
                it("THEN it should emit an Event", async () => {
                    await expect(txResult)
                        .to.emit(strategyContract, "Unpaused")
                        .withArgs(deployerAddress);
                });
            });
        });

        describe("WHEN trying to run executeDeploymentStrategy", function () {
            describe("WHEN executing deposit with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        const vaultManagerRole = await strategyContract.VAULT_MANAGER_ROLE();

                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract
                                .connect(nonAuthorized)
                                .executeDeploymentStrategy(
                                    user1Address,
                                    user1Address,
                                    user1Address,
                                    1n,
                                ),
                        )
                            .to.be.revertedWithCustomError(
                                strategyContract,
                                "AccessControlUnauthorizedAccount",
                            )
                            .withArgs(nonAuthorizedAddress, vaultManagerRole);
                    });
                });

                describe("WHEN sender is ZERO address", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract.executeDeploymentStrategy(
                                ZERO_ADDRESS,
                                user1Address,
                                user1Address,
                                1n,
                            ),
                        )
                            .to.be.revertedWithCustomError(strategyContract, "ZeroAddress")
                            .withArgs("sender_");
                    });
                });

                describe("WHEN receiver is ZERO address", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract.executeDeploymentStrategy(
                                user1Address,
                                ZERO_ADDRESS,
                                user1Address,
                                1n,
                            ),
                        )
                            .to.be.revertedWithCustomError(strategyContract, "ZeroAddress")
                            .withArgs("receiver_");
                    });
                });

                describe("WHEN asset is ZERO address", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract.executeDeploymentStrategy(
                                user1Address,
                                user1Address,
                                ZERO_ADDRESS,
                                1n,
                            ),
                        )
                            .to.be.revertedWithCustomError(strategyContract, "ZeroAddress")
                            .withArgs("asset_");
                    });
                });

                describe("WHEN assetsAmount is ZERO", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract.executeDeploymentStrategy(
                                user1Address,
                                user1Address,
                                user1Address,
                                0n,
                            ),
                        )
                            .to.be.revertedWithCustomError(strategyContract, "ZeroAmount")
                            .withArgs("assetsAmount_");
                    });
                });

                describe("WHEN contract is paused", function () {
                    before(async () => {
                        await strategyContract.pause();
                    });
                    after(async () => {
                        await baseSnapshot.restore();
                    });

                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract.executeDeploymentStrategy(
                                deployerAddress,
                                strategyContractAddress,
                                underlyingTokenAddress,
                                AMOUNT_1E18,
                            ),
                        ).to.be.revertedWithCustomError(strategyContract, "EnforcedPause");
                    });
                });

                describe("WHEN first deposit on protocol returns 0 liquid tokens", function () {
                    let amount: bigint;

                    before(async () => {
                        amount = AMOUNT_1E18 * 5n;
                        // approve strategy to take tokens
                        await wethTokenContract.approve(adapterLSContractAddress, amount);

                        // set first protocol to return 0 tokens
                        await protocolContractLS.setAmounts(0, 0);
                    });
                    after(async () => {
                        await baseSnapshot.restore();
                    });

                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract.executeDeploymentStrategy(
                                deployerAddress,
                                strategyContractAddress,
                                underlyingTokenAddress,
                                amount,
                            ),
                        )
                            .to.be.revertedWithCustomError(strategyContract, "ErrorStep")
                            .withArgs("1");
                    });
                });

                describe("WHEN second deposit on protocol returns 0 liquid tokens", function () {
                    let amount: bigint;

                    before(async () => {
                        amount = AMOUNT_1E18 * 5n;
                        // approve strategy to take tokens
                        await wethTokenContract.approve(adapterLSContractAddress, amount);

                        // set first protocol to return 4 (received 5)
                        await protocolContractLS.setAmounts(0, AMOUNT_1E18 * 4n);

                        // set first protocol to return 0 tokens
                        await protocolContractLRS.setAmounts(0, 0);
                    });
                    after(async () => {
                        await baseSnapshot.restore();
                    });

                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract.executeDeploymentStrategy(
                                deployerAddress,
                                strategyContractAddress,
                                underlyingTokenAddress,
                                amount,
                            ),
                        )
                            .to.be.revertedWithCustomError(strategyContract, "ErrorStep")
                            .withArgs("2");
                    });
                });

                describe("WHEN second deposit on protocol returns a not expected token", function () {
                    let amount: bigint;

                    before(async () => {
                        amount = AMOUNT_1E18 * 5n;
                        // approve strategy to take tokens
                        await wethTokenContract.approve(adapterLSContractAddress, amount);

                        // set first protocol to 5
                        await protocolContractLS.setAmounts(amount, amount);

                        // set second adapter to return invalid token, good amount
                        await protocolContractLRS.setAmounts(amount, amount);
                        await adapterLRSContract.setReturnWrongAddress(true);
                    });
                    after(async () => {
                        await baseSnapshot.restore();
                    });

                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract.executeDeploymentStrategy(
                                deployerAddress,
                                strategyContractAddress,
                                underlyingTokenAddress,
                                amount,
                            ),
                        )
                            .to.be.revertedWithCustomError(strategyContract, "ErrorStep")
                            .withArgs("2");
                    });
                });
            });

            describe("WHEN executing with right context", function () {
                let amount: bigint;

                before(async () => {
                    amount = AMOUNT_1E18 * 5n;
                    // approve strategy to take tokens
                    await wethTokenContract.approve(adapterLSContractAddress, amount);

                    // set first protocol to return 4 (received 5)
                    await protocolContractLS.setAmounts(0, AMOUNT_1E18 * 4n);
                    // set seconf protocol to return 6 (received 4)
                    await protocolContractLRS.setAmounts(0, AMOUNT_1E18 * 6n);

                    txResult = await strategyContract.executeDeploymentStrategy(
                        deployerAddress,
                        strategyContractAddress,
                        underlyingTokenAddress,
                        amount,
                    );
                });
                after(async () => {
                    await baseSnapshot.restore();
                });

                it("THEN weth should decrease in deployer and increase in protocol", async () => {
                    await expect(txResult).to.changeTokenBalances(
                        wethTokenContract,
                        [deployerAddress, protocolContractLSAddress],
                        [-amount, amount],
                    );
                });

                it("THEN liquid token should decrease in protocol 1", async () => {
                    await expect(txResult).to.changeTokenBalances(
                        liquidTokenContract,
                        [protocolContractLSAddress, protocolContractLRSAddress],
                        [-AMOUNT_1E18 * 4n, AMOUNT_1E18 * 4n],
                    );
                });

                it("THEN Rliquid token should decrease in protocol 2 and increase in strategy", async () => {
                    await expect(txResult).to.changeTokenBalances(
                        liquidRSTokenContract,
                        [strategyContractAddress, protocolContractLRSAddress],
                        [AMOUNT_1E18 * 6n, -AMOUNT_1E18 * 6n],
                    );
                });

                it("THEN it should emit an Event", async () => {
                    await expect(txResult)
                        .to.emit(strategyContract, "DeploymentStrategyExecuted")
                        .withArgs(
                            underlyingTokenAddress,
                            amount,
                            liquidRSTokenContractAddress,
                            AMOUNT_1E18 * 6n,
                        );
                });
            });
        });

        describe("WHEN trying to executeWithdrawStrategy", function () {
            describe("WHEN executing with wrong context", function () {
                describe("WHEN caller is not authorized", function () {
                    it("THEN it should fail", async () => {
                        const vaultManagerRole = await strategyContract.VAULT_MANAGER_ROLE();

                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract
                                .connect(nonAuthorized)
                                .executeWithdrawStrategy(user1Address, user1Address, 1n),
                        )
                            .to.be.revertedWithCustomError(
                                strategyContract,
                                "AccessControlUnauthorizedAccount",
                            )
                            .withArgs(nonAuthorizedAddress, vaultManagerRole);
                    });
                });

                describe("WHEN receiver is ZERO address", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract.executeWithdrawStrategy(
                                ZERO_ADDRESS,
                                user1Address,
                                1n,
                            ),
                        )
                            .to.be.revertedWithCustomError(strategyContract, "ZeroAddress")
                            .withArgs("receiver_");
                    });
                });

                describe("WHEN asset is ZERO address", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract.executeWithdrawStrategy(
                                user1Address,
                                ZERO_ADDRESS,
                                1n,
                            ),
                        )
                            .to.be.revertedWithCustomError(strategyContract, "ZeroAddress")
                            .withArgs("asset_");
                    });
                });

                describe("WHEN assetsAmount is ZERO", function () {
                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract.executeWithdrawStrategy(
                                user1Address,
                                user1Address,
                                0n,
                            ),
                        )
                            .to.be.revertedWithCustomError(strategyContract, "ZeroAmount")
                            .withArgs("assetsAmount_");
                    });
                });

                describe("WHEN contract is paused", function () {
                    before(async () => {
                        await strategyContract.pause();
                    });
                    after(async () => {
                        await baseSnapshot.restore();
                    });

                    it("THEN it should fail", async () => {
                        // put any parameters, it doesn't matter
                        await expect(
                            strategyContract.executeWithdrawStrategy(
                                deployerAddress,
                                deployerAddress,
                                AMOUNT_1E18,
                            ),
                        ).to.be.revertedWithCustomError(strategyContract, "EnforcedPause");
                    });
                });

                describe("WHEN strategy does not have enough lrs tokens", function () {
                    let amountToPut: bigint;
                    let amountToReceive: bigint;

                    before(async () => {
                        // se amount lower to not reach 15weth and fail
                        amountToPut = 8000000000000000000n; // 8 lrs
                        amountToReceive = 15000000000000000000n; // 15 weth

                        // put LRS tokens into strategy
                        // set return values
                        await liquidRSTokenContract.mint(strategyContractAddress, amountToPut); // 8
                        await protocolContractLRS.setTokenPrice(1500000000000000000n); // price is 1.5
                        await protocolContractLRS.setAmounts(amountToReceive, 0); // amount is 15
                    });
                    after(async () => {
                        await baseSnapshot.restore();
                    });

                    it("THEN it should fail", async () => {
                        const amountRequested =
                            (AMOUNT_1E18 * amountToReceive) / 1500000000000000000n;

                        await expect(
                            strategyContract.executeWithdrawStrategy(
                                deployerAddress,
                                underlyingTokenAddress,
                                amountToReceive,
                            ),
                        )
                            .to.be.revertedWithCustomError(
                                strategyContract,
                                "InsufficientFundsToWithdraw",
                            )
                            .withArgs(amountToPut, amountRequested);
                    });

                    /*
                        toBeWrapped <= IERC20(liquidTokenAddress).balanceOf(address(this)),
                                        "Not enough tokens to wrap"
                                                */

                    /*

                    /*
                        set withdraw to fail on protocol
                        */
                });

                describe("WHEN protocol returns 0 assets", function () {
                    let amountToPut: bigint;
                    let amountToReceive: bigint;

                    before(async () => {
                        amountToPut = 10000000000000000000n; // 10 lrs
                        amountToReceive = 15000000000000000000n; // 15 weth

                        // put LRS tokens into strategy
                        // set return values
                        await liquidRSTokenContract.mint(strategyContractAddress, amountToPut); // 10
                        await protocolContractLRS.setTokenPrice(1500000000000000000n); // price is 1.5
                        await protocolContractLRS.setAmounts(0, 0); // amount is 0
                    });
                    after(async () => {
                        await baseSnapshot.restore();
                    });

                    it("THEN it should fail", async () => {
                        await expect(
                            strategyContract.executeWithdrawStrategy(
                                deployerAddress,
                                underlyingTokenAddress,
                                amountToReceive,
                            ),
                        ).to.be.revertedWithCustomError(
                            strategyContract,
                            "ExecuteWithdrawWStrategyError",
                        );
                    });
                });

                describe("WHEN amount to be wrapped is not enough on strategy", function () {
                    let amountToPut: bigint;
                    let amountToReceive: bigint;

                    before(async () => {
                        amountToPut = 10000000000000000000n; // 10 lrs
                        // put a large amount to make it fail before wrapping
                        amountToReceive = 50000000000000000000n; // 50 weth

                        // set wrapper
                        await strategyContract.setWrappedLiquidTokenAddress(
                            genericWrapperMockContractAddress,
                        );

                        // put LRS tokens into strategy
                        // set return values
                        await liquidRSTokenContract.mint(strategyContractAddress, amountToPut); // 10
                        await protocolContractLRS.setTokenPrice(1500000000000000000n); // price is 1.5
                        await protocolContractLRS.setAmounts(0, 0); // amount is 0
                    });
                    after(async () => {
                        await baseSnapshot.restore();
                    });

                    it("THEN it should fail", async () => {
                        await expect(
                            strategyContract.executeWithdrawStrategy(
                                deployerAddress,
                                underlyingTokenAddress,
                                amountToReceive,
                            ),
                        ).to.be.revertedWith("Not enough tokens to wrap");
                    });
                });
            });

            describe("WHEN executing with right context", function () {
                let amountToPut: bigint;
                let amountToReceive: bigint;

                describe("WHEN executing with right context (NO WRAPPER)", function () {
                    before(async () => {
                        amountToPut = 10000000000000000000n; // 10 lrs
                        amountToReceive = 15000000000000000000n; // 15 weth

                        // put LRS tokens into strategy
                        // set return values
                        await liquidRSTokenContract.mint(strategyContractAddress, amountToPut); // 10
                        await protocolContractLRS.setTokenPrice(1500000000000000000n); // price is 1.5
                        await protocolContractLRS.setAmounts(amountToReceive, 0); // amount is 15

                        txResult = await strategyContract.executeWithdrawStrategy(
                            deployerAddress,
                            underlyingTokenAddress,
                            amountToReceive,
                        );
                    });
                    after(async () => {
                        await baseSnapshot.restore();
                    });

                    it("THEN it should emit an Event", async () => {
                        await expect(txResult)
                            .to.emit(strategyContract, "WithdrawStrategyExecuted")
                            .withArgs(deployerAddress, underlyingTokenAddress, amountToReceive);
                    });
                    it("THEN Rliquid token should decrease in strategy and increase in protocol", async () => {
                        await expect(txResult).to.changeTokenBalances(
                            liquidRSTokenContract,
                            [strategyContractAddress, protocolContractLRSAddress],
                            [-amountToPut, amountToPut],
                        );
                    });
                    it("THEN weth balance should increase in deployer and decrease in protocol", async () => {
                        await expect(txResult).to.changeTokenBalances(
                            wethTokenContract,
                            [deployerAddress, protocolContractLRSAddress],
                            [amountToReceive, -amountToReceive],
                        );
                    });
                });

                describe("WHEN executing with right context (WITH WRAPPER)", function () {
                    let leftover: bigint;
                    before(async () => {
                        // set amounts
                        leftover = ethers.parseEther("2");
                        amountToPut = 10000000000000000000n; // 10 lrs
                        amountToReceive = 15000000000000000000n; // 15 weth

                        // set slippage
                        await adapterLRSContract.setSlippage(200000000000000000n); // 20%

                        // set wrapper
                        await strategyContract.setWrappedLiquidTokenAddress(
                            genericWrapperMockContractAddress,
                        );
                        // set return amount of wrapper
                        // await genericWrapperMockContract.setAmountToReturn(amountToPut + leftover);

                        // mint tokens to wrapper
                        await liquidRSTokenContract.mint(
                            genericWrapperMockContractAddress,
                            amountToPut + leftover,
                        );

                        // set strategy address on protocol for the leftover
                        await protocolContractLRS.setStrategyAddress(strategyContractAddress);

                        // put LRS tokens into strategy
                        await liquidRSTokenContract.mint(
                            strategyContractAddress,
                            amountToPut + leftover,
                        ); // 12

                        // set return values
                        await protocolContractLRS.setTokenPrice(1500000000000000000n); // price is 1.5
                        await protocolContractLRS.setAmounts(amountToReceive, 0); // amount is 15
                        // set leftover so wrapped tokens go back
                        await protocolContractLRS.setLeftover(ethers.parseEther("2"));

                        txResult = await strategyContract.executeWithdrawStrategy(
                            deployerAddress,
                            underlyingTokenAddress,
                            amountToReceive,
                        );
                    });
                    after(async () => {
                        await baseSnapshot.restore();
                    });

                    it("THEN it should emit an Event", async () => {
                        await expect(txResult)
                            .to.emit(strategyContract, "WithdrawStrategyExecuted")
                            .withArgs(deployerAddress, underlyingTokenAddress, amountToReceive);
                    });
                    it("THEN Rliquid token should decrease in strategy", async () => {
                        await expect(txResult).to.changeTokenBalances(
                            liquidRSTokenContract,
                            [strategyContractAddress],
                            [-amountToPut],
                        );
                    });
                    it("THEN wrapped Rliquid token should increase in protocol", async () => {
                        await expect(txResult).to.changeTokenBalances(
                            genericWrapperMockContract,
                            [protocolContractLRSAddress],
                            [amountToPut],
                        );
                    });
                    it("THEN weth balance should increase in deployer and decrease in protocol", async () => {
                        await expect(txResult).to.changeTokenBalances(
                            wethTokenContract,
                            [deployerAddress, protocolContractLRSAddress],
                            [amountToReceive, -amountToReceive],
                        );
                    });
                });
            });
        });

        describe("WHEN trying to upgrade Strategy", function () {
            let strategyV2Contract: StrSimpleReStakingV2;
            before(async () => {
                // change fee to test storage
                await strategyContract.connect(deployer).setStrategyName("Strategy V1");

                // upgrade the contract
                const StrategyV2Factory = await ethers.getContractFactory("StrSimpleReStakingV2");
                strategyV2Contract = (await upgrades.upgradeProxy(
                    strategyContractAddress,
                    StrategyV2Factory,
                )) as unknown as StrSimpleReStakingV2;
                await strategyV2Contract.waitForDeployment();
            });

            it("THEN Strategy previous values should remain intact", async () => {
                expect(await strategyV2Contract.strategyName()).to.equal("Strategy V1");
            });

            it("THEN new function and storage should exists in upgraded contract", async () => {
                await strategyV2Contract.addedMethodStrategyV2(1000000n);

                expect(await strategyV2Contract.addedVariableStrategyV2()).to.equal(1000000n);
            });
        });
    });
});

// Extend Chai to include the custom assertion
// tolerance is expressed in WEI
chai.Assertion.addMethod("closeToBigInt", function (expected, tolerance) {
    const actual = this._obj;
    this.assert(
        actual >= expected - tolerance && actual <= expected + tolerance,
        "expected #{this} to be close to #{exp} +/- #{tol}",
        "expected #{this} not to be close to #{exp} +/- #{tol}",
        expected,
        actual,
    );
});
