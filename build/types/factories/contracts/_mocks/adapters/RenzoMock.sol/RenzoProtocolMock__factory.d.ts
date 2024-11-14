import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, AddressLike, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type { RenzoProtocolMock, RenzoProtocolMockInterface } from "../../../../../contracts/_mocks/adapters/RenzoMock.sol/RenzoProtocolMock";
type RenzoProtocolMockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class RenzoProtocolMock__factory extends ContractFactory {
    constructor(...args: RenzoProtocolMockConstructorParams);
    getDeployTransaction(stETH_: AddressLike, ezETH_: AddressLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(stETH_: AddressLike, ezETH_: AddressLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<RenzoProtocolMock & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): RenzoProtocolMock__factory;
    static readonly bytecode = "0x6080604052600160025534801561001557600080fd5b5060405161036b38038061036b83398101604081905261003491610081565b600080546001600160a01b039384166001600160a01b031991821617909155600180549290931691161790556100b4565b80516001600160a01b038116811461007c57600080fd5b919050565b6000806040838503121561009457600080fd5b61009d83610065565b91506100ab60208401610065565b90509250929050565b6102a8806100c36000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806313a73c781461005157806347e7ef24146100815780639576a0c814610096578063c1fe3e48146100ad575b600080fd5b600154610064906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b61009461008f366004610211565b6100c0565b005b61009f60025481565b604051908152602001610078565b600054610064906001600160a01b031681565b6000546001600160a01b0383811691161461012d5760405162461bcd60e51b8152602060048201526024808201527f52656e7a6f50726f746f636f6c4d6f636b3a20556e737570706f72746564207460448201526337b5b2b760e11b606482015260840160405180910390fd5b6000546040516323b872dd60e01b8152336004820152306024820152604481018390526001600160a01b03909116906323b872dd906064016020604051808303816000875af1158015610184573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101a89190610249565b506001546040516340c10f1960e01b8152336004820152602481018390526001600160a01b03909116906340c10f1990604401600060405180830381600087803b1580156101f557600080fd5b505af1158015610209573d6000803e3d6000fd5b505050505050565b6000806040838503121561022457600080fd5b82356001600160a01b038116811461023b57600080fd5b946020939093013593505050565b60006020828403121561025b57600080fd5b8151801515811461026b57600080fd5b939250505056fea2646970667358221220670cb3cf722ed08a12f5bf67032fcaaa3ee59d84bcb74c21bdd70e3ccdcaba5064736f6c63430008180033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "contract ERC20Mock";
            readonly name: "stETH_";
            readonly type: "address";
        }, {
            readonly internalType: "contract ERC20Mock";
            readonly name: "ezETH_";
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
        }];
        readonly name: "deposit";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "ezETH";
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
    static createInterface(): RenzoProtocolMockInterface;
    static connect(address: string, runner?: ContractRunner | null): RenzoProtocolMock;
}
export {};
//# sourceMappingURL=RenzoProtocolMock__factory.d.ts.map