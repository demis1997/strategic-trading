import { type ContractRunner } from "ethers";
import type { ITransferStrategy, ITransferStrategyInterface } from "../../../contracts/interfaces/ITransferStrategy";
export declare class ITransferStrategy__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "from_";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "to_";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "assetAmount";
            readonly type: "uint256";
        }];
        readonly name: "executePartialTransferStrategy";
        readonly outputs: readonly [{
            readonly internalType: "address[]";
            readonly name: "vaults";
            readonly type: "address[]";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "shares";
            readonly type: "uint256[]";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): ITransferStrategyInterface;
    static connect(address: string, runner?: ContractRunner | null): ITransferStrategy;
}
//# sourceMappingURL=ITransferStrategy__factory.d.ts.map