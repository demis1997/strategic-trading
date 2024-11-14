"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniformTransferStrategy__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "AccessControlBadConfirmation",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "neededRole",
                type: "bytes32",
            },
        ],
        name: "AccessControlUnauthorizedAccount",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "fromBalance",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "InsufficentSharesPerValut",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidInitialization",
        type: "error",
    },
    {
        inputs: [],
        name: "NotInitializing",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "target",
                type: "string",
            },
        ],
        name: "ZeroAddress",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "newAggregatorToken",
                type: "address",
            },
        ],
        name: "AggregatorTokenSet",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint64",
                name: "version",
                type: "uint64",
            },
        ],
        name: "Initialized",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "previousAdminRole",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "newAdminRole",
                type: "bytes32",
            },
        ],
        name: "RoleAdminChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "RoleGranted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "RoleRevoked",
        type: "event",
    },
    {
        inputs: [],
        name: "DEFAULT_ADMIN_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "LYSADMIN_MANAGER_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "SCALING_FACTOR",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "TRANSFERS_MANAGER_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from_",
                type: "address",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "shares_",
                type: "uint256",
            },
        ],
        name: "executePartialTransferStrategy",
        outputs: [
            {
                internalType: "address[]",
                name: "",
                type: "address[]",
            },
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
        ],
        name: "getRoleAdmin",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "grantRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "hasRole",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "aggregatorToken_",
                type: "address",
            },
            {
                internalType: "address",
                name: "ownerAddress_",
                type: "address",
            },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "callerConfirmation",
                type: "address",
            },
        ],
        name: "renounceRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "revokeRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "aggregatorToken_",
                type: "address",
            },
        ],
        name: "setAggregatorTokenAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b50610e59806100206000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c806391d148541161008c578063c92f6aef11610066578063c92f6aef146101bb578063d547741f146101e2578063ddffe67d146101f5578063ef4cadc51461020857600080fd5b806391d148541461017957806396907fce1461018c578063a217fddf146101b357600080fd5b806301ffc9a7146100d457806313e65a95146100fc578063248a9ca31461011d5780632f2ff15d1461013e57806336568abe14610153578063485cc95514610166575b600080fd5b6100e76100e2366004610a00565b61021b565b60405190151581526020015b60405180910390f35b61010f61010a366004610a46565b610252565b6040516100f3929190610a87565b61013061012b366004610b0b565b6104f4565b6040519081526020016100f3565b61015161014c366004610b24565b610516565b005b610151610161366004610b24565b610538565b610151610174366004610b54565b610570565b6100e7610187366004610b24565b610752565b6101307f2ff7e0ecadc3de46f2c240904f290a3c26562b4f0e9b5e3b2dfacabf65dcfd3881565b610130600081565b6101307f97ddbaf00fe0302cd886e6ef0169e3547b3909cb96632300921a94542750300281565b6101516101f0366004610b24565b61078a565b610151610203366004610b82565b6107a6565b6101306b033b2e3c9fd0803ce800000081565b60006001600160e01b03198216637965db0b60e01b148061024c57506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060807f97ddbaf00fe0302cd886e6ef0169e3547b3909cb96632300921a94542750300261027f81610819565b600080546040516370a0823160e01b81526001600160a01b038981166004830152909116906370a0823190602401602060405180830381865afa1580156102ca573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102ee9190610b9f565b6103046b033b2e3c9fd0803ce800000087610bb8565b61030e9190610bdd565b600080546040516339c94d5b60e01b81526001600160a01b038b81166004830152939450919283929116906339c94d5b90602401600060405180830381865afa15801561035f573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526103879190810190610cd9565b915091506000825167ffffffffffffffff8111156103a7576103a7610bff565b6040519080825280602002602001820160405280156103d0578160200160208202803683370190505b50905060005b83518110156104e35760008482815181106103f3576103f3610d9e565b60200260200101519050600084838151811061041157610411610d9e565b602002602001015190508060000361045a576040516337b4f30760e11b81526001600160a01b038e16600482015260248101829052604481018290526064015b60405180910390fd5b60006b033b2e3c9fd0803ce80000006104738984610bb8565b61047d9190610bdd565b905080156104d8578085858151811061049857610498610d9e565b602002602001018181525050828785815181106104b7576104b7610d9e565b60200260200101906001600160a01b031690816001600160a01b0316815250505b5050506001016103d6565b509199919850909650505050505050565b6000908152600080516020610e04833981519152602052604090206001015490565b61051f826104f4565b61052881610819565b6105328383610826565b50505050565b6001600160a01b03811633146105615760405163334bd91960e11b815260040160405180910390fd5b61056b82826108cb565b505050565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a008054600160401b810460ff16159067ffffffffffffffff166000811580156105b65750825b905060008267ffffffffffffffff1660011480156105d35750303b155b9050811580156105e1575080155b156105ff5760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff19166001178555831561062957845460ff60401b1916600160401b1785555b61065b876040518060400160405280601081526020016f61676772656761746f72546f6b656e5f60801b815250610947565b61068a866040518060400160405280600d81526020016c6f776e6572416464726573735f60981b815250610947565b610692610974565b6106bc7f97ddbaf00fe0302cd886e6ef0169e3547b3909cb96632300921a94542750300288610826565b506106e77f2ff7e0ecadc3de46f2c240904f290a3c26562b4f0e9b5e3b2dfacabf65dcfd3887610826565b50600080546001600160a01b0319166001600160a01b038916179055831561074957845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b50505050505050565b6000918252600080516020610e04833981519152602090815260408084206001600160a01b0393909316845291905290205460ff1690565b610793826104f4565b61079c81610819565b61053283836108cb565b7f2ff7e0ecadc3de46f2c240904f290a3c26562b4f0e9b5e3b2dfacabf65dcfd386107d081610819565b600080546001600160a01b0319166001600160a01b038416908117825560405190917f6160295b8568f875d02aaba849bc06011b49525ca423dad5ad5482000300eeef91a25050565b610823813361097e565b50565b6000600080516020610e048339815191526108418484610752565b6108c1576000848152602082815260408083206001600160a01b03871684529091529020805460ff191660011790556108773390565b6001600160a01b0316836001600160a01b0316857f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a4600191505061024c565b600091505061024c565b6000600080516020610e048339815191526108e68484610752565b156108c1576000848152602082815260408083206001600160a01b0387168085529252808320805460ff1916905551339287917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a4600191505061024c565b6001600160a01b038216610970578060405163eac0d38960e01b81526004016104519190610db4565b5050565b61097c6109b7565b565b6109888282610752565b6109705760405163e2517d3f60e01b81526001600160a01b038216600482015260248101839052604401610451565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0054600160401b900460ff1661097c57604051631afcd79f60e31b815260040160405180910390fd5b600060208284031215610a1257600080fd5b81356001600160e01b031981168114610a2a57600080fd5b9392505050565b6001600160a01b038116811461082357600080fd5b600080600060608486031215610a5b57600080fd5b8335610a6681610a31565b92506020840135610a7681610a31565b929592945050506040919091013590565b604080825283519082018190526000906020906060840190828701845b82811015610ac95781516001600160a01b031684529284019290840190600101610aa4565b5050508381038285015284518082528583019183019060005b81811015610afe57835183529284019291840191600101610ae2565b5090979650505050505050565b600060208284031215610b1d57600080fd5b5035919050565b60008060408385031215610b3757600080fd5b823591506020830135610b4981610a31565b809150509250929050565b60008060408385031215610b6757600080fd5b8235610b7281610a31565b91506020830135610b4981610a31565b600060208284031215610b9457600080fd5b8135610a2a81610a31565b600060208284031215610bb157600080fd5b5051919050565b808202811582820484141761024c57634e487b7160e01b600052601160045260246000fd5b600082610bfa57634e487b7160e01b600052601260045260246000fd5b500490565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610c3e57610c3e610bff565b604052919050565b600067ffffffffffffffff821115610c6057610c60610bff565b5060051b60200190565b600082601f830112610c7b57600080fd5b81516020610c90610c8b83610c46565b610c15565b8083825260208201915060208460051b870101935086841115610cb257600080fd5b602086015b84811015610cce5780518352918301918301610cb7565b509695505050505050565b60008060408385031215610cec57600080fd5b825167ffffffffffffffff80821115610d0457600080fd5b818501915085601f830112610d1857600080fd5b81516020610d28610c8b83610c46565b82815260059290921b84018101918181019089841115610d4757600080fd5b948201945b83861015610d6e578551610d5f81610a31565b82529482019490820190610d4c565b91880151919650909350505080821115610d8757600080fd5b50610d9485828601610c6a565b9150509250929050565b634e487b7160e01b600052603260045260246000fd5b60006020808352835180602085015260005b81811015610de257858101830151858201604001528201610dc6565b506000604082860101526040601f19601f830116850101925050509291505056fe02dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b626800a264697066735822122027c9d1b16cdc6e19d2b3b3c11fc142dd3a942a7a83a04123dd65e76e90577b8164736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class UniformTransferStrategy__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    connect(runner) {
        return super.connect(runner);
    }
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.UniformTransferStrategy__factory = UniformTransferStrategy__factory;
UniformTransferStrategy__factory.bytecode = _bytecode;
UniformTransferStrategy__factory.abi = _abi;
//# sourceMappingURL=UniformTransferStrategy__factory.js.map