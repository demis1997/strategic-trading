// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { AccessControlUpgradeable } from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import { IExternalProtocol } from "../../interfaces/IExternalProtocol.sol";
import { IAdapter } from "./../../interfaces/IAdapter.sol";

// import {console} from "hardhat/console.sol";

contract AdapterMock is AccessControlUpgradeable, IAdapter {
    using SafeERC20 for IERC20;

    /// @notice The current slippage
    uint256 public slippage;

    bytes32 public constant VAULT_STRATEGY_ROLE = keccak256("VAULT_STRATEGY_ROLE");
    address public protocolAddress;
    bool public returnWrongAddress;

    function initialize(address protocolAddress_) external initializer {
        // init access control
        __AccessControl_init();

        // grant admin role to defined admin
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());

        protocolAddress = protocolAddress_;
        // set default slippage
        slippage = 0;
    }

    receive() external payable {}

    function setSlippage(uint256 slippage_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        slippage = slippage_;
    }

    function setProtocolAddress(address protocolAddress_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        protocolAddress = protocolAddress_;
    }

    function setReturnWrongAddress(bool value_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        returnWrongAddress = value_;
    }

    function deposit(
        address sender_, // vault on first protocol // strategy on second
        address receiver_, // strategy
        address token_,
        uint256 tokenAmount_,
        bool
    ) external onlyRole(VAULT_STRATEGY_ROLE) returns (address, uint256) {
        // get the assets from the vault
        // IERC20(token_).safeTransferFrom(sender_, address(this), tokenAmount_);
        IERC20(token_).transferFrom(sender_, address(this), tokenAmount_);

        // approve for protocol to get the tokens
        IERC20(token_).approve(protocolAddress, tokenAmount_);

        // call to protocol to deposit
        (bool success, address liquidToken, uint256 liquidTokenAmount) = IExternalProtocol(
            protocolAddress
        ).depositOnProtocol(address(this), receiver_, token_, tokenAmount_);

        if (!success) revert("TransferToProtocolFailed");

        // return liquid assets address and amount to strategy
        // or return a wrong address for testing
        return (returnWrongAddress ? address(this) : liquidToken, liquidTokenAmount);
    }

    function withdraw(
        address caller_, // strategy
        address receiver_, // vault
        address,
        uint256,
        address liquidAsset_,
        uint256 liquidAssetsAmount_,
        bytes memory
    ) external onlyRole(VAULT_STRATEGY_ROLE) returns (address, uint256) {
        // get the liquid assets from the strategy
        IERC20(liquidAsset_).transferFrom(caller_, address(this), liquidAssetsAmount_);

        // approve for protocol to get liquidAsset
        IERC20(liquidAsset_).approve(protocolAddress, liquidAssetsAmount_);

        // call to protocol to retrieve assets and get the assets
        (bool success, address asset, uint256 assetsAmount) = IExternalProtocol(protocolAddress)
            .withdrawAssets(address(this), receiver_, liquidAsset_, liquidAssetsAmount_);

        if (!success) revert();

        // return asset address and amount to strategy
        return (asset, assetsAmount);
    }

    function claimEarnings(
        address account_,
        address receiver_
    ) external onlyRole(VAULT_STRATEGY_ROLE) returns (address, uint256) {
        // @TODO check parameters

        // call to protocol to get earnings in liquid assets
        (bool success, address liquidToken, uint256 liquidTokenAmount) = IExternalProtocol(
            protocolAddress
        ).claim(account_, receiver_);

        if (!success) revert(); // IErrors.ClaimEarningsFailed({caller: account_, receiver: receiver_});

        // // send earnigns to the receiver if the protocol only sends to adapter
        // SafeERC20.safeTransfer(IERC20(liquidToken), receiver_, liquidTokenAmount);

        // return liquid assets address and amount
        return (liquidToken, liquidTokenAmount);
    }

    function getAmountInForexactOutput(bytes memory, uint256) external virtual returns (uint256) {
        revert();
    }

    function getTokenPrice(address token_) external view returns (uint256) {
        return IExternalProtocol(protocolAddress).getTokenPrice(token_);
    }

    function getProtocol() external view returns (address) {
        return protocolAddress;
    }

    function getSlippage() external view returns (uint256) {
        return slippage;
    }
}
