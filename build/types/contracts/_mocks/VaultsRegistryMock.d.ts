import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export interface VaultsRegistryMockInterface extends Interface {
    getFunction(nameOrSignature: "isVaultActive" | "setVaultStatus" | "validVaults"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "VaultStatusChanged"): EventFragment;
    encodeFunctionData(functionFragment: "isVaultActive", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setVaultStatus", values: [AddressLike, boolean]): string;
    encodeFunctionData(functionFragment: "validVaults", values: [AddressLike]): string;
    decodeFunctionResult(functionFragment: "isVaultActive", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setVaultStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "validVaults", data: BytesLike): Result;
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
export interface VaultsRegistryMock extends BaseContract {
    connect(runner?: ContractRunner | null): VaultsRegistryMock;
    waitForDeployment(): Promise<this>;
    interface: VaultsRegistryMockInterface;
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
    setVaultStatus: TypedContractMethod<[
        vaultAddress_: AddressLike,
        status_: boolean
    ], [
        void
    ], "nonpayable">;
    validVaults: TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "isVaultActive"): TypedContractMethod<[vaultAddress_: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "setVaultStatus"): TypedContractMethod<[
        vaultAddress_: AddressLike,
        status_: boolean
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "validVaults"): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
    getEvent(key: "VaultStatusChanged"): TypedContractEvent<VaultStatusChangedEvent.InputTuple, VaultStatusChangedEvent.OutputTuple, VaultStatusChangedEvent.OutputObject>;
    filters: {
        "VaultStatusChanged(address,bool)": TypedContractEvent<VaultStatusChangedEvent.InputTuple, VaultStatusChangedEvent.OutputTuple, VaultStatusChangedEvent.OutputObject>;
        VaultStatusChanged: TypedContractEvent<VaultStatusChangedEvent.InputTuple, VaultStatusChangedEvent.OutputTuple, VaultStatusChangedEvent.OutputObject>;
    };
}
//# sourceMappingURL=VaultsRegistryMock.d.ts.map