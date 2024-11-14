import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, AddressLike, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { RocketPoolMock, RocketPoolMockInterface } from "../../../contracts/_mocks/RocketPoolMock";
type RocketPoolMockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class RocketPoolMock__factory extends ContractFactory {
    constructor(...args: RocketPoolMockConstructorParams);
    getDeployTransaction(rETH_: AddressLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(rETH_: AddressLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<RocketPoolMock & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): RocketPoolMock__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b506040516102bb3803806102bb83398101604081905261002f91610054565b600180546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b610228806100936000396000f3fe60806040526004361061004a5760003560e01c806312065fe01461004f578063b69ef8a814610073578063ca8aa0e414610089578063d0e30db0146100c1578063fb1669ca146100cb575b600080fd5b34801561005b57600080fd5b506000545b6040519081526020015b60405180910390f35b34801561007f57600080fd5b5061006060005481565b34801561009557600080fd5b506001546100a9906001600160a01b031681565b6040516001600160a01b03909116815260200161006a565b6100c96100eb565b005b3480156100d757600080fd5b506100c96100e63660046101c0565b600055565b6001546040516321a3781f60e11b81523460048201526000916001600160a01b031690634346f03e90602401602060405180830381865afa158015610134573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061015891906101d9565b6001546040516340c10f1960e01b8152336004820152602481018390529192506001600160a01b0316906340c10f1990604401600060405180830381600087803b1580156101a557600080fd5b505af11580156101b9573d6000803e3d6000fd5b5050505050565b6000602082840312156101d257600080fd5b5035919050565b6000602082840312156101eb57600080fd5b505191905056fea2646970667358221220108e6d53ede9e1a0d532b023189a3c9fdc291a0cc7a8524e3457d235594c7c0064736f6c63430008180033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "contract RETHMock";
            readonly name: "rETH_";
            readonly type: "address";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [];
        readonly name: "balance";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "deposit";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getBalance";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "rETH";
        readonly outputs: readonly [{
            readonly internalType: "contract RETHMock";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "bal";
            readonly type: "uint256";
        }];
        readonly name: "setBalance";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): RocketPoolMockInterface;
    static connect(address: string, runner?: ContractRunner | null): RocketPoolMock;
}
export {};
//# sourceMappingURL=RocketPoolMock__factory.d.ts.map