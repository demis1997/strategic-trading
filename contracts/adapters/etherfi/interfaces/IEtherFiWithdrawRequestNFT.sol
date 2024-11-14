// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IEtherFiWithdrawRequestNFT {
    function claimWithdraw(uint256 requestId) external;
    function getClaimableAmount(uint256 tokenId) external view returns (uint256);
}
