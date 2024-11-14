// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "./../tokens/ERC20Mock.sol";

contract KelpMock {
    uint256 private rsETHAmountToMint;

    uint256 public minAmountToDeposit;

    uint256 public assetCurrentLimit;

    ERC20Mock public rsETH;

    constructor(ERC20Mock rsETH_) {
        rsETH = rsETH_;
    }

    function depositAsset(address, uint256, uint256, string calldata) external {
        rsETH.mint(msg.sender, rsETHAmountToMint);
    }

    function setRsETHAmountToMint() external {}

    function getRsETHAmountToMint(
        address,
        uint256
    ) external view returns (uint256 rsethAmountToMint) {
        return rsETHAmountToMint;
    }

    function setrsETHAmountToMint(uint256 toMint) external {
        rsETHAmountToMint = toMint;
    }

    function setminAmountToDeposit(uint256 min) external {
        minAmountToDeposit = min;
    }

    function setAssetCurrentLimit(uint256 limit) external {
        assetCurrentLimit = limit;
    }

    function getAssetCurrentLimit(address) external view returns (uint256) {
        return assetCurrentLimit;
    }
}
