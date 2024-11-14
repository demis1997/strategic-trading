import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { UniswapPoolMock, UniswapPoolMockInterface } from "../../../contracts/_mocks/UniswapPoolMock";
type UniswapPoolMockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class UniswapPoolMock__factory extends ContractFactory {
    constructor(...args: UniswapPoolMockConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<UniswapPoolMock & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): UniswapPoolMock__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b506101b8806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80630dfe16811461005c5780631859ba571461008c5780633850c7bd146100be5780638db791d214610103578063c6e426bd14610116575b600080fd5b60005461006f906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6100bc61009a36600461015e565b600180546001600160a01b0319166001600160a01b0392909216919091179055565b005b600154604080516001600160a01b039092168252600060208301819052908201819052606082018190526080820181905260a0820181905260c082015260e001610083565b60015461006f906001600160a01b031681565b6100bc61012436600461015e565b600080546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b038116811461015b57600080fd5b50565b60006020828403121561017057600080fd5b813561017b81610146565b939250505056fea2646970667358221220ecfa63c1d56f7b7aeea0540dd19f1402693af021c73837d81a155498c420026064736f6c63430008180033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "uint160";
            readonly name: "sqrtPriceX96_";
            readonly type: "uint160";
        }];
        readonly name: "setSlot0";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "token0_";
            readonly type: "address";
        }];
        readonly name: "setToken0";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "slot0";
        readonly outputs: readonly [{
            readonly internalType: "uint160";
            readonly name: "";
            readonly type: "uint160";
        }, {
            readonly internalType: "int24";
            readonly name: "";
            readonly type: "int24";
        }, {
            readonly internalType: "uint16";
            readonly name: "";
            readonly type: "uint16";
        }, {
            readonly internalType: "uint16";
            readonly name: "";
            readonly type: "uint16";
        }, {
            readonly internalType: "uint16";
            readonly name: "";
            readonly type: "uint16";
        }, {
            readonly internalType: "uint8";
            readonly name: "";
            readonly type: "uint8";
        }, {
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "sqrtPriceX96";
        readonly outputs: readonly [{
            readonly internalType: "uint160";
            readonly name: "";
            readonly type: "uint160";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "token0";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): UniswapPoolMockInterface;
    static connect(address: string, runner?: ContractRunner | null): UniswapPoolMock;
}
export {};
//# sourceMappingURL=UniswapPoolMock__factory.d.ts.map