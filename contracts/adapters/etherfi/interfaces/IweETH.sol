// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IweETH {
    function wrap(uint256 _eETHAmount) external returns (uint256);
    function unwrap(uint256 _weETHAmount) external returns (uint256);
}
