// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {BaseAdapter} from "./../BaseAdapter.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {IWETH} from "./../../interfaces/IWETH.sol";
import {IwstETH} from "./interfaces/IwstETH.sol";

import {ILidoProtocol} from "./interfaces/ILidoProtocol.sol";
import {IAdapter} from "./../../interfaces/IAdapter.sol";

/**
 * @title Lido Staking Adapter for WETH with Uniswap V3 withdrawals
 * @notice This contract manages the staking of WETH by unwrapping to ETH and staking it in Lido, and provides functionality to withdraw by swapping stETH to ETH or WETH on Uniswap V3.
 * @dev Integrates Lido for staking and Uniswap V3 for liquidity swaps.
 */
contract LidoAdapter is BaseAdapter, IAdapter {
    using SafeERC20 for IERC20;

    /// @notice Address of the Lido contract
    address public protocolAddress;

    /// @notice Address of the wstETH contract
    address public wstETHAddress;

    /// @notice Indicates that staking has been paused on the Lido protocol
    error StakingPaused();

    /// @notice Indicates an error occurred during the wrap operation
    /// @param token The token that failed to wrap
    /// @param amount The amount that failed to wrap
    error WrapError(address token, uint256 amount);

    error InvalidLidoPrice(uint256 inLidoContract, uint256 inWstEthContract);

    /// @notice Initializes the adapter with the necessary addresses and roles
    /// @param protocolAddress_ The address of the Lido contract for stETH interactions
    /// @param wethAddress_ The address of the WETH contract
    /// @param wstETHAddress_ The address of the wstETH contract
    function initialize(
        address protocolAddress_,
        address wethAddress_,
        address wstETHAddress_
    ) public initializer {
        _checkZeroAddress(protocolAddress_, "protocolAddress_");
        _checkZeroAddress(wethAddress_, "wethAddress_");
        _checkZeroAddress(wstETHAddress_, "wstETHAddress_");

        __AccessControl_init();
        __ReentrancyGuard_init();
        __Pausable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());

        protocolAddress = protocolAddress_;
        wethAddress = wethAddress_;
        wstETHAddress = wstETHAddress_;

        // set default slippage
        slippage = 4e16; // 4%;

        // set name of the protocol to use 
        protocolName = "Lido";
    }

    /// @notice Receives ETH sent to the contract
    receive() external payable {}

    /// @notice Takes WETH from Vault, converts it to ETH, and stakes it to receive stETH
    /// @notice Conversion to wstETH is optional
    /// @param sender_ The address sending WETH to be staked
    /// @param receiver_ The address receiving stETH/wstETH
    /// @param token_ The address of the token WETH
    /// @param tokenAmount_ The amount of WETH to stake
    /// @param wrapToken_ If the liquid token on lido should be wrapped to wstETH
    /// @return liquidTkn The address of stETH/wstETH token received
    /// @return liquidTknAmount The amount of stETH/wstETH received

    function deposit(
        address sender_, // vault
        address receiver_, // strategy
        address token_, // weth
        uint256 tokenAmount_,
        bool wrapToken_
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
        if (ILidoProtocol(protocolAddress).isStakingPaused()) revert StakingPaused();

        // Adjust the calculation for slippage
        uint256 minStEthAmount = (tokenAmount_ * (1e18 - slippage)) / 1e18;

        // send funds to lido and check if slippage is ok
        ILidoProtocol(protocolAddress).submit{value: tokenAmount_}(address(0));
        // get balance of received stETH from LIDO
        uint256 stEthAmount = IERC20(protocolAddress).balanceOf(address(this));
        if (stEthAmount < minStEthAmount)
            revert SlippageExceededOnDeposit(minStEthAmount, stEthAmount);

        liquidTknAmount = stEthAmount;
        liquidTkn = protocolAddress;

        // if wrapping is true, wrap stETH to wstETH
        if (wrapToken_) {
            // approve wstETH contract to get the stETH
            IERC20(protocolAddress).approve(wstETHAddress, stEthAmount);

            liquidTknAmount = IwstETH(wstETHAddress).wrap(stEthAmount);
            liquidTkn = wstETHAddress;

            if (liquidTknAmount == 0) revert WrapError(protocolAddress, stEthAmount);
        }

        // transfer wstETH / stETH to strategy
        IERC20(liquidTkn).safeTransfer(receiver_, liquidTknAmount);

        // emit when deposit was done
        emit DepositedOnProtocol(sender_, token_, tokenAmount_, liquidTkn, liquidTknAmount);

        // return liquidTokenAddress and amount
        return (liquidTkn, liquidTknAmount);
    }

    /// @notice Updates the address of the Lido protocol
    /// @param protocolAddress_ The new address of the Lido protocol
    /// @dev Only callable by the admin role
    function setprotocolAddress(address protocolAddress_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _checkZeroAddress(protocolAddress_, "protocolAddress_");

        emit AddressUpdated("protocolAddress", protocolAddress_);

        protocolAddress = protocolAddress_;
    }

    /// @notice Updates the address of the wstETH contract
    /// @param wstETHAddress_ The new address of the wstETH contract
    /// @dev Only callable by the admin role
    function setWstETHAddress(address wstETHAddress_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _checkZeroAddress(wstETHAddress_, "wstETHAddress_");

        emit AddressUpdated("wstETHAddress", wstETHAddress_);

        wstETHAddress = wstETHAddress_;
    }

    /// @notice Retrieves the address of the Lido protocol used by this adapter
    /// @return address The address of the Lido protocol
    function getProtocol() external view returns (address) {
        return protocolAddress;
    }

    /// @notice Function placeholders for potential future implementation
    function claimEarnings(address, address) external virtual returns (address, uint256) {
        revert(REVERT_MSG);
    }

    /// @notice Function placeholders for potential future implementation
    function getTokenPrice(address token_) external view virtual returns (uint256) {

        uint256 price;
        // if token is stETH, return 1 
        if (token_ == protocolAddress) {
            price = 1e18;
        } else if (token_ == wstETHAddress) {
            // if token is wstETH, returns ETH amount equals to 1 share
            price = ILidoProtocol(protocolAddress).getPooledEthByShares(1e18);
        }

        if (price <= 0) revert InvalidLidoPrice({inLidoContract: price, inWstEthContract: 0});

        // // amount of stETH tokens corresponding to one wstETH
        // uint256 oneWstETHInStETH = IwstETH(wstETHAddress).stEthPerToken();

        // if (oneLidoInETH != oneWstETHInStETH)
        //     revert InvalidLidoPrice({
        //         inLidoContract: oneLidoInETH,
        //         inWstEthContract: oneWstETHInStETH
        //     });

        return price;
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
