import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export interface IAggregatorTokenInterface extends Interface {
    getFunction(nameOrSignature: "allowance" | "approve" | "balanceOf" | "currentSharesPerVault" | "decimals" | "deposit" | "exchangeRate" | "getUnderlyingAsset" | "name" | "setAggregatorFeeModel" | "setTransferStrategy" | "symbol" | "totalSupply" | "transfer" | "transferFrom" | "updatePortfolioValuation" | "vaultsOf" | "withdraw"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AggregatorFeeModelSet" | "Approval" | "Deposit" | "MaxVaultsPerHolderSet" | "PortfolioValuationUpdated" | "Transfer" | "TransferStrategySet" | "Withdrawal"): EventFragment;
    encodeFunctionData(functionFragment: "allowance", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "approve", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "currentSharesPerVault", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
    encodeFunctionData(functionFragment: "deposit", values: [AddressLike, AddressLike[], BigNumberish[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "exchangeRate", values?: undefined): string;
    encodeFunctionData(functionFragment: "getUnderlyingAsset", values?: undefined): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "setAggregatorFeeModel", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setTransferStrategy", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string;
    encodeFunctionData(functionFragment: "transfer", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferFrom", values: [AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "updatePortfolioValuation", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "vaultsOf", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "withdraw", values: [AddressLike[], BigNumberish[], BigNumberish]): string;
    decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "currentSharesPerVault", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "exchangeRate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getUnderlyingAsset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setAggregatorFeeModel", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setTransferStrategy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updatePortfolioValuation", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "vaultsOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
}
export declare namespace AggregatorFeeModelSetEvent {
    type InputTuple = [newAggregatorFeeModel: AddressLike];
    type OutputTuple = [newAggregatorFeeModel: string];
    interface OutputObject {
        newAggregatorFeeModel: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
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
        receiver: AddressLike,
        vaults: AddressLike[],
        amounts: BigNumberish[],
        totalShares: BigNumberish
    ];
    type OutputTuple = [
        sender: string,
        receiver: string,
        vaults: string[],
        amounts: bigint[],
        totalShares: bigint
    ];
    interface OutputObject {
        sender: string;
        receiver: string;
        vaults: string[];
        amounts: bigint[];
        totalShares: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace MaxVaultsPerHolderSetEvent {
    type InputTuple = [newValue: BigNumberish];
    type OutputTuple = [newValue: bigint];
    interface OutputObject {
        newValue: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace PortfolioValuationUpdatedEvent {
    type InputTuple = [tokenHolder: AddressLike];
    type OutputTuple = [tokenHolder: string];
    interface OutputObject {
        tokenHolder: string;
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
export declare namespace TransferStrategySetEvent {
    type InputTuple = [newTransterStrategy: AddressLike];
    type OutputTuple = [newTransterStrategy: string];
    interface OutputObject {
        newTransterStrategy: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace WithdrawalEvent {
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
export interface IAggregatorToken extends BaseContract {
    connect(runner?: ContractRunner | null): IAggregatorToken;
    waitForDeployment(): Promise<this>;
    interface: IAggregatorTokenInterface;
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
    balanceOf: TypedContractMethod<[account: AddressLike], [bigint], "view">;
    currentSharesPerVault: TypedContractMethod<[
        tokenHolder_: AddressLike
    ], [
        [string[], bigint[]] & {
            vaults: string[];
            shares: bigint[];
        }
    ], "view">;
    decimals: TypedContractMethod<[], [bigint], "view">;
    deposit: TypedContractMethod<[
        receiver: AddressLike,
        vaults_: AddressLike[],
        values_: BigNumberish[],
        totalValue_: BigNumberish
    ], [
        bigint
    ], "nonpayable">;
    exchangeRate: TypedContractMethod<[], [bigint], "view">;
    getUnderlyingAsset: TypedContractMethod<[], [string], "view">;
    name: TypedContractMethod<[], [string], "view">;
    setAggregatorFeeModel: TypedContractMethod<[
        aggregatorFeeModel_: AddressLike
    ], [
        void
    ], "nonpayable">;
    setTransferStrategy: TypedContractMethod<[
        transferStrategy_: AddressLike
    ], [
        void
    ], "nonpayable">;
    symbol: TypedContractMethod<[], [string], "view">;
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
    updatePortfolioValuation: TypedContractMethod<[
        tokenHolder_: AddressLike
    ], [
        boolean
    ], "nonpayable">;
    vaultsOf: TypedContractMethod<[
        tokenHolder_: AddressLike
    ], [
        string[]
    ], "view">;
    withdraw: TypedContractMethod<[
        vaults_: AddressLike[],
        assets_: BigNumberish[],
        maxSlipage: BigNumberish
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
    getFunction(nameOrSignature: "balanceOf"): TypedContractMethod<[account: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "currentSharesPerVault"): TypedContractMethod<[
        tokenHolder_: AddressLike
    ], [
        [string[], bigint[]] & {
            vaults: string[];
            shares: bigint[];
        }
    ], "view">;
    getFunction(nameOrSignature: "decimals"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "deposit"): TypedContractMethod<[
        receiver: AddressLike,
        vaults_: AddressLike[],
        values_: BigNumberish[],
        totalValue_: BigNumberish
    ], [
        bigint
    ], "nonpayable">;
    getFunction(nameOrSignature: "exchangeRate"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "getUnderlyingAsset"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "name"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "setAggregatorFeeModel"): TypedContractMethod<[
        aggregatorFeeModel_: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setTransferStrategy"): TypedContractMethod<[
        transferStrategy_: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "symbol"): TypedContractMethod<[], [string], "view">;
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
    getFunction(nameOrSignature: "updatePortfolioValuation"): TypedContractMethod<[tokenHolder_: AddressLike], [boolean], "nonpayable">;
    getFunction(nameOrSignature: "vaultsOf"): TypedContractMethod<[tokenHolder_: AddressLike], [string[]], "view">;
    getFunction(nameOrSignature: "withdraw"): TypedContractMethod<[
        vaults_: AddressLike[],
        assets_: BigNumberish[],
        maxSlipage: BigNumberish
    ], [
        bigint
    ], "nonpayable">;
    getEvent(key: "AggregatorFeeModelSet"): TypedContractEvent<AggregatorFeeModelSetEvent.InputTuple, AggregatorFeeModelSetEvent.OutputTuple, AggregatorFeeModelSetEvent.OutputObject>;
    getEvent(key: "Approval"): TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
    getEvent(key: "Deposit"): TypedContractEvent<DepositEvent.InputTuple, DepositEvent.OutputTuple, DepositEvent.OutputObject>;
    getEvent(key: "MaxVaultsPerHolderSet"): TypedContractEvent<MaxVaultsPerHolderSetEvent.InputTuple, MaxVaultsPerHolderSetEvent.OutputTuple, MaxVaultsPerHolderSetEvent.OutputObject>;
    getEvent(key: "PortfolioValuationUpdated"): TypedContractEvent<PortfolioValuationUpdatedEvent.InputTuple, PortfolioValuationUpdatedEvent.OutputTuple, PortfolioValuationUpdatedEvent.OutputObject>;
    getEvent(key: "Transfer"): TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
    getEvent(key: "TransferStrategySet"): TypedContractEvent<TransferStrategySetEvent.InputTuple, TransferStrategySetEvent.OutputTuple, TransferStrategySetEvent.OutputObject>;
    getEvent(key: "Withdrawal"): TypedContractEvent<WithdrawalEvent.InputTuple, WithdrawalEvent.OutputTuple, WithdrawalEvent.OutputObject>;
    filters: {
        "AggregatorFeeModelSet(address)": TypedContractEvent<AggregatorFeeModelSetEvent.InputTuple, AggregatorFeeModelSetEvent.OutputTuple, AggregatorFeeModelSetEvent.OutputObject>;
        AggregatorFeeModelSet: TypedContractEvent<AggregatorFeeModelSetEvent.InputTuple, AggregatorFeeModelSetEvent.OutputTuple, AggregatorFeeModelSetEvent.OutputObject>;
        "Approval(address,address,uint256)": TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
        Approval: TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
        "Deposit(address,address,address[],uint256[],uint256)": TypedContractEvent<DepositEvent.InputTuple, DepositEvent.OutputTuple, DepositEvent.OutputObject>;
        Deposit: TypedContractEvent<DepositEvent.InputTuple, DepositEvent.OutputTuple, DepositEvent.OutputObject>;
        "MaxVaultsPerHolderSet(uint256)": TypedContractEvent<MaxVaultsPerHolderSetEvent.InputTuple, MaxVaultsPerHolderSetEvent.OutputTuple, MaxVaultsPerHolderSetEvent.OutputObject>;
        MaxVaultsPerHolderSet: TypedContractEvent<MaxVaultsPerHolderSetEvent.InputTuple, MaxVaultsPerHolderSetEvent.OutputTuple, MaxVaultsPerHolderSetEvent.OutputObject>;
        "PortfolioValuationUpdated(address)": TypedContractEvent<PortfolioValuationUpdatedEvent.InputTuple, PortfolioValuationUpdatedEvent.OutputTuple, PortfolioValuationUpdatedEvent.OutputObject>;
        PortfolioValuationUpdated: TypedContractEvent<PortfolioValuationUpdatedEvent.InputTuple, PortfolioValuationUpdatedEvent.OutputTuple, PortfolioValuationUpdatedEvent.OutputObject>;
        "Transfer(address,address,uint256)": TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
        Transfer: TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
        "TransferStrategySet(address)": TypedContractEvent<TransferStrategySetEvent.InputTuple, TransferStrategySetEvent.OutputTuple, TransferStrategySetEvent.OutputObject>;
        TransferStrategySet: TypedContractEvent<TransferStrategySetEvent.InputTuple, TransferStrategySetEvent.OutputTuple, TransferStrategySetEvent.OutputObject>;
        "Withdrawal(address,address,uint256)": TypedContractEvent<WithdrawalEvent.InputTuple, WithdrawalEvent.OutputTuple, WithdrawalEvent.OutputObject>;
        Withdrawal: TypedContractEvent<WithdrawalEvent.InputTuple, WithdrawalEvent.OutputTuple, WithdrawalEvent.OutputObject>;
    };
}
//# sourceMappingURL=IAggregatorToken.d.ts.map