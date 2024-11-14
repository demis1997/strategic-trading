import { type ContractRunner } from "ethers";
import type { IEtherFiWithdrawRequestNFT, IEtherFiWithdrawRequestNFTInterface } from "../../../../../contracts/adapters/etherfi/interfaces/IEtherFiWithdrawRequestNFT";
export declare class IEtherFiWithdrawRequestNFT__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "requestId";
            readonly type: "uint256";
        }];
        readonly name: "claimWithdraw";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }];
        readonly name: "getClaimableAmount";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IEtherFiWithdrawRequestNFTInterface;
    static connect(address: string, runner?: ContractRunner | null): IEtherFiWithdrawRequestNFT;
}
//# sourceMappingURL=IEtherFiWithdrawRequestNFT__factory.d.ts.map