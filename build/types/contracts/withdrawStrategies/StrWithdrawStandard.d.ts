import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export interface StrWithdrawStandardInterface extends Interface {
    getFunction(nameOrSignature: "DEFAULT_ADMIN_ROLE" | "REVERT_MSG" | "VAULT_MANAGER_ROLE" | "WITHDRAW_ADAPTERS_QTY" | "adaptersDeployPath" | "adaptersWithdrawPath" | "deployedAssetsValue" | "executeWithdrawStrategy" | "getRoleAdmin" | "getTokenPrice" | "grantRole" | "hasRole" | "initialize" | "liquidTokenAddress" | "pause" | "paused" | "priceFeedPerToken" | "renounceRole" | "revokeRole" | "setAdaptersWithdrawPath" | "setLiquidTokenAddress" | "setPriceFeedPerToken" | "setStrategyName" | "setVaultAddress" | "setWithdrawStrategyAddress" | "setWrappedLiquidTokenAddress" | "strategyName" | "supportsInterface" | "unpause" | "vaultAddress" | "vaultStrategyAddress" | "withdrawStrategyAddress" | "wrappedLiquidTokenAddress"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AdaptersDeployPathSet" | "AdaptersWithdrawPathSet" | "Initialized" | "LiquidTokenSet" | "Paused" | "PriceFeedSet" | "RoleAdminChanged" | "RoleGranted" | "RoleRevoked" | "StrategyNameSet" | "TokenWrapperSet" | "Unpaused" | "VaultAddressSet" | "WithdrawStrategyAddressSet" | "WithdrawStrategyExecuted"): EventFragment;
    encodeFunctionData(functionFragment: "DEFAULT_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "REVERT_MSG", values?: undefined): string;
    encodeFunctionData(functionFragment: "VAULT_MANAGER_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "WITHDRAW_ADAPTERS_QTY", values?: undefined): string;
    encodeFunctionData(functionFragment: "adaptersDeployPath", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "adaptersWithdrawPath", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "deployedAssetsValue", values?: undefined): string;
    encodeFunctionData(functionFragment: "executeWithdrawStrategy", values: [AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getRoleAdmin", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "getTokenPrice", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "grantRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "hasRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "initialize", values: [AddressLike, AddressLike, AddressLike[], AddressLike, string]): string;
    encodeFunctionData(functionFragment: "liquidTokenAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "pause", values?: undefined): string;
    encodeFunctionData(functionFragment: "paused", values?: undefined): string;
    encodeFunctionData(functionFragment: "priceFeedPerToken", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "renounceRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "revokeRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "setAdaptersWithdrawPath", values: [AddressLike[]]): string;
    encodeFunctionData(functionFragment: "setLiquidTokenAddress", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setPriceFeedPerToken", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "setStrategyName", values: [string]): string;
    encodeFunctionData(functionFragment: "setVaultAddress", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setWithdrawStrategyAddress", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setWrappedLiquidTokenAddress", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "strategyName", values?: undefined): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
    encodeFunctionData(functionFragment: "vaultAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "vaultStrategyAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "withdrawStrategyAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "wrappedLiquidTokenAddress", values?: undefined): string;
    decodeFunctionResult(functionFragment: "DEFAULT_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "REVERT_MSG", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "VAULT_MANAGER_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "WITHDRAW_ADAPTERS_QTY", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "adaptersDeployPath", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "adaptersWithdrawPath", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deployedAssetsValue", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "executeWithdrawStrategy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTokenPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "liquidTokenAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "priceFeedPerToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setAdaptersWithdrawPath", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setLiquidTokenAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setPriceFeedPerToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setStrategyName", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setVaultAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setWithdrawStrategyAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setWrappedLiquidTokenAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "strategyName", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "vaultAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "vaultStrategyAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawStrategyAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "wrappedLiquidTokenAddress", data: BytesLike): Result;
}
export declare namespace AdaptersDeployPathSetEvent {
    type InputTuple = [newDeployPath: AddressLike[]];
    type OutputTuple = [newDeployPath: string[]];
    interface OutputObject {
        newDeployPath: string[];
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace AdaptersWithdrawPathSetEvent {
    type InputTuple = [newWithdrawPath: AddressLike[]];
    type OutputTuple = [newWithdrawPath: string[]];
    interface OutputObject {
        newWithdrawPath: string[];
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace InitializedEvent {
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
export declare namespace LiquidTokenSetEvent {
    type InputTuple = [arg0: AddressLike];
    type OutputTuple = [arg0: string];
    interface OutputObject {
        arg0: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace PausedEvent {
    type InputTuple = [account: AddressLike];
    type OutputTuple = [account: string];
    interface OutputObject {
        account: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace PriceFeedSetEvent {
    type InputTuple = [token: AddressLike, priceFeed: AddressLike];
    type OutputTuple = [token: string, priceFeed: string];
    interface OutputObject {
        token: string;
        priceFeed: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace RoleAdminChangedEvent {
    type InputTuple = [
        role: BytesLike,
        previousAdminRole: BytesLike,
        newAdminRole: BytesLike
    ];
    type OutputTuple = [
        role: string,
        previousAdminRole: string,
        newAdminRole: string
    ];
    interface OutputObject {
        role: string;
        previousAdminRole: string;
        newAdminRole: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace RoleGrantedEvent {
    type InputTuple = [
        role: BytesLike,
        account: AddressLike,
        sender: AddressLike
    ];
    type OutputTuple = [role: string, account: string, sender: string];
    interface OutputObject {
        role: string;
        account: string;
        sender: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace RoleRevokedEvent {
    type InputTuple = [
        role: BytesLike,
        account: AddressLike,
        sender: AddressLike
    ];
    type OutputTuple = [role: string, account: string, sender: string];
    interface OutputObject {
        role: string;
        account: string;
        sender: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace StrategyNameSetEvent {
    type InputTuple = [name: string];
    type OutputTuple = [name: string];
    interface OutputObject {
        name: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace TokenWrapperSetEvent {
    type InputTuple = [arg0: AddressLike];
    type OutputTuple = [arg0: string];
    interface OutputObject {
        arg0: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace UnpausedEvent {
    type InputTuple = [account: AddressLike];
    type OutputTuple = [account: string];
    interface OutputObject {
        account: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace VaultAddressSetEvent {
    type InputTuple = [vaultAddress: AddressLike];
    type OutputTuple = [vaultAddress: string];
    interface OutputObject {
        vaultAddress: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace WithdrawStrategyAddressSetEvent {
    type InputTuple = [strategyAddress: AddressLike];
    type OutputTuple = [strategyAddress: string];
    interface OutputObject {
        strategyAddress: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace WithdrawStrategyExecutedEvent {
    type InputTuple = [
        receiver: AddressLike,
        asset: AddressLike,
        assetsAmount: BigNumberish
    ];
    type OutputTuple = [
        receiver: string,
        asset: string,
        assetsAmount: bigint
    ];
    interface OutputObject {
        receiver: string;
        asset: string;
        assetsAmount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface StrWithdrawStandard extends BaseContract {
    connect(runner?: ContractRunner | null): StrWithdrawStandard;
    waitForDeployment(): Promise<this>;
    interface: StrWithdrawStandardInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    DEFAULT_ADMIN_ROLE: TypedContractMethod<[], [string], "view">;
    REVERT_MSG: TypedContractMethod<[], [string], "view">;
    VAULT_MANAGER_ROLE: TypedContractMethod<[], [string], "view">;
    WITHDRAW_ADAPTERS_QTY: TypedContractMethod<[], [bigint], "view">;
    adaptersDeployPath: TypedContractMethod<[
        arg0: BigNumberish
    ], [
        string
    ], "view">;
    adaptersWithdrawPath: TypedContractMethod<[
        arg0: BigNumberish
    ], [
        string
    ], "view">;
    deployedAssetsValue: TypedContractMethod<[], [bigint], "view">;
    executeWithdrawStrategy: TypedContractMethod<[
        arg0: AddressLike,
        arg1: AddressLike,
        arg2: BigNumberish
    ], [
        [string, bigint]
    ], "nonpayable">;
    getRoleAdmin: TypedContractMethod<[role: BytesLike], [string], "view">;
    getTokenPrice: TypedContractMethod<[
        token_: AddressLike,
        source_: BigNumberish
    ], [
        bigint
    ], "view">;
    grantRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    hasRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        boolean
    ], "view">;
    initialize: TypedContractMethod<[
        vaultAddress_: AddressLike,
        liquidTokenAddress_: AddressLike,
        adaptersWithdrawPath_: AddressLike[],
        vaultStrategyAddress_: AddressLike,
        strategyName_: string
    ], [
        void
    ], "nonpayable">;
    liquidTokenAddress: TypedContractMethod<[], [string], "view">;
    pause: TypedContractMethod<[], [void], "nonpayable">;
    paused: TypedContractMethod<[], [boolean], "view">;
    priceFeedPerToken: TypedContractMethod<[
        token: AddressLike
    ], [
        string
    ], "view">;
    renounceRole: TypedContractMethod<[
        role: BytesLike,
        callerConfirmation: AddressLike
    ], [
        void
    ], "nonpayable">;
    revokeRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    setAdaptersWithdrawPath: TypedContractMethod<[
        adaptersWithdrawPath_: AddressLike[]
    ], [
        void
    ], "nonpayable">;
    setLiquidTokenAddress: TypedContractMethod<[
        liquidTokenAddress_: AddressLike
    ], [
        void
    ], "nonpayable">;
    setPriceFeedPerToken: TypedContractMethod<[
        token_: AddressLike,
        feed_: AddressLike
    ], [
        void
    ], "nonpayable">;
    setStrategyName: TypedContractMethod<[
        strategyName_: string
    ], [
        void
    ], "nonpayable">;
    setVaultAddress: TypedContractMethod<[
        vaultAddress_: AddressLike
    ], [
        void
    ], "nonpayable">;
    setWithdrawStrategyAddress: TypedContractMethod<[
        withdrawStrategyAddress_: AddressLike
    ], [
        void
    ], "nonpayable">;
    setWrappedLiquidTokenAddress: TypedContractMethod<[
        wrappedLiquidTokenAddress_: AddressLike
    ], [
        void
    ], "nonpayable">;
    strategyName: TypedContractMethod<[], [string], "view">;
    supportsInterface: TypedContractMethod<[
        interfaceId: BytesLike
    ], [
        boolean
    ], "view">;
    unpause: TypedContractMethod<[], [void], "nonpayable">;
    vaultAddress: TypedContractMethod<[], [string], "view">;
    vaultStrategyAddress: TypedContractMethod<[], [string], "view">;
    withdrawStrategyAddress: TypedContractMethod<[], [string], "view">;
    wrappedLiquidTokenAddress: TypedContractMethod<[], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "DEFAULT_ADMIN_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "REVERT_MSG"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "VAULT_MANAGER_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "WITHDRAW_ADAPTERS_QTY"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "adaptersDeployPath"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "adaptersWithdrawPath"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "deployedAssetsValue"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "executeWithdrawStrategy"): TypedContractMethod<[
        arg0: AddressLike,
        arg1: AddressLike,
        arg2: BigNumberish
    ], [
        [string, bigint]
    ], "nonpayable">;
    getFunction(nameOrSignature: "getRoleAdmin"): TypedContractMethod<[role: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "getTokenPrice"): TypedContractMethod<[
        token_: AddressLike,
        source_: BigNumberish
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "grantRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "hasRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "initialize"): TypedContractMethod<[
        vaultAddress_: AddressLike,
        liquidTokenAddress_: AddressLike,
        adaptersWithdrawPath_: AddressLike[],
        vaultStrategyAddress_: AddressLike,
        strategyName_: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "liquidTokenAddress"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "pause"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "paused"): TypedContractMethod<[], [boolean], "view">;
    getFunction(nameOrSignature: "priceFeedPerToken"): TypedContractMethod<[token: AddressLike], [string], "view">;
    getFunction(nameOrSignature: "renounceRole"): TypedContractMethod<[
        role: BytesLike,
        callerConfirmation: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "revokeRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setAdaptersWithdrawPath"): TypedContractMethod<[
        adaptersWithdrawPath_: AddressLike[]
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setLiquidTokenAddress"): TypedContractMethod<[
        liquidTokenAddress_: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setPriceFeedPerToken"): TypedContractMethod<[
        token_: AddressLike,
        feed_: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setStrategyName"): TypedContractMethod<[strategyName_: string], [void], "nonpayable">;
    getFunction(nameOrSignature: "setVaultAddress"): TypedContractMethod<[vaultAddress_: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "setWithdrawStrategyAddress"): TypedContractMethod<[
        withdrawStrategyAddress_: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setWrappedLiquidTokenAddress"): TypedContractMethod<[
        wrappedLiquidTokenAddress_: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "strategyName"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "unpause"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "vaultAddress"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "vaultStrategyAddress"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "withdrawStrategyAddress"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "wrappedLiquidTokenAddress"): TypedContractMethod<[], [string], "view">;
    getEvent(key: "AdaptersDeployPathSet"): TypedContractEvent<AdaptersDeployPathSetEvent.InputTuple, AdaptersDeployPathSetEvent.OutputTuple, AdaptersDeployPathSetEvent.OutputObject>;
    getEvent(key: "AdaptersWithdrawPathSet"): TypedContractEvent<AdaptersWithdrawPathSetEvent.InputTuple, AdaptersWithdrawPathSetEvent.OutputTuple, AdaptersWithdrawPathSetEvent.OutputObject>;
    getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
    getEvent(key: "LiquidTokenSet"): TypedContractEvent<LiquidTokenSetEvent.InputTuple, LiquidTokenSetEvent.OutputTuple, LiquidTokenSetEvent.OutputObject>;
    getEvent(key: "Paused"): TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
    getEvent(key: "PriceFeedSet"): TypedContractEvent<PriceFeedSetEvent.InputTuple, PriceFeedSetEvent.OutputTuple, PriceFeedSetEvent.OutputObject>;
    getEvent(key: "RoleAdminChanged"): TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
    getEvent(key: "RoleGranted"): TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
    getEvent(key: "RoleRevoked"): TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
    getEvent(key: "StrategyNameSet"): TypedContractEvent<StrategyNameSetEvent.InputTuple, StrategyNameSetEvent.OutputTuple, StrategyNameSetEvent.OutputObject>;
    getEvent(key: "TokenWrapperSet"): TypedContractEvent<TokenWrapperSetEvent.InputTuple, TokenWrapperSetEvent.OutputTuple, TokenWrapperSetEvent.OutputObject>;
    getEvent(key: "Unpaused"): TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
    getEvent(key: "VaultAddressSet"): TypedContractEvent<VaultAddressSetEvent.InputTuple, VaultAddressSetEvent.OutputTuple, VaultAddressSetEvent.OutputObject>;
    getEvent(key: "WithdrawStrategyAddressSet"): TypedContractEvent<WithdrawStrategyAddressSetEvent.InputTuple, WithdrawStrategyAddressSetEvent.OutputTuple, WithdrawStrategyAddressSetEvent.OutputObject>;
    getEvent(key: "WithdrawStrategyExecuted"): TypedContractEvent<WithdrawStrategyExecutedEvent.InputTuple, WithdrawStrategyExecutedEvent.OutputTuple, WithdrawStrategyExecutedEvent.OutputObject>;
    filters: {
        "AdaptersDeployPathSet(address[])": TypedContractEvent<AdaptersDeployPathSetEvent.InputTuple, AdaptersDeployPathSetEvent.OutputTuple, AdaptersDeployPathSetEvent.OutputObject>;
        AdaptersDeployPathSet: TypedContractEvent<AdaptersDeployPathSetEvent.InputTuple, AdaptersDeployPathSetEvent.OutputTuple, AdaptersDeployPathSetEvent.OutputObject>;
        "AdaptersWithdrawPathSet(address[])": TypedContractEvent<AdaptersWithdrawPathSetEvent.InputTuple, AdaptersWithdrawPathSetEvent.OutputTuple, AdaptersWithdrawPathSetEvent.OutputObject>;
        AdaptersWithdrawPathSet: TypedContractEvent<AdaptersWithdrawPathSetEvent.InputTuple, AdaptersWithdrawPathSetEvent.OutputTuple, AdaptersWithdrawPathSetEvent.OutputObject>;
        "Initialized(uint64)": TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        Initialized: TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        "LiquidTokenSet(address)": TypedContractEvent<LiquidTokenSetEvent.InputTuple, LiquidTokenSetEvent.OutputTuple, LiquidTokenSetEvent.OutputObject>;
        LiquidTokenSet: TypedContractEvent<LiquidTokenSetEvent.InputTuple, LiquidTokenSetEvent.OutputTuple, LiquidTokenSetEvent.OutputObject>;
        "Paused(address)": TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
        Paused: TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
        "PriceFeedSet(address,address)": TypedContractEvent<PriceFeedSetEvent.InputTuple, PriceFeedSetEvent.OutputTuple, PriceFeedSetEvent.OutputObject>;
        PriceFeedSet: TypedContractEvent<PriceFeedSetEvent.InputTuple, PriceFeedSetEvent.OutputTuple, PriceFeedSetEvent.OutputObject>;
        "RoleAdminChanged(bytes32,bytes32,bytes32)": TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        RoleAdminChanged: TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        "RoleGranted(bytes32,address,address)": TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        RoleGranted: TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        "RoleRevoked(bytes32,address,address)": TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        RoleRevoked: TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        "StrategyNameSet(string)": TypedContractEvent<StrategyNameSetEvent.InputTuple, StrategyNameSetEvent.OutputTuple, StrategyNameSetEvent.OutputObject>;
        StrategyNameSet: TypedContractEvent<StrategyNameSetEvent.InputTuple, StrategyNameSetEvent.OutputTuple, StrategyNameSetEvent.OutputObject>;
        "TokenWrapperSet(address)": TypedContractEvent<TokenWrapperSetEvent.InputTuple, TokenWrapperSetEvent.OutputTuple, TokenWrapperSetEvent.OutputObject>;
        TokenWrapperSet: TypedContractEvent<TokenWrapperSetEvent.InputTuple, TokenWrapperSetEvent.OutputTuple, TokenWrapperSetEvent.OutputObject>;
        "Unpaused(address)": TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
        Unpaused: TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
        "VaultAddressSet(address)": TypedContractEvent<VaultAddressSetEvent.InputTuple, VaultAddressSetEvent.OutputTuple, VaultAddressSetEvent.OutputObject>;
        VaultAddressSet: TypedContractEvent<VaultAddressSetEvent.InputTuple, VaultAddressSetEvent.OutputTuple, VaultAddressSetEvent.OutputObject>;
        "WithdrawStrategyAddressSet(address)": TypedContractEvent<WithdrawStrategyAddressSetEvent.InputTuple, WithdrawStrategyAddressSetEvent.OutputTuple, WithdrawStrategyAddressSetEvent.OutputObject>;
        WithdrawStrategyAddressSet: TypedContractEvent<WithdrawStrategyAddressSetEvent.InputTuple, WithdrawStrategyAddressSetEvent.OutputTuple, WithdrawStrategyAddressSetEvent.OutputObject>;
        "WithdrawStrategyExecuted(address,address,uint256)": TypedContractEvent<WithdrawStrategyExecutedEvent.InputTuple, WithdrawStrategyExecutedEvent.OutputTuple, WithdrawStrategyExecutedEvent.OutputObject>;
        WithdrawStrategyExecuted: TypedContractEvent<WithdrawStrategyExecutedEvent.InputTuple, WithdrawStrategyExecutedEvent.OutputTuple, WithdrawStrategyExecutedEvent.OutputObject>;
    };
}
//# sourceMappingURL=StrWithdrawStandard.d.ts.map