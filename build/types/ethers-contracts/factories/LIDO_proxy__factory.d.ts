import { type ContractRunner } from "ethers";
import type { LIDO_proxy, LIDO_proxyInterface } from "../LIDO_proxy";
export declare class LIDO_proxy__factory {
    static readonly abi: readonly [{
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "proxyType";
        readonly outputs: readonly [{
            readonly name: "proxyTypeId";
            readonly type: "uint256";
        }];
        readonly payable: false;
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "isDepositable";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bool";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "implementation";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "appId";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [];
        readonly name: "kernel";
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly name: "_kernel";
            readonly type: "address";
        }, {
            readonly name: "_appId";
            readonly type: "bytes32";
        }, {
            readonly name: "_initializePayload";
            readonly type: "bytes";
        }];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly payable: true;
        readonly stateMutability: "payable";
        readonly type: "fallback";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly name: "sender";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "ProxyDeposit";
        readonly type: "event";
    }];
    static createInterface(): LIDO_proxyInterface;
    static connect(address: string, runner?: ContractRunner | null): LIDO_proxy;
}
//# sourceMappingURL=LIDO_proxy__factory.d.ts.map