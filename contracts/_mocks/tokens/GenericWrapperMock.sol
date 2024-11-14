// SPDX-License-Identifier: MIT

pragma solidity >=0.8.19;

import "./ERC20Mock.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// import {console} from "hardhat/console.sol";

contract GenericWrapperMock is ERC20Mock {
    address public liquidToken;
    uint256 public amountToReturn;
    bool public expectToFail;

    constructor(
        address liquidToken_,
        string memory name_,
        string memory symbol_,
        uint8 decimals_
    ) ERC20Mock(name_, symbol_, decimals_) {
        liquidToken = liquidToken_;

        // random flag amount
        amountToReturn = 987654321;
    }

    function setAmountToReturn(uint256 amountToReturn_) external {
        amountToReturn = amountToReturn_;
    }

    function setExpectToFail(bool value_) external {
        expectToFail = value_;
    }

    /// @notice wrap liquidToken to wLiquidToken
    function wrap(uint256 amount_) external returns (uint256) {
        if (expectToFail) revert("wrap reverted");

        // this is to manage the returned amount
        uint256 returnAmount = amountToReturn != 987654321 ? amountToReturn : amount_;
        if (returnAmount == 0) return 0;

        IERC20(liquidToken).transferFrom(_msgSender(), address(this), amount_);
        mint(_msgSender(), returnAmount);

        return returnAmount;
    }

    /// @notice unwrap wLiquidToken to liquidToken
    function unwrap(uint256 amount_) external returns (uint256) {
        if (expectToFail) revert("unwrap reverted");

        // this is to manage the returned amount
        uint256 returnAmount = amountToReturn != 987654321 ? amountToReturn : amount_;
        if (returnAmount == 0) return 0;

        require(
            returnAmount <= IERC20(liquidToken).balanceOf(address(this)),
            "Not enough liquidToken to return"
        );

        IERC20(address(this)).transferFrom(_msgSender(), address(this), returnAmount);
        IERC20(liquidToken).transfer(_msgSender(), amount_);

        return returnAmount;
    }
}
