"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FraxAdapter__factory = void 0;
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
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "DepositError",
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
        name: "frxETHAddress",
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
                name: "minterAddress_",
                type: "address",
            },
            {
                internalType: "address",
                name: "frxETHAddress_",
                type: "address",
            },
            {
                internalType: "address",
                name: "sfrxETHAddress_",
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
        name: "minterAddress",
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
                name: "frxETHAddress_",
                type: "address",
            },
        ],
        name: "setFrxETHAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "minterAddress_",
                type: "address",
            },
        ],
        name: "setMinterAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sfrxETHAddress_",
                type: "address",
            },
        ],
        name: "setSfrxETHAddress",
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
        name: "sfrxETHAddress",
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
const _bytecode = "0x608060405234801561001057600080fd5b50611ba2806100206000396000f3fe6080604052600436106101d15760003560e01c80638456cb59116100f7578063c0c53b8b11610095578063d547741f11610064578063d547741f1461058d578063e567e869146105ad578063f0fa55a9146105c2578063fc9cee3c146105e257600080fd5b8063c0c53b8b1461050f578063d02641a01461052f578063d15616c51461054f578063d16352af1461056f57600080fd5b806396eb46c1116100d157806396eb46c11461049f578063970de381146104bf578063a217fddf146104da578063a3106b95146104ef57600080fd5b80638456cb591461044a5780638652f4551461045f57806391d148541461047f57600080fd5b80633e032a3b1161016f5780635c975abb1161013e5780635c975abb146103985780636a39fe60146103bd5780636a4234eb146103dd5780637e531a39146103fd57600080fd5b80633e032a3b1461030e5780633f4ba83a146103245780634f0e0ef3146103395780635354c2b11461035957600080fd5b8063248a9ca3116101ab578063248a9ca31461028c5780632f2ff15d146102ac57806334d722c9146102ce57806336568abe146102ee57600080fd5b806301ffc9a7146101dd5780631bacfd0b146102125780631c685c4d1461025457600080fd5b366101d857005b600080fd5b3480156101e957600080fd5b506101fd6101f8366004611679565b6105f7565b60405190151581526020015b60405180910390f35b34801561021e57600080fd5b506102467f4fe08aea4652d25d7d2c09148537810c0b7e49021cc60dd467483872e4452ff581565b604051908152602001610209565b34801561026057600080fd5b50600454610274906001600160a01b031681565b6040516001600160a01b039091168152602001610209565b34801561029857600080fd5b506102466102a73660046116a3565b61062e565b3480156102b857600080fd5b506102cc6102c73660046116d8565b610650565b005b3480156102da57600080fd5b50600354610274906001600160a01b031681565b3480156102fa57600080fd5b506102cc6103093660046116d8565b610672565b34801561031a57600080fd5b5061024660015481565b34801561033057600080fd5b506102cc6106aa565b34801561034557600080fd5b50600054610274906001600160a01b031681565b34801561036557600080fd5b50610379610374366004611712565b6106c0565b604080516001600160a01b039093168352602083019190915201610209565b3480156103a457600080fd5b50600080516020611b4d8339815191525460ff166101fd565b3480156103c957600080fd5b506103796103d836600461178a565b6109b4565b3480156103e957600080fd5b506102cc6103f8366004611891565b610a06565b34801561040957600080fd5b5061043d60405180604001604052806014815260200173119d5b98dd1a5bdb881b9bdd08185b1b1bddd95960621b81525081565b60405161020991906118d0565b34801561045657600080fd5b506102cc610aaa565b34801561046b57600080fd5b506102cc61047a366004611891565b610abd565b34801561048b57600080fd5b506101fd61049a3660046116d8565b610b68565b3480156104ab57600080fd5b506102cc6104ba366004611891565b610ba0565b3480156104cb57600080fd5b506103796103d8366004611903565b3480156104e657600080fd5b50610246600081565b3480156104fb57600080fd5b506102cc61050a366004611891565b610c49565b34801561051b57600080fd5b506102cc61052a36600461192d565b610cf2565b34801561053b57600080fd5b5061024661054a366004611891565b610f20565b34801561055b57600080fd5b50600554610274906001600160a01b031681565b34801561057b57600080fd5b506003546001600160a01b0316610274565b34801561059957600080fd5b506102cc6105a83660046116d8565b610f64565b3480156105b957600080fd5b5061043d610f80565b3480156105ce57600080fd5b506102cc6105dd3660046116a3565b61100e565b3480156105ee57600080fd5b50600154610246565b60006001600160e01b03198216637965db0b60e01b148061062857506301ffc9a760e01b6001600160e01b03198316145b92915050565b6000908152600080516020611b2d833981519152602052604090206001015490565b6106598261062e565b6106628161107d565b61066c8383611087565b50505050565b6001600160a01b038116331461069b5760405163334bd91960e11b815260040160405180910390fd5b6106a5828261112c565b505050565b60006106b58161107d565b6106bd6111a8565b50565b6000806106cb611208565b6106d361123b565b7f4fe08aea4652d25d7d2c09148537810c0b7e49021cc60dd467483872e4452ff56106fd8161107d565b610726886040518060400160405280600781526020016673656e6465725f60c81b815250611285565b610751876040518060400160405280600981526020016872656365697665725f60b81b815250611285565b6107798660405180604001604052806006815260200165746f6b656e5f60d01b815250611285565b6107a7856040518060400160405280600c81526020016b746f6b656e416d6f756e745f60a01b8152506112b2565b6107bc6001600160a01b0387168930886112d5565b60035460405163095ea7b360e01b81526001600160a01b039182166004820152602481018790529087169063095ea7b3906044016020604051808303816000875af115801561080f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108339190611970565b50604051632e1a7d4d60e01b8152600481018690526001600160a01b03871690632e1a7d4d90602401600060405180830381600087803b15801561087657600080fd5b505af115801561088a573d6000803e3d6000fd5b5050600354604051634dcd454760e01b8152306004820152600093506001600160a01b039091169150634dcd454790889060240160206040518083038185885af11580156108dc573d6000803e3d6000fd5b50505050506040513d601f19601f82011682018060405250810190610901919061198d565b6005546001600160a01b03169450925082905061091f84898361133c565b836001600160a01b0316876001600160a01b03168a6001600160a01b03167f044d4bbddd3af59e620636cb231e96ccd6acfbac6aa9a369ea17075cc839daee8987604051610977929190918252602082015260400190565b60405180910390a450506109aa60017f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f0055565b9550959350505050565b60008060405180604001604052806014815260200173119d5b98dd1a5bdb881b9bdd08185b1b1bddd95960621b81525060405162461bcd60e51b81526004016109fd91906118d0565b60405180910390fd5b6000610a118161107d565b610a3f826040518060400160405280600c81526020016b77657468416464726573735f60a01b815250611285565b6040516a776574684164647265737360a81b8152600b016040519081900381206001600160a01b038416825290600080516020611b0d8339815191529060200160405180910390a250600080546001600160a01b0319166001600160a01b0392909216919091179055565b6000610ab58161107d565b6106bd611393565b6000610ac88161107d565b610af9826040518060400160405280600f81526020016e73667278455448416464726573735f60881b815250611285565b6040516e73667278455448416464726573735f60881b8152600f016040519081900381206001600160a01b038416825290600080516020611b0d8339815191529060200160405180910390a250600580546001600160a01b0319166001600160a01b0392909216919091179055565b6000918252600080516020611b2d833981519152602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6000610bab8161107d565b610bdb826040518060400160405280600e81526020016d667278455448416464726573735f60901b815250611285565b6040516d667278455448416464726573735f60901b8152600e016040519081900381206001600160a01b038416825290600080516020611b0d8339815191529060200160405180910390a250600480546001600160a01b0319166001600160a01b0392909216919091179055565b6000610c548161107d565b610c84826040518060400160405280600e81526020016d6d696e746572416464726573735f60901b815250611285565b6040516d6d696e746572416464726573735f60901b8152600e016040519081900381206001600160a01b038416825290600080516020611b0d8339815191529060200160405180910390a250600380546001600160a01b0319166001600160a01b0392909216919091179055565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a008054600160401b810460ff16159067ffffffffffffffff16600081158015610d385750825b905060008267ffffffffffffffff166001148015610d555750303b155b905081158015610d63575080155b15610d815760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff191660011785558315610dab57845460ff60401b1916600160401b1785555b610ddb886040518060400160405280600e81526020016d6d696e746572416464726573735f60901b815250611285565b610e0b876040518060400160405280600e81526020016d667278455448416464726573735f60901b815250611285565b610e3c866040518060400160405280600f81526020016e73667278455448416464726573735f60881b815250611285565b610e446113dc565b610e4c6113e4565b610e546113f4565b610e5f600033611087565b50600380546001600160a01b03808b166001600160a01b031992831617909255600480548a841690831617815560058054938a1693909216929092179055668e1bc9bf040000600155604080518082019091529081526308ce4c2f60e31b6020820152600290610ecf9082611a30565b508315610f1657845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b5050505050505050565b6040805180820182526014815273119d5b98dd1a5bdb881b9bdd08185b1b1bddd95960621b6020820152905162461bcd60e51b81526000916109fd916004016118d0565b610f6d8261062e565b610f768161107d565b61066c838361112c565b60028054610f8d906119a6565b80601f0160208091040260200160405190810160405280929190818152602001828054610fb9906119a6565b80156110065780601f10610fdb57610100808354040283529160200191611006565b820191906000526020600020905b815481529060010190602001808311610fe957829003601f168201915b505050505081565b60006110198161107d565b6110448260405180604001604052806009815260200168736c6970706167655f60b81b8152506112b2565b6040518281527ff5a802650e0a86db227cc342f06327d2ca0ff5cf2b12e0084fc5d8a7db2c54fd9060200160405180910390a150600155565b6106bd8133611404565b6000600080516020611b2d8339815191526110a28484610b68565b611122576000848152602082815260408083206001600160a01b03871684529091529020805460ff191660011790556110d83390565b6001600160a01b0316836001600160a01b0316857f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a46001915050610628565b6000915050610628565b6000600080516020611b2d8339815191526111478484610b68565b15611122576000848152602082815260408083206001600160a01b0387168085529252808320805460ff1916905551339287917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a46001915050610628565b6111b061143d565b600080516020611b4d833981519152805460ff191681557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a150565b600080516020611b4d8339815191525460ff16156112395760405163d93c066560e01b815260040160405180910390fd5b565b7f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f0080546001190161127f57604051633ee5aeb560e01b815260040160405180910390fd5b60029055565b6001600160a01b0382166112ae578060405163eac0d38960e01b81526004016109fd91906118d0565b5050565b816000036112ae57806040516303b3e63560e41b81526004016109fd91906118d0565b6040516001600160a01b03848116602483015283811660448301526064820183905261066c9186918216906323b872dd906084015b604051602081830303815290604052915060e01b6020820180516001600160e01b03838183161783525050505061146d565b6040516001600160a01b038381166024830152604482018390526106a591859182169063a9059cbb9060640161130a565b60017f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f0055565b61139b611208565b600080516020611b4d833981519152805460ff191660011781557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258336111ea565b6112396114d0565b6113ec6114d0565b611239611519565b6113fc6114d0565b611239611521565b61140e8282610b68565b6112ae5760405163e2517d3f60e01b81526001600160a01b0382166004820152602481018390526044016109fd565b600080516020611b4d8339815191525460ff1661123957604051638dfc202b60e01b815260040160405180910390fd5b60006114826001600160a01b03841683611542565b905080516000141580156114a75750808060200190518101906114a59190611970565b155b156106a557604051635274afe760e01b81526001600160a01b03841660048201526024016109fd565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0054600160401b900460ff1661123957604051631afcd79f60e31b815260040160405180910390fd5b61136d6114d0565b6115296114d0565b600080516020611b4d833981519152805460ff19169055565b606061155083836000611557565b9392505050565b60608147101561157c5760405163cd78605960e01b81523060048201526024016109fd565b600080856001600160a01b031684866040516115989190611af0565b60006040518083038185875af1925050503d80600081146115d5576040519150601f19603f3d011682016040523d82523d6000602084013e6115da565b606091505b50915091506115ea8683836115f4565b9695505050505050565b6060826116095761160482611650565b611550565b815115801561162057506001600160a01b0384163b155b1561164957604051639996b31560e01b81526001600160a01b03851660048201526024016109fd565b5080611550565b8051156116605780518082602001fd5b604051630a12f52160e11b815260040160405180910390fd5b60006020828403121561168b57600080fd5b81356001600160e01b03198116811461155057600080fd5b6000602082840312156116b557600080fd5b5035919050565b80356001600160a01b03811681146116d357600080fd5b919050565b600080604083850312156116eb57600080fd5b823591506116fb602084016116bc565b90509250929050565b80151581146106bd57600080fd5b600080600080600060a0868803121561172a57600080fd5b611733866116bc565b9450611741602087016116bc565b935061174f604087016116bc565b925060608601359150608086013561176681611704565b809150509295509295909350565b634e487b7160e01b600052604160045260246000fd5b600080600080600080600060e0888a0312156117a557600080fd5b6117ae886116bc565b96506117bc602089016116bc565b95506117ca604089016116bc565b9450606088013593506117df608089016116bc565b925060a0880135915060c088013567ffffffffffffffff8082111561180357600080fd5b818a0191508a601f83011261181757600080fd5b81358181111561182957611829611774565b604051601f8201601f19908116603f0116810190838211818310171561185157611851611774565b816040528281528d602084870101111561186a57600080fd5b82602086016020830137600060208483010152809550505050505092959891949750929550565b6000602082840312156118a357600080fd5b611550826116bc565b60005b838110156118c75781810151838201526020016118af565b50506000910152565b60208152600082518060208401526118ef8160408501602087016118ac565b601f01601f19169190910160400192915050565b6000806040838503121561191657600080fd5b61191f836116bc565b91506116fb602084016116bc565b60008060006060848603121561194257600080fd5b61194b846116bc565b9250611959602085016116bc565b9150611967604085016116bc565b90509250925092565b60006020828403121561198257600080fd5b815161155081611704565b60006020828403121561199f57600080fd5b5051919050565b600181811c908216806119ba57607f821691505b6020821081036119da57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156106a5576000816000526020600020601f850160051c81016020861015611a095750805b601f850160051c820191505b81811015611a2857828155600101611a15565b505050505050565b815167ffffffffffffffff811115611a4a57611a4a611774565b611a5e81611a5884546119a6565b846119e0565b602080601f831160018114611a935760008415611a7b5750858301515b600019600386901b1c1916600185901b178555611a28565b600085815260208120601f198616915b82811015611ac257888601518255948401946001909101908401611aa3565b5085821015611ae05787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60008251611b028184602087016118ac565b919091019291505056fe943e9d45a11aaae5d87503e3bc248665d9807856e5cf2bdb4a988bee4442278102dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b626800cd5ed15c6e187e77e9aee88184c21f4f2182ab5827cb3b7e07fbedcd63f03300a26469706673582212209bba496cb2b7460d0482ff35617957d5aa77710bd59c2982e918dce19f95f44c64736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class FraxAdapter__factory extends ethers_1.ContractFactory {
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
exports.FraxAdapter__factory = FraxAdapter__factory;
FraxAdapter__factory.bytecode = _bytecode;
FraxAdapter__factory.abi = _abi;
//# sourceMappingURL=FraxAdapter__factory.js.map