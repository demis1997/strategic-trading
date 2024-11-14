// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Vault} from "../Vault.sol";

contract VaultV2 is Vault {
    // added variable
    uint256 public addedVariableVaultV2;

    // added method
    function addedMethodVaultV2(uint256 _newValue) external {
        addedVariableVaultV2 = _newValue;
    }
}
