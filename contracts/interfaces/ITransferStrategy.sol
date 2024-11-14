// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

interface ITransferStrategy  {
    function executePartialTransferStrategy(address from_, address to_, uint256 assetAmount) external view returns(address[] memory vaults, uint256[] memory shares);
}