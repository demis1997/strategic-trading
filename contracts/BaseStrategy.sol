// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { AccessControlUpgradeable } from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import { ReentrancyGuardUpgradeable } from "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import { PausableUpgradeable } from "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import { AggregatorV3Interface } from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

import { IBaseStrategy } from "./interfaces/IBaseStrategy.sol";
import { IAdapter } from "./interfaces/IAdapter.sol";

// import {console} from "hardhat/console.sol";

/// @title Abstract Base Strategy Contract
/// @notice Provides a base implementation strategy management, including administrative functions and access control
abstract contract BaseStrategy is
    AccessControlUpgradeable,
    ReentrancyGuardUpgradeable,
    PausableUpgradeable,
    IBaseStrategy
{
/// @notice Role identifier for managing vault operations
bytes32 public constant VAULT_MANAGER_ROLE = keccak256("VAULT_MANAGER_ROLE");

/// @notice Total value of assets currently deployed by this strategy
uint256 public deployedAssetsValue;

/// @notice Address of the liquid token used in the strategy
address public liquidTokenAddress;

/// @notice Address of the wrapper for the liquidToken
address public wrappedLiquidTokenAddress;

/// @notice Address of the strategy for withdrawals
address public withdrawStrategyAddress;

/// @notice Main vault address associated with this strategy
address public vaultAddress;

/// @notice Path of adapters used for deploying assets
address[] public adaptersDeployPath;

/// @notice Path of adapters used for withdrawing assets
address[] public adaptersWithdrawPath;

/// @notice Name of the strategy
string public strategyName;

/// @notice Revert message used to indicate that a function is not allowed/implemented
string public constant REVERT_MSG = "Function not allowed";

/// @notice Addresses of the priceFeed per token
mapping(address token => address priceFeed) public priceFeedPerToken;



    /// @notice Accepts only ETH transfers
    receive() external payable {}

    /// @notice Sets the vault address
    /// @param vaultAddress_ New vault address
    function setVaultAddress(address vaultAddress_) external virtual onlyRole(DEFAULT_ADMIN_ROLE) {
        _checkZeroAddress(vaultAddress_, "vaultAddress_");

        emit VaultAddressSet(vaultAddress_);

        vaultAddress = vaultAddress_;
    }

    /// @notice Sets the address for the withdrawal strategy
    /// @param withdrawStrategyAddress_ New address for the withdrawal strategy
    function setWithdrawStrategyAddress(
        address withdrawStrategyAddress_
    ) external virtual onlyRole(DEFAULT_ADMIN_ROLE) {
        _checkZeroAddress(withdrawStrategyAddress_, "withdrawStrategyAddress_");

        emit WithdrawStrategyAddressSet(withdrawStrategyAddress_);

        withdrawStrategyAddress = withdrawStrategyAddress_;
    }

    /// @notice Sets the strategy name
    /// @param strategyName_ New name of the strategy
    function setStrategyName(
        string calldata strategyName_
    ) external virtual onlyRole(DEFAULT_ADMIN_ROLE) {
        _checkEmptyString(strategyName_, "strategyName_");

        emit StrategyNameSet(strategyName_);

        strategyName = strategyName_;
    }

    /// @notice Set the feed address to get price for a specific token
    /// @param token_ Token to get the price
    /// @param feed_ Feed address
    function setPriceFeedPerToken(
        address token_,
        address feed_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(
            (token_ == liquidTokenAddress || token_ == wrappedLiquidTokenAddress) &&
                token_ != address(0),
            "Invalid token entered"
        );

        emit PriceFeedSet(token_, feed_);

        priceFeedPerToken[token_] = feed_;
    }

    /// @notice Replaces the entire deployment path for adapters with new addresses
    /// @param adaptersDeployPath_ Array of new adapter addresses for deployment
    function _setAdaptersDeployPath(
        address[] memory adaptersDeployPath_,
        uint8 deploymentAdaptersQty_
    ) internal {
        uint256 length = adaptersDeployPath_.length;
        // check deployment path qty is correct
        if (length != deploymentAdaptersQty_) revert InvalidAdaptersPath({ target: "deploy" });

        // Clear the existing array
        delete adaptersDeployPath;

        emit AdaptersDeployPathSet(adaptersDeployPath_);

        // Replace with the new addresses
        for (uint i = 0; i < length; ++i) {
            _checkZeroAddress(adaptersDeployPath_[i], "adaptersDeployPath_[]");
            adaptersDeployPath.push(adaptersDeployPath_[i]);
        }
    }

    /// @notice Replaces the entire withdrawal path for adapters with new addresses
    /// @param adaptersWithdrawPath_ Array of new adapter addresses for withdrawal
    function _setAdaptersWithdrawPath(
        address[] memory adaptersWithdrawPath_,
        uint8 withdrawAdaptersQty_
    ) internal {
        uint256 length = adaptersWithdrawPath_.length;
        // check withdraw path qty is correct
        if (length != withdrawAdaptersQty_) revert InvalidAdaptersPath({ target: "withdraw" });

        // Clear the existing array
        delete adaptersWithdrawPath;

        emit AdaptersWithdrawPathSet(adaptersWithdrawPath_);

        // Replace with the new addresses
        for (uint i = 0; i < length; ++i) {
            _checkZeroAddress(adaptersWithdrawPath_[i], "adaptersWithdrawPath_[]");
            adaptersWithdrawPath.push(adaptersWithdrawPath_[i]);
        }
    }

    /// @notice Sets a new liquid token address for the strategy
    /// @param liquidTokenAddress_ New liquid token address
    function setLiquidTokenAddress(
        address liquidTokenAddress_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _checkZeroAddress(liquidTokenAddress_, "liquidTokenAddress_");

        emit LiquidTokenSet(liquidTokenAddress_);

        liquidTokenAddress = liquidTokenAddress_;
    }

    /// @notice Sets a new address for the wrapper of liquid token
    /// @param wrappedLiquidTokenAddress_ New wrapper address
    function setWrappedLiquidTokenAddress(
        address wrappedLiquidTokenAddress_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _checkZeroAddress(wrappedLiquidTokenAddress_, "wrappedLiquidTokenAddress_");

        emit TokenWrapperSet(wrappedLiquidTokenAddress_);

        wrappedLiquidTokenAddress = wrappedLiquidTokenAddress_;
    }

    /// @notice Deploys assets using the specified adapter
    /// @param adapter_ Address of the adapter used
    /// @param sender_ Address of the asset sender (vault)
    /// @param receiver_ Address of the asset receiver (this contract)
    /// @param token_ Address of the token to be deployed
    /// @param tokenAmount_ Amount of tokens to be deployed
    /// @param wrapToken Boolean indicating whether to wrap the token
    /// @return liquidToken Address of the liquid token received
    /// @return liquidTokenAmount Amount of liquid tokens received
    function _deployAssets(
        address adapter_,
        address sender_, // first one is vault
        address receiver_, // this contract
        address token_,
        uint256 tokenAmount_,
        bool wrapToken
    ) internal returns (address, uint256) {
        // call the function on the adapter
        // after this function
        // assets should be transferred to protocol
        // liquid assets should be transferred from protocol to strategy
        (address liquidToken, uint256 liquidTokenAmount) = IAdapter(adapter_).deposit(
            sender_, // first one is vault // second one should be this contract
            receiver_, // should be ==> address(this) it is this address comming from the vault
            token_,
            tokenAmount_,
            wrapToken
        );

        return (liquidToken, liquidTokenAmount);
    }

    /// @notice Pauses the contract (only callable by admin)
    /// @dev Restricted to admin role
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    /// @notice Unpauses the contract (only callable by admin)
    /// @dev Restricted to admin role
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    /// @notice Retrieves the price of a token using the withdrawal adapter
    /// @param token_ Address of the token to retrieve the price for
    /// @param source_ Specifies from where to get the price when no oracle is defined
    /// @return The price of the token in ETH
    function getTokenPrice(address token_, uint256 source_) public view returns (uint256) {
        require(
            token_ == liquidTokenAddress || token_ == wrappedLiquidTokenAddress,
            "Invalid token requested"
        );
        require(source_ == 1 || source_ == 2, "Invalid source to get price");

        // get oracle if any
        address priceFeed = priceFeedPerToken[token_];

        uint256 priceInWETH;
        if (priceFeed != address(0)) {
            // get price from oracle
            (, int answer, , , ) = AggregatorV3Interface(priceFeed).latestRoundData();
            priceInWETH = uint256(answer);
        } else {
            // get adapter to get the price from
            address adapter = source_ == 2 ? _getAdapterForWithdraw() : _getLastDepositAdapter();
            // get price from pool
            priceInWETH = IAdapter(adapter).getTokenPrice(token_);
        }

        return priceInWETH;
    }

    /// @notice Returns the first deployment adapter address
    /// @return address of the first deployment adapter
    function _getFirstDepositAdapter() internal view returns (address) {
        return adaptersDeployPath[0];
    }

    /// @notice Returns the last deployment adapter address for valuation purposes
    /// @return address of the last deployment adapter
    function _getLastDepositAdapter() internal view returns (address) {
        /// @notice in this strategy, index 0 is the only one
        return adaptersDeployPath[adaptersDeployPath.length - 1];
    }

    /// @notice Returns the first withdrawal adapter address
    /// @return address of the first withdrawal adapter
    function _getAdapterForWithdraw() internal view returns (address) {
        /// @notice in this strategy, index 0 is the only one
        return adaptersWithdrawPath[0];
    }

    /// @notice Returns the current value of deployed assets
    /// @return uint256 The current value of assets deployed by the strategy
    function _getDeployedAssetsValue() internal view returns (uint256) {
        return deployedAssetsValue;
    }

    /// @dev Internal function to check for zero addresses and revert if necessary.
    function _checkZeroAddress(address variable_, string memory target_) internal pure {
        if (variable_ == address(0)) revert ZeroAddress({ target: target_ });
    }

    /// @dev Internal function to check for empty strings and revert if necessary.
    function _checkEmptyString(string memory variable_, string memory target_) internal pure {
        if (!(bytes(variable_).length > 0)) revert EmptyString({ target: target_ });
    }

    /// @dev Internal function to check for zero amounts and revert if necessary.
    function _checkZeroAmount(uint256 variable_, string memory target_) internal pure {
        if (variable_ == 0) revert ZeroAmount({ target: target_ });
    }
}
