// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { BaseAdapter } from "./../BaseAdapter.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import { IWETH } from "./../../interfaces/IWETH.sol";
import { IweETH } from "./interfaces/IweETH.sol";

import { IEtherFiLiquifier } from "./interfaces/IEtherFiLiquifier.sol";
import { IAdapter } from "./../../interfaces/IAdapter.sol";

/**
 * @title Etherfi Staking Adapter for stETH
 * @notice This contract manages the staking of stETH , and provides functionality to requesting withdraw.
 * @dev Integrates Etherfi for staking.
 */
contract EtherFiAdapter is BaseAdapter, IAdapter {
    using SafeERC20 for IERC20;

    /// @notice Address of the Etherfi Liquifier contract
    address public liquifierAddress;

    /// @notice Address of the eETH contract
    address public eETHAddress;

    /// @notice Address of the weETH contract
    address public weETHAddress;

    /// @notice Indicates an error occurred during the wrap operation
    /// @param token The token that failed to wrap
    /// @param amount The amount that failed to wrap
    error WrapError(address token, uint256 amount);

    /// @notice Initializes the adapter with the necessary addresses and roles
    /// @param liquifierAddress_ The address of the EtherFi Liquifier contract
    /// @param eETHAddress_ EtherFi eETH address
    /// @param weETHAddress_ EtherFi weETH address
    function initialize(
        address liquifierAddress_,
        address eETHAddress_,
        address weETHAddress_
    ) public initializer {
        _checkZeroAddress(liquifierAddress_, "liquifierAddress_");
        _checkZeroAddress(eETHAddress_, "eETHAddress");
        _checkZeroAddress(weETHAddress_, "weETHAddress");

        __AccessControl_init();
        __ReentrancyGuard_init();
        __Pausable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());

        liquifierAddress = liquifierAddress_;

        eETHAddress = eETHAddress_;
        weETHAddress = weETHAddress_;

        // set default slippage
        slippage = 4e16; // 4%;

        protocolName = "EtherFi";
    }

    /// @notice Receives ETH sent to the contract
    receive() external payable {}

    /// @notice Takes stETH from Vault, and stakes it to receive eETH
    /// @param sender_ The address sending stETH to be staked
    /// @param receiver_ The address receiving eETH
    /// @param token_ The address of the token stETH
    /// @param tokenAmount_ The amount of stETH to stake
    /// @param wrapToken_ If the liquid token on Etherfi should be wrapped to weETH
    /// @return liquidTkn The address of eETH/weETH token received
    /// @return liquidTknAmount The amount of eETH/weETH received
    function deposit(
        address sender_, // vault
        address receiver_, // strategy
        address token_, // stETH
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

        // get stETH from vault, should already have approval
        IERC20(token_).safeTransferFrom(sender_, address(this), tokenAmount_);
        IERC20(token_).approve(liquifierAddress, tokenAmount_);

        // Adjust the calculation for slippage
        uint256 minEEthAmount = (tokenAmount_ * (1e18 - slippage)) / 1e18;

        // send funds to Etherfi and check if slippage is ok
        IEtherFiLiquifier(liquifierAddress).depositWithERC20(token_, tokenAmount_, address(0));
        // get balance of received eETH from Etherfi
        uint256 eEthAmount = IERC20(eETHAddress).balanceOf(address(this));
        if (eEthAmount < minEEthAmount) revert SlippageExceededOnDeposit(minEEthAmount, eEthAmount);

        liquidTknAmount = eEthAmount;
        liquidTkn = eETHAddress;

        // if wrapping is true, wrap eETH to weETH
        if (wrapToken_) {
            // approve weETH contract to get the eETH
            IERC20(eETHAddress).approve(weETHAddress, eEthAmount);

            liquidTknAmount = IweETH(weETHAddress).wrap(eEthAmount);
            liquidTkn = weETHAddress;

            if (liquidTknAmount == 0) revert WrapError(liquifierAddress, eEthAmount);
        }

        // transfer eETH/weETH to strategy
        IERC20(liquidTkn).safeTransfer(receiver_, liquidTknAmount);

        // emit when deposit was done
        emit DepositedOnProtocol(sender_, token_, tokenAmount_, liquidTkn, liquidTknAmount);

        // return liquidTokenAddress and amount
        return (liquidTkn, liquidTknAmount);
    }

    /// @notice Sets etherFi liquifier address
    function setLiquifierAddress(address liquifierAddress_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _checkZeroAddress(liquifierAddress_, "liquifierAddress_");

        emit AddressUpdated("liquifierAddress_", liquifierAddress_);

        liquifierAddress = liquifierAddress_;
    }

    /// @notice Retrieves the address of the Etherfi protocol used by this adapter
    /// @return address The address of the Etherfi protocol
    function getProtocol() external view returns (address) {
        return liquifierAddress;
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
