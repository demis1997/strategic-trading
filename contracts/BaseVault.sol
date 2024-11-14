// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";

import {IVault} from "./interfaces/IVault.sol";

/// @title BaseVault
/// @dev Abstract contract for vaults handling assets with built-in access control, non-reentrancy, and pausable features.
abstract contract BaseVault is
    AccessControlUpgradeable,
    ReentrancyGuardUpgradeable,
    PausableUpgradeable,
    IVault
{
/// @notice Indicates if live valuation is performed during deposits.
bool public liveValuationOnDeposit;

/// @notice Indicates if live valuation is performed during withdrawals.
bool public liveValuationOnWithdraw;

/// @notice Role to identify master token operations.
bytes32 public constant MASTER_TOKEN_ROLE = keccak256("MASTER_TOKEN_ROLE");

/// @notice Role identifier for addresses that can manage vault operations.
bytes32 public constant VAULT_MANAGER_ROLE = keccak256("VAULT_MANAGER_ROLE");

/// @notice Message to revert when an operation is not allowed.
string public constant REVERT_MSG = "Function not allowed";

/// @notice Address of the registry contract that keeps track of all vaults.
address public vaultsRegistryAddress;

/// @notice Address of the master token contract associated with the vault.
address public masterTokenAddress;

/// @notice Address of the strategy contract.
address public vaultStrategyAddress;

/// @notice Address of the strategy used for handling withdrawals.
/// @notice When using immediate withdraw this will match vaultStrategyAddress
address public withdrawStrategyAddress;

/// @notice Indicates from where (deposit/withdraw adapter) to valuate vault when oracle is not present
/// @notice 1 is deposit, 2 is withdraw
uint256 public valuationSource;

/// @notice Total amount of assets pending deposit before harvest.
uint256 public pendingDepositAssets;


    /// @notice Allows the contract to receive Ether.
    receive() external payable {}

    /// @notice Sets the address of the vaults registry.
    /// @param vaultsRegistryAddress_ The new vaults registry address.
    function setVaultsRegistryAddress(
        address vaultsRegistryAddress_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _checkZeroAddress(vaultsRegistryAddress_, "vaultsRegistryAddress_");

        emit VaultsRegistryAddressSet(vaultsRegistryAddress_);

        vaultsRegistryAddress = vaultsRegistryAddress_;
    }

    /// @notice Sets the address of the master token.
    /// @param masterTokenAddress_ The new master token address.
    function setMasterTokenAddress(
        address masterTokenAddress_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _checkZeroAddress(masterTokenAddress_, "masterTokenAddress_");

        emit MasterTokenAddressSet(masterTokenAddress_);

        masterTokenAddress = masterTokenAddress_;
    }

    /// @notice Sets the address of the vault strategy.
    /// @param vaultStrategyAddress_ The new strategy address for asset allocation.
    function setVaultStrategyAddress(
        address vaultStrategyAddress_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _checkZeroAddress(vaultStrategyAddress_, "vaultStrategyAddress_");

        emit VaultStrategyAddressSet(vaultStrategyAddress_);

        vaultStrategyAddress = vaultStrategyAddress_;
    }

    /// @notice Sets the address of the withdrawal strategy.
    /// @param withdrawStrategyAddress_ The new strategy address for handling withdrawals.
    function setWithdrawStrategyAddress(
        address withdrawStrategyAddress_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _checkZeroAddress(withdrawStrategyAddress_, "withdrawStrategyAddress_");

        emit WithdrawStrategyAddressSet(withdrawStrategyAddress_);

        withdrawStrategyAddress = withdrawStrategyAddress_;
    }

    /// @notice Sets whether to perform live valuation during deposit or withdrawal.
    /// @param status_ True for enabling live valuation, false to disable.
    /// @param target_ Target operation, 0 for deposit and 1 for withdrawal.
    function setLiveValuation(bool status_, uint256 target_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (target_ != 0 && target_ != 1) revert InvalidTarget();

        emit LiveValuationSet(status_, target_);

        if (target_ == 0) liveValuationOnDeposit = status_;
        else liveValuationOnWithdraw = status_;
    }

    /// @notice Sets the valuationSource to tell the contract where to get prices where oracle is not defined
    /// @notice valuationSource_ = 1 take price from deposit adapter
    /// @notice valuationSource_ = 2 take price from withdraw adapter
    /// @param valuationSource_ The number indicating the valuation source
    function setValuationSource(uint256 valuationSource_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(valuationSource_ == 1 || valuationSource_ == 2, "Invalid valuationSource_");

        emit ValuationSourceSet(valuationSource_);

        valuationSource = valuationSource_;
    }

    /// @notice Pauses the vault's operations, preventing any state-changing functions.
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    /// @notice Unpauses the vault's operations, allowing state-changing functions.
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    /// @dev Internal function to check for zero addresses and revert if necessary.
    function _checkZeroAddress(address variable_, string memory target_) internal pure {
        if (variable_ == address(0)) revert ZeroAddress({target: target_});
    }

    /// @dev Internal function to check for empty strings and revert if necessary.
    function _checkEmptyString(string memory variable_, string memory target_) internal pure {
        if (bytes(variable_).length == 0) revert EmptyString({target: target_});
    }

    /// @dev Internal function to check for zero amounts and revert if necessary.
    function _checkZeroAmount(uint256 variable_, string memory target_) internal pure {
        if (variable_ == 0) revert ZeroAmount({target: target_});
    }
}
