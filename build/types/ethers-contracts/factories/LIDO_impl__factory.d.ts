import { type ContractRunner } from "ethers";
import type { LIDO_impl, LIDO_implInterface } from "../LIDO_impl";
export declare class LIDO_impl__factory {
    static readonly abi: readonly [{
        readonly constant: false;
        readonly inputs: readonly [];
        readonly name: "resume";
        readonly outputs: readonly [];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "name";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "string";
        }];
        readonly payable: false;
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [];
        readonly name: "stop";
        readonly outputs: readonly [];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "hasInitialized";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bool";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [{
            readonly name: "_spender";
            readonly type: "address";
        }, {
            readonly name: "_amount";
            readonly type: "uint256";
        }];
        readonly name: "approve";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bool";
        }];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "STAKING_CONTROL_ROLE";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "totalSupply";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [{
            readonly name: "_ethAmount";
            readonly type: "uint256";
        }];
        readonly name: "getSharesByPooledEth";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "isStakingPaused";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bool";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [{
            readonly name: "_sender";
            readonly type: "address";
        }, {
            readonly name: "_recipient";
            readonly type: "address";
        }, {
            readonly name: "_amount";
            readonly type: "uint256";
        }];
        readonly name: "transferFrom";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bool";
        }];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [{
            readonly name: "_script";
            readonly type: "bytes";
        }];
        readonly name: "getEVMScriptExecutor";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [{
            readonly name: "_maxStakeLimit";
            readonly type: "uint256";
        }, {
            readonly name: "_stakeLimitIncreasePerBlock";
            readonly type: "uint256";
        }];
        readonly name: "setStakingLimit";
        readonly outputs: readonly [];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "RESUME_ROLE";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [{
            readonly name: "_lidoLocator";
            readonly type: "address";
        }, {
            readonly name: "_eip712StETH";
            readonly type: "address";
        }];
        readonly name: "finalizeUpgrade_v2";
        readonly outputs: readonly [];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "decimals";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint8";
        }];
        readonly payable: false;
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "getRecoveryVault";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "DOMAIN_SEPARATOR";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "getTotalPooledEther";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [{
            readonly name: "_newDepositedValidators";
            readonly type: "uint256";
        }];
        readonly name: "unsafeChangeDepositedValidators";
        readonly outputs: readonly [];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "PAUSE_ROLE";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [{
            readonly name: "_spender";
            readonly type: "address";
        }, {
            readonly name: "_addedValue";
            readonly type: "uint256";
        }];
        readonly name: "increaseAllowance";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bool";
        }];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "getTreasury";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "isStopped";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bool";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "getBufferedEther";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [{
            readonly name: "_lidoLocator";
            readonly type: "address";
        }, {
            readonly name: "_eip712StETH";
            readonly type: "address";
        }];
        readonly name: "initialize";
        readonly outputs: readonly [];
        readonly payable: true;
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [];
        readonly name: "receiveELRewards";
        readonly outputs: readonly [];
        readonly payable: true;
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "getWithdrawalCredentials";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "getCurrentStakeLimit";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "getStakeLimitFullInfo";
        readonly outputs: readonly [{
            readonly name: "isStakingPaused";
            readonly type: "bool";
        }, {
            readonly name: "isStakingLimitSet";
            readonly type: "bool";
        }, {
            readonly name: "currentStakeLimit";
            readonly type: "uint256";
        }, {
            readonly name: "maxStakeLimit";
            readonly type: "uint256";
        }, {
            readonly name: "maxStakeLimitGrowthBlocks";
            readonly type: "uint256";
        }, {
            readonly name: "prevStakeLimit";
            readonly type: "uint256";
        }, {
            readonly name: "prevStakeBlockNumber";
            readonly type: "uint256";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [{
            readonly name: "_sender";
            readonly type: "address";
        }, {
            readonly name: "_recipient";
            readonly type: "address";
        }, {
            readonly name: "_sharesAmount";
            readonly type: "uint256";
        }];
        readonly name: "transferSharesFrom";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [{
            readonly name: "_account";
            readonly type: "address";
        }];
        readonly name: "balanceOf";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [];
        readonly name: "resumeStaking";
        readonly outputs: readonly [];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "getFeeDistribution";
        readonly outputs: readonly [{
            readonly name: "treasuryFeeBasisPoints";
            readonly type: "uint16";
        }, {
            readonly name: "insuranceFeeBasisPoints";
            readonly type: "uint16";
        }, {
            readonly name: "operatorsFeeBasisPoints";
            readonly type: "uint16";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [];
        readonly name: "receiveWithdrawals";
        readonly outputs: readonly [];
        readonly payable: true;
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [{
            readonly name: "_sharesAmount";
            readonly type: "uint256";
        }];
        readonly name: "getPooledEthByShares";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [{
            readonly name: "token";
            readonly type: "address";
        }];
        readonly name: "allowRecoverability";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bool";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [{
            readonly name: "owner";
            readonly type: "address";
        }];
        readonly name: "nonces";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "appId";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "getOracle";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "eip712Domain";
        readonly outputs: readonly [{
            readonly name: "name";
            readonly type: "string";
        }, {
            readonly name: "version";
            readonly type: "string";
        }, {
            readonly name: "chainId";
            readonly type: "uint256";
        }, {
            readonly name: "verifyingContract";
            readonly type: "address";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "getContractVersion";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "getInitializationBlock";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [{
            readonly name: "_recipient";
            readonly type: "address";
        }, {
            readonly name: "_sharesAmount";
            readonly type: "uint256";
        }];
        readonly name: "transferShares";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "symbol";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "string";
        }];
        readonly payable: false;
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "getEIP712StETH";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [{
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "transferToVault";
        readonly outputs: readonly [];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [{
            readonly name: "_sender";
            readonly type: "address";
        }, {
            readonly name: "_role";
            readonly type: "bytes32";
        }, {
            readonly name: "_params";
            readonly type: "uint256[]";
        }];
        readonly name: "canPerform";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bool";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [{
            readonly name: "_referral";
            readonly type: "address";
        }];
        readonly name: "submit";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly payable: true;
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [{
            readonly name: "_spender";
            readonly type: "address";
        }, {
            readonly name: "_subtractedValue";
            readonly type: "uint256";
        }];
        readonly name: "decreaseAllowance";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bool";
        }];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "getEVMScriptRegistry";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [{
            readonly name: "_recipient";
            readonly type: "address";
        }, {
            readonly name: "_amount";
            readonly type: "uint256";
        }];
        readonly name: "transfer";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bool";
        }];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [{
            readonly name: "_maxDepositsCount";
            readonly type: "uint256";
        }, {
            readonly name: "_stakingModuleId";
            readonly type: "uint256";
        }, {
            readonly name: "_depositCalldata";
            readonly type: "bytes";
        }];
        readonly name: "deposit";
        readonly outputs: readonly [];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "UNSAFE_CHANGE_DEPOSITED_VALIDATORS_ROLE";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "getBeaconStat";
        readonly outputs: readonly [{
            readonly name: "depositedValidators";
            readonly type: "uint256";
        }, {
            readonly name: "beaconValidators";
            readonly type: "uint256";
        }, {
            readonly name: "beaconBalance";
            readonly type: "uint256";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [];
        readonly name: "removeStakingLimit";
        readonly outputs: readonly [];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [{
            readonly name: "_reportTimestamp";
            readonly type: "uint256";
        }, {
            readonly name: "_timeElapsed";
            readonly type: "uint256";
        }, {
            readonly name: "_clValidators";
            readonly type: "uint256";
        }, {
            readonly name: "_clBalance";
            readonly type: "uint256";
        }, {
            readonly name: "_withdrawalVaultBalance";
            readonly type: "uint256";
        }, {
            readonly name: "_elRewardsVaultBalance";
            readonly type: "uint256";
        }, {
            readonly name: "_sharesRequestedToBurn";
            readonly type: "uint256";
        }, {
            readonly name: "_withdrawalFinalizationBatches";
            readonly type: "uint256[]";
        }, {
            readonly name: "_simulatedShareRate";
            readonly type: "uint256";
        }];
        readonly name: "handleOracleReport";
        readonly outputs: readonly [{
            readonly name: "postRebaseAmounts";
            readonly type: "uint256[4]";
        }];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "getFee";
        readonly outputs: readonly [{
            readonly name: "totalFee";
            readonly type: "uint16";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "kernel";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "getTotalShares";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [{
            readonly name: "_owner";
            readonly type: "address";
        }, {
            readonly name: "_spender";
            readonly type: "address";
        }, {
            readonly name: "_value";
            readonly type: "uint256";
        }, {
            readonly name: "_deadline";
            readonly type: "uint256";
        }, {
            readonly name: "_v";
            readonly type: "uint8";
        }, {
            readonly name: "_r";
            readonly type: "bytes32";
        }, {
            readonly name: "_s";
            readonly type: "bytes32";
        }];
        readonly name: "permit";
        readonly outputs: readonly [];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [{
            readonly name: "_owner";
            readonly type: "address";
        }, {
            readonly name: "_spender";
            readonly type: "address";
        }];
        readonly name: "allowance";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "isPetrified";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bool";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "getLidoLocator";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "canDeposit";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bool";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "STAKING_PAUSE_ROLE";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "getDepositableEther";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [{
            readonly name: "_account";
            readonly type: "address";
        }];
        readonly name: "sharesOf";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [];
        readonly name: "pauseStaking";
        readonly outputs: readonly [];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "getTotalELRewardsCollected";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly payable: true;
        readonly stateMutability: "payable";
        readonly type: "fallback";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [];
        readonly name: "StakingPaused";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [];
        readonly name: "StakingResumed";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly name: "maxStakeLimit";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly name: "stakeLimitIncreasePerBlock";
            readonly type: "uint256";
        }];
        readonly name: "StakingLimitSet";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [];
        readonly name: "StakingLimitRemoved";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly name: "reportTimestamp";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly name: "preCLValidators";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly name: "postCLValidators";
            readonly type: "uint256";
        }];
        readonly name: "CLValidatorsUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly name: "depositedValidators";
            readonly type: "uint256";
        }];
        readonly name: "DepositedValidatorsChanged";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly name: "reportTimestamp";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly name: "preCLBalance";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly name: "postCLBalance";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly name: "withdrawalsWithdrawn";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly name: "executionLayerRewardsWithdrawn";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly name: "postBufferedEther";
            readonly type: "uint256";
        }];
        readonly name: "ETHDistributed";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly name: "reportTimestamp";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly name: "timeElapsed";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly name: "preTotalShares";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly name: "preTotalEther";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly name: "postTotalShares";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly name: "postTotalEther";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly name: "sharesMintedAsFees";
            readonly type: "uint256";
        }];
        readonly name: "TokenRebased";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly name: "lidoLocator";
            readonly type: "address";
        }];
        readonly name: "LidoLocatorSet";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "ELRewardsReceived";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "WithdrawalsReceived";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly name: "sender";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly name: "amount";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly name: "referral";
            readonly type: "address";
        }];
        readonly name: "Submitted";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "Unbuffered";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly name: "executor";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly name: "script";
            readonly type: "bytes";
        }, {
            readonly indexed: false;
            readonly name: "input";
            readonly type: "bytes";
        }, {
            readonly indexed: false;
            readonly name: "returnData";
            readonly type: "bytes";
        }];
        readonly name: "ScriptResult";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly name: "vault";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "RecoverToVault";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly name: "eip712StETH";
            readonly type: "address";
        }];
        readonly name: "EIP712StETHInitialized";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly name: "sharesValue";
            readonly type: "uint256";
        }];
        readonly name: "TransferShares";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly name: "preRebaseTokenAmount";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly name: "postRebaseTokenAmount";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly name: "sharesAmount";
            readonly type: "uint256";
        }];
        readonly name: "SharesBurnt";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [];
        readonly name: "Stopped";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [];
        readonly name: "Resumed";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "Transfer";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "Approval";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly name: "version";
            readonly type: "uint256";
        }];
        readonly name: "ContractVersionSet";
        readonly type: "event";
    }];
    static createInterface(): LIDO_implInterface;
    static connect(address: string, runner?: ContractRunner | null): LIDO_impl;
}
//# sourceMappingURL=LIDO_impl__factory.d.ts.map