// SPDX-License-Identifier: MIT

pragma solidity >=0.8.19;

import "./../tokens/ERC20Mock.sol";

contract RETHMock is ERC20Mock {
    uint256 private totalCollateral;
    uint256 private exchangeRate;

    constructor() ERC20Mock("RETH", "RETH", 18) {
        //
    }

    // Burn rETH for ETH
    function burn(uint256 _rethAmount) external {
        burnFrom(msg.sender, _rethAmount);

        payable(msg.sender).transfer(_rethAmount * exchangeRate);
    }

    // Calculate the amount of ETH backing an amount of rETH
    function getEthValue(uint256 _rethAmount) external view returns (uint256) {
        return _rethAmount * exchangeRate;
    }

    // Get the total amount of collateral available
    // Includes rETH contract balance & excess deposit pool balance
    function getTotalCollateral() external view returns (uint256) {
        return totalCollateral;
    }

    // Calculate the amount of rETH backed by an amount of ETH
    function getRethValue(uint256 _ethAmount) external view returns (uint256) {
        return _ethAmount / exchangeRate;
    }

    // Get the current ETH : rETH exchange rate
    // Returns the amount of ETH backing 1 rETH
    function getExchangeRate() external view returns (uint256) {
        return exchangeRate;
    }

    // Functions to set the total collateral and exchange rate for testing purposes
    function setTotalCollateral(uint256 _totalCollateral) external {
        totalCollateral = _totalCollateral;
    }

    function setExchangeRate(uint256 _exchangeRate) external {
        exchangeRate = _exchangeRate;
    }
}
