import { type ContractRunner } from "ethers";
import type { IEtherFiLiquifier, IEtherFiLiquifierInterface } from "../../../../../contracts/adapters/etherfi/interfaces/IEtherFiLiquifier";
export declare class IEtherFiLiquifier__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "_amount";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "_referral";
            readonly type: "address";
        }];
        readonly name: "depositWithERC20";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): IEtherFiLiquifierInterface;
    static connect(address: string, runner?: ContractRunner | null): IEtherFiLiquifier;
}
//# sourceMappingURL=IEtherFiLiquifier__factory.d.ts.map