// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "./../tokens/ERC20Mock.sol";

contract RenzoProtocolMock {
    ERC20Mock public stETH;
    ERC20Mock public ezETH;

    uint256 public tokensPerStEth = 1;

    constructor(ERC20Mock stETH_, ERC20Mock ezETH_) {
        stETH = stETH_;
        ezETH = ezETH_;
    }

    /// @notice deposit stETH and get ezETH
    function deposit(address _token, uint256 _amount) external {
        require(_token == address(stETH), "RenzoProtocolMock: Unsupported token");
        
        // Transfer stETH from sender to the mock contract
        stETH.transferFrom(msg.sender, address(this), _amount);

        // Mint ezETH to the sender as a result of the deposit (1:1 ratio for simplicity)
        ezETH.mint(msg.sender, _amount);
    }
}
