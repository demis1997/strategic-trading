import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, BigNumberish, AddressLike, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { OracleMock, OracleMockInterface } from "../../../contracts/_mocks/OracleMock";
type OracleMockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class OracleMock__factory extends ContractFactory {
    constructor(...args: OracleMockConstructorParams);
    getDeployTransaction(tokenAddress_: AddressLike, tokenName_: string, tokenPrice_: BigNumberish, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(tokenAddress_: AddressLike, tokenName_: string, tokenPrice_: BigNumberish, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<OracleMock & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): OracleMock__factory;
    static readonly bytecode = "0x60806040523480156200001157600080fd5b5060405162000caa38038062000caa833981016040819052620000349162000165565b62000041600033620000a0565b506001600160a01b0383166000908152600260205260409020620000668382620002f5565b506001600160a01b03909216600081815260026020526040902060019081019390935582546001600160a01b0319161790915550620003c1565b6000828152602081815260408083206001600160a01b038516845290915281205460ff1662000145576000838152602081815260408083206001600160a01b03861684529091529020805460ff19166001179055620000fc3390565b6001600160a01b0316826001600160a01b0316847f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a450600162000149565b5060005b92915050565b634e487b7160e01b600052604160045260246000fd5b6000806000606084860312156200017b57600080fd5b83516001600160a01b03811681146200019357600080fd5b602085810151919450906001600160401b0380821115620001b357600080fd5b818701915087601f830112620001c857600080fd5b815181811115620001dd57620001dd6200014f565b604051601f8201601f19908116603f011681019083821181831017156200020857620002086200014f565b816040528281528a868487010111156200022157600080fd5b600093505b8284101562000245578484018601518185018701529285019262000226565b6000868483010152809750505050505050604084015190509250925092565b600181811c908216806200027957607f821691505b6020821081036200029a57634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620002f0576000816000526020600020601f850160051c81016020861015620002cb5750805b601f850160051c820191505b81811015620002ec57828155600101620002d7565b5050505b505050565b81516001600160401b038111156200031157620003116200014f565b620003298162000322845462000264565b84620002a0565b602080601f831160018114620003615760008415620003485750858301515b600019600386901b1c1916600185901b178555620002ec565b600085815260208120601f198616915b82811015620003925788860151825594840194600190910190840162000371565b5085821015620003b15787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6108d980620003d16000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c806336568abe1161007157806336568abe14610186578063596fdbe11461019957806391d14854146101ac578063a217fddf146101bf578063d547741f146101c7578063feaf968c146101da57600080fd5b806301ffc9a7146100b95780630450cb76146100e157806311eefd5d146100f6578063204120bc14610121578063248a9ca3146101425780632f2ff15d14610173575b600080fd5b6100cc6100c7366004610576565b61021f565b60405190151581526020015b60405180910390f35b6100f46100ef3660046105c3565b610256565b005b600154610109906001600160a01b031681565b6040516001600160a01b0390911681526020016100d8565b61013461012f3660046105c3565b610284565b6040516100d89291906105de565b610165610150366004610633565b60009081526020819052604090206001015490565b6040519081526020016100d8565b6100f461018136600461064c565b610328565b6100f461019436600461064c565b610353565b6100f46101a736600461068e565b61038b565b6100cc6101ba36600461064c565b6103dd565b610165600081565b6100f46101d536600461064c565b610406565b600180546001600160a01b031660009081526002602090815260408083209093015483518381529182015291820181905260608201819052608082015260a0016100d8565b60006001600160e01b03198216637965db0b60e01b148061025057506301ffc9a760e01b6001600160e01b03198316145b92915050565b60006102618161042b565b50600180546001600160a01b0319166001600160a01b0392909216919091179055565b60026020526000908152604090208054819061029f90610759565b80601f01602080910402602001604051908101604052809291908181526020018280546102cb90610759565b80156103185780601f106102ed57610100808354040283529160200191610318565b820191906000526020600020905b8154815290600101906020018083116102fb57829003601f168201915b5050505050908060010154905082565b6000828152602081905260409020600101546103438161042b565b61034d8383610438565b50505050565b6001600160a01b038116331461037c5760405163334bd91960e11b815260040160405180910390fd5b61038682826104ca565b505050565b60006103968161042b565b6001600160a01b03841660009081526002602052604090206103b884826107e3565b50506001600160a01b0390921660009081526002602052604090206001019190915550565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b6000828152602081905260409020600101546104218161042b565b61034d83836104ca565b6104358133610535565b50565b600061044483836103dd565b6104c2576000838152602081815260408083206001600160a01b03861684529091529020805460ff1916600117905561047a3390565b6001600160a01b0316826001600160a01b0316847f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a4506001610250565b506000610250565b60006104d683836103dd565b156104c2576000838152602081815260408083206001600160a01b0386168085529252808320805460ff1916905551339286917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a4506001610250565b61053f82826103dd565b6105725760405163e2517d3f60e01b81526001600160a01b03821660048201526024810183905260440160405180910390fd5b5050565b60006020828403121561058857600080fd5b81356001600160e01b0319811681146105a057600080fd5b9392505050565b80356001600160a01b03811681146105be57600080fd5b919050565b6000602082840312156105d557600080fd5b6105a0826105a7565b604081526000835180604084015260005b8181101561060c57602081870181015160608684010152016105ef565b506000606082850101526060601f19601f8301168401019150508260208301529392505050565b60006020828403121561064557600080fd5b5035919050565b6000806040838503121561065f57600080fd5b8235915061066f602084016105a7565b90509250929050565b634e487b7160e01b600052604160045260246000fd5b6000806000606084860312156106a357600080fd5b6106ac846105a7565b9250602084013567ffffffffffffffff808211156106c957600080fd5b818601915086601f8301126106dd57600080fd5b8135818111156106ef576106ef610678565b604051601f8201601f19908116603f0116810190838211818310171561071757610717610678565b8160405282815289602084870101111561073057600080fd5b826020860160208301376000602084830101528096505050505050604084013590509250925092565b600181811c9082168061076d57607f821691505b60208210810361078d57634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115610386576000816000526020600020601f850160051c810160208610156107bc5750805b601f850160051c820191505b818110156107db578281556001016107c8565b505050505050565b815167ffffffffffffffff8111156107fd576107fd610678565b6108118161080b8454610759565b84610793565b602080601f831160018114610846576000841561082e5750858301515b600019600386901b1c1916600185901b1785556107db565b600085815260208120601f198616915b8281101561087557888601518255948401946001909101908401610856565b50858210156108935787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fea264697066735822122069779fbd8df582aaf1957811c62cc323952c49cba8db244eee353f899c46696b64736f6c63430008180033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "tokenAddress_";
            readonly type: "address";
        }, {
            readonly internalType: "string";
            readonly name: "tokenName_";
            readonly type: "string";
        }, {
            readonly internalType: "int256";
            readonly name: "tokenPrice_";
            readonly type: "int256";
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
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "tokenAddress_";
            readonly type: "address";
        }, {
            readonly internalType: "string";
            readonly name: "tokenName_";
            readonly type: "string";
        }, {
            readonly internalType: "int256";
            readonly name: "tokenPrice_";
            readonly type: "int256";
        }];
        readonly name: "addToken";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "currentTokenAddress";
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
        readonly name: "latestRoundData";
        readonly outputs: readonly [{
            readonly internalType: "uint80";
            readonly name: "roundId";
            readonly type: "uint80";
        }, {
            readonly internalType: "int256";
            readonly name: "answer";
            readonly type: "int256";
        }, {
            readonly internalType: "uint256";
            readonly name: "startedAt";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "updatedAt";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint80";
            readonly name: "answeredInRound";
            readonly type: "uint80";
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
            readonly internalType: "address";
            readonly name: "currentTokenAddress_";
            readonly type: "address";
        }];
        readonly name: "setCurrentTokenAddress";
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
            readonly name: "inputToken";
            readonly type: "address";
        }];
        readonly name: "tokenPrices";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "tokenName";
            readonly type: "string";
        }, {
            readonly internalType: "int256";
            readonly name: "tokenPrice";
            readonly type: "int256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): OracleMockInterface;
    static connect(address: string, runner?: ContractRunner | null): OracleMock;
}
export {};
//# sourceMappingURL=OracleMock__factory.d.ts.map