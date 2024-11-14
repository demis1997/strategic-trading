// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import {IBaseAdapter} from "./IBaseAdapter.sol";

interface IAdapter is IBaseAdapter {
    /// @notice function to deposit assets on protocol
    function deposit(address, address, address, uint256, bool) external returns (address, uint256);

    /// @notice function to withdraw from protocol (or swap)
    function withdraw(
        address caller_,
        address receiver_,
        address asset_,
        uint256 assetsAmount_,
        address liquidTokenAddress_,
        uint256 liquidTokenQty_,
        bytes memory path_
    ) external returns (address, uint256);

    /// @notice claim earnings if any
    function claimEarnings(address, address) external returns (address, uint256);

    /// @notice get the protocol address
    function getProtocol() external view returns (address);
    /// @TODO remove this one is not being used

    /// @notice get a token price
    function getTokenPrice(address) external view returns (uint256);

    /// @notice Emitted when deposit is made
    event DepositedOnProtocol(
        address indexed sender,
        address indexed token,
        uint256 tokenAmount,
        address indexed liquidTkn,
        uint256 liquidTknAmount
    );

    /// @notice Emitted when withdraw is made
    event WithdrawFromProtocol(
        address indexed caller_,
        address indexed receiver_,
        address indexed liquidTokenAddress_,
        uint256 amountSpent,
        address asset_,
        uint256 assetsAmount_
    );

    /// @dev Reverts if the received amount of stETH is less than the minimum expected due to slippage
    error SlippageExceededOnDeposit(uint256 required, uint256 actual);

    /// @dev Reverts if the received amount of ETH/WETH is less than the minimum expected due to slippage
    error SlippageExceededOnWithdrawal(uint256 required, uint256 actual);
}
