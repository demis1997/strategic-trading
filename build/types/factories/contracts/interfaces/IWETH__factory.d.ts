import { type ContractRunner } from "ethers";
import type { IWETH, IWETHInterface } from "../../../contracts/interfaces/IWETH";
export declare class IWETH__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "deposit";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "withdraw";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): IWETHInterface;
    static connect(address: string, runner?: ContractRunner | null): IWETH;
}
//# sourceMappingURL=IWETH__factory.d.ts.map