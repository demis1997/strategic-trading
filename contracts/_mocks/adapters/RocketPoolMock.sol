// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "./../tokens/RETHMock.sol";

contract RocketPoolMock {
    uint256 public balance;
    RETHMock public rETH;

    constructor(RETHMock rETH_) {
        rETH = rETH_;
    }

    /// @notice Deposits ETH into Rocket Pool and mints the corresponding amount of rETH to the caller
    function deposit() external payable {
        uint256 rETHValue = rETH.getRethValue(msg.value);
        rETH.mint(msg.sender, rETHValue);
    }

    /// @notice Returns the current deposit pool balance
    function getBalance() external view returns (uint256) {
        return balance;
    }

    function setBalance(uint256 bal) external {
        balance = bal;
    }
}
