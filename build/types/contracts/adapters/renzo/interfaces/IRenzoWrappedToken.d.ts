import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../../common";
export interface IRenzoWrappedTokenInterface extends Interface {
    getFunction(nameOrSignature: "unwrap" | "wrap"): FunctionFragment;
    encodeFunctionData(functionFragment: "unwrap", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "wrap", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "unwrap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "wrap", data: BytesLike): Result;
}
export interface IRenzoWrappedToken extends BaseContract {
    connect(runner?: ContractRunner | null): IRenzoWrappedToken;
    waitForDeployment(): Promise<this>;
    interface: IRenzoWrappedTokenInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    unwrap: TypedContractMethod<[
        _pzETHAddress: BigNumberish
    ], [
        bigint
    ], "nonpayable">;
    wrap: TypedContractMethod<[
        _ezETHAmount: BigNumberish
    ], [
        bigint
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "unwrap"): TypedContractMethod<[_pzETHAddress: BigNumberish], [bigint], "nonpayable">;
    getFunction(nameOrSignature: "wrap"): TypedContractMethod<[_ezETHAmount: BigNumberish], [bigint], "nonpayable">;
    filters: {};
}
//# sourceMappingURL=IRenzoWrappedToken.d.ts.map