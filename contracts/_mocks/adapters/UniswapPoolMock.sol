// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

contract UniswapPoolMock {
    // token0
    address public token0;

    // slot0
    uint160 public sqrtPriceX96;

    function setToken0(address token0_) external {
        token0 = token0_;
    }

    function setSlot0(uint160 sqrtPriceX96_) external {
        sqrtPriceX96 = sqrtPriceX96_;
    }

    /// @notice function used to get the price for a token from a pool
    function slot0() external view returns (uint160, int24, uint16, uint16, uint16, uint8, bool) {
        return (sqrtPriceX96, 0, 0, 0, 0, 0, false);
    }
}
