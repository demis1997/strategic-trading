import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../common";
export interface MockAggregationExecutorInterface extends Interface {
    getFunction(nameOrSignature: "execute"): FunctionFragment;
    encodeFunctionData(functionFragment: "execute", values: [AddressLike, BigNumberish, BytesLike]): string;
    decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
}
export interface MockAggregationExecutor extends BaseContract {
    connect(runner?: ContractRunner | null): MockAggregationExecutor;
    waitForDeployment(): Promise<this>;
    interface: MockAggregationExecutorInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    execute: TypedContractMethod<[
        arg0: AddressLike,
        arg1: BigNumberish,
        arg2: BytesLike
    ], [
        bigint
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "execute"): TypedContractMethod<[
        arg0: AddressLike,
        arg1: BigNumberish,
        arg2: BytesLike
    ], [
        bigint
    ], "nonpayable">;
    filters: {};
}
//# sourceMappingURL=MockAggregationExecutor.d.ts.map