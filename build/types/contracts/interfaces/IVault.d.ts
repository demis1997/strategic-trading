import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export interface IVaultInterface extends Interface {
    getFunction(nameOrSignature: "deployAssets" | "harvest" | "initialize"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AssetsDeployed" | "HarvestExecuted" | "LiveValuationSet" | "MasterTokenAddressSet" | "ValuationSourceSet" | "VaultStrategyAddressSet" | "VaultValuationUpdated" | "VaultsRegistryAddressSet" | "WithdrawStrategyAddressSet"): EventFragment;
    encodeFunctionData(functionFragment: "deployAssets", values?: undefined): string;
    encodeFunctionData(functionFragment: "harvest", values?: undefined): string;
    encodeFunctionData(functionFragment: "initialize", values: [AddressLike, AddressLike, AddressLike, AddressLike, string, string]): string;
    decodeFunctionResult(functionFragment: "deployAssets", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "harvest", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
}
export declare namespace AssetsDeployedEvent {
    type InputTuple = [
        liquidToken: AddressLike,
        liquidTokenAmount: BigNumberish,
        pendingDepositAssets: BigNumberish,
        caller: AddressLike
    ];
    type OutputTuple = [
        liquidToken: string,
        liquidTokenAmount: bigint,
        pendingDepositAssets: bigint,
        caller: string
    ];
    interface OutputObject {
        liquidToken: string;
        liquidTokenAmount: bigint;
        pendingDepositAssets: bigint;
        caller: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace HarvestExecutedEvent {
    type InputTuple = [
        token: AddressLike,
        tokenAmount: BigNumberish,
        caller: AddressLike
    ];
    type OutputTuple = [
        token: string,
        tokenAmount: bigint,
        caller: string
    ];
    interface OutputObject {
        token: string;
        tokenAmount: bigint;
        caller: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace LiveValuationSetEvent {
    type InputTuple = [status: boolean, target: BigNumberish];
    type OutputTuple = [status: boolean, target: bigint];
    interface OutputObject {
        status: boolean;
        target: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace MasterTokenAddressSetEvent {
    type InputTuple = [newAddress: AddressLike];
    type OutputTuple = [newAddress: string];
    interface OutputObject {
        newAddress: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ValuationSourceSetEvent {
    type InputTuple = [valuationSource: BigNumberish];
    type OutputTuple = [valuationSource: bigint];
    interface OutputObject {
        valuationSource: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace VaultStrategyAddressSetEvent {
    type InputTuple = [newAddress: AddressLike];
    type OutputTuple = [newAddress: string];
    interface OutputObject {
        newAddress: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace VaultValuationUpdatedEvent {
    type InputTuple = [
        vaultValuation: BigNumberish,
        deployedAssetsValue: BigNumberish,
        pendingDepositAssets: BigNumberish,
        caller: AddressLike
    ];
    type OutputTuple = [
        vaultValuation: bigint,
        deployedAssetsValue: bigint,
        pendingDepositAssets: bigint,
        caller: string
    ];
    interface OutputObject {
        vaultValuation: bigint;
        deployedAssetsValue: bigint;
        pendingDepositAssets: bigint;
        caller: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace VaultsRegistryAddressSetEvent {
    type InputTuple = [newAddress: AddressLike];
    type OutputTuple = [newAddress: string];
    interface OutputObject {
        newAddress: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace WithdrawStrategyAddressSetEvent {
    type InputTuple = [newAddress: AddressLike];
    type OutputTuple = [newAddress: string];
    interface OutputObject {
        newAddress: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface IVault extends BaseContract {
    connect(runner?: ContractRunner | null): IVault;
    waitForDeployment(): Promise<this>;
    interface: IVaultInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    deployAssets: TypedContractMethod<[], [[string, bigint]], "nonpayable">;
    harvest: TypedContractMethod<[], [[string, bigint]], "nonpayable">;
    initialize: TypedContractMethod<[
        underlyingTokenAddress_: AddressLike,
        masterTokenAddress_: AddressLike,
        vaultsRegistryAddress_: AddressLike,
        ownerAddress_: AddressLike,
        sharesName_: string,
        sharesSymbol_: string
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "deployAssets"): TypedContractMethod<[], [[string, bigint]], "nonpayable">;
    getFunction(nameOrSignature: "harvest"): TypedContractMethod<[], [[string, bigint]], "nonpayable">;
    getFunction(nameOrSignature: "initialize"): TypedContractMethod<[
        underlyingTokenAddress_: AddressLike,
        masterTokenAddress_: AddressLike,
        vaultsRegistryAddress_: AddressLike,
        ownerAddress_: AddressLike,
        sharesName_: string,
        sharesSymbol_: string
    ], [
        void
    ], "nonpayable">;
    getEvent(key: "AssetsDeployed"): TypedContractEvent<AssetsDeployedEvent.InputTuple, AssetsDeployedEvent.OutputTuple, AssetsDeployedEvent.OutputObject>;
    getEvent(key: "HarvestExecuted"): TypedContractEvent<HarvestExecutedEvent.InputTuple, HarvestExecutedEvent.OutputTuple, HarvestExecutedEvent.OutputObject>;
    getEvent(key: "LiveValuationSet"): TypedContractEvent<LiveValuationSetEvent.InputTuple, LiveValuationSetEvent.OutputTuple, LiveValuationSetEvent.OutputObject>;
    getEvent(key: "MasterTokenAddressSet"): TypedContractEvent<MasterTokenAddressSetEvent.InputTuple, MasterTokenAddressSetEvent.OutputTuple, MasterTokenAddressSetEvent.OutputObject>;
    getEvent(key: "ValuationSourceSet"): TypedContractEvent<ValuationSourceSetEvent.InputTuple, ValuationSourceSetEvent.OutputTuple, ValuationSourceSetEvent.OutputObject>;
    getEvent(key: "VaultStrategyAddressSet"): TypedContractEvent<VaultStrategyAddressSetEvent.InputTuple, VaultStrategyAddressSetEvent.OutputTuple, VaultStrategyAddressSetEvent.OutputObject>;
    getEvent(key: "VaultValuationUpdated"): TypedContractEvent<VaultValuationUpdatedEvent.InputTuple, VaultValuationUpdatedEvent.OutputTuple, VaultValuationUpdatedEvent.OutputObject>;
    getEvent(key: "VaultsRegistryAddressSet"): TypedContractEvent<VaultsRegistryAddressSetEvent.InputTuple, VaultsRegistryAddressSetEvent.OutputTuple, VaultsRegistryAddressSetEvent.OutputObject>;
    getEvent(key: "WithdrawStrategyAddressSet"): TypedContractEvent<WithdrawStrategyAddressSetEvent.InputTuple, WithdrawStrategyAddressSetEvent.OutputTuple, WithdrawStrategyAddressSetEvent.OutputObject>;
    filters: {
        "AssetsDeployed(address,uint256,uint256,address)": TypedContractEvent<AssetsDeployedEvent.InputTuple, AssetsDeployedEvent.OutputTuple, AssetsDeployedEvent.OutputObject>;
        AssetsDeployed: TypedContractEvent<AssetsDeployedEvent.InputTuple, AssetsDeployedEvent.OutputTuple, AssetsDeployedEvent.OutputObject>;
        "HarvestExecuted(address,uint256,address)": TypedContractEvent<HarvestExecutedEvent.InputTuple, HarvestExecutedEvent.OutputTuple, HarvestExecutedEvent.OutputObject>;
        HarvestExecuted: TypedContractEvent<HarvestExecutedEvent.InputTuple, HarvestExecutedEvent.OutputTuple, HarvestExecutedEvent.OutputObject>;
        "LiveValuationSet(bool,uint256)": TypedContractEvent<LiveValuationSetEvent.InputTuple, LiveValuationSetEvent.OutputTuple, LiveValuationSetEvent.OutputObject>;
        LiveValuationSet: TypedContractEvent<LiveValuationSetEvent.InputTuple, LiveValuationSetEvent.OutputTuple, LiveValuationSetEvent.OutputObject>;
        "MasterTokenAddressSet(address)": TypedContractEvent<MasterTokenAddressSetEvent.InputTuple, MasterTokenAddressSetEvent.OutputTuple, MasterTokenAddressSetEvent.OutputObject>;
        MasterTokenAddressSet: TypedContractEvent<MasterTokenAddressSetEvent.InputTuple, MasterTokenAddressSetEvent.OutputTuple, MasterTokenAddressSetEvent.OutputObject>;
        "ValuationSourceSet(uint8)": TypedContractEvent<ValuationSourceSetEvent.InputTuple, ValuationSourceSetEvent.OutputTuple, ValuationSourceSetEvent.OutputObject>;
        ValuationSourceSet: TypedContractEvent<ValuationSourceSetEvent.InputTuple, ValuationSourceSetEvent.OutputTuple, ValuationSourceSetEvent.OutputObject>;
        "VaultStrategyAddressSet(address)": TypedContractEvent<VaultStrategyAddressSetEvent.InputTuple, VaultStrategyAddressSetEvent.OutputTuple, VaultStrategyAddressSetEvent.OutputObject>;
        VaultStrategyAddressSet: TypedContractEvent<VaultStrategyAddressSetEvent.InputTuple, VaultStrategyAddressSetEvent.OutputTuple, VaultStrategyAddressSetEvent.OutputObject>;
        "VaultValuationUpdated(uint256,uint256,uint256,address)": TypedContractEvent<VaultValuationUpdatedEvent.InputTuple, VaultValuationUpdatedEvent.OutputTuple, VaultValuationUpdatedEvent.OutputObject>;
        VaultValuationUpdated: TypedContractEvent<VaultValuationUpdatedEvent.InputTuple, VaultValuationUpdatedEvent.OutputTuple, VaultValuationUpdatedEvent.OutputObject>;
        "VaultsRegistryAddressSet(address)": TypedContractEvent<VaultsRegistryAddressSetEvent.InputTuple, VaultsRegistryAddressSetEvent.OutputTuple, VaultsRegistryAddressSetEvent.OutputObject>;
        VaultsRegistryAddressSet: TypedContractEvent<VaultsRegistryAddressSetEvent.InputTuple, VaultsRegistryAddressSetEvent.OutputTuple, VaultsRegistryAddressSetEvent.OutputObject>;
        "WithdrawStrategyAddressSet(address)": TypedContractEvent<WithdrawStrategyAddressSetEvent.InputTuple, WithdrawStrategyAddressSetEvent.OutputTuple, WithdrawStrategyAddressSetEvent.OutputObject>;
        WithdrawStrategyAddressSet: TypedContractEvent<WithdrawStrategyAddressSetEvent.InputTuple, WithdrawStrategyAddressSetEvent.OutputTuple, WithdrawStrategyAddressSetEvent.OutputObject>;
    };
}
//# sourceMappingURL=IVault.d.ts.map