import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../common";
export interface BaseVaultInterface extends Interface {
    getFunction(nameOrSignature: "DEFAULT_ADMIN_ROLE" | "MASTER_TOKEN_ROLE" | "REVERT_MSG" | "VAULT_MANAGER_ROLE" | "deployAssets" | "getRoleAdmin" | "grantRole" | "harvest" | "hasRole" | "initialize" | "liveValuationOnDeposit" | "liveValuationOnWithdraw" | "masterTokenAddress" | "pause" | "paused" | "pendingDepositAssets" | "renounceRole" | "revokeRole" | "setLiveValuation" | "setMasterTokenAddress" | "setValuationSource" | "setVaultStrategyAddress" | "setVaultsRegistryAddress" | "setWithdrawStrategyAddress" | "supportsInterface" | "unpause" | "valuationSource" | "vaultStrategyAddress" | "vaultsRegistryAddress" | "withdrawStrategyAddress"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AssetsDeployed" | "HarvestExecuted" | "Initialized" | "LiveValuationSet" | "MasterTokenAddressSet" | "Paused" | "RoleAdminChanged" | "RoleGranted" | "RoleRevoked" | "Unpaused" | "ValuationSourceSet" | "VaultStrategyAddressSet" | "VaultValuationUpdated" | "VaultsRegistryAddressSet" | "WithdrawStrategyAddressSet"): EventFragment;
    encodeFunctionData(functionFragment: "DEFAULT_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "MASTER_TOKEN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "REVERT_MSG", values?: undefined): string;
    encodeFunctionData(functionFragment: "VAULT_MANAGER_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "deployAssets", values?: undefined): string;
    encodeFunctionData(functionFragment: "getRoleAdmin", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "grantRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "harvest", values?: undefined): string;
    encodeFunctionData(functionFragment: "hasRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "initialize", values: [AddressLike, AddressLike, AddressLike, AddressLike, string, string]): string;
    encodeFunctionData(functionFragment: "liveValuationOnDeposit", values?: undefined): string;
    encodeFunctionData(functionFragment: "liveValuationOnWithdraw", values?: undefined): string;
    encodeFunctionData(functionFragment: "masterTokenAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "pause", values?: undefined): string;
    encodeFunctionData(functionFragment: "paused", values?: undefined): string;
    encodeFunctionData(functionFragment: "pendingDepositAssets", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "revokeRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "setLiveValuation", values: [boolean, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setMasterTokenAddress", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setValuationSource", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "setVaultStrategyAddress", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setVaultsRegistryAddress", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setWithdrawStrategyAddress", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
    encodeFunctionData(functionFragment: "valuationSource", values?: undefined): string;
    encodeFunctionData(functionFragment: "vaultStrategyAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "vaultsRegistryAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "withdrawStrategyAddress", values?: undefined): string;
    decodeFunctionResult(functionFragment: "DEFAULT_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "MASTER_TOKEN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "REVERT_MSG", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "VAULT_MANAGER_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deployAssets", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "harvest", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "liveValuationOnDeposit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "liveValuationOnWithdraw", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "masterTokenAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pendingDepositAssets", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setLiveValuation", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setMasterTokenAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setValuationSource", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setVaultStrategyAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setVaultsRegistryAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setWithdrawStrategyAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "valuationSource", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "vaultStrategyAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "vaultsRegistryAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawStrategyAddress", data: BytesLike): Result;
}
export declare namespace AssetsDeployedEvent {
    type InputTuple = [
        liquidToken: AddressLike,
        liquidTokenAmount: BigNumberish,
        pendingDepositAssets: BigNumberish,
        caller: AddressLike
    ];
    type OutputTuple = [
        liquidToken: string,
        liquidTokenAmount: bigint,
        pendingDepositAssets: bigint,
        caller: string
    ];
    interface OutputObject {
        liquidToken: string;
        liquidTokenAmount: bigint;
        pendingDepositAssets: bigint;
        caller: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace HarvestExecutedEvent {
    type InputTuple = [
        token: AddressLike,
        tokenAmount: BigNumberish,
        caller: AddressLike
    ];
    type OutputTuple = [
        token: string,
        tokenAmount: bigint,
        caller: string
    ];
    interface OutputObject {
        token: string;
        tokenAmount: bigint;
        caller: string;
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
export declare namespace LiveValuationSetEvent {
    type InputTuple = [status: boolean, target: BigNumberish];
    type OutputTuple = [status: boolean, target: bigint];
    interface OutputObject {
        status: boolean;
        target: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace MasterTokenAddressSetEvent {
    type InputTuple = [newAddress: AddressLike];
    type OutputTuple = [newAddress: string];
    interface OutputObject {
        newAddress: string;
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
export declare namespace ValuationSourceSetEvent {
    type InputTuple = [valuationSource: BigNumberish];
    type OutputTuple = [valuationSource: bigint];
    interface OutputObject {
        valuationSource: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace VaultStrategyAddressSetEvent {
    type InputTuple = [newAddress: AddressLike];
    type OutputTuple = [newAddress: string];
    interface OutputObject {
        newAddress: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace VaultValuationUpdatedEvent {
    type InputTuple = [
        vaultValuation: BigNumberish,
        deployedAssetsValue: BigNumberish,
        pendingDepositAssets: BigNumberish,
        caller: AddressLike
    ];
    type OutputTuple = [
        vaultValuation: bigint,
        deployedAssetsValue: bigint,
        pendingDepositAssets: bigint,
        caller: string
    ];
    interface OutputObject {
        vaultValuation: bigint;
        deployedAssetsValue: bigint;
        pendingDepositAssets: bigint;
        caller: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace VaultsRegistryAddressSetEvent {
    type InputTuple = [newAddress: AddressLike];
    type OutputTuple = [newAddress: string];
    interface OutputObject {
        newAddress: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace WithdrawStrategyAddressSetEvent {
    type InputTuple = [newAddress: AddressLike];
    type OutputTuple = [newAddress: string];
    interface OutputObject {
        newAddress: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface BaseVault extends BaseContract {
    connect(runner?: ContractRunner | null): BaseVault;
    waitForDeployment(): Promise<this>;
    interface: BaseVaultInterface;
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
    MASTER_TOKEN_ROLE: TypedContractMethod<[], [string], "view">;
    REVERT_MSG: TypedContractMethod<[], [string], "view">;
    VAULT_MANAGER_ROLE: TypedContractMethod<[], [string], "view">;
    deployAssets: TypedContractMethod<[], [[string, bigint]], "nonpayable">;
    getRoleAdmin: TypedContractMethod<[role: BytesLike], [string], "view">;
    grantRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    harvest: TypedContractMethod<[], [[string, bigint]], "nonpayable">;
    hasRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        boolean
    ], "view">;
    initialize: TypedContractMethod<[
        underlyingTokenAddress_: AddressLike,
        masterTokenAddress_: AddressLike,
        vaultsRegistryAddress_: AddressLike,
        ownerAddress_: AddressLike,
        sharesName_: string,
        sharesSymbol_: string
    ], [
        void
    ], "nonpayable">;
    liveValuationOnDeposit: TypedContractMethod<[], [boolean], "view">;
    liveValuationOnWithdraw: TypedContractMethod<[], [boolean], "view">;
    masterTokenAddress: TypedContractMethod<[], [string], "view">;
    pause: TypedContractMethod<[], [void], "nonpayable">;
    paused: TypedContractMethod<[], [boolean], "view">;
    pendingDepositAssets: TypedContractMethod<[], [bigint], "view">;
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
    setLiveValuation: TypedContractMethod<[
        status_: boolean,
        target_: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setMasterTokenAddress: TypedContractMethod<[
        masterTokenAddress_: AddressLike
    ], [
        void
    ], "nonpayable">;
    setValuationSource: TypedContractMethod<[
        valuationSource_: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setVaultStrategyAddress: TypedContractMethod<[
        vaultStrategyAddress_: AddressLike
    ], [
        void
    ], "nonpayable">;
    setVaultsRegistryAddress: TypedContractMethod<[
        vaultsRegistryAddress_: AddressLike
    ], [
        void
    ], "nonpayable">;
    setWithdrawStrategyAddress: TypedContractMethod<[
        withdrawStrategyAddress_: AddressLike
    ], [
        void
    ], "nonpayable">;
    supportsInterface: TypedContractMethod<[
        interfaceId: BytesLike
    ], [
        boolean
    ], "view">;
    unpause: TypedContractMethod<[], [void], "nonpayable">;
    valuationSource: TypedContractMethod<[], [bigint], "view">;
    vaultStrategyAddress: TypedContractMethod<[], [string], "view">;
    vaultsRegistryAddress: TypedContractMethod<[], [string], "view">;
    withdrawStrategyAddress: TypedContractMethod<[], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "DEFAULT_ADMIN_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "MASTER_TOKEN_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "REVERT_MSG"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "VAULT_MANAGER_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "deployAssets"): TypedContractMethod<[], [[string, bigint]], "nonpayable">;
    getFunction(nameOrSignature: "getRoleAdmin"): TypedContractMethod<[role: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "grantRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "harvest"): TypedContractMethod<[], [[string, bigint]], "nonpayable">;
    getFunction(nameOrSignature: "hasRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "initialize"): TypedContractMethod<[
        underlyingTokenAddress_: AddressLike,
        masterTokenAddress_: AddressLike,
        vaultsRegistryAddress_: AddressLike,
        ownerAddress_: AddressLike,
        sharesName_: string,
        sharesSymbol_: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "liveValuationOnDeposit"): TypedContractMethod<[], [boolean], "view">;
    getFunction(nameOrSignature: "liveValuationOnWithdraw"): TypedContractMethod<[], [boolean], "view">;
    getFunction(nameOrSignature: "masterTokenAddress"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "pause"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "paused"): TypedContractMethod<[], [boolean], "view">;
    getFunction(nameOrSignature: "pendingDepositAssets"): TypedContractMethod<[], [bigint], "view">;
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
    getFunction(nameOrSignature: "setLiveValuation"): TypedContractMethod<[
        status_: boolean,
        target_: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setMasterTokenAddress"): TypedContractMethod<[
        masterTokenAddress_: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setValuationSource"): TypedContractMethod<[
        valuationSource_: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setVaultStrategyAddress"): TypedContractMethod<[
        vaultStrategyAddress_: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setVaultsRegistryAddress"): TypedContractMethod<[
        vaultsRegistryAddress_: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setWithdrawStrategyAddress"): TypedContractMethod<[
        withdrawStrategyAddress_: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "unpause"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "valuationSource"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "vaultStrategyAddress"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "vaultsRegistryAddress"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "withdrawStrategyAddress"): TypedContractMethod<[], [string], "view">;
    getEvent(key: "AssetsDeployed"): TypedContractEvent<AssetsDeployedEvent.InputTuple, AssetsDeployedEvent.OutputTuple, AssetsDeployedEvent.OutputObject>;
    getEvent(key: "HarvestExecuted"): TypedContractEvent<HarvestExecutedEvent.InputTuple, HarvestExecutedEvent.OutputTuple, HarvestExecutedEvent.OutputObject>;
    getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
    getEvent(key: "LiveValuationSet"): TypedContractEvent<LiveValuationSetEvent.InputTuple, LiveValuationSetEvent.OutputTuple, LiveValuationSetEvent.OutputObject>;
    getEvent(key: "MasterTokenAddressSet"): TypedContractEvent<MasterTokenAddressSetEvent.InputTuple, MasterTokenAddressSetEvent.OutputTuple, MasterTokenAddressSetEvent.OutputObject>;
    getEvent(key: "Paused"): TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
    getEvent(key: "RoleAdminChanged"): TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
    getEvent(key: "RoleGranted"): TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
    getEvent(key: "RoleRevoked"): TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
    getEvent(key: "Unpaused"): TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
    getEvent(key: "ValuationSourceSet"): TypedContractEvent<ValuationSourceSetEvent.InputTuple, ValuationSourceSetEvent.OutputTuple, ValuationSourceSetEvent.OutputObject>;
    getEvent(key: "VaultStrategyAddressSet"): TypedContractEvent<VaultStrategyAddressSetEvent.InputTuple, VaultStrategyAddressSetEvent.OutputTuple, VaultStrategyAddressSetEvent.OutputObject>;
    getEvent(key: "VaultValuationUpdated"): TypedContractEvent<VaultValuationUpdatedEvent.InputTuple, VaultValuationUpdatedEvent.OutputTuple, VaultValuationUpdatedEvent.OutputObject>;
    getEvent(key: "VaultsRegistryAddressSet"): TypedContractEvent<VaultsRegistryAddressSetEvent.InputTuple, VaultsRegistryAddressSetEvent.OutputTuple, VaultsRegistryAddressSetEvent.OutputObject>;
    getEvent(key: "WithdrawStrategyAddressSet"): TypedContractEvent<WithdrawStrategyAddressSetEvent.InputTuple, WithdrawStrategyAddressSetEvent.OutputTuple, WithdrawStrategyAddressSetEvent.OutputObject>;
    filters: {
        "AssetsDeployed(address,uint256,uint256,address)": TypedContractEvent<AssetsDeployedEvent.InputTuple, AssetsDeployedEvent.OutputTuple, AssetsDeployedEvent.OutputObject>;
        AssetsDeployed: TypedContractEvent<AssetsDeployedEvent.InputTuple, AssetsDeployedEvent.OutputTuple, AssetsDeployedEvent.OutputObject>;
        "HarvestExecuted(address,uint256,address)": TypedContractEvent<HarvestExecutedEvent.InputTuple, HarvestExecutedEvent.OutputTuple, HarvestExecutedEvent.OutputObject>;
        HarvestExecuted: TypedContractEvent<HarvestExecutedEvent.InputTuple, HarvestExecutedEvent.OutputTuple, HarvestExecutedEvent.OutputObject>;
        "Initialized(uint64)": TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        Initialized: TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        "LiveValuationSet(bool,uint256)": TypedContractEvent<LiveValuationSetEvent.InputTuple, LiveValuationSetEvent.OutputTuple, LiveValuationSetEvent.OutputObject>;
        LiveValuationSet: TypedContractEvent<LiveValuationSetEvent.InputTuple, LiveValuationSetEvent.OutputTuple, LiveValuationSetEvent.OutputObject>;
        "MasterTokenAddressSet(address)": TypedContractEvent<MasterTokenAddressSetEvent.InputTuple, MasterTokenAddressSetEvent.OutputTuple, MasterTokenAddressSetEvent.OutputObject>;
        MasterTokenAddressSet: TypedContractEvent<MasterTokenAddressSetEvent.InputTuple, MasterTokenAddressSetEvent.OutputTuple, MasterTokenAddressSetEvent.OutputObject>;
        "Paused(address)": TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
        Paused: TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
        "RoleAdminChanged(bytes32,bytes32,bytes32)": TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        RoleAdminChanged: TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        "RoleGranted(bytes32,address,address)": TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        RoleGranted: TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        "RoleRevoked(bytes32,address,address)": TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        RoleRevoked: TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        "Unpaused(address)": TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
        Unpaused: TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
        "ValuationSourceSet(uint8)": TypedContractEvent<ValuationSourceSetEvent.InputTuple, ValuationSourceSetEvent.OutputTuple, ValuationSourceSetEvent.OutputObject>;
        ValuationSourceSet: TypedContractEvent<ValuationSourceSetEvent.InputTuple, ValuationSourceSetEvent.OutputTuple, ValuationSourceSetEvent.OutputObject>;
        "VaultStrategyAddressSet(address)": TypedContractEvent<VaultStrategyAddressSetEvent.InputTuple, VaultStrategyAddressSetEvent.OutputTuple, VaultStrategyAddressSetEvent.OutputObject>;
        VaultStrategyAddressSet: TypedContractEvent<VaultStrategyAddressSetEvent.InputTuple, VaultStrategyAddressSetEvent.OutputTuple, VaultStrategyAddressSetEvent.OutputObject>;
        "VaultValuationUpdated(uint256,uint256,uint256,address)": TypedContractEvent<VaultValuationUpdatedEvent.InputTuple, VaultValuationUpdatedEvent.OutputTuple, VaultValuationUpdatedEvent.OutputObject>;
        VaultValuationUpdated: TypedContractEvent<VaultValuationUpdatedEvent.InputTuple, VaultValuationUpdatedEvent.OutputTuple, VaultValuationUpdatedEvent.OutputObject>;
        "VaultsRegistryAddressSet(address)": TypedContractEvent<VaultsRegistryAddressSetEvent.InputTuple, VaultsRegistryAddressSetEvent.OutputTuple, VaultsRegistryAddressSetEvent.OutputObject>;
        VaultsRegistryAddressSet: TypedContractEvent<VaultsRegistryAddressSetEvent.InputTuple, VaultsRegistryAddressSetEvent.OutputTuple, VaultsRegistryAddressSetEvent.OutputObject>;
        "WithdrawStrategyAddressSet(address)": TypedContractEvent<WithdrawStrategyAddressSetEvent.InputTuple, WithdrawStrategyAddressSetEvent.OutputTuple, WithdrawStrategyAddressSetEvent.OutputObject>;
        WithdrawStrategyAddressSet: TypedContractEvent<WithdrawStrategyAddressSetEvent.InputTuple, WithdrawStrategyAddressSetEvent.OutputTuple, WithdrawStrategyAddressSetEvent.OutputObject>;
    };
}
//# sourceMappingURL=BaseVault.d.ts.map