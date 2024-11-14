import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export interface IVaultsRegistryInterface extends Interface {
    getFunction(nameOrSignature: "isVaultActive"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "DefaultFeeRateSet" | "VaultDeployed" | "VaultImplementationChanged" | "VaultStatusChanged"): EventFragment;
    encodeFunctionData(functionFragment: "isVaultActive", values: [AddressLike]): string;
    decodeFunctionResult(functionFragment: "isVaultActive", data: BytesLike): Result;
}
export declare namespace DefaultFeeRateSetEvent {
    type InputTuple = [newFeeRate: BigNumberish];
    type OutputTuple = [newFeeRate: bigint];
    interface OutputObject {
        newFeeRate: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace VaultDeployedEvent {
    type InputTuple = [vault: AddressLike];
    type OutputTuple = [vault: string];
    interface OutputObject {
        vault: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace VaultImplementationChangedEvent {
    type InputTuple = [newImplementation: AddressLike];
    type OutputTuple = [newImplementation: string];
    interface OutputObject {
        newImplementation: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace VaultStatusChangedEvent {
    type InputTuple = [vaultAddress: AddressLike, status: boolean];
    type OutputTuple = [vaultAddress: string, status: boolean];
    interface OutputObject {
        vaultAddress: string;
        status: boolean;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface IVaultsRegistry extends BaseContract {
    connect(runner?: ContractRunner | null): IVaultsRegistry;
    waitForDeployment(): Promise<this>;
    interface: IVaultsRegistryInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    isVaultActive: TypedContractMethod<[
        vaultAddress_: AddressLike
    ], [
        boolean
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "isVaultActive"): TypedContractMethod<[vaultAddress_: AddressLike], [boolean], "view">;
    getEvent(key: "DefaultFeeRateSet"): TypedContractEvent<DefaultFeeRateSetEvent.InputTuple, DefaultFeeRateSetEvent.OutputTuple, DefaultFeeRateSetEvent.OutputObject>;
    getEvent(key: "VaultDeployed"): TypedContractEvent<VaultDeployedEvent.InputTuple, VaultDeployedEvent.OutputTuple, VaultDeployedEvent.OutputObject>;
    getEvent(key: "VaultImplementationChanged"): TypedContractEvent<VaultImplementationChangedEvent.InputTuple, VaultImplementationChangedEvent.OutputTuple, VaultImplementationChangedEvent.OutputObject>;
    getEvent(key: "VaultStatusChanged"): TypedContractEvent<VaultStatusChangedEvent.InputTuple, VaultStatusChangedEvent.OutputTuple, VaultStatusChangedEvent.OutputObject>;
    filters: {
        "DefaultFeeRateSet(uint256)": TypedContractEvent<DefaultFeeRateSetEvent.InputTuple, DefaultFeeRateSetEvent.OutputTuple, DefaultFeeRateSetEvent.OutputObject>;
        DefaultFeeRateSet: TypedContractEvent<DefaultFeeRateSetEvent.InputTuple, DefaultFeeRateSetEvent.OutputTuple, DefaultFeeRateSetEvent.OutputObject>;
        "VaultDeployed(address)": TypedContractEvent<VaultDeployedEvent.InputTuple, VaultDeployedEvent.OutputTuple, VaultDeployedEvent.OutputObject>;
        VaultDeployed: TypedContractEvent<VaultDeployedEvent.InputTuple, VaultDeployedEvent.OutputTuple, VaultDeployedEvent.OutputObject>;
        "VaultImplementationChanged(address)": TypedContractEvent<VaultImplementationChangedEvent.InputTuple, VaultImplementationChangedEvent.OutputTuple, VaultImplementationChangedEvent.OutputObject>;
        VaultImplementationChanged: TypedContractEvent<VaultImplementationChangedEvent.InputTuple, VaultImplementationChangedEvent.OutputTuple, VaultImplementationChangedEvent.OutputObject>;
        "VaultStatusChanged(address,bool)": TypedContractEvent<VaultStatusChangedEvent.InputTuple, VaultStatusChangedEvent.OutputTuple, VaultStatusChangedEvent.OutputObject>;
        VaultStatusChanged: TypedContractEvent<VaultStatusChangedEvent.InputTuple, VaultStatusChangedEvent.OutputTuple, VaultStatusChangedEvent.OutputObject>;
    };
}
//# sourceMappingURL=IVaultsRegistry.d.ts.map