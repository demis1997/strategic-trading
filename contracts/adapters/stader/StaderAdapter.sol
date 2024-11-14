// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {BaseAdapter} from "./../BaseAdapter.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {IWETH} from "./../../interfaces/IWETH.sol";

import {IStaderStakePoolsManager} from "./interfaces/IStaderStakePoolsManager.sol";
import {IAdapter} from "./../../interfaces/IAdapter.sol";

/**
 * @title Stader Staking Adapter for WETH
 * @notice This contract manages the staking of WETH by unwrapping to ETH and staking it in Stader Protocol, and provides functionality to withdraw by swapping on uniswap.
 * @dev Integrates Stader Protocol for staking and Uniswap V3 for withdrawing.
 */
contract StaderAdapter is BaseAdapter, IAdapter {
    using SafeERC20 for IERC20;

    /// @notice Address of the Stader Stake Manager contract
    address public protocolAddress;

    /// @notice Address of the ETHx contract
    address public ethxAddress;

    /// @notice Indicates that staking has been paused on the Stader protocol
    error StakingPaused();

    /// @notice Indicates that deposit amount is less than min deposit on the Stader protocol
    error MinDeposit();

    /// @notice Indicates that deposit amount is more than max deposit on the Stader protocol
    error MaxDeposit();

    /// @notice Initializes the adapter with the necessary addresses and roles
    /// @param protocolAddress_ The address of the Stader Stake Manager contract
    /// @param wethAddress_ The address of the WETH contract
    /// @param ethxAddress_ The address of the ETHx contract
    function initialize(
        address protocolAddress_,
        address wethAddress_,
        address ethxAddress_
    ) public initializer {
        _checkZeroAddress(protocolAddress_, "protocolAddress_");
        _checkZeroAddress(wethAddress_, "wethAddress_");
        _checkZeroAddress(ethxAddress_, "ethxAddress_");

        __AccessControl_init();
        __ReentrancyGuard_init();
        __Pausable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());

        protocolAddress = protocolAddress_;
        wethAddress = wethAddress_;
        ethxAddress = ethxAddress_;

        // set default slippage
        slippage = 4e16; // 4%;

        //Set protocol name
        protocolName = "Stader";
    }

    /// @notice Receives ETH sent to the contract
    receive() external payable {}

    /// @notice Takes WETH from Vault, converts it to ETH, and stakes it to receive ETHx
    /// @param sender_ The address sending WETH to be staked
    /// @param receiver_ The address receiving ETHx
    /// @param token_ The address of the token WETH
    /// @param tokenAmount_ The amount of WETH to stake
    /// @return liquidTkn The address of ETHx token received
    /// @return liquidTknAmount The amount of ETHx received
    function deposit(
        address sender_, // vault
        address receiver_, // strategy
        address token_, // weth
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

        // check weth address is being specified
        if (token_ != wethAddress) revert OnlyWETHAllowed();

        // get weth from vault, should already have approval
        IERC20(wethAddress).safeTransferFrom(sender_, address(this), tokenAmount_);

        // convert WETH to ETH
        IWETH(wethAddress).withdraw(tokenAmount_);

        // check if staking is possible
        if (IStaderStakePoolsManager(protocolAddress).paused()) revert StakingPaused();

        // Check of amount doesnt exceeds min or max deposit on Stader Protocol
        if (tokenAmount_ < IStaderStakePoolsManager(protocolAddress).minDeposit())
            revert MinDeposit();
        if (tokenAmount_ > IStaderStakePoolsManager(protocolAddress).maxDeposit())
            revert MaxDeposit();

        // Adjust the calculation for slippage.
        uint256 minEthXAmount = (tokenAmount_ * (1e18 - slippage)) / 1e18;

        // send funds to Stader and check if slippage is ok
        uint256 EthXAmount = IStaderStakePoolsManager(protocolAddress).deposit{value: tokenAmount_}(
            address(this)
        );

        if (EthXAmount < minEthXAmount) revert SlippageExceededOnDeposit(minEthXAmount, EthXAmount);

        liquidTknAmount = EthXAmount;
        liquidTkn = ethxAddress;

        // transfer ETHx to strategy
        IERC20(liquidTkn).safeTransfer(receiver_, liquidTknAmount);

        // emit when deposit was done
        emit DepositedOnProtocol(sender_, token_, tokenAmount_, liquidTkn, liquidTknAmount);

        // return liquidTokenAddress and amount
        return (liquidTkn, liquidTknAmount);
    }

    /// @notice Updates the address of the Stader Stake Pools Manager contract
    /// @param protocolAddress_ The new address of the Stader Stake Pools Manager
    /// @dev Only callable by the admin role
    function setprotocolAddress(address protocolAddress_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _checkZeroAddress(protocolAddress_, "protocolAddress_");

        emit AddressUpdated("protocolAddress", protocolAddress_);

        protocolAddress = protocolAddress_;
    }

    /// @notice Updates the address of the ETHx contract
    /// @param ethxAddress_ The new address of the ETHx contract
    /// @dev Only callable by the admin role
    function setETHxAddress(address ethxAddress_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _checkZeroAddress(ethxAddress_, "ethxAddress_");

        emit AddressUpdated("ethxAddress_", ethxAddress_);

        ethxAddress = ethxAddress_;
    }

    /// @notice Retrieves the address of the Stader Stake Pools Manager used by this adapter
    /// @return address The address of the Stader Stake Pools Manager
    function getProtocol() external view returns (address) {
        return protocolAddress;
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
