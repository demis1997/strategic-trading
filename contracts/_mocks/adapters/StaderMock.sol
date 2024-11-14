// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract StaderMock {
    bool public paused;

    uint256 public minDeposit;

    uint256 public maxDeposit = type(uint256).max;

    uint256 private dep;

    function deposit(address) external payable returns (uint256) {
        return dep;
    }

    function pause(bool pause_) external {
        paused = pause_;
    }

    // returns the amount of share corresponding to `_assets` assets
    function previewDeposit(uint256) external view returns (uint256) {
        return dep;
    }

    function setMinDeposit(uint256 min) external {
        minDeposit = min;
    }

    function setMaxDeposit(uint256 max) external {
        maxDeposit = max;
    }

    function setDeposit(uint256 prev) external {
        dep = prev;
    }
}
