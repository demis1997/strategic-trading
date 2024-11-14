import { type ContractRunner } from "ethers";
import type { IRenzoLiquifier, IRenzoLiquifierInterface } from "../../../../../contracts/adapters/renzo/interfaces/IRenzoLiquifier";
export declare class IRenzoLiquifier__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "_amount";
            readonly type: "uint256";
        }];
        readonly name: "deposit";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): IRenzoLiquifierInterface;
    static connect(address: string, runner?: ContractRunner | null): IRenzoLiquifier;
}
//# sourceMappingURL=IRenzoLiquifier__factory.d.ts.map