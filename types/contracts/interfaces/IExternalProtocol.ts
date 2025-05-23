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
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export interface IExternalProtocolInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "claim"
      | "depositOnProtocol"
      | "getAccountValuation"
      | "getTokenPrice"
      | "withdrawAssets"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "claim",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "depositOnProtocol",
    values: [AddressLike, AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getAccountValuation",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenPrice",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawAssets",
    values: [AddressLike, AddressLike, AddressLike, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "depositOnProtocol",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAccountValuation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTokenPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawAssets",
    data: BytesLike
  ): Result;
}

export interface IExternalProtocol extends BaseContract {
  connect(runner?: ContractRunner | null): IExternalProtocol;
  waitForDeployment(): Promise<this>;

  interface: IExternalProtocolInterface;

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

  claim: TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike],
    [[boolean, string, bigint]],
    "nonpayable"
  >;

  depositOnProtocol: TypedContractMethod<
    [
      arg0: AddressLike,
      arg1: AddressLike,
      arg2: AddressLike,
      arg3: BigNumberish
    ],
    [[boolean, string, bigint]],
    "nonpayable"
  >;

  getAccountValuation: TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike, arg2: BigNumberish],
    [bigint],
    "nonpayable"
  >;

  getTokenPrice: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  withdrawAssets: TypedContractMethod<
    [
      arg0: AddressLike,
      arg1: AddressLike,
      arg2: AddressLike,
      arg3: BigNumberish
    ],
    [[boolean, string, bigint]],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "claim"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike],
    [[boolean, string, bigint]],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "depositOnProtocol"
  ): TypedContractMethod<
    [
      arg0: AddressLike,
      arg1: AddressLike,
      arg2: AddressLike,
      arg3: BigNumberish
    ],
    [[boolean, string, bigint]],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getAccountValuation"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike, arg2: BigNumberish],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getTokenPrice"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "withdrawAssets"
  ): TypedContractMethod<
    [
      arg0: AddressLike,
      arg1: AddressLike,
      arg2: AddressLike,
      arg3: BigNumberish
    ],
    [[boolean, string, bigint]],
    "nonpayable"
  >;

  filters: {};
}
