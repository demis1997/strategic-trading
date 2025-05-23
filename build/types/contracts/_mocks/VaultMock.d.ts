import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export interface VaultMockInterface extends Interface {
    getFunction(nameOrSignature: "allowance" | "approve" | "asset" | "balanceOf" | "convertToAssets" | "convertToShares" | "decimals" | "deposit" | "getVaultValuation" | "initialize" | "maxDeposit" | "maxMint" | "maxRedeem" | "maxWithdraw" | "mint" | "name" | "pendingDepositAssets" | "previewDeposit" | "previewMint" | "previewRedeem" | "previewWithdraw" | "redeem" | "symbol" | "totalAssets" | "totalAssetsValue" | "totalSupply" | "transfer" | "transferFrom" | "withdraw(uint256,address)" | "withdraw(uint256,address,address)"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "Approval" | "Deposit" | "Initialized" | "Transfer" | "Withdraw"): EventFragment;
    encodeFunctionData(functionFragment: "allowance", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "approve", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "asset", values?: undefined): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "convertToAssets", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "convertToShares", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
    encodeFunctionData(functionFragment: "deposit", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "getVaultValuation", values?: undefined): string;
    encodeFunctionData(functionFragment: "initialize", values: [AddressLike, string, string]): string;
    encodeFunctionData(functionFragment: "maxDeposit", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "maxMint", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "maxRedeem", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "maxWithdraw", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "mint", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "pendingDepositAssets", values?: undefined): string;
    encodeFunctionData(functionFragment: "previewDeposit", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "previewMint", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "previewRedeem", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "previewWithdraw", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "redeem", values: [BigNumberish, AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    encodeFunctionData(functionFragment: "totalAssets", values?: undefined): string;
    encodeFunctionData(functionFragment: "totalAssetsValue", values?: undefined): string;
    encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string;
    encodeFunctionData(functionFragment: "transfer", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferFrom", values: [AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "withdraw(uint256,address)", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "withdraw(uint256,address,address)", values: [BigNumberish, AddressLike, AddressLike]): string;
    decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "asset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "convertToAssets", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "convertToShares", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getVaultValuation", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "maxDeposit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "maxMint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "maxRedeem", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "maxWithdraw", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pendingDepositAssets", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "previewDeposit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "previewMint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "previewRedeem", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "previewWithdraw", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "redeem", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalAssets", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalAssetsValue", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw(uint256,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw(uint256,address,address)", data: BytesLike): Result;
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
export declare namespace DepositEvent {
    type InputTuple = [
        sender: AddressLike,
        owner: AddressLike,
        assets: BigNumberish,
        shares: BigNumberish
    ];
    type OutputTuple = [
        sender: string,
        owner: string,
        assets: bigint,
        shares: bigint
    ];
    interface OutputObject {
        sender: string;
        owner: string;
        assets: bigint;
        shares: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace InitializedEvent {
    type InputTuple = [version: BigNumberish];
    type OutputTuple = [version: bigint];
    interface OutputObject {
        version: bigint;
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
export declare namespace WithdrawEvent {
    type InputTuple = [
        sender: AddressLike,
        receiver: AddressLike,
        owner: AddressLike,
        assets: BigNumberish,
        shares: BigNumberish
    ];
    type OutputTuple = [
        sender: string,
        receiver: string,
        owner: string,
        assets: bigint,
        shares: bigint
    ];
    interface OutputObject {
        sender: string;
        receiver: string;
        owner: string;
        assets: bigint;
        shares: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface VaultMock extends BaseContract {
    connect(runner?: ContractRunner | null): VaultMock;
    waitForDeployment(): Promise<this>;
    interface: VaultMockInterface;
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
        value: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    asset: TypedContractMethod<[], [string], "view">;
    balanceOf: TypedContractMethod<[account: AddressLike], [bigint], "view">;
    convertToAssets: TypedContractMethod<[
        shares: BigNumberish
    ], [
        bigint
    ], "view">;
    convertToShares: TypedContractMethod<[
        assets: BigNumberish
    ], [
        bigint
    ], "view">;
    decimals: TypedContractMethod<[], [bigint], "view">;
    deposit: TypedContractMethod<[
        assetsAmount_: BigNumberish,
        account_: AddressLike
    ], [
        bigint
    ], "nonpayable">;
    getVaultValuation: TypedContractMethod<[], [bigint], "view">;
    initialize: TypedContractMethod<[
        underlyingTokenAddress_: AddressLike,
        sharesName_: string,
        sharesSymbol_: string
    ], [
        void
    ], "nonpayable">;
    maxDeposit: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
    maxMint: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
    maxRedeem: TypedContractMethod<[owner: AddressLike], [bigint], "view">;
    maxWithdraw: TypedContractMethod<[owner: AddressLike], [bigint], "view">;
    mint: TypedContractMethod<[
        shares: BigNumberish,
        receiver: AddressLike
    ], [
        bigint
    ], "nonpayable">;
    name: TypedContractMethod<[], [string], "view">;
    pendingDepositAssets: TypedContractMethod<[], [bigint], "view">;
    previewDeposit: TypedContractMethod<[assets: BigNumberish], [bigint], "view">;
    previewMint: TypedContractMethod<[shares: BigNumberish], [bigint], "view">;
    previewRedeem: TypedContractMethod<[shares: BigNumberish], [bigint], "view">;
    previewWithdraw: TypedContractMethod<[
        assets: BigNumberish
    ], [
        bigint
    ], "view">;
    redeem: TypedContractMethod<[
        shares: BigNumberish,
        receiver: AddressLike,
        owner: AddressLike
    ], [
        bigint
    ], "nonpayable">;
    symbol: TypedContractMethod<[], [string], "view">;
    totalAssets: TypedContractMethod<[], [bigint], "view">;
    totalAssetsValue: TypedContractMethod<[], [bigint], "view">;
    totalSupply: TypedContractMethod<[], [bigint], "view">;
    transfer: TypedContractMethod<[
        to: AddressLike,
        value: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    transferFrom: TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        value: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    "withdraw(uint256,address)": TypedContractMethod<[
        assetsAmount_: BigNumberish,
        account_: AddressLike
    ], [
        bigint
    ], "nonpayable">;
    "withdraw(uint256,address,address)": TypedContractMethod<[
        assets: BigNumberish,
        receiver: AddressLike,
        owner: AddressLike
    ], [
        bigint
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "allowance"): TypedContractMethod<[
        owner: AddressLike,
        spender: AddressLike
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "approve"): TypedContractMethod<[
        spender: AddressLike,
        value: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    getFunction(nameOrSignature: "asset"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "balanceOf"): TypedContractMethod<[account: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "convertToAssets"): TypedContractMethod<[shares: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "convertToShares"): TypedContractMethod<[assets: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "decimals"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "deposit"): TypedContractMethod<[
        assetsAmount_: BigNumberish,
        account_: AddressLike
    ], [
        bigint
    ], "nonpayable">;
    getFunction(nameOrSignature: "getVaultValuation"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "initialize"): TypedContractMethod<[
        underlyingTokenAddress_: AddressLike,
        sharesName_: string,
        sharesSymbol_: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "maxDeposit"): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "maxMint"): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "maxRedeem"): TypedContractMethod<[owner: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "maxWithdraw"): TypedContractMethod<[owner: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "mint"): TypedContractMethod<[
        shares: BigNumberish,
        receiver: AddressLike
    ], [
        bigint
    ], "nonpayable">;
    getFunction(nameOrSignature: "name"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "pendingDepositAssets"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "previewDeposit"): TypedContractMethod<[assets: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "previewMint"): TypedContractMethod<[shares: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "previewRedeem"): TypedContractMethod<[shares: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "previewWithdraw"): TypedContractMethod<[assets: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "redeem"): TypedContractMethod<[
        shares: BigNumberish,
        receiver: AddressLike,
        owner: AddressLike
    ], [
        bigint
    ], "nonpayable">;
    getFunction(nameOrSignature: "symbol"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "totalAssets"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "totalAssetsValue"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "totalSupply"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "transfer"): TypedContractMethod<[
        to: AddressLike,
        value: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    getFunction(nameOrSignature: "transferFrom"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        value: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    getFunction(nameOrSignature: "withdraw(uint256,address)"): TypedContractMethod<[
        assetsAmount_: BigNumberish,
        account_: AddressLike
    ], [
        bigint
    ], "nonpayable">;
    getFunction(nameOrSignature: "withdraw(uint256,address,address)"): TypedContractMethod<[
        assets: BigNumberish,
        receiver: AddressLike,
        owner: AddressLike
    ], [
        bigint
    ], "nonpayable">;
    getEvent(key: "Approval"): TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
    getEvent(key: "Deposit"): TypedContractEvent<DepositEvent.InputTuple, DepositEvent.OutputTuple, DepositEvent.OutputObject>;
    getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
    getEvent(key: "Transfer"): TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
    getEvent(key: "Withdraw"): TypedContractEvent<WithdrawEvent.InputTuple, WithdrawEvent.OutputTuple, WithdrawEvent.OutputObject>;
    filters: {
        "Approval(address,address,uint256)": TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
        Approval: TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
        "Deposit(address,address,uint256,uint256)": TypedContractEvent<DepositEvent.InputTuple, DepositEvent.OutputTuple, DepositEvent.OutputObject>;
        Deposit: TypedContractEvent<DepositEvent.InputTuple, DepositEvent.OutputTuple, DepositEvent.OutputObject>;
        "Initialized(uint64)": TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        Initialized: TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        "Transfer(address,address,uint256)": TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
        Transfer: TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
        "Withdraw(address,address,address,uint256,uint256)": TypedContractEvent<WithdrawEvent.InputTuple, WithdrawEvent.OutputTuple, WithdrawEvent.OutputObject>;
        Withdraw: TypedContractEvent<WithdrawEvent.InputTuple, WithdrawEvent.OutputTuple, WithdrawEvent.OutputObject>;
    };
}
//# sourceMappingURL=VaultMock.d.ts.map