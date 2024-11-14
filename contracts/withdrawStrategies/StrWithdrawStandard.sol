// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import {BaseStrategy} from "../BaseStrategy.sol";

import {IDeployStrategy} from "./../interfaces/IDeployStrategy.sol";
import {IWithdrawStrategy} from "./../interfaces/IWithdrawStrategy.sol";

contract StrWithdrawStandard is BaseStrategy, IWithdrawStrategy {
    address public vaultStrategyAddress;

    /// @notice Number of withdrawal adapters specified for this strategy
    uint8 public constant WITHDRAW_ADAPTERS_QTY = 1;

    function initialize(
        address vaultAddress_,
        address liquidTokenAddress_,
        address[] memory adaptersWithdrawPath_,
        address vaultStrategyAddress_,
        string calldata strategyName_
    ) external initializer {
        ///@notice path can be empty if strategy relies in Vault Strategy only

        _checkZeroAddress(vaultAddress_, "vaultAddress_");
        _checkZeroAddress(liquidTokenAddress_, "liquidTokenAddress_");
        _checkZeroAddress(vaultStrategyAddress_, "vaultStrategyAddress_");
        _checkEmptyString(strategyName_, "strategyName_");

        // Check array and fill it
        super._setAdaptersWithdrawPath(adaptersWithdrawPath_, WITHDRAW_ADAPTERS_QTY);

        // init access control
        __AccessControl_init();

        // grant admin role to defined admin
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());

        // update state variables
        vaultAddress = vaultAddress_;
        liquidTokenAddress = liquidTokenAddress_;
        vaultStrategyAddress = vaultStrategyAddress_;
        strategyName = strategyName_;
    }

    /// @notice Replaces the entire withdrawal path for adapters with new addresses
    /// @param adaptersWithdrawPath_ Array of new adapter addresses for withdrawal
    function setAdaptersWithdrawPath(
        address[] memory adaptersWithdrawPath_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        super._setAdaptersWithdrawPath(adaptersWithdrawPath_, WITHDRAW_ADAPTERS_QTY);
    }

    function executeWithdrawStrategy(
        address, // address receiver_
        address, // address asset_,
        uint256 // uint256 assetsAmount_
    ) external virtual onlyRole(VAULT_MANAGER_ROLE) returns (address, uint256) {
        revert(REVERT_MSG);        
    }
}
