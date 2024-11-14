// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";

import {IAggregatorToken} from "./interfaces/IAggregatorToken.sol";
import {IERC20Errors} from "@openzeppelin/contracts/interfaces/draft-IERC6093.sol";

/// @title BaseAggregatorToken
abstract contract BaseAggregatorToken is
    IAggregatorToken,
    AccessControlUpgradeable,
    ReentrancyGuardUpgradeable,
    PausableUpgradeable,
    IERC20Errors
{
    bytes32 public constant TRANSFERS_MANAGER_ROLE = keccak256("TRANSFERS_MANAGER_ROLE");
    bytes32 public constant FEE_MANAGER_ROLE = keccak256("FEE_MANAGER_ROLE");
    bytes32 public constant VAULTS_MANAGER_ROLE = keccak256("VAULTS_MANAGER_ROLE");
    bytes32 public constant VALUATIONS_MANAGER_ROLE = keccak256("VALUATIONS_MANAGER_ROLE");
    bytes32 public constant LYSADMIN_MANAGER_ROLE = keccak256("LYSADMIN_MANAGER_ROLE");

    // vaults aggregator storage
    address public underlyingAsset;
    address public vaultsRegistry;
    address public transferStrategy;
    address public aggregatorFeeModel;
    uint256 public maxVaultsPerHolder;
    uint256 public underlyingValue;

    // says how many shares from each vault are currently being hold by this contract
    // invariant: sum off all vaultsshare should be equal to total supply, always
    // why is this value here? because we can plug underlyingVaults whose shares are out of this aggregator
    // this is not needed if we asume that  undelying cvaults are only used aggregator
    mapping (address => uint256) public vaultsShares;

    /// @notice Allows the contract to receive Ether.
    receive() external payable {}

    /**
     * @dev Sets the maximum number of vaults that a single holder can have. Can only be called by accounts with the PORTFOLIO_MANAGER_ROLE.
     * @param maxVaultsPerHolder_ The new maximum number of vaults per holder.
     */
    function setMaxVaultsPerHolder(uint maxVaultsPerHolder_) external onlyRole(LYSADMIN_MANAGER_ROLE) {
        maxVaultsPerHolder = maxVaultsPerHolder_;
        emit MaxVaultsPerHolderSet(maxVaultsPerHolder_);
    }

    /**
     * @dev Sets the transfer strategy contract address. Can only be called by accounts with the TRANSFERS_MANAGER_ROLE.
     * @param transferStrategy_ The address of the new transfer strategy contract.
     */
    function setTransferStrategy(address transferStrategy_) external onlyRole(LYSADMIN_MANAGER_ROLE) {
        transferStrategy = transferStrategy_;
        emit TransferStrategySet(transferStrategy_);
    }

    /**
     * @dev Sets the aggregator fee model contract address. Can only be called by accounts with the FEE_MANAGER_ROLE.
     * @param aggregatorFeeModel_ The address of the new aggregator fee model contract.
     */
    function setAggregatorFeeModel(address aggregatorFeeModel_) external onlyRole(FEE_MANAGER_ROLE) {
        aggregatorFeeModel = aggregatorFeeModel_;
        emit AggregatorFeeModelSet(aggregatorFeeModel_);
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

    /**
     * @dev Validates that the lengths of the vaults and values arrays match.
     * @param vaults_ The array of vault addresses.
     * @param values_ The array of values.
     */
    function _validateArgumentsLength(address[] calldata vaults_, uint256[] calldata values_) internal pure {
        if (vaults_.length != values_.length) {
            revert DifferentArgumentsLenght();
        }
    }
}