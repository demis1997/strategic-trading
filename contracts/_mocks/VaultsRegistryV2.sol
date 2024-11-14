// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {VaultsRegistry} from "../VaultsRegistry.sol";

contract VaultsRegistryV2 is VaultsRegistry {
    // added variable
    uint256 public addedVariableRegistryV2;

    // added method
    function addedMethodRegistryV2(uint256 _newValue) external {
        addedVariableRegistryV2 = _newValue;
    }
}
