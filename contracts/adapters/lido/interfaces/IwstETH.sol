// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IwstETH {
    /// @notice wrap stETH to wstETH
    function wrap(uint256) external returns (uint256);

    /// @notice Returns the amount of stETH tokens corresponding to one wstETH
    function stEthPerToken() external view returns (uint256);

    /// @notice Returns the number of wstETH tokens corresponding to one stETH
    function tokensPerStEth() external view returns (uint256);
}
