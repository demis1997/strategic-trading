import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, AddressLike, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { DepositStrategyMock, DepositStrategyMockInterface } from "../../../contracts/_mocks/DepositStrategyMock";
type DepositStrategyMockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class DepositStrategyMock__factory extends ContractFactory {
    constructor(...args: DepositStrategyMockConstructorParams);
    getDeployTransaction(vaultAddress_: AddressLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(vaultAddress_: AddressLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<DepositStrategyMock & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): DepositStrategyMock__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50604051610ab9380380610ab983398101604081905261002f9161010c565b61003a600033610060565b50600180546001600160a01b0319166001600160a01b039290921691909117905561013c565b6000828152602081815260408083206001600160a01b038516845290915281205460ff16610102576000838152602081815260408083206001600160a01b03861684529091529020805460ff191660011790556100ba3390565b6001600160a01b0316826001600160a01b0316847f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a4506001610106565b5060005b92915050565b60006020828403121561011e57600080fd5b81516001600160a01b038116811461013557600080fd5b9392505050565b61096e8061014b6000396000f3fe608060405234801561001057600080fd5b506004361061018e5760003560e01c8063a217fddf116100de578063d547741f11610097578063eb685c4711610071578063eb685c471461035a578063ed79f7121461036d578063f7b5aaae14610373578063fbfa77cf1461037c57600080fd5b8063d547741f1461032c578063d62d660f1461033f578063e2868d331461035257600080fd5b8063a217fddf146102e2578063a701381f146102ea578063a78a0158146102f3578063b40fddad146102fb578063d02641a01461030e578063d24378eb1461032357600080fd5b80634a28ff241161014b57806372cfcaad1161012557806372cfcaad146102aa5780637f4879aa146102bd5780637ff9b596146102c657806391d14854146102cf57600080fd5b80634a28ff2414610252578063642024e41461028457806366cd5dc71461029757600080fd5b806301ffc9a7146101935780631ab1d655146101bb578063248a9ca3146101d05780632f2ff15d1461020157806336568abe1461021457806338d52e0f14610227575b600080fd5b6101a66101a1366004610773565b61038f565b60405190151581526020015b60405180910390f35b6101ce6101c93660046107c0565b6103c6565b005b6101f36101de3660046107ea565b60009081526020819052604090206001015490565b6040519081526020016101b2565b6101ce61020f366004610803565b61041c565b6101ce610222366004610803565b610447565b60045461023a906001600160a01b031681565b6040516001600160a01b0390911681526020016101b2565b61026561026036600461082f565b61047a565b604080516001600160a01b0390931683526020830191909152016101b2565b61026561029236600461086b565b6104a4565b60025461023a906001600160a01b031681565b6101f36102b83660046108b6565b61054b565b6101f360085481565b6101f360065481565b6101a66102dd366004610803565b610561565b6101f3600081565b6101f360055481565b61026561058a565b6101ce6103093660046107ea565b6105b0565b6101f361031c3660046108d9565b5060065490565b6101f360075481565b6101ce61033a366004610803565b6105c1565b6101ce61034d3660046108f4565b6105e6565b6008546101f3565b6101ce6103683660046108f4565b610607565b3061023a565b6101f360035481565b60015461023a906001600160a01b031681565b60006001600160e01b03198216637965db0b60e01b14806103c057506301ffc9a760e01b6001600160e01b03198316145b92915050565b60006103d181610628565b816001036103fb57600280546001600160a01b0385166001600160a01b0319909116179055505050565b600480546001600160a01b0319166001600160a01b0385161790555b505050565b60008281526020819052604090206001015461043781610628565b6104418383610635565b50505050565b6001600160a01b03811633146104705760405163334bd91960e11b815260040160405180910390fd5b61041782826106c7565b6000808061048781610628565b50506004546005546001600160a01b039091169590945092505050565b600080806104b181610628565b6040516323b872dd60e01b81526001600160a01b0388811660048301528781166024830152604482018690528616906323b872dd906064016020604051808303816000875af1158015610508573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061052c9190610916565b50506002546003546001600160a01b0390911697909650945050505050565b60008061055781610628565b5050600854919050565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b6000808061059781610628565b50506002546003546001600160a01b0390911692909150565b60006105bb81610628565b50600855565b6000828152602081905260409020600101546105dc81610628565b61044183836106c7565b60006105f181610628565b81600103610600575050600355565b5050600555565b600061061281610628565b81600103610621575050600655565b5050600755565b6106328133610732565b50565b60006106418383610561565b6106bf576000838152602081815260408083206001600160a01b03861684529091529020805460ff191660011790556106773390565b6001600160a01b0316826001600160a01b0316847f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45060016103c0565b5060006103c0565b60006106d38383610561565b156106bf576000838152602081815260408083206001600160a01b0386168085529252808320805460ff1916905551339286917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45060016103c0565b61073c8282610561565b61076f5760405163e2517d3f60e01b81526001600160a01b03821660048201526024810183905260440160405180910390fd5b5050565b60006020828403121561078557600080fd5b81356001600160e01b03198116811461079d57600080fd5b9392505050565b80356001600160a01b03811681146107bb57600080fd5b919050565b600080604083850312156107d357600080fd5b6107dc836107a4565b946020939093013593505050565b6000602082840312156107fc57600080fd5b5035919050565b6000806040838503121561081657600080fd5b82359150610826602084016107a4565b90509250929050565b60008060006060848603121561084457600080fd5b61084d846107a4565b925061085b602085016107a4565b9150604084013590509250925092565b6000806000806080858703121561088157600080fd5b61088a856107a4565b9350610898602086016107a4565b92506108a6604086016107a4565b9396929550929360600135925050565b6000602082840312156108c857600080fd5b813560ff8116811461079d57600080fd5b6000602082840312156108eb57600080fd5b61079d826107a4565b6000806040838503121561090757600080fd5b50508035926020909101359150565b60006020828403121561092857600080fd5b8151801515811461079d57600080fdfea264697066735822122097090dcdae0d1c70e9cdebdfd66bfa6507a928c5829bc6a3407365afc574262d64736f6c63430008180033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "vaultAddress_";
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
        readonly name: "asset";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "assetPrice";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
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
        readonly inputs: readonly [];
        readonly name: "deployedAssetsValue";
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
            readonly name: "vaultAddress_";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "vaultStrategy_";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "asset_";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount_";
            readonly type: "uint256";
        }];
        readonly name: "executeDeploymentStrategy";
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
        readonly inputs: readonly [];
        readonly name: "executeHarvest";
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
        readonly name: "executeWithdrawStrategy";
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
        readonly inputs: readonly [];
        readonly name: "getDeployedAssetsValue";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getFirstDepositAdapter";
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
        readonly name: "liquidToken";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "liquidTokenAmount";
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
            readonly name: "value_";
            readonly type: "uint256";
        }];
        readonly name: "setDeployedAssetsValue";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "tokenAddress_";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "target_";
            readonly type: "uint256";
        }];
        readonly name: "setTokenAddress";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amount_";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "target_";
            readonly type: "uint256";
        }];
        readonly name: "setTokenAmounts";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "tokenPrice_";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "target_";
            readonly type: "uint256";
        }];
        readonly name: "setTokenPrice";
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
        readonly name: "tokenPrice";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint8";
            readonly name: "";
            readonly type: "uint8";
        }];
        readonly name: "updateDeployedAssetVaule";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "vault";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): DepositStrategyMockInterface;
    static connect(address: string, runner?: ContractRunner | null): DepositStrategyMock;
}
export {};
//# sourceMappingURL=DepositStrategyMock__factory.d.ts.map