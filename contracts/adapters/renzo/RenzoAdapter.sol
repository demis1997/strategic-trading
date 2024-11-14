// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {BaseAdapter} from "./../BaseAdapter.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IRenzoLiquifier} from "./interfaces/IRenzoLiquifier.sol";
import {IAdapter} from "./../../interfaces/IAdapter.sol";

/**
 * @title Renzo Staking Adapter for stETH
 * @notice This contract manages the staking of stETH and provides functionality for exchanging it to ezETH.
 * @dev Integrates Renzo for staking.
 */
contract RenzoAdapter is BaseAdapter, IAdapter {
    using SafeERC20 for IERC20;

    /// @notice Address of the Renzo Liquifier contract
    address public liquifierAddress;

    /// @notice Address of the ezETH contract
    address public ezETHAddress;

    /// @notice Address of the stETH contract
    address public stETHAddress;

    /// @notice Initializes the adapter with the necessary addresses and roles
    /// @param liquifierAddress_ The address of the Renzo Liquifier contract
    /// @param ezETHAddress_ Renzo ezETH address
    /// @param stETHAddress_ stETH address
    function initialize(
        address liquifierAddress_,
        address ezETHAddress_,
        address stETHAddress_
    ) public initializer {
        _checkZeroAddress(liquifierAddress_, "liquifierAddress_");
        _checkZeroAddress(ezETHAddress_, "ezETHAddress");
        _checkZeroAddress(stETHAddress_, "stETHAddress");

        __AccessControl_init();
        __ReentrancyGuard_init();
        __Pausable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());

        liquifierAddress = liquifierAddress_;
        ezETHAddress = ezETHAddress_;
        stETHAddress = stETHAddress_;

        // set default slippage
        slippage = 4e16; // 4%
    }

    /// @notice Receives ETH sent to the contract
    receive() external payable {}

    /// @notice Fallback function to handle incoming ETH
    fallback() external payable {}

    /// @notice Takes stETH from Vault and stakes it to receive ezETH
    /// @param sender_ The address sending stETH to be staked
    /// @param receiver_ The address receiving ezETH
    /// @param token_ The address of the token stETH
    /// @param tokenAmount_ The amount of stETH to stake
    /// @return liquidTkn The address of ezETH token received
    /// @return liquidTknAmount The amount of ezETH received
    function deposit(
        address sender_,
        address receiver_,
        address token_,
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


    
  

        // Transfer stETH from sender and approve Renzo Liquifier contract
        IERC20(token_).safeTransferFrom(sender_, address(this), tokenAmount_);
        IERC20(token_).approve(liquifierAddress, tokenAmount_);


        // Adjust the calculation for slippage
        uint256 minEzEthAmount = (tokenAmount_ * (1e18 - slippage)) / 1e18;


        // Call the Renzo protocol's deposit function

        try IRenzoLiquifier(liquifierAddress).deposit(token_, tokenAmount_) {
        } catch (bytes memory reason) {
            if (reason.length == 0) {
                revert("Transaction reverted without a reason string");
            } else {
                assembly {
                    revert(add(32, reason), mload(reason))
                }
            }
        }

        uint256 ezEthAmount = IERC20(ezETHAddress).balanceOf(address(this));

        if (ezEthAmount < minEzEthAmount) revert SlippageExceededOnDeposit(minEzEthAmount, ezEthAmount);

        liquidTknAmount = ezEthAmount;
        liquidTkn = ezETHAddress;


        // Transfer ezETH to receiver
        IERC20(liquidTkn).safeTransfer(receiver_, liquidTknAmount);


        return (liquidTkn, liquidTknAmount);
    }

    /// @notice Sets Renzo liquifier address
    function setLiquifierAddress(address liquifierAddress_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _checkZeroAddress(liquifierAddress_, "liquifierAddress_");

        emit AddressUpdated("liquifierAddress_", liquifierAddress_);

        liquifierAddress = liquifierAddress_;
    }

    /// @notice Retrieves the address of the Renzo protocol used by this adapter
    /// @return address The address of the Renzo protocol
    function getProtocol() external view returns (address) {
        return liquifierAddress;
    }

    /// @notice Placeholder for claimEarnings function
    function claimEarnings(address, address) external virtual override returns (address, uint256) {
        revert("claimEarnings not implemented");
    }

    /// @notice Placeholder for getTokenPrice function
    function getTokenPrice(address) external view virtual override returns (uint256) {
        revert("getTokenPrice not implemented");
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
