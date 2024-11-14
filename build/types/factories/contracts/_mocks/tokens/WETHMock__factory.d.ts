import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { WETHMock, WETHMockInterface } from "../../../../contracts/_mocks/tokens/WETHMock";
type WETHMockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class WETHMock__factory extends ContractFactory {
    constructor(...args: WETHMockConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<WETHMock & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): WETHMock__factory;
    static readonly bytecode = "0x60806040526005805463ffffff001916620101001790553480156200002357600080fd5b506040805180820182526004808252630ae8aa8960e31b6020808401829052845180860190955291845290830152906012828260036200006483826200013b565b5060046200007382826200013b565b50506005805460ff191660ff93909316929092179091555062000207915050565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680620000bf57607f821691505b602082108103620000e057634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111562000136576000816000526020600020601f850160051c81016020861015620001115750805b601f850160051c820191505b8181101562000132578281556001016200011d565b5050505b505050565b81516001600160401b0381111562000157576200015762000094565b6200016f81620001688454620000aa565b84620000e6565b602080601f831160018114620001a757600084156200018e5750858301515b600019600386901b1c1916600185901b17855562000132565b600085815260208120601f198616915b82811015620001d857888601518255948401946001909101908401620001b7565b5085821015620001f75787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b610f9180620002176000396000f3fe60806040526004361061012a5760003560e01c806340c10f19116100ab57806395d89b411161006f57806395d89b41146103a4578063a457c2d7146103b9578063a9059cbb146103d9578063cf787f79146103f9578063d0e30db014610432578063dd62ed3e1461043a57600080fd5b806340c10f19146102d05780636ebcf607146102f057806370a082311461031d57806379cc6790146103535780637a1395aa1461037357600080fd5b80632dbcb32b116100f25780632dbcb32b146102005780632e1a7d4d14610237578063313ce5671461025757806335df40f21461027957806339509351146102b057600080fd5b806306fdde031461012f578063095ea7b31461015a57806318160ddd1461018a57806323b872dd146101a9578063257224ab146101c9575b600080fd5b34801561013b57600080fd5b50610144610480565b6040516101519190610d68565b60405180910390f35b34801561016657600080fd5b5061017a610175366004610dd3565b610512565b6040519015158152602001610151565b34801561019657600080fd5b506002545b604051908152602001610151565b3480156101b557600080fd5b5061017a6101c4366004610dfd565b6105d0565b3480156101d557600080fd5b506101fe6101e4366004610e39565b600580549115156101000261ff0019909216919091179055565b005b34801561020c57600080fd5b506101fe61021b366004610dd3565b6001600160a01b03909116600090815260208190526040902055565b34801561024357600080fd5b506101fe610252366004610e5b565b610629565b34801561026357600080fd5b5060055460405160ff9091168152602001610151565b34801561028557600080fd5b506101fe610294366004610e39565b60058054911515620100000262ff000019909216919091179055565b3480156102bc57600080fd5b5061017a6102cb366004610dd3565b610652565b3480156102dc57600080fd5b506101fe6102eb366004610dd3565b61068e565b3480156102fc57600080fd5b5061019b61030b366004610e74565b60006020819052908152604090205481565b34801561032957600080fd5b5061019b610338366004610e74565b6001600160a01b031660009081526020819052604090205490565b34801561035f57600080fd5b506101fe61036e366004610dd3565b61069c565b34801561037f57600080fd5b506101fe61038e366004610e8f565b6005805460ff191660ff92909216919091179055565b3480156103b057600080fd5b506101446106a6565b3480156103c557600080fd5b5061017a6103d4366004610dd3565b6106b5565b3480156103e557600080fd5b5061017a6103f4366004610dd3565b610749565b34801561040557600080fd5b506101fe610414366004610e39565b6005805491151563010000000263ff00000019909216919091179055565b6101fe610783565b34801561044657600080fd5b5061019b610455366004610eb2565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b60606003805461048f90610ee5565b80601f01602080910402602001604051908101604052809291908181526020018280546104bb90610ee5565b80156105085780601f106104dd57610100808354040283529160200191610508565b820191906000526020600020905b8154815290600101906020018083116104eb57829003601f168201915b5050505050905090565b60055460009062010000900460ff1680156105355750600554610100900460ff16155b15610542575060006105ca565b60055462010000900460ff16801561056357506005546301000000900460ff165b801561056e57508115155b801561059c57503360009081526001602090815260408083206001600160a01b038716845290915290205415155b156105a9575060006105ca565b6105b3838361078f565b5060055462010000900460ff166105c657005b5060015b92915050565b60055460009062010000900460ff1680156105f35750600554610100900460ff16155b1561060057506000610622565b61060b84848461079c565b5060055462010000900460ff1661061e57005b5060015b9392505050565b610633338261069c565b604051339082156108fc029083906000818181858888f1505050505050565b3360008181526001602090815260408083206001600160a01b038716845290915281205490916105c6918590610689908690610f35565b610846565b610698828261096b565b5050565b6106988282610a4a565b60606004805461048f90610ee5565b3360009081526001602090815260408083206001600160a01b03861684529091528120548281101561073c5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b61061e3385858403610846565b60055460009062010000900460ff16801561076c5750600554610100900460ff16155b15610779575060006105ca565b6105b38383610b90565b61078d333461068e565b565b60006105c6338484610846565b60006107a9848484610b99565b6001600160a01b03841660009081526001602090815260408083203384529091529020548281101561082e5760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b6064820152608401610733565b61083b8533858403610846565b506001949350505050565b6001600160a01b0383166108a85760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610733565b6001600160a01b0382166109095760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610733565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b0382166109c15760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610733565b80600260008282546109d39190610f35565b90915550506001600160a01b03821660009081526020819052604081208054839290610a00908490610f35565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6001600160a01b038216610aaa5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b6064820152608401610733565b6001600160a01b03821660009081526020819052604090205481811015610b1e5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b6064820152608401610733565b6001600160a01b0383166000908152602081905260408120838303905560028054849290610b4d908490610f48565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200161095e565b60006105c63384845b6001600160a01b038316610bfd5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610733565b6001600160a01b038216610c5f5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610733565b6001600160a01b03831660009081526020819052604090205481811015610cd75760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610733565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610d0e908490610f35565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610d5a91815260200190565b60405180910390a350505050565b60006020808352835180602085015260005b81811015610d9657858101830151858201604001528201610d7a565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b0381168114610dce57600080fd5b919050565b60008060408385031215610de657600080fd5b610def83610db7565b946020939093013593505050565b600080600060608486031215610e1257600080fd5b610e1b84610db7565b9250610e2960208501610db7565b9150604084013590509250925092565b600060208284031215610e4b57600080fd5b8135801515811461062257600080fd5b600060208284031215610e6d57600080fd5b5035919050565b600060208284031215610e8657600080fd5b61062282610db7565b600060208284031215610ea157600080fd5b813560ff8116811461062257600080fd5b60008060408385031215610ec557600080fd5b610ece83610db7565b9150610edc60208401610db7565b90509250929050565b600181811c90821680610ef957607f821691505b602082108103610f1957634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b808201808211156105ca576105ca610f1f565b818103818111156105ca576105ca610f1f56fea2646970667358221220bf7b6835839002969a5bf3a971969961188744fb291d86084cba3b709c04c7f264736f6c63430008180033";
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
        readonly inputs: readonly [];
        readonly name: "deposit";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
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
            readonly name: "_value";
            readonly type: "bool";
        }];
        readonly name: "setReturnBoolValue";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
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
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "wad";
            readonly type: "uint256";
        }];
        readonly name: "withdraw";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): WETHMockInterface;
    static connect(address: string, runner?: ContractRunner | null): WETHMock;
}
export {};
//# sourceMappingURL=WETHMock__factory.d.ts.map