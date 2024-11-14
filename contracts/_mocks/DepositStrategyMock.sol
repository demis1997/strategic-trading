// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";

contract DepositStrategyMock is AccessControl {
    address public vault;

    address public liquidToken;
    uint256 public liquidTokenAmount;

    address public asset;
    uint256 public assetsAmount;

    uint256 public tokenPrice;
    uint256 public assetPrice;

    uint256 public deployedAssetsValue;

    constructor(address vaultAddress_) {
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());

        vault = vaultAddress_;
    }

    function setTokenAddress(
        address tokenAddress_,
        uint256 target_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (target_ == 1) liquidToken = tokenAddress_;
        else asset = tokenAddress_;
    }

    function setTokenPrice(
        uint256 tokenPrice_,
        uint256 target_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (target_ == 1) tokenPrice = tokenPrice_;
        else assetPrice = tokenPrice_;
    }

    function setTokenAmounts(
        uint256 amount_,
        uint256 target_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (target_ == 1) liquidTokenAmount = amount_;
        else assetsAmount = amount_;
    }

    function setDeployedAssetsValue(uint256 value_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        deployedAssetsValue = value_;
    }

    function executeDeploymentStrategy(
        address vaultAddress_,
        address vaultStrategy_,
        address asset_,
        uint256 amount_
    ) external virtual onlyRole(DEFAULT_ADMIN_ROLE) returns (address, uint256) {
        IERC20(asset_).transferFrom(vaultAddress_, vaultStrategy_, amount_);
        
        return (liquidToken, liquidTokenAmount);
    }

    function executeHarvest()
        external
        virtual
        onlyRole(DEFAULT_ADMIN_ROLE)
        returns (address, uint256)
    {
        return (liquidToken, liquidTokenAmount);
    }

    function getTokenPrice(address) public virtual returns (uint256) {
        return tokenPrice;
    }

    function updateDeployedAssetVaule(
        uint256
    ) external virtual onlyRole(DEFAULT_ADMIN_ROLE) returns (uint256) {
        return deployedAssetsValue;
    }

    function executeWithdrawStrategy(
        address, // vault
        address,
        uint256
    ) external virtual onlyRole(DEFAULT_ADMIN_ROLE) returns (address, uint256) {
        return (asset, assetsAmount);
    }

    function getFirstDepositAdapter() public view returns (address) {
        return address(this);
    }

    function getDeployedAssetsValue() public view returns (uint256) {
        return deployedAssetsValue;
    }
}
