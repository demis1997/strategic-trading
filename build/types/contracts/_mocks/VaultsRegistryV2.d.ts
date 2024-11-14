import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export interface VaultsRegistryV2Interface extends Interface {
    getFunction(nameOrSignature: "BASE" | "DEFAULT_ADMIN_ROLE" | "addedMethodRegistryV2" | "addedVariableRegistryV2" | "defaultFeeRate" | "deployVault" | "getRoleAdmin" | "getVaultImplementationAddress" | "getbeaconProxyAddress" | "grantRole" | "hasRole" | "initialize" | "isVaultActive" | "renounceRole" | "revokeRole" | "setDefaultFeeRate" | "setVaultImplementation" | "setVaultStatus" | "supportsInterface" | "validVaults"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "DefaultFeeRateSet" | "Initialized" | "RoleAdminChanged" | "RoleGranted" | "RoleRevoked" | "VaultDeployed" | "VaultImplementationChanged" | "VaultStatusChanged"): EventFragment;
    encodeFunctionData(functionFragment: "BASE", values?: undefined): string;
    encodeFunctionData(functionFragment: "DEFAULT_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "addedMethodRegistryV2", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "addedVariableRegistryV2", values?: undefined): string;
    encodeFunctionData(functionFragment: "defaultFeeRate", values?: undefined): string;
    encodeFunctionData(functionFragment: "deployVault", values: [AddressLike, AddressLike, AddressLike, string, string]): string;
    encodeFunctionData(functionFragment: "getRoleAdmin", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "getVaultImplementationAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "getbeaconProxyAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "grantRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "hasRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "initialize", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "isVaultActive", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "renounceRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "revokeRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "setDefaultFeeRate", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "setVaultImplementation", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setVaultStatus", values: [AddressLike, boolean]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "validVaults", values: [AddressLike]): string;
    decodeFunctionResult(functionFragment: "BASE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "DEFAULT_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addedMethodRegistryV2", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addedVariableRegistryV2", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "defaultFeeRate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deployVault", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getVaultImplementationAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getbeaconProxyAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isVaultActive", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setDefaultFeeRate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setVaultImplementation", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setVaultStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "validVaults", data: BytesLike): Result;
}
export declare namespace DefaultFeeRateSetEvent {
    type InputTuple = [newFeeRate: BigNumberish];
    type OutputTuple = [newFeeRate: bigint];
    interface OutputObject {
        newFeeRate: bigint;
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
export declare namespace VaultDeployedEvent {
    type InputTuple = [vault: AddressLike];
    type OutputTuple = [vault: string];
    interface OutputObject {
        vault: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace VaultImplementationChangedEvent {
    type InputTuple = [newImplementation: AddressLike];
    type OutputTuple = [newImplementation: string];
    interface OutputObject {
        newImplementation: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace VaultStatusChangedEvent {
    type InputTuple = [vaultAddress: AddressLike, status: boolean];
    type OutputTuple = [vaultAddress: string, status: boolean];
    interface OutputObject {
        vaultAddress: string;
        status: boolean;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface VaultsRegistryV2 extends BaseContract {
    connect(runner?: ContractRunner | null): VaultsRegistryV2;
    waitForDeployment(): Promise<this>;
    interface: VaultsRegistryV2Interface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    BASE: TypedContractMethod<[], [bigint], "view">;
    DEFAULT_ADMIN_ROLE: TypedContractMethod<[], [string], "view">;
    addedMethodRegistryV2: TypedContractMethod<[
        _newValue: BigNumberish
    ], [
        void
    ], "nonpayable">;
    addedVariableRegistryV2: TypedContractMethod<[], [bigint], "view">;
    defaultFeeRate: TypedContractMethod<[], [bigint], "view">;
    deployVault: TypedContractMethod<[
        underlyingTokenAddress_: AddressLike,
        masterTokenAddress_: AddressLike,
        ownerAddress_: AddressLike,
        sharesName_: string,
        sharesSymbol_: string
    ], [
        void
    ], "nonpayable">;
    getRoleAdmin: TypedContractMethod<[role: BytesLike], [string], "view">;
    getVaultImplementationAddress: TypedContractMethod<[], [string], "view">;
    getbeaconProxyAddress: TypedContractMethod<[], [string], "view">;
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
        defaultFeeRate_: BigNumberish,
        vaultImplementation_: AddressLike
    ], [
        void
    ], "nonpayable">;
    isVaultActive: TypedContractMethod<[
        vaultAddress_: AddressLike
    ], [
        boolean
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
    setDefaultFeeRate: TypedContractMethod<[
        defaultFeeRate_: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setVaultImplementation: TypedContractMethod<[
        newImplementation_: AddressLike
    ], [
        void
    ], "nonpayable">;
    setVaultStatus: TypedContractMethod<[
        vaultAddress_: AddressLike,
        status_: boolean
    ], [
        void
    ], "nonpayable">;
    supportsInterface: TypedContractMethod<[
        interfaceId: BytesLike
    ], [
        boolean
    ], "view">;
    validVaults: TypedContractMethod<[vaults: AddressLike], [boolean], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "BASE"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "DEFAULT_ADMIN_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "addedMethodRegistryV2"): TypedContractMethod<[_newValue: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "addedVariableRegistryV2"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "defaultFeeRate"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "deployVault"): TypedContractMethod<[
        underlyingTokenAddress_: AddressLike,
        masterTokenAddress_: AddressLike,
        ownerAddress_: AddressLike,
        sharesName_: string,
        sharesSymbol_: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "getRoleAdmin"): TypedContractMethod<[role: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "getVaultImplementationAddress"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "getbeaconProxyAddress"): TypedContractMethod<[], [string], "view">;
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
        defaultFeeRate_: BigNumberish,
        vaultImplementation_: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "isVaultActive"): TypedContractMethod<[vaultAddress_: AddressLike], [boolean], "view">;
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
    getFunction(nameOrSignature: "setDefaultFeeRate"): TypedContractMethod<[defaultFeeRate_: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "setVaultImplementation"): TypedContractMethod<[
        newImplementation_: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setVaultStatus"): TypedContractMethod<[
        vaultAddress_: AddressLike,
        status_: boolean
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "validVaults"): TypedContractMethod<[vaults: AddressLike], [boolean], "view">;
    getEvent(key: "DefaultFeeRateSet"): TypedContractEvent<DefaultFeeRateSetEvent.InputTuple, DefaultFeeRateSetEvent.OutputTuple, DefaultFeeRateSetEvent.OutputObject>;
    getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
    getEvent(key: "RoleAdminChanged"): TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
    getEvent(key: "RoleGranted"): TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
    getEvent(key: "RoleRevoked"): TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
    getEvent(key: "VaultDeployed"): TypedContractEvent<VaultDeployedEvent.InputTuple, VaultDeployedEvent.OutputTuple, VaultDeployedEvent.OutputObject>;
    getEvent(key: "VaultImplementationChanged"): TypedContractEvent<VaultImplementationChangedEvent.InputTuple, VaultImplementationChangedEvent.OutputTuple, VaultImplementationChangedEvent.OutputObject>;
    getEvent(key: "VaultStatusChanged"): TypedContractEvent<VaultStatusChangedEvent.InputTuple, VaultStatusChangedEvent.OutputTuple, VaultStatusChangedEvent.OutputObject>;
    filters: {
        "DefaultFeeRateSet(uint256)": TypedContractEvent<DefaultFeeRateSetEvent.InputTuple, DefaultFeeRateSetEvent.OutputTuple, DefaultFeeRateSetEvent.OutputObject>;
        DefaultFeeRateSet: TypedContractEvent<DefaultFeeRateSetEvent.InputTuple, DefaultFeeRateSetEvent.OutputTuple, DefaultFeeRateSetEvent.OutputObject>;
        "Initialized(uint64)": TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        Initialized: TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        "RoleAdminChanged(bytes32,bytes32,bytes32)": TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        RoleAdminChanged: TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        "RoleGranted(bytes32,address,address)": TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        RoleGranted: TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        "RoleRevoked(bytes32,address,address)": TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        RoleRevoked: TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        "VaultDeployed(address)": TypedContractEvent<VaultDeployedEvent.InputTuple, VaultDeployedEvent.OutputTuple, VaultDeployedEvent.OutputObject>;
        VaultDeployed: TypedContractEvent<VaultDeployedEvent.InputTuple, VaultDeployedEvent.OutputTuple, VaultDeployedEvent.OutputObject>;
        "VaultImplementationChanged(address)": TypedContractEvent<VaultImplementationChangedEvent.InputTuple, VaultImplementationChangedEvent.OutputTuple, VaultImplementationChangedEvent.OutputObject>;
        VaultImplementationChanged: TypedContractEvent<VaultImplementationChangedEvent.InputTuple, VaultImplementationChangedEvent.OutputTuple, VaultImplementationChangedEvent.OutputObject>;
        "VaultStatusChanged(address,bool)": TypedContractEvent<VaultStatusChangedEvent.InputTuple, VaultStatusChangedEvent.OutputTuple, VaultStatusChangedEvent.OutputObject>;
        VaultStatusChanged: TypedContractEvent<VaultStatusChangedEvent.InputTuple, VaultStatusChangedEvent.OutputTuple, VaultStatusChangedEvent.OutputObject>;
    };
}
//# sourceMappingURL=VaultsRegistryV2.d.ts.map