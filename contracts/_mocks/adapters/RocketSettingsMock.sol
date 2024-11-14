// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RocketSettingsMock {
    bool private depositEnabled;
    uint256 private minimumDeposit;
    uint256 private maximumDepositPoolSize;
    uint256 private depositFee;

    function getDepositEnabled() external view returns (bool) {
        return depositEnabled;
    }

    function getMinimumDeposit() external view returns (uint256) {
        return minimumDeposit;
    }

    function getMaximumDepositPoolSize() external view returns (uint256) {
        return maximumDepositPoolSize;
    }

    function getDepositFee() external view returns (uint256) {
        return depositFee;
    }

    // Functions to set the values for testing purposes
    function setDepositEnabled(bool _depositEnabled) external {
        depositEnabled = _depositEnabled;
    }

    function setMinimumDeposit(uint256 _minimumDeposit) external {
        minimumDeposit = _minimumDeposit;
    }

    function setMaximumDepositPoolSize(uint256 _maximumDepositPoolSize) external {
        maximumDepositPoolSize = _maximumDepositPoolSize;
    }

    function setDepositFee(uint256 _depositFee) external {
        depositFee = _depositFee;
    }
}
