// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IStaderStakePoolsManager {
    /**
     * @notice stake ETH and mint ETHx for _receiver based on exchange rate
     * @param _receiver account where ETHx
     * @return shares amount of ETHx token minted and sent to receiver
     */
    function deposit(address _receiver) external payable returns (uint256);

    /**
     * @dev Returns true if the contract is paused, and false otherwise.
     */
    function paused() external view returns (bool);

    // returns the amount of max deposit limit based on vault health
    function minDeposit() external view returns (uint256);

    // returns the amount of max deposit limit based on vault health
    function maxDeposit() external view returns (uint256);


    // returns the amount of share corresponding to `_assets` assets
    function previewDeposit(uint256 _assets) external view returns (uint256);
}
