// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { ERC4626Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC4626Upgradeable.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { Math } from "@openzeppelin/contracts/utils/math/Math.sol";

import { BaseVault } from "./BaseVault.sol";
// import { IVault } from "./interfaces/IVault.sol";
/// @TODO import also the interface
import { IDeployStrategy } from "./interfaces/IDeployStrategy.sol";
import { IWithdrawStrategy } from "./interfaces/IWithdrawStrategy.sol";

// import { console } from "hardhat/console.sol";

/// @title Vault
/// @notice Implements an ERC4626 compliant vault with additional features for asset management, including strategies for asset deployment and withdrawal.
/// @dev Extends BaseVault and ERC4626Upgradeable for vault management with underlying token handling.
contract Vault is BaseVault, ERC4626Upgradeable {
    using Math for uint256;

    /// @notice Initializes the vault with necessary configurations and roles.
    /// @param underlyingTokenAddress_ ERC20 token that the vault will accept as deposits.
    /// @param masterTokenAddress_ Address of the master token.
    /// @param vaultsRegistryAddress_ Address of the vaults registry.
    /// @param ownerAddress_ Address of the vault's owner who will receive the DEFAULT_ADMIN_ROLE.
    /// @param sharesName_ Name for the ERC20 shares token.
    /// @param sharesSymbol_ Symbol for the ERC20 shares token.
    function initialize(
        address underlyingTokenAddress_,
        address masterTokenAddress_,
        address vaultsRegistryAddress_,
        address ownerAddress_,
        string memory sharesName_,
        string memory sharesSymbol_
    ) external initializer {
        _checkZeroAddress(underlyingTokenAddress_, "underlyingTokenAddress_");
        _checkZeroAddress(masterTokenAddress_, "masterTokenAddress_");
        _checkZeroAddress(vaultsRegistryAddress_, "vaultsRegistryAddress_");
        _checkZeroAddress(ownerAddress_, "ownerAddress_");
        _checkEmptyString(sharesName_, "sharesName_");
        _checkEmptyString(sharesSymbol_, "sharesSymbol_");

        // Initialize inherited contracts and state
        __Pausable_init();
        __ReentrancyGuard_init();
        __AccessControl_init();
        __ERC4626_init(IERC20(underlyingTokenAddress_));
        __ERC20_init(sharesName_, sharesSymbol_);

        // Grant the admin role to the specified owner
        _grantRole(DEFAULT_ADMIN_ROLE, ownerAddress_);

        // Set master token and vault registry addresses
        masterTokenAddress = masterTokenAddress_;
        vaultsRegistryAddress = vaultsRegistryAddress_;

        // specify to valuate from withdraw adapter if oracle is not present
        valuationSource = 2;
        emit MasterTokenAddressSet(masterTokenAddress_);
    }

    /// @notice Overrides the mint function
    /// @dev Reverts any call to mint to prevent bypassing the deposit logic.
    function mint(uint256, address) public virtual override returns (uint256) {
        revert(REVERT_MSG);
    }

    /// @notice Overrides the redeem function
    /// @dev Reverts any call to redeem to prevent bypassing the withdraw logic.
    function redeem(uint256, address, address) public virtual override returns (uint256) {
        revert(REVERT_MSG);
    }

    /// @notice Allows assets to be deposited in exchange for shares, adhering to access controls.
    /// @param assets_ Amount of assets to deposit.
    /// @param receiver_ Address of the account on behalf of which the tokens are deposited.
    /// @return sharesAmount Amount of shares issued for the deposited assets.
    function deposit(
        uint256 assets_,
        address receiver_
    )
        public
        override(ERC4626Upgradeable)
        onlyRole(MASTER_TOKEN_ROLE)
        whenNotPaused
        returns (uint256)
    {
        // Validate input amounts and addresses
        _checkZeroAmount(assets_, "assets_");
        _checkZeroAddress(receiver_, "receiver_");

        // Optional live valuation step before proceeding with deposit
        // to get preview right
        // _liveValuationDeposit();

        // Transfer assets and mint shares
        uint256 sharesAmount = previewDeposit(assets_);
        super._deposit(receiver_, masterTokenAddress, assets_, sharesAmount);

        // Track the pending deposits for next asset deployment
        pendingDepositAssets += assets_;

        // Emit an event for the deposit operation (event inherited from ERC4626)

        uint256 vaultValuation = totalAssets();

        emit VaultValuationUpdated(vaultValuation);

        return sharesAmount;
    }

    /// @notice Allows the withdrawal of assets in exchange for burning shares, adhering to access controls.
    /// @param assets_ Amount of assets to withdraw.
    /// @param owner_ Address representing the master token invoking the withdrawal.
    /// @param receiver_ Address of the account from which shares are burned.
    /// @return shares Amount of shares burned to perform the withdrawal.
    function withdraw(
        uint256 assets_,
        address owner_,
        address receiver_
    )
        public
        override(ERC4626Upgradeable)
        onlyRole(MASTER_TOKEN_ROLE)
        whenNotPaused
        returns (uint256)
    {
        /// @TODO revise parameters to match names to the standard
        // override(ERC4626Upgradeable, IVault)

        // Validate input amounts and addresses
        _checkZeroAmount(assets_, "assets_");
        _checkZeroAddress(owner_, "owner_");
        _checkZeroAddress(receiver_, "receiver_");

        // Optional live valuation step before proceeding with withdrawal
        // to get preview right
        _liveValuationWithdraw();

        // Calculate shares equivalent to the requested asset amount
        uint256 shares = previewWithdraw(assets_);
        // call internal withdraw to join redeem function
        _whitdrawAssets(owner_, shares, assets_, receiver_);

        // Emit an event for the withdrawal operation (event inherited from ERC4626)

        return shares;
    }

    /// @notice Deploys assets according to the defined strategy for asset management.
    /// @return liquidToken Address of the token received from the deployment strategy.
    /// @return liquidTokenAmount Amount of the liquid token received.
    function deployAssets() external onlyRole(VAULT_MANAGER_ROLE) returns (address, uint256) {
        // Validation checks for funds and defined strategy
        _checkZeroAddress(vaultStrategyAddress, "vaultStrategyAddress");
        _checkZeroAmount(pendingDepositAssets, "pendingDepositAssets");

        // Approve the adapter to get the assets for deployment
        address adapter = IDeployStrategy(vaultStrategyAddress).getFirstDepositAdapter();
        IERC20(super.asset()).approve(adapter, pendingDepositAssets);

        // call strategy to deploy assets
        (address liquidToken, uint256 liquidTokenAmount) = IDeployStrategy(vaultStrategyAddress)
            .executeDeploymentStrategy(
                address(this),
                vaultStrategyAddress,
                super.asset(),
                pendingDepositAssets
            );

        // Reset pending deposits after successful deployment
        if (liquidToken != address(0) && liquidTokenAmount > 0) pendingDepositAssets = 0;
        else revert("Invalid return from Strategy");

        emit AssetsDeployed(liquidToken, liquidTokenAmount, pendingDepositAssets, _msgSender());

        return (liquidToken, liquidTokenAmount);
    }

    /// @notice Harvests earnings from the strategy, adhering to access controls.
    /// @return token Address of the token received from the harvest.
    /// @return tokenAmount Amount of the token received.
    function harvest() external onlyRole(DEFAULT_ADMIN_ROLE) returns (address, uint256) {
        _checkZeroAddress(vaultStrategyAddress, "vaultStrategyAddress");

        // get earnings, claim tokens, compound, etc depending on the strategy
        (address token, uint256 tokenAmount) = IDeployStrategy(vaultStrategyAddress)
            .executeHarvest();

        emit HarvestExecuted(token, tokenAmount, _msgSender());

        return (token, tokenAmount);
    }

    /// @notice Updates the vault's valuation based on the current asset deployment.
    /// @dev Only callable by the VAULT_MANAGER_ROLE.
    /// @param valuationSource_ Specifies from where to get the price when no oracle is defined
    /// @return vaultValuation Updated valuation of the vault.
    function updateVaultValuation(
        uint256 valuationSource_
    ) public onlyRole(VAULT_MANAGER_ROLE) returns (uint256) {
        // check source_ 1 is deposit adapter, 2 is withdraw
        require(valuationSource_ == 1 || valuationSource_ == 2, "Invalid valuationSource_");
        // check strategy is defined
        _checkZeroAddress(vaultStrategyAddress, "vaultStrategyAddress");

        // get the valuation of deployed assets in the strategy denominated in underlying
        IDeployStrategy(vaultStrategyAddress).updateDeployedAssetVaule(valuationSource_);

        uint256 vaultValuation = totalAssets();

        emit VaultValuationUpdated(vaultValuation);

        return vaultValuation;
    }

    /// @notice Retrieves the current valuation of the vault on underlying.
    /// @return vaultValuation Current valuation of the vault, including deployed assets and pending deposits.
    function totalAssets() public view override returns (uint256) {
        // check strategy is defined
        _checkZeroAddress(vaultStrategyAddress, "vaultStrategyAddress");

        return
            IDeployStrategy(vaultStrategyAddress).getDeployedAssetsValue() + pendingDepositAssets;
    }

    /// @notice Internal function to handle the withdrawal of assets by burning shares.
    /// @param owner_ Address of the shares holder.
    /// @param shares_ Amount of shares to be burned.
    /// @param assets_ Amount of assets to withdraw.
    /// @param receiver_ Address of the account from which shares are burned.
    /// @return exactAssetsAmount The exact amount of assets returned.
    function _whitdrawAssets(
        address owner_,
        uint256 shares_,
        uint256 assets_,
        address receiver_
    ) internal returns (uint256) {
        // check withdrawStrategyAddress is defined
        _checkZeroAddress(withdrawStrategyAddress, "withdrawStrategyAddress");

        // shares amount are checked on masterToken

        uint256 exactAssetAmount;
        // this checks if the withdraw can be done internally
        if (pendingDepositAssets >= assets_) {
            // there is enough underlying to cover the withdraw
            exactAssetAmount = assets_;

            // update pending deposit assets
            pendingDepositAssets -= assets_;
        } else {
            // there is NOT enough underlying to conver... call the strategy to withdraw
            (, uint256 assetsAmount) = IWithdrawStrategy(withdrawStrategyAddress)
                .executeWithdrawStrategy(address(this), asset(), assets_);

            _checkZeroAmount(assetsAmount, "assetsAmount");

            // return the exact amount
            exactAssetAmount = assetsAmount;
        }

        // shares are burned, approve should already be done
        super._withdraw(owner_, receiver_, owner_, exactAssetAmount, shares_);

        // Event emitted from ERC4626

        uint256 vaultValuation = totalAssets();

        emit VaultValuationUpdated(vaultValuation);

        return exactAssetAmount;
    }

    // Function to handle receiving underlying
    function putUnderlying(uint256 amount_) external onlyRole(VAULT_MANAGER_ROLE) {
        IERC20 token = IERC20(asset());
        require(token.transferFrom(_msgSender(), address(this), amount_), "Transfer failed");

        // update valuation inside the vault
        pendingDepositAssets += amount_;
        uint256 vaultValuation = totalAssets();

        emit VaultValuationUpdated(vaultValuation);
    }

    // Function to handle withdrawing underlying
    function getUnderlying(uint256 amount_) external onlyRole(VAULT_MANAGER_ROLE) {
        IERC20 token = IERC20(asset());
        require(token.transfer(_msgSender(), amount_), "Transfer failed");

        // update valuation inside the vault
        pendingDepositAssets -= amount_;
        uint256 vaultValuation = totalAssets();

        emit VaultValuationUpdated(vaultValuation);
    }

    /// @notice Evaluates whether to perform a live valuation of the vault for deposits
    function _liveValuationDeposit() internal {
        // check if live valuation is requested for deposit
        if (liveValuationOnDeposit) updateVaultValuation(valuationSource);
    }

    /// @notice Evaluates whether to perform a live valuation of the vault for withdrawals.
    function _liveValuationWithdraw() internal {
        // check if live valuation is requested for withdraw
        if (liveValuationOnWithdraw) updateVaultValuation(valuationSource);
    }
}
