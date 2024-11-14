// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IEtherFiLiquifier {
    /// @notice deposit stETH and get eETH
    function depositWithERC20(
        address _token,
        uint256 _amount,
        address _referral
    ) external returns (uint256);
}
