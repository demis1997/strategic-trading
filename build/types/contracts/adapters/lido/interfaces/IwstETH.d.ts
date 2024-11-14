import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../../common";
export interface IwstETHInterface extends Interface {
    getFunction(nameOrSignature: "stEthPerToken" | "tokensPerStEth" | "wrap"): FunctionFragment;
    encodeFunctionData(functionFragment: "stEthPerToken", values?: undefined): string;
    encodeFunctionData(functionFragment: "tokensPerStEth", values?: undefined): string;
    encodeFunctionData(functionFragment: "wrap", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "stEthPerToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokensPerStEth", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "wrap", data: BytesLike): Result;
}
export interface IwstETH extends BaseContract {
    connect(runner?: ContractRunner | null): IwstETH;
    waitForDeployment(): Promise<this>;
    interface: IwstETHInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    stEthPerToken: TypedContractMethod<[], [bigint], "view">;
    tokensPerStEth: TypedContractMethod<[], [bigint], "view">;
    wrap: TypedContractMethod<[arg0: BigNumberish], [bigint], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "stEthPerToken"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "tokensPerStEth"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "wrap"): TypedContractMethod<[arg0: BigNumberish], [bigint], "nonpayable">;
    filters: {};
}
//# sourceMappingURL=IwstETH.d.ts.map