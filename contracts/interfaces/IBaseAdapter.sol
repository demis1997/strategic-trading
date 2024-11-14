// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

interface IBaseAdapter {
    /// @notice Emitted when contract addresses are updated
    event AddressUpdated(string indexed which, address newAddress);

    /// @notice Emitted when slippage is updated
    event SlippageUpdated(uint256 newSlippage);

    /// @notice Error thrown when a zero address is provided where it is not allowed
    /// @param target Description of the context in which the zero address was provided
    error ZeroAddress(string target);

    /// @notice Error thrown when a zero amount is provided where it is not allowed
    /// @param target Description of the context in which the zero amount was provided
    error ZeroAmount(string target);

    /// @notice Reverts when token is not expected
    error OnlyWETHAllowed();

    /// @notice Get the slippage from contract
    function getSlippage() external view returns (uint256);
}
