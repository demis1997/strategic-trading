import { type ContractRunner } from "ethers";
import type { IFraxMinter, IFraxMinterInterface } from "../../../../../contracts/adapters/frax/interfaces/IFraxMinter";
export declare class IFraxMinter__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "recipient";
            readonly type: "address";
        }];
        readonly name: "submitAndDeposit";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }];
    static createInterface(): IFraxMinterInterface;
    static connect(address: string, runner?: ContractRunner | null): IFraxMinter;
}
//# sourceMappingURL=IFraxMinter__factory.d.ts.map