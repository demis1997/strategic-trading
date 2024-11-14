// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {BaseAdapter} from "./../BaseAdapter.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {IKelpProtocol} from "./interfaces/IKelpProtocol.sol";
import {IAdapter} from "./../../interfaces/IAdapter.sol";

/**
 * @title Kelp Staking Adapter for stETH
 * @notice This contract manages the staking of stETH.
 * @dev Integrates Kelp for staking.
 */
contract KelpAdapter is BaseAdapter, IAdapter {
    using SafeERC20 for IERC20;

    /// @notice Address of the Kelp Protocol contract
    address public kelpProtocolAddress;

    /// @notice Address of the rsETH contract
    address public rsETHAddress;

    /// @notice Indicates that deposit amount is less than min deposit on the Kelp protocol
    error MinDeposit();

    /// @notice Indicates that deposit amount is more than the Kelp protocol current capacity
    error ExceedCapacity();

    /// @notice Initializes the adapter with the necessary addresses and roles
    /// @param kelpProtocolAddress_ The address of the Kelp Protocol contract
    /// @param rsETHAddress_ Kelp rsETH address
    function initialize(address kelpProtocolAddress_, address rsETHAddress_) public initializer {
        _checkZeroAddress(kelpProtocolAddress_, "kelpProtocolAddress_");
        _checkZeroAddress(rsETHAddress_, "rsETHAddress_");

        __AccessControl_init();
        __ReentrancyGuard_init();
        __Pausable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());

        kelpProtocolAddress = kelpProtocolAddress_;

        rsETHAddress = rsETHAddress_;

        // set default slippage
        slippage = 4e16; // 4%;

        protocolName = "Kelp";
    }

    /// @notice Receives ETH sent to the contract
    receive() external payable {}

    /// @notice Takes stETH from Vault, and stakes it to receive rsETH
    /// @notice wrapToken_ ыhould always be false since there is no wrapper
    /// @param sender_ The address sending stETH to be staked
    /// @param receiver_ The address receiving rsETH
    /// @param token_ The address of the token stETH
    /// @param tokenAmount_ The amount of stETH to stake
    /// @return liquidTkn The address of rsETH token received
    /// @return liquidTknAmount The amount of rsETH received
    function deposit(
        address sender_, // vault
        address receiver_, // strategy
        address token_, // stETH
        uint256 tokenAmount_,
        bool
    )
        external
        whenNotPaused
        nonReentrant
        onlyRole(VAULT_STRATEGY_ROLE)
        returns (address liquidTkn, uint256 liquidTknAmount)
    {
        _checkZeroAddress(sender_, "sender_");
        _checkZeroAddress(receiver_, "receiver_");
        _checkZeroAddress(token_, "token_");
        _checkZeroAmount(tokenAmount_, "tokenAmount_");

        // get stETH from vault, should already have approval
        IERC20(token_).safeTransferFrom(sender_, address(this), tokenAmount_);
        IERC20(token_).approve(kelpProtocolAddress, tokenAmount_);

        // Adjust the calculation for slippage
        uint256 minRsEthAmount = (tokenAmount_ * (1e18 - slippage)) / 1e18;

        // Check of amount doesnt exceeds min deposit on Kelp Protocol
        if (tokenAmount_ < IKelpProtocol(kelpProtocolAddress).minAmountToDeposit())
            revert MinDeposit();

        // Check if deposit amount doesnt exceeds Kelp capacity
        if (tokenAmount_ > IKelpProtocol(kelpProtocolAddress).getAssetCurrentLimit(token_))
            revert ExceedCapacity();

        // Get the excpected amount of rsETH
        uint256 minRSETHAmountExpected = IKelpProtocol(kelpProtocolAddress).getRsETHAmountToMint(
            token_,
            tokenAmount_
        );

        // send funds to Kelp and check if slippage is ok
        IKelpProtocol(kelpProtocolAddress).depositAsset(
            token_,
            tokenAmount_,
            minRSETHAmountExpected,
            ""
        );
        // get balance of received rsETH from Kelp
        uint256 rsEthAmount = IERC20(rsETHAddress).balanceOf(address(this));
        if (rsEthAmount < minRsEthAmount)
            revert SlippageExceededOnDeposit(minRsEthAmount, rsEthAmount);

        liquidTknAmount = rsEthAmount;
        liquidTkn = rsETHAddress;

        // transfer rsETH to strategy
        IERC20(liquidTkn).safeTransfer(receiver_, liquidTknAmount);

        // emit when deposit was done
        emit DepositedOnProtocol(sender_, token_, tokenAmount_, liquidTkn, liquidTknAmount);

        // return liquidTokenAddress and amount
        return (liquidTkn, liquidTknAmount);
    }

    /// @notice Sets Kelp Protocol address
    function setKelpProtocolAddress(
        address kelpProtocolAddress_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _checkZeroAddress(kelpProtocolAddress_, "kelpProtocolAddress_");

        emit AddressUpdated("kelpProtocolAddress_", kelpProtocolAddress_);

        kelpProtocolAddress = kelpProtocolAddress_;
    }

    /// @notice Retrieves the address of the Kelp protocol used by this adapter
    /// @return address The address of the Kelp protocol
    function getProtocol() external view returns (address) {
        return kelpProtocolAddress;
    }

    /// @notice Function placeholders for potential future implementation
    function claimEarnings(address, address) external virtual returns (address, uint256) {
        revert(REVERT_MSG);
    }

    /// @notice Function placeholders for potential future implementation
    function getTokenPrice(address) external view virtual returns (uint256) {
        revert(REVERT_MSG);
    }

    /// @notice Function placeholders for potential future implementation
    function withdraw(
        address,
        address,
        address,
        uint256,
        address,
        uint256,
        bytes memory
    ) external virtual returns (address, uint256) {
        revert(REVERT_MSG);
    }
}
