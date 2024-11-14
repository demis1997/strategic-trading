// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import {IBaseStrategy} from "./IBaseStrategy.sol";

/// @title Interface for Vault Strategy
/// @notice Provides the definitions for a vault strategy including its operations, events, and errors
interface IDeployStrategy is IBaseStrategy {
    //
    // =========================================================================================
    // Deploy Strategy Errors
    // =========================================================================================

    /// @notice Error for incorrect step execution based on index
    error ErrorStep(uint256 index);

    /// @notice Error when wrapping goes wrong
    error StrategyWrapError(address tokenWrapperAddress, uint256 amountInMaximum, bool wrap);

    /// @notice Error thrown when there are insufficient funds to proceed with a withdrawal
    error InsufficientFundsToWithdraw(uint256 balance, uint256 needed);

    //
    // =========================================================================================
    // Deploy Strategy Events
    // =========================================================================================

    /// @notice Emitted when deployment strategy is executed and assets are managed
    event DeploymentStrategyExecuted(
        address indexed assets,
        uint256 assetsAmount,
        address indexed liquidToken,
        uint256 liquidTokenAmount
    );

    /// @notice Emitted when the value of deployed assets is updated
    event DeployedAssetsValueUpdated(
        address liquidTokenAddress,
        uint256 deployedAssetsValueETH,
        address strategyContract
    );

    //
    // =========================================================================================
    // Deploy Strategy Functions
    // =========================================================================================

    /// @notice Executes the deployment strategy for assets
    function executeDeploymentStrategy(
        address sender,
        address receiver,
        address asset,
        uint256 assetsAmount
    ) external returns (address, uint256);

    /// @notice Executes asset withdrawal from the deposit strategy
    function executeWithdrawStrategy(
        address receiver,
        address asset,
        uint256 assetsAmount
    ) external returns (address, uint256);

    /// @notice Updates the valuation of deployed assets based on current prices
    function updateDeployedAssetVaule(uint256 source_) external returns (uint256);

    /// @notice Retrieves the address of the adapter used for asset deployment
    function getFirstDepositAdapter() external returns (address);

    /// @notice Retrieves the current value of assets deployed by the strategy
    function getDeployedAssetsValue() external view returns (uint256);

    /// @notice this is disabled at this point
    function executeHarvest() external returns (address, uint256);
}
