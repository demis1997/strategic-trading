import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { UniswapV3RouterMock, UniswapV3RouterMockInterface } from "../../../contracts/_mocks/UniswapV3RouterMock";
type UniswapV3RouterMockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class UniswapV3RouterMock__factory extends ContractFactory {
    constructor(...args: UniswapV3RouterMockConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<UniswapV3RouterMock & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): UniswapV3RouterMock__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50610118806100206000396000f3fe60806040526004361060305760003560e01c806309b81346146035578063747ca476146059578063f20eaeb8146077575b600080fd5b60476040366004608b565b5060005490565b60405190815260200160405180910390f35b348015606457600080fd5b506075607036600460ca565b600055565b005b348015608257600080fd5b50604760005481565b600060208284031215609c57600080fd5b813567ffffffffffffffff81111560b257600080fd5b82016080818503121560c357600080fd5b9392505050565b60006020828403121560db57600080fd5b503591905056fea2646970667358221220b8549b54c2dfb399d52c7915990af41d9531ac4f903d1750da7f255676481ed964736f6c63430008180033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "bytes";
                readonly name: "path";
                readonly type: "bytes";
            }, {
                readonly internalType: "address";
                readonly name: "recipient";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amountOut";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "amountInMaximum";
                readonly type: "uint256";
            }];
            readonly internalType: "struct UniswapV3RouterMock.ExactOutputParams";
            readonly name: "";
            readonly type: "tuple";
        }];
        readonly name: "exactOutput";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "output";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "setExactOutput";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): UniswapV3RouterMockInterface;
    static connect(address: string, runner?: ContractRunner | null): UniswapV3RouterMock;
}
export {};
//# sourceMappingURL=UniswapV3RouterMock__factory.d.ts.map