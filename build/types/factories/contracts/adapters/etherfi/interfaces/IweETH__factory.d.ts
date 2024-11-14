import { type ContractRunner } from "ethers";
import type { IweETH, IweETHInterface } from "../../../../../contracts/adapters/etherfi/interfaces/IweETH";
export declare class IweETH__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "_weETHAmount";
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
            readonly name: "_eETHAmount";
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
    static createInterface(): IweETHInterface;
    static connect(address: string, runner?: ContractRunner | null): IweETH;
}
//# sourceMappingURL=IweETH__factory.d.ts.map