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

export interface IAdapterInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "claimEarnings"
      | "deposit"
      | "getProtocol"
      | "getSlippage"
      | "getTokenPrice"
      | "withdraw"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "AddressUpdated"
      | "DepositedOnProtocol"
      | "SlippageUpdated"
      | "WithdrawFromProtocol"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "claimEarnings",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [AddressLike, AddressLike, AddressLike, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "getProtocol",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getSlippage",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenPrice",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [
      AddressLike,
      AddressLike,
      AddressLike,
      BigNumberish,
      AddressLike,
      BigNumberish,
      BytesLike
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "claimEarnings",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getProtocol",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSlippage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTokenPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
}

export namespace AddressUpdatedEvent {
  export type InputTuple = [which: string, newAddress: AddressLike];
  export type OutputTuple = [which: string, newAddress: string];
  export interface OutputObject {
    which: string;
    newAddress: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DepositedOnProtocolEvent {
  export type InputTuple = [
    sender: AddressLike,
    token: AddressLike,
    tokenAmount: BigNumberish,
    liquidTkn: AddressLike,
    liquidTknAmount: BigNumberish
  ];
  export type OutputTuple = [
    sender: string,
    token: string,
    tokenAmount: bigint,
    liquidTkn: string,
    liquidTknAmount: bigint
  ];
  export interface OutputObject {
    sender: string;
    token: string;
    tokenAmount: bigint;
    liquidTkn: string;
    liquidTknAmount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SlippageUpdatedEvent {
  export type InputTuple = [newSlippage: BigNumberish];
  export type OutputTuple = [newSlippage: bigint];
  export interface OutputObject {
    newSlippage: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace WithdrawFromProtocolEvent {
  export type InputTuple = [
    caller_: AddressLike,
    receiver_: AddressLike,
    liquidTokenAddress_: AddressLike,
    amountSpent: BigNumberish,
    asset_: AddressLike,
    assetsAmount_: BigNumberish
  ];
  export type OutputTuple = [
    caller_: string,
    receiver_: string,
    liquidTokenAddress_: string,
    amountSpent: bigint,
    asset_: string,
    assetsAmount_: bigint
  ];
  export interface OutputObject {
    caller_: string;
    receiver_: string;
    liquidTokenAddress_: string;
    amountSpent: bigint;
    asset_: string;
    assetsAmount_: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IAdapter extends BaseContract {
  connect(runner?: ContractRunner | null): IAdapter;
  waitForDeployment(): Promise<this>;

  interface: IAdapterInterface;

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

  claimEarnings: TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike],
    [[string, bigint]],
    "nonpayable"
  >;

  deposit: TypedContractMethod<
    [
      arg0: AddressLike,
      arg1: AddressLike,
      arg2: AddressLike,
      arg3: BigNumberish,
      arg4: boolean
    ],
    [[string, bigint]],
    "nonpayable"
  >;

  getProtocol: TypedContractMethod<[], [string], "view">;

  getSlippage: TypedContractMethod<[], [bigint], "view">;

  getTokenPrice: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  withdraw: TypedContractMethod<
    [
      caller_: AddressLike,
      receiver_: AddressLike,
      asset_: AddressLike,
      assetsAmount_: BigNumberish,
      liquidTokenAddress_: AddressLike,
      liquidTokenQty_: BigNumberish,
      path_: BytesLike
    ],
    [[string, bigint]],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "claimEarnings"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike],
    [[string, bigint]],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "deposit"
  ): TypedContractMethod<
    [
      arg0: AddressLike,
      arg1: AddressLike,
      arg2: AddressLike,
      arg3: BigNumberish,
      arg4: boolean
    ],
    [[string, bigint]],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getProtocol"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getSlippage"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getTokenPrice"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "withdraw"
  ): TypedContractMethod<
    [
      caller_: AddressLike,
      receiver_: AddressLike,
      asset_: AddressLike,
      assetsAmount_: BigNumberish,
      liquidTokenAddress_: AddressLike,
      liquidTokenQty_: BigNumberish,
      path_: BytesLike
    ],
    [[string, bigint]],
    "nonpayable"
  >;

  getEvent(
    key: "AddressUpdated"
  ): TypedContractEvent<
    AddressUpdatedEvent.InputTuple,
    AddressUpdatedEvent.OutputTuple,
    AddressUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "DepositedOnProtocol"
  ): TypedContractEvent<
    DepositedOnProtocolEvent.InputTuple,
    DepositedOnProtocolEvent.OutputTuple,
    DepositedOnProtocolEvent.OutputObject
  >;
  getEvent(
    key: "SlippageUpdated"
  ): TypedContractEvent<
    SlippageUpdatedEvent.InputTuple,
    SlippageUpdatedEvent.OutputTuple,
    SlippageUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "WithdrawFromProtocol"
  ): TypedContractEvent<
    WithdrawFromProtocolEvent.InputTuple,
    WithdrawFromProtocolEvent.OutputTuple,
    WithdrawFromProtocolEvent.OutputObject
  >;

  filters: {
    "AddressUpdated(string,address)": TypedContractEvent<
      AddressUpdatedEvent.InputTuple,
      AddressUpdatedEvent.OutputTuple,
      AddressUpdatedEvent.OutputObject
    >;
    AddressUpdated: TypedContractEvent<
      AddressUpdatedEvent.InputTuple,
      AddressUpdatedEvent.OutputTuple,
      AddressUpdatedEvent.OutputObject
    >;

    "DepositedOnProtocol(address,address,uint256,address,uint256)": TypedContractEvent<
      DepositedOnProtocolEvent.InputTuple,
      DepositedOnProtocolEvent.OutputTuple,
      DepositedOnProtocolEvent.OutputObject
    >;
    DepositedOnProtocol: TypedContractEvent<
      DepositedOnProtocolEvent.InputTuple,
      DepositedOnProtocolEvent.OutputTuple,
      DepositedOnProtocolEvent.OutputObject
    >;

    "SlippageUpdated(uint256)": TypedContractEvent<
      SlippageUpdatedEvent.InputTuple,
      SlippageUpdatedEvent.OutputTuple,
      SlippageUpdatedEvent.OutputObject
    >;
    SlippageUpdated: TypedContractEvent<
      SlippageUpdatedEvent.InputTuple,
      SlippageUpdatedEvent.OutputTuple,
      SlippageUpdatedEvent.OutputObject
    >;

    "WithdrawFromProtocol(address,address,address,uint256,address,uint256)": TypedContractEvent<
      WithdrawFromProtocolEvent.InputTuple,
      WithdrawFromProtocolEvent.OutputTuple,
      WithdrawFromProtocolEvent.OutputObject
    >;
    WithdrawFromProtocol: TypedContractEvent<
      WithdrawFromProtocolEvent.InputTuple,
      WithdrawFromProtocolEvent.OutputTuple,
      WithdrawFromProtocolEvent.OutputObject
    >;
  };
}
