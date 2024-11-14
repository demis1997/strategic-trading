// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import {IBaseAdapter} from "../interfaces/IBaseAdapter.sol";

abstract contract BaseAdapter is
    AccessControlUpgradeable,
    ReentrancyGuardUpgradeable,
    PausableUpgradeable,
    IBaseAdapter
{
    /// @notice VAULT STRATEGY ROLE to manage configuration and execution
    bytes32 public constant VAULT_STRATEGY_ROLE = keccak256("VAULT_STRATEGY_ROLE");

    // override vault functions message
    string public constant REVERT_MSG = "Function not allowed";

    /// @notice Address of the WETH contract
    address public wethAddress;

    /// @notice The current slippage
    uint256 public slippage;

    /// @notice The Name of the adapter
    string public protocolName;

    /*
        slippageAllowanceMax = 3e17; // 30%
        slippageAllowanceMin = 1e15; // 0.1%
        slippage = 4e16; // 4%;
    */

    /// @notice Updates the WETH contract address
    /// @param wethAddress_ The new WETH contract address
    function setWETHAddress(address wethAddress_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _checkZeroAddress(wethAddress_, "wethAddress_");

        emit AddressUpdated("wethAddress", wethAddress_);

        wethAddress = wethAddress_;
    }

    /// @notice Sets new slippage allowance value for scaling operations
    /// @param slippage_ Slippage value represented in wei (1e17 means 10% slippage allowance)
    function setSlippage(uint256 slippage_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _checkZeroAmount(slippage_, "slippage_");

        emit SlippageUpdated(slippage_);

        slippage = slippage_;
    }

    /// @notice Pauses the contract operations
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    /// @notice Unpauses the contract operations
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    /// @notice Internal function to check for zero addresses
    /// @param variable_ Address to check
    /// @param target_ Context or label for the address being checked
    function _checkZeroAddress(address variable_, string memory target_) internal pure {
        if (variable_ == address(0)) revert ZeroAddress({target: target_});
    }

    /// @notice Internal function to check for zero amounts
    /// @param variable_ Amount to check
    /// @param target_ Context or label for the amount being checked
    function _checkZeroAmount(uint256 variable_, string memory target_) internal pure {
        if (variable_ == 0) revert ZeroAmount({target: target_});
    }

    /// @notice Retrieves the currently configured slippage value
    /// @return The current slippage value
    function getSlippage() external view returns (uint256) {
        return slippage;
    }
}
