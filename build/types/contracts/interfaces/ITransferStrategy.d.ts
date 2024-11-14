import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../common";
export interface ITransferStrategyInterface extends Interface {
    getFunction(nameOrSignature: "executePartialTransferStrategy"): FunctionFragment;
    encodeFunctionData(functionFragment: "executePartialTransferStrategy", values: [AddressLike, AddressLike, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "executePartialTransferStrategy", data: BytesLike): Result;
}
export interface ITransferStrategy extends BaseContract {
    connect(runner?: ContractRunner | null): ITransferStrategy;
    waitForDeployment(): Promise<this>;
    interface: ITransferStrategyInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    executePartialTransferStrategy: TypedContractMethod<[
        from_: AddressLike,
        to_: AddressLike,
        assetAmount: BigNumberish
    ], [
        [string[], bigint[]] & {
            vaults: string[];
            shares: bigint[];
        }
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "executePartialTransferStrategy"): TypedContractMethod<[
        from_: AddressLike,
        to_: AddressLike,
        assetAmount: BigNumberish
    ], [
        [string[], bigint[]] & {
            vaults: string[];
            shares: bigint[];
        }
    ], "view">;
    filters: {};
}
//# sourceMappingURL=ITransferStrategy.d.ts.map