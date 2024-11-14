import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export interface ISwapperInterface extends Interface {
    getFunction(nameOrSignature: "setDefaultSlippage" | "swap"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "DefaultSlippageUpdated" | "SwapExecuted"): EventFragment;
    encodeFunctionData(functionFragment: "setDefaultSlippage", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "swap", values: [
        AddressLike,
        AddressLike,
        BigNumberish,
        AddressLike,
        AddressLike,
        BigNumberish,
        BigNumberish
    ]): string;
    decodeFunctionResult(functionFragment: "setDefaultSlippage", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "swap", data: BytesLike): Result;
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
export interface ISwapper extends BaseContract {
    connect(runner?: ContractRunner | null): ISwapper;
    waitForDeployment(): Promise<this>;
    interface: ISwapperInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    setDefaultSlippage: TypedContractMethod<[
        slippage: BigNumberish
    ], [
        void
    ], "nonpayable">;
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
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "setDefaultSlippage"): TypedContractMethod<[slippage: BigNumberish], [void], "nonpayable">;
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
    getEvent(key: "DefaultSlippageUpdated"): TypedContractEvent<DefaultSlippageUpdatedEvent.InputTuple, DefaultSlippageUpdatedEvent.OutputTuple, DefaultSlippageUpdatedEvent.OutputObject>;
    getEvent(key: "SwapExecuted"): TypedContractEvent<SwapExecutedEvent.InputTuple, SwapExecutedEvent.OutputTuple, SwapExecutedEvent.OutputObject>;
    filters: {
        "DefaultSlippageUpdated(uint256,uint256)": TypedContractEvent<DefaultSlippageUpdatedEvent.InputTuple, DefaultSlippageUpdatedEvent.OutputTuple, DefaultSlippageUpdatedEvent.OutputObject>;
        DefaultSlippageUpdated: TypedContractEvent<DefaultSlippageUpdatedEvent.InputTuple, DefaultSlippageUpdatedEvent.OutputTuple, DefaultSlippageUpdatedEvent.OutputObject>;
        "SwapExecuted(address,address,address,address,uint256,uint256)": TypedContractEvent<SwapExecutedEvent.InputTuple, SwapExecutedEvent.OutputTuple, SwapExecutedEvent.OutputObject>;
        SwapExecuted: TypedContractEvent<SwapExecutedEvent.InputTuple, SwapExecutedEvent.OutputTuple, SwapExecutedEvent.OutputObject>;
    };
}
//# sourceMappingURL=ISwapper.d.ts.map