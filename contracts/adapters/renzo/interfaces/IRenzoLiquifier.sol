// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IRenzoLiquifier {
    /// @notice Deposit stETH and get ezETH
    function deposit(
        address _token,
        uint256 _amount
    ) external;
}
