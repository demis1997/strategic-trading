// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { IAdapter } from "./../../interfaces/IAdapter.sol";

// import { console } from "hardhat/console.sol";

contract TestnetAdapterMock is AccessControl, IAdapter {
    /// @notice The current slippage
    uint256 public slippage;
    string public adapterName;

    address public tokenInDeposit;
    address public tokenOutDeposit;
    address public tokenInWithdraw;
    address public tokenOutWithdraw;

    int8 public percentageModifierDeposit;
    int8 public percentageModifierWithdraw;

    address public protocolAddress;
    string public protocolName;

    bytes32 public constant VAULT_STRATEGY_ROLE = keccak256("VAULT_STRATEGY_ROLE");

    constructor(
        string memory adapterName_,
        address tokenInDep_,
        address tokenOutDep_,
        address tokenInWit_,
        address tokenOutWit_
    ) {
        // grant admin role to defined admin
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());

        // set adapter name
        adapterName = adapterName_;
        protocolName = adapterName_;
        protocolAddress = address(this);

        // set tokens
        tokenInDeposit = tokenInDep_;
        tokenOutDeposit = tokenOutDep_;
        tokenInWithdraw = tokenInWit_;
        tokenOutWithdraw = tokenOutWit_;

        // set default slippage
        // slippage = 4e16; // 4%;
        slippage = 0; // 0%;

        // set default increase percentage
        percentageModifierDeposit = 0;
        percentageModifierWithdraw = 0;
    }

    receive() external payable {}

    function setSlippage(uint256 slippage_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        slippage = slippage_;
    }

    function setPercentageDeposit(int8 percentage_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(percentage_ >= -100 && percentage_ <= 100, "Invalid percentage");
        percentageModifierDeposit = percentage_;
    }

    function setPercentageWithdraw(int8 percentage_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(percentage_ >= -100 && percentage_ <= 100, "Invalid percentage");
        percentageModifierWithdraw = percentage_;
    }

    function setProtocolData(
        string memory protocolName_,
        address protocolAddress_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        protocolName = protocolName_;
        protocolAddress = protocolAddress_;
    }

    function deposit(
        address sender_, // vault on first protocol // strategy on second
        address receiver_, // strategy
        address,
        uint256 tokenAmount_,
        bool
    ) external onlyRole(VAULT_STRATEGY_ROLE) returns (address, uint256) {
        // get the tokens from the sender
        IERC20(tokenInDeposit).transferFrom(sender_, address(this), tokenAmount_);

        // Calculate the increased amount
        int256 adjustment = (int256(tokenAmount_) * percentageModifierDeposit) / 100;
        int256 adjustedAmount = int256(tokenAmount_) + adjustment;
        // check result
        require(adjustedAmount >= 0, "adjustedAmount cannot be negative");

        // send the liquidTokens to the receiver
        IERC20(tokenOutDeposit).transfer(receiver_, uint256(adjustedAmount));

        // return liquid assets address and amount to receiver
        return (tokenOutDeposit, uint256(adjustedAmount));
    }

    function withdraw(
        address sender_, // strategy
        address receiver_, // vault
        address,
        uint256 amountToReturn_,
        address,
        uint256 amountSent_,
        bytes memory
    ) external onlyRole(VAULT_STRATEGY_ROLE) returns (address, uint256) {
        // get the liquid assets from the strategy
        IERC20(tokenInWithdraw).transferFrom(sender_, address(this), amountSent_);

        // Calculate the increased amount
        int256 adjustment = (int256(amountToReturn_) * percentageModifierWithdraw) / 100;
        int256 adjustedAmount = int256(amountToReturn_) + adjustment;
        // check result
        require(adjustedAmount >= 0, "adjustedAmount cannot be negative");

        // send the tokens to the receiver
        IERC20(tokenOutWithdraw).transfer(receiver_, uint256(adjustedAmount));

        // return asset address and amount to strategy
        return (tokenOutWithdraw, uint256(adjustedAmount));
    }

    function claimEarnings(
        address,
        address
    ) external override onlyRole(VAULT_STRATEGY_ROLE) returns (address, uint256) {
        revert();
    }

    function getAmountInForexactOutput(bytes memory, uint256) external virtual returns (uint256) {
        revert();
    }

    function getTokenPrice(address) external view returns (uint256) {
        revert();
    }

    function getProtocol() external view returns (address) {
        return protocolAddress;
    }

    function getSlippage() external view returns (uint256) {
        return slippage;
    }
}
