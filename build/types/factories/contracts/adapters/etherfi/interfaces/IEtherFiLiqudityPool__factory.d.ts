import { type ContractRunner } from "ethers";
import type { IEtherFiLiqudityPool, IEtherFiLiqudityPoolInterface } from "../../../../../contracts/adapters/etherfi/interfaces/IEtherFiLiqudityPool";
export declare class IEtherFiLiqudityPool__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "recipient";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "requestWithdraw";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): IEtherFiLiqudityPoolInterface;
    static connect(address: string, runner?: ContractRunner | null): IEtherFiLiqudityPool;
}
//# sourceMappingURL=IEtherFiLiqudityPool__factory.d.ts.map