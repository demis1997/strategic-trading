// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IKelpProtocol {
    function depositAsset(
        address asset,
        uint256 depositAmount,
        uint256 minRSETHAmountExpected,
        string calldata referralId
    ) external;

    /// @notice View amount of rsETH to mint for given asset amount
    /// @param asset Asset address
    /// @param amount Asset amount
    /// @return rsethAmountToMint Amount of rseth to mint
    function getRsETHAmountToMint(
        address asset,
        uint256 amount
    ) external view returns (uint256 rsethAmountToMint);


    function minAmountToDeposit() external view returns (uint256);

    /// @notice gets the current limit of asset deposit
    /// @param asset Asset address
    /// @return currentLimit Current limit of asset deposit
    function getAssetCurrentLimit(address asset) external view returns (uint256);
}