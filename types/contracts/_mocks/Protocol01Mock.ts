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

export declare namespace Protocol01Mock {
  export type ExactOutputParamsStruct = {
    path: BytesLike;
    recipient: AddressLike;
    amountOut: BigNumberish;
    amountInMaximum: BigNumberish;
  };

  export type ExactOutputParamsStructOutput = [
    path: string,
    recipient: string,
    amountOut: bigint,
    amountInMaximum: bigint
  ] & {
    path: string;
    recipient: string;
    amountOut: bigint;
    amountInMaximum: bigint;
  };
}

export interface Protocol01MockInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "DEFAULT_ADMIN_ROLE"
      | "assetAddress"
      | "assetsAmount"
      | "claim"
      | "depositOnProtocol"
      | "exactOutput"
      | "getAccountValuation"
      | "getRoleAdmin"
      | "getTokenPrice"
      | "getTokensBack"
      | "grantRole"
      | "hasRole"
      | "leftover"
      | "liquidAssetAddress"
      | "liquidAssetsAmount"
      | "protocolName"
      | "renounceRole"
      | "revokeRole"
      | "setAmounts"
      | "setAssetAddress"
      | "setLeftover"
      | "setLiquidAssetAddress"
      | "setProtocolName"
      | "setStrategyAddress"
      | "setTokenPrice"
      | "setTransferSuccess"
      | "strategyAddress"
      | "supportsInterface"
      | "tokenPrice"
      | "transferSuccess"
      | "withdrawAssets"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "RoleAdminChanged" | "RoleGranted" | "RoleRevoked"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "assetAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "assetsAmount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "claim",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "depositOnProtocol",
    values: [AddressLike, AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "exactOutput",
    values: [Protocol01Mock.ExactOutputParamsStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getAccountValuation",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenPrice",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getTokensBack",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "leftover", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "liquidAssetAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "liquidAssetsAmount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "protocolName",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setAmounts",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setAssetAddress",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setLeftover",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setLiquidAssetAddress",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setProtocolName",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setStrategyAddress",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setTokenPrice",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setTransferSuccess",
    values: [boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "strategyAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenPrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferSuccess",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawAssets",
    values: [AddressLike, AddressLike, AddressLike, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "assetAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "assetsAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "depositOnProtocol",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "exactOutput",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAccountValuation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTokenPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTokensBack",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "leftover", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "liquidAssetAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "liquidAssetsAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "protocolName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setAmounts", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setAssetAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setLeftover",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setLiquidAssetAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setProtocolName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setStrategyAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTokenPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTransferSuccess",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "strategyAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tokenPrice", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferSuccess",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawAssets",
    data: BytesLike
  ): Result;
}

export namespace RoleAdminChangedEvent {
  export type InputTuple = [
    role: BytesLike,
    previousAdminRole: BytesLike,
    newAdminRole: BytesLike
  ];
  export type OutputTuple = [
    role: string,
    previousAdminRole: string,
    newAdminRole: string
  ];
  export interface OutputObject {
    role: string;
    previousAdminRole: string;
    newAdminRole: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleGrantedEvent {
  export type InputTuple = [
    role: BytesLike,
    account: AddressLike,
    sender: AddressLike
  ];
  export type OutputTuple = [role: string, account: string, sender: string];
  export interface OutputObject {
    role: string;
    account: string;
    sender: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleRevokedEvent {
  export type InputTuple = [
    role: BytesLike,
    account: AddressLike,
    sender: AddressLike
  ];
  export type OutputTuple = [role: string, account: string, sender: string];
  export interface OutputObject {
    role: string;
    account: string;
    sender: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Protocol01Mock extends BaseContract {
  connect(runner?: ContractRunner | null): Protocol01Mock;
  waitForDeployment(): Promise<this>;

  interface: Protocol01MockInterface;

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

  DEFAULT_ADMIN_ROLE: TypedContractMethod<[], [string], "view">;

  assetAddress: TypedContractMethod<[], [string], "view">;

  assetsAmount: TypedContractMethod<[], [bigint], "view">;

  claim: TypedContractMethod<
    [arg0: AddressLike, receiver_: AddressLike],
    [[boolean, string, bigint]],
    "nonpayable"
  >;

  depositOnProtocol: TypedContractMethod<
    [
      sender_: AddressLike,
      receiver_: AddressLike,
      asset_: AddressLike,
      assetsAmount_: BigNumberish
    ],
    [[boolean, string, bigint]],
    "nonpayable"
  >;

  exactOutput: TypedContractMethod<
    [params: Protocol01Mock.ExactOutputParamsStruct],
    [bigint],
    "payable"
  >;

  getAccountValuation: TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike, arg2: BigNumberish],
    [bigint],
    "view"
  >;

  getRoleAdmin: TypedContractMethod<[role: BytesLike], [string], "view">;

  getTokenPrice: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  getTokensBack: TypedContractMethod<
    [receiver: AddressLike, token: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  grantRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;

  hasRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [boolean],
    "view"
  >;

  leftover: TypedContractMethod<[], [bigint], "view">;

  liquidAssetAddress: TypedContractMethod<[], [string], "view">;

  liquidAssetsAmount: TypedContractMethod<[], [bigint], "view">;

  protocolName: TypedContractMethod<[], [string], "view">;

  renounceRole: TypedContractMethod<
    [role: BytesLike, callerConfirmation: AddressLike],
    [void],
    "nonpayable"
  >;

  revokeRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;

  setAmounts: TypedContractMethod<
    [assetsAmount_: BigNumberish, liquidAssetsAmount_: BigNumberish],
    [void],
    "nonpayable"
  >;

  setAssetAddress: TypedContractMethod<
    [assetAddress_: AddressLike],
    [void],
    "nonpayable"
  >;

  setLeftover: TypedContractMethod<
    [amount_: BigNumberish],
    [void],
    "nonpayable"
  >;

  setLiquidAssetAddress: TypedContractMethod<
    [liquidAssetAddress_: AddressLike],
    [void],
    "nonpayable"
  >;

  setProtocolName: TypedContractMethod<[value_: string], [void], "nonpayable">;

  setStrategyAddress: TypedContractMethod<
    [strategyAddress_: AddressLike],
    [void],
    "nonpayable"
  >;

  setTokenPrice: TypedContractMethod<
    [tokenPrice_: BigNumberish],
    [void],
    "nonpayable"
  >;

  setTransferSuccess: TypedContractMethod<
    [value_: boolean],
    [void],
    "nonpayable"
  >;

  strategyAddress: TypedContractMethod<[], [string], "view">;

  supportsInterface: TypedContractMethod<
    [interfaceId: BytesLike],
    [boolean],
    "view"
  >;

  tokenPrice: TypedContractMethod<[], [bigint], "view">;

  transferSuccess: TypedContractMethod<[], [boolean], "view">;

  withdrawAssets: TypedContractMethod<
    [
      caller_: AddressLike,
      receiver_: AddressLike,
      liquidAssetAddress_: AddressLike,
      liquidTokenAmount_: BigNumberish
    ],
    [[boolean, string, bigint]],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "DEFAULT_ADMIN_ROLE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "assetAddress"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "assetsAmount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "claim"
  ): TypedContractMethod<
    [arg0: AddressLike, receiver_: AddressLike],
    [[boolean, string, bigint]],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "depositOnProtocol"
  ): TypedContractMethod<
    [
      sender_: AddressLike,
      receiver_: AddressLike,
      asset_: AddressLike,
      assetsAmount_: BigNumberish
    ],
    [[boolean, string, bigint]],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "exactOutput"
  ): TypedContractMethod<
    [params: Protocol01Mock.ExactOutputParamsStruct],
    [bigint],
    "payable"
  >;
  getFunction(
    nameOrSignature: "getAccountValuation"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike, arg2: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "getRoleAdmin"
  ): TypedContractMethod<[role: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "getTokenPrice"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getTokensBack"
  ): TypedContractMethod<
    [receiver: AddressLike, token: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "grantRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "hasRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "leftover"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "liquidAssetAddress"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "liquidAssetsAmount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "protocolName"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "renounceRole"
  ): TypedContractMethod<
    [role: BytesLike, callerConfirmation: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "revokeRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setAmounts"
  ): TypedContractMethod<
    [assetsAmount_: BigNumberish, liquidAssetsAmount_: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setAssetAddress"
  ): TypedContractMethod<[assetAddress_: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setLeftover"
  ): TypedContractMethod<[amount_: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setLiquidAssetAddress"
  ): TypedContractMethod<
    [liquidAssetAddress_: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setProtocolName"
  ): TypedContractMethod<[value_: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setStrategyAddress"
  ): TypedContractMethod<[strategyAddress_: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setTokenPrice"
  ): TypedContractMethod<[tokenPrice_: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setTransferSuccess"
  ): TypedContractMethod<[value_: boolean], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "strategyAddress"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "tokenPrice"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "transferSuccess"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "withdrawAssets"
  ): TypedContractMethod<
    [
      caller_: AddressLike,
      receiver_: AddressLike,
      liquidAssetAddress_: AddressLike,
      liquidTokenAmount_: BigNumberish
    ],
    [[boolean, string, bigint]],
    "nonpayable"
  >;

  getEvent(
    key: "RoleAdminChanged"
  ): TypedContractEvent<
    RoleAdminChangedEvent.InputTuple,
    RoleAdminChangedEvent.OutputTuple,
    RoleAdminChangedEvent.OutputObject
  >;
  getEvent(
    key: "RoleGranted"
  ): TypedContractEvent<
    RoleGrantedEvent.InputTuple,
    RoleGrantedEvent.OutputTuple,
    RoleGrantedEvent.OutputObject
  >;
  getEvent(
    key: "RoleRevoked"
  ): TypedContractEvent<
    RoleRevokedEvent.InputTuple,
    RoleRevokedEvent.OutputTuple,
    RoleRevokedEvent.OutputObject
  >;

  filters: {
    "RoleAdminChanged(bytes32,bytes32,bytes32)": TypedContractEvent<
      RoleAdminChangedEvent.InputTuple,
      RoleAdminChangedEvent.OutputTuple,
      RoleAdminChangedEvent.OutputObject
    >;
    RoleAdminChanged: TypedContractEvent<
      RoleAdminChangedEvent.InputTuple,
      RoleAdminChangedEvent.OutputTuple,
      RoleAdminChangedEvent.OutputObject
    >;

    "RoleGranted(bytes32,address,address)": TypedContractEvent<
      RoleGrantedEvent.InputTuple,
      RoleGrantedEvent.OutputTuple,
      RoleGrantedEvent.OutputObject
    >;
    RoleGranted: TypedContractEvent<
      RoleGrantedEvent.InputTuple,
      RoleGrantedEvent.OutputTuple,
      RoleGrantedEvent.OutputObject
    >;

    "RoleRevoked(bytes32,address,address)": TypedContractEvent<
      RoleRevokedEvent.InputTuple,
      RoleRevokedEvent.OutputTuple,
      RoleRevokedEvent.OutputObject
    >;
    RoleRevoked: TypedContractEvent<
      RoleRevokedEvent.InputTuple,
      RoleRevokedEvent.OutputTuple,
      RoleRevokedEvent.OutputObject
    >;
  };
}
