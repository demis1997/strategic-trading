// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

contract UniswapV3QuoterMock {
    // QuoteExactOuput
    uint256 public amountIn;

    // uint160[] public sqrtPriceX96AfterList;
    // uint32[] public initializedTicksCrossedList;
    // uint256 public gasEstimate;

    // int24 public tick;
    // uint16 public observationIndex;
    // uint16 public observationCardinality;
    // uint16 public observationCardinalityNext;
    // uint8 public feeProtocol;
    // bool public unlocked;

    function setQuoteExactOutput(uint256 amountIn_) public {
        amountIn = amountIn_;
        // sqrtPriceX96AfterList = sqrtPriceX96AfterList_;
        // initializedTicksCrossedList = initializedTicksCrossedList_;
        // gasEstimate = gasEstimate_;
    }

    function quoteExactOutput(
        bytes memory,
        uint256
    )
        external
        view
        returns (
            uint256,
            uint160[] memory sqrtPriceX96AfterList,
            uint32[] memory initializedTicksCrossedList,
            uint256 gasEstimate
        )
    {
        return (amountIn, sqrtPriceX96AfterList, initializedTicksCrossedList, gasEstimate);
    }
}
