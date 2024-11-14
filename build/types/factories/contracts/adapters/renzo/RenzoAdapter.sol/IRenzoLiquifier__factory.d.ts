import { type ContractRunner } from "ethers";
import type { IRenzoLiquifier, IRenzoLiquifierInterface } from "../../../../../contracts/adapters/renzo/RenzoAdapter.sol/IRenzoLiquifier";
export declare class IRenzoLiquifier__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "contract IERC20";
            readonly name: "_collateralToken";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "_amount";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "_referralId";
            readonly type: "uint256";
        }];
        readonly name: "deposit";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): IRenzoLiquifierInterface;
    static connect(address: string, runner?: ContractRunner | null): IRenzoLiquifier;
}
//# sourceMappingURL=IRenzoLiquifier__factory.d.ts.map