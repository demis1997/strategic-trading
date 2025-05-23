/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export interface IVaultsRegistryInterface extends Interface {
  getFunction(nameOrSignature: "isVaultActive"): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "DefaultFeeRateSet"
      | "VaultDeployed"
      | "VaultImplementationChanged"
      | "VaultStatusChanged"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "isVaultActive",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "isVaultActive",
    data: BytesLike
  ): Result;
}

export namespace DefaultFeeRateSetEvent {
  export type InputTuple = [newFeeRate: BigNumberish];
  export type OutputTuple = [newFeeRate: bigint];
  export interface OutputObject {
    newFeeRate: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace VaultDeployedEvent {
  export type InputTuple = [vault: AddressLike];
  export type OutputTuple = [vault: string];
  export interface OutputObject {
    vault: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace VaultImplementationChangedEvent {
  export type InputTuple = [newImplementation: AddressLike];
  export type OutputTuple = [newImplementation: string];
  export interface OutputObject {
    newImplementation: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace VaultStatusChangedEvent {
  export type InputTuple = [vaultAddress: AddressLike, status: boolean];
  export type OutputTuple = [vaultAddress: string, status: boolean];
  export interface OutputObject {
    vaultAddress: string;
    status: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IVaultsRegistry extends BaseContract {
  connect(runner?: ContractRunner | null): IVaultsRegistry;
  waitForDeployment(): Promise<this>;

  interface: IVaultsRegistryInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  isVaultActive: TypedContractMethod<
    [vaultAddress_: AddressLike],
    [boolean],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "isVaultActive"
  ): TypedContractMethod<[vaultAddress_: AddressLike], [boolean], "view">;

  getEvent(
    key: "DefaultFeeRateSet"
  ): TypedContractEvent<
    DefaultFeeRateSetEvent.InputTuple,
    DefaultFeeRateSetEvent.OutputTuple,
    DefaultFeeRateSetEvent.OutputObject
  >;
  getEvent(
    key: "VaultDeployed"
  ): TypedContractEvent<
    VaultDeployedEvent.InputTuple,
    VaultDeployedEvent.OutputTuple,
    VaultDeployedEvent.OutputObject
  >;
  getEvent(
    key: "VaultImplementationChanged"
  ): TypedContractEvent<
    VaultImplementationChangedEvent.InputTuple,
    VaultImplementationChangedEvent.OutputTuple,
    VaultImplementationChangedEvent.OutputObject
  >;
  getEvent(
    key: "VaultStatusChanged"
  ): TypedContractEvent<
    VaultStatusChangedEvent.InputTuple,
    VaultStatusChangedEvent.OutputTuple,
    VaultStatusChangedEvent.OutputObject
  >;

  filters: {
    "DefaultFeeRateSet(uint256)": TypedContractEvent<
      DefaultFeeRateSetEvent.InputTuple,
      DefaultFeeRateSetEvent.OutputTuple,
      DefaultFeeRateSetEvent.OutputObject
    >;
    DefaultFeeRateSet: TypedContractEvent<
      DefaultFeeRateSetEvent.InputTuple,
      DefaultFeeRateSetEvent.OutputTuple,
      DefaultFeeRateSetEvent.OutputObject
    >;

    "VaultDeployed(address)": TypedContractEvent<
      VaultDeployedEvent.InputTuple,
      VaultDeployedEvent.OutputTuple,
      VaultDeployedEvent.OutputObject
    >;
    VaultDeployed: TypedContractEvent<
      VaultDeployedEvent.InputTuple,
      VaultDeployedEvent.OutputTuple,
      VaultDeployedEvent.OutputObject
    >;

    "VaultImplementationChanged(address)": TypedContractEvent<
      VaultImplementationChangedEvent.InputTuple,
      VaultImplementationChangedEvent.OutputTuple,
      VaultImplementationChangedEvent.OutputObject
    >;
    VaultImplementationChanged: TypedContractEvent<
      VaultImplementationChangedEvent.InputTuple,
      VaultImplementationChangedEvent.OutputTuple,
      VaultImplementationChangedEvent.OutputObject
    >;

    "VaultStatusChanged(address,bool)": TypedContractEvent<
      VaultStatusChangedEvent.InputTuple,
      VaultStatusChangedEvent.OutputTuple,
      VaultStatusChangedEvent.OutputObject
    >;
    VaultStatusChanged: TypedContractEvent<
      VaultStatusChangedEvent.InputTuple,
      VaultStatusChangedEvent.OutputTuple,
      VaultStatusChangedEvent.OutputObject
    >;
  };
}
