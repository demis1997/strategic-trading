import { type ContractRunner } from "ethers";
import type { RenzoLiquifier, RenzoLiquifierInterface } from "../RenzoLiquifier";
export declare class RenzoLiquifier__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [];
        readonly name: "AlreadyAdded";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ContractPaused";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidTVL";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint8";
            readonly name: "expected";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint8";
            readonly name: "actual";
            readonly type: "uint8";
        }];
        readonly name: "InvalidTokenDecimals";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidZeroInput";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "MaxTokenTVLReached";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NotDepositQueue";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NotDepositWithdrawPauser";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NotFound";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NotRestakeManagerAdmin";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "OperatoDelegatorNotDelegated";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "OverMaxBasisPoints";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "contract IERC20";
            readonly name: "token";
            readonly type: "address";
        }];
        readonly name: "CollateralTokenAdded";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "contract IERC20";
            readonly name: "token";
            readonly type: "address";
        }];
        readonly name: "CollateralTokenRemoved";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "contract IERC20";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "tvl";
            readonly type: "uint256";
        }];
        readonly name: "CollateralTokenTvlUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "depositor";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "contract IERC20";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "ezETHMinted";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "referralId";
            readonly type: "uint256";
        }];
        readonly name: "Deposit";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint8";
            readonly name: "version";
            readonly type: "uint8";
        }];
        readonly name: "Initialized";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "contract IOperatorDelegator";
            readonly name: "od";
            readonly type: "address";
        }];
        readonly name: "OperatorDelegatorAdded";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "contract IOperatorDelegator";
            readonly name: "od";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "allocation";
            readonly type: "uint256";
        }];
        readonly name: "OperatorDelegatorAllocationUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "contract IOperatorDelegator";
            readonly name: "od";
            readonly type: "address";
        }];
        readonly name: "OperatorDelegatorRemoved";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "bytes32";
            readonly name: "withdrawalRoot";
            readonly type: "bytes32";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "withdrawer";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "contract IERC20";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "ezETHBurned";
            readonly type: "uint256";
        }];
        readonly name: "UserWithdrawCompleted";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "bytes32";
            readonly name: "withdrawalRoot";
            readonly type: "bytes32";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "withdrawer";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "contract IERC20";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "ezETHToBurn";
            readonly type: "uint256";
        }];
        readonly name: "UserWithdrawStarted";
        readonly type: "event";
    }, {
        readonly inputs: readonly [];
        readonly name: "_deprecated_maxDepositTVL";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "contract IERC20";
            readonly name: "_newCollateralToken";
            readonly type: "address";
        }];
        readonly name: "addCollateralToken";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "contract IOperatorDelegator";
            readonly name: "_newOperatorDelegator";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "_allocationBasisPoints";
            readonly type: "uint256";
        }];
        readonly name: "addOperatorDelegator";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "calculateTVLs";
        readonly outputs: readonly [{
            readonly internalType: "uint256[][]";
            readonly name: "";
            readonly type: "uint256[][]";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "";
            readonly type: "uint256[]";
        }, {
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256[]";
            readonly name: "tvls";
            readonly type: "uint256[]";
        }, {
            readonly internalType: "uint256";
            readonly name: "totalTVL";
            readonly type: "uint256";
        }];
        readonly name: "chooseOperatorDelegatorForDeposit";
        readonly outputs: readonly [{
            readonly internalType: "contract IOperatorDelegator";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "tokenIndex";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "ezETHValue";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256[][]";
            readonly name: "operatorDelegatorTokenTVLs";
            readonly type: "uint256[][]";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "operatorDelegatorTVLs";
            readonly type: "uint256[]";
        }, {
            readonly internalType: "uint256";
            readonly name: "totalTVL";
            readonly type: "uint256";
        }];
        readonly name: "chooseOperatorDelegatorForWithdraw";
        readonly outputs: readonly [{
            readonly internalType: "contract IOperatorDelegator";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "contract IERC20";
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "collateralTokenTvlLimits";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly name: "collateralTokens";
        readonly outputs: readonly [{
            readonly internalType: "contract IERC20";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "delegationManager";
        readonly outputs: readonly [{
            readonly internalType: "contract IDelegationManager";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "contract IERC20";
            readonly name: "_collateralToken";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "_amount";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "_referralId";
            readonly type: "uint256";
        }];
        readonly name: "deposit";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "contract IERC20";
            readonly name: "_collateralToken";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "_amount";
            readonly type: "uint256";
        }];
        readonly name: "deposit";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "_referralId";
            readonly type: "uint256";
        }];
        readonly name: "depositETH";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "depositETH";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "depositQueue";
        readonly outputs: readonly [{
            readonly internalType: "contract IDepositQueue";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "contract IERC20";
            readonly name: "_token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "_amount";
            readonly type: "uint256";
        }];
        readonly name: "depositTokenRewardsFromProtocol";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "ezETH";
        readonly outputs: readonly [{
            readonly internalType: "contract IEzEthToken";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "contract IERC20";
            readonly name: "_collateralToken";
            readonly type: "address";
        }];
        readonly name: "getCollateralTokenIndex";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getCollateralTokensLength";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getOperatorDelegatorsLength";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "contract IRoleManager";
            readonly name: "_roleManager";
            readonly type: "address";
        }, {
            readonly internalType: "contract IEzEthToken";
            readonly name: "_ezETH";
            readonly type: "address";
        }, {
            readonly internalType: "contract IRenzoOracle";
            readonly name: "_renzoOracle";
            readonly type: "address";
        }, {
            readonly internalType: "contract IStrategyManager";
            readonly name: "_strategyManager";
            readonly type: "address";
        }, {
            readonly internalType: "contract IDelegationManager";
            readonly name: "_delegationManager";
            readonly type: "address";
        }, {
            readonly internalType: "contract IDepositQueue";
            readonly name: "_depositQueue";
            readonly type: "address";
        }];
        readonly name: "initialize";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "contract IOperatorDelegator";
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "operatorDelegatorAllocations";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly name: "operatorDelegators";
        readonly outputs: readonly [{
            readonly internalType: "contract IOperatorDelegator";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "paused";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly name: "pendingWithdrawals";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "ezETHToBurn";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "withdrawer";
            readonly type: "address";
        }, {
            readonly internalType: "contract IERC20";
            readonly name: "tokenToWithdraw";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "tokenAmountToWithdraw";
            readonly type: "uint256";
        }, {
            readonly internalType: "contract IOperatorDelegator";
            readonly name: "operatorDelegator";
            readonly type: "address";
        }, {
            readonly internalType: "bool";
            readonly name: "completed";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "contract IERC20";
            readonly name: "_collateralTokenToRemove";
            readonly type: "address";
        }];
        readonly name: "removeCollateralToken";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "contract IOperatorDelegator";
            readonly name: "_operatorDelegatorToRemove";
            readonly type: "address";
        }];
        readonly name: "removeOperatorDelegator";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "renzoOracle";
        readonly outputs: readonly [{
            readonly internalType: "contract IRenzoOracle";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "roleManager";
        readonly outputs: readonly [{
            readonly internalType: "contract IRoleManager";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "contract IOperatorDelegator";
            readonly name: "_operatorDelegator";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "_allocationBasisPoints";
            readonly type: "uint256";
        }];
        readonly name: "setOperatorDelegatorAllocation";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bool";
            readonly name: "_paused";
            readonly type: "bool";
        }];
        readonly name: "setPaused";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "contract IERC20";
            readonly name: "_token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "_limit";
            readonly type: "uint256";
        }];
        readonly name: "setTokenTvlLimit";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "contract IOperatorDelegator";
            readonly name: "operatorDelegator";
            readonly type: "address";
        }, {
            readonly internalType: "bytes";
            readonly name: "pubkey";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "signature";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes32";
            readonly name: "depositDataRoot";
            readonly type: "bytes32";
        }];
        readonly name: "stakeEthInOperatorDelegator";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "strategyManager";
        readonly outputs: readonly [{
            readonly internalType: "contract IStrategyManager";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): RenzoLiquifierInterface;
    static connect(address: string, runner?: ContractRunner | null): RenzoLiquifier;
}
//# sourceMappingURL=RenzoLiquifier__factory.d.ts.map