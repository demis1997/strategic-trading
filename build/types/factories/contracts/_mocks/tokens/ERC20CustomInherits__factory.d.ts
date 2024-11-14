import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { ERC20CustomInherits, ERC20CustomInheritsInterface } from "../../../../contracts/_mocks/tokens/ERC20CustomInherits";
type ERC20CustomInheritsConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ERC20CustomInherits__factory extends ContractFactory {
    constructor(...args: ERC20CustomInheritsConstructorParams);
    getDeployTransaction(name_: string, symbol_: string, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(name_: string, symbol_: string, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ERC20CustomInherits & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): ERC20CustomInherits__factory;
    static readonly bytecode = "0x60806040523480156200001157600080fd5b5060405162000bdd38038062000bdd833981016040819052620000349162000122565b60036200004283826200021d565b5060046200005182826200021d565b505050620002e9565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200008257600080fd5b81516001600160401b03808211156200009f576200009f6200005a565b604051601f8301601f19908116603f01168101908282118183101715620000ca57620000ca6200005a565b8160405283815260209250866020858801011115620000e857600080fd5b600091505b838210156200010c5785820183015181830184015290820190620000ed565b6000602085830101528094505050505092915050565b600080604083850312156200013657600080fd5b82516001600160401b03808211156200014e57600080fd5b6200015c8683870162000070565b935060208501519150808211156200017357600080fd5b50620001828582860162000070565b9150509250929050565b600181811c90821680620001a157607f821691505b602082108103620001c257634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111562000218576000816000526020600020601f850160051c81016020861015620001f35750805b601f850160051c820191505b818110156200021457828155600101620001ff565b5050505b505050565b81516001600160401b038111156200023957620002396200005a565b62000251816200024a84546200018c565b84620001c8565b602080601f831160018114620002895760008415620002705750858301515b600019600386901b1c1916600185901b17855562000214565b600085815260208120601f198616915b82811015620002ba5788860151825594840194600190910190840162000299565b5085821015620002d95787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6108e480620002f96000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c80636ebcf607116100715780636ebcf6071461014157806370a082311461016157806395d89b411461018a578063a457c2d714610192578063a9059cbb146101a5578063dd62ed3e146101b857600080fd5b806306fdde03146100b9578063095ea7b3146100d757806318160ddd146100fa57806323b872dd1461010c578063313ce5671461011f578063395093511461012e575b600080fd5b6100c16101f1565b6040516100ce919061072d565b60405180910390f35b6100ea6100e5366004610798565b610283565b60405190151581526020016100ce565b6002545b6040519081526020016100ce565b6100ea61011a3660046107c2565b61029a565b604051601281526020016100ce565b6100ea61013c366004610798565b610349565b6100fe61014f3660046107fe565b60006020819052908152604090205481565b6100fe61016f3660046107fe565b6001600160a01b031660009081526020819052604090205490565b6100c1610385565b6100ea6101a0366004610798565b610394565b6100ea6101b3366004610798565b61042d565b6100fe6101c6366004610820565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b60606003805461020090610853565b80601f016020809104026020016040519081016040528092919081815260200182805461022c90610853565b80156102795780601f1061024e57610100808354040283529160200191610279565b820191906000526020600020905b81548152906001019060200180831161025c57829003601f168201915b5050505050905090565b600061029033848461043a565b5060015b92915050565b60006102a784848461055e565b6001600160a01b0384166000908152600160209081526040808320338452909152902054828110156103315760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b60648201526084015b60405180910390fd5b61033e853385840361043a565b506001949350505050565b3360008181526001602090815260408083206001600160a01b0387168452909152812054909161029091859061038090869061088d565b61043a565b60606004805461020090610853565b3360009081526001602090815260408083206001600160a01b0386168452909152812054828110156104165760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b6064820152608401610328565b610423338585840361043a565b5060019392505050565b600061029033848461055e565b6001600160a01b03831661049c5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610328565b6001600160a01b0382166104fd5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610328565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b0383166105c25760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610328565b6001600160a01b0382166106245760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610328565b6001600160a01b0383166000908152602081905260409020548181101561069c5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610328565b6001600160a01b038085166000908152602081905260408082208585039055918516815290812080548492906106d390849061088d565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161071f91815260200190565b60405180910390a350505050565b60006020808352835180602085015260005b8181101561075b5785810183015185820160400152820161073f565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b038116811461079357600080fd5b919050565b600080604083850312156107ab57600080fd5b6107b48361077c565b946020939093013593505050565b6000806000606084860312156107d757600080fd5b6107e08461077c565b92506107ee6020850161077c565b9150604084013590509250925092565b60006020828403121561081057600080fd5b6108198261077c565b9392505050565b6000806040838503121561083357600080fd5b61083c8361077c565b915061084a6020840161077c565b90509250929050565b600181811c9082168061086757607f821691505b60208210810361088757634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561029457634e487b7160e01b600052601160045260246000fdfea264697066735822122008051dd44668ee67b7a814713bcbbc1b20aab4f0093571aa94839e7faa1eacb764736f6c63430008180033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "name_";
            readonly type: "string";
        }, {
            readonly internalType: "string";
            readonly name: "symbol_";
            readonly type: "string";
        }];
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
            readonly name: "spender";
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
        readonly name: "name";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
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
    static createInterface(): ERC20CustomInheritsInterface;
    static connect(address: string, runner?: ContractRunner | null): ERC20CustomInherits;
}
export {};
//# sourceMappingURL=ERC20CustomInherits__factory.d.ts.map