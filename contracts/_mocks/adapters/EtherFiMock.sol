// SPDX-License-Identifier: MIT

pragma solidity >=0.8.19;

import "./../tokens/ERC20Mock.sol";

contract EtherFiMock {
    ERC20Mock public stETH;
    ERC20Mock public eETH;

    uint256 public tokensPerStEth = 1;

    constructor(ERC20Mock stETH_, ERC20Mock eETH_) {
        stETH = stETH_;
        eETH = eETH_;
    }

    /// @notice deposit stETH and get eETH
    function depositWithERC20(
        address,
        uint256 _amount,
        address
    ) external returns (uint256) {
        stETH.transferFrom(msg.sender, address(this), _amount);
        eETH.mint(msg.sender, _amount);
        return _amount;
    }
}
