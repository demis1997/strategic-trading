// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {BaseAdapter} from "./../BaseAdapter.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {IWETH} from "./../../interfaces/IWETH.sol";
import {IRETH} from "./interfaces/IRETH.sol";

import {IRocketDepositPool} from "./interfaces/IRocketDepositPool.sol";
import {IRocketDAOProtocolSettingsDeposit} from "./interfaces/IRocketDAOProtocolSettingsDeposit.sol";
import {IAdapter} from "./../../interfaces/IAdapter.sol";

/**
 * @title Rocket Staking Adapter for WETH
 * @notice This contract manages the staking of WETH by unwrapping to ETH and staking it in Rocket Pool, and provides functionality to withdraw by burning rETH.
 * @dev Integrates Rocket Pool for staking and withdrawing.
 */
contract RocketAdapter is BaseAdapter, IAdapter {
    using SafeERC20 for IERC20;

    /// @notice Address of the Rocket Deposit Pool contract
    address public protocolAddress;

    /// @notice Address of the Rocket Deposit Pool Settings contract
    address public rocketSettingsAddress;

    /// @notice Address of the rETH contract
    address public rETHAddress;

    /// @notice Indicates that staking has been paused on the Rocket Pool protocol
    error StakingPaused();

    /// @notice Indicates that deposit amount is less than min deposit on the Rocket Pool protocol
    error MinDeposit();

    /// @notice Indicates that the capacity exceeded on the Rocket Pool protocol
    error ExceedCapacity();

    /// @notice Initializes the adapter with the necessary addresses and roles
    /// @param protocolAddress_ The address of the Rocket Deposit Pool contract
    /// @param wethAddress_ The address of the WETH contract
    /// @param rETHAddress_ The address of the rETH contract
    function initialize(
        address protocolAddress_,
        address rocketSettingsAddress_,
        address wethAddress_,
        address rETHAddress_
    ) public initializer {
        _checkZeroAddress(protocolAddress_, "protocolAddress_");
        _checkZeroAddress(rocketSettingsAddress_, "rocketSettingsAddress_");
        _checkZeroAddress(wethAddress_, "wethAddress_");
        _checkZeroAddress(rETHAddress_, "rETHAddress_");

        __AccessControl_init();
        __ReentrancyGuard_init();
        __Pausable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());

        protocolAddress = protocolAddress_;
        rocketSettingsAddress = rocketSettingsAddress_;
        wethAddress = wethAddress_;
        rETHAddress = rETHAddress_;

        // set default slippage
        slippage = 10e16; // 10%;

        //Set protocol name
        protocolName = "Rocket";
    }

    /// @notice Receives ETH sent to the contract
    receive() external payable {}

    /// @notice Takes WETH from Vault, converts it to ETH, and stakes it to receive rETH
    /// @param sender_ The address sending WETH to be staked
    /// @param receiver_ The address receiving rETH
    /// @param token_ The address of the token WETH
    /// @param tokenAmount_ The amount of WETH to stake
    /// @return liquidTkn The address of rETH token received
    /// @return liquidTknAmount The amount of rETH received
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
        if (!IRocketDAOProtocolSettingsDeposit(rocketSettingsAddress).getDepositEnabled())
            revert StakingPaused();

        // check if the deposit amount is not less than the min deposit on Rocket Pool
        if (
            tokenAmount_ <
            IRocketDAOProtocolSettingsDeposit(rocketSettingsAddress).getMinimumDeposit()
        ) revert MinDeposit();

        // check if the deposit amount doesnt exceed current Rocket Pool capacity
        uint256 capacityNeeded = IRocketDepositPool(protocolAddress).getBalance() + tokenAmount_;
        uint256 maxDepositPoolSize = IRocketDAOProtocolSettingsDeposit(rocketSettingsAddress)
            .getMaximumDepositPoolSize();

        if (capacityNeeded > maxDepositPoolSize) revert ExceedCapacity();

        // Adjust the calculation for slippage. ROCKET takes a fee on each deposit
        uint256 minREthAmount = (tokenAmount_ * (1e18 - slippage)) / 1e18;

        // send funds to Rocket and check if slippage is ok
        IRocketDepositPool(protocolAddress).deposit{value: tokenAmount_}();

        // get balance of received rETH from Rocket
        uint256 rEthAmount = IERC20(rETHAddress).balanceOf(address(this));
        if (rEthAmount < minREthAmount) revert SlippageExceededOnDeposit(minREthAmount, rEthAmount);

        liquidTknAmount = rEthAmount;
        liquidTkn = rETHAddress;

        // transfer rETH to strategy
        IERC20(liquidTkn).safeTransfer(receiver_, liquidTknAmount);

        // emit when deposit was done
        emit DepositedOnProtocol(sender_, token_, tokenAmount_, liquidTkn, liquidTknAmount);

        // return liquidTokenAddress and amount
        return (liquidTkn, liquidTknAmount);
    }

    /// @notice Updates the address of the Rocket Deposit Pool
    /// @param protocolAddress_ The new address of the Rocket Deposit Pool
    /// @dev Only callable by the admin role
    function setprotocolAddress(address protocolAddress_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _checkZeroAddress(protocolAddress_, "protocolAddress_");

        emit AddressUpdated("protocolAddress", protocolAddress_);

        protocolAddress = protocolAddress_;
    }

    /// @notice Updates the address of the rETH contract
    /// @param rETHAddress_ The new address of the rETH contract
    /// @dev Only callable by the admin role
    function setRETHAddress(address rETHAddress_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _checkZeroAddress(rETHAddress_, "rETHAddress_");

        emit AddressUpdated("rETHAddress", rETHAddress_);

        rETHAddress = rETHAddress_;
    }

    /// @notice Retrieves the address of the Rocket Deposit Pool used by this adapter
    /// @return address The address of the Rocket Deposit Pool
    function getProtocol() external view returns (address) {
        return protocolAddress;
    }

    /// @notice Function placeholders for potential future implementation
    function claimEarnings(address, address) external virtual returns (address, uint256) {
        revert(REVERT_MSG);
    }

    /// @notice Retrieves the current token price from Rocket Pool
    function getTokenPrice(address) external view virtual returns (uint256) {
        return IRETH(rETHAddress).getExchangeRate();
    }

    /// @notice Withdraws tokens by burning rETH
    /// @param caller_ Strategy address
    /// @param receiver_ Address that will receive the swapped tokens
    /// @param asset_ Token address to be received
    /// @param assetsAmount_ Amount of asset tokens to be received
    /// @param liquidTokenAddress_ Address of the liquid token to be burned
    /// @param amountInMaximum_ Maximum amount of liquid tokens to be burned
    /// @return address asset address and the amount of assets transferred
    /// @return uint256 asset address and the amount of assets transferred
    function withdraw(
        address caller_, // strategy
        address receiver_, // vault
        address asset_, // weth
        uint256 assetsAmount_,
        address liquidTokenAddress_,
        uint256 amountInMaximum_,
        bytes memory
    ) external virtual returns (address, uint256) {
        _checkZeroAddress(caller_, "caller_");
        _checkZeroAddress(receiver_, "receiver_");
        _checkZeroAddress(asset_, "asset_");
        _checkZeroAddress(liquidTokenAddress_, "liquidTokenAddress_");
        _checkZeroAmount(assetsAmount_, "assetsAmount_");
        _checkZeroAmount(amountInMaximum_, "amountInMaximum_");

        uint256 ethValue = IRETH(rETHAddress).getEthValue(amountInMaximum_);
        uint256 totalCollateral = IRETH(rETHAddress).getTotalCollateral();

        if (ethValue > totalCollateral) {
            revert();
        }

        // bring liquid tokens from strategy
        IERC20(liquidTokenAddress_).safeTransferFrom(caller_, address(this), amountInMaximum_);
        // Burn rETH to receive ETH
        IRETH(rETHAddress).burn(amountInMaximum_);

        // convert ETH to WETH
        IWETH(asset_).deposit{value: ethValue}();

        IERC20(asset_).transfer(receiver_, ethValue);

        // emit when withdraw was done
        emit WithdrawFromProtocol(
            caller_,
            receiver_,
            liquidTokenAddress_,
            amountInMaximum_,
            asset_,
            assetsAmount_
        );

        return (asset_, assetsAmount_);
    }
}
