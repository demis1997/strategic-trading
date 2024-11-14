// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

interface IWETH {
    /// @notice swap eth for weth
    function deposit() external payable;

    /// @notice swap weth for eth
    function withdraw(uint amount) external;
}
