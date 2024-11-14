import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../common";
export interface LidoAdapterInterface extends Interface {
    getFunction(nameOrSignature: "DEFAULT_ADMIN_ROLE" | "REVERT_MSG" | "VAULT_STRATEGY_ROLE" | "claimEarnings" | "deposit" | "getProtocol" | "getRoleAdmin" | "getSlippage" | "getTokenPrice" | "grantRole" | "hasRole" | "initialize" | "pause" | "paused" | "protocolAddress" | "protocolName" | "renounceRole" | "revokeRole" | "setSlippage" | "setWETHAddress" | "setWstETHAddress" | "setprotocolAddress" | "slippage" | "supportsInterface" | "unpause" | "wethAddress" | "withdraw" | "wstETHAddress"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AddressUpdated" | "DepositedOnProtocol" | "Initialized" | "Paused" | "RoleAdminChanged" | "RoleGranted" | "RoleRevoked" | "SlippageUpdated" | "Unpaused" | "WithdrawFromProtocol"): EventFragment;
    encodeFunctionData(functionFragment: "DEFAULT_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "REVERT_MSG", values?: undefined): string;
    encodeFunctionData(functionFragment: "VAULT_STRATEGY_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "claimEarnings", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "deposit", values: [AddressLike, AddressLike, AddressLike, BigNumberish, boolean]): string;
    encodeFunctionData(functionFragment: "getProtocol", values?: undefined): string;
    encodeFunctionData(functionFragment: "getRoleAdmin", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "getSlippage", values?: undefined): string;
    encodeFunctionData(functionFragment: "getTokenPrice", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "grantRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "hasRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "initialize", values: [AddressLike, AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "pause", values?: undefined): string;
    encodeFunctionData(functionFragment: "paused", values?: undefined): string;
    encodeFunctionData(functionFragment: "protocolAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "protocolName", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "revokeRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "setSlippage", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "setWETHAddress", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setWstETHAddress", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setprotocolAddress", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "slippage", values?: undefined): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
    encodeFunctionData(functionFragment: "wethAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "withdraw", values: [
        AddressLike,
        AddressLike,
        AddressLike,
        BigNumberish,
        AddressLike,
        BigNumberish,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "wstETHAddress", values?: undefined): string;
    decodeFunctionResult(functionFragment: "DEFAULT_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "REVERT_MSG", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "VAULT_STRATEGY_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimEarnings", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getProtocol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getSlippage", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTokenPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "protocolAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "protocolName", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSlippage", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setWETHAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setWstETHAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setprotocolAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "slippage", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "wethAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "wstETHAddress", data: BytesLike): Result;
}
export declare namespace AddressUpdatedEvent {
    type InputTuple = [which: string, newAddress: AddressLike];
    type OutputTuple = [which: string, newAddress: string];
    interface OutputObject {
        which: string;
        newAddress: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace DepositedOnProtocolEvent {
    type InputTuple = [
        sender: AddressLike,
        token: AddressLike,
        tokenAmount: BigNumberish,
        liquidTkn: AddressLike,
        liquidTknAmount: BigNumberish
    ];
    type OutputTuple = [
        sender: string,
        token: string,
        tokenAmount: bigint,
        liquidTkn: string,
        liquidTknAmount: bigint
    ];
    interface OutputObject {
        sender: string;
        token: string;
        tokenAmount: bigint;
        liquidTkn: string;
        liquidTknAmount: bigint;
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
export declare namespace SlippageUpdatedEvent {
    type InputTuple = [newSlippage: BigNumberish];
    type OutputTuple = [newSlippage: bigint];
    interface OutputObject {
        newSlippage: bigint;
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
export declare namespace WithdrawFromProtocolEvent {
    type InputTuple = [
        caller_: AddressLike,
        receiver_: AddressLike,
        liquidTokenAddress_: AddressLike,
        amountSpent: BigNumberish,
        asset_: AddressLike,
        assetsAmount_: BigNumberish
    ];
    type OutputTuple = [
        caller_: string,
        receiver_: string,
        liquidTokenAddress_: string,
        amountSpent: bigint,
        asset_: string,
        assetsAmount_: bigint
    ];
    interface OutputObject {
        caller_: string;
        receiver_: string;
        liquidTokenAddress_: string;
        amountSpent: bigint;
        asset_: string;
        assetsAmount_: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface LidoAdapter extends BaseContract {
    connect(runner?: ContractRunner | null): LidoAdapter;
    waitForDeployment(): Promise<this>;
    interface: LidoAdapterInterface;
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
    VAULT_STRATEGY_ROLE: TypedContractMethod<[], [string], "view">;
    claimEarnings: TypedContractMethod<[
        arg0: AddressLike,
        arg1: AddressLike
    ], [
        [string, bigint]
    ], "nonpayable">;
    deposit: TypedContractMethod<[
        sender_: AddressLike,
        receiver_: AddressLike,
        token_: AddressLike,
        tokenAmount_: BigNumberish,
        wrapToken_: boolean
    ], [
        [string, bigint] & {
            liquidTkn: string;
            liquidTknAmount: bigint;
        }
    ], "nonpayable">;
    getProtocol: TypedContractMethod<[], [string], "view">;
    getRoleAdmin: TypedContractMethod<[role: BytesLike], [string], "view">;
    getSlippage: TypedContractMethod<[], [bigint], "view">;
    getTokenPrice: TypedContractMethod<[token_: AddressLike], [bigint], "view">;
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
        protocolAddress_: AddressLike,
        wethAddress_: AddressLike,
        wstETHAddress_: AddressLike
    ], [
        void
    ], "nonpayable">;
    pause: TypedContractMethod<[], [void], "nonpayable">;
    paused: TypedContractMethod<[], [boolean], "view">;
    protocolAddress: TypedContractMethod<[], [string], "view">;
    protocolName: TypedContractMethod<[], [string], "view">;
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
    setSlippage: TypedContractMethod<[
        slippage_: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setWETHAddress: TypedContractMethod<[
        wethAddress_: AddressLike
    ], [
        void
    ], "nonpayable">;
    setWstETHAddress: TypedContractMethod<[
        wstETHAddress_: AddressLike
    ], [
        void
    ], "nonpayable">;
    setprotocolAddress: TypedContractMethod<[
        protocolAddress_: AddressLike
    ], [
        void
    ], "nonpayable">;
    slippage: TypedContractMethod<[], [bigint], "view">;
    supportsInterface: TypedContractMethod<[
        interfaceId: BytesLike
    ], [
        boolean
    ], "view">;
    unpause: TypedContractMethod<[], [void], "nonpayable">;
    wethAddress: TypedContractMethod<[], [string], "view">;
    withdraw: TypedContractMethod<[
        arg0: AddressLike,
        arg1: AddressLike,
        arg2: AddressLike,
        arg3: BigNumberish,
        arg4: AddressLike,
        arg5: BigNumberish,
        arg6: BytesLike
    ], [
        [string, bigint]
    ], "nonpayable">;
    wstETHAddress: TypedContractMethod<[], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "DEFAULT_ADMIN_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "REVERT_MSG"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "VAULT_STRATEGY_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "claimEarnings"): TypedContractMethod<[
        arg0: AddressLike,
        arg1: AddressLike
    ], [
        [string, bigint]
    ], "nonpayable">;
    getFunction(nameOrSignature: "deposit"): TypedContractMethod<[
        sender_: AddressLike,
        receiver_: AddressLike,
        token_: AddressLike,
        tokenAmount_: BigNumberish,
        wrapToken_: boolean
    ], [
        [string, bigint] & {
            liquidTkn: string;
            liquidTknAmount: bigint;
        }
    ], "nonpayable">;
    getFunction(nameOrSignature: "getProtocol"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "getRoleAdmin"): TypedContractMethod<[role: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "getSlippage"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "getTokenPrice"): TypedContractMethod<[token_: AddressLike], [bigint], "view">;
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
        protocolAddress_: AddressLike,
        wethAddress_: AddressLike,
        wstETHAddress_: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "pause"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "paused"): TypedContractMethod<[], [boolean], "view">;
    getFunction(nameOrSignature: "protocolAddress"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "protocolName"): TypedContractMethod<[], [string], "view">;
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
    getFunction(nameOrSignature: "setSlippage"): TypedContractMethod<[slippage_: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "setWETHAddress"): TypedContractMethod<[wethAddress_: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "setWstETHAddress"): TypedContractMethod<[wstETHAddress_: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "setprotocolAddress"): TypedContractMethod<[protocolAddress_: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "slippage"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "unpause"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "wethAddress"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "withdraw"): TypedContractMethod<[
        arg0: AddressLike,
        arg1: AddressLike,
        arg2: AddressLike,
        arg3: BigNumberish,
        arg4: AddressLike,
        arg5: BigNumberish,
        arg6: BytesLike
    ], [
        [string, bigint]
    ], "nonpayable">;
    getFunction(nameOrSignature: "wstETHAddress"): TypedContractMethod<[], [string], "view">;
    getEvent(key: "AddressUpdated"): TypedContractEvent<AddressUpdatedEvent.InputTuple, AddressUpdatedEvent.OutputTuple, AddressUpdatedEvent.OutputObject>;
    getEvent(key: "DepositedOnProtocol"): TypedContractEvent<DepositedOnProtocolEvent.InputTuple, DepositedOnProtocolEvent.OutputTuple, DepositedOnProtocolEvent.OutputObject>;
    getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
    getEvent(key: "Paused"): TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
    getEvent(key: "RoleAdminChanged"): TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
    getEvent(key: "RoleGranted"): TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
    getEvent(key: "RoleRevoked"): TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
    getEvent(key: "SlippageUpdated"): TypedContractEvent<SlippageUpdatedEvent.InputTuple, SlippageUpdatedEvent.OutputTuple, SlippageUpdatedEvent.OutputObject>;
    getEvent(key: "Unpaused"): TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
    getEvent(key: "WithdrawFromProtocol"): TypedContractEvent<WithdrawFromProtocolEvent.InputTuple, WithdrawFromProtocolEvent.OutputTuple, WithdrawFromProtocolEvent.OutputObject>;
    filters: {
        "AddressUpdated(string,address)": TypedContractEvent<AddressUpdatedEvent.InputTuple, AddressUpdatedEvent.OutputTuple, AddressUpdatedEvent.OutputObject>;
        AddressUpdated: TypedContractEvent<AddressUpdatedEvent.InputTuple, AddressUpdatedEvent.OutputTuple, AddressUpdatedEvent.OutputObject>;
        "DepositedOnProtocol(address,address,uint256,address,uint256)": TypedContractEvent<DepositedOnProtocolEvent.InputTuple, DepositedOnProtocolEvent.OutputTuple, DepositedOnProtocolEvent.OutputObject>;
        DepositedOnProtocol: TypedContractEvent<DepositedOnProtocolEvent.InputTuple, DepositedOnProtocolEvent.OutputTuple, DepositedOnProtocolEvent.OutputObject>;
        "Initialized(uint64)": TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        Initialized: TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        "Paused(address)": TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
        Paused: TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
        "RoleAdminChanged(bytes32,bytes32,bytes32)": TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        RoleAdminChanged: TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        "RoleGranted(bytes32,address,address)": TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        RoleGranted: TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        "RoleRevoked(bytes32,address,address)": TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        RoleRevoked: TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        "SlippageUpdated(uint256)": TypedContractEvent<SlippageUpdatedEvent.InputTuple, SlippageUpdatedEvent.OutputTuple, SlippageUpdatedEvent.OutputObject>;
        SlippageUpdated: TypedContractEvent<SlippageUpdatedEvent.InputTuple, SlippageUpdatedEvent.OutputTuple, SlippageUpdatedEvent.OutputObject>;
        "Unpaused(address)": TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
        Unpaused: TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
        "WithdrawFromProtocol(address,address,address,uint256,address,uint256)": TypedContractEvent<WithdrawFromProtocolEvent.InputTuple, WithdrawFromProtocolEvent.OutputTuple, WithdrawFromProtocolEvent.OutputObject>;
        WithdrawFromProtocol: TypedContractEvent<WithdrawFromProtocolEvent.InputTuple, WithdrawFromProtocolEvent.OutputTuple, WithdrawFromProtocolEvent.OutputObject>;
    };
}
//# sourceMappingURL=LidoAdapter.d.ts.map