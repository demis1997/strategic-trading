import { type ContractRunner } from "ethers";
import type { IBaseAdapter, IBaseAdapterInterface } from "../../../contracts/interfaces/IBaseAdapter";
export declare class IBaseAdapter__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "OnlyWETHAllowed";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "target";
            readonly type: "string";
        }];
        readonly name: "ZeroAddress";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "target";
            readonly type: "string";
        }];
        readonly name: "ZeroAmount";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "string";
            readonly name: "which";
            readonly type: "string";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "newAddress";
            readonly type: "address";
        }];
        readonly name: "AddressUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "newSlippage";
            readonly type: "uint256";
        }];
        readonly name: "SlippageUpdated";
        readonly type: "event";
    }, {
        readonly inputs: readonly [];
        readonly name: "getSlippage";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IBaseAdapterInterface;
    static connect(address: string, runner?: ContractRunner | null): IBaseAdapter;
}
//# sourceMappingURL=IBaseAdapter__factory.d.ts.map