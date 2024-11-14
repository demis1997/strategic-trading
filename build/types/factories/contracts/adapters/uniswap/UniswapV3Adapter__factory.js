"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapV3Adapter__factory = void 0;
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
                internalType: "address",
                name: "token",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "pool",
                type: "address",
            },
        ],
        name: "PoolForTokenPriceSet",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "amountIn",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amountInMaximum",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amountOut",
                type: "uint256",
            },
        ],
        name: "Quoted",
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
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        name: "deposit",
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
                internalType: "bytes",
                name: "path_",
                type: "bytes",
            },
            {
                internalType: "uint256",
                name: "amountOut_",
                type: "uint256",
            },
        ],
        name: "getAmountInForexactOutput",
        outputs: [
            {
                internalType: "uint256",
                name: "amountIn",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amountInMaximum",
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
                name: "token_",
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
                name: "uniswapV3Router_",
                type: "address",
            },
            {
                internalType: "address",
                name: "uniswapQuoter_",
                type: "address",
            },
            {
                internalType: "address",
                name: "wethAddress_",
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
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
        ],
        name: "poolsPerTokenForPrice",
        outputs: [
            {
                internalType: "address",
                name: "poolForPrice",
                type: "address",
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
                name: "token_",
                type: "address",
            },
            {
                internalType: "address",
                name: "pool_",
                type: "address",
            },
        ],
        name: "setPoolPerTokenForPrice",
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
                name: "uniswapQuoter_",
                type: "address",
            },
        ],
        name: "setUniswapQuoterAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "uniswapRouterAddress_",
                type: "address",
            },
        ],
        name: "setUniswapRouterAddress",
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
        name: "uniswapQuoter",
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
        name: "uniswapV3Router",
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
                name: "caller_",
                type: "address",
            },
            {
                internalType: "address",
                name: "receiver_",
                type: "address",
            },
            {
                internalType: "address",
                name: "asset_",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "assetsAmount_",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "liquidTokenAddress_",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amountInMaximum_",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "path_",
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
];
const _bytecode = "0x608060405234801561001057600080fd5b50612122806100206000396000f3fe608060405234801561001057600080fd5b50600436106101e55760003560e01c80637fcc76901161010f578063d16352af116100a2578063e567e86911610071578063e567e86914610471578063f0cb22fc14610479578063f0fa55a9146104a1578063fc9cee3c146104b457600080fd5b8063d16352af14610427578063d547741f14610438578063d572bad51461044b578063db15d1851461045e57600080fd5b8063a217fddf116100de578063a217fddf146103e6578063b6366d8d146103ee578063c0c53b8b14610401578063d02641a01461041457600080fd5b80637fcc7690146103945780638456cb59146103bd57806391d14854146103c5578063970de381146103d857600080fd5b80633f4ba83a116101875780635c975abb116101565780635c975abb146103165780636a39fe601461032e5780636a4234eb146103415780637e531a391461035457600080fd5b80633f4ba83a146102b65780634db4a352146102be5780634f0e0ef3146102d15780635354c2b1146102e457600080fd5b80632c76d7a6116101c35780632c76d7a61461025a5780632f2ff15d1461028557806336568abe1461029a5780633e032a3b146102ad57600080fd5b806301ffc9a7146101ea5780631bacfd0b14610212578063248a9ca314610247575b600080fd5b6101fd6101f836600461184e565b6104bc565b60405190151581526020015b60405180910390f35b6102397f4fe08aea4652d25d7d2c09148537810c0b7e49021cc60dd467483872e4452ff581565b604051908152602001610209565b610239610255366004611878565b6104f3565b60035461026d906001600160a01b031681565b6040516001600160a01b039091168152602001610209565b6102986102933660046118a6565b610515565b005b6102986102a83660046118a6565b610537565b61023960015481565b61029861056f565b60045461026d906001600160a01b031681565b60005461026d906001600160a01b031681565b6102f76102f23660046118e4565b610585565b604080516001600160a01b039093168352602083019190915201610209565b6000805160206120cd8339815191525460ff166101fd565b6102f761033c366004611a03565b6105d7565b61029861034f366004611a9e565b610918565b61038760405180604001604052806014815260200173119d5b98dd1a5bdb881b9bdd08185b1b1bddd95960621b81525081565b6040516102099190611b0b565b61026d6103a2366004611a9e565b6005602052600090815260409020546001600160a01b031681565b6102986109ce565b6101fd6103d33660046118a6565b6109e1565b6102f76102f2366004611b1e565b610239600081565b6102986103fc366004611a9e565b610a19565b61029861040f366004611b4c565b610ad3565b610239610422366004611a9e565b610d04565b6003546001600160a01b031661026d565b6102986104463660046118a6565b610ec0565b610298610459366004611b1e565b610edc565b61029861046c366004611a9e565b610fa5565b61038761106d565b61048c610487366004611b97565b6110fb565b60408051928352602083019190915201610209565b6102986104af366004611878565b6111f2565b600154610239565b60006001600160e01b03198216637965db0b60e01b14806104ed57506301ffc9a760e01b6001600160e01b03198316145b92915050565b60009081526000805160206120ad833981519152602052604090206001015490565b61051e826104f3565b61052781611261565b610531838361126b565b50505050565b6001600160a01b03811633146105605760405163334bd91960e11b815260040160405180910390fd5b61056a8282611310565b505050565b600061057a81611261565b61058261138c565b50565b60008060405180604001604052806014815260200173119d5b98dd1a5bdb881b9bdd08185b1b1bddd95960621b81525060405162461bcd60e51b81526004016105ce9190611b0b565b60405180910390fd5b6000806105e26113ec565b6105ea61141f565b7f4fe08aea4652d25d7d2c09148537810c0b7e49021cc60dd467483872e4452ff561061481611261565b61063d8a6040518060400160405280600781526020016663616c6c65725f60c81b815250611469565b610668896040518060400160405280600981526020016872656365697665725f60b81b815250611469565b610690886040518060400160405280600681526020016561737365745f60d01b815250611469565b6106c586604051806040016040528060138152602001726c6971756964546f6b656e416464726573735f60681b815250611469565b6106f4876040518060400160405280600d81526020016c617373657473416d6f756e745f60981b815250611496565b610726856040518060400160405280601081526020016f616d6f756e74496e4d6178696d756d5f60801b815250611496565b61073b6001600160a01b0387168b30886114b9565b60035460405163095ea7b360e01b81526001600160a01b039182166004820152602481018790529087169063095ea7b3906044016020604051808303816000875af115801561078e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107b29190611bdc565b50604080516080810182528581526001600160a01b03808c1660208301528183018a90526060820188905260035492516304dc09a360e11b815291926000929116906309b8134690610808908590600401611bf9565b6020604051808303816000875af1158015610827573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061084b9190611c47565b604080518281526001600160a01b038d811660208301529181018c9052919250808a16918d8216918f16907fb50a58e455523e349c8e52077b9c73c5501c301f58c903c383b2eda002094a689060600160405180910390a460008188116108b35760006108bd565b6108bd8289611c76565b905080156108d9576108d96001600160a01b038a168e83611520565b8a8a955095505050505061090c60017f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f0055565b97509795505050505050565b600061092381611261565b610951826040518060400160405280600c81526020016b77657468416464726573735f60a01b815250611469565b6040516a776574684164647265737360a81b8152600b016040519081900381206001600160a01b0384168252907f943e9d45a11aaae5d87503e3bc248665d9807856e5cf2bdb4a988bee444227819060200160405180910390a250600080546001600160a01b0319166001600160a01b0392909216919091179055565b60006109d981611261565b610582611577565b60009182526000805160206120ad833981519152602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6000610a2481611261565b610a54826040518060400160405280600e81526020016d756e697377617051756f7465725f60901b815250611469565b6040516c3ab734b9bbb0b828bab7ba32b960991b8152600d016040519081900381206001600160a01b0384168252907f943e9d45a11aaae5d87503e3bc248665d9807856e5cf2bdb4a988bee444227819060200160405180910390a250600480546001600160a01b0319166001600160a01b0392909216919091179055565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a008054600160401b810460ff16159067ffffffffffffffff16600081158015610b195750825b905060008267ffffffffffffffff166001148015610b365750303b155b905081158015610b44575080155b15610b625760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff191660011785558315610b8c57845460ff60401b1916600160401b1785555b610bbe886040518060400160405280601081526020016f756e69737761705633526f757465725f60801b815250611469565b610bee876040518060400160405280600e81526020016d756e697377617051756f7465725f60901b815250611469565b610c1c866040518060400160405280600c81526020016b77657468416464726573735f60a01b815250611469565b610c246115c0565b610c2c6115c8565b610c346115d8565b610c3f60003361126b565b50600380546001600160a01b03808b166001600160a01b031992831617909255600480548a84169083161790556000805492891692909116919091179055668e1bc9bf0400006001556040805180820190915260078152660556e69737761760cc1b6020820152600290610cb39082611d13565b508315610cfa57845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b5050505050505050565b6001600160a01b0380821660009081526005602052604081205490911680610d6e5760405162461bcd60e51b815260206004820152601960248201527f4e6f20706f6f6c20646566696e656420666f7220746f6b656e0000000000000060448201526064016105ce565b6000836001600160a01b0316826001600160a01b0316630dfe16816040518163ffffffff1660e01b8152600401602060405180830381865afa158015610db8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ddc9190611dd3565b6001600160a01b031614610dee575060015b6000826001600160a01b0316633850c7bd6040518163ffffffff1660e01b815260040160e060405180830381865afa158015610e2e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e529190611e07565b5050505050509050600060c0826001600160a01b0316836001600160a01b0316610e7c9190611ea6565b610e8e90670de0b6b3a7640000611ea6565b901c905082610e9d5780610eb6565b610eb6816ec097ce7bc90715b34b9f1000000000611ebd565b9695505050505050565b610ec9826104f3565b610ed281611261565b6105318383611310565b6000610ee781611261565b610f0f8360405180604001604052806006815260200165746f6b656e5f60d01b815250611469565b610f368260405180604001604052806005815260200164706f6f6c5f60d81b815250611469565b816001600160a01b0316836001600160a01b03167fcc6e0ae60cbced494c20211897314caa91c734006e1a9192d9dee06568174c6260405160405180910390a3506001600160a01b03918216600090815260056020526040902080546001600160a01b03191691909216179055565b6000610fb081611261565b610fe78260405180604001604052806015815260200174756e6973776170526f75746572416464726573735f60581b815250611469565b60405173756e6973776170526f757465724164647265737360601b81526014016040519081900381206001600160a01b0384168252907f943e9d45a11aaae5d87503e3bc248665d9807856e5cf2bdb4a988bee444227819060200160405180910390a250600380546001600160a01b0319166001600160a01b0392909216919091179055565b6002805461107a90611c89565b80601f01602080910402602001604051908101604052809291908181526020018280546110a690611c89565b80156110f35780601f106110c8576101008083540402835291602001916110f3565b820191906000526020600020905b8154815290600101906020018083116110d657829003601f168201915b505050505081565b60048054604051632f80bb1d60e01b815260009283926001600160a01b031691632f80bb1d9161112f918891889101611edf565b6000604051808303816000875af115801561114e573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526111769190810190611fa7565b5050600154919350670de0b6b3a764000091611193915084611ea6565b61119d9190611ebd565b6111a7908361207d565b60408051848152602081018390529081018590529091507fab6689f200917a7bfa3a1606b018cf2762d9af97b379ddce1cdec887a019618d9060600160405180910390a19250929050565b60006111fd81611261565b6112288260405180604001604052806009815260200168736c6970706167655f60b81b815250611496565b6040518281527ff5a802650e0a86db227cc342f06327d2ca0ff5cf2b12e0084fc5d8a7db2c54fd9060200160405180910390a150600155565b61058281336115e8565b60006000805160206120ad83398151915261128684846109e1565b611306576000848152602082815260408083206001600160a01b03871684529091529020805460ff191660011790556112bc3390565b6001600160a01b0316836001600160a01b0316857f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a460019150506104ed565b60009150506104ed565b60006000805160206120ad83398151915261132b84846109e1565b15611306576000848152602082815260408083206001600160a01b0387168085529252808320805460ff1916905551339287917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a460019150506104ed565b611394611621565b6000805160206120cd833981519152805460ff191681557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a150565b6000805160206120cd8339815191525460ff161561141d5760405163d93c066560e01b815260040160405180910390fd5b565b7f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f0080546001190161146357604051633ee5aeb560e01b815260040160405180910390fd5b60029055565b6001600160a01b038216611492578060405163eac0d38960e01b81526004016105ce9190611b0b565b5050565b8160000361149257806040516303b3e63560e41b81526004016105ce9190611b0b565b6040516001600160a01b0384811660248301528381166044830152606482018390526105319186918216906323b872dd906084015b604051602081830303815290604052915060e01b6020820180516001600160e01b038381831617835250505050611651565b6040516001600160a01b0383811660248301526044820183905261056a91859182169063a9059cbb906064016114ee565b60017f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f0055565b61157f6113ec565b6000805160206120cd833981519152805460ff191660011781557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258336113ce565b61141d6116b4565b6115d06116b4565b61141d6116fd565b6115e06116b4565b61141d611705565b6115f282826109e1565b6114925760405163e2517d3f60e01b81526001600160a01b0382166004820152602481018390526044016105ce565b6000805160206120cd8339815191525460ff1661141d57604051638dfc202b60e01b815260040160405180910390fd5b60006116666001600160a01b03841683611726565b9050805160001415801561168b5750808060200190518101906116899190611bdc565b155b1561056a57604051635274afe760e01b81526001600160a01b03841660048201526024016105ce565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0054600160401b900460ff1661141d57604051631afcd79f60e31b815260040160405180910390fd5b6115516116b4565b61170d6116b4565b6000805160206120cd833981519152805460ff19169055565b60606117348383600061173b565b9392505050565b6060814710156117605760405163cd78605960e01b81523060048201526024016105ce565b600080856001600160a01b0316848660405161177c9190612090565b60006040518083038185875af1925050503d80600081146117b9576040519150601f19603f3d011682016040523d82523d6000602084013e6117be565b606091505b5091509150610eb68683836060826117de576117d982611825565b611734565b81511580156117f557506001600160a01b0384163b155b1561181e57604051639996b31560e01b81526001600160a01b03851660048201526024016105ce565b5080611734565b8051156118355780518082602001fd5b604051630a12f52160e11b815260040160405180910390fd5b60006020828403121561186057600080fd5b81356001600160e01b03198116811461173457600080fd5b60006020828403121561188a57600080fd5b5035919050565b6001600160a01b038116811461058257600080fd5b600080604083850312156118b957600080fd5b8235915060208301356118cb81611891565b809150509250929050565b801515811461058257600080fd5b600080600080600060a086880312156118fc57600080fd5b853561190781611891565b9450602086013561191781611891565b9350604086013561192781611891565b925060608601359150608086013561193e816118d6565b809150509295509295909350565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561198b5761198b61194c565b604052919050565b600082601f8301126119a457600080fd5b813567ffffffffffffffff8111156119be576119be61194c565b6119d1601f8201601f1916602001611962565b8181528460208386010111156119e657600080fd5b816020850160208301376000918101602001919091529392505050565b600080600080600080600060e0888a031215611a1e57600080fd5b8735611a2981611891565b96506020880135611a3981611891565b95506040880135611a4981611891565b9450606088013593506080880135611a6081611891565b925060a0880135915060c088013567ffffffffffffffff811115611a8357600080fd5b611a8f8a828b01611993565b91505092959891949750929550565b600060208284031215611ab057600080fd5b813561173481611891565b60005b83811015611ad6578181015183820152602001611abe565b50506000910152565b60008151808452611af7816020860160208601611abb565b601f01601f19169290920160200192915050565b6020815260006117346020830184611adf565b60008060408385031215611b3157600080fd5b8235611b3c81611891565b915060208301356118cb81611891565b600080600060608486031215611b6157600080fd5b8335611b6c81611891565b92506020840135611b7c81611891565b91506040840135611b8c81611891565b809150509250925092565b60008060408385031215611baa57600080fd5b823567ffffffffffffffff811115611bc157600080fd5b611bcd85828601611993565b95602094909401359450505050565b600060208284031215611bee57600080fd5b8151611734816118d6565b602081526000825160806020840152611c1560a0840182611adf565b905060018060a01b03602085015116604084015260408401516060840152606084015160808401528091505092915050565b600060208284031215611c5957600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b818103818111156104ed576104ed611c60565b600181811c90821680611c9d57607f821691505b602082108103611cbd57634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561056a576000816000526020600020601f850160051c81016020861015611cec5750805b601f850160051c820191505b81811015611d0b57828155600101611cf8565b505050505050565b815167ffffffffffffffff811115611d2d57611d2d61194c565b611d4181611d3b8454611c89565b84611cc3565b602080601f831160018114611d765760008415611d5e5750858301515b600019600386901b1c1916600185901b178555611d0b565b600085815260208120601f198616915b82811015611da557888601518255948401946001909101908401611d86565b5085821015611dc35787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b600060208284031215611de557600080fd5b815161173481611891565b805161ffff81168114611e0257600080fd5b919050565b600080600080600080600060e0888a031215611e2257600080fd5b8751611e2d81611891565b8097505060208801518060020b8114611e4557600080fd5b9550611e5360408901611df0565b9450611e6160608901611df0565b9350611e6f60808901611df0565b925060a088015160ff81168114611e8557600080fd5b60c0890151909250611e96816118d6565b8091505092959891949750929550565b80820281158282048414176104ed576104ed611c60565b600082611eda57634e487b7160e01b600052601260045260246000fd5b500490565b604081526000611ef26040830185611adf565b90508260208301529392505050565b600067ffffffffffffffff821115611f1b57611f1b61194c565b5060051b60200190565b600082601f830112611f3657600080fd5b81516020611f4b611f4683611f01565b611962565b8083825260208201915060208460051b870101935086841115611f6d57600080fd5b602086015b84811015611f9c57805163ffffffff81168114611f8f5760008081fd5b8352918301918301611f72565b509695505050505050565b60008060008060808587031215611fbd57600080fd5b8451935060208086015167ffffffffffffffff80821115611fdd57600080fd5b818801915088601f830112611ff157600080fd5b8151611fff611f4682611f01565b81815260059190911b8301840190848101908b83111561201e57600080fd5b938501935b8285101561204557845161203681611891565b82529385019390850190612023565b60408b0151909850945050508083111561205e57600080fd5b505061206c87828801611f25565b606096909601519497939650505050565b808201808211156104ed576104ed611c60565b600082516120a2818460208701611abb565b919091019291505056fe02dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b626800cd5ed15c6e187e77e9aee88184c21f4f2182ab5827cb3b7e07fbedcd63f03300a26469706673582212201a8cc3fd24ad594e4b4fd2e87d07ade275f64940505d29a43a93ee52d7cec48064736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class UniswapV3Adapter__factory extends ethers_1.ContractFactory {
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
exports.UniswapV3Adapter__factory = UniswapV3Adapter__factory;
UniswapV3Adapter__factory.bytecode = _bytecode;
UniswapV3Adapter__factory.abi = _abi;
//# sourceMappingURL=UniswapV3Adapter__factory.js.map