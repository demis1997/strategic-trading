// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

/// @title Interface for Base Strategy
/// @notice This interface defines the events and errors for a base strategy that can be used by various DeFi protocols
interface IBaseStrategy {
    //
    // =========================================================================================
    // Base Strategy Events
    // =========================================================================================

    /// @notice Emitted when the vault address is set or updated
    /// @param vaultAddress The new vault address
    event VaultAddressSet(address indexed vaultAddress);

    /// @notice Emitted when the withdrawal strategy address is set or updated
    /// @param strategyAddress The new withdrawal strategy address
    event WithdrawStrategyAddressSet(address indexed strategyAddress);

    /// @notice Emitted when the strategy name is set or updated
    /// @param name The new name of the strategy
    event StrategyNameSet(string name);

    /// @notice Emitted when priceFeed is created or updated
    /// @param priceFeed The new price feed address
    event PriceFeedSet(address token, address priceFeed);

    /// @notice Emitted when the deployment path for adapters is set
    /// @param newDeployPath The array of new adapter addresses for asset deployment
    event AdaptersDeployPathSet(address[] newDeployPath);

    /// @notice Emitted when the withdrawal path for adapters is set
    /// @param newWithdrawPath The array of new adapter addresses for asset withdrawal
    event AdaptersWithdrawPathSet(address[] newWithdrawPath);

    /// @notice Emitted when a liquid token is set or updated
    event LiquidTokenSet(address indexed);

    /// @notice Emitted when a token wrapper is set or updated
    event TokenWrapperSet(address indexed);

    /// @notice Emitted when withdraw strategy was executed successfully
    event WithdrawStrategyExecuted(address receiver, address asset, uint256 assetsAmount);

    //
    // =========================================================================================
    // Base Strategy Errors
    // =========================================================================================

    /// @notice Error for zero address inputs where an address is required
    /// @param target The name of the parameter that received the zero address
    error ZeroAddress(string target);

    /// @notice Error for empty string inputs where a non-empty string is required
    /// @param target The name of the parameter that received the empty string
    error EmptyString(string target);

    /// @notice Error for zero value inputs where a non-zero value is required
    /// @param target The name of the parameter that received the zero amount
    error ZeroAmount(string target);

    /// @notice Error when an array of adapters does not match expected configuration path lengths
    /// @param target The context or label for the invalid adapter path (e.g., "deploy" or "withdraw")
    error InvalidAdaptersPath(string target);

    /// @notice Error when assetAmount coming back from withdraw is ZERO
    error ExecuteWithdrawWStrategyError();

    // =========================================================================================
    // Base Strategy Functions
    // =========================================================================================
}
