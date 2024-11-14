import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../common";
export interface RocketSettingsMockInterface extends Interface {
    getFunction(nameOrSignature: "getDepositEnabled" | "getDepositFee" | "getMaximumDepositPoolSize" | "getMinimumDeposit" | "setDepositEnabled" | "setDepositFee" | "setMaximumDepositPoolSize" | "setMinimumDeposit"): FunctionFragment;
    encodeFunctionData(functionFragment: "getDepositEnabled", values?: undefined): string;
    encodeFunctionData(functionFragment: "getDepositFee", values?: undefined): string;
    encodeFunctionData(functionFragment: "getMaximumDepositPoolSize", values?: undefined): string;
    encodeFunctionData(functionFragment: "getMinimumDeposit", values?: undefined): string;
    encodeFunctionData(functionFragment: "setDepositEnabled", values: [boolean]): string;
    encodeFunctionData(functionFragment: "setDepositFee", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "setMaximumDepositPoolSize", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "setMinimumDeposit", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "getDepositEnabled", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDepositFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getMaximumDepositPoolSize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getMinimumDeposit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setDepositEnabled", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setDepositFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setMaximumDepositPoolSize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setMinimumDeposit", data: BytesLike): Result;
}
export interface RocketSettingsMock extends BaseContract {
    connect(runner?: ContractRunner | null): RocketSettingsMock;
    waitForDeployment(): Promise<this>;
    interface: RocketSettingsMockInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    getDepositEnabled: TypedContractMethod<[], [boolean], "view">;
    getDepositFee: TypedContractMethod<[], [bigint], "view">;
    getMaximumDepositPoolSize: TypedContractMethod<[], [bigint], "view">;
    getMinimumDeposit: TypedContractMethod<[], [bigint], "view">;
    setDepositEnabled: TypedContractMethod<[
        _depositEnabled: boolean
    ], [
        void
    ], "nonpayable">;
    setDepositFee: TypedContractMethod<[
        _depositFee: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setMaximumDepositPoolSize: TypedContractMethod<[
        _maximumDepositPoolSize: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setMinimumDeposit: TypedContractMethod<[
        _minimumDeposit: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "getDepositEnabled"): TypedContractMethod<[], [boolean], "view">;
    getFunction(nameOrSignature: "getDepositFee"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "getMaximumDepositPoolSize"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "getMinimumDeposit"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "setDepositEnabled"): TypedContractMethod<[_depositEnabled: boolean], [void], "nonpayable">;
    getFunction(nameOrSignature: "setDepositFee"): TypedContractMethod<[_depositFee: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "setMaximumDepositPoolSize"): TypedContractMethod<[
        _maximumDepositPoolSize: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setMinimumDeposit"): TypedContractMethod<[_minimumDeposit: BigNumberish], [void], "nonpayable">;
    filters: {};
}
//# sourceMappingURL=RocketSettingsMock.d.ts.map