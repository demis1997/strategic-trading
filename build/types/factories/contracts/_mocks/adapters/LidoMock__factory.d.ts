import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { LidoMock, LidoMockInterface } from "../../../../contracts/_mocks/adapters/LidoMock";
type LidoMockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class LidoMock__factory extends ContractFactory {
    constructor(...args: LidoMockConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<LidoMock & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): LidoMock__factory;
    static readonly bytecode = "0x60806040526005805463ffffff001916620101001790553480156200002357600080fd5b506040805180820182526005808252640e6e88aa8960db1b6020808401829052845180860190955291845290830152906012828260036200006583826200013c565b5060046200007482826200013c565b50506005805460ff191660ff93909316929092179091555062000208915050565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680620000c057607f821691505b602082108103620000e157634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111562000137576000816000526020600020601f850160051c81016020861015620001125750805b601f850160051c820191505b8181101562000133578281556001016200011e565b5050505b505050565b81516001600160401b0381111562000158576200015862000095565b6200017081620001698454620000ab565b84620000e7565b602080601f831160018114620001a857600084156200018f5750858301515b600019600386901b1c1916600185901b17855562000133565b600085815260208120601f198616915b82811015620001d957888601518255948401946001909101908401620001b8565b5085821015620001f85787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6110b280620002186000396000f3fe60806040526004361061014b5760003560e01c80636ebcf607116100b6578063a1903eab1161006f578063a1903eab14610435578063a457c2d714610448578063a9059cbb14610468578063cf787f7914610488578063dd62ed3e146104c1578063f0fa55a91461050757600080fd5b80636ebcf6071461034c57806370a082311461037957806379cc6790146103af5780637a1395aa146103cf5780637a28fb881461040057806395d89b411461042057600080fd5b8063257224ab11610108578063257224ab146102475780632dbcb32b1461027c578063313ce567146102b357806335df40f2146102d5578063395093511461030c57806340c10f191461032c57600080fd5b806306fdde0314610150578063095ea7b31461017b57806316c38b3c146101ab57806318160ddd146101e85780631ea7ca891461020757806323b872dd14610227575b600080fd5b34801561015c57600080fd5b50610165610527565b6040516101729190610e50565b60405180910390f35b34801561018757600080fd5b5061019b610196366004610ebb565b6105b9565b6040519015158152602001610172565b3480156101b757600080fd5b506101e66101c6366004610ee5565b600580549115156401000000000264ff0000000019909216919091179055565b005b3480156101f457600080fd5b506002545b604051908152602001610172565b34801561021357600080fd5b50600554640100000000900460ff1661019b565b34801561023357600080fd5b5061019b610242366004610f07565b610677565b34801561025357600080fd5b506101e6610262366004610ee5565b600580549115156101000261ff0019909216919091179055565b34801561028857600080fd5b506101e6610297366004610ebb565b6001600160a01b03909116600090815260208190526040902055565b3480156102bf57600080fd5b5060055460405160ff9091168152602001610172565b3480156102e157600080fd5b506101e66102f0366004610ee5565b60058054911515620100000262ff000019909216919091179055565b34801561031857600080fd5b5061019b610327366004610ebb565b6106d0565b34801561033857600080fd5b506101e6610347366004610ebb565b61070c565b34801561035857600080fd5b506101f9610367366004610f43565b60006020819052908152604090205481565b34801561038557600080fd5b506101f9610394366004610f43565b6001600160a01b031660009081526020819052604090205490565b3480156103bb57600080fd5b506101e66103ca366004610ebb565b61071a565b3480156103db57600080fd5b506101e66103ea366004610f5e565b6005805460ff191660ff92909216919091179055565b34801561040c57600080fd5b506101f961041b366004610f81565b610724565b34801561042c57600080fd5b50610165610758565b6101f9610443366004610f43565b610767565b34801561045457600080fd5b5061019b610463366004610ebb565b6107a9565b34801561047457600080fd5b5061019b610483366004610ebb565b61083d565b34801561049457600080fd5b506101e66104a3366004610ee5565b6005805491151563010000000263ff00000019909216919091179055565b3480156104cd57600080fd5b506101f96104dc366004610f9a565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b34801561051357600080fd5b506101e6610522366004610f81565b600655565b60606003805461053690610fcd565b80601f016020809104026020016040519081016040528092919081815260200182805461056290610fcd565b80156105af5780601f10610584576101008083540402835291602001916105af565b820191906000526020600020905b81548152906001019060200180831161059257829003601f168201915b5050505050905090565b60055460009062010000900460ff1680156105dc5750600554610100900460ff16155b156105e957506000610671565b60055462010000900460ff16801561060a57506005546301000000900460ff165b801561061557508115155b801561064357503360009081526001602090815260408083206001600160a01b038716845290915290205415155b1561065057506000610671565b61065a8383610877565b5060055462010000900460ff1661066d57005b5060015b92915050565b60055460009062010000900460ff16801561069a5750600554610100900460ff16155b156106a7575060006106c9565b6106b2848484610884565b5060055462010000900460ff166106c557005b5060015b9392505050565b3360008181526001602090815260408083206001600160a01b0387168452909152812054909161066d91859061070790869061101d565b61092e565b6107168282610a53565b5050565b6107168282610b32565b6000600654670de0b6b3a764000061073c9190611030565b61074e83670de0b6b3a7640000611043565b610671919061105a565b60606004805461053690610fcd565b600080670de0b6b3a7640000600654670de0b6b3a76400006107899190611030565b6107939034611043565b61079d919061105a565b9050610671338261070c565b3360009081526001602090815260408083206001600160a01b0386168452909152812054828110156108305760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b6106c5338585840361092e565b60055460009062010000900460ff1680156108605750600554610100900460ff16155b1561086d57506000610671565b61065a8383610c78565b600061066d33848461092e565b6000610891848484610c81565b6001600160a01b0384166000908152600160209081526040808320338452909152902054828110156109165760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b6064820152608401610827565b610923853385840361092e565b506001949350505050565b6001600160a01b0383166109905760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610827565b6001600160a01b0382166109f15760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610827565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b038216610aa95760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610827565b8060026000828254610abb919061101d565b90915550506001600160a01b03821660009081526020819052604081208054839290610ae890849061101d565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6001600160a01b038216610b925760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b6064820152608401610827565b6001600160a01b03821660009081526020819052604090205481811015610c065760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b6064820152608401610827565b6001600160a01b0383166000908152602081905260408120838303905560028054849290610c35908490611030565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602001610a46565b600061066d3384845b6001600160a01b038316610ce55760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610827565b6001600160a01b038216610d475760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610827565b6001600160a01b03831660009081526020819052604090205481811015610dbf5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610827565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610df690849061101d565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610e4291815260200190565b60405180910390a350505050565b60006020808352835180602085015260005b81811015610e7e57858101830151858201604001528201610e62565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b0381168114610eb657600080fd5b919050565b60008060408385031215610ece57600080fd5b610ed783610e9f565b946020939093013593505050565b600060208284031215610ef757600080fd5b813580151581146106c957600080fd5b600080600060608486031215610f1c57600080fd5b610f2584610e9f565b9250610f3360208501610e9f565b9150604084013590509250925092565b600060208284031215610f5557600080fd5b6106c982610e9f565b600060208284031215610f7057600080fd5b813560ff811681146106c957600080fd5b600060208284031215610f9357600080fd5b5035919050565b60008060408385031215610fad57600080fd5b610fb683610e9f565b9150610fc460208401610e9f565b90509250929050565b600181811c90821680610fe157607f821691505b60208210810361100157634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b8082018082111561067157610671611007565b8181038181111561067157610671611007565b808202811582820484141761067157610671611007565b60008261107757634e487b7160e01b600052601260045260246000fd5b50049056fea2646970667358221220fccd877afc7005c556927f46c2f367a2e72a58858ce45c3fea0ce36be28d355964736f6c63430008180033";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "Approval";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "Transfer";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "_balances";
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
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }];
        readonly name: "allowance";
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
            readonly name: "recipient";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "approve";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "balanceOf";
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
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "burnFrom";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "decimals";
        readonly outputs: readonly [{
            readonly internalType: "uint8";
            readonly name: "";
            readonly type: "uint8";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "subtractedValue";
            readonly type: "uint256";
        }];
        readonly name: "decreaseAllowance";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "_sharesAmount";
            readonly type: "uint256";
        }];
        readonly name: "getPooledEthByShares";
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
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "addedValue";
            readonly type: "uint256";
        }];
        readonly name: "increaseAllowance";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "isStakingPaused";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "mint";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_account";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "newBalance";
            readonly type: "uint256";
        }];
        readonly name: "mockBalanceOf";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "name";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint8";
            readonly name: "value";
            readonly type: "uint8";
        }];
        readonly name: "setDecimals";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bool";
            readonly name: "_value";
            readonly type: "bool";
        }];
        readonly name: "setIsSafeApprove";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bool";
            readonly name: "_value";
            readonly type: "bool";
        }];
        readonly name: "setNeedToReturnValue";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bool";
            readonly name: "pause";
            readonly type: "bool";
        }];
        readonly name: "setPaused";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bool";
            readonly name: "_value";
            readonly type: "bool";
        }];
        readonly name: "setReturnBoolValue";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "slippage_";
            readonly type: "uint256";
        }];
        readonly name: "setSlippage";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "submit";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "symbol";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "totalSupply";
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
            readonly name: "recipient";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "transfer";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "recipient";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "transferFrom";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): LidoMockInterface;
    static connect(address: string, runner?: ContractRunner | null): LidoMock;
}
export {};
//# sourceMappingURL=LidoMock__factory.d.ts.map