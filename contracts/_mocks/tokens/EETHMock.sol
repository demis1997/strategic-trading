// SPDX-License-Identifier: MIT

pragma solidity >=0.8.19;

import "./ERC20Mock.sol";

contract EETHMock is ERC20Mock {
    constructor() ERC20Mock("eETH", "eETH", 18) {
        //
    }
}
