"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenzoAdapter__factory = void 0;
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
                name: "target",
                type: "address",
            },
        ],
        name: "AddressEmptyCode",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "AddressInsufficientBalance",
        type: "error",
    },
    {
        inputs: [],
        name: "EnforcedPause",
        type: "error",
    },
    {
        inputs: [],
        name: "ExpectedPause",
        type: "error",
    },
    {
        inputs: [],
        name: "FailedInnerCall",
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
        inputs: [],
        name: "OnlyWETHAllowed",
        type: "error",
    },
    {
        inputs: [],
        name: "ReentrancyGuardReentrantCall",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
        ],
        name: "SafeERC20FailedOperation",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "required",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "actual",
                type: "uint256",
            },
        ],
        name: "SlippageExceededOnDeposit",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "required",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "actual",
                type: "uint256",
            },
        ],
        name: "SlippageExceededOnWithdrawal",
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
        inputs: [
            {
                internalType: "string",
                name: "target",
                type: "string",
            },
        ],
        name: "ZeroAmount",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "string",
                name: "which",
                type: "string",
            },
            {
                indexed: false,
                internalType: "address",
                name: "newAddress",
                type: "address",
            },
        ],
        name: "AddressUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "token",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "tokenAmount",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "liquidTkn",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "liquidTknAmount",
                type: "uint256",
            },
        ],
        name: "DepositedOnProtocol",
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
                indexed: false,
                internalType: "string",
                name: "info",
                type: "string",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "LogDebugInfo",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "Paused",
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
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "newSlippage",
                type: "uint256",
            },
        ],
        name: "SlippageUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "Unpaused",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "caller_",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "receiver_",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "liquidTokenAddress_",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amountSpent",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "asset_",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "assetsAmount_",
                type: "uint256",
            },
        ],
        name: "WithdrawFromProtocol",
        type: "event",
    },
    {
        stateMutability: "payable",
        type: "fallback",
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
        name: "REVERT_MSG",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "VAULT_STRATEGY_ROLE",
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
                name: "",
                type: "address",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "claimEarnings",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sender_",
                type: "address",
            },
            {
                internalType: "address",
                name: "receiver_",
                type: "address",
            },
            {
                internalType: "address",
                name: "token_",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenAmount_",
                type: "uint256",
            },
            {
                internalType: "bool",
                name: "wrapToken_",
                type: "bool",
            },
        ],
        name: "deposit",
        outputs: [
            {
                internalType: "address",
                name: "liquidTkn",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "liquidTknAmount",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "ezETHAddress",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getProtocol",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
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
        inputs: [],
        name: "getSlippage",
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
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "getTokenPrice",
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
                name: "liquifierAddress_",
                type: "address",
            },
            {
                internalType: "address",
                name: "ezETHAddress_",
                type: "address",
            },
            {
                internalType: "address",
                name: "stETHAddress_",
                type: "address",
            },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "liquifierAddress",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "pause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "paused",
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
        inputs: [],
        name: "protocolName",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
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
                name: "liquifierAddress_",
                type: "address",
            },
        ],
        name: "setLiquifierAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "slippage_",
                type: "uint256",
            },
        ],
        name: "setSlippage",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "wethAddress_",
                type: "address",
            },
        ],
        name: "setWETHAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "slippage",
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
        name: "stETHAddress",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
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
    {
        inputs: [],
        name: "unpause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "wethAddress",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "withdraw",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        stateMutability: "payable",
        type: "receive",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b50611e8d806100206000396000f3fe6080604052600436106101a35760003560e01c80638456cb59116100e0578063c0c53b8b11610084578063d547741f11610061578063d547741f1461051f578063e567e8691461053f578063f0fa55a914610554578063fc9cee3c1461057457005b8063c0c53b8b146104c1578063d02641a0146104e1578063d16352af1461050157005b8063a117d59b116100bd578063a117d59b1461044c578063a217fddf1461046c578063ada50c9b14610481578063bcaa0a5b146104a157005b80638456cb59146103f757806391d148541461040c578063970de3811461042c57005b80634f0e0ef3116101475780636a39fe60116101245780636a39fe601461034a5780636a4234eb1461036a5780637160ad991461038a5780637e531a39146103aa57005b80634f0e0ef3146102ae5780635354c2b1146102e65780635c975abb1461032557005b80632f2ff15d116101805780632f2ff15d1461024357806336568abe146102635780633e032a3b146102835780633f4ba83a1461029957005b806301ffc9a7146101ac5780631bacfd0b146101e1578063248a9ca31461022357005b366101aa57005b005b3480156101b857600080fd5b506101cc6101c7366004611a12565b610589565b60405190151581526020015b60405180910390f35b3480156101ed57600080fd5b506102157f4fe08aea4652d25d7d2c09148537810c0b7e49021cc60dd467483872e4452ff581565b6040519081526020016101d8565b34801561022f57600080fd5b5061021561023e366004611a3c565b6105c0565b34801561024f57600080fd5b506101aa61025e366004611a71565b6105e2565b34801561026f57600080fd5b506101aa61027e366004611a71565b610604565b34801561028f57600080fd5b5061021560015481565b3480156102a557600080fd5b506101aa61063c565b3480156102ba57600080fd5b506000546102ce906001600160a01b031681565b6040516001600160a01b0390911681526020016101d8565b3480156102f257600080fd5b50610306610301366004611aab565b610652565b604080516001600160a01b0390931683526020830191909152016101d8565b34801561033157600080fd5b50600080516020611e388339815191525460ff166101cc565b34801561035657600080fd5b50610306610365366004611b23565b610e52565b34801561037657600080fd5b506101aa610385366004611c2a565b610e9f565b34801561039657600080fd5b506004546102ce906001600160a01b031681565b3480156103b657600080fd5b506103ea60405180604001604052806014815260200173119d5b98dd1a5bdb881b9bdd08185b1b1bddd95960621b81525081565b6040516101d89190611c69565b34801561040357600080fd5b506101aa610f55565b34801561041857600080fd5b506101cc610427366004611a71565b610f68565b34801561043857600080fd5b50610306610447366004611c9c565b610fa0565b34801561045857600080fd5b506101aa610467366004611c2a565b610fed565b34801561047857600080fd5b50610215600081565b34801561048d57600080fd5b506005546102ce906001600160a01b031681565b3480156104ad57600080fd5b506003546102ce906001600160a01b031681565b3480156104cd57600080fd5b506101aa6104dc366004611cc6565b6110ae565b3480156104ed57600080fd5b506102156104fc366004611c2a565b6112b2565b34801561050d57600080fd5b506003546001600160a01b03166102ce565b34801561052b57600080fd5b506101aa61053a366004611a71565b6112fd565b34801561054b57600080fd5b506103ea611319565b34801561056057600080fd5b506101aa61056f366004611a3c565b6113a7565b34801561058057600080fd5b50600154610215565b60006001600160e01b03198216637965db0b60e01b14806105ba57506301ffc9a760e01b6001600160e01b03198316145b92915050565b6000908152600080516020611e18833981519152602052604090206001015490565b6105eb826105c0565b6105f481611416565b6105fe8383611420565b50505050565b6001600160a01b038116331461062d5760405163334bd91960e11b815260040160405180910390fd5b61063782826114c5565b505050565b600061064781611416565b61064f611541565b50565b60008061065d6115a1565b6106656115d4565b7f4fe08aea4652d25d7d2c09148537810c0b7e49021cc60dd467483872e4452ff561068f81611416565b6106b8886040518060400160405280600781526020016673656e6465725f60c81b81525061161e565b6106e3876040518060400160405280600981526020016872656365697665725f60b81b81525061161e565b61070b8660405180604001604052806006815260200165746f6b656e5f60d01b81525061161e565b610739856040518060400160405280600c81526020016b746f6b656e416d6f756e745f60a01b81525061164b565b604080518181526010818301526f14dd185c9d1a5b99c811195c1bdcda5d60821b6060820152600060208201529051600080516020611df88339815191529181900360800190a160408051818152600e818301526d53656e646572204164647265737360901b60608201526001600160a01b038a1660208201529051600080516020611df88339815191529181900360800190a1604080518181526010818301526f5265636569766572204164647265737360801b60608201526001600160a01b03891660208201529051600080516020611df88339815191529181900360800190a160408051818152600d818301526c546f6b656e204164647265737360981b60608201526001600160a01b03881660208201529051600080516020611df88339815191529181900360800190a160408051818152600c818301526b151bdad95b88105b5bdd5b9d60a21b6060820152602081018790529051600080516020611df88339815191529181900360800190a16040516370a0823160e01b81523060048201526000906001600160a01b038816906370a0823190602401602060405180830381865afa1580156108f2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109169190611d09565b604051636eb1769f60e11b81526001600160a01b038b8116600483015230602483015291925060009189169063dd62ed3e90604401602060405180830381865afa158015610968573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061098c9190611d09565b9050600080516020611df8833981519152826040516109e5919060408082526018908201527f496e697469616c20436f6e74726163742042616c616e636500000000000000006060820152602081019190915260800190565b60405180910390a1604080518181526010818301526f53656e64657220416c6c6f77616e636560801b6060820152602081018390529051600080516020611df88339815191529181900360800190a1610a496001600160a01b0389168b308a61166e565b60035460405163095ea7b360e01b81526001600160a01b039182166004820152602481018990529089169063095ea7b3906044016020604051808303816000875af1158015610a9c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ac09190611d22565b506040516370a0823160e01b81523060048201526000906001600160a01b038a16906370a0823190602401602060405180830381865afa158015610b08573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b2c9190611d09565b9050600080516020611df883398151915281604051610b8591906040808252601e908201527f506f73742d5472616e7366657220436f6e74726163742042616c616e636500006060820152602081019190915260800190565b60405180910390a16000670de0b6b3a7640000600154670de0b6b3a7640000610bae9190611d55565b610bb8908b611d68565b610bc29190611d7f565b600354604051632dbc21bd60e21b81526001600160a01b038d81166004830152602482018d90526000604483018190529394509091169063b6f086f4906064016020604051808303816000875af1158015610c21573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c459190611d09565b9050600080516020611df883398151915281604051610c969190604080825260159082015274149958d95a5d995908195e91551208105b5bdd5b9d605a1b6060820152602081019190915260800190565b60405180910390a181811015610cce5760405163c60d402760e01b815260048101839052602481018290526044015b60405180910390fd5b600480546040516370a0823160e01b815230928101929092526001600160a01b0390811699509197508791600091908d16906370a0823190602401602060405180830381865afa158015610d26573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d4a9190611d09565b9050600080516020611df883398151915281604051610d9c919060408082526016908201527546696e616c20436f6e74726163742042616c616e636560501b6060820152602081019190915260800190565b60405180910390a1610db86001600160a01b038a168e8a6116d5565b886001600160a01b03168c6001600160a01b03168f6001600160a01b03167f044d4bbddd3af59e620636cb231e96ccd6acfbac6aa9a369ea17075cc839daee8e8c604051610e10929190918252602082015260400190565b60405180910390a450505050505050610e4860017f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f0055565b9550959350505050565b60405162461bcd60e51b815260206004820152601860248201527f7769746864726177206e6f7420696d706c656d656e746564000000000000000060448201526000908190606401610cc5565b6000610eaa81611416565b610ed8826040518060400160405280600c81526020016b77657468416464726573735f60a01b81525061161e565b6040516a776574684164647265737360a81b8152600b016040519081900381206001600160a01b0384168252907f943e9d45a11aaae5d87503e3bc248665d9807856e5cf2bdb4a988bee444227819060200160405180910390a250600080546001600160a01b0319166001600160a01b0392909216919091179055565b6000610f6081611416565b61064f61172c565b6000918252600080516020611e18833981519152602090815260408084206001600160a01b0393909316845291905290205460ff1690565b60405162461bcd60e51b815260206004820152601d60248201527f636c61696d4561726e696e6773206e6f7420696d706c656d656e74656400000060448201526000908190606401610cc5565b6000610ff881611416565b61102b82604051806040016040528060118152602001706c6971756966696572416464726573735f60781b81525061161e565b604051706c6971756966696572416464726573735f60781b81526011016040519081900381206001600160a01b0384168252907f943e9d45a11aaae5d87503e3bc248665d9807856e5cf2bdb4a988bee444227819060200160405180910390a250600380546001600160a01b0319166001600160a01b0392909216919091179055565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a008054600160401b810460ff16159067ffffffffffffffff166000811580156110f45750825b905060008267ffffffffffffffff1660011480156111115750303b155b90508115801561111f575080155b1561113d5760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff19166001178555831561116757845460ff60401b1916600160401b1785555b61119a88604051806040016040528060118152602001706c6971756966696572416464726573735f60781b81525061161e565b6111c8876040518060400160405280600c81526020016b657a4554484164647265737360a01b81525061161e565b6111f6866040518060400160405280600c81526020016b73744554484164647265737360a01b81525061161e565b6111fe611775565b61120661177d565b61120e61178d565b611219600033611420565b50600380546001600160a01b03808b166001600160a01b031992831617909255600480548a84169083161790556005805492891692909116919091179055668e1bc9bf04000060015583156112a857845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b5050505050505050565b60405162461bcd60e51b815260206004820152601d60248201527f676574546f6b656e5072696365206e6f7420696d706c656d656e7465640000006044820152600090606401610cc5565b611306826105c0565b61130f81611416565b6105fe83836114c5565b6002805461132690611da1565b80601f016020809104026020016040519081016040528092919081815260200182805461135290611da1565b801561139f5780601f106113745761010080835404028352916020019161139f565b820191906000526020600020905b81548152906001019060200180831161138257829003601f168201915b505050505081565b60006113b281611416565b6113dd8260405180604001604052806009815260200168736c6970706167655f60b81b81525061164b565b6040518281527ff5a802650e0a86db227cc342f06327d2ca0ff5cf2b12e0084fc5d8a7db2c54fd9060200160405180910390a150600155565b61064f813361179d565b6000600080516020611e1883398151915261143b8484610f68565b6114bb576000848152602082815260408083206001600160a01b03871684529091529020805460ff191660011790556114713390565b6001600160a01b0316836001600160a01b0316857f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a460019150506105ba565b60009150506105ba565b6000600080516020611e188339815191526114e08484610f68565b156114bb576000848152602082815260408083206001600160a01b0387168085529252808320805460ff1916905551339287917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a460019150506105ba565b6115496117d6565b600080516020611e38833981519152805460ff191681557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a150565b600080516020611e388339815191525460ff16156115d25760405163d93c066560e01b815260040160405180910390fd5b565b7f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f0080546001190161161857604051633ee5aeb560e01b815260040160405180910390fd5b60029055565b6001600160a01b038216611647578060405163eac0d38960e01b8152600401610cc59190611c69565b5050565b8160000361164757806040516303b3e63560e41b8152600401610cc59190611c69565b6040516001600160a01b0384811660248301528381166044830152606482018390526105fe9186918216906323b872dd906084015b604051602081830303815290604052915060e01b6020820180516001600160e01b038381831617835250505050611806565b6040516001600160a01b0383811660248301526044820183905261063791859182169063a9059cbb906064016116a3565b60017f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f0055565b6117346115a1565b600080516020611e38833981519152805460ff191660011781557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25833611583565b6115d2611869565b611785611869565b6115d26118b2565b611795611869565b6115d26118ba565b6117a78282610f68565b6116475760405163e2517d3f60e01b81526001600160a01b038216600482015260248101839052604401610cc5565b600080516020611e388339815191525460ff166115d257604051638dfc202b60e01b815260040160405180910390fd5b600061181b6001600160a01b038416836118db565b9050805160001415801561184057508080602001905181019061183e9190611d22565b155b1561063757604051635274afe760e01b81526001600160a01b0384166004820152602401610cc5565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0054600160401b900460ff166115d257604051631afcd79f60e31b815260040160405180910390fd5b611706611869565b6118c2611869565b600080516020611e38833981519152805460ff19169055565b60606118e9838360006118f0565b9392505050565b6060814710156119155760405163cd78605960e01b8152306004820152602401610cc5565b600080856001600160a01b031684866040516119319190611ddb565b60006040518083038185875af1925050503d806000811461196e576040519150601f19603f3d011682016040523d82523d6000602084013e611973565b606091505b509150915061198386838361198d565b9695505050505050565b6060826119a25761199d826119e9565b6118e9565b81511580156119b957506001600160a01b0384163b155b156119e257604051639996b31560e01b81526001600160a01b0385166004820152602401610cc5565b50806118e9565b8051156119f95780518082602001fd5b604051630a12f52160e11b815260040160405180910390fd5b600060208284031215611a2457600080fd5b81356001600160e01b0319811681146118e957600080fd5b600060208284031215611a4e57600080fd5b5035919050565b80356001600160a01b0381168114611a6c57600080fd5b919050565b60008060408385031215611a8457600080fd5b82359150611a9460208401611a55565b90509250929050565b801515811461064f57600080fd5b600080600080600060a08688031215611ac357600080fd5b611acc86611a55565b9450611ada60208701611a55565b9350611ae860408701611a55565b9250606086013591506080860135611aff81611a9d565b809150509295509295909350565b634e487b7160e01b600052604160045260246000fd5b600080600080600080600060e0888a031215611b3e57600080fd5b611b4788611a55565b9650611b5560208901611a55565b9550611b6360408901611a55565b945060608801359350611b7860808901611a55565b925060a0880135915060c088013567ffffffffffffffff80821115611b9c57600080fd5b818a0191508a601f830112611bb057600080fd5b813581811115611bc257611bc2611b0d565b604051601f8201601f19908116603f01168101908382118183101715611bea57611bea611b0d565b816040528281528d6020848701011115611c0357600080fd5b82602086016020830137600060208483010152809550505050505092959891949750929550565b600060208284031215611c3c57600080fd5b6118e982611a55565b60005b83811015611c60578181015183820152602001611c48565b50506000910152565b6020815260008251806020840152611c88816040850160208701611c45565b601f01601f19169190910160400192915050565b60008060408385031215611caf57600080fd5b611cb883611a55565b9150611a9460208401611a55565b600080600060608486031215611cdb57600080fd5b611ce484611a55565b9250611cf260208501611a55565b9150611d0060408501611a55565b90509250925092565b600060208284031215611d1b57600080fd5b5051919050565b600060208284031215611d3457600080fd5b81516118e981611a9d565b634e487b7160e01b600052601160045260246000fd5b818103818111156105ba576105ba611d3f565b80820281158282048414176105ba576105ba611d3f565b600082611d9c57634e487b7160e01b600052601260045260246000fd5b500490565b600181811c90821680611db557607f821691505b602082108103611dd557634e487b7160e01b600052602260045260246000fd5b50919050565b60008251611ded818460208701611c45565b919091019291505056fe6103323fefd14715bb86536d0254fdec6da62d3ee5ad93f70a83a563205305ac02dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b626800cd5ed15c6e187e77e9aee88184c21f4f2182ab5827cb3b7e07fbedcd63f03300a2646970667358221220965609ebd19d1c76a64bdb8c02699133b1951740fd1cd76033f2c847b33db9a564736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class RenzoAdapter__factory extends ethers_1.ContractFactory {
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
exports.RenzoAdapter__factory = RenzoAdapter__factory;
RenzoAdapter__factory.bytecode = _bytecode;
RenzoAdapter__factory.abi = _abi;
//# sourceMappingURL=RenzoAdapter__factory.js.map