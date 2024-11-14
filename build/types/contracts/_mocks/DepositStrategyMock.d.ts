import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export interface DepositStrategyMockInterface extends Interface {
    getFunction(nameOrSignature: "DEFAULT_ADMIN_ROLE" | "asset" | "assetPrice" | "assetsAmount" | "deployedAssetsValue" | "executeDeploymentStrategy" | "executeHarvest" | "executeWithdrawStrategy" | "getDeployedAssetsValue" | "getFirstDepositAdapter" | "getRoleAdmin" | "getTokenPrice" | "grantRole" | "hasRole" | "liquidToken" | "liquidTokenAmount" | "renounceRole" | "revokeRole" | "setDeployedAssetsValue" | "setTokenAddress" | "setTokenAmounts" | "setTokenPrice" | "supportsInterface" | "tokenPrice" | "updateDeployedAssetVaule" | "vault"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "RoleAdminChanged" | "RoleGranted" | "RoleRevoked"): EventFragment;
    encodeFunctionData(functionFragment: "DEFAULT_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "asset", values?: undefined): string;
    encodeFunctionData(functionFragment: "assetPrice", values?: undefined): string;
    encodeFunctionData(functionFragment: "assetsAmount", values?: undefined): string;
    encodeFunctionData(functionFragment: "deployedAssetsValue", values?: undefined): string;
    encodeFunctionData(functionFragment: "executeDeploymentStrategy", values: [AddressLike, AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "executeHarvest", values?: undefined): string;
    encodeFunctionData(functionFragment: "executeWithdrawStrategy", values: [AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getDeployedAssetsValue", values?: undefined): string;
    encodeFunctionData(functionFragment: "getFirstDepositAdapter", values?: undefined): string;
    encodeFunctionData(functionFragment: "getRoleAdmin", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "getTokenPrice", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "grantRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "hasRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "liquidToken", values?: undefined): string;
    encodeFunctionData(functionFragment: "liquidTokenAmount", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "revokeRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "setDeployedAssetsValue", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "setTokenAddress", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setTokenAmounts", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setTokenPrice", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "tokenPrice", values?: undefined): string;
    encodeFunctionData(functionFragment: "updateDeployedAssetVaule", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "vault", values?: undefined): string;
    decodeFunctionResult(functionFragment: "DEFAULT_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "asset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assetPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assetsAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deployedAssetsValue", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "executeDeploymentStrategy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "executeHarvest", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "executeWithdrawStrategy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDeployedAssetsValue", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getFirstDepositAdapter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTokenPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "liquidToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "liquidTokenAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setDeployedAssetsValue", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setTokenAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setTokenAmounts", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setTokenPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateDeployedAssetVaule", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "vault", data: BytesLike): Result;
}
export declare namespace RoleAdminChangedEvent {
    type InputTuple = [
        role: BytesLike,
        previousAdminRole: BytesLike,
        newAdminRole: BytesLike
    ];
    type OutputTuple = [
        role: string,
        previousAdminRole: string,
        newAdminRole: string
    ];
    interface OutputObject {
        role: string;
        previousAdminRole: string;
        newAdminRole: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace RoleGrantedEvent {
    type InputTuple = [
        role: BytesLike,
        account: AddressLike,
        sender: AddressLike
    ];
    type OutputTuple = [role: string, account: string, sender: string];
    interface OutputObject {
        role: string;
        account: string;
        sender: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace RoleRevokedEvent {
    type InputTuple = [
        role: BytesLike,
        account: AddressLike,
        sender: AddressLike
    ];
    type OutputTuple = [role: string, account: string, sender: string];
    interface OutputObject {
        role: string;
        account: string;
        sender: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface DepositStrategyMock extends BaseContract {
    connect(runner?: ContractRunner | null): DepositStrategyMock;
    waitForDeployment(): Promise<this>;
    interface: DepositStrategyMockInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    DEFAULT_ADMIN_ROLE: TypedContractMethod<[], [string], "view">;
    asset: TypedContractMethod<[], [string], "view">;
    assetPrice: TypedContractMethod<[], [bigint], "view">;
    assetsAmount: TypedContractMethod<[], [bigint], "view">;
    deployedAssetsValue: TypedContractMethod<[], [bigint], "view">;
    executeDeploymentStrategy: TypedContractMethod<[
        vaultAddress_: AddressLike,
        vaultStrategy_: AddressLike,
        asset_: AddressLike,
        amount_: BigNumberish
    ], [
        [string, bigint]
    ], "nonpayable">;
    executeHarvest: TypedContractMethod<[], [[string, bigint]], "nonpayable">;
    executeWithdrawStrategy: TypedContractMethod<[
        arg0: AddressLike,
        arg1: AddressLike,
        arg2: BigNumberish
    ], [
        [string, bigint]
    ], "nonpayable">;
    getDeployedAssetsValue: TypedContractMethod<[], [bigint], "view">;
    getFirstDepositAdapter: TypedContractMethod<[], [string], "view">;
    getRoleAdmin: TypedContractMethod<[role: BytesLike], [string], "view">;
    getTokenPrice: TypedContractMethod<[
        arg0: AddressLike
    ], [
        bigint
    ], "nonpayable">;
    grantRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    hasRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        boolean
    ], "view">;
    liquidToken: TypedContractMethod<[], [string], "view">;
    liquidTokenAmount: TypedContractMethod<[], [bigint], "view">;
    renounceRole: TypedContractMethod<[
        role: BytesLike,
        callerConfirmation: AddressLike
    ], [
        void
    ], "nonpayable">;
    revokeRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    setDeployedAssetsValue: TypedContractMethod<[
        value_: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setTokenAddress: TypedContractMethod<[
        tokenAddress_: AddressLike,
        target_: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setTokenAmounts: TypedContractMethod<[
        amount_: BigNumberish,
        target_: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setTokenPrice: TypedContractMethod<[
        tokenPrice_: BigNumberish,
        target_: BigNumberish
    ], [
        void
    ], "nonpayable">;
    supportsInterface: TypedContractMethod<[
        interfaceId: BytesLike
    ], [
        boolean
    ], "view">;
    tokenPrice: TypedContractMethod<[], [bigint], "view">;
    updateDeployedAssetVaule: TypedContractMethod<[
        arg0: BigNumberish
    ], [
        bigint
    ], "nonpayable">;
    vault: TypedContractMethod<[], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "DEFAULT_ADMIN_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "asset"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "assetPrice"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "assetsAmount"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "deployedAssetsValue"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "executeDeploymentStrategy"): TypedContractMethod<[
        vaultAddress_: AddressLike,
        vaultStrategy_: AddressLike,
        asset_: AddressLike,
        amount_: BigNumberish
    ], [
        [string, bigint]
    ], "nonpayable">;
    getFunction(nameOrSignature: "executeHarvest"): TypedContractMethod<[], [[string, bigint]], "nonpayable">;
    getFunction(nameOrSignature: "executeWithdrawStrategy"): TypedContractMethod<[
        arg0: AddressLike,
        arg1: AddressLike,
        arg2: BigNumberish
    ], [
        [string, bigint]
    ], "nonpayable">;
    getFunction(nameOrSignature: "getDeployedAssetsValue"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "getFirstDepositAdapter"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "getRoleAdmin"): TypedContractMethod<[role: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "getTokenPrice"): TypedContractMethod<[arg0: AddressLike], [bigint], "nonpayable">;
    getFunction(nameOrSignature: "grantRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "hasRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "liquidToken"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "liquidTokenAmount"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "renounceRole"): TypedContractMethod<[
        role: BytesLike,
        callerConfirmation: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "revokeRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setDeployedAssetsValue"): TypedContractMethod<[value_: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "setTokenAddress"): TypedContractMethod<[
        tokenAddress_: AddressLike,
        target_: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setTokenAmounts"): TypedContractMethod<[
        amount_: BigNumberish,
        target_: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setTokenPrice"): TypedContractMethod<[
        tokenPrice_: BigNumberish,
        target_: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "tokenPrice"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "updateDeployedAssetVaule"): TypedContractMethod<[arg0: BigNumberish], [bigint], "nonpayable">;
    getFunction(nameOrSignature: "vault"): TypedContractMethod<[], [string], "view">;
    getEvent(key: "RoleAdminChanged"): TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
    getEvent(key: "RoleGranted"): TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
    getEvent(key: "RoleRevoked"): TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
    filters: {
        "RoleAdminChanged(bytes32,bytes32,bytes32)": TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        RoleAdminChanged: TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        "RoleGranted(bytes32,address,address)": TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        RoleGranted: TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        "RoleRevoked(bytes32,address,address)": TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        RoleRevoked: TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
    };
}
//# sourceMappingURL=DepositStrategyMock.d.ts.map