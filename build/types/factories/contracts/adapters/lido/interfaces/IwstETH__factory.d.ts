import { type ContractRunner } from "ethers";
import type { IwstETH, IwstETHInterface } from "../../../../../contracts/adapters/lido/interfaces/IwstETH";
export declare class IwstETH__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "stEthPerToken";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "tokensPerStEth";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
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
    static createInterface(): IwstETHInterface;
    static connect(address: string, runner?: ContractRunner | null): IwstETH;
}
//# sourceMappingURL=IwstETH__factory.d.ts.map