// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

/// @title A mock contract for managing vaults and their configurations.
contract VaultsRegistryMock {
    /// @notice Mapping to track whether a vault is active.
    mapping(address => bool) public validVaults;

    /// @notice Event emitted when a vault's status is changed.
    event VaultStatusChanged(address indexed vaultAddress, bool status);

    /// @notice Activates or deactivates a vault.
    /// @param vaultAddress_ The address of the vault.
    /// @param status_ The new status of the vault (active or not).
    function setVaultStatus(address vaultAddress_, bool status_) external {
        require(vaultAddress_ != address(0), "vaultAddress_ is zero address");

        validVaults[vaultAddress_] = status_;

        emit VaultStatusChanged(vaultAddress_, status_);
    }

    /// @notice Checks if a vault is active.
    /// @param vaultAddress_ The address of the vault.
    /// @return status True if the vault is active, false otherwise.
    function isVaultActive(address vaultAddress_) external view returns (bool) {
        return validVaults[vaultAddress_];
    }
}
