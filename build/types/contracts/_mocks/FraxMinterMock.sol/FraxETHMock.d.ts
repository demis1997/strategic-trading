import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../common";
export interface FraxETHMockInterface extends Interface {
    getFunction(nameOrSignature: "balanceOf" | "decimals" | "mint" | "name" | "symbol"): FunctionFragment;
    encodeFunctionData(functionFragment: "balanceOf", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
    encodeFunctionData(functionFragment: "mint", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
}
export interface FraxETHMock extends BaseContract {
    connect(runner?: ContractRunner | null): FraxETHMock;
    waitForDeployment(): Promise<this>;
    interface: FraxETHMockInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    balanceOf: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
    decimals: TypedContractMethod<[], [bigint], "view">;
    mint: TypedContractMethod<[
        _to: AddressLike,
        _amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    name: TypedContractMethod<[], [string], "view">;
    symbol: TypedContractMethod<[], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "balanceOf"): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "decimals"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "mint"): TypedContractMethod<[
        _to: AddressLike,
        _amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "name"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "symbol"): TypedContractMethod<[], [string], "view">;
    filters: {};
}
//# sourceMappingURL=FraxETHMock.d.ts.map