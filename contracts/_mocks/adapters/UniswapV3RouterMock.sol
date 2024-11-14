// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

contract UniswapV3RouterMock {
    struct ExactOutputParams {
        bytes path;
        address recipient;
        uint256 amountOut;
        uint256 amountInMaximum;
    }

    uint256 public output;

    function setExactOutput(uint256 amount) external {
        output = amount;
    }

    function exactOutput(ExactOutputParams calldata) external payable returns (uint256) {
        return output;
    }
}
