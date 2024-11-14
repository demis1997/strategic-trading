// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface ILidoProtocol {
    /// @notice check of lido staking is paused
    function isStakingPaused() external view returns (bool);

    /// @notice deposit ETH and get stETH
    function submit(address _referral) external payable returns (uint256);

    /// @notice get shares price in ETH
    function getPooledEthByShares(uint256 _sharesAmount) external view returns (uint256);
}
