import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { UniswapV3QuoterMock, UniswapV3QuoterMockInterface } from "../../../contracts/_mocks/UniswapV3QuoterMock";
type UniswapV3QuoterMockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class UniswapV3QuoterMock__factory extends ContractFactory {
    constructor(...args: UniswapV3QuoterMockConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<UniswapV3QuoterMock & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): UniswapV3QuoterMock__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5061025e806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80632f80bb1d146100465780634f8e87e11461007b5780636bed55a614610090575b600080fd5b6100626100543660046100bd565b505060008054916060918291565b6040516100729493929190610172565b60405180910390f35b61008e61008936600461020f565b600055565b005b61009960005481565b604051908152602001610072565b634e487b7160e01b600052604160045260246000fd5b600080604083850312156100d057600080fd5b823567ffffffffffffffff808211156100e857600080fd5b818501915085601f8301126100fc57600080fd5b81358181111561010e5761010e6100a7565b604051601f8201601f19908116603f01168101908382118183101715610136576101366100a7565b8160405282815288602084870101111561014f57600080fd5b826020860160208301376000602093820184015298969091013596505050505050565b600060808201868352602060808185015281875180845260a086019150828901935060005b818110156101bc5784516001600160a01b031683529383019391830191600101610197565b50508481036040860152865180825290820192508187019060005b818110156101f957825163ffffffff16855293830193918301916001016101d7565b5050505060609290920192909252949350505050565b60006020828403121561022157600080fd5b503591905056fea2646970667358221220995e4f930f2d12449e13c1f664dd220935efcd642f4f424dd5400aa773a5cfbc64736f6c63430008180033";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "amountIn";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }, {
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly name: "quoteExactOutput";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint160[]";
            readonly name: "sqrtPriceX96AfterList";
            readonly type: "uint160[]";
        }, {
            readonly internalType: "uint32[]";
            readonly name: "initializedTicksCrossedList";
            readonly type: "uint32[]";
        }, {
            readonly internalType: "uint256";
            readonly name: "gasEstimate";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amountIn_";
            readonly type: "uint256";
        }];
        readonly name: "setQuoteExactOutput";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): UniswapV3QuoterMockInterface;
    static connect(address: string, runner?: ContractRunner | null): UniswapV3QuoterMock;
}
export {};
//# sourceMappingURL=UniswapV3QuoterMock__factory.d.ts.map