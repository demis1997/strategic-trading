import { type ContractRunner } from "ethers";
import type { IRocketDepositPool, IRocketDepositPoolInterface } from "../../../../../contracts/adapters/rocket/interfaces/IRocketDepositPool";
export declare class IRocketDepositPool__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "deposit";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getBalance";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IRocketDepositPoolInterface;
    static connect(address: string, runner?: ContractRunner | null): IRocketDepositPool;
}
//# sourceMappingURL=IRocketDepositPool__factory.d.ts.map