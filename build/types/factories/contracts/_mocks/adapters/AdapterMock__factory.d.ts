import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { AdapterMock, AdapterMockInterface } from "../../../../contracts/_mocks/adapters/AdapterMock";
type AdapterMockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class AdapterMock__factory extends ContractFactory {
    constructor(...args: AdapterMockConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<AdapterMock & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): AdapterMock__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5061117f806100206000396000f3fe6080604052600436106101395760003560e01c806391d14854116100ab578063d02641a01161006f578063d02641a01461038f578063d16352af146103af578063d547741f146103cd578063f0cb22fc146103ed578063f0fa55a914610408578063fc9cee3c1461042857600080fd5b806391d14854146102fa578063970de3811461031a5780639ce4faab1461033a578063a217fddf1461035a578063c4d66de81461036f57600080fd5b806336568abe116100fd57806336568abe146102245780633e032a3b146102445780635354c2b11461025a57806358e47004146102995780636a39fe60146102b95780638e17527c146102d957600080fd5b806301ffc9a7146101455780630676c1b71461017a5780631bacfd0b146101b2578063248a9ca3146101e25780632f2ff15d1461020257600080fd5b3661014057005b600080fd5b34801561015157600080fd5b50610165610160366004610da0565b61043d565b60405190151581526020015b60405180910390f35b34801561018657600080fd5b5060015461019a906001600160a01b031681565b6040516001600160a01b039091168152602001610171565b3480156101be57600080fd5b506101d460008051602061112a83398151915281565b604051908152602001610171565b3480156101ee57600080fd5b506101d46101fd366004610dd1565b610474565b34801561020e57600080fd5b5061022261021d366004610dff565b610496565b005b34801561023057600080fd5b5061022261023f366004610dff565b6104b8565b34801561025057600080fd5b506101d460005481565b34801561026657600080fd5b5061027a610275366004610e3d565b6104f0565b604080516001600160a01b039093168352602083019190915201610171565b3480156102a557600080fd5b506102226102b4366004610ea5565b61070a565b3480156102c557600080fd5b5061027a6102d4366004610f65565b610738565b3480156102e557600080fd5b5060015461016590600160a01b900460ff1681565b34801561030657600080fd5b50610165610315366004610dff565b6108f3565b34801561032657600080fd5b5061027a610335366004611000565b61092b565b34801561034657600080fd5b5061022261035536600461102e565b6109e2565b34801561036657600080fd5b506101d4600081565b34801561037b57600080fd5b5061022261038a366004610ea5565b610a0c565b34801561039b57600080fd5b506101d46103aa366004610ea5565b610b46565b3480156103bb57600080fd5b506001546001600160a01b031661019a565b3480156103d957600080fd5b506102226103e8366004610dff565b610bb5565b3480156103f957600080fd5b506101d461014036600461104b565b34801561041457600080fd5b50610222610423366004610dd1565b610bd1565b34801561043457600080fd5b506000546101d4565b60006001600160e01b03198216637965db0b60e01b148061046e57506301ffc9a760e01b6001600160e01b03198316145b92915050565b600090815260008051602061110a833981519152602052604090206001015490565b61049f82610474565b6104a881610be2565b6104b28383610bef565b50505050565b6001600160a01b03811633146104e15760405163334bd91960e11b815260040160405180910390fd5b6104eb8282610c94565b505050565b60008060008051602061112a83398151915261050b81610be2565b6040516323b872dd60e01b81526001600160a01b038981166004830152306024830152604482018790528716906323b872dd906064016020604051808303816000875af1158015610560573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105849190611090565b5060015460405163095ea7b360e01b81526001600160a01b039182166004820152602481018790529087169063095ea7b3906044016020604051808303816000875af11580156105d8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105fc9190611090565b506001546040516307ec49ad60e01b81523060048201526001600160a01b03898116602483015288811660448301526064820188905260009283928392909116906307ec49ad906084016060604051808303816000875af1158015610665573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061068991906110ad565b925092509250826106e15760405162461bcd60e51b815260206004820152601860248201527f5472616e73666572546f50726f746f636f6c4661696c6564000000000000000060448201526064015b60405180910390fd5b600154600160a01b900460ff166106f857816106fa565b305b9b909a5098505050505050505050565b600061071581610be2565b50600180546001600160a01b0319166001600160a01b0392909216919091179055565b60008060008051602061112a83398151915261075381610be2565b6040516323b872dd60e01b81526001600160a01b038b81166004830152306024830152604482018790528716906323b872dd906064016020604051808303816000875af11580156107a8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107cc9190611090565b5060015460405163095ea7b360e01b81526001600160a01b039182166004820152602481018790529087169063095ea7b3906044016020604051808303816000875af1158015610820573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108449190611090565b5060015460405163f8ff09df60e01b81523060048201526001600160a01b038b81166024830152888116604483015260648201889052600092839283929091169063f8ff09df906084016060604051808303816000875af11580156108ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108d191906110ad565b925092509250826108e157600080fd5b909c909b509950505050505050505050565b600091825260008051602061110a833981519152602090815260408084206001600160a01b0393909316845291905290205460ff1690565b60008060008051602061112a83398151915261094681610be2565b6001546040516310e059a160e11b81526001600160a01b038781166004830152868116602483015260009283928392909116906321c0b342906044016060604051808303816000875af11580156109a1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109c591906110ad565b925092509250826109d557600080fd5b9097909650945050505050565b60006109ed81610be2565b5060018054911515600160a01b0260ff60a01b19909216919091179055565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a008054600160401b810460ff16159067ffffffffffffffff16600081158015610a525750825b905060008267ffffffffffffffff166001148015610a6f5750303b155b905081158015610a7d575080155b15610a9b5760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff191660011785558315610ac557845460ff60401b1916600160401b1785555b610acd610d10565b610ad8600033610bef565b50600180546001600160a01b0319166001600160a01b038816179055600080558315610b3e57845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b505050505050565b600154604051630681320d60e51b81526001600160a01b038381166004830152600092169063d02641a090602401602060405180830381865afa158015610b91573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061046e91906110f0565b610bbe82610474565b610bc781610be2565b6104b28383610c94565b6000610bdc81610be2565b50600055565b610bec8133610d1a565b50565b600060008051602061110a833981519152610c0a84846108f3565b610c8a576000848152602082815260408083206001600160a01b03871684529091529020805460ff19166001179055610c403390565b6001600160a01b0316836001600160a01b0316857f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a4600191505061046e565b600091505061046e565b600060008051602061110a833981519152610caf84846108f3565b15610c8a576000848152602082815260408083206001600160a01b0387168085529252808320805460ff1916905551339287917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a4600191505061046e565b610d18610d57565b565b610d2482826108f3565b610d535760405163e2517d3f60e01b81526001600160a01b0382166004820152602481018390526044016106d8565b5050565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0054600160401b900460ff16610d1857604051631afcd79f60e31b815260040160405180910390fd5b600060208284031215610db257600080fd5b81356001600160e01b031981168114610dca57600080fd5b9392505050565b600060208284031215610de357600080fd5b5035919050565b6001600160a01b0381168114610bec57600080fd5b60008060408385031215610e1257600080fd5b823591506020830135610e2481610dea565b809150509250929050565b8015158114610bec57600080fd5b600080600080600060a08688031215610e5557600080fd5b8535610e6081610dea565b94506020860135610e7081610dea565b93506040860135610e8081610dea565b9250606086013591506080860135610e9781610e2f565b809150509295509295909350565b600060208284031215610eb757600080fd5b8135610dca81610dea565b634e487b7160e01b600052604160045260246000fd5b600082601f830112610ee957600080fd5b813567ffffffffffffffff80821115610f0457610f04610ec2565b604051601f8301601f19908116603f01168101908282118183101715610f2c57610f2c610ec2565b81604052838152866020858801011115610f4557600080fd5b836020870160208301376000602085830101528094505050505092915050565b600080600080600080600060e0888a031215610f8057600080fd5b8735610f8b81610dea565b96506020880135610f9b81610dea565b95506040880135610fab81610dea565b9450606088013593506080880135610fc281610dea565b925060a0880135915060c088013567ffffffffffffffff811115610fe557600080fd5b610ff18a828b01610ed8565b91505092959891949750929550565b6000806040838503121561101357600080fd5b823561101e81610dea565b91506020830135610e2481610dea565b60006020828403121561104057600080fd5b8135610dca81610e2f565b6000806040838503121561105e57600080fd5b823567ffffffffffffffff81111561107557600080fd5b61108185828601610ed8565b95602094909401359450505050565b6000602082840312156110a257600080fd5b8151610dca81610e2f565b6000806000606084860312156110c257600080fd5b83516110cd81610e2f565b60208501519093506110de81610dea565b80925050604084015190509250925092565b60006020828403121561110257600080fd5b505191905056fe02dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b6268004fe08aea4652d25d7d2c09148537810c0b7e49021cc60dd467483872e4452ff5a26469706673582212203675c8442131d6d075be2af2f25c7075105e9d3f09fc4927e0075e4cb9de7bea64736f6c63430008180033";
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
        readonly name: "InvalidInitialization";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NotInitializing";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "OnlyWETHAllowed";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "required";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "actual";
            readonly type: "uint256";
        }];
        readonly name: "SlippageExceededOnDeposit";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "required";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "actual";
            readonly type: "uint256";
        }];
        readonly name: "SlippageExceededOnWithdrawal";
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
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "target";
            readonly type: "string";
        }];
        readonly name: "ZeroAmount";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "string";
            readonly name: "which";
            readonly type: "string";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "newAddress";
            readonly type: "address";
        }];
        readonly name: "AddressUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "tokenAmount";
            readonly type: "uint256";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "liquidTkn";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "liquidTknAmount";
            readonly type: "uint256";
        }];
        readonly name: "DepositedOnProtocol";
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
            readonly internalType: "uint256";
            readonly name: "newSlippage";
            readonly type: "uint256";
        }];
        readonly name: "SlippageUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "caller_";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "receiver_";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "liquidTokenAddress_";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "amountSpent";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "asset_";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "assetsAmount_";
            readonly type: "uint256";
        }];
        readonly name: "WithdrawFromProtocol";
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
        readonly name: "VAULT_STRATEGY_ROLE";
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
            readonly name: "account_";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "receiver_";
            readonly type: "address";
        }];
        readonly name: "claimEarnings";
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
            readonly name: "sender_";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "receiver_";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "token_";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "tokenAmount_";
            readonly type: "uint256";
        }, {
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly name: "deposit";
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
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }, {
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly name: "getAmountInForexactOutput";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getProtocol";
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
        readonly name: "getSlippage";
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
            readonly name: "token_";
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
            readonly internalType: "address";
            readonly name: "protocolAddress_";
            readonly type: "address";
        }];
        readonly name: "initialize";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "protocolAddress";
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
            readonly name: "callerConfirmation";
            readonly type: "address";
        }];
        readonly name: "renounceRole";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "returnWrongAddress";
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
            readonly name: "protocolAddress_";
            readonly type: "address";
        }];
        readonly name: "setProtocolAddress";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bool";
            readonly name: "value_";
            readonly type: "bool";
        }];
        readonly name: "setReturnWrongAddress";
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
        readonly inputs: readonly [];
        readonly name: "slippage";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
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
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "liquidAsset_";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "liquidAssetsAmount_";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly name: "withdraw";
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
        readonly stateMutability: "payable";
        readonly type: "receive";
    }];
    static createInterface(): AdapterMockInterface;
    static connect(address: string, runner?: ContractRunner | null): AdapterMock;
}
export {};
//# sourceMappingURL=AdapterMock__factory.d.ts.map