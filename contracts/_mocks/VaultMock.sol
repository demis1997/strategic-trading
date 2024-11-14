// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ERC4626Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC4626Upgradeable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";

/// @title VaultMock
/// @notice Simplified mock version of the Vault contract for testing purposes.
contract VaultMock is ERC4626Upgradeable {
    using Math for uint256;

    uint256 public pendingDepositAssets;
    uint256 public totalAssetsValue;

    /// @notice Initializes the vault with necessary configurations.
    /// @param underlyingTokenAddress_ ERC20 token that the vault will accept as deposits.
    /// @param sharesName_ Name for the ERC20 shares token.
    /// @param sharesSymbol_ Symbol for the ERC20 shares token.
    function initialize(
        address underlyingTokenAddress_,
        string memory sharesName_,
        string memory sharesSymbol_
    ) external initializer {
        __ERC4626_init(IERC20(underlyingTokenAddress_));
        __ERC20_init(sharesName_, sharesSymbol_);
    }

    /// @notice Allows assets to be deposited in exchange for shares.
    /// @param assetsAmount_ Amount of assets to deposit.
    /// @param account_ Address of the account on behalf of which the tokens are deposited.
    /// @return sharesAmount Amount of shares issued for the deposited assets.
    function deposit(uint256 assetsAmount_, address account_) public override returns (uint256) {
        require(assetsAmount_ > 0, "Assets amount must be greater than zero");

        uint256 sharesAmount = previewDeposit(assetsAmount_);
        super._deposit(account_, account_, assetsAmount_, sharesAmount);

        pendingDepositAssets += assetsAmount_;
        totalAssetsValue += assetsAmount_;

        return sharesAmount;
    }

    /// @notice Allows the withdrawal of assets in exchange for burning shares.
    /// @param assetsAmount_ Amount of assets to withdraw.
    /// @param account_ Address of the account from which shares are burned.
    /// @return sharesAmount Amount of shares burned to perform the withdrawal.
    function withdraw(uint256 assetsAmount_, address account_) public returns (uint256) {
        require(assetsAmount_ > 0, "Assets amount must be greater than zero");
        require(assetsAmount_ <= totalAssetsValue, "Insufficient assets");

        uint256 sharesAmount = previewWithdraw(assetsAmount_);
        super._withdraw(_msgSender(), account_, account_, assetsAmount_, sharesAmount);

        totalAssetsValue -= assetsAmount_;

        return sharesAmount;
    }

    /// @notice Retrieves the current valuation of the vault.
    /// @return Current valuation of the vault, including deployed assets and pending deposits.
    function getVaultValuation() public view returns (uint256) {
        return totalAssetsValue;
    }

    /// @notice Internal function to convert a given amount of assets to shares.
    /// @param assets_ Amount of assets to convert.
    /// @param rounding Desired rounding direction for the conversion.
    /// @return shares The number of shares equivalent to the given asset amount.
    function _convertToShares(uint256 assets_, Math.Rounding rounding) internal view override returns (uint256) {
        if (totalSupply() == 0) return assets_;

        return assets_.mulDiv(totalSupply(), totalAssetsValue, rounding);
    }

    /// @notice Internal function to convert a given amount of shares to assets.
    /// @param shares_ Amount of shares to convert.
    /// @param rounding Desired rounding direction for the conversion.
    /// @return assets The amount of assets equivalent to the given share amount.
    function _convertToAssets(uint256 shares_, Math.Rounding rounding) internal view override returns (uint256) {
        return shares_.mulDiv(totalAssetsValue, totalSupply(), rounding);
    }
}
