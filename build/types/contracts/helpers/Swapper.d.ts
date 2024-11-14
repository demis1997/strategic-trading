import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export declare namespace Swapper {
    type DexDataStruct = {
        dexLocation: AddressLike;
        swapFunction: BytesLike;
    };
    type DexDataStructOutput = [
        dexLocation: string,
        swapFunction: string
    ] & {
        dexLocation: string;
        swapFunction: string;
    };
}
export interface SwapperInterface extends Interface {
    getFunction(nameOrSignature: "DEFAULT_ADMIN_ROLE" | "SWAPPER_EXECUTOR" | "SWAPPER_RESOLVER" | "defaultSlippage" | "getRoleAdmin" | "grantRole" | "hasRole" | "initialize" | "renounceRole" | "revokeRole" | "setDefaultSlippage" | "setDexData" | "supportsInterface" | "swap" | "swapData"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "DefaultSlippageUpdated" | "Initialized" | "RoleAdminChanged" | "RoleGranted" | "RoleRevoked" | "SwapExecuted"): EventFragment;
    encodeFunctionData(functionFragment: "DEFAULT_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "SWAPPER_EXECUTOR", values?: undefined): string;
    encodeFunctionData(functionFragment: "SWAPPER_RESOLVER", values?: undefined): string;
    encodeFunctionData(functionFragment: "defaultSlippage", values?: undefined): string;
    encodeFunctionData(functionFragment: "getRoleAdmin", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "grantRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "hasRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "initialize", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "renounceRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "revokeRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "setDefaultSlippage", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "setDexData", values: [AddressLike, AddressLike, Swapper.DexDataStruct]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "swap", values: [
        AddressLike,
        AddressLike,
        BigNumberish,
        AddressLike,
        AddressLike,
        BigNumberish,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "swapData", values: [AddressLike, AddressLike]): string;
    decodeFunctionResult(functionFragment: "DEFAULT_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "SWAPPER_EXECUTOR", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "SWAPPER_RESOLVER", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "defaultSlippage", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setDefaultSlippage", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setDexData", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "swap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "swapData", data: BytesLike): Result;
}
export declare namespace DefaultSlippageUpdatedEvent {
    type InputTuple = [
        oldSlippage: BigNumberish,
        newSlippage: BigNumberish
    ];
    type OutputTuple = [oldSlippage: bigint, newSlippage: bigint];
    interface OutputObject {
        oldSlippage: bigint;
        newSlippage: bigint;
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
export declare namespace SwapExecutedEvent {
    type InputTuple = [
        owner: AddressLike,
        receiver: AddressLike,
        tokenIn: AddressLike,
        tokenOut: AddressLike,
        amountIn: BigNumberish,
        amountOut: BigNumberish
    ];
    type OutputTuple = [
        owner: string,
        receiver: string,
        tokenIn: string,
        tokenOut: string,
        amountIn: bigint,
        amountOut: bigint
    ];
    interface OutputObject {
        owner: string;
        receiver: string;
        tokenIn: string;
        tokenOut: string;
        amountIn: bigint;
        amountOut: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface Swapper extends BaseContract {
    connect(runner?: ContractRunner | null): Swapper;
    waitForDeployment(): Promise<this>;
    interface: SwapperInterface;
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
    SWAPPER_EXECUTOR: TypedContractMethod<[], [string], "view">;
    SWAPPER_RESOLVER: TypedContractMethod<[], [string], "view">;
    defaultSlippage: TypedContractMethod<[], [bigint], "view">;
    getRoleAdmin: TypedContractMethod<[role: BytesLike], [string], "view">;
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
        _defaultSlippage: BigNumberish,
        adminAddress: AddressLike
    ], [
        void
    ], "nonpayable">;
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
    setDefaultSlippage: TypedContractMethod<[
        slippage: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setDexData: TypedContractMethod<[
        tokenIn: AddressLike,
        tokenOut: AddressLike,
        dexData: Swapper.DexDataStruct
    ], [
        void
    ], "nonpayable">;
    supportsInterface: TypedContractMethod<[
        interfaceId: BytesLike
    ], [
        boolean
    ], "view">;
    swap: TypedContractMethod<[
        owner: AddressLike,
        receiver: AddressLike,
        amount: BigNumberish,
        tokenIn: AddressLike,
        tokenOut: AddressLike,
        slippage: BigNumberish,
        flags: BigNumberish
    ], [
        bigint
    ], "nonpayable">;
    swapData: TypedContractMethod<[
        arg0: AddressLike,
        arg1: AddressLike
    ], [
        [string, string] & {
            dexLocation: string;
            swapFunction: string;
        }
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "DEFAULT_ADMIN_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "SWAPPER_EXECUTOR"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "SWAPPER_RESOLVER"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "defaultSlippage"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "getRoleAdmin"): TypedContractMethod<[role: BytesLike], [string], "view">;
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
        _defaultSlippage: BigNumberish,
        adminAddress: AddressLike
    ], [
        void
    ], "nonpayable">;
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
    getFunction(nameOrSignature: "setDefaultSlippage"): TypedContractMethod<[slippage: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "setDexData"): TypedContractMethod<[
        tokenIn: AddressLike,
        tokenOut: AddressLike,
        dexData: Swapper.DexDataStruct
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "swap"): TypedContractMethod<[
        owner: AddressLike,
        receiver: AddressLike,
        amount: BigNumberish,
        tokenIn: AddressLike,
        tokenOut: AddressLike,
        slippage: BigNumberish,
        flags: BigNumberish
    ], [
        bigint
    ], "nonpayable">;
    getFunction(nameOrSignature: "swapData"): TypedContractMethod<[
        arg0: AddressLike,
        arg1: AddressLike
    ], [
        [string, string] & {
            dexLocation: string;
            swapFunction: string;
        }
    ], "view">;
    getEvent(key: "DefaultSlippageUpdated"): TypedContractEvent<DefaultSlippageUpdatedEvent.InputTuple, DefaultSlippageUpdatedEvent.OutputTuple, DefaultSlippageUpdatedEvent.OutputObject>;
    getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
    getEvent(key: "RoleAdminChanged"): TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
    getEvent(key: "RoleGranted"): TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
    getEvent(key: "RoleRevoked"): TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
    getEvent(key: "SwapExecuted"): TypedContractEvent<SwapExecutedEvent.InputTuple, SwapExecutedEvent.OutputTuple, SwapExecutedEvent.OutputObject>;
    filters: {
        "DefaultSlippageUpdated(uint256,uint256)": TypedContractEvent<DefaultSlippageUpdatedEvent.InputTuple, DefaultSlippageUpdatedEvent.OutputTuple, DefaultSlippageUpdatedEvent.OutputObject>;
        DefaultSlippageUpdated: TypedContractEvent<DefaultSlippageUpdatedEvent.InputTuple, DefaultSlippageUpdatedEvent.OutputTuple, DefaultSlippageUpdatedEvent.OutputObject>;
        "Initialized(uint64)": TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        Initialized: TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        "RoleAdminChanged(bytes32,bytes32,bytes32)": TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        RoleAdminChanged: TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        "RoleGranted(bytes32,address,address)": TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        RoleGranted: TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        "RoleRevoked(bytes32,address,address)": TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        RoleRevoked: TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        "SwapExecuted(address,address,address,address,uint256,uint256)": TypedContractEvent<SwapExecutedEvent.InputTuple, SwapExecutedEvent.OutputTuple, SwapExecutedEvent.OutputObject>;
        SwapExecuted: TypedContractEvent<SwapExecutedEvent.InputTuple, SwapExecutedEvent.OutputTuple, SwapExecutedEvent.OutputObject>;
    };
}
//# sourceMappingURL=Swapper.d.ts.map