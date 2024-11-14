import { type ContractRunner } from "ethers";
import type { IRenzoWrappedToken, IRenzoWrappedTokenInterface } from "../../../../../contracts/adapters/renzo/interfaces/IRenzoWrappedToken";
export declare class IRenzoWrappedToken__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "_pzETHAddress";
            readonly type: "uint256";
        }];
        readonly name: "unwrap";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "_ezETHAmount";
            readonly type: "uint256";
        }];
        readonly name: "wrap";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): IRenzoWrappedTokenInterface;
    static connect(address: string, runner?: ContractRunner | null): IRenzoWrappedToken;
}
//# sourceMappingURL=IRenzoWrappedToken__factory.d.ts.map