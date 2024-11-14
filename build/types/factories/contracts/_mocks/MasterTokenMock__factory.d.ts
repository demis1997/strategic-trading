import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, BigNumberish, AddressLike, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { MasterTokenMock, MasterTokenMockInterface } from "../../../contracts/_mocks/MasterTokenMock";
type MasterTokenMockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class MasterTokenMock__factory extends ContractFactory {
    constructor(...args: MasterTokenMockConstructorParams);
    getDeployTransaction(vaultsRegistryAddress: AddressLike, name_: string, symbol_: string, decimals_: BigNumberish, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(vaultsRegistryAddress: AddressLike, name_: string, symbol_: string, decimals_: BigNumberish, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<MasterTokenMock & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): MasterTokenMock__factory;
    static readonly bytecode = "0x60806040526006805463ffffff001916620101001790553480156200002357600080fd5b5060405162001f5d38038062001f5d833981016040819052620000469162000246565b828282828260046200005983826200037b565b5060056200006882826200037b565b50506006805460ff191660ff93909316929092179091555062000098915060009050620000923390565b620000cf565b5050600680546001600160a01b0390941664010000000002600160201b600160c01b03199094169390931790925550620004479050565b6000828152602081815260408083206001600160a01b038516845290915281205460ff1662000174576000838152602081815260408083206001600160a01b03861684529091529020805460ff191660011790556200012b3390565b6001600160a01b0316826001600160a01b0316847f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a450600162000178565b5060005b92915050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620001a657600080fd5b81516001600160401b0380821115620001c357620001c36200017e565b604051601f8301601f19908116603f01168101908282118183101715620001ee57620001ee6200017e565b81604052838152602092508660208588010111156200020c57600080fd5b600091505b8382101562000230578582018301518183018401529082019062000211565b6000602085830101528094505050505092915050565b600080600080608085870312156200025d57600080fd5b84516001600160a01b03811681146200027557600080fd5b60208601519094506001600160401b03808211156200029357600080fd5b620002a18883890162000194565b94506040870151915080821115620002b857600080fd5b50620002c78782880162000194565b925050606085015160ff81168114620002df57600080fd5b939692955090935050565b600181811c90821680620002ff57607f821691505b6020821081036200032057634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111562000376576000816000526020600020601f850160051c81016020861015620003515750805b601f850160051c820191505b8181101562000372578281556001016200035d565b5050505b505050565b81516001600160401b038111156200039757620003976200017e565b620003af81620003a88454620002ea565b8462000326565b602080601f831160018114620003e75760008415620003ce5750858301515b600019600386901b1c1916600185901b17855562000372565b600085815260208120601f198616915b828110156200041857888601518255948401946001909101908401620003f7565b5085821015620004375787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b611b0680620004576000396000f3fe60806040526004361061021e5760003560e01c806370a0823111610123578063a457c2d7116100ab578063dd62ed3e1161006f578063dd62ed3e1461071a578063dfcd412e14610760578063edcc64e014610780578063f45346dc146107b6578063fea53be1146107d657600080fd5b8063a457c2d714610661578063a9059cbb14610681578063cf787f79146106a1578063d011eb0f146106da578063d547741f146106fa57600080fd5b806385a0f747116100f257806385a0f747146105c257806391d14854146105ef57806393ce57951461060f57806395d89b4114610637578063a217fddf1461064c57600080fd5b806370a082311461051b578063770e09fd1461055157806379cc6790146105715780637a1395aa1461059157600080fd5b80632dbcb32b116101a657806336568abe1161017557806336568abe1461046e578063395093511461048e57806340c10f19146104ae5780636cae9070146104ce5780636ebcf607146104ee57600080fd5b80632dbcb32b146103be5780632f2ff15d146103f5578063313ce5671461041557806335df40f21461043757600080fd5b806318160ddd116101ed57806318160ddd146102e05780631ba46cfd146102ff57806323b872dd14610337578063248a9ca314610357578063257224ab1461038757600080fd5b806301ffc9a71461022a57806306fdde031461025f578063095ea7b3146102815780630e5c011e146102a157600080fd5b3661022557005b600080fd5b34801561023657600080fd5b5061024a610245366004611784565b6107f6565b60405190151581526020015b60405180910390f35b34801561026b57600080fd5b5061027461082d565b60405161025691906117ae565b34801561028d57600080fd5b5061024a61029c366004611812565b6108bf565b3480156102ad57600080fd5b506102c16102bc36600461183e565b61097c565b604080516001600160a01b039093168352602083019190915201610256565b3480156102ec57600080fd5b506003545b604051908152602001610256565b34801561030b57600080fd5b5060075461031f906001600160a01b031681565b6040516001600160a01b039091168152602001610256565b34801561034357600080fd5b5061024a61035236600461185b565b610a05565b34801561036357600080fd5b506102f161037236600461189c565b60009081526020819052604090206001015490565b34801561039357600080fd5b506103bc6103a23660046118c3565b600680549115156101000261ff0019909216919091179055565b005b3480156103ca57600080fd5b506103bc6103d9366004611812565b6001600160a01b03909116600090815260016020526040902055565b34801561040157600080fd5b506103bc6104103660046118e0565b610a5e565b34801561042157600080fd5b5060065460405160ff9091168152602001610256565b34801561044357600080fd5b506103bc6104523660046118c3565b60068054911515620100000262ff000019909216919091179055565b34801561047a57600080fd5b506103bc6104893660046118e0565b610a89565b34801561049a57600080fd5b5061024a6104a9366004611812565b610ac1565b3480156104ba57600080fd5b506103bc6104c9366004611812565b610afd565b3480156104da57600080fd5b506103bc6104e936600461185b565b610b0b565b3480156104fa57600080fd5b506102f161050936600461183e565b60016020526000908152604090205481565b34801561052757600080fd5b506102f161053636600461183e565b6001600160a01b031660009081526001602052604090205490565b34801561055d57600080fd5b506103bc61056c36600461183e565b610b90565b34801561057d57600080fd5b506103bc61058c366004611812565b610bbe565b34801561059d57600080fd5b506103bc6105ac366004611910565b6006805460ff191660ff92909216919091179055565b3480156105ce57600080fd5b506102f16105dd36600461183e565b60086020526000908152604090205481565b3480156105fb57600080fd5b5061024a61060a3660046118e0565b610bc8565b34801561061b57600080fd5b5060065461031f9064010000000090046001600160a01b031681565b34801561064357600080fd5b50610274610bf1565b34801561065857600080fd5b506102f1600081565b34801561066d57600080fd5b5061024a61067c366004611812565b610c00565b34801561068d57600080fd5b5061024a61069c366004611812565b610c94565b3480156106ad57600080fd5b506103bc6106bc3660046118c3565b6006805491151563010000000263ff00000019909216919091179055565b3480156106e657600080fd5b506102c16106f536600461183e565b610cce565b34801561070657600080fd5b506103bc6107153660046118e0565b610d26565b34801561072657600080fd5b506102f1610735366004611933565b6001600160a01b03918216600090815260026020908152604080832093909416825291909152205490565b34801561076c57600080fd5b506102f161077b366004611961565b610d4b565b34801561078c57600080fd5b506102f161079b36600461183e565b6001600160a01b031660009081526008602052604090205490565b3480156107c257600080fd5b506102f16107d13660046119b4565b610e1c565b3480156107e257600080fd5b506102f16107f1366004611961565b610ee4565b60006001600160e01b03198216637965db0b60e01b148061082757506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606004805461083c906119f6565b80601f0160208091040260200160405190810160405280929190818152602001828054610868906119f6565b80156108b55780601f1061088a576101008083540402835291602001916108b5565b820191906000526020600020905b81548152906001019060200180831161089857829003601f168201915b5050505050905090565b60065460009062010000900460ff1680156108e25750600654610100900460ff16155b156108ef57506000610827565b60065462010000900460ff16801561091057506006546301000000900460ff165b801561091b57508115155b801561094957503360009081526002602090815260408083206001600160a01b038716845290915290205415155b1561095657506000610827565b6109608383610fa5565b5060065462010000900460ff1661097357005b50600192915050565b6000808061098981610fb2565b61099284610fbf565b600080856001600160a01b0316634641257d6040518163ffffffff1660e01b815260040160408051808303816000875af11580156109d4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109f89190611a30565b9095509350505050915091565b60065460009062010000900460ff168015610a285750600654610100900460ff16155b15610a3557506000610a57565b610a40848484611078565b5060065462010000900460ff16610a5357005b5060015b9392505050565b600082815260208190526040902060010154610a7981610fb2565b610a838383611122565b50505050565b6001600160a01b0381163314610ab25760405163334bd91960e11b815260040160405180910390fd5b610abc82826111b4565b505050565b3360008181526002602090815260408083206001600160a01b03871684529091528120549091610973918590610af8908690611a74565b61121f565b610b078282611343565b5050565b6000610b1681610fb2565b60405163a9059cbb60e01b81526001600160a01b0385811660048301526024820184905284169063a9059cbb906044016020604051808303816000875af1158015610b65573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b899190611a87565b5050505050565b6000610b9b81610fb2565b50600780546001600160a01b0319166001600160a01b0392909216919091179055565b610b078282611422565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b60606005805461083c906119f6565b3360009081526002602090815260408083206001600160a01b038616845290915281205482811015610c875760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b610a53338585840361121f565b60065460009062010000900460ff168015610cb75750600654610100900460ff16155b15610cc457506000610827565b6109608383611570565b60008080610cdb81610fb2565b610ce484610fbf565b600080856001600160a01b031663037897d66040518163ffffffff1660e01b815260040160408051808303816000875af11580156109d4573d6000803e3d6000fd5b600082815260208190526040902060010154610d4181610fb2565b610a8383836111b4565b600080610d5781610fb2565b610d6086610fbf565b604051632d182be560e21b8152600481018690526001600160a01b03858116602483015284811660448301526000919088169063b460af94906064016020604051808303816000875af1158015610dbb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ddf9190611aa4565b6001600160a01b038516600090815260086020526040812080549293508392909190610e0c908490611abd565b9091555090979650505050505050565b600080610e2881610fb2565b610e3185610fbf565b604051636e553f6560e01b8152600481018590526001600160a01b03848116602483015260009190871690636e553f65906044016020604051808303816000875af1158015610e84573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ea89190611aa4565b6001600160a01b038516600090815260086020526040812080549293508392909190610ed5908490611a74565b90915550909695505050505050565b600080610ef081610fb2565b610ef986610fbf565b604051635d043b2960e11b8152600481018690526001600160a01b03858116602483015284811660448301526000919088169063ba087652906064016020604051808303816000875af1158015610f54573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f789190611aa4565b6001600160a01b038516600090815260086020526040812080549293508892909190610e0c908490611abd565b600061097333848461121f565b610fbc813361157d565b50565b600654604051630c5aed5760e01b81526001600160a01b03838116600483015260009264010000000090041690630c5aed5790602401602060405180830381865afa158015611012573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110369190611a87565b905080610b075760405162461bcd60e51b815260206004820152601060248201526f5661756c74206e6f742041637469766560801b6044820152606401610c7e565b60006110858484846115b6565b6001600160a01b03841660009081526002602090815260408083203384529091529020548281101561110a5760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b6064820152608401610c7e565b611117853385840361121f565b506001949350505050565b600061112e8383610bc8565b6111ac576000838152602081815260408083206001600160a01b03861684529091529020805460ff191660011790556111643390565b6001600160a01b0316826001600160a01b0316847f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a4506001610827565b506000610827565b60006111c08383610bc8565b156111ac576000838152602081815260408083206001600160a01b0386168085529252808320805460ff1916905551339286917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a4506001610827565b6001600160a01b0383166112815760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610c7e565b6001600160a01b0382166112e25760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610c7e565b6001600160a01b0383811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b0382166113995760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610c7e565b80600360008282546113ab9190611a74565b90915550506001600160a01b038216600090815260016020526040812080548392906113d8908490611a74565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6001600160a01b0382166114825760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b6064820152608401610c7e565b6001600160a01b038216600090815260016020526040902054818110156114f65760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b6064820152608401610c7e565b6001600160a01b0383166000908152600160205260408120838303905560038054849290611525908490611abd565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3505050565b60006109733384846115b6565b6115878282610bc8565b610b075760405163e2517d3f60e01b81526001600160a01b038216600482015260248101839052604401610c7e565b6001600160a01b03831661161a5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610c7e565b6001600160a01b03821661167c5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610c7e565b6001600160a01b038316600090815260016020526040902054818110156116f45760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610c7e565b6001600160a01b0380851660009081526001602052604080822085850390559185168152908120805484929061172b908490611a74565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161177791815260200190565b60405180910390a3610a83565b60006020828403121561179657600080fd5b81356001600160e01b031981168114610a5757600080fd5b60006020808352835180602085015260005b818110156117dc578581018301518582016040015282016117c0565b506000604082860101526040601f19601f8301168501019250505092915050565b6001600160a01b0381168114610fbc57600080fd5b6000806040838503121561182557600080fd5b8235611830816117fd565b946020939093013593505050565b60006020828403121561185057600080fd5b8135610a57816117fd565b60008060006060848603121561187057600080fd5b833561187b816117fd565b9250602084013561188b816117fd565b929592945050506040919091013590565b6000602082840312156118ae57600080fd5b5035919050565b8015158114610fbc57600080fd5b6000602082840312156118d557600080fd5b8135610a57816118b5565b600080604083850312156118f357600080fd5b823591506020830135611905816117fd565b809150509250929050565b60006020828403121561192257600080fd5b813560ff81168114610a5757600080fd5b6000806040838503121561194657600080fd5b8235611951816117fd565b91506020830135611905816117fd565b6000806000806080858703121561197757600080fd5b8435611982816117fd565b9350602085013592506040850135611999816117fd565b915060608501356119a9816117fd565b939692955090935050565b6000806000606084860312156119c957600080fd5b83356119d4816117fd565b92506020840135915060408401356119eb816117fd565b809150509250925092565b600181811c90821680611a0a57607f821691505b602082108103611a2a57634e487b7160e01b600052602260045260246000fd5b50919050565b60008060408385031215611a4357600080fd5b8251611a4e816117fd565b6020939093015192949293505050565b634e487b7160e01b600052601160045260246000fd5b8082018082111561082757610827611a5e565b600060208284031215611a9957600080fd5b8151610a57816118b5565b600060208284031215611ab657600080fd5b5051919050565b8181038181111561082757610827611a5e56fea2646970667358221220151517337659e30922c7c6b0cc0151ff560bfbef07b7e5072d88721918c9f57064736f6c63430008180033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "vaultsRegistryAddress";
            readonly type: "address";
        }, {
            readonly internalType: "string";
            readonly name: "name_";
            readonly type: "string";
        }, {
            readonly internalType: "string";
            readonly name: "symbol_";
            readonly type: "string";
        }, {
            readonly internalType: "uint8";
            readonly name: "decimals_";
            readonly type: "uint8";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [];
        readonly name: "AccessControlBadConfirmation";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly internalType: "bytes32";
            readonly name: "neededRole";
            readonly type: "bytes32";
        }];
        readonly name: "AccessControlUnauthorizedAccount";
        readonly type: "error";
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
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "previousAdminRole";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "newAdminRole";
            readonly type: "bytes32";
        }];
        readonly name: "RoleAdminChanged";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }];
        readonly name: "RoleGranted";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }];
        readonly name: "RoleRevoked";
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
        readonly inputs: readonly [];
        readonly name: "DEFAULT_ADMIN_ROLE";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
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
        readonly inputs: readonly [];
        readonly name: "assetAddress";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
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
            readonly internalType: "address";
            readonly name: "vaultAddress_";
            readonly type: "address";
        }];
        readonly name: "deployAssets";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "vaultAddress_";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "assetsAmount_";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "account_";
            readonly type: "address";
        }];
        readonly name: "deposit";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }];
        readonly name: "getRoleAdmin";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "receiver";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "getTokensBack";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account_";
            readonly type: "address";
        }];
        readonly name: "getUserSharesBalance";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "grantRole";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "vaultAddress_";
            readonly type: "address";
        }];
        readonly name: "harvest";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "tokenAmount";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "hasRole";
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
            readonly internalType: "address";
            readonly name: "vaultAddress_";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "sharesAmount_";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "caller_";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "account_";
            readonly type: "address";
        }];
        readonly name: "redeem";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "callerConfirmation";
            readonly type: "address";
        }];
        readonly name: "renounceRole";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "revokeRole";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "assetAddress_";
            readonly type: "address";
        }];
        readonly name: "setAssetAddress";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
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
        readonly inputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "interfaceId";
            readonly type: "bytes4";
        }];
        readonly name: "supportsInterface";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
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
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "user";
            readonly type: "address";
        }];
        readonly name: "usersShares";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "shares";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "vaultsRegistry";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "vaultAddress_";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "assetsAmount_";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "caller_";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "account_";
            readonly type: "address";
        }];
        readonly name: "withdraw";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly stateMutability: "payable";
        readonly type: "receive";
    }];
    static createInterface(): MasterTokenMockInterface;
    static connect(address: string, runner?: ContractRunner | null): MasterTokenMock;
}
export {};
//# sourceMappingURL=MasterTokenMock__factory.d.ts.map