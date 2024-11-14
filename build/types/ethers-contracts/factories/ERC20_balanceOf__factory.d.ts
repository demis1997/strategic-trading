import { type ContractRunner } from "ethers";
import type { ERC20_balanceOf, ERC20_balanceOfInterface } from "../ERC20_balanceOf";
export declare class ERC20_balanceOf__factory {
    static readonly abi: readonly [{
        readonly constant: true;
        readonly inputs: readonly [{
            readonly name: "_owner";
            readonly type: "address";
        }];
        readonly name: "balanceOf";
        readonly outputs: readonly [{
            readonly name: "balance";
            readonly type: "uint256";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [{
            readonly name: "_spender";
            readonly type: "address";
        }, {
            readonly name: "_value";
            readonly type: "uint256";
        }];
        readonly name: "approve";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bool";
        }];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): ERC20_balanceOfInterface;
    static connect(address: string, runner?: ContractRunner | null): ERC20_balanceOf;
}
//# sourceMappingURL=ERC20_balanceOf__factory.d.ts.map