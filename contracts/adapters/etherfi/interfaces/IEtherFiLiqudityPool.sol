// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IEtherFiLiqudityPool {
    function requestWithdraw(address recipient, uint256 amount) external returns (uint256);
}