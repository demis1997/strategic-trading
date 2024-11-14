import { type ContractRunner } from "ethers";
import type { IGenericWrapping, IGenericWrappingInterface } from "../../../contracts/interfaces/IGenericWrapping";
export declare class IGenericWrapping__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amount_";
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
            readonly name: "amount_";
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
    static createInterface(): IGenericWrappingInterface;
    static connect(address: string, runner?: ContractRunner | null): IGenericWrapping;
}
//# sourceMappingURL=IGenericWrapping__factory.d.ts.map