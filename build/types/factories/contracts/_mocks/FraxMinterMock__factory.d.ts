import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, AddressLike, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { FraxMinterMock, FraxMinterMockInterface } from "../../../contracts/_mocks/FraxMinterMock";
type FraxMinterMockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class FraxMinterMock__factory extends ContractFactory {
    constructor(...args: FraxMinterMockConstructorParams);
    getDeployTransaction(_frxETH: AddressLike, _sfrxETH: AddressLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(_frxETH: AddressLike, _sfrxETH: AddressLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<FraxMinterMock & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): FraxMinterMock__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5060405161038938038061038983398101604081905261002f9161007c565b600080546001600160a01b039384166001600160a01b031991821617909155600180549290931691161790556100af565b80516001600160a01b038116811461007757600080fd5b919050565b6000806040838503121561008f57600080fd5b61009883610060565b91506100a660208401610060565b90509250929050565b6102cb806100be6000396000f3fe6080604052600436106100345760003560e01c80634dcd454714610039578063565d3e6e1461005f578063c9ac8c8e14610097575b600080fd5b61004c610047366004610243565b6100b7565b6040519081526020015b60405180910390f35b34801561006b57600080fd5b5060005461007f906001600160a01b031681565b6040516001600160a01b039091168152602001610056565b3480156100a357600080fd5b5060015461007f906001600160a01b031681565b60008034116100fa5760405162461bcd60e51b815260206004820152600b60248201526a139bc8115512081cd95b9d60aa1b604482015260640160405180910390fd5b6000546040516340c10f1960e01b81523060048201523460248201526001600160a01b03909116906340c10f1990604401600060405180830381600087803b15801561014557600080fd5b505af1158015610159573d6000803e3d6000fd5b505060005460015460405163095ea7b360e01b81526001600160a01b0391821660048201523460248201529116925063095ea7b391506044016020604051808303816000875af11580156101b1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101d59190610273565b506001546040516340c10f1960e01b81526001600160a01b03848116600483015234602483018190529216906340c10f1990604401600060405180830381600087803b15801561022457600080fd5b505af1158015610238573d6000803e3d6000fd5b509295945050505050565b60006020828403121561025557600080fd5b81356001600160a01b038116811461026c57600080fd5b9392505050565b60006020828403121561028557600080fd5b8151801515811461026c57600080fdfea2646970667358221220be7fd01efa6fcf20db4ac6239389be75c49a4630806803334c9743e3bab5bcbb64736f6c63430008180033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_frxETH";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "_sfrxETH";
            readonly type: "address";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [];
        readonly name: "frxETH";
        readonly outputs: readonly [{
            readonly internalType: "contract FraxETHMock";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "sfrxETH";
        readonly outputs: readonly [{
            readonly internalType: "contract SfrxETHMock";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "recipient";
            readonly type: "address";
        }];
        readonly name: "submitAndDeposit";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }];
    static createInterface(): FraxMinterMockInterface;
    static connect(address: string, runner?: ContractRunner | null): FraxMinterMock;
}
export {};
//# sourceMappingURL=FraxMinterMock__factory.d.ts.map