import { type ContractRunner } from "ethers";
import type { IMasterToken, IMasterTokenInterface } from "../../../contracts/interfaces/IMasterToken";
export declare class IMasterToken__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "getUserSharesBalance";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "userSharesBalance";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): IMasterTokenInterface;
    static connect(address: string, runner?: ContractRunner | null): IMasterToken;
}
//# sourceMappingURL=IMasterToken__factory.d.ts.map