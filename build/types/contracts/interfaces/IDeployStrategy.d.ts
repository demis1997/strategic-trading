import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export interface IDeployStrategyInterface extends Interface {
    getFunction(nameOrSignature: "executeDeploymentStrategy" | "executeHarvest" | "executeWithdrawStrategy" | "getDeployedAssetsValue" | "getFirstDepositAdapter" | "updateDeployedAssetVaule"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AdaptersDeployPathSet" | "AdaptersWithdrawPathSet" | "DeployedAssetsValueUpdated" | "DeploymentStrategyExecuted" | "LiquidTokenSet" | "PriceFeedSet" | "StrategyNameSet" | "TokenWrapperSet" | "VaultAddressSet" | "WithdrawStrategyAddressSet" | "WithdrawStrategyExecuted"): EventFragment;
    encodeFunctionData(functionFragment: "executeDeploymentStrategy", values: [AddressLike, AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "executeHarvest", values?: undefined): string;
    encodeFunctionData(functionFragment: "executeWithdrawStrategy", values: [AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getDeployedAssetsValue", values?: undefined): string;
    encodeFunctionData(functionFragment: "getFirstDepositAdapter", values?: undefined): string;
    encodeFunctionData(functionFragment: "updateDeployedAssetVaule", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "executeDeploymentStrategy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "executeHarvest", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "executeWithdrawStrategy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDeployedAssetsValue", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getFirstDepositAdapter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateDeployedAssetVaule", data: BytesLike): Result;
}
export declare namespace AdaptersDeployPathSetEvent {
    type InputTuple = [newDeployPath: AddressLike[]];
    type OutputTuple = [newDeployPath: string[]];
    interface OutputObject {
        newDeployPath: string[];
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace AdaptersWithdrawPathSetEvent {
    type InputTuple = [newWithdrawPath: AddressLike[]];
    type OutputTuple = [newWithdrawPath: string[]];
    interface OutputObject {
        newWithdrawPath: string[];
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace DeployedAssetsValueUpdatedEvent {
    type InputTuple = [
        liquidTokenAddress: AddressLike,
        deployedAssetsValueETH: BigNumberish,
        strategyContract: AddressLike
    ];
    type OutputTuple = [
        liquidTokenAddress: string,
        deployedAssetsValueETH: bigint,
        strategyContract: string
    ];
    interface OutputObject {
        liquidTokenAddress: string;
        deployedAssetsValueETH: bigint;
        strategyContract: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace DeploymentStrategyExecutedEvent {
    type InputTuple = [
        assets: AddressLike,
        assetsAmount: BigNumberish,
        liquidToken: AddressLike,
        liquidTokenAmount: BigNumberish
    ];
    type OutputTuple = [
        assets: string,
        assetsAmount: bigint,
        liquidToken: string,
        liquidTokenAmount: bigint
    ];
    interface OutputObject {
        assets: string;
        assetsAmount: bigint;
        liquidToken: string;
        liquidTokenAmount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace LiquidTokenSetEvent {
    type InputTuple = [arg0: AddressLike];
    type OutputTuple = [arg0: string];
    interface OutputObject {
        arg0: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace PriceFeedSetEvent {
    type InputTuple = [token: AddressLike, priceFeed: AddressLike];
    type OutputTuple = [token: string, priceFeed: string];
    interface OutputObject {
        token: string;
        priceFeed: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace StrategyNameSetEvent {
    type InputTuple = [name: string];
    type OutputTuple = [name: string];
    interface OutputObject {
        name: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace TokenWrapperSetEvent {
    type InputTuple = [arg0: AddressLike];
    type OutputTuple = [arg0: string];
    interface OutputObject {
        arg0: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace VaultAddressSetEvent {
    type InputTuple = [vaultAddress: AddressLike];
    type OutputTuple = [vaultAddress: string];
    interface OutputObject {
        vaultAddress: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace WithdrawStrategyAddressSetEvent {
    type InputTuple = [strategyAddress: AddressLike];
    type OutputTuple = [strategyAddress: string];
    interface OutputObject {
        strategyAddress: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace WithdrawStrategyExecutedEvent {
    type InputTuple = [
        receiver: AddressLike,
        asset: AddressLike,
        assetsAmount: BigNumberish
    ];
    type OutputTuple = [
        receiver: string,
        asset: string,
        assetsAmount: bigint
    ];
    interface OutputObject {
        receiver: string;
        asset: string;
        assetsAmount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface IDeployStrategy extends BaseContract {
    connect(runner?: ContractRunner | null): IDeployStrategy;
    waitForDeployment(): Promise<this>;
    interface: IDeployStrategyInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    executeDeploymentStrategy: TypedContractMethod<[
        sender: AddressLike,
        receiver: AddressLike,
        asset: AddressLike,
        assetsAmount: BigNumberish
    ], [
        [string, bigint]
    ], "nonpayable">;
    executeHarvest: TypedContractMethod<[], [[string, bigint]], "nonpayable">;
    executeWithdrawStrategy: TypedContractMethod<[
        receiver: AddressLike,
        asset: AddressLike,
        assetsAmount: BigNumberish
    ], [
        [string, bigint]
    ], "nonpayable">;
    getDeployedAssetsValue: TypedContractMethod<[], [bigint], "view">;
    getFirstDepositAdapter: TypedContractMethod<[], [string], "nonpayable">;
    updateDeployedAssetVaule: TypedContractMethod<[
        source_: BigNumberish
    ], [
        bigint
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "executeDeploymentStrategy"): TypedContractMethod<[
        sender: AddressLike,
        receiver: AddressLike,
        asset: AddressLike,
        assetsAmount: BigNumberish
    ], [
        [string, bigint]
    ], "nonpayable">;
    getFunction(nameOrSignature: "executeHarvest"): TypedContractMethod<[], [[string, bigint]], "nonpayable">;
    getFunction(nameOrSignature: "executeWithdrawStrategy"): TypedContractMethod<[
        receiver: AddressLike,
        asset: AddressLike,
        assetsAmount: BigNumberish
    ], [
        [string, bigint]
    ], "nonpayable">;
    getFunction(nameOrSignature: "getDeployedAssetsValue"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "getFirstDepositAdapter"): TypedContractMethod<[], [string], "nonpayable">;
    getFunction(nameOrSignature: "updateDeployedAssetVaule"): TypedContractMethod<[source_: BigNumberish], [bigint], "nonpayable">;
    getEvent(key: "AdaptersDeployPathSet"): TypedContractEvent<AdaptersDeployPathSetEvent.InputTuple, AdaptersDeployPathSetEvent.OutputTuple, AdaptersDeployPathSetEvent.OutputObject>;
    getEvent(key: "AdaptersWithdrawPathSet"): TypedContractEvent<AdaptersWithdrawPathSetEvent.InputTuple, AdaptersWithdrawPathSetEvent.OutputTuple, AdaptersWithdrawPathSetEvent.OutputObject>;
    getEvent(key: "DeployedAssetsValueUpdated"): TypedContractEvent<DeployedAssetsValueUpdatedEvent.InputTuple, DeployedAssetsValueUpdatedEvent.OutputTuple, DeployedAssetsValueUpdatedEvent.OutputObject>;
    getEvent(key: "DeploymentStrategyExecuted"): TypedContractEvent<DeploymentStrategyExecutedEvent.InputTuple, DeploymentStrategyExecutedEvent.OutputTuple, DeploymentStrategyExecutedEvent.OutputObject>;
    getEvent(key: "LiquidTokenSet"): TypedContractEvent<LiquidTokenSetEvent.InputTuple, LiquidTokenSetEvent.OutputTuple, LiquidTokenSetEvent.OutputObject>;
    getEvent(key: "PriceFeedSet"): TypedContractEvent<PriceFeedSetEvent.InputTuple, PriceFeedSetEvent.OutputTuple, PriceFeedSetEvent.OutputObject>;
    getEvent(key: "StrategyNameSet"): TypedContractEvent<StrategyNameSetEvent.InputTuple, StrategyNameSetEvent.OutputTuple, StrategyNameSetEvent.OutputObject>;
    getEvent(key: "TokenWrapperSet"): TypedContractEvent<TokenWrapperSetEvent.InputTuple, TokenWrapperSetEvent.OutputTuple, TokenWrapperSetEvent.OutputObject>;
    getEvent(key: "VaultAddressSet"): TypedContractEvent<VaultAddressSetEvent.InputTuple, VaultAddressSetEvent.OutputTuple, VaultAddressSetEvent.OutputObject>;
    getEvent(key: "WithdrawStrategyAddressSet"): TypedContractEvent<WithdrawStrategyAddressSetEvent.InputTuple, WithdrawStrategyAddressSetEvent.OutputTuple, WithdrawStrategyAddressSetEvent.OutputObject>;
    getEvent(key: "WithdrawStrategyExecuted"): TypedContractEvent<WithdrawStrategyExecutedEvent.InputTuple, WithdrawStrategyExecutedEvent.OutputTuple, WithdrawStrategyExecutedEvent.OutputObject>;
    filters: {
        "AdaptersDeployPathSet(address[])": TypedContractEvent<AdaptersDeployPathSetEvent.InputTuple, AdaptersDeployPathSetEvent.OutputTuple, AdaptersDeployPathSetEvent.OutputObject>;
        AdaptersDeployPathSet: TypedContractEvent<AdaptersDeployPathSetEvent.InputTuple, AdaptersDeployPathSetEvent.OutputTuple, AdaptersDeployPathSetEvent.OutputObject>;
        "AdaptersWithdrawPathSet(address[])": TypedContractEvent<AdaptersWithdrawPathSetEvent.InputTuple, AdaptersWithdrawPathSetEvent.OutputTuple, AdaptersWithdrawPathSetEvent.OutputObject>;
        AdaptersWithdrawPathSet: TypedContractEvent<AdaptersWithdrawPathSetEvent.InputTuple, AdaptersWithdrawPathSetEvent.OutputTuple, AdaptersWithdrawPathSetEvent.OutputObject>;
        "DeployedAssetsValueUpdated(address,uint256,address)": TypedContractEvent<DeployedAssetsValueUpdatedEvent.InputTuple, DeployedAssetsValueUpdatedEvent.OutputTuple, DeployedAssetsValueUpdatedEvent.OutputObject>;
        DeployedAssetsValueUpdated: TypedContractEvent<DeployedAssetsValueUpdatedEvent.InputTuple, DeployedAssetsValueUpdatedEvent.OutputTuple, DeployedAssetsValueUpdatedEvent.OutputObject>;
        "DeploymentStrategyExecuted(address,uint256,address,uint256)": TypedContractEvent<DeploymentStrategyExecutedEvent.InputTuple, DeploymentStrategyExecutedEvent.OutputTuple, DeploymentStrategyExecutedEvent.OutputObject>;
        DeploymentStrategyExecuted: TypedContractEvent<DeploymentStrategyExecutedEvent.InputTuple, DeploymentStrategyExecutedEvent.OutputTuple, DeploymentStrategyExecutedEvent.OutputObject>;
        "LiquidTokenSet(address)": TypedContractEvent<LiquidTokenSetEvent.InputTuple, LiquidTokenSetEvent.OutputTuple, LiquidTokenSetEvent.OutputObject>;
        LiquidTokenSet: TypedContractEvent<LiquidTokenSetEvent.InputTuple, LiquidTokenSetEvent.OutputTuple, LiquidTokenSetEvent.OutputObject>;
        "PriceFeedSet(address,address)": TypedContractEvent<PriceFeedSetEvent.InputTuple, PriceFeedSetEvent.OutputTuple, PriceFeedSetEvent.OutputObject>;
        PriceFeedSet: TypedContractEvent<PriceFeedSetEvent.InputTuple, PriceFeedSetEvent.OutputTuple, PriceFeedSetEvent.OutputObject>;
        "StrategyNameSet(string)": TypedContractEvent<StrategyNameSetEvent.InputTuple, StrategyNameSetEvent.OutputTuple, StrategyNameSetEvent.OutputObject>;
        StrategyNameSet: TypedContractEvent<StrategyNameSetEvent.InputTuple, StrategyNameSetEvent.OutputTuple, StrategyNameSetEvent.OutputObject>;
        "TokenWrapperSet(address)": TypedContractEvent<TokenWrapperSetEvent.InputTuple, TokenWrapperSetEvent.OutputTuple, TokenWrapperSetEvent.OutputObject>;
        TokenWrapperSet: TypedContractEvent<TokenWrapperSetEvent.InputTuple, TokenWrapperSetEvent.OutputTuple, TokenWrapperSetEvent.OutputObject>;
        "VaultAddressSet(address)": TypedContractEvent<VaultAddressSetEvent.InputTuple, VaultAddressSetEvent.OutputTuple, VaultAddressSetEvent.OutputObject>;
        VaultAddressSet: TypedContractEvent<VaultAddressSetEvent.InputTuple, VaultAddressSetEvent.OutputTuple, VaultAddressSetEvent.OutputObject>;
        "WithdrawStrategyAddressSet(address)": TypedContractEvent<WithdrawStrategyAddressSetEvent.InputTuple, WithdrawStrategyAddressSetEvent.OutputTuple, WithdrawStrategyAddressSetEvent.OutputObject>;
        WithdrawStrategyAddressSet: TypedContractEvent<WithdrawStrategyAddressSetEvent.InputTuple, WithdrawStrategyAddressSetEvent.OutputTuple, WithdrawStrategyAddressSetEvent.OutputObject>;
        "WithdrawStrategyExecuted(address,address,uint256)": TypedContractEvent<WithdrawStrategyExecutedEvent.InputTuple, WithdrawStrategyExecutedEvent.OutputTuple, WithdrawStrategyExecutedEvent.OutputObject>;
        WithdrawStrategyExecuted: TypedContractEvent<WithdrawStrategyExecutedEvent.InputTuple, WithdrawStrategyExecutedEvent.OutputTuple, WithdrawStrategyExecutedEvent.OutputObject>;
    };
}
//# sourceMappingURL=IDeployStrategy.d.ts.map