import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, AddressLike, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { EtherFiMock, EtherFiMockInterface } from "../../../../contracts/_mocks/adapters/EtherFiMock";
type EtherFiMockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class EtherFiMock__factory extends ContractFactory {
    constructor(...args: EtherFiMockConstructorParams);
    getDeployTransaction(stETH_: AddressLike, eETH_: AddressLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(stETH_: AddressLike, eETH_: AddressLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<EtherFiMock & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): EtherFiMock__factory;
    static readonly bytecode = "0x6080604052600160025534801561001557600080fd5b5060405161032138038061032183398101604081905261003491610081565b600080546001600160a01b039384166001600160a01b031991821617909155600180549290931691161790556100b4565b80516001600160a01b038116811461007c57600080fd5b919050565b6000806040838503121561009457600080fd5b61009d83610065565b91506100ab60208401610065565b90509250929050565b61025e806100c36000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80630de371e2146100515780639576a0c814610081578063b6f086f414610098578063c1fe3e48146100ab575b600080fd5b600154610064906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b61008a60025481565b604051908152602001610078565b61008a6100a63660046101c3565b6100be565b600054610064906001600160a01b031681565b600080546040516323b872dd60e01b8152336004820152306024820152604481018590526001600160a01b03909116906323b872dd906064016020604051808303816000875af1158015610116573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061013a91906101ff565b506001546040516340c10f1960e01b8152336004820152602481018590526001600160a01b03909116906340c10f1990604401600060405180830381600087803b15801561018757600080fd5b505af115801561019b573d6000803e3d6000fd5b50949695505050505050565b80356001600160a01b03811681146101be57600080fd5b919050565b6000806000606084860312156101d857600080fd5b6101e1846101a7565b9250602084013591506101f6604085016101a7565b90509250925092565b60006020828403121561021157600080fd5b8151801515811461022157600080fd5b939250505056fea264697066735822122029b1311f9082aea9cf8346bb8dc8d1e8c2c46326c9e798847b6c4ea3cad2c72264736f6c63430008180033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "contract ERC20Mock";
            readonly name: "stETH_";
            readonly type: "address";
        }, {
            readonly internalType: "contract ERC20Mock";
            readonly name: "eETH_";
            readonly type: "address";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "_amount";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "_referral";
            readonly type: "address";
        }];
        readonly name: "depositWithERC20";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "eETH";
        readonly outputs: readonly [{
            readonly internalType: "contract ERC20Mock";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "stETH";
        readonly outputs: readonly [{
            readonly internalType: "contract ERC20Mock";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "tokensPerStEth";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): EtherFiMockInterface;
    static connect(address: string, runner?: ContractRunner | null): EtherFiMock;
}
export {};
//# sourceMappingURL=EtherFiMock__factory.d.ts.map