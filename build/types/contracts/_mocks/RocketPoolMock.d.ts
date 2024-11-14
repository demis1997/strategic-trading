import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../common";
export interface RocketPoolMockInterface extends Interface {
    getFunction(nameOrSignature: "balance" | "deposit" | "getBalance" | "rETH" | "setBalance"): FunctionFragment;
    encodeFunctionData(functionFragment: "balance", values?: undefined): string;
    encodeFunctionData(functionFragment: "deposit", values?: undefined): string;
    encodeFunctionData(functionFragment: "getBalance", values?: undefined): string;
    encodeFunctionData(functionFragment: "rETH", values?: undefined): string;
    encodeFunctionData(functionFragment: "setBalance", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "balance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getBalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rETH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setBalance", data: BytesLike): Result;
}
export interface RocketPoolMock extends BaseContract {
    connect(runner?: ContractRunner | null): RocketPoolMock;
    waitForDeployment(): Promise<this>;
    interface: RocketPoolMockInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    balance: TypedContractMethod<[], [bigint], "view">;
    deposit: TypedContractMethod<[], [void], "payable">;
    getBalance: TypedContractMethod<[], [bigint], "view">;
    rETH: TypedContractMethod<[], [string], "view">;
    setBalance: TypedContractMethod<[bal: BigNumberish], [void], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "balance"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "deposit"): TypedContractMethod<[], [void], "payable">;
    getFunction(nameOrSignature: "getBalance"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "rETH"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "setBalance"): TypedContractMethod<[bal: BigNumberish], [void], "nonpayable">;
    filters: {};
}
//# sourceMappingURL=RocketPoolMock.d.ts.map