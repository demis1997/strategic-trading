import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, AddressLike, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { KelpMock, KelpMockInterface } from "../../../contracts/_mocks/KelpMock";
type KelpMockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class KelpMock__factory extends ContractFactory {
    constructor(...args: KelpMockConstructorParams);
    getDeployTransaction(rsETH_: AddressLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(rsETH_: AddressLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<KelpMock & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): KelpMock__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b506040516103b83803806103b883398101604081905261002f91610054565b600380546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b610325806100936000396000f3fe608060405234801561001057600080fd5b506004361061009d5760003560e01c8063b205e6c111610066578063b205e6c11461011c578063ba5bb4421461012f578063c3ae176614610145578063ca58e4ff146100e5578063fd83f9af1461015857600080fd5b8062b83bce146100a257806337ece810146100d2578063778fbe60146100e7578063884c1056146100fe5780639d45f18a14610113575b600080fd5b6003546100b5906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6100e56100e03660046101da565b600155565b005b6100f060015481565b6040519081526020016100c9565b6100f061010c36600461020f565b5060025490565b6100f060025481565b6100e561012a3660046101da565b600055565b6100f061013d366004610231565b505060005490565b6100e561015336600461025b565b61016b565b6100e56101663660046101da565b600255565b6003546000546040516340c10f1960e01b815233600482015260248101919091526001600160a01b03909116906340c10f1990604401600060405180830381600087803b1580156101bb57600080fd5b505af11580156101cf573d6000803e3d6000fd5b505050505050505050565b6000602082840312156101ec57600080fd5b5035919050565b80356001600160a01b038116811461020a57600080fd5b919050565b60006020828403121561022157600080fd5b61022a826101f3565b9392505050565b6000806040838503121561024457600080fd5b61024d836101f3565b946020939093013593505050565b60008060008060006080868803121561027357600080fd5b61027c866101f3565b94506020860135935060408601359250606086013567ffffffffffffffff808211156102a757600080fd5b818801915088601f8301126102bb57600080fd5b8135818111156102ca57600080fd5b8960208285010111156102dc57600080fd5b969995985093965060200194939250505056fea264697066735822122068edb34f8427b3b821532026abb3f2a23fc92e3a65bd925b98602ddc5f008aa264736f6c63430008180033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "contract ERC20Mock";
            readonly name: "rsETH_";
            readonly type: "address";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [];
        readonly name: "assetCurrentLimit";
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
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }, {
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly name: "depositAsset";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
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
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "";
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
    }, {
        readonly inputs: readonly [];
        readonly name: "rsETH";
        readonly outputs: readonly [{
            readonly internalType: "contract ERC20Mock";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "limit";
            readonly type: "uint256";
        }];
        readonly name: "setAssetCurrentLimit";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "setRsETHAmountToMint";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "min";
            readonly type: "uint256";
        }];
        readonly name: "setminAmountToDeposit";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "toMint";
            readonly type: "uint256";
        }];
        readonly name: "setrsETHAmountToMint";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): KelpMockInterface;
    static connect(address: string, runner?: ContractRunner | null): KelpMock;
}
export {};
//# sourceMappingURL=KelpMock__factory.d.ts.map