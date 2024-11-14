import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../common";
export declare namespace GenericRouter {
    type SwapDescriptionStruct = {
        srcToken: AddressLike;
        dstToken: AddressLike;
        srcReceiver: AddressLike;
        dstReceiver: AddressLike;
        amount: BigNumberish;
        minReturnAmount: BigNumberish;
        flags: BigNumberish;
    };
    type SwapDescriptionStructOutput = [
        srcToken: string,
        dstToken: string,
        srcReceiver: string,
        dstReceiver: string,
        amount: bigint,
        minReturnAmount: bigint,
        flags: bigint
    ] & {
        srcToken: string;
        dstToken: string;
        srcReceiver: string;
        dstReceiver: string;
        amount: bigint;
        minReturnAmount: bigint;
        flags: bigint;
    };
}
export interface GenericRouterInterface extends Interface {
    getFunction(nameOrSignature: "swap"): FunctionFragment;
    encodeFunctionData(functionFragment: "swap", values: [AddressLike, GenericRouter.SwapDescriptionStruct, BytesLike]): string;
    decodeFunctionResult(functionFragment: "swap", data: BytesLike): Result;
}
export interface GenericRouter extends BaseContract {
    connect(runner?: ContractRunner | null): GenericRouter;
    waitForDeployment(): Promise<this>;
    interface: GenericRouterInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    swap: TypedContractMethod<[
        executor: AddressLike,
        desc: GenericRouter.SwapDescriptionStruct,
        data: BytesLike
    ], [
        [bigint, bigint] & {
            returnAmount: bigint;
            spentAmount: bigint;
        }
    ], "payable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "swap"): TypedContractMethod<[
        executor: AddressLike,
        desc: GenericRouter.SwapDescriptionStruct,
        data: BytesLike
    ], [
        [bigint, bigint] & {
            returnAmount: bigint;
            spentAmount: bigint;
        }
    ], "payable">;
    filters: {};
}
//# sourceMappingURL=GenericRouter.d.ts.map