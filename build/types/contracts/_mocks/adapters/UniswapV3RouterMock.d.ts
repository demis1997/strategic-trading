import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../common";
export declare namespace UniswapV3RouterMock {
    type ExactOutputParamsStruct = {
        path: BytesLike;
        recipient: AddressLike;
        amountOut: BigNumberish;
        amountInMaximum: BigNumberish;
    };
    type ExactOutputParamsStructOutput = [
        path: string,
        recipient: string,
        amountOut: bigint,
        amountInMaximum: bigint
    ] & {
        path: string;
        recipient: string;
        amountOut: bigint;
        amountInMaximum: bigint;
    };
}
export interface UniswapV3RouterMockInterface extends Interface {
    getFunction(nameOrSignature: "exactOutput" | "output" | "setExactOutput"): FunctionFragment;
    encodeFunctionData(functionFragment: "exactOutput", values: [UniswapV3RouterMock.ExactOutputParamsStruct]): string;
    encodeFunctionData(functionFragment: "output", values?: undefined): string;
    encodeFunctionData(functionFragment: "setExactOutput", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "exactOutput", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "output", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setExactOutput", data: BytesLike): Result;
}
export interface UniswapV3RouterMock extends BaseContract {
    connect(runner?: ContractRunner | null): UniswapV3RouterMock;
    waitForDeployment(): Promise<this>;
    interface: UniswapV3RouterMockInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    exactOutput: TypedContractMethod<[
        arg0: UniswapV3RouterMock.ExactOutputParamsStruct
    ], [
        bigint
    ], "payable">;
    output: TypedContractMethod<[], [bigint], "view">;
    setExactOutput: TypedContractMethod<[
        amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "exactOutput"): TypedContractMethod<[
        arg0: UniswapV3RouterMock.ExactOutputParamsStruct
    ], [
        bigint
    ], "payable">;
    getFunction(nameOrSignature: "output"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "setExactOutput"): TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;
    filters: {};
}
//# sourceMappingURL=UniswapV3RouterMock.d.ts.map