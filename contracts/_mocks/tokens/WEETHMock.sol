// SPDX-License-Identifier: MIT

pragma solidity >=0.8.19;

import "./../tokens/ERC20Mock.sol";

contract WEETHMock is ERC20Mock {
    ERC20Mock public eETH;

    uint256 public tokensPerStEth = 1;

    constructor(ERC20Mock eETH_) ERC20Mock("weETH", "weETH", 18) {
        eETH = eETH_;
    }

    /// @notice wrap stETH to wstETH
    function wrap(uint256 amount) external returns (uint256) {
        uint256 amountToSend = amount * tokensPerStEth;

        eETH.transferFrom(msg.sender, address(this), amount);
        mint(msg.sender, amountToSend);

        return amountToSend;
    }

    /// @notice Returns the amount of stETH tokens corresponding to one wstETH
    function stEthPerToken() external view returns (uint256) {
        return tokensPerStEth;
    }

    function setTokenPerShare(uint256 perShare) external {
        tokensPerStEth = perShare;
    }
}
