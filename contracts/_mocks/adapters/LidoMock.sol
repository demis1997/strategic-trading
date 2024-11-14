// SPDX-License-Identifier: MIT

pragma solidity >=0.8.19;

import "./../tokens/ERC20Mock.sol";

contract LidoMock is ERC20Mock {
    bool private paused;

    // 0:    0%: 1 ETH => 1.0 stETH
    // 1e17: 1%: 1 ETH => 0.9 stETH
    uint256 private slippage;

    constructor() ERC20Mock("stETH", "stETH", 18) {
        //
    }

    function setPaused(bool pause) external {
        paused = pause;
    }

    /// @notice check of lido staking is paused
    function isStakingPaused() external view returns (bool) {
        return paused;
    }

    function setSlippage(uint256 slippage_) external {
        slippage = slippage_;
    }

    /// @notice deposit ETH and get stETH
    function submit(address) external payable returns (uint256) {
        uint256 amountToSend = (msg.value * (1e18 - slippage)) / 1e18;
        mint(msg.sender, amountToSend);
        return amountToSend;
    }

    /// @notice get shares price in ETH
    function getPooledEthByShares(uint256 _sharesAmount) external view returns (uint256) {
        // TODO: !
        return ((_sharesAmount * 1e18) / (1e18 - slippage));
    }
}
