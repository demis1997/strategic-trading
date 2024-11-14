// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { StrSimpleReStaking } from "../vaultStrategies/StrSimpleReStaking.sol";

contract StrSimpleReStakingV2 is StrSimpleReStaking {
    // added variable
    uint256 public addedVariableStrategyV2;

    // added method
    function addedMethodStrategyV2(uint256 _newValue) external {
        addedVariableStrategyV2 = _newValue;
    }
}
