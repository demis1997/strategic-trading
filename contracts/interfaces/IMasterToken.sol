// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

interface IMasterToken {
    /// @notice function to get user sharesBalance
    function getUserSharesBalance(address account) external returns(uint256 userSharesBalance);
}
