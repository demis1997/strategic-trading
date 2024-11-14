// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ProtocolMock is AccessControl {
    using SafeERC20 for IERC20;

    struct ExactOutputParams {
        bytes path;
        address recipient;
        uint256 amountOut;
        uint256 amountInMaximum;
    }

    bool public transferSuccess;
    string public protocolName;

    address public assetAddress;
    uint256 public assetsAmount;

    address public liquidAssetAddress;
    uint256 public liquidAssetsAmount;
    uint256 public leftover;

    uint256 public tokenPrice;
    address public strategyAddress;

    

    constructor(string memory protocolName_, address assetAddress_, address liquidAssetAddress_) {
        // grant admin role to defined admin
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());

        transferSuccess = true;

        assetsAmount = 1e18;
        liquidAssetsAmount = 1e18;

        protocolName = protocolName_;
        assetAddress = assetAddress_;
        liquidAssetAddress = liquidAssetAddress_;
    }

    function setStrategyAddress(address strategyAddress_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        strategyAddress = strategyAddress_;
    }

    function setProtocolName(string calldata value_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        protocolName = value_;
    }

    function setTransferSuccess(bool value_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        transferSuccess = value_;
    }

    function setLeftover(uint256 amount_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        leftover = amount_;
    }

    function setAmounts(
        uint256 assetsAmount_,
        uint256 liquidAssetsAmount_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        assetsAmount = assetsAmount_;
        liquidAssetsAmount = liquidAssetsAmount_;
    }

    function setAssetAddress(address assetAddress_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        assetAddress = assetAddress_;
    }

    function setLiquidAssetAddress(
        address liquidAssetAddress_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        liquidAssetAddress = liquidAssetAddress_;
    }

    function setTokenPrice(uint256 tokenPrice_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        tokenPrice = tokenPrice_;
    }

    // function setTokenPrice(
    //     address token_,
    //     uint256 tokenPrice_
    // ) external onlyRole(DEFAULT_ADMIN_ROLE) {
    //     tokenPrices[token_] = tokenPrice_;
    // }

    receive() external payable {}

    function depositOnProtocol(
        address sender_, // adapter
        address receiver_, // strategy
        address asset_,
        uint256 assetsAmount_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) returns (bool, address, uint256) {
        // get asset from sender (vault or strategy)
        IERC20(asset_).safeTransferFrom(sender_, address(this), assetsAmount_);

        // transfer liquid tokens to receiver (strategy)
        bool success = IERC20(liquidAssetAddress).transfer(receiver_, liquidAssetsAmount);
        if (!success) revert("liquid token transfer to strategy failed");

        // return liquidAssetsAmount
        return (transferSuccess, liquidAssetAddress, liquidAssetsAmount);
    }

    function withdrawAssets(
        address caller_, // adapter
        address receiver_, // vault
        address liquidAssetAddress_,
        uint256 liquidTokenAmount_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) returns (bool, address, uint256) {
        // bring liquid tokens from adapter
        IERC20(liquidAssetAddress_).safeTransferFrom(caller_, address(this), liquidTokenAmount_);

        // return asset
        IERC20(assetAddress).safeTransfer(receiver_, assetsAmount);

        // return leftover
        if (leftover > 0) {
            IERC20(liquidAssetAddress_).transfer(strategyAddress, leftover);
        }

        return (transferSuccess, assetAddress, assetsAmount);
    }

    function claim(
        address,
        address receiver_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) returns (bool, address, uint256) {
        // transfer to recevier
        IERC20(liquidAssetAddress).transfer(receiver_, liquidAssetsAmount);

        return (transferSuccess, liquidAssetAddress, liquidAssetsAmount);
    }

    /// emulates uniswap functionality
    function exactOutput(
        ExactOutputParams calldata params
    ) external payable onlyRole(DEFAULT_ADMIN_ROLE) returns (uint256) {
        // for testing purposes to make it fail
        if (!transferSuccess) revert("transferSetToFail");

        // get the path length
        uint256 length = params.path.length;

        // last on the encoding
        address tokenIn = address(uint160(bytes20(params.path[length - 20:length])));

        // first on the encoding
        address tokenOut = address(uint160(bytes20(params.path[0:20])));

        // bring tokens from adapter
        IERC20(tokenIn).safeTransferFrom(_msgSender(), address(this), params.amountInMaximum);

        // transfer token to strategy
        IERC20(tokenOut).safeTransfer(params.recipient, params.amountOut);

        return params.amountInMaximum;
    }

    function getTokensBack(
        address receiver,
        address token,
        uint256 amount
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        IERC20(token).safeTransfer(receiver, amount);
    }

    function getTokenPrice(address) external view returns (uint256) {
        return tokenPrice;
    }

    function getAccountValuation(address, address, uint256) external view returns (uint256) {
        return assetsAmount;
    }
}
