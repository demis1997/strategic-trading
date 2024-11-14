import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../common";
export interface RETHMockInterface extends Interface {
    getFunction(nameOrSignature: "_balances" | "allowance" | "approve" | "balanceOf" | "burn" | "burnFrom" | "decimals" | "decreaseAllowance" | "getEthValue" | "getExchangeRate" | "getRethValue" | "getTotalCollateral" | "increaseAllowance" | "mint" | "mockBalanceOf" | "name" | "setDecimals" | "setExchangeRate" | "setIsSafeApprove" | "setNeedToReturnValue" | "setReturnBoolValue" | "setTotalCollateral" | "symbol" | "totalSupply" | "transfer" | "transferFrom"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "Approval" | "Transfer"): EventFragment;
    encodeFunctionData(functionFragment: "_balances", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "allowance", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "approve", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "burn", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "burnFrom", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
    encodeFunctionData(functionFragment: "decreaseAllowance", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getEthValue", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getExchangeRate", values?: undefined): string;
    encodeFunctionData(functionFragment: "getRethValue", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getTotalCollateral", values?: undefined): string;
    encodeFunctionData(functionFragment: "increaseAllowance", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "mint", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "mockBalanceOf", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "setDecimals", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "setExchangeRate", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "setIsSafeApprove", values: [boolean]): string;
    encodeFunctionData(functionFragment: "setNeedToReturnValue", values: [boolean]): string;
    encodeFunctionData(functionFragment: "setReturnBoolValue", values: [boolean]): string;
    encodeFunctionData(functionFragment: "setTotalCollateral", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string;
    encodeFunctionData(functionFragment: "transfer", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferFrom", values: [AddressLike, AddressLike, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "_balances", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "burnFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decreaseAllowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getEthValue", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getExchangeRate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRethValue", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTotalCollateral", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "increaseAllowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mockBalanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setDecimals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setExchangeRate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setIsSafeApprove", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setNeedToReturnValue", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setReturnBoolValue", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setTotalCollateral", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
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
export interface RETHMock extends BaseContract {
    connect(runner?: ContractRunner | null): RETHMock;
    waitForDeployment(): Promise<this>;
    interface: RETHMockInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    _balances: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
    allowance: TypedContractMethod<[
        owner: AddressLike,
        spender: AddressLike
    ], [
        bigint
    ], "view">;
    approve: TypedContractMethod<[
        recipient: AddressLike,
        amount: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    balanceOf: TypedContractMethod<[account: AddressLike], [bigint], "view">;
    burn: TypedContractMethod<[_rethAmount: BigNumberish], [void], "nonpayable">;
    burnFrom: TypedContractMethod<[
        account: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    decimals: TypedContractMethod<[], [bigint], "view">;
    decreaseAllowance: TypedContractMethod<[
        spender: AddressLike,
        subtractedValue: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
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
        account: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    mockBalanceOf: TypedContractMethod<[
        _account: AddressLike,
        newBalance: BigNumberish
    ], [
        void
    ], "nonpayable">;
    name: TypedContractMethod<[], [string], "view">;
    setDecimals: TypedContractMethod<[value: BigNumberish], [void], "nonpayable">;
    setExchangeRate: TypedContractMethod<[
        _exchangeRate: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setIsSafeApprove: TypedContractMethod<[
        _value: boolean
    ], [
        void
    ], "nonpayable">;
    setNeedToReturnValue: TypedContractMethod<[
        _value: boolean
    ], [
        void
    ], "nonpayable">;
    setReturnBoolValue: TypedContractMethod<[
        _value: boolean
    ], [
        void
    ], "nonpayable">;
    setTotalCollateral: TypedContractMethod<[
        _totalCollateral: BigNumberish
    ], [
        void
    ], "nonpayable">;
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
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "_balances"): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "allowance"): TypedContractMethod<[
        owner: AddressLike,
        spender: AddressLike
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "approve"): TypedContractMethod<[
        recipient: AddressLike,
        amount: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    getFunction(nameOrSignature: "balanceOf"): TypedContractMethod<[account: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "burn"): TypedContractMethod<[_rethAmount: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "burnFrom"): TypedContractMethod<[
        account: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "decimals"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "decreaseAllowance"): TypedContractMethod<[
        spender: AddressLike,
        subtractedValue: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
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
        account: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "mockBalanceOf"): TypedContractMethod<[
        _account: AddressLike,
        newBalance: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "name"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "setDecimals"): TypedContractMethod<[value: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "setExchangeRate"): TypedContractMethod<[_exchangeRate: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "setIsSafeApprove"): TypedContractMethod<[_value: boolean], [void], "nonpayable">;
    getFunction(nameOrSignature: "setNeedToReturnValue"): TypedContractMethod<[_value: boolean], [void], "nonpayable">;
    getFunction(nameOrSignature: "setReturnBoolValue"): TypedContractMethod<[_value: boolean], [void], "nonpayable">;
    getFunction(nameOrSignature: "setTotalCollateral"): TypedContractMethod<[
        _totalCollateral: BigNumberish
    ], [
        void
    ], "nonpayable">;
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
    getEvent(key: "Approval"): TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
    getEvent(key: "Transfer"): TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
    filters: {
        "Approval(address,address,uint256)": TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
        Approval: TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
        "Transfer(address,address,uint256)": TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
        Transfer: TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
    };
}
//# sourceMappingURL=RETHMock.d.ts.map