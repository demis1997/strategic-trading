import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../../common";
export interface IEtherFiWithdrawRequestNFTInterface extends Interface {
    getFunction(nameOrSignature: "claimWithdraw" | "getClaimableAmount"): FunctionFragment;
    encodeFunctionData(functionFragment: "claimWithdraw", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getClaimableAmount", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "claimWithdraw", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getClaimableAmount", data: BytesLike): Result;
}
export interface IEtherFiWithdrawRequestNFT extends BaseContract {
    connect(runner?: ContractRunner | null): IEtherFiWithdrawRequestNFT;
    waitForDeployment(): Promise<this>;
    interface: IEtherFiWithdrawRequestNFTInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    claimWithdraw: TypedContractMethod<[
        requestId: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getClaimableAmount: TypedContractMethod<[
        tokenId: BigNumberish
    ], [
        bigint
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "claimWithdraw"): TypedContractMethod<[requestId: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "getClaimableAmount"): TypedContractMethod<[tokenId: BigNumberish], [bigint], "view">;
    filters: {};
}
//# sourceMappingURL=IEtherFiWithdrawRequestNFT.d.ts.map