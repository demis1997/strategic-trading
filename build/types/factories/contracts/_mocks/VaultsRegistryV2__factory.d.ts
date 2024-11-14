import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { VaultsRegistryV2, VaultsRegistryV2Interface } from "../../../contracts/_mocks/VaultsRegistryV2";
type VaultsRegistryV2ConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class VaultsRegistryV2__factory extends ContractFactory {
    constructor(...args: VaultsRegistryV2ConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<VaultsRegistryV2 & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): VaultsRegistryV2__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50611af1806100206000396000f3fe60806040523480156200001157600080fd5b5060043610620001455760003560e01c806360d712fc11620000bb578063c84c5fce116200007a578063c84c5fce14620002e0578063d547741f14620002ea578063da35a26f1462000301578063ec342ad01462000318578063fa969673146200032957600080fd5b806360d712fc146200026d5780636657fc67146200028457806391d1485414620002aa5780639461d87714620002c1578063a217fddf14620002d757600080fd5b8063281da1ed1162000108578063281da1ed14620001f85780632f2ff15d146200021157806336568abe146200022857806353e78b6b146200023f5780635f70fdb5146200025657600080fd5b806301ffc9a7146200014a57806307d3345514620001765780630c5aed57146200018f5780631adc08ba14620001be578063248a9ca314620001e1575b600080fd5b620001616200015b36600462000d59565b62000333565b60405190151581526020015b60405180910390f35b6200018060005481565b6040519081526020016200016d565b62000161620001a036600462000da2565b6001600160a01b031660009081526001602052604090205460ff1690565b620001c86200036b565b6040516001600160a01b0390911681526020016200016d565b62000180620001f236600462000dc2565b620003e1565b6200020f6200020936600462000e87565b62000404565b005b6200020f6200022236600462000f30565b6200067b565b6200020f6200023936600462000f30565b620006a3565b6200020f6200025036600462000da2565b620006de565b6200020f6200026736600462000dc2565b620007c4565b6200020f6200027e36600462000f63565b62000832565b620001616200029536600462000da2565b60016020526000908152604090205460ff1681565b62000161620002bb36600462000f30565b620008d4565b6200020f620002d236600462000dc2565b600355565b62000180600081565b620001c86200090d565b6200020f620002fb36600462000f30565b6200092c565b6200020f6200031236600462000f30565b6200094e565b6200018068056bc75e2d6310000081565b6200018060035481565b60006001600160e01b03198216637965db0b60e01b14806200036557506301ffc9a760e01b6001600160e01b03198316145b92915050565b60025460408051635c60da1b60e01b815290516000926001600160a01b031691635c60da1b9160048083019260209291908290030181865afa158015620003b6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620003dc919062000f9a565b905090565b600090815260008051602062001a9c833981519152602052604090206001015490565b6000620004118162000b3e565b62000452866040518060400160405280601781526020017f756e6465726c79696e67546f6b656e416464726573735f00000000000000000081525062000b4d565b6200048985604051806040016040528060138152602001726d6173746572546f6b656e416464726573735f60681b81525062000b4d565b620004ba846040518060400160405280600d81526020016c6f776e6572416464726573735f60981b81525062000b4d565b8251600003620005065760405162461bcd60e51b8152602060048201526012602482015271496e76616c6964207368617265734e616d6560701b60448201526064015b60405180910390fd5b8151600003620005505760405162461bcd60e51b8152602060048201526014602482015273125b9d985b1a59081cda185c995cd4de5b589bdb60621b6044820152606401620004fd565b6002546040516000916001600160a01b03169062498be160e91b9062000585908a908a9030908b908b908b9060240162001002565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051620005c49062000d3d565b620005d192919062001061565b604051809103906000f080158015620005ee573d6000803e3d6000fd5b5090506001600160a01b0381166200061957604051632d18829560e21b815260040160405180910390fd5b6001600160a01b038116600081815260016020818152604092839020805460ff191690921790915590519182527fd5a374a618f8685f4271e8fcb71c8cf6179f8356745cb2b9daa8fe0708b3c26691015b60405180910390a150505050505050565b6200068682620003e1565b620006918162000b3e565b6200069d838362000b7d565b50505050565b6001600160a01b0381163314620006cd5760405163334bd91960e11b815260040160405180910390fd5b620006d9828262000c29565b505050565b6000620006eb8162000b3e565b6200072182604051806040016040528060128152602001716e6577496d706c656d656e746174696f6e5f60701b81525062000b4d565b600254604051631b2ce7f360e11b81526001600160a01b03848116600483015290911690633659cfe690602401600060405180830381600087803b1580156200076957600080fd5b505af11580156200077e573d6000803e3d6000fd5b50506040516001600160a01b03851681527f48158d2f0abde90b13ae9358d35fefc13aaea2dfa5ca474989909a5da83c50e7925060200190505b60405180910390a15050565b6000620007d18162000b3e565b68056bc75e2d63100000821115620007fc576040516301e1805b60e61b815260040160405180910390fd5b60008290556040518281527f6a224441cca6183c6e3e03f35f9bfc8bc68b3a32caf2b3c6aae57ae4202b8e6390602001620007b8565b60006200083f8162000b3e565b62000870836040518060400160405280600d81526020016c7661756c74416464726573735f60981b81525062000b4d565b6001600160a01b038316600081815260016020908152604091829020805460ff19168615159081179091558251938452908301527f32a7de7321c9403d8687817e59bda821c4153c1ba40a38e43d5405070cdfb384910160405180910390a1505050565b600091825260008051602062001a9c833981519152602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6000806200091b8162000b3e565b50506002546001600160a01b031690565b6200093782620003e1565b620009428162000b3e565b6200069d838362000c29565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a008054600160401b810460ff16159067ffffffffffffffff16600081158015620009955750825b905060008267ffffffffffffffff166001148015620009b35750303b155b905081158015620009c2575080155b15620009e15760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff19166001178555831562000a0c57845460ff60401b1916600160401b1785555b68056bc75e2d6310000087111562000a37576040516301e1805b60e61b815260040160405180910390fd5b62000a6f86604051806040016040528060148152602001737661756c74496d706c656d656e746174696f6e5f60601b81525062000b4d565b62000a7962000caa565b62000a8660003362000b7d565b50853060405162000a979062000d4b565b6001600160a01b03928316815291166020820152604001604051809103906000f08015801562000acb573d6000803e3d6000fd5b50600280546001600160a01b0319166001600160a01b03929092169190911790556000879055831562000b3557845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2906020016200066a565b50505050505050565b62000b4a813362000cb6565b50565b6001600160a01b03821662000b79578060405163eac0d38960e01b8152600401620004fd91906200108f565b5050565b600060008051602062001a9c83398151915262000b9b8484620008d4565b62000c1e576000848152602082815260408083206001600160a01b03871684529091529020805460ff1916600117905562000bd33390565b6001600160a01b0316836001600160a01b0316857f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a4600191505062000365565b600091505062000365565b600060008051602062001a9c83398151915262000c478484620008d4565b1562000c1e576000848152602082815260408083206001600160a01b0387168085529252808320805460ff1916905551339287917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a4600191505062000365565b62000cb462000cf3565b565b62000cc28282620008d4565b62000b795760405163e2517d3f60e01b81526001600160a01b038216600482015260248101839052604401620004fd565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0054600160401b900460ff1662000cb457604051631afcd79f60e31b815260040160405180910390fd5b6105bf80620010a583390190565b610438806200166483390190565b60006020828403121562000d6c57600080fd5b81356001600160e01b03198116811462000d8557600080fd5b9392505050565b6001600160a01b038116811462000b4a57600080fd5b60006020828403121562000db557600080fd5b813562000d858162000d8c565b60006020828403121562000dd557600080fd5b5035919050565b634e487b7160e01b600052604160045260246000fd5b600082601f83011262000e0457600080fd5b813567ffffffffffffffff8082111562000e225762000e2262000ddc565b604051601f8301601f19908116603f0116810190828211818310171562000e4d5762000e4d62000ddc565b8160405283815286602085880101111562000e6757600080fd5b836020870160208301376000602085830101528094505050505092915050565b600080600080600060a0868803121562000ea057600080fd5b853562000ead8162000d8c565b9450602086013562000ebf8162000d8c565b9350604086013562000ed18162000d8c565b9250606086013567ffffffffffffffff8082111562000eef57600080fd5b62000efd89838a0162000df2565b9350608088013591508082111562000f1457600080fd5b5062000f238882890162000df2565b9150509295509295909350565b6000806040838503121562000f4457600080fd5b82359150602083013562000f588162000d8c565b809150509250929050565b6000806040838503121562000f7757600080fd5b823562000f848162000d8c565b91506020830135801515811462000f5857600080fd5b60006020828403121562000fad57600080fd5b815162000d858162000d8c565b6000815180845260005b8181101562000fe25760208185018101518683018201520162000fc4565b506000602082860101526020601f19601f83011685010191505092915050565b6001600160a01b038781168252868116602083015285811660408301528416606082015260c060808201819052600090620010409083018562000fba565b82810360a084015262001054818562000fba565b9998505050505050505050565b6001600160a01b0383168152604060208201819052600090620010879083018462000fba565b949350505050565b60208152600062000d85602083018462000fba56fe60a06040526040516105bf3803806105bf83398101604081905261002291610387565b61002c828261003e565b506001600160a01b031660805261047e565b610047826100fe565b6040516001600160a01b038316907f1cf3b03a6cf19fa2baba4df148e9dcabedea7f8a5c07840e207e5c089be95d3e90600090a28051156100f2576100ed826001600160a01b0316635c60da1b6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156100c3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100e79190610447565b82610211565b505050565b6100fa610288565b5050565b806001600160a01b03163b60000361013957604051631933b43b60e21b81526001600160a01b03821660048201526024015b60405180910390fd5b807fa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d5080546001600160a01b0319166001600160a01b0392831617905560408051635c60da1b60e01b81529051600092841691635c60da1b9160048083019260209291908290030181865afa1580156101b5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101d99190610447565b9050806001600160a01b03163b6000036100fa57604051634c9c8ce360e01b81526001600160a01b0382166004820152602401610130565b6060600080846001600160a01b03168460405161022e9190610462565b600060405180830381855af49150503d8060008114610269576040519150601f19603f3d011682016040523d82523d6000602084013e61026e565b606091505b50909250905061027f8583836102a9565b95945050505050565b34156102a75760405163b398979f60e01b815260040160405180910390fd5b565b6060826102be576102b982610308565b610301565b81511580156102d557506001600160a01b0384163b155b156102fe57604051639996b31560e01b81526001600160a01b0385166004820152602401610130565b50805b9392505050565b8051156103185780518082602001fd5b604051630a12f52160e11b815260040160405180910390fd5b80516001600160a01b038116811461034857600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561037e578181015183820152602001610366565b50506000910152565b6000806040838503121561039a57600080fd5b6103a383610331565b60208401519092506001600160401b03808211156103c057600080fd5b818501915085601f8301126103d457600080fd5b8151818111156103e6576103e661034d565b604051601f8201601f19908116603f0116810190838211818310171561040e5761040e61034d565b8160405282815288602084870101111561042757600080fd5b610438836020830160208801610363565b80955050505050509250929050565b60006020828403121561045957600080fd5b61030182610331565b60008251610474818460208701610363565b9190910192915050565b6080516101276104986000396000601e01526101276000f3fe6080604052600a600c565b005b60186014601a565b60a0565b565b60007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316635c60da1b6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156079573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190609b919060c3565b905090565b3660008037600080366000845af43d6000803e80801560be573d6000f35b3d6000fd5b60006020828403121560d457600080fd5b81516001600160a01b038116811460ea57600080fd5b939250505056fea264697066735822122038063abf0acf0012aa106601a36fadbbf1a7604cc3cbd26cfa83a39a16756e2164736f6c63430008180033608060405234801561001057600080fd5b5060405161043838038061043883398101604081905261002f91610165565b806001600160a01b03811661005f57604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b61006881610079565b50610072826100c9565b5050610198565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b806001600160a01b03163b6000036100ff5760405163211eb15960e21b81526001600160a01b0382166004820152602401610056565b600180546001600160a01b0319166001600160a01b0383169081179091556040517fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b80516001600160a01b038116811461016057600080fd5b919050565b6000806040838503121561017857600080fd5b61018183610149565b915061018f60208401610149565b90509250929050565b610291806101a76000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80633659cfe61461005c5780635c60da1b14610071578063715018a61461009a5780638da5cb5b146100a2578063f2fde38b146100b3575b600080fd5b61006f61006a36600461022b565b6100c6565b005b6001546001600160a01b03165b6040516001600160a01b03909116815260200160405180910390f35b61006f6100da565b6000546001600160a01b031661007e565b61006f6100c136600461022b565b6100ee565b6100ce61012e565b6100d78161015b565b50565b6100e261012e565b6100ec60006101db565b565b6100f661012e565b6001600160a01b03811661012557604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b6100d7816101db565b6000546001600160a01b031633146100ec5760405163118cdaa760e01b815233600482015260240161011c565b806001600160a01b03163b6000036101915760405163211eb15960e21b81526001600160a01b038216600482015260240161011c565b600180546001600160a01b0319166001600160a01b0383169081179091556040517fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60006020828403121561023d57600080fd5b81356001600160a01b038116811461025457600080fd5b939250505056fea2646970667358221220eeabedffb6adf75a8b3caf8311c4d37e5d4870f9fa668c6f192a47f7b16b05cf64736f6c6343000818003302dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b626800a2646970667358221220c40ee2db17edce717d35514e6c9d21e7cff05c28a69a0df1fbaa7d538831e00264736f6c63430008180033";
    static readonly abi: readonly [{
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
        readonly inputs: readonly [];
        readonly name: "DefaultFeeRateError";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "FailedVaultDeployment";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidInitialization";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NotInitializing";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "target";
            readonly type: "string";
        }];
        readonly name: "ZeroAddress";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "newFeeRate";
            readonly type: "uint256";
        }];
        readonly name: "DefaultFeeRateSet";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint64";
            readonly name: "version";
            readonly type: "uint64";
        }];
        readonly name: "Initialized";
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
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "vault";
            readonly type: "address";
        }];
        readonly name: "VaultDeployed";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "newImplementation";
            readonly type: "address";
        }];
        readonly name: "VaultImplementationChanged";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "vaultAddress";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "bool";
            readonly name: "status";
            readonly type: "bool";
        }];
        readonly name: "VaultStatusChanged";
        readonly type: "event";
    }, {
        readonly inputs: readonly [];
        readonly name: "BASE";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
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
            readonly internalType: "uint256";
            readonly name: "_newValue";
            readonly type: "uint256";
        }];
        readonly name: "addedMethodRegistryV2";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "addedVariableRegistryV2";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "defaultFeeRate";
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
            readonly name: "underlyingTokenAddress_";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "masterTokenAddress_";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "ownerAddress_";
            readonly type: "address";
        }, {
            readonly internalType: "string";
            readonly name: "sharesName_";
            readonly type: "string";
        }, {
            readonly internalType: "string";
            readonly name: "sharesSymbol_";
            readonly type: "string";
        }];
        readonly name: "deployVault";
        readonly outputs: readonly [];
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
        readonly inputs: readonly [];
        readonly name: "getVaultImplementationAddress";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getbeaconProxyAddress";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
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
            readonly internalType: "uint256";
            readonly name: "defaultFeeRate_";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "vaultImplementation_";
            readonly type: "address";
        }];
        readonly name: "initialize";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "vaultAddress_";
            readonly type: "address";
        }];
        readonly name: "isVaultActive";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
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
            readonly name: "defaultFeeRate_";
            readonly type: "uint256";
        }];
        readonly name: "setDefaultFeeRate";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "newImplementation_";
            readonly type: "address";
        }];
        readonly name: "setVaultImplementation";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "vaultAddress_";
            readonly type: "address";
        }, {
            readonly internalType: "bool";
            readonly name: "status_";
            readonly type: "bool";
        }];
        readonly name: "setVaultStatus";
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
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "vaults";
            readonly type: "address";
        }];
        readonly name: "validVaults";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "active";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): VaultsRegistryV2Interface;
    static connect(address: string, runner?: ContractRunner | null): VaultsRegistryV2;
}
export {};
//# sourceMappingURL=VaultsRegistryV2__factory.d.ts.map