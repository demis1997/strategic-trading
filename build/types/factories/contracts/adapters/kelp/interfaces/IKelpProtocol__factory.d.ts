import { type ContractRunner } from "ethers";
import type { IKelpProtocol, IKelpProtocolInterface } from "../../../../../contracts/adapters/kelp/interfaces/IKelpProtocol";
export declare class IKelpProtocol__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "asset";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "depositAmount";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "minRSETHAmountExpected";
            readonly type: "uint256";
        }, {
            readonly internalType: "string";
            readonly name: "referralId";
            readonly type: "string";
        }];
        readonly name: "depositAsset";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "asset";
            readonly type: "address";
        }];
        readonly name: "getAssetCurrentLimit";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "asset";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "getRsETHAmountToMint";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "rsethAmountToMint";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "minAmountToDeposit";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IKelpProtocolInterface;
    static connect(address: string, runner?: ContractRunner | null): IKelpProtocol;
}
//# sourceMappingURL=IKelpProtocol__factory.d.ts.map