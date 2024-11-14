// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IGenericWrapping {
    /// @notice wrap the token (usually to swap it)
    function wrap(uint256 amount_) external returns (uint256);

    /// @notice unwrap the token (usually to recover wrapped tokens leftovers)
    function unwrap(uint256 amount_) external returns (uint256);
}
