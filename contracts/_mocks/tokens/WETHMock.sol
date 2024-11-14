// SPDX-License-Identifier: MIT

pragma solidity >=0.8.19;

import "./../tokens/ERC20Mock.sol";

contract WETHMock is ERC20Mock {
    constructor() ERC20Mock("WETH", "WETH", 18) {}

    function withdraw(uint256 wad) public {
        burnFrom(msg.sender, wad);
        payable(msg.sender).transfer(wad);
    }

    function deposit() external payable {
        mint(msg.sender, msg.value);
    }
}
