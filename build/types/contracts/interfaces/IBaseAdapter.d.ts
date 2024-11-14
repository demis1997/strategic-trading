import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export interface IBaseAdapterInterface extends Interface {
    getFunction(nameOrSignature: "getSlippage"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AddressUpdated" | "SlippageUpdated"): EventFragment;
    encodeFunctionData(functionFragment: "getSlippage", values?: undefined): string;
    decodeFunctionResult(functionFragment: "getSlippage", data: BytesLike): Result;
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
export interface IBaseAdapter extends BaseContract {
    connect(runner?: ContractRunner | null): IBaseAdapter;
    waitForDeployment(): Promise<this>;
    interface: IBaseAdapterInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    getSlippage: TypedContractMethod<[], [bigint], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "getSlippage"): TypedContractMethod<[], [bigint], "view">;
    getEvent(key: "AddressUpdated"): TypedContractEvent<AddressUpdatedEvent.InputTuple, AddressUpdatedEvent.OutputTuple, AddressUpdatedEvent.OutputObject>;
    getEvent(key: "SlippageUpdated"): TypedContractEvent<SlippageUpdatedEvent.InputTuple, SlippageUpdatedEvent.OutputTuple, SlippageUpdatedEvent.OutputObject>;
    filters: {
        "AddressUpdated(string,address)": TypedContractEvent<AddressUpdatedEvent.InputTuple, AddressUpdatedEvent.OutputTuple, AddressUpdatedEvent.OutputObject>;
        AddressUpdated: TypedContractEvent<AddressUpdatedEvent.InputTuple, AddressUpdatedEvent.OutputTuple, AddressUpdatedEvent.OutputObject>;
        "SlippageUpdated(uint256)": TypedContractEvent<SlippageUpdatedEvent.InputTuple, SlippageUpdatedEvent.OutputTuple, SlippageUpdatedEvent.OutputObject>;
        SlippageUpdated: TypedContractEvent<SlippageUpdatedEvent.InputTuple, SlippageUpdatedEvent.OutputTuple, SlippageUpdatedEvent.OutputObject>;
    };
}
//# sourceMappingURL=IBaseAdapter.d.ts.map