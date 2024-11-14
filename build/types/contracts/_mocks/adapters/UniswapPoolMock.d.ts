import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../common";
export interface UniswapPoolMockInterface extends Interface {
    getFunction(nameOrSignature: "setSlot0" | "setToken0" | "slot0" | "sqrtPriceX96" | "token0"): FunctionFragment;
    encodeFunctionData(functionFragment: "setSlot0", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "setToken0", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "slot0", values?: undefined): string;
    encodeFunctionData(functionFragment: "sqrtPriceX96", values?: undefined): string;
    encodeFunctionData(functionFragment: "token0", values?: undefined): string;
    decodeFunctionResult(functionFragment: "setSlot0", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setToken0", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "slot0", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sqrtPriceX96", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "token0", data: BytesLike): Result;
}
export interface UniswapPoolMock extends BaseContract {
    connect(runner?: ContractRunner | null): UniswapPoolMock;
    waitForDeployment(): Promise<this>;
    interface: UniswapPoolMockInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    setSlot0: TypedContractMethod<[
        sqrtPriceX96_: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setToken0: TypedContractMethod<[token0_: AddressLike], [void], "nonpayable">;
    slot0: TypedContractMethod<[
    ], [
        [bigint, bigint, bigint, bigint, bigint, bigint, boolean]
    ], "view">;
    sqrtPriceX96: TypedContractMethod<[], [bigint], "view">;
    token0: TypedContractMethod<[], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "setSlot0"): TypedContractMethod<[sqrtPriceX96_: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "setToken0"): TypedContractMethod<[token0_: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "slot0"): TypedContractMethod<[
    ], [
        [bigint, bigint, bigint, bigint, bigint, bigint, boolean]
    ], "view">;
    getFunction(nameOrSignature: "sqrtPriceX96"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "token0"): TypedContractMethod<[], [string], "view">;
    filters: {};
}
//# sourceMappingURL=UniswapPoolMock.d.ts.map