// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IVaultsRegistry {
    /// @notice Event emitted when the default fee rate is set.
    event DefaultFeeRateSet(uint256 newFeeRate);

    /// @notice Event emitted when the vault implementation is modified.
    event VaultImplementationChanged(address newImplementation);

    /// @notice Event emitted when the status of a vault is modified.
    event VaultStatusChanged(address vaultAddress, bool status);

    /// @notice Event emitted when a new vault is deployed.
    event VaultDeployed(address vault);

    /// @notice Error thrown when a default fee rate exceeds the BASE value.
    error DefaultFeeRateError();

    /// @notice Error indicating a failure in deploying a vault.
    error FailedVaultDeployment();

    /// @notice Error thrown when an address provided is zero.
    error ZeroAddress(string target);

    /// @notice Function to retrieve if vault is valid
    function isVaultActive(address vaultAddress_) external view returns (bool);
}
