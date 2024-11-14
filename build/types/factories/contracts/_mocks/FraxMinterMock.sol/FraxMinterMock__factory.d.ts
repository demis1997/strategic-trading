import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, AddressLike, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { FraxMinterMock, FraxMinterMockInterface } from "../../../../contracts/_mocks/FraxMinterMock.sol/FraxMinterMock";
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
    static readonly bytecode = "0x608060405234801561001057600080fd5b5060405161025038038061025083398101604081905261002f91610078565b600080546001600160a01b039384166001600160a01b031991821617909155600180549290931691161790556100b2565b6001600160a01b038116811461007557600080fd5b50565b6000806040838503121561008b57600080fd5b825161009681610060565b60208401519092506100a781610060565b809150509250929050565b61018f806100c16000396000f3fe6080604052600436106100345760003560e01c80634dcd454714610039578063565d3e6e1461005f578063c9ac8c8e14610097575b600080fd5b61004c610047366004610129565b6100b7565b6040519081526020015b60405180910390f35b34801561006b57600080fd5b5060005461007f906001600160a01b031681565b6040516001600160a01b039091168152602001610056565b3480156100a357600080fd5b5060015461007f906001600160a01b031681565b6001546040516340c10f1960e01b81526001600160a01b038381166004830152346024830181905260009390929116906340c10f1990604401600060405180830381600087803b15801561010a57600080fd5b505af115801561011e573d6000803e3d6000fd5b509295945050505050565b60006020828403121561013b57600080fd5b81356001600160a01b038116811461015257600080fd5b939250505056fea2646970667358221220e14acbe1202c9448d2c2008e4550051461d2f47177d5e60d2862636e0956963d64736f6c63430008180033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "contract FraxETHMock";
            readonly name: "_frxETH";
            readonly type: "address";
        }, {
            readonly internalType: "contract SfrxETHMock";
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
            readonly name: "_recipient";
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