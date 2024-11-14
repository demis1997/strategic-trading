import { type ContractRunner } from "ethers";
import type { ICounter, ICounterInterface } from "../../../contracts/interfaces/ICounter";
export declare class ICounter__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "decrementCount";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getCount";
        readonly outputs: readonly [{
            readonly internalType: "int256";
            readonly name: "count";
            readonly type: "int256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "incrementCount";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "int256";
            readonly name: "count";
            readonly type: "int256";
        }];
        readonly name: "setCount";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): ICounterInterface;
    static connect(address: string, runner?: ContractRunner | null): ICounter;
}
//# sourceMappingURL=ICounter__factory.d.ts.map