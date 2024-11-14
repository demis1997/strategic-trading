// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import {IBaseStrategy} from "./IBaseStrategy.sol";

/// @title Interface for Vault Strategy
/// @notice Provides the definitions for a vault strategy including its operations, events, and errors
interface IWithdrawStrategy is IBaseStrategy {
    //
    // =========================================================================================
    // Withdraw Strategy Events
    // =========================================================================================


    //
    // =========================================================================================
    // Withdraw Strategy Errors
    // =========================================================================================


    // =========================================================================================
    // Vault Strategy Functions
    // =========================================================================================

    /// @notice Executes asset withdrawal from the withdraw strategy
    function executeWithdrawStrategy(
        address receiver,
        address asset,
        uint256 assetsAmount
    ) external returns (address, uint256);
}
