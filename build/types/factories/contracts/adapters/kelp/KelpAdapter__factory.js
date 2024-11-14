"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KelpAdapter__factory = void 0;
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
        name: "ExceedCapacity",
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
        name: "MinDeposit",
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
                name: "",
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
                name: "kelpProtocolAddress_",
                type: "address",
            },
            {
                internalType: "address",
                name: "rsETHAddress_",
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
        name: "kelpProtocolAddress",
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
        inputs: [],
        name: "rsETHAddress",
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
                name: "kelpProtocolAddress_",
                type: "address",
            },
        ],
        name: "setKelpProtocolAddress",
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
const _bytecode = "0x608060405234801561001057600080fd5b50611bcd806100206000396000f3fe6080604052600436106101a05760003560e01c80636a39fe60116100ec578063d02641a01161008a578063e567e86911610064578063e567e869146104fc578063ee81e4fc14610511578063f0fa55a914610531578063fc9cee3c1461055157600080fd5b8063d02641a01461049e578063d16352af146104be578063d547741f146104dc57600080fd5b80638456cb59116100c65780638456cb591461043957806391d148541461044e578063970de3811461046e578063a217fddf1461048957600080fd5b80636a39fe60146103ac5780636a4234eb146103cc5780637e531a39146103ec57600080fd5b80633e032a3b11610159578063485cc95511610133578063485cc955146103085780634f0e0ef3146103285780635354c2b1146103485780635c975abb1461038757600080fd5b80633e032a3b146102bd5780633f4ba83a146102d357806340e63f6a146102e857600080fd5b806301ffc9a7146101ac57806309de8dc1146101e15780631bacfd0b14610219578063248a9ca31461025b5780632f2ff15d1461027b57806336568abe1461029d57600080fd5b366101a757005b600080fd5b3480156101b857600080fd5b506101cc6101c73660046116a5565b610566565b60405190151581526020015b60405180910390f35b3480156101ed57600080fd5b50600454610201906001600160a01b031681565b6040516001600160a01b0390911681526020016101d8565b34801561022557600080fd5b5061024d7f4fe08aea4652d25d7d2c09148537810c0b7e49021cc60dd467483872e4452ff581565b6040519081526020016101d8565b34801561026757600080fd5b5061024d6102763660046116cf565b61059d565b34801561028757600080fd5b5061029b610296366004611704565b6105bf565b005b3480156102a957600080fd5b5061029b6102b8366004611704565b6105e1565b3480156102c957600080fd5b5061024d60015481565b3480156102df57600080fd5b5061029b610619565b3480156102f457600080fd5b5061029b610303366004611730565b61062f565b34801561031457600080fd5b5061029b61032336600461174b565b6106f6565b34801561033457600080fd5b50600054610201906001600160a01b031681565b34801561035457600080fd5b50610368610363366004611783565b6108ea565b604080516001600160a01b0390931683526020830191909152016101d8565b34801561039357600080fd5b50600080516020611b788339815191525460ff166101cc565b3480156103b857600080fd5b506103686103c73660046117fb565b610e02565b3480156103d857600080fd5b5061029b6103e7366004611730565b610e4b565b3480156103f857600080fd5b5061042c60405180604001604052806014815260200173119d5b98dd1a5bdb881b9bdd08185b1b1bddd95960621b81525081565b6040516101d89190611926565b34801561044557600080fd5b5061029b610f01565b34801561045a57600080fd5b506101cc610469366004611704565b610f14565b34801561047a57600080fd5b506103686103c736600461174b565b34801561049557600080fd5b5061024d600081565b3480156104aa57600080fd5b5061024d6104b9366004611730565b610f4c565b3480156104ca57600080fd5b506003546001600160a01b0316610201565b3480156104e857600080fd5b5061029b6104f7366004611704565b610f90565b34801561050857600080fd5b5061042c610fac565b34801561051d57600080fd5b50600354610201906001600160a01b031681565b34801561053d57600080fd5b5061029b61054c3660046116cf565b61103a565b34801561055d57600080fd5b5060015461024d565b60006001600160e01b03198216637965db0b60e01b148061059757506301ffc9a760e01b6001600160e01b03198316145b92915050565b6000908152600080516020611b58833981519152602052604090206001015490565b6105c88261059d565b6105d1816110a9565b6105db83836110b3565b50505050565b6001600160a01b038116331461060a5760405163334bd91960e11b815260040160405180910390fd5b6106148282611158565b505050565b6000610624816110a9565b61062c6111d4565b50565b600061063a816110a9565b61067082604051806040016040528060148152602001736b656c7050726f746f636f6c416464726573735f60601b815250611234565b604051736b656c7050726f746f636f6c416464726573735f60601b81526014016040519081900381206001600160a01b0384168252907f943e9d45a11aaae5d87503e3bc248665d9807856e5cf2bdb4a988bee444227819060200160405180910390a250600380546001600160a01b0319166001600160a01b0392909216919091179055565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a008054600160401b810460ff16159067ffffffffffffffff1660008115801561073c5750825b905060008267ffffffffffffffff1660011480156107595750303b155b905081158015610767575080155b156107855760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff1916600117855583156107af57845460ff60401b1916600160401b1785555b6107e587604051806040016040528060148152602001736b656c7050726f746f636f6c416464726573735f60601b815250611234565b610814866040518060400160405280600d81526020016c7273455448416464726573735f60981b815250611234565b61081c611261565b61082461126b565b61082c61127b565b6108376000336110b3565b50600380546001600160a01b03808a166001600160a01b0319928316179092556004805492891692909116919091178155668e1bc9bf040000600155604080518082019091529081526304b656c760e41b602082015260029061089a90826119e3565b5083156108e157845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b50505050505050565b6000806108f561128b565b6108fd6112bc565b7f4fe08aea4652d25d7d2c09148537810c0b7e49021cc60dd467483872e4452ff5610927816110a9565b610950886040518060400160405280600781526020016673656e6465725f60c81b815250611234565b61097b876040518060400160405280600981526020016872656365697665725f60b81b815250611234565b6109a38660405180604001604052806006815260200165746f6b656e5f60d01b815250611234565b6109d1856040518060400160405280600c81526020016b746f6b656e416d6f756e745f60a01b815250611306565b6109e66001600160a01b038716893088611329565b60035460405163095ea7b360e01b81526001600160a01b039182166004820152602481018790529087169063095ea7b3906044016020604051808303816000875af1158015610a39573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a5d9190611aa3565b506000670de0b6b3a7640000600154670de0b6b3a7640000610a7f9190611ad6565b610a899088611ae9565b610a939190611b00565b9050600360009054906101000a90046001600160a01b03166001600160a01b031663778fbe606040518163ffffffff1660e01b8152600401602060405180830381865afa158015610ae8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b0c9190611b22565b861015610b2c5760405163011bcd8360e41b815260040160405180910390fd5b600354604051634426082b60e11b81526001600160a01b0389811660048301529091169063884c105690602401602060405180830381865afa158015610b76573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b9a9190611b22565b861115610bba576040516362fc4d6760e11b815260040160405180910390fd5b600354604051635d2dda2160e11b81526001600160a01b03898116600483015260248201899052600092169063ba5bb44290604401602060405180830381865afa158015610c0c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c309190611b22565b6003546040516361d70bb360e11b81526001600160a01b038b81166004830152602482018b905260448201849052608060648301526000608483015292935091169063c3ae17669060a401600060405180830381600087803b158015610c9557600080fd5b505af1158015610ca9573d6000803e3d6000fd5b5050600480546040516370a0823160e01b81523092810192909252600093506001600160a01b031691506370a0823190602401602060405180830381865afa158015610cf9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d1d9190611b22565b905082811015610d4f5760405163c60d402760e01b815260048101849052602481018290526044015b60405180910390fd5b6004546001600160a01b03169550935083610d6b868b83611390565b856001600160a01b0316896001600160a01b03168c6001600160a01b03167f044d4bbddd3af59e620636cb231e96ccd6acfbac6aa9a369ea17075cc839daee8b89604051610dc3929190918252602082015260400190565b60405180910390a450505050610df860017f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f0055565b9550959350505050565b60008060405180604001604052806014815260200173119d5b98dd1a5bdb881b9bdd08185b1b1bddd95960621b81525060405162461bcd60e51b8152600401610d469190611926565b6000610e56816110a9565b610e84826040518060400160405280600c81526020016b77657468416464726573735f60a01b815250611234565b6040516a776574684164647265737360a81b8152600b016040519081900381206001600160a01b0384168252907f943e9d45a11aaae5d87503e3bc248665d9807856e5cf2bdb4a988bee444227819060200160405180910390a250600080546001600160a01b0319166001600160a01b0392909216919091179055565b6000610f0c816110a9565b61062c6113e7565b6000918252600080516020611b58833981519152602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6040805180820182526014815273119d5b98dd1a5bdb881b9bdd08185b1b1bddd95960621b6020820152905162461bcd60e51b8152600091610d4691600401611926565b610f998261059d565b610fa2816110a9565b6105db8383611158565b60028054610fb990611959565b80601f0160208091040260200160405190810160405280929190818152602001828054610fe590611959565b80156110325780601f1061100757610100808354040283529160200191611032565b820191906000526020600020905b81548152906001019060200180831161101557829003601f168201915b505050505081565b6000611045816110a9565b6110708260405180604001604052806009815260200168736c6970706167655f60b81b815250611306565b6040518281527ff5a802650e0a86db227cc342f06327d2ca0ff5cf2b12e0084fc5d8a7db2c54fd9060200160405180910390a150600155565b61062c8133611430565b6000600080516020611b588339815191526110ce8484610f14565b61114e576000848152602082815260408083206001600160a01b03871684529091529020805460ff191660011790556111043390565b6001600160a01b0316836001600160a01b0316857f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a46001915050610597565b6000915050610597565b6000600080516020611b588339815191526111738484610f14565b1561114e576000848152602082815260408083206001600160a01b0387168085529252808320805460ff1916905551339287917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a46001915050610597565b6111dc611469565b600080516020611b78833981519152805460ff191681557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a150565b6001600160a01b03821661125d578060405163eac0d38960e01b8152600401610d469190611926565b5050565b611269611499565b565b611273611499565b6112696114e2565b611283611499565b6112696114ea565b600080516020611b788339815191525460ff16156112695760405163d93c066560e01b815260040160405180910390fd5b7f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f0080546001190161130057604051633ee5aeb560e01b815260040160405180910390fd5b60029055565b8160000361125d57806040516303b3e63560e41b8152600401610d469190611926565b6040516001600160a01b0384811660248301528381166044830152606482018390526105db9186918216906323b872dd906084015b604051602081830303815290604052915060e01b6020820180516001600160e01b03838183161783525050505061150b565b6040516001600160a01b0383811660248301526044820183905261061491859182169063a9059cbb9060640161135e565b60017f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f0055565b6113ef61128b565b600080516020611b78833981519152805460ff191660011781557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25833611216565b61143a8282610f14565b61125d5760405163e2517d3f60e01b81526001600160a01b038216600482015260248101839052604401610d46565b600080516020611b788339815191525460ff1661126957604051638dfc202b60e01b815260040160405180910390fd5b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0054600160401b900460ff1661126957604051631afcd79f60e31b815260040160405180910390fd5b6113c1611499565b6114f2611499565b600080516020611b78833981519152805460ff19169055565b60006115206001600160a01b0384168361156e565b905080516000141580156115455750808060200190518101906115439190611aa3565b155b1561061457604051635274afe760e01b81526001600160a01b0384166004820152602401610d46565b606061157c83836000611583565b9392505050565b6060814710156115a85760405163cd78605960e01b8152306004820152602401610d46565b600080856001600160a01b031684866040516115c49190611b3b565b60006040518083038185875af1925050503d8060008114611601576040519150601f19603f3d011682016040523d82523d6000602084013e611606565b606091505b5091509150611616868383611620565b9695505050505050565b606082611635576116308261167c565b61157c565b815115801561164c57506001600160a01b0384163b155b1561167557604051639996b31560e01b81526001600160a01b0385166004820152602401610d46565b508061157c565b80511561168c5780518082602001fd5b604051630a12f52160e11b815260040160405180910390fd5b6000602082840312156116b757600080fd5b81356001600160e01b03198116811461157c57600080fd5b6000602082840312156116e157600080fd5b5035919050565b80356001600160a01b03811681146116ff57600080fd5b919050565b6000806040838503121561171757600080fd5b82359150611727602084016116e8565b90509250929050565b60006020828403121561174257600080fd5b61157c826116e8565b6000806040838503121561175e57600080fd5b611767836116e8565b9150611727602084016116e8565b801515811461062c57600080fd5b600080600080600060a0868803121561179b57600080fd5b6117a4866116e8565b94506117b2602087016116e8565b93506117c0604087016116e8565b92506060860135915060808601356117d781611775565b809150509295509295909350565b634e487b7160e01b600052604160045260246000fd5b600080600080600080600060e0888a03121561181657600080fd5b61181f886116e8565b965061182d602089016116e8565b955061183b604089016116e8565b945060608801359350611850608089016116e8565b925060a0880135915060c088013567ffffffffffffffff8082111561187457600080fd5b818a0191508a601f83011261188857600080fd5b81358181111561189a5761189a6117e5565b604051601f8201601f19908116603f011681019083821181831017156118c2576118c26117e5565b816040528281528d60208487010111156118db57600080fd5b82602086016020830137600060208483010152809550505050505092959891949750929550565b60005b8381101561191d578181015183820152602001611905565b50506000910152565b6020815260008251806020840152611945816040850160208701611902565b601f01601f19169190910160400192915050565b600181811c9082168061196d57607f821691505b60208210810361198d57634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115610614576000816000526020600020601f850160051c810160208610156119bc5750805b601f850160051c820191505b818110156119db578281556001016119c8565b505050505050565b815167ffffffffffffffff8111156119fd576119fd6117e5565b611a1181611a0b8454611959565b84611993565b602080601f831160018114611a465760008415611a2e5750858301515b600019600386901b1c1916600185901b1785556119db565b600085815260208120601f198616915b82811015611a7557888601518255948401946001909101908401611a56565b5085821015611a935787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b600060208284031215611ab557600080fd5b815161157c81611775565b634e487b7160e01b600052601160045260246000fd5b8181038181111561059757610597611ac0565b808202811582820484141761059757610597611ac0565b600082611b1d57634e487b7160e01b600052601260045260246000fd5b500490565b600060208284031215611b3457600080fd5b5051919050565b60008251611b4d818460208701611902565b919091019291505056fe02dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b626800cd5ed15c6e187e77e9aee88184c21f4f2182ab5827cb3b7e07fbedcd63f03300a26469706673582212200db988345551a290c2eac7fe6a56dd9be074376ebaeea9c31b0174ec47bbee1b64736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class KelpAdapter__factory extends ethers_1.ContractFactory {
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
exports.KelpAdapter__factory = KelpAdapter__factory;
KelpAdapter__factory.bytecode = _bytecode;
KelpAdapter__factory.abi = _abi;
//# sourceMappingURL=KelpAdapter__factory.js.map