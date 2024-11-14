// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

/// @title Interface for Vault operations in Lys protocol
interface IVault {
    /// @notice Emitted when the vaults registry address is set
    event VaultsRegistryAddressSet(address indexed newAddress);

    /// @notice Emitted when the master token address is set
    event MasterTokenAddressSet(address indexed newAddress);

    /// @notice Emitted when the vault strategy address is set
    event VaultStrategyAddressSet(address indexed newAddress);

    /// @notice Emitted when the withdraw strategy address is set
    event WithdrawStrategyAddressSet(address indexed newAddress);

    /// @notice Emitted when live valuation settings are modified
    event LiveValuationSet(bool status, uint256 target);

    /// @notice Emitted when assets are deployed by the vault
    event AssetsDeployed(
        address indexed liquidToken,
        uint256 liquidTokenAmount,
        uint256 pendingDepositAssets,
        address indexed caller
    );

    /// @notice Emitted when a harvest operation is executed
    event HarvestExecuted(address indexed token, uint256 tokenAmount, address indexed caller);

    /// @notice Emitted when the valuation of the vault is updated
    event VaultValuationUpdated(uint256 vaultValuation);

    /// @notice Emitted when the valuationSource of the vault is updated
    event ValuationSourceSet(uint256 valuationSource);

    /// @notice Error thrown when an invalid target is specified for setting live valuation
    error InvalidTarget();

    /// @notice Error thrown when a zero address is provided where it is not allowed
    error ZeroAddress(string target);

    /// @notice Error thrown when an empty string is provided where it is not allowed
    error EmptyString(string target);

    /// @notice Error thrown when a zero amount is provided where it is not allowed
    error ZeroAmount(string target);

    /// @notice Error indicating insufficient funds for deploying assets
    error InsufficientFundsForAssetsDeployment();

    /// @notice Error indicating insufficient assets to proceed with withdrawal
    error InsufficientAssetsToWithdraw(
        address account,
        uint256 accountBalance,
        uint256 requestedAmount
    );

    /// @notice Error indicating an invalid asset returned from a vault operation
    error InvalidAssetReturned(address vaultAsset, address returnedAsset, uint256 assetsAmount);

    /// @notice Initializes the vault
    function initialize(
        address underlyingTokenAddress_,
        address masterTokenAddress_,
        address vaultsRegistryAddress_,
        address ownerAddress_,
        string memory sharesName_,
        string memory sharesSymbol_
    ) external;

    /// @notice Deploys assets according to the defined strategy for asset management.
    /// @return liquidToken Address of the token received from the deployment strategy.
    /// @return liquidTokenAmount Amount of the liquid token received.
    function deployAssets() external returns (address, uint256);

    /// @notice Harvests earnings from the strategy, adhering to access controls.
    /// @return token Address of the token received from the harvest.
    /// @return tokenAmount Amount of the token received.
    function harvest() external returns (address, uint256);
}
