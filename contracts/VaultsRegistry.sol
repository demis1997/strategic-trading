// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {UpgradeableBeacon} from "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";
import {BeaconProxy} from "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";

import {Vault} from "./Vault.sol";

import {IVaultsRegistry} from "./interfaces/IVaultsRegistry.sol";
import {IVault} from "./interfaces/IVault.sol";

/// @title A contract for managing vaults and their configurations.
/// @dev Extends AccessControlUpgradeable for role-based permissions.
contract VaultsRegistry is AccessControlUpgradeable, IVaultsRegistry {
    /// @notice The base multiplier for fee calculations, set to 100%.
    uint256 public constant BASE = 100e18;

    /// @notice The default fee rate for the vaults.
    uint256 public defaultFeeRate;

    /// @notice Mapping to track whether a vault is active.
    mapping(address vaults => bool active) public validVaults;

    /// @dev Address of the upgradeable beacon for vault deployment.
    UpgradeableBeacon private _beaconProxyForVault;

    /// @notice Initializes the registry with the default fee rate and vault implementation.
    /// @param defaultFeeRate_ The initial default fee rate.
    /// @param vaultImplementation_ The address of the vault implementation.
    function initialize(
        uint256 defaultFeeRate_,
        address vaultImplementation_
    ) external initializer {
        if (defaultFeeRate_ > BASE) revert DefaultFeeRateError();

        _checkZeroAddress(vaultImplementation_, "vaultImplementation_");

        __AccessControl_init();

        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());

        _beaconProxyForVault = new UpgradeableBeacon(vaultImplementation_, address(this));

        defaultFeeRate = defaultFeeRate_;
    }

    /// @notice Sets a new default fee rate.
    /// @param defaultFeeRate_ The new default fee rate to be set.
    function setDefaultFeeRate(uint256 defaultFeeRate_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (defaultFeeRate_ > BASE) revert DefaultFeeRateError();

        defaultFeeRate = defaultFeeRate_;

        emit DefaultFeeRateSet(defaultFeeRate_);
    }

    /// @notice Updates the vault implementation in the beacon proxy.
    /// @param newImplementation_ The address of the new vault implementation.
    function setVaultImplementation(address newImplementation_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _checkZeroAddress(newImplementation_, "newImplementation_");

        _beaconProxyForVault.upgradeTo(newImplementation_);

        emit VaultImplementationChanged(newImplementation_);
    }

    /// @notice Activates or deactivates a vault.
    /// @param vaultAddress_ The address of the vault.
    /// @param status_ The new status of the vault (active or not).
    function setVaultStatus(address vaultAddress_, bool status_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _checkZeroAddress(vaultAddress_, "vaultAddress_");

        validVaults[vaultAddress_] = status_;

        emit VaultStatusChanged(vaultAddress_, status_);
    }

    /// @notice Deploys a new vault using the beacon proxy.
    /// @param underlyingTokenAddress_ The address of the underlying token.
    /// @param masterTokenAddress_ The address of the master token.
    /// @param ownerAddress_ The address of the owner of the new vault.
    /// @param sharesName_ The name for the shares of the vault.
    /// @param sharesSymbol_ The symbol for the shares of the vault.
    function deployVault(
        address underlyingTokenAddress_,
        address masterTokenAddress_,
        address ownerAddress_,
        string memory sharesName_,
        string memory sharesSymbol_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _checkZeroAddress(underlyingTokenAddress_, "underlyingTokenAddress_");
        _checkZeroAddress(masterTokenAddress_, "masterTokenAddress_");
        _checkZeroAddress(ownerAddress_, "ownerAddress_");
        if (bytes(sharesName_).length == 0) revert("Invalid sharesName");
        if (bytes(sharesSymbol_).length == 0) revert("Invalid sharesSymbol");

        address newVault = address(
            new BeaconProxy(
                address(_beaconProxyForVault),
                abi.encodeWithSelector(
                    IVault.initialize.selector,
                    underlyingTokenAddress_,
                    masterTokenAddress_,
                    address(this),
                    ownerAddress_,
                    sharesName_,
                    sharesSymbol_
                )
            )
        );

        if (newVault == address(0)) revert FailedVaultDeployment();

        validVaults[newVault] = true;

        emit VaultDeployed(newVault);
    }

    /// @notice Returns the address of the beacon proxy.
    function getbeaconProxyAddress() external view onlyRole(DEFAULT_ADMIN_ROLE) returns (address) {        
        return address(_beaconProxyForVault);
    }

    /// @notice Returns the current vault implementation address.
    function getVaultImplementationAddress() external view returns (address) {
        return _beaconProxyForVault.implementation();
    }

    /// @notice Checks if a vault is active.
    /// @param vaultAddress_ The address of the vault.
    /// @return status True if the vault is active, false otherwise.
    function isVaultActive(address vaultAddress_) external view returns (bool) {
        return validVaults[vaultAddress_];
    }

    /// @dev Internal function to check for zero addresses and revert with a custom error.
    /// @param _variable The address to check.
    /// @param _message The error message in case of a zero address.
    function _checkZeroAddress(address _variable, string memory _message) internal pure {
        if (_variable == address(0)) revert ZeroAddress({target: _message});
    }
}
