// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IRocketDAOProtocolSettingsDeposit{
    /// @notice Returns true if deposits are currently enabled
    function getDepositEnabled() external view returns (bool);

    /// @notice Returns the minimum deposit size
    function getMinimumDeposit() external view returns (uint256);

    /// @notice Returns the maximum size of the deposit pool
    function getMaximumDepositPoolSize() external view returns (uint256);

    /// @notice Returns the current fee paid on user deposits
    function getDepositFee() external view returns (uint256);
}