// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ITransferStrategy} from "./../interfaces/ITransferStrategy.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {IAggregatorToken} from "./../interfaces/IAggregatorToken.sol";

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC4626.sol";

contract UniformTransferStrategy is ITransferStrategy, AccessControlUpgradeable {

    bytes32 public constant TRANSFERS_MANAGER_ROLE = keccak256("TRANSFERS_MANAGER_ROLE");
    bytes32 public constant LYSADMIN_MANAGER_ROLE = keccak256("LYSADMIN_MANAGER_ROLE");

    IAggregatorToken private aggregatorToken;
    uint256 public constant SCALING_FACTOR = 1e27; // 100%

    event AggregatorTokenSet(address indexed newAggregatorToken);

    function initialize(
        address aggregatorToken_,
        address ownerAddress_
    ) external initializer {
        _checkZeroAddress(aggregatorToken_, "aggregatorToken_");
        _checkZeroAddress(ownerAddress_, "ownerAddress_");

        // Initialize inherited contracts and state
        __AccessControl_init();

        // Grant the roles to the specified owner
        _grantRole(TRANSFERS_MANAGER_ROLE, aggregatorToken_);
        _grantRole(LYSADMIN_MANAGER_ROLE, ownerAddress_);

        // Set aggragator token
        aggregatorToken = IAggregatorToken(aggregatorToken_);
    }

    /**
     * @notice Calculates the proportionate transfer of shares from one user to another.
     * @dev This function computes the amount of shares to transfer from the `from_` user to the `to_` user
     *      based on the input `shares_` and the user's current holdings across multiple vaults. The function
     *      calculates the proportion of shares in each vault that corresponds to the transfer amount and
     *      returns the vault addresses and corresponding shares to be transferred.
     * @param from_ The address of the user transferring the shares.
     * @param shares_ The total number of shares to transfer.
     * @return vaults An array of vault addresses from which the shares will be transferred.
     * @return shares An array of the corresponding shares to be transferred from each vault.
     */
    function executePartialTransferStrategy(
        address from_,
        address,
        uint256 shares_
    ) external view override onlyRole(TRANSFERS_MANAGER_ROLE) returns(address[] memory, uint256[] memory){
        uint256 proportion = shares_ * SCALING_FACTOR / aggregatorToken.balanceOf(from_);

        (address[] memory vaults, uint256[] memory vaultBalances) = aggregatorToken.currentSharesPerVault(from_);
        uint256 vaultsLength = vaults.length;
        uint256[] memory shares = new uint256[](vaultsLength);

        for (uint i = 0; i < vaultsLength; ++i) {
            address vault = vaults[i];
            uint256 vaultBalance = vaultBalances[i];
            if(vaultBalance == 0){
                revert IAggregatorToken.InsufficentSharesPerValut(from_, vaultBalance, vaultBalance);
            }
            uint256 transferAmount = vaultBalance * proportion / SCALING_FACTOR;

            if (transferAmount > 0) {
                shares[i] = transferAmount;
                vaults[i] = vault;
            }
        }

        return(vaults, shares);
    }

    function setAggregatorTokenAddress(address aggregatorToken_) external onlyRole(LYSADMIN_MANAGER_ROLE){
        aggregatorToken = IAggregatorToken(aggregatorToken_);
        emit AggregatorTokenSet(aggregatorToken_);
    }

    /// @dev Internal function to check for zero addresses and revert if necessary.
    function _checkZeroAddress(address variable_, string memory target_) internal pure {
        if (variable_ == address(0)) revert IAggregatorToken.ZeroAddress({target: target_});
    }
}
