import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../common";
export interface FraxMinterMockInterface extends Interface {
    getFunction(nameOrSignature: "frxETH" | "sfrxETH" | "submitAndDeposit"): FunctionFragment;
    encodeFunctionData(functionFragment: "frxETH", values?: undefined): string;
    encodeFunctionData(functionFragment: "sfrxETH", values?: undefined): string;
    encodeFunctionData(functionFragment: "submitAndDeposit", values: [AddressLike]): string;
    decodeFunctionResult(functionFragment: "frxETH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sfrxETH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "submitAndDeposit", data: BytesLike): Result;
}
export interface FraxMinterMock extends BaseContract {
    connect(runner?: ContractRunner | null): FraxMinterMock;
    waitForDeployment(): Promise<this>;
    interface: FraxMinterMockInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    frxETH: TypedContractMethod<[], [string], "view">;
    sfrxETH: TypedContractMethod<[], [string], "view">;
    submitAndDeposit: TypedContractMethod<[
        _recipient: AddressLike
    ], [
        bigint
    ], "payable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "frxETH"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "sfrxETH"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "submitAndDeposit"): TypedContractMethod<[_recipient: AddressLike], [bigint], "payable">;
    filters: {};
}
//# sourceMappingURL=FraxMinterMock.d.ts.map