import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "./common";
export interface RETHInterface extends Interface {
    getFunction(nameOrSignature: "allowance" | "approve" | "balanceOf" | "burn" | "decimals" | "decreaseAllowance" | "depositExcess" | "depositExcessCollateral" | "getCollateralRate" | "getEthValue" | "getExchangeRate" | "getRethValue" | "getTotalCollateral" | "increaseAllowance" | "mint" | "name" | "symbol" | "totalSupply" | "transfer" | "transferFrom" | "version"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "Approval" | "EtherDeposited" | "TokensBurned" | "TokensMinted" | "Transfer"): EventFragment;
    encodeFunctionData(functionFragment: "allowance", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "approve", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "burn", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
    encodeFunctionData(functionFragment: "decreaseAllowance", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "depositExcess", values?: undefined): string;
    encodeFunctionData(functionFragment: "depositExcessCollateral", values?: undefined): string;
    encodeFunctionData(functionFragment: "getCollateralRate", values?: undefined): string;
    encodeFunctionData(functionFragment: "getEthValue", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getExchangeRate", values?: undefined): string;
    encodeFunctionData(functionFragment: "getRethValue", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getTotalCollateral", values?: undefined): string;
    encodeFunctionData(functionFragment: "increaseAllowance", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "mint", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string;
    encodeFunctionData(functionFragment: "transfer", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferFrom", values: [AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "version", values?: undefined): string;
    decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decreaseAllowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositExcess", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositExcessCollateral", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCollateralRate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getEthValue", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getExchangeRate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRethValue", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTotalCollateral", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "increaseAllowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;
}
export declare namespace ApprovalEvent {
    type InputTuple = [
        owner: AddressLike,
        spender: AddressLike,
        value: BigNumberish
    ];
    type OutputTuple = [owner: string, spender: string, value: bigint];
    interface OutputObject {
        owner: string;
        spender: string;
        value: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace EtherDepositedEvent {
    type InputTuple = [
        from: AddressLike,
        amount: BigNumberish,
        time: BigNumberish
    ];
    type OutputTuple = [from: string, amount: bigint, time: bigint];
    interface OutputObject {
        from: string;
        amount: bigint;
        time: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace TokensBurnedEvent {
    type InputTuple = [
        from: AddressLike,
        amount: BigNumberish,
        ethAmount: BigNumberish,
        time: BigNumberish
    ];
    type OutputTuple = [
        from: string,
        amount: bigint,
        ethAmount: bigint,
        time: bigint
    ];
    interface OutputObject {
        from: string;
        amount: bigint;
        ethAmount: bigint;
        time: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace TokensMintedEvent {
    type InputTuple = [
        to: AddressLike,
        amount: BigNumberish,
        ethAmount: BigNumberish,
        time: BigNumberish
    ];
    type OutputTuple = [
        to: string,
        amount: bigint,
        ethAmount: bigint,
        time: bigint
    ];
    interface OutputObject {
        to: string;
        amount: bigint;
        ethAmount: bigint;
        time: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace TransferEvent {
    type InputTuple = [
        from: AddressLike,
        to: AddressLike,
        value: BigNumberish
    ];
    type OutputTuple = [from: string, to: string, value: bigint];
    interface OutputObject {
        from: string;
        to: string;
        value: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface RETH extends BaseContract {
    connect(runner?: ContractRunner | null): RETH;
    waitForDeployment(): Promise<this>;
    interface: RETHInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    allowance: TypedContractMethod<[
        owner: AddressLike,
        spender: AddressLike
    ], [
        bigint
    ], "view">;
    approve: TypedContractMethod<[
        spender: AddressLike,
        amount: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    balanceOf: TypedContractMethod<[account: AddressLike], [bigint], "view">;
    burn: TypedContractMethod<[_rethAmount: BigNumberish], [void], "nonpayable">;
    decimals: TypedContractMethod<[], [bigint], "view">;
    decreaseAllowance: TypedContractMethod<[
        spender: AddressLike,
        subtractedValue: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    depositExcess: TypedContractMethod<[], [void], "payable">;
    depositExcessCollateral: TypedContractMethod<[], [void], "nonpayable">;
    getCollateralRate: TypedContractMethod<[], [bigint], "view">;
    getEthValue: TypedContractMethod<[
        _rethAmount: BigNumberish
    ], [
        bigint
    ], "view">;
    getExchangeRate: TypedContractMethod<[], [bigint], "view">;
    getRethValue: TypedContractMethod<[
        _ethAmount: BigNumberish
    ], [
        bigint
    ], "view">;
    getTotalCollateral: TypedContractMethod<[], [bigint], "view">;
    increaseAllowance: TypedContractMethod<[
        spender: AddressLike,
        addedValue: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    mint: TypedContractMethod<[
        _ethAmount: BigNumberish,
        _to: AddressLike
    ], [
        void
    ], "nonpayable">;
    name: TypedContractMethod<[], [string], "view">;
    symbol: TypedContractMethod<[], [string], "view">;
    totalSupply: TypedContractMethod<[], [bigint], "view">;
    transfer: TypedContractMethod<[
        recipient: AddressLike,
        amount: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    transferFrom: TypedContractMethod<[
        sender: AddressLike,
        recipient: AddressLike,
        amount: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    version: TypedContractMethod<[], [bigint], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "allowance"): TypedContractMethod<[
        owner: AddressLike,
        spender: AddressLike
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "approve"): TypedContractMethod<[
        spender: AddressLike,
        amount: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    getFunction(nameOrSignature: "balanceOf"): TypedContractMethod<[account: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "burn"): TypedContractMethod<[_rethAmount: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "decimals"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "decreaseAllowance"): TypedContractMethod<[
        spender: AddressLike,
        subtractedValue: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    getFunction(nameOrSignature: "depositExcess"): TypedContractMethod<[], [void], "payable">;
    getFunction(nameOrSignature: "depositExcessCollateral"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "getCollateralRate"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "getEthValue"): TypedContractMethod<[_rethAmount: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "getExchangeRate"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "getRethValue"): TypedContractMethod<[_ethAmount: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "getTotalCollateral"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "increaseAllowance"): TypedContractMethod<[
        spender: AddressLike,
        addedValue: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    getFunction(nameOrSignature: "mint"): TypedContractMethod<[
        _ethAmount: BigNumberish,
        _to: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "name"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "symbol"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "totalSupply"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "transfer"): TypedContractMethod<[
        recipient: AddressLike,
        amount: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    getFunction(nameOrSignature: "transferFrom"): TypedContractMethod<[
        sender: AddressLike,
        recipient: AddressLike,
        amount: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    getFunction(nameOrSignature: "version"): TypedContractMethod<[], [bigint], "view">;
    getEvent(key: "Approval"): TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
    getEvent(key: "EtherDeposited"): TypedContractEvent<EtherDepositedEvent.InputTuple, EtherDepositedEvent.OutputTuple, EtherDepositedEvent.OutputObject>;
    getEvent(key: "TokensBurned"): TypedContractEvent<TokensBurnedEvent.InputTuple, TokensBurnedEvent.OutputTuple, TokensBurnedEvent.OutputObject>;
    getEvent(key: "TokensMinted"): TypedContractEvent<TokensMintedEvent.InputTuple, TokensMintedEvent.OutputTuple, TokensMintedEvent.OutputObject>;
    getEvent(key: "Transfer"): TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
    filters: {
        "Approval(address,address,uint256)": TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
        Approval: TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
        "EtherDeposited(address,uint256,uint256)": TypedContractEvent<EtherDepositedEvent.InputTuple, EtherDepositedEvent.OutputTuple, EtherDepositedEvent.OutputObject>;
        EtherDeposited: TypedContractEvent<EtherDepositedEvent.InputTuple, EtherDepositedEvent.OutputTuple, EtherDepositedEvent.OutputObject>;
        "TokensBurned(address,uint256,uint256,uint256)": TypedContractEvent<TokensBurnedEvent.InputTuple, TokensBurnedEvent.OutputTuple, TokensBurnedEvent.OutputObject>;
        TokensBurned: TypedContractEvent<TokensBurnedEvent.InputTuple, TokensBurnedEvent.OutputTuple, TokensBurnedEvent.OutputObject>;
        "TokensMinted(address,uint256,uint256,uint256)": TypedContractEvent<TokensMintedEvent.InputTuple, TokensMintedEvent.OutputTuple, TokensMintedEvent.OutputObject>;
        TokensMinted: TypedContractEvent<TokensMintedEvent.InputTuple, TokensMintedEvent.OutputTuple, TokensMintedEvent.OutputObject>;
        "Transfer(address,address,uint256)": TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
        Transfer: TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
    };
}
//# sourceMappingURL=RETH.d.ts.map