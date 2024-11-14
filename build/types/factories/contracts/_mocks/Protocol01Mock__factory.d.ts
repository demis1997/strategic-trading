import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, AddressLike, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { Protocol01Mock, Protocol01MockInterface } from "../../../contracts/_mocks/Protocol01Mock";
type Protocol01MockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Protocol01Mock__factory extends ContractFactory {
    constructor(...args: Protocol01MockConstructorParams);
    getDeployTransaction(protocolName_: string, assetAddress_: AddressLike, liquidAssetAddress_: AddressLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(protocolName_: string, assetAddress_: AddressLike, liquidAssetAddress_: AddressLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<Protocol01Mock & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): Protocol01Mock__factory;
    static readonly bytecode = "0x60806040523480156200001157600080fd5b50604051620018eb380380620018eb833981016040819052620000349162000183565b62000041600033620000a1565b506001805460ff191681179055670de0b6b3a7640000600481905560065560026200006d84826200030e565b50600380546001600160a01b039384166001600160a01b0319918216179091556005805492909316911617905550620003da565b6000828152602081815260408083206001600160a01b038516845290915281205460ff1662000146576000838152602081815260408083206001600160a01b03861684529091529020805460ff19166001179055620000fd3390565b6001600160a01b0316826001600160a01b0316847f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45060016200014a565b5060005b92915050565b634e487b7160e01b600052604160045260246000fd5b80516001600160a01b03811681146200017e57600080fd5b919050565b6000806000606084860312156200019957600080fd5b83516001600160401b0380821115620001b157600080fd5b818601915086601f830112620001c657600080fd5b815181811115620001db57620001db62000150565b604051601f8201601f19908116603f0116810190838211818310171562000206576200020662000150565b816040528281526020935089848487010111156200022357600080fd5b600091505b8282101562000247578482018401518183018501529083019062000228565b60008484830101528097505050506200026281870162000166565b93505050620002746040850162000166565b90509250925092565b600181811c908216806200029257607f821691505b602082108103620002b357634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111562000309576000816000526020600020601f850160051c81016020861015620002e45750805b601f850160051c820191505b818110156200030557828155600101620002f0565b5050505b505050565b81516001600160401b038111156200032a576200032a62000150565b62000342816200033b84546200027d565b84620002b9565b602080601f8311600181146200037a5760008415620003615750858301515b600019600386901b1c1916600185901b17855562000305565b600085815260208120601f198616915b82811015620003ab578886015182559484019460019091019084016200038a565b5085821015620003ca5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61150180620003ea6000396000f3fe6080604052600436106101dc5760003560e01c8063770e09fd11610102578063a701381f11610095578063d547741f11610064578063d547741f14610576578063e567e86914610596578063e90510f4146105b8578063f8ff09df146105d857600080fd5b8063a701381f14610508578063a89a4eb61461051e578063bc6b74ab14610534578063d02641a01461055457600080fd5b80639c9c3c37116100d15780639c9c3c37146104935780639ff4810c146104b3578063a217fddf146104d3578063a3d9ce44146104e857600080fd5b8063770e09fd1461041d5780637ff9b5961461043d57806391d1485414610453578063983234b61461047357600080fd5b8063248a9ca31161017a57806336568abe1161014957806336568abe146103a357806354c47b2f146103c35780636a61e5fc146103dd5780636cae9070146103fd57600080fd5b8063248a9ca31461031157806324cfba9f146103415780632b7aeb9c146103635780632f2ff15d1461038357600080fd5b8063103ba624116101b6578063103ba62414610283578063174e015b146102bb5780631ba46cfd146102d157806321c0b342146102f157600080fd5b806301ffc9a7146101e857806307ec49ad1461021d57806309b813461461026257600080fd5b366101e357005b600080fd5b3480156101f457600080fd5b50610208610203366004610fc1565b6105f8565b60405190151581526020015b60405180910390f35b34801561022957600080fd5b5061023d610238366004611007565b61062f565b6040805193151584526001600160a01b03909216602084015290820152606001610214565b610275610270366004611052565b61076b565b604051908152602001610214565b34801561028f57600080fd5b506005546102a3906001600160a01b031681565b6040516001600160a01b039091168152602001610214565b3480156102c757600080fd5b5061027560075481565b3480156102dd57600080fd5b506003546102a3906001600160a01b031681565b3480156102fd57600080fd5b5061023d61030c36600461108d565b61087a565b34801561031d57600080fd5b5061027561032c3660046110c0565b60009081526020819052604090206001015490565b34801561034d57600080fd5b5061036161035c3660046110d9565b610928565b005b34801561036f57600080fd5b5061036161037e366004611102565b610956565b34801561038f57600080fd5b5061036161039e36600461111f565b610975565b3480156103af57600080fd5b506103616103be36600461111f565b6109a0565b3480156103cf57600080fd5b506001546102089060ff1681565b3480156103e957600080fd5b506103616103f83660046110c0565b6109d8565b34801561040957600080fd5b50610361610418366004611142565b6109e9565b34801561042957600080fd5b506103616104383660046110d9565b610a08565b34801561044957600080fd5b5061027560085481565b34801561045f57600080fd5b5061020861046e36600461111f565b610a36565b34801561047f57600080fd5b5061036161048e36600461117e565b610a5f565b34801561049f57600080fd5b506102756104ae366004611142565b610a76565b3480156104bf57600080fd5b506103616104ce3660046110c0565b610a81565b3480156104df57600080fd5b50610275600081565b3480156104f457600080fd5b506103616105033660046111a0565b610a92565b34801561051457600080fd5b5061027560045481565b34801561052a57600080fd5b5061027560065481565b34801561054057600080fd5b506009546102a3906001600160a01b031681565b34801561056057600080fd5b5061027561056f3660046110d9565b5060085490565b34801561058257600080fd5b5061036161059136600461111f565b610aaa565b3480156105a257600080fd5b506105ab610acf565b6040516102149190611236565b3480156105c457600080fd5b506103616105d33660046110d9565b610b5d565b3480156105e457600080fd5b5061023d6105f3366004611007565b610b8b565b60006001600160e01b03198216637965db0b60e01b148061062957506301ffc9a760e01b6001600160e01b03198316145b92915050565b600080808061063d81610c78565b6106526001600160a01b038716893088610c85565b60055460065460405163a9059cbb60e01b81526000926001600160a01b03169163a9059cbb9161069a918c916004016001600160a01b03929092168252602082015260400190565b6020604051808303816000875af11580156106b9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106dd9190611269565b9050806107425760405162461bcd60e51b815260206004820152602860248201527f6c697175696420746f6b656e207472616e7366657220746f20737472617465676044820152671e4819985a5b195960c21b60648201526084015b60405180910390fd5b5060015460055460065460ff90921695506001600160a01b031693509150509450945094915050565b60008061077781610c78565b60015460ff166107bd5760405162461bcd60e51b81526020600482015260116024820152701d1c985b9cd9995c94d95d151bd1985a5b607a1b6044820152606401610739565b60006107c98480611286565b9150600090506107d98580611286565b6107e46014856112d4565b6107f0928592906112f5565b6107f99161131f565b60601c9050600061080a8680611286565b610819916014916000916112f5565b6108229161131f565b60601c9050610841336001600160a01b038416903060608a0135610c85565b61086961085460408801602089016110d9565b6001600160a01b038316906040890135610cec565b856060013594505050505b50919050565b600080808061088881610c78565b60055460065460405163a9059cbb60e01b81526001600160a01b038881166004830152602482019290925291169063a9059cbb906044016020604051808303816000875af11580156108de573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109029190611269565b5060015460055460065460ff90921695506001600160a01b031693509150509250925092565b600061093381610c78565b50600980546001600160a01b0319166001600160a01b0392909216919091179055565b600061096181610c78565b506001805460ff1916911515919091179055565b60008281526020819052604090206001015461099081610c78565b61099a8383610d1d565b50505050565b6001600160a01b03811633146109c95760405163334bd91960e11b815260040160405180910390fd5b6109d38282610daf565b505050565b60006109e381610c78565b50600855565b60006109f481610c78565b61099a6001600160a01b0384168584610cec565b6000610a1381610c78565b50600380546001600160a01b0319166001600160a01b0392909216919091179055565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b6000610a6a81610c78565b50600491909155600655565b6004545b9392505050565b6000610a8c81610c78565b50600755565b6000610a9d81610c78565b600261099a8385836113ee565b600082815260208190526040902060010154610ac581610c78565b61099a8383610daf565b60028054610adc9061136a565b80601f0160208091040260200160405190810160405280929190818152602001828054610b089061136a565b8015610b555780601f10610b2a57610100808354040283529160200191610b55565b820191906000526020600020905b815481529060010190602001808311610b3857829003601f168201915b505050505081565b6000610b6881610c78565b50600580546001600160a01b0319166001600160a01b0392909216919091179055565b6000808080610b9981610c78565b610bae6001600160a01b038716893088610c85565b600454600354610bcb916001600160a01b03909116908990610cec565b60075415610c505760095460075460405163a9059cbb60e01b81526001600160a01b03928316600482015260248101919091529087169063a9059cbb906044016020604051808303816000875af1158015610c2a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c4e9190611269565b505b60015460035460045460ff90921695506001600160a01b031693509150509450945094915050565b610c828133610e1a565b50565b6040516001600160a01b03848116602483015283811660448301526064820183905261099a9186918216906323b872dd906084015b604051602081830303815290604052915060e01b6020820180516001600160e01b038381831617835250505050610e57565b6040516001600160a01b038381166024830152604482018390526109d391859182169063a9059cbb90606401610cba565b6000610d298383610a36565b610da7576000838152602081815260408083206001600160a01b03861684529091529020805460ff19166001179055610d5f3390565b6001600160a01b0316826001600160a01b0316847f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a4506001610629565b506000610629565b6000610dbb8383610a36565b15610da7576000838152602081815260408083206001600160a01b0386168085529252808320805460ff1916905551339286917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a4506001610629565b610e248282610a36565b610e535760405163e2517d3f60e01b81526001600160a01b038216600482015260248101839052604401610739565b5050565b6000610e6c6001600160a01b03841683610eba565b90508051600014158015610e91575080806020019051810190610e8f9190611269565b155b156109d357604051635274afe760e01b81526001600160a01b0384166004820152602401610739565b6060610a7a8383600084600080856001600160a01b03168486604051610ee091906114af565b60006040518083038185875af1925050503d8060008114610f1d576040519150601f19603f3d011682016040523d82523d6000602084013e610f22565b606091505b5091509150610f32868383610f3c565b9695505050505050565b606082610f5157610f4c82610f98565b610a7a565b8151158015610f6857506001600160a01b0384163b155b15610f9157604051639996b31560e01b81526001600160a01b0385166004820152602401610739565b5080610a7a565b805115610fa85780518082602001fd5b604051630a12f52160e11b815260040160405180910390fd5b600060208284031215610fd357600080fd5b81356001600160e01b031981168114610a7a57600080fd5b80356001600160a01b038116811461100257600080fd5b919050565b6000806000806080858703121561101d57600080fd5b61102685610feb565b935061103460208601610feb565b925061104260408601610feb565b9396929550929360600135925050565b60006020828403121561106457600080fd5b813567ffffffffffffffff81111561107b57600080fd5b820160808185031215610a7a57600080fd5b600080604083850312156110a057600080fd5b6110a983610feb565b91506110b760208401610feb565b90509250929050565b6000602082840312156110d257600080fd5b5035919050565b6000602082840312156110eb57600080fd5b610a7a82610feb565b8015158114610c8257600080fd5b60006020828403121561111457600080fd5b8135610a7a816110f4565b6000806040838503121561113257600080fd5b823591506110b760208401610feb565b60008060006060848603121561115757600080fd5b61116084610feb565b925061116e60208501610feb565b9150604084013590509250925092565b6000806040838503121561119157600080fd5b50508035926020909101359150565b600080602083850312156111b357600080fd5b823567ffffffffffffffff808211156111cb57600080fd5b818501915085601f8301126111df57600080fd5b8135818111156111ee57600080fd5b86602082850101111561120057600080fd5b60209290920196919550909350505050565b60005b8381101561122d578181015183820152602001611215565b50506000910152565b6020815260008251806020840152611255816040850160208701611212565b601f01601f19169190910160400192915050565b60006020828403121561127b57600080fd5b8151610a7a816110f4565b6000808335601e1984360301811261129d57600080fd5b83018035915067ffffffffffffffff8211156112b857600080fd5b6020019150368190038213156112cd57600080fd5b9250929050565b8181038181111561062957634e487b7160e01b600052601160045260246000fd5b6000808585111561130557600080fd5b8386111561131257600080fd5b5050820193919092039150565b6bffffffffffffffffffffffff19813581811691601485101561134c5780818660140360031b1b83161692505b505092915050565b634e487b7160e01b600052604160045260246000fd5b600181811c9082168061137e57607f821691505b60208210810361087457634e487b7160e01b600052602260045260246000fd5b601f8211156109d3576000816000526020600020601f850160051c810160208610156113c75750805b601f850160051c820191505b818110156113e6578281556001016113d3565b505050505050565b67ffffffffffffffff83111561140657611406611354565b61141a83611414835461136a565b8361139e565b6000601f84116001811461144e57600085156114365750838201355b600019600387901b1c1916600186901b1783556114a8565b600083815260209020601f19861690835b8281101561147f578685013582556020948501946001909201910161145f565b508682101561149c5760001960f88860031b161c19848701351681555b505060018560011b0183555b5050505050565b600082516114c1818460208701611212565b919091019291505056fea2646970667358221220a2bb4fe1d5dba09abe791ddc5a1449eea5854b58ac7adc2392ba3b0e92310db164736f6c63430008180033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "protocolName_";
            readonly type: "string";
        }, {
            readonly internalType: "address";
            readonly name: "assetAddress_";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "liquidAssetAddress_";
            readonly type: "address";
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
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "target";
            readonly type: "address";
        }];
        readonly name: "AddressEmptyCode";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "AddressInsufficientBalance";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "FailedInnerCall";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "token";
            readonly type: "address";
        }];
        readonly name: "SafeERC20FailedOperation";
        readonly type: "error";
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
        readonly inputs: readonly [];
        readonly name: "assetsAmount";
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
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "receiver_";
            readonly type: "address";
        }];
        readonly name: "claim";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }, {
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
            readonly name: "sender_";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "receiver_";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "asset_";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "assetsAmount_";
            readonly type: "uint256";
        }];
        readonly name: "depositOnProtocol";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }, {
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
            readonly internalType: "struct Protocol01Mock.ExactOutputParams";
            readonly name: "params";
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
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly name: "getAccountValuation";
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
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "getTokenPrice";
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
        readonly inputs: readonly [];
        readonly name: "leftover";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "liquidAssetAddress";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "liquidAssetsAmount";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "protocolName";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
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
            readonly internalType: "uint256";
            readonly name: "assetsAmount_";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "liquidAssetsAmount_";
            readonly type: "uint256";
        }];
        readonly name: "setAmounts";
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
            readonly internalType: "uint256";
            readonly name: "amount_";
            readonly type: "uint256";
        }];
        readonly name: "setLeftover";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "liquidAssetAddress_";
            readonly type: "address";
        }];
        readonly name: "setLiquidAssetAddress";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "value_";
            readonly type: "string";
        }];
        readonly name: "setProtocolName";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "strategyAddress_";
            readonly type: "address";
        }];
        readonly name: "setStrategyAddress";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "tokenPrice_";
            readonly type: "uint256";
        }];
        readonly name: "setTokenPrice";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bool";
            readonly name: "value_";
            readonly type: "bool";
        }];
        readonly name: "setTransferSuccess";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "strategyAddress";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
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
        readonly name: "tokenPrice";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "transferSuccess";
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
            readonly name: "caller_";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "receiver_";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "liquidAssetAddress_";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "liquidTokenAmount_";
            readonly type: "uint256";
        }];
        readonly name: "withdrawAssets";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }, {
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
        readonly stateMutability: "payable";
        readonly type: "receive";
    }];
    static createInterface(): Protocol01MockInterface;
    static connect(address: string, runner?: ContractRunner | null): Protocol01Mock;
}
export {};
//# sourceMappingURL=Protocol01Mock__factory.d.ts.map