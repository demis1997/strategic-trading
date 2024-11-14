"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const hardhat_network_helpers_1 = require("@nomicfoundation/hardhat-network-helpers");
const chai_1 = require("chai");
const _deployContracts_1 = require("../../scripts/_deployContracts");
const constants_1 = require("../_helpers/constants");
const utils_1 = require("./../_helpers/utils");
let snapshot;
let deployer;
let nonAuthorized;
let other1;
let other2;
let owner;
let deployerAddress;
let nonAuthorizedAddress;
let otherAddress1;
let otherAddress2;
let ownerAddress;
let txResult;
let defaultAdminRole;
let AggregatorTokenFactory;
let aggregatorTokenContract;
let aggregatorTokenContractAddress;
let transferStrategyContract;
let transferStrategyContractAddress;
let vaultsRegistryContract;
let vaultsRegistryContractAddress;
let underlyingAssetContract;
let underlyingAssetContractAddress;
let vaultContracts = [];
let vaultAddresses = [];
const name = "WHYETH";
const symbol = "whyETH";
async function mintAndApproveUnderlyingAsset(amount) {
    await underlyingAssetContract.mint(deployerAddress, amount);
    await underlyingAssetContract.approve(aggregatorTokenContractAddress, amount);
}
async function deposit(receiver, vaults, values, totalAmount) {
    return await aggregatorTokenContract.deposit(receiver, vaults, values, totalAmount);
}
async function withdraw(vaults, values, maxSlippage) {
    return await aggregatorTokenContract.withdraw(vaults, values, maxSlippage);
}
describe("Aggregator Token Tests", function () {
    this.timeout(constants_1.TEST_TIMEOUT);
    before(async () => {
        [deployer, nonAuthorized, other1, other2, owner] = await hardhat_1.ethers.getSigners();
        [deployerAddress, nonAuthorizedAddress, otherAddress1, otherAddress2, ownerAddress] = await Promise.all([
            deployer.getAddress(),
            nonAuthorized.getAddress(),
            other1.getAddress(),
            other2.getAddress(),
            owner.getAddress(),
        ]);
        underlyingAssetContract = (await (0, _deployContracts_1.deployERC20)("WETH", "WETH", 18));
        underlyingAssetContractAddress = await underlyingAssetContract.getAddress();
        const vaultNames = ["Vault 1", "Vault 2", "Vault 3", "Vault 4", "Vault 5"];
        for (const vaultName of vaultNames) {
            const vaultContract = (await (0, _deployContracts_1.deployVaultMock)(underlyingAssetContractAddress, vaultName, vaultName));
            const vaultAddress = await vaultContract.getAddress();
            vaultContracts.push(vaultContract);
            vaultAddresses.push(vaultAddress);
        }
        vaultsRegistryContract = (await (0, _deployContracts_1.deployVaultsRegistryMock)());
        vaultsRegistryContractAddress = await vaultsRegistryContract.getAddress();
        for (const vaultAddress of vaultAddresses) {
            await vaultsRegistryContract.setVaultStatus(vaultAddress, true);
        }
        AggregatorTokenFactory = await hardhat_1.ethers.getContractFactory("AggregatorToken");
    });
    describe("WHEN trying to deploy Aggregator token contract with incorrect parameters", function () {
        it("THEN it should FAIL when underlyingAsset_ is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(AggregatorTokenFactory, [
                constants_1.ZERO_ADDRESS,
                vaultsRegistryContractAddress,
                deployerAddress,
                name,
                symbol
            ]))
                .to.be.revertedWithCustomError(AggregatorTokenFactory, "ZeroAddress")
                .withArgs("underlyingAsset_");
        });
        it("THEN it should FAIL when vaultsRegistry_ is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(AggregatorTokenFactory, [
                underlyingAssetContractAddress,
                constants_1.ZERO_ADDRESS,
                deployerAddress,
                name,
                symbol
            ]))
                .to.be.revertedWithCustomError(AggregatorTokenFactory, "ZeroAddress")
                .withArgs("vaultsRegistry_");
        });
        it("THEN it should FAIL when ownerAddress_ is ZERO address", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(AggregatorTokenFactory, [
                underlyingAssetContractAddress,
                vaultsRegistryContractAddress,
                constants_1.ZERO_ADDRESS,
                name,
                symbol
            ]))
                .to.be.revertedWithCustomError(AggregatorTokenFactory, "ZeroAddress")
                .withArgs("ownerAddress_");
        });
        it("THEN it should FAIL when name_ is empty string", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(AggregatorTokenFactory, [
                underlyingAssetContractAddress,
                vaultsRegistryContractAddress,
                deployerAddress,
                "",
                symbol
            ]))
                .to.be.revertedWithCustomError(AggregatorTokenFactory, "EmptyString")
                .withArgs("name_");
        });
        it("THEN it should FAIL when symbol_ is empty string", async () => {
            await (0, chai_1.expect)(hardhat_1.upgrades.deployProxy(AggregatorTokenFactory, [
                underlyingAssetContractAddress,
                vaultsRegistryContractAddress,
                deployerAddress,
                name,
                ""
            ]))
                .to.be.revertedWithCustomError(AggregatorTokenFactory, "EmptyString")
                .withArgs("symbol_");
        });
    });
    describe("WHEN deploying Aggregator Token contract with correct parameters", function () {
        before(async () => {
            aggregatorTokenContract = (await (0, _deployContracts_1.deployAggregatorToken)("AggregatorToken", underlyingAssetContractAddress, vaultsRegistryContractAddress, deployerAddress, name, symbol));
            aggregatorTokenContractAddress = await aggregatorTokenContract.getAddress();
            transferStrategyContract = (await (0, _deployContracts_1.deployTransferStrategy)(aggregatorTokenContractAddress, deployerAddress));
            transferStrategyContractAddress = await transferStrategyContract.getAddress();
            await aggregatorTokenContract.setMaxVaultsPerHolder(5);
            await aggregatorTokenContract.setTransferStrategy(transferStrategyContractAddress);
            snapshot = await (0, hardhat_network_helpers_1.takeSnapshot)();
        });
        this.afterEach(async () => {
            await snapshot.restore();
        });
        it("THEN contract storage variables should be set correctly", async () => {
            (0, chai_1.expect)(await aggregatorTokenContract.getUnderlyingAsset()).equals(underlyingAssetContractAddress);
            (0, chai_1.expect)(await aggregatorTokenContract.vaultsRegistry()).equals(vaultsRegistryContractAddress);
            (0, chai_1.expect)(await aggregatorTokenContract.maxVaultsPerHolder()).equals(5n);
            (0, chai_1.expect)(await aggregatorTokenContract.name()).equals(name);
            (0, chai_1.expect)(await aggregatorTokenContract.symbol()).equals(symbol);
            (0, chai_1.expect)(await aggregatorTokenContract.totalSupply()).equals(0n);
            (0, chai_1.expect)(await aggregatorTokenContract.decimals()).equals(18n);
        });
        describe("WHEN trying to execute deposit", () => {
            describe("WHEN calling with invalid parameters", () => {
                const totalAmount = 50n;
                describe("WHEN receiver is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(deposit(constants_1.ZERO_ADDRESS, vaultAddresses, [10n, 10n, 10n, 10n, 10n], totalAmount))
                            .to.be.revertedWithCustomError(aggregatorTokenContract, "ZeroAddress")
                            .withArgs("receiver_");
                    });
                });
                describe("WHEN one of the vaults is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await mintAndApproveUnderlyingAsset(totalAmount);
                        await (0, chai_1.expect)(deposit(deployerAddress, [constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS], [10n, 10n, 10n, 10n, 10n], totalAmount))
                            .to.be.revertedWithCustomError(aggregatorTokenContract, "ZeroAddress")
                            .withArgs("vault");
                    });
                });
                describe("WHEN one of the values is ZERO ", () => {
                    it("THEN it should FAIL", async () => {
                        await mintAndApproveUnderlyingAsset(totalAmount);
                        await (0, chai_1.expect)(deposit(deployerAddress, vaultAddresses, [10n, 0n, 10n, 10n, 10n], totalAmount))
                            .to.be.revertedWithCustomError(aggregatorTokenContract, "ZeroAmount")
                            .withArgs("value");
                    });
                });
                describe("WHEN vaults and values doesn't match", () => {
                    it("THEN it should FAIL", async () => {
                        await mintAndApproveUnderlyingAsset(totalAmount);
                        await (0, chai_1.expect)(deposit(deployerAddress, vaultAddresses, [10n, 0n, 10n, 10n], totalAmount))
                            .to.be.revertedWithCustomError(aggregatorTokenContract, "DifferentArgumentsLenght");
                    });
                });
                describe("WHEN accumulation of values and totalAmount doesn't match", () => {
                    it("THEN it should FAIL", async () => {
                        await mintAndApproveUnderlyingAsset(totalAmount);
                        await (0, chai_1.expect)(deposit(deployerAddress, vaultAddresses, [10n, 5n, 10n, 10n, 10n], totalAmount))
                            .to.be.revertedWithCustomError(aggregatorTokenContract, "WrongDepositValues");
                    });
                });
                describe("WHEN one of the vaults is not registered", () => {
                    it("THEN it should FAIL", async () => {
                        await mintAndApproveUnderlyingAsset(totalAmount);
                        await (0, chai_1.expect)(deposit(deployerAddress, [deployerAddress], [10n], totalAmount))
                            .to.be.revertedWithCustomError(aggregatorTokenContract, "UnsupportedVault");
                    });
                });
                describe("WHEN exceeds max vaults per user", () => {
                    before(async () => {
                        await aggregatorTokenContract.setMaxVaultsPerHolder(4);
                    });
                    it("THEN it should FAIL", async () => {
                        await mintAndApproveUnderlyingAsset(totalAmount);
                        await (0, chai_1.expect)(deposit(deployerAddress, vaultAddresses, [10n, 10n, 10n, 10n, 10n], totalAmount))
                            .to.be.revertedWithCustomError(aggregatorTokenContract, "MaxVaultsPerUser");
                    });
                });
                describe("WHEN calling with valid parameters", () => {
                    const totalAmount = hardhat_1.ethers.parseEther("10");
                    const values = Array(5).fill(totalAmount / 5n);
                    describe("WHEN staking is paused", () => {
                        before(async () => {
                            await aggregatorTokenContract.pause();
                        });
                        it("THEN it should FAIL", async () => {
                            await (0, chai_1.expect)(deposit(deployerAddress, vaultAddresses, values, totalAmount)).to.be.revertedWithCustomError(aggregatorTokenContract, "EnforcedPause");
                        });
                    });
                    describe("WHEN everything is ALRIGHT", () => {
                        let mintedShares;
                        beforeEach(async () => {
                            await mintAndApproveUnderlyingAsset(totalAmount);
                            txResult = await deposit(deployerAddress, vaultAddresses, values, totalAmount);
                        });
                        it("THEN event Deposit should be emitted", async () => {
                            const txReceipt = await txResult.wait();
                            mintedShares = BigInt(await (0, utils_1.getVariableFromEvent)(aggregatorTokenContract, "Deposit", txReceipt, 4));
                            await (0, chai_1.expect)(txResult)
                                .to.emit(aggregatorTokenContract, "Deposit")
                                .withArgs(deployerAddress, deployerAddress, vaultAddresses, values, mintedShares);
                        });
                        it("THEN should increase aggregator token shares for deployer", async () => {
                            (0, chai_1.expect)(await aggregatorTokenContract.balanceOf(deployerAddress)).equals(mintedShares);
                        });
                        it("THEN unerlying asset of deployer balance should be 0", async () => {
                            (0, chai_1.expect)(await underlyingAssetContract.balanceOf(deployerAddress)).equals(0n);
                        });
                        it("THEN should increase total supply", async () => {
                            (0, chai_1.expect)(await aggregatorTokenContract.totalSupply()).equals(mintedShares);
                        });
                        it("THEN should increment vaults shares", async () => {
                            for (let i = 0; i < vaultAddresses.length; i++) {
                                (0, chai_1.expect)(await aggregatorTokenContract.vaultsShares(vaultAddresses[i])).to.equal(values[i]);
                            }
                        });
                        it("THEN should update user vaults correctly", async () => {
                            (0, chai_1.expect)(await aggregatorTokenContract.vaultsOf(deployerAddress)).to.deep.equal(vaultAddresses);
                        });
                        it("THEN should update number of user vaults correctly", async () => {
                            (0, chai_1.expect)(await aggregatorTokenContract.numberOfVaults(deployerAddress)).equal(vaultAddresses.length);
                        });
                        it("THEN should update last shares per vault correctly", async () => {
                            (0, chai_1.expect)(await aggregatorTokenContract.lastSharesPerVault(deployerAddress)).to.deep.equal([vaultAddresses, values]);
                        });
                        it("THEN should update last assets per vault correctly", async () => {
                            (0, chai_1.expect)(await aggregatorTokenContract.lastAssetsPerVault(deployerAddress)).to.deep.equal([vaultAddresses, values]);
                        });
                        it("THEN should update current shares per vault correctly", async () => {
                            (0, chai_1.expect)(await aggregatorTokenContract.currentSharesPerVault(deployerAddress)).to.deep.equal([vaultAddresses, values]);
                        });
                        it("THEN should update current assets per vault correctly", async () => {
                            (0, chai_1.expect)(await aggregatorTokenContract.currentAssetsPerVault(deployerAddress)).to.deep.equal([vaultAddresses, values]);
                        });
                        it("THEN should retrun the correct exchange rate", async () => {
                            (0, chai_1.expect)(await aggregatorTokenContract.exchangeRate()).equal(totalAmount / mintedShares);
                        });
                    });
                });
            });
        });
        describe("WHEN executing withdraw", () => {
            const totalAmount = hardhat_1.ethers.parseEther("10");
            const values = Array(5).fill(totalAmount / 5n);
            beforeEach(async () => {
                await mintAndApproveUnderlyingAsset(totalAmount);
                await deposit(deployerAddress, vaultAddresses, values, totalAmount);
            });
            describe("WHEN executing withdraw with incorrect parameters", () => {
                describe("WHEN one of the vaults is ZERO address", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(withdraw([constants_1.ZERO_ADDRESS], [totalAmount], 0n))
                            .to.be.revertedWithCustomError(aggregatorTokenContract, "ZeroAddress")
                            .withArgs("vault");
                    });
                });
                describe("WHEN one of the values is ZERO", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(withdraw(vaultAddresses, [0n, 0n, 0n, 0n, 0n], 0n))
                            .to.be.revertedWithCustomError(aggregatorTokenContract, "ZeroAmount")
                            .withArgs("value");
                    });
                });
                describe("WHEN vaults doesnt match values", () => {
                    it("THEN it should FAIL", async () => {
                        await (0, chai_1.expect)(withdraw(vaultAddresses, [100n, 100n, 100n, 100n], 0n))
                            .to.be.revertedWithCustomError(aggregatorTokenContract, "DifferentArgumentsLenght");
                    });
                });
            });
            describe("WHEN executing withdraw with correct parameters", () => {
                let withdrawnFunds;
                beforeEach(async () => {
                    txResult = await withdraw(vaultAddresses, values, totalAmount);
                });
                it("THEN event Withdrawal should be emitted", async () => {
                    const txReceipt = await txResult.wait();
                    withdrawnFunds = BigInt(await (0, utils_1.getVariableFromEvent)(aggregatorTokenContract, "Withdrawal", txReceipt, 2));
                    await (0, chai_1.expect)(txResult)
                        .to.emit(aggregatorTokenContract, "Withdrawal")
                        .withArgs(aggregatorTokenContractAddress, deployerAddress, withdrawnFunds);
                });
                it("THEN should transfer withdrawn funds to deployer address", async () => {
                    (0, chai_1.expect)(await underlyingAssetContract.balanceOf(deployerAddress)).equals(withdrawnFunds);
                });
                it("THEN should burn deployer shares", async () => {
                    (0, chai_1.expect)(await aggregatorTokenContract.balanceOf(deployerAddress)).equals(0n);
                });
                it("THEN should decrease total supply", async () => {
                    (0, chai_1.expect)(await aggregatorTokenContract.totalSupply()).equals(0n);
                });
                it("THEN should decrement vaults shares", async () => {
                    for (let i = 0; i < vaultAddresses.length; i++) {
                        (0, chai_1.expect)(await aggregatorTokenContract.vaultsShares(vaultAddresses[i])).to.equal(0n);
                    }
                });
                it("THEN should remove all the vaults from portfolio", async () => {
                    (0, chai_1.expect)(await aggregatorTokenContract.vaultsOf(deployerAddress)).to.deep.equal([]);
                });
                it("THEN should update number of user vaults correctly", async () => {
                    (0, chai_1.expect)(await aggregatorTokenContract.numberOfVaults(deployerAddress)).equal(0n);
                });
                it("THEN should update last shares per vault correctly", async () => {
                    (0, chai_1.expect)(await aggregatorTokenContract.lastSharesPerVault(deployerAddress)).to.deep.equal([[], []]);
                });
                it("THEN should update last assets per vault correctly", async () => {
                    (0, chai_1.expect)(await aggregatorTokenContract.lastAssetsPerVault(deployerAddress)).to.deep.equal([[], []]);
                });
                it("THEN should update current shares per vault correctly", async () => {
                    (0, chai_1.expect)(await aggregatorTokenContract.currentSharesPerVault(deployerAddress)).to.deep.equal([[], []]);
                });
                it("THEN should update current assets per vault correctly", async () => {
                    (0, chai_1.expect)(await aggregatorTokenContract.currentAssetsPerVault(deployerAddress)).to.deep.equal([[], []]);
                });
                it("THEN should retrun the correct exchange rate", async () => {
                    (0, chai_1.expect)(await aggregatorTokenContract.exchangeRate()).equal(0n);
                });
            });
        });
        describe("WHEN executing ERC20 functions", () => {
            describe("WHEN executing approve", () => {
                let SPENDER_ADDRESS;
                const AMOUNT = hardhat_1.ethers.parseEther("10");
                describe("WHEN executing approve with incorrect parameters", () => {
                    describe("WHEN spender is ADDRESS ZERO", () => {
                        before(async () => {
                            SPENDER_ADDRESS = constants_1.ZERO_ADDRESS;
                        });
                        it("THEN it should FAIL", async () => {
                            await (0, chai_1.expect)(aggregatorTokenContract.approve(SPENDER_ADDRESS, AMOUNT))
                                .to.be.revertedWithCustomError(aggregatorTokenContract, "ERC20InvalidSpender");
                        });
                    });
                });
                describe("WHEN executing approve with correct parameters", () => {
                    beforeEach(async () => {
                        SPENDER_ADDRESS = otherAddress1;
                        txResult = await aggregatorTokenContract.approve(SPENDER_ADDRESS, AMOUNT);
                    });
                    it("THEN event Approval should be emitted", async () => {
                        await (0, chai_1.expect)(txResult)
                            .to.emit(aggregatorTokenContract, "Approval")
                            .withArgs(deployerAddress, SPENDER_ADDRESS, AMOUNT);
                    });
                    it("THEN it should increase allowance", async () => {
                        (0, chai_1.expect)(await aggregatorTokenContract.allowance(deployerAddress, SPENDER_ADDRESS)).equals(AMOUNT);
                    });
                });
            });
            describe("WHEN executing transfer", () => {
                let TO_ADDRESS;
                const AMOUNT = hardhat_1.ethers.parseEther("10");
                const values = Array(5).fill(AMOUNT / 5n);
                describe("WHEN executing transfer with incorrect parameters", () => {
                    describe("WHEN TO_ADDRESS is ADDRESS ZERO", () => {
                        before(async () => {
                            TO_ADDRESS = constants_1.ZERO_ADDRESS;
                            await mintAndApproveUnderlyingAsset(AMOUNT);
                            txResult = await deposit(deployerAddress, vaultAddresses, values, AMOUNT);
                        });
                        it("THEN it should FAIL", async () => {
                            await (0, chai_1.expect)(aggregatorTokenContract.transfer(TO_ADDRESS, AMOUNT))
                                .to.be.revertedWithCustomError(aggregatorTokenContract, "ERC20InvalidReceiver");
                        });
                    });
                    describe("WHEN sender has insufficient balance", () => {
                        before(async () => {
                            TO_ADDRESS = otherAddress1;
                        });
                        it("THEN it should FAIL", async () => {
                            await (0, chai_1.expect)(aggregatorTokenContract.transfer(TO_ADDRESS, AMOUNT))
                                .to.be.revertedWithCustomError(aggregatorTokenContract, "ERC20InsufficientBalance");
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
                        await (0, chai_1.expect)(txResult)
                            .to.emit(aggregatorTokenContract, "Transfer")
                            .withArgs(deployerAddress, TO_ADDRESS, AMOUNT);
                    });
                    it("THEN it should update sender and receiver balances", async () => {
                        (0, chai_1.expect)(await aggregatorTokenContract.balanceOf(deployerAddress)).equals(0n);
                        (0, chai_1.expect)(await aggregatorTokenContract.balanceOf(TO_ADDRESS)).equals(AMOUNT);
                    });
                });
            });
            describe("WHEN executing transferFrom", () => {
                let TO_ADDRESS;
                let SPENDER;
                let OWNER;
                const AMOUNT = hardhat_1.ethers.parseEther("10");
                const values = Array(5).fill(AMOUNT / 5n);
                describe("WHEN executing transferFrom with incorrect parameters", () => {
                    describe("WHEN TO_ADDRESS is ADDRESS ZERO", () => {
                        before(async () => {
                            TO_ADDRESS = constants_1.ZERO_ADDRESS;
                            SPENDER = otherAddress1;
                            OWNER = deployerAddress;
                            await mintAndApproveUnderlyingAsset(AMOUNT);
                            await deposit(deployerAddress, vaultAddresses, values, AMOUNT);
                            await aggregatorTokenContract.approve(SPENDER, AMOUNT);
                        });
                        it("THEN it should FAIL", async () => {
                            await (0, chai_1.expect)(aggregatorTokenContract.connect(other1).transferFrom(OWNER, TO_ADDRESS, AMOUNT))
                                .to.be.revertedWithCustomError(aggregatorTokenContract, "ERC20InvalidReceiver");
                        });
                    });
                    describe("WHEN insufficent allowance", () => {
                        before(async () => {
                            TO_ADDRESS = constants_1.ZERO_ADDRESS;
                            SPENDER = otherAddress1;
                            OWNER = deployerAddress;
                            await mintAndApproveUnderlyingAsset(AMOUNT);
                            await deposit(deployerAddress, vaultAddresses, values, AMOUNT);
                        });
                        it("THEN it should FAIL", async () => {
                            await (0, chai_1.expect)(aggregatorTokenContract.connect(other1).transferFrom(OWNER, TO_ADDRESS, AMOUNT))
                                .to.be.revertedWithCustomError(aggregatorTokenContract, "ERC20InsufficientAllowance")
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
                        txResult = await aggregatorTokenContract.connect(other1).transferFrom(OWNER, TO_ADDRESS, AMOUNT);
                    });
                    it("THEN it should emit Transfer event", async () => {
                        await (0, chai_1.expect)(txResult)
                            .to.emit(aggregatorTokenContract, "Transfer")
                            .withArgs(OWNER, TO_ADDRESS, AMOUNT);
                    });
                });
            });
            describe("WHEN updating user portfolio", () => {
                const AMOUNT = hardhat_1.ethers.parseEther("10");
                const values = Array(5).fill(AMOUNT / 5n);
                before(async () => {
                    await mintAndApproveUnderlyingAsset(AMOUNT);
                    await deposit(deployerAddress, vaultAddresses, values, AMOUNT);
                    txResult = await aggregatorTokenContract.updatePortfolioValuation(deployerAddress);
                });
                it("THEN it should emit PortfolioValuationUpdated event", async () => {
                    await (0, chai_1.expect)(txResult)
                        .to.emit(aggregatorTokenContract, "PortfolioValuationUpdated")
                        .withArgs(deployerAddress);
                });
            });
        });
    });
});
//# sourceMappingURL=aggregatorToken.test.js.map