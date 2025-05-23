import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "./common";
export interface LIDO_implInterface extends Interface {
    getFunction(nameOrSignature: "resume" | "name" | "stop" | "hasInitialized" | "approve" | "STAKING_CONTROL_ROLE" | "totalSupply" | "getSharesByPooledEth" | "isStakingPaused" | "transferFrom" | "getEVMScriptExecutor" | "setStakingLimit" | "RESUME_ROLE" | "finalizeUpgrade_v2" | "decimals" | "getRecoveryVault" | "DOMAIN_SEPARATOR" | "getTotalPooledEther" | "unsafeChangeDepositedValidators" | "PAUSE_ROLE" | "increaseAllowance" | "getTreasury" | "isStopped" | "getBufferedEther" | "initialize" | "receiveELRewards" | "getWithdrawalCredentials" | "getCurrentStakeLimit" | "getStakeLimitFullInfo" | "transferSharesFrom" | "balanceOf" | "resumeStaking" | "getFeeDistribution" | "receiveWithdrawals" | "getPooledEthByShares" | "allowRecoverability" | "nonces" | "appId" | "getOracle" | "eip712Domain" | "getContractVersion" | "getInitializationBlock" | "transferShares" | "symbol" | "getEIP712StETH" | "transferToVault" | "canPerform" | "submit" | "decreaseAllowance" | "getEVMScriptRegistry" | "transfer" | "deposit" | "UNSAFE_CHANGE_DEPOSITED_VALIDATORS_ROLE" | "getBeaconStat" | "removeStakingLimit" | "handleOracleReport" | "getFee" | "kernel" | "getTotalShares" | "permit" | "allowance" | "isPetrified" | "getLidoLocator" | "canDeposit" | "STAKING_PAUSE_ROLE" | "getDepositableEther" | "sharesOf" | "pauseStaking" | "getTotalELRewardsCollected"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "StakingPaused" | "StakingResumed" | "StakingLimitSet" | "StakingLimitRemoved" | "CLValidatorsUpdated" | "DepositedValidatorsChanged" | "ETHDistributed" | "TokenRebased" | "LidoLocatorSet" | "ELRewardsReceived" | "WithdrawalsReceived" | "Submitted" | "Unbuffered" | "ScriptResult" | "RecoverToVault" | "EIP712StETHInitialized" | "TransferShares" | "SharesBurnt" | "Stopped" | "Resumed" | "Transfer" | "Approval" | "ContractVersionSet"): EventFragment;
    encodeFunctionData(functionFragment: "resume", values?: undefined): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "stop", values?: undefined): string;
    encodeFunctionData(functionFragment: "hasInitialized", values?: undefined): string;
    encodeFunctionData(functionFragment: "approve", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "STAKING_CONTROL_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string;
    encodeFunctionData(functionFragment: "getSharesByPooledEth", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "isStakingPaused", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferFrom", values: [AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getEVMScriptExecutor", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "setStakingLimit", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "RESUME_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "finalizeUpgrade_v2", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
    encodeFunctionData(functionFragment: "getRecoveryVault", values?: undefined): string;
    encodeFunctionData(functionFragment: "DOMAIN_SEPARATOR", values?: undefined): string;
    encodeFunctionData(functionFragment: "getTotalPooledEther", values?: undefined): string;
    encodeFunctionData(functionFragment: "unsafeChangeDepositedValidators", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "PAUSE_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "increaseAllowance", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getTreasury", values?: undefined): string;
    encodeFunctionData(functionFragment: "isStopped", values?: undefined): string;
    encodeFunctionData(functionFragment: "getBufferedEther", values?: undefined): string;
    encodeFunctionData(functionFragment: "initialize", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "receiveELRewards", values?: undefined): string;
    encodeFunctionData(functionFragment: "getWithdrawalCredentials", values?: undefined): string;
    encodeFunctionData(functionFragment: "getCurrentStakeLimit", values?: undefined): string;
    encodeFunctionData(functionFragment: "getStakeLimitFullInfo", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferSharesFrom", values: [AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "resumeStaking", values?: undefined): string;
    encodeFunctionData(functionFragment: "getFeeDistribution", values?: undefined): string;
    encodeFunctionData(functionFragment: "receiveWithdrawals", values?: undefined): string;
    encodeFunctionData(functionFragment: "getPooledEthByShares", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "allowRecoverability", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "nonces", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "appId", values?: undefined): string;
    encodeFunctionData(functionFragment: "getOracle", values?: undefined): string;
    encodeFunctionData(functionFragment: "eip712Domain", values?: undefined): string;
    encodeFunctionData(functionFragment: "getContractVersion", values?: undefined): string;
    encodeFunctionData(functionFragment: "getInitializationBlock", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferShares", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    encodeFunctionData(functionFragment: "getEIP712StETH", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferToVault", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "canPerform", values: [AddressLike, BytesLike, BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "submit", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "decreaseAllowance", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getEVMScriptRegistry", values?: undefined): string;
    encodeFunctionData(functionFragment: "transfer", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "deposit", values: [BigNumberish, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "UNSAFE_CHANGE_DEPOSITED_VALIDATORS_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "getBeaconStat", values?: undefined): string;
    encodeFunctionData(functionFragment: "removeStakingLimit", values?: undefined): string;
    encodeFunctionData(functionFragment: "handleOracleReport", values: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish[],
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "getFee", values?: undefined): string;
    encodeFunctionData(functionFragment: "kernel", values?: undefined): string;
    encodeFunctionData(functionFragment: "getTotalShares", values?: undefined): string;
    encodeFunctionData(functionFragment: "permit", values: [
        AddressLike,
        AddressLike,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BytesLike,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "allowance", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "isPetrified", values?: undefined): string;
    encodeFunctionData(functionFragment: "getLidoLocator", values?: undefined): string;
    encodeFunctionData(functionFragment: "canDeposit", values?: undefined): string;
    encodeFunctionData(functionFragment: "STAKING_PAUSE_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "getDepositableEther", values?: undefined): string;
    encodeFunctionData(functionFragment: "sharesOf", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "pauseStaking", values?: undefined): string;
    encodeFunctionData(functionFragment: "getTotalELRewardsCollected", values?: undefined): string;
    decodeFunctionResult(functionFragment: "resume", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "stop", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasInitialized", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "STAKING_CONTROL_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getSharesByPooledEth", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isStakingPaused", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getEVMScriptExecutor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setStakingLimit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "RESUME_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "finalizeUpgrade_v2", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRecoveryVault", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "DOMAIN_SEPARATOR", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTotalPooledEther", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unsafeChangeDepositedValidators", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "PAUSE_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "increaseAllowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTreasury", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isStopped", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getBufferedEther", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "receiveELRewards", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getWithdrawalCredentials", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCurrentStakeLimit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getStakeLimitFullInfo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferSharesFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "resumeStaking", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getFeeDistribution", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "receiveWithdrawals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPooledEthByShares", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "allowRecoverability", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "appId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getOracle", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "eip712Domain", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getContractVersion", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getInitializationBlock", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferShares", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getEIP712StETH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferToVault", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "canPerform", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "submit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decreaseAllowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getEVMScriptRegistry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "UNSAFE_CHANGE_DEPOSITED_VALIDATORS_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getBeaconStat", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeStakingLimit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "handleOracleReport", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "kernel", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTotalShares", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isPetrified", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getLidoLocator", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "canDeposit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "STAKING_PAUSE_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDepositableEther", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sharesOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pauseStaking", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTotalELRewardsCollected", data: BytesLike): Result;
}
export declare namespace StakingPausedEvent {
    type InputTuple = [];
    type OutputTuple = [];
    interface OutputObject {
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace StakingResumedEvent {
    type InputTuple = [];
    type OutputTuple = [];
    interface OutputObject {
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace StakingLimitSetEvent {
    type InputTuple = [
        maxStakeLimit: BigNumberish,
        stakeLimitIncreasePerBlock: BigNumberish
    ];
    type OutputTuple = [
        maxStakeLimit: bigint,
        stakeLimitIncreasePerBlock: bigint
    ];
    interface OutputObject {
        maxStakeLimit: bigint;
        stakeLimitIncreasePerBlock: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace StakingLimitRemovedEvent {
    type InputTuple = [];
    type OutputTuple = [];
    interface OutputObject {
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace CLValidatorsUpdatedEvent {
    type InputTuple = [
        reportTimestamp: BigNumberish,
        preCLValidators: BigNumberish,
        postCLValidators: BigNumberish
    ];
    type OutputTuple = [
        reportTimestamp: bigint,
        preCLValidators: bigint,
        postCLValidators: bigint
    ];
    interface OutputObject {
        reportTimestamp: bigint;
        preCLValidators: bigint;
        postCLValidators: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace DepositedValidatorsChangedEvent {
    type InputTuple = [depositedValidators: BigNumberish];
    type OutputTuple = [depositedValidators: bigint];
    interface OutputObject {
        depositedValidators: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ETHDistributedEvent {
    type InputTuple = [
        reportTimestamp: BigNumberish,
        preCLBalance: BigNumberish,
        postCLBalance: BigNumberish,
        withdrawalsWithdrawn: BigNumberish,
        executionLayerRewardsWithdrawn: BigNumberish,
        postBufferedEther: BigNumberish
    ];
    type OutputTuple = [
        reportTimestamp: bigint,
        preCLBalance: bigint,
        postCLBalance: bigint,
        withdrawalsWithdrawn: bigint,
        executionLayerRewardsWithdrawn: bigint,
        postBufferedEther: bigint
    ];
    interface OutputObject {
        reportTimestamp: bigint;
        preCLBalance: bigint;
        postCLBalance: bigint;
        withdrawalsWithdrawn: bigint;
        executionLayerRewardsWithdrawn: bigint;
        postBufferedEther: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace TokenRebasedEvent {
    type InputTuple = [
        reportTimestamp: BigNumberish,
        timeElapsed: BigNumberish,
        preTotalShares: BigNumberish,
        preTotalEther: BigNumberish,
        postTotalShares: BigNumberish,
        postTotalEther: BigNumberish,
        sharesMintedAsFees: BigNumberish
    ];
    type OutputTuple = [
        reportTimestamp: bigint,
        timeElapsed: bigint,
        preTotalShares: bigint,
        preTotalEther: bigint,
        postTotalShares: bigint,
        postTotalEther: bigint,
        sharesMintedAsFees: bigint
    ];
    interface OutputObject {
        reportTimestamp: bigint;
        timeElapsed: bigint;
        preTotalShares: bigint;
        preTotalEther: bigint;
        postTotalShares: bigint;
        postTotalEther: bigint;
        sharesMintedAsFees: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace LidoLocatorSetEvent {
    type InputTuple = [lidoLocator: AddressLike];
    type OutputTuple = [lidoLocator: string];
    interface OutputObject {
        lidoLocator: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ELRewardsReceivedEvent {
    type InputTuple = [amount: BigNumberish];
    type OutputTuple = [amount: bigint];
    interface OutputObject {
        amount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace WithdrawalsReceivedEvent {
    type InputTuple = [amount: BigNumberish];
    type OutputTuple = [amount: bigint];
    interface OutputObject {
        amount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace SubmittedEvent {
    type InputTuple = [
        sender: AddressLike,
        amount: BigNumberish,
        referral: AddressLike
    ];
    type OutputTuple = [sender: string, amount: bigint, referral: string];
    interface OutputObject {
        sender: string;
        amount: bigint;
        referral: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace UnbufferedEvent {
    type InputTuple = [amount: BigNumberish];
    type OutputTuple = [amount: bigint];
    interface OutputObject {
        amount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ScriptResultEvent {
    type InputTuple = [
        executor: AddressLike,
        script: BytesLike,
        input: BytesLike,
        returnData: BytesLike
    ];
    type OutputTuple = [
        executor: string,
        script: string,
        input: string,
        returnData: string
    ];
    interface OutputObject {
        executor: string;
        script: string;
        input: string;
        returnData: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace RecoverToVaultEvent {
    type InputTuple = [
        vault: AddressLike,
        token: AddressLike,
        amount: BigNumberish
    ];
    type OutputTuple = [vault: string, token: string, amount: bigint];
    interface OutputObject {
        vault: string;
        token: string;
        amount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace EIP712StETHInitializedEvent {
    type InputTuple = [eip712StETH: AddressLike];
    type OutputTuple = [eip712StETH: string];
    interface OutputObject {
        eip712StETH: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace TransferSharesEvent {
    type InputTuple = [
        from: AddressLike,
        to: AddressLike,
        sharesValue: BigNumberish
    ];
    type OutputTuple = [from: string, to: string, sharesValue: bigint];
    interface OutputObject {
        from: string;
        to: string;
        sharesValue: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace SharesBurntEvent {
    type InputTuple = [
        account: AddressLike,
        preRebaseTokenAmount: BigNumberish,
        postRebaseTokenAmount: BigNumberish,
        sharesAmount: BigNumberish
    ];
    type OutputTuple = [
        account: string,
        preRebaseTokenAmount: bigint,
        postRebaseTokenAmount: bigint,
        sharesAmount: bigint
    ];
    interface OutputObject {
        account: string;
        preRebaseTokenAmount: bigint;
        postRebaseTokenAmount: bigint;
        sharesAmount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace StoppedEvent {
    type InputTuple = [];
    type OutputTuple = [];
    interface OutputObject {
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ResumedEvent {
    type InputTuple = [];
    type OutputTuple = [];
    interface OutputObject {
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace TransferEvent {
    type InputTuple = [
        from: AddressLike,
        to: AddressLike,
        value: BigNumberish
    ];
    type OutputTuple = [from: string, to: string, value: bigint];
    interface OutputObject {
        from: string;
        to: string;
        value: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ApprovalEvent {
    type InputTuple = [
        owner: AddressLike,
        spender: AddressLike,
        value: BigNumberish
    ];
    type OutputTuple = [owner: string, spender: string, value: bigint];
    interface OutputObject {
        owner: string;
        spender: string;
        value: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ContractVersionSetEvent {
    type InputTuple = [version: BigNumberish];
    type OutputTuple = [version: bigint];
    interface OutputObject {
        version: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface LIDO_impl extends BaseContract {
    connect(runner?: ContractRunner | null): LIDO_impl;
    waitForDeployment(): Promise<this>;
    interface: LIDO_implInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    resume: TypedContractMethod<[], [void], "nonpayable">;
    name: TypedContractMethod<[], [string], "view">;
    stop: TypedContractMethod<[], [void], "nonpayable">;
    hasInitialized: TypedContractMethod<[], [boolean], "view">;
    approve: TypedContractMethod<[
        _spender: AddressLike,
        _amount: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    STAKING_CONTROL_ROLE: TypedContractMethod<[], [string], "view">;
    totalSupply: TypedContractMethod<[], [bigint], "view">;
    getSharesByPooledEth: TypedContractMethod<[
        _ethAmount: BigNumberish
    ], [
        bigint
    ], "view">;
    isStakingPaused: TypedContractMethod<[], [boolean], "view">;
    transferFrom: TypedContractMethod<[
        _sender: AddressLike,
        _recipient: AddressLike,
        _amount: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    getEVMScriptExecutor: TypedContractMethod<[
        _script: BytesLike
    ], [
        string
    ], "view">;
    setStakingLimit: TypedContractMethod<[
        _maxStakeLimit: BigNumberish,
        _stakeLimitIncreasePerBlock: BigNumberish
    ], [
        void
    ], "nonpayable">;
    RESUME_ROLE: TypedContractMethod<[], [string], "view">;
    finalizeUpgrade_v2: TypedContractMethod<[
        _lidoLocator: AddressLike,
        _eip712StETH: AddressLike
    ], [
        void
    ], "nonpayable">;
    decimals: TypedContractMethod<[], [bigint], "view">;
    getRecoveryVault: TypedContractMethod<[], [string], "view">;
    DOMAIN_SEPARATOR: TypedContractMethod<[], [string], "view">;
    getTotalPooledEther: TypedContractMethod<[], [bigint], "view">;
    unsafeChangeDepositedValidators: TypedContractMethod<[
        _newDepositedValidators: BigNumberish
    ], [
        void
    ], "nonpayable">;
    PAUSE_ROLE: TypedContractMethod<[], [string], "view">;
    increaseAllowance: TypedContractMethod<[
        _spender: AddressLike,
        _addedValue: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    getTreasury: TypedContractMethod<[], [string], "view">;
    isStopped: TypedContractMethod<[], [boolean], "view">;
    getBufferedEther: TypedContractMethod<[], [bigint], "view">;
    initialize: TypedContractMethod<[
        _lidoLocator: AddressLike,
        _eip712StETH: AddressLike
    ], [
        void
    ], "payable">;
    receiveELRewards: TypedContractMethod<[], [void], "payable">;
    getWithdrawalCredentials: TypedContractMethod<[], [string], "view">;
    getCurrentStakeLimit: TypedContractMethod<[], [bigint], "view">;
    getStakeLimitFullInfo: TypedContractMethod<[
    ], [
        [
            boolean,
            boolean,
            bigint,
            bigint,
            bigint,
            bigint,
            bigint
        ] & {
            isStakingPaused: boolean;
            isStakingLimitSet: boolean;
            currentStakeLimit: bigint;
            maxStakeLimit: bigint;
            maxStakeLimitGrowthBlocks: bigint;
            prevStakeLimit: bigint;
            prevStakeBlockNumber: bigint;
        }
    ], "view">;
    transferSharesFrom: TypedContractMethod<[
        _sender: AddressLike,
        _recipient: AddressLike,
        _sharesAmount: BigNumberish
    ], [
        bigint
    ], "nonpayable">;
    balanceOf: TypedContractMethod<[_account: AddressLike], [bigint], "view">;
    resumeStaking: TypedContractMethod<[], [void], "nonpayable">;
    getFeeDistribution: TypedContractMethod<[
    ], [
        [
            bigint,
            bigint,
            bigint
        ] & {
            treasuryFeeBasisPoints: bigint;
            insuranceFeeBasisPoints: bigint;
            operatorsFeeBasisPoints: bigint;
        }
    ], "view">;
    receiveWithdrawals: TypedContractMethod<[], [void], "payable">;
    getPooledEthByShares: TypedContractMethod<[
        _sharesAmount: BigNumberish
    ], [
        bigint
    ], "view">;
    allowRecoverability: TypedContractMethod<[
        token: AddressLike
    ], [
        boolean
    ], "view">;
    nonces: TypedContractMethod<[owner: AddressLike], [bigint], "view">;
    appId: TypedContractMethod<[], [string], "view">;
    getOracle: TypedContractMethod<[], [string], "view">;
    eip712Domain: TypedContractMethod<[
    ], [
        [
            string,
            string,
            bigint,
            string
        ] & {
            name: string;
            version: string;
            chainId: bigint;
            verifyingContract: string;
        }
    ], "view">;
    getContractVersion: TypedContractMethod<[], [bigint], "view">;
    getInitializationBlock: TypedContractMethod<[], [bigint], "view">;
    transferShares: TypedContractMethod<[
        _recipient: AddressLike,
        _sharesAmount: BigNumberish
    ], [
        bigint
    ], "nonpayable">;
    symbol: TypedContractMethod<[], [string], "view">;
    getEIP712StETH: TypedContractMethod<[], [string], "view">;
    transferToVault: TypedContractMethod<[
        arg0: AddressLike
    ], [
        void
    ], "nonpayable">;
    canPerform: TypedContractMethod<[
        _sender: AddressLike,
        _role: BytesLike,
        _params: BigNumberish[]
    ], [
        boolean
    ], "view">;
    submit: TypedContractMethod<[_referral: AddressLike], [bigint], "payable">;
    decreaseAllowance: TypedContractMethod<[
        _spender: AddressLike,
        _subtractedValue: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    getEVMScriptRegistry: TypedContractMethod<[], [string], "view">;
    transfer: TypedContractMethod<[
        _recipient: AddressLike,
        _amount: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    deposit: TypedContractMethod<[
        _maxDepositsCount: BigNumberish,
        _stakingModuleId: BigNumberish,
        _depositCalldata: BytesLike
    ], [
        void
    ], "nonpayable">;
    UNSAFE_CHANGE_DEPOSITED_VALIDATORS_ROLE: TypedContractMethod<[
    ], [
        string
    ], "view">;
    getBeaconStat: TypedContractMethod<[
    ], [
        [
            bigint,
            bigint,
            bigint
        ] & {
            depositedValidators: bigint;
            beaconValidators: bigint;
            beaconBalance: bigint;
        }
    ], "view">;
    removeStakingLimit: TypedContractMethod<[], [void], "nonpayable">;
    handleOracleReport: TypedContractMethod<[
        _reportTimestamp: BigNumberish,
        _timeElapsed: BigNumberish,
        _clValidators: BigNumberish,
        _clBalance: BigNumberish,
        _withdrawalVaultBalance: BigNumberish,
        _elRewardsVaultBalance: BigNumberish,
        _sharesRequestedToBurn: BigNumberish,
        _withdrawalFinalizationBatches: BigNumberish[],
        _simulatedShareRate: BigNumberish
    ], [
        [bigint, bigint, bigint, bigint]
    ], "nonpayable">;
    getFee: TypedContractMethod<[], [bigint], "view">;
    kernel: TypedContractMethod<[], [string], "view">;
    getTotalShares: TypedContractMethod<[], [bigint], "view">;
    permit: TypedContractMethod<[
        _owner: AddressLike,
        _spender: AddressLike,
        _value: BigNumberish,
        _deadline: BigNumberish,
        _v: BigNumberish,
        _r: BytesLike,
        _s: BytesLike
    ], [
        void
    ], "nonpayable">;
    allowance: TypedContractMethod<[
        _owner: AddressLike,
        _spender: AddressLike
    ], [
        bigint
    ], "view">;
    isPetrified: TypedContractMethod<[], [boolean], "view">;
    getLidoLocator: TypedContractMethod<[], [string], "view">;
    canDeposit: TypedContractMethod<[], [boolean], "view">;
    STAKING_PAUSE_ROLE: TypedContractMethod<[], [string], "view">;
    getDepositableEther: TypedContractMethod<[], [bigint], "view">;
    sharesOf: TypedContractMethod<[_account: AddressLike], [bigint], "view">;
    pauseStaking: TypedContractMethod<[], [void], "nonpayable">;
    getTotalELRewardsCollected: TypedContractMethod<[], [bigint], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "resume"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "name"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "stop"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "hasInitialized"): TypedContractMethod<[], [boolean], "view">;
    getFunction(nameOrSignature: "approve"): TypedContractMethod<[
        _spender: AddressLike,
        _amount: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    getFunction(nameOrSignature: "STAKING_CONTROL_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "totalSupply"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "getSharesByPooledEth"): TypedContractMethod<[_ethAmount: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "isStakingPaused"): TypedContractMethod<[], [boolean], "view">;
    getFunction(nameOrSignature: "transferFrom"): TypedContractMethod<[
        _sender: AddressLike,
        _recipient: AddressLike,
        _amount: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    getFunction(nameOrSignature: "getEVMScriptExecutor"): TypedContractMethod<[_script: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "setStakingLimit"): TypedContractMethod<[
        _maxStakeLimit: BigNumberish,
        _stakeLimitIncreasePerBlock: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "RESUME_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "finalizeUpgrade_v2"): TypedContractMethod<[
        _lidoLocator: AddressLike,
        _eip712StETH: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "decimals"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "getRecoveryVault"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "DOMAIN_SEPARATOR"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "getTotalPooledEther"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "unsafeChangeDepositedValidators"): TypedContractMethod<[
        _newDepositedValidators: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "PAUSE_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "increaseAllowance"): TypedContractMethod<[
        _spender: AddressLike,
        _addedValue: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    getFunction(nameOrSignature: "getTreasury"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "isStopped"): TypedContractMethod<[], [boolean], "view">;
    getFunction(nameOrSignature: "getBufferedEther"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "initialize"): TypedContractMethod<[
        _lidoLocator: AddressLike,
        _eip712StETH: AddressLike
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "receiveELRewards"): TypedContractMethod<[], [void], "payable">;
    getFunction(nameOrSignature: "getWithdrawalCredentials"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "getCurrentStakeLimit"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "getStakeLimitFullInfo"): TypedContractMethod<[
    ], [
        [
            boolean,
            boolean,
            bigint,
            bigint,
            bigint,
            bigint,
            bigint
        ] & {
            isStakingPaused: boolean;
            isStakingLimitSet: boolean;
            currentStakeLimit: bigint;
            maxStakeLimit: bigint;
            maxStakeLimitGrowthBlocks: bigint;
            prevStakeLimit: bigint;
            prevStakeBlockNumber: bigint;
        }
    ], "view">;
    getFunction(nameOrSignature: "transferSharesFrom"): TypedContractMethod<[
        _sender: AddressLike,
        _recipient: AddressLike,
        _sharesAmount: BigNumberish
    ], [
        bigint
    ], "nonpayable">;
    getFunction(nameOrSignature: "balanceOf"): TypedContractMethod<[_account: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "resumeStaking"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "getFeeDistribution"): TypedContractMethod<[
    ], [
        [
            bigint,
            bigint,
            bigint
        ] & {
            treasuryFeeBasisPoints: bigint;
            insuranceFeeBasisPoints: bigint;
            operatorsFeeBasisPoints: bigint;
        }
    ], "view">;
    getFunction(nameOrSignature: "receiveWithdrawals"): TypedContractMethod<[], [void], "payable">;
    getFunction(nameOrSignature: "getPooledEthByShares"): TypedContractMethod<[_sharesAmount: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "allowRecoverability"): TypedContractMethod<[token: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "nonces"): TypedContractMethod<[owner: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "appId"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "getOracle"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "eip712Domain"): TypedContractMethod<[
    ], [
        [
            string,
            string,
            bigint,
            string
        ] & {
            name: string;
            version: string;
            chainId: bigint;
            verifyingContract: string;
        }
    ], "view">;
    getFunction(nameOrSignature: "getContractVersion"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "getInitializationBlock"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "transferShares"): TypedContractMethod<[
        _recipient: AddressLike,
        _sharesAmount: BigNumberish
    ], [
        bigint
    ], "nonpayable">;
    getFunction(nameOrSignature: "symbol"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "getEIP712StETH"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "transferToVault"): TypedContractMethod<[arg0: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "canPerform"): TypedContractMethod<[
        _sender: AddressLike,
        _role: BytesLike,
        _params: BigNumberish[]
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "submit"): TypedContractMethod<[_referral: AddressLike], [bigint], "payable">;
    getFunction(nameOrSignature: "decreaseAllowance"): TypedContractMethod<[
        _spender: AddressLike,
        _subtractedValue: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    getFunction(nameOrSignature: "getEVMScriptRegistry"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "transfer"): TypedContractMethod<[
        _recipient: AddressLike,
        _amount: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    getFunction(nameOrSignature: "deposit"): TypedContractMethod<[
        _maxDepositsCount: BigNumberish,
        _stakingModuleId: BigNumberish,
        _depositCalldata: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "UNSAFE_CHANGE_DEPOSITED_VALIDATORS_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "getBeaconStat"): TypedContractMethod<[
    ], [
        [
            bigint,
            bigint,
            bigint
        ] & {
            depositedValidators: bigint;
            beaconValidators: bigint;
            beaconBalance: bigint;
        }
    ], "view">;
    getFunction(nameOrSignature: "removeStakingLimit"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "handleOracleReport"): TypedContractMethod<[
        _reportTimestamp: BigNumberish,
        _timeElapsed: BigNumberish,
        _clValidators: BigNumberish,
        _clBalance: BigNumberish,
        _withdrawalVaultBalance: BigNumberish,
        _elRewardsVaultBalance: BigNumberish,
        _sharesRequestedToBurn: BigNumberish,
        _withdrawalFinalizationBatches: BigNumberish[],
        _simulatedShareRate: BigNumberish
    ], [
        [bigint, bigint, bigint, bigint]
    ], "nonpayable">;
    getFunction(nameOrSignature: "getFee"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "kernel"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "getTotalShares"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "permit"): TypedContractMethod<[
        _owner: AddressLike,
        _spender: AddressLike,
        _value: BigNumberish,
        _deadline: BigNumberish,
        _v: BigNumberish,
        _r: BytesLike,
        _s: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "allowance"): TypedContractMethod<[
        _owner: AddressLike,
        _spender: AddressLike
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "isPetrified"): TypedContractMethod<[], [boolean], "view">;
    getFunction(nameOrSignature: "getLidoLocator"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "canDeposit"): TypedContractMethod<[], [boolean], "view">;
    getFunction(nameOrSignature: "STAKING_PAUSE_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "getDepositableEther"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "sharesOf"): TypedContractMethod<[_account: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "pauseStaking"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "getTotalELRewardsCollected"): TypedContractMethod<[], [bigint], "view">;
    getEvent(key: "StakingPaused"): TypedContractEvent<StakingPausedEvent.InputTuple, StakingPausedEvent.OutputTuple, StakingPausedEvent.OutputObject>;
    getEvent(key: "StakingResumed"): TypedContractEvent<StakingResumedEvent.InputTuple, StakingResumedEvent.OutputTuple, StakingResumedEvent.OutputObject>;
    getEvent(key: "StakingLimitSet"): TypedContractEvent<StakingLimitSetEvent.InputTuple, StakingLimitSetEvent.OutputTuple, StakingLimitSetEvent.OutputObject>;
    getEvent(key: "StakingLimitRemoved"): TypedContractEvent<StakingLimitRemovedEvent.InputTuple, StakingLimitRemovedEvent.OutputTuple, StakingLimitRemovedEvent.OutputObject>;
    getEvent(key: "CLValidatorsUpdated"): TypedContractEvent<CLValidatorsUpdatedEvent.InputTuple, CLValidatorsUpdatedEvent.OutputTuple, CLValidatorsUpdatedEvent.OutputObject>;
    getEvent(key: "DepositedValidatorsChanged"): TypedContractEvent<DepositedValidatorsChangedEvent.InputTuple, DepositedValidatorsChangedEvent.OutputTuple, DepositedValidatorsChangedEvent.OutputObject>;
    getEvent(key: "ETHDistributed"): TypedContractEvent<ETHDistributedEvent.InputTuple, ETHDistributedEvent.OutputTuple, ETHDistributedEvent.OutputObject>;
    getEvent(key: "TokenRebased"): TypedContractEvent<TokenRebasedEvent.InputTuple, TokenRebasedEvent.OutputTuple, TokenRebasedEvent.OutputObject>;
    getEvent(key: "LidoLocatorSet"): TypedContractEvent<LidoLocatorSetEvent.InputTuple, LidoLocatorSetEvent.OutputTuple, LidoLocatorSetEvent.OutputObject>;
    getEvent(key: "ELRewardsReceived"): TypedContractEvent<ELRewardsReceivedEvent.InputTuple, ELRewardsReceivedEvent.OutputTuple, ELRewardsReceivedEvent.OutputObject>;
    getEvent(key: "WithdrawalsReceived"): TypedContractEvent<WithdrawalsReceivedEvent.InputTuple, WithdrawalsReceivedEvent.OutputTuple, WithdrawalsReceivedEvent.OutputObject>;
    getEvent(key: "Submitted"): TypedContractEvent<SubmittedEvent.InputTuple, SubmittedEvent.OutputTuple, SubmittedEvent.OutputObject>;
    getEvent(key: "Unbuffered"): TypedContractEvent<UnbufferedEvent.InputTuple, UnbufferedEvent.OutputTuple, UnbufferedEvent.OutputObject>;
    getEvent(key: "ScriptResult"): TypedContractEvent<ScriptResultEvent.InputTuple, ScriptResultEvent.OutputTuple, ScriptResultEvent.OutputObject>;
    getEvent(key: "RecoverToVault"): TypedContractEvent<RecoverToVaultEvent.InputTuple, RecoverToVaultEvent.OutputTuple, RecoverToVaultEvent.OutputObject>;
    getEvent(key: "EIP712StETHInitialized"): TypedContractEvent<EIP712StETHInitializedEvent.InputTuple, EIP712StETHInitializedEvent.OutputTuple, EIP712StETHInitializedEvent.OutputObject>;
    getEvent(key: "TransferShares"): TypedContractEvent<TransferSharesEvent.InputTuple, TransferSharesEvent.OutputTuple, TransferSharesEvent.OutputObject>;
    getEvent(key: "SharesBurnt"): TypedContractEvent<SharesBurntEvent.InputTuple, SharesBurntEvent.OutputTuple, SharesBurntEvent.OutputObject>;
    getEvent(key: "Stopped"): TypedContractEvent<StoppedEvent.InputTuple, StoppedEvent.OutputTuple, StoppedEvent.OutputObject>;
    getEvent(key: "Resumed"): TypedContractEvent<ResumedEvent.InputTuple, ResumedEvent.OutputTuple, ResumedEvent.OutputObject>;
    getEvent(key: "Transfer"): TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
    getEvent(key: "Approval"): TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
    getEvent(key: "ContractVersionSet"): TypedContractEvent<ContractVersionSetEvent.InputTuple, ContractVersionSetEvent.OutputTuple, ContractVersionSetEvent.OutputObject>;
    filters: {
        "StakingPaused()": TypedContractEvent<StakingPausedEvent.InputTuple, StakingPausedEvent.OutputTuple, StakingPausedEvent.OutputObject>;
        StakingPaused: TypedContractEvent<StakingPausedEvent.InputTuple, StakingPausedEvent.OutputTuple, StakingPausedEvent.OutputObject>;
        "StakingResumed()": TypedContractEvent<StakingResumedEvent.InputTuple, StakingResumedEvent.OutputTuple, StakingResumedEvent.OutputObject>;
        StakingResumed: TypedContractEvent<StakingResumedEvent.InputTuple, StakingResumedEvent.OutputTuple, StakingResumedEvent.OutputObject>;
        "StakingLimitSet(uint256,uint256)": TypedContractEvent<StakingLimitSetEvent.InputTuple, StakingLimitSetEvent.OutputTuple, StakingLimitSetEvent.OutputObject>;
        StakingLimitSet: TypedContractEvent<StakingLimitSetEvent.InputTuple, StakingLimitSetEvent.OutputTuple, StakingLimitSetEvent.OutputObject>;
        "StakingLimitRemoved()": TypedContractEvent<StakingLimitRemovedEvent.InputTuple, StakingLimitRemovedEvent.OutputTuple, StakingLimitRemovedEvent.OutputObject>;
        StakingLimitRemoved: TypedContractEvent<StakingLimitRemovedEvent.InputTuple, StakingLimitRemovedEvent.OutputTuple, StakingLimitRemovedEvent.OutputObject>;
        "CLValidatorsUpdated(uint256,uint256,uint256)": TypedContractEvent<CLValidatorsUpdatedEvent.InputTuple, CLValidatorsUpdatedEvent.OutputTuple, CLValidatorsUpdatedEvent.OutputObject>;
        CLValidatorsUpdated: TypedContractEvent<CLValidatorsUpdatedEvent.InputTuple, CLValidatorsUpdatedEvent.OutputTuple, CLValidatorsUpdatedEvent.OutputObject>;
        "DepositedValidatorsChanged(uint256)": TypedContractEvent<DepositedValidatorsChangedEvent.InputTuple, DepositedValidatorsChangedEvent.OutputTuple, DepositedValidatorsChangedEvent.OutputObject>;
        DepositedValidatorsChanged: TypedContractEvent<DepositedValidatorsChangedEvent.InputTuple, DepositedValidatorsChangedEvent.OutputTuple, DepositedValidatorsChangedEvent.OutputObject>;
        "ETHDistributed(uint256,uint256,uint256,uint256,uint256,uint256)": TypedContractEvent<ETHDistributedEvent.InputTuple, ETHDistributedEvent.OutputTuple, ETHDistributedEvent.OutputObject>;
        ETHDistributed: TypedContractEvent<ETHDistributedEvent.InputTuple, ETHDistributedEvent.OutputTuple, ETHDistributedEvent.OutputObject>;
        "TokenRebased(uint256,uint256,uint256,uint256,uint256,uint256,uint256)": TypedContractEvent<TokenRebasedEvent.InputTuple, TokenRebasedEvent.OutputTuple, TokenRebasedEvent.OutputObject>;
        TokenRebased: TypedContractEvent<TokenRebasedEvent.InputTuple, TokenRebasedEvent.OutputTuple, TokenRebasedEvent.OutputObject>;
        "LidoLocatorSet(address)": TypedContractEvent<LidoLocatorSetEvent.InputTuple, LidoLocatorSetEvent.OutputTuple, LidoLocatorSetEvent.OutputObject>;
        LidoLocatorSet: TypedContractEvent<LidoLocatorSetEvent.InputTuple, LidoLocatorSetEvent.OutputTuple, LidoLocatorSetEvent.OutputObject>;
        "ELRewardsReceived(uint256)": TypedContractEvent<ELRewardsReceivedEvent.InputTuple, ELRewardsReceivedEvent.OutputTuple, ELRewardsReceivedEvent.OutputObject>;
        ELRewardsReceived: TypedContractEvent<ELRewardsReceivedEvent.InputTuple, ELRewardsReceivedEvent.OutputTuple, ELRewardsReceivedEvent.OutputObject>;
        "WithdrawalsReceived(uint256)": TypedContractEvent<WithdrawalsReceivedEvent.InputTuple, WithdrawalsReceivedEvent.OutputTuple, WithdrawalsReceivedEvent.OutputObject>;
        WithdrawalsReceived: TypedContractEvent<WithdrawalsReceivedEvent.InputTuple, WithdrawalsReceivedEvent.OutputTuple, WithdrawalsReceivedEvent.OutputObject>;
        "Submitted(address,uint256,address)": TypedContractEvent<SubmittedEvent.InputTuple, SubmittedEvent.OutputTuple, SubmittedEvent.OutputObject>;
        Submitted: TypedContractEvent<SubmittedEvent.InputTuple, SubmittedEvent.OutputTuple, SubmittedEvent.OutputObject>;
        "Unbuffered(uint256)": TypedContractEvent<UnbufferedEvent.InputTuple, UnbufferedEvent.OutputTuple, UnbufferedEvent.OutputObject>;
        Unbuffered: TypedContractEvent<UnbufferedEvent.InputTuple, UnbufferedEvent.OutputTuple, UnbufferedEvent.OutputObject>;
        "ScriptResult(address,bytes,bytes,bytes)": TypedContractEvent<ScriptResultEvent.InputTuple, ScriptResultEvent.OutputTuple, ScriptResultEvent.OutputObject>;
        ScriptResult: TypedContractEvent<ScriptResultEvent.InputTuple, ScriptResultEvent.OutputTuple, ScriptResultEvent.OutputObject>;
        "RecoverToVault(address,address,uint256)": TypedContractEvent<RecoverToVaultEvent.InputTuple, RecoverToVaultEvent.OutputTuple, RecoverToVaultEvent.OutputObject>;
        RecoverToVault: TypedContractEvent<RecoverToVaultEvent.InputTuple, RecoverToVaultEvent.OutputTuple, RecoverToVaultEvent.OutputObject>;
        "EIP712StETHInitialized(address)": TypedContractEvent<EIP712StETHInitializedEvent.InputTuple, EIP712StETHInitializedEvent.OutputTuple, EIP712StETHInitializedEvent.OutputObject>;
        EIP712StETHInitialized: TypedContractEvent<EIP712StETHInitializedEvent.InputTuple, EIP712StETHInitializedEvent.OutputTuple, EIP712StETHInitializedEvent.OutputObject>;
        "TransferShares(address,address,uint256)": TypedContractEvent<TransferSharesEvent.InputTuple, TransferSharesEvent.OutputTuple, TransferSharesEvent.OutputObject>;
        TransferShares: TypedContractEvent<TransferSharesEvent.InputTuple, TransferSharesEvent.OutputTuple, TransferSharesEvent.OutputObject>;
        "SharesBurnt(address,uint256,uint256,uint256)": TypedContractEvent<SharesBurntEvent.InputTuple, SharesBurntEvent.OutputTuple, SharesBurntEvent.OutputObject>;
        SharesBurnt: TypedContractEvent<SharesBurntEvent.InputTuple, SharesBurntEvent.OutputTuple, SharesBurntEvent.OutputObject>;
        "Stopped()": TypedContractEvent<StoppedEvent.InputTuple, StoppedEvent.OutputTuple, StoppedEvent.OutputObject>;
        Stopped: TypedContractEvent<StoppedEvent.InputTuple, StoppedEvent.OutputTuple, StoppedEvent.OutputObject>;
        "Resumed()": TypedContractEvent<ResumedEvent.InputTuple, ResumedEvent.OutputTuple, ResumedEvent.OutputObject>;
        Resumed: TypedContractEvent<ResumedEvent.InputTuple, ResumedEvent.OutputTuple, ResumedEvent.OutputObject>;
        "Transfer(address,address,uint256)": TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
        Transfer: TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
        "Approval(address,address,uint256)": TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
        Approval: TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
        "ContractVersionSet(uint256)": TypedContractEvent<ContractVersionSetEvent.InputTuple, ContractVersionSetEvent.OutputTuple, ContractVersionSetEvent.OutputObject>;
        ContractVersionSet: TypedContractEvent<ContractVersionSetEvent.InputTuple, ContractVersionSetEvent.OutputTuple, ContractVersionSetEvent.OutputObject>;
    };
}
//# sourceMappingURL=LIDO_impl.d.ts.map