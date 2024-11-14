"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrSimpleStaking__factory = void 0;
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
                internalType: "string",
                name: "target",
                type: "string",
            },
        ],
        name: "EmptyString",
        type: "error",
    },
    {
        inputs: [],
        name: "EnforcedPause",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
        ],
        name: "ErrorStep",
        type: "error",
    },
    {
        inputs: [],
        name: "ExecuteWithdrawWStrategyError",
        type: "error",
    },
    {
        inputs: [],
        name: "ExpectedPause",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "balance",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "needed",
                type: "uint256",
            },
        ],
        name: "InsufficientFundsToWithdraw",
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
        name: "InvalidAdaptersPath",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidInitialization",
        type: "error",
    },
    {
        inputs: [],
        name: "MalformedPath",
        type: "error",
    },
    {
        inputs: [],
        name: "MinTwoTokensNeeded",
        type: "error",
    },
    {
        inputs: [],
        name: "NotInitializing",
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
                name: "tokenWrapperAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amountInMaximum",
                type: "uint256",
            },
            {
                internalType: "bool",
                name: "wrap",
                type: "bool",
            },
        ],
        name: "StrategyWrapError",
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
                indexed: false,
                internalType: "address[]",
                name: "newDeployPath",
                type: "address[]",
            },
        ],
        name: "AdaptersDeployPathSet",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address[]",
                name: "newWithdrawPath",
                type: "address[]",
            },
        ],
        name: "AdaptersWithdrawPathSet",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "liquidTokenAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "deployedAssetsValueETH",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "strategyContract",
                type: "address",
            },
        ],
        name: "DeployedAssetsValueUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "assets",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "assetsAmount",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "liquidToken",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "liquidTokenAmount",
                type: "uint256",
            },
        ],
        name: "DeploymentStrategyExecuted",
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
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "LiquidTokenSet",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes",
                name: "path",
                type: "bytes",
            },
        ],
        name: "PathUpdated",
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
                indexed: false,
                internalType: "address",
                name: "token",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "priceFeed",
                type: "address",
            },
        ],
        name: "PriceFeedSet",
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
                internalType: "string",
                name: "name",
                type: "string",
            },
        ],
        name: "StrategyNameSet",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "TokenWrapperSet",
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
                indexed: false,
                internalType: "address",
                name: "wrappedLiquidTokenAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "wrappedAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "liquidTokenAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "unwrappedAmount",
                type: "uint256",
            },
        ],
        name: "UnwrappedAmount",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "vaultAddress",
                type: "address",
            },
        ],
        name: "VaultAddressSet",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "strategyAddress",
                type: "address",
            },
        ],
        name: "WithdrawStrategyAddressSet",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "receiver",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "asset",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "assetsAmount",
                type: "uint256",
            },
        ],
        name: "WithdrawStrategyExecuted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "liquidTokenAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "unwrappedAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "wrappedLiquidTokenAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "wrappedAmount",
                type: "uint256",
            },
        ],
        name: "WrappedAmount",
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
        name: "DEPLOYMENT_ADAPTERS_QTY",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
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
        name: "VAULT_MANAGER_ROLE",
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
        name: "WITHDRAW_ADAPTERS_QTY",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "adaptersDeployPath",
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
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "adaptersWithdrawPath",
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
                internalType: "address[]",
                name: "tokens_",
                type: "address[]",
            },
            {
                internalType: "uint24[]",
                name: "fees_",
                type: "uint24[]",
            },
        ],
        name: "buildPath",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "deployedAssetsValue",
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
                name: "asset_",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "assetsAmount_",
                type: "uint256",
            },
        ],
        name: "executeDeploymentStrategy",
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
        inputs: [],
        name: "executeHarvest",
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
        ],
        name: "executeWithdrawStrategy",
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
        inputs: [],
        name: "getDeployedAssetsValue",
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
        name: "getFirstDepositAdapter",
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
        inputs: [
            {
                internalType: "address",
                name: "token_",
                type: "address",
            },
            {
                internalType: "uint8",
                name: "source_",
                type: "uint8",
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
                name: "vaultAddress_",
                type: "address",
            },
            {
                internalType: "address",
                name: "liquidTokenAddress_",
                type: "address",
            },
            {
                internalType: "address[]",
                name: "adaptersDeployPath_",
                type: "address[]",
            },
            {
                internalType: "address[]",
                name: "adaptersWithdrawPath_",
                type: "address[]",
            },
            {
                internalType: "string",
                name: "strategyName_",
                type: "string",
            },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "liquidTokenAddress",
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
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
        ],
        name: "priceFeedPerToken",
        outputs: [
            {
                internalType: "address",
                name: "priceFeed",
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
                internalType: "address[]",
                name: "adaptersDeployPath_",
                type: "address[]",
            },
        ],
        name: "setAdaptersDeployPath",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "adaptersWithdrawPath_",
                type: "address[]",
            },
        ],
        name: "setAdaptersWithdrawPath",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "liquidTokenAddress_",
                type: "address",
            },
        ],
        name: "setLiquidTokenAddress",
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
                name: "feed_",
                type: "address",
            },
        ],
        name: "setPriceFeedPerToken",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "strategyName_",
                type: "string",
            },
        ],
        name: "setStrategyName",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "vaultAddress_",
                type: "address",
            },
        ],
        name: "setVaultAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "withdrawStrategyAddress_",
                type: "address",
            },
        ],
        name: "setWithdrawStrategyAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "wrappedLiquidTokenAddress_",
                type: "address",
            },
        ],
        name: "setWrappedLiquidTokenAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "strategyName",
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
        name: "swapPath",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
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
        inputs: [
            {
                internalType: "uint256",
                name: "amount_",
                type: "uint256",
            },
        ],
        name: "unwrapToken",
        outputs: [
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
                internalType: "uint8",
                name: "source_",
                type: "uint8",
            },
        ],
        name: "updateDeployedAssetVaule",
        outputs: [
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
        inputs: [],
        name: "vaultAddress",
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
        name: "withdrawStrategyAddress",
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
                internalType: "uint256",
                name: "amount_",
                type: "uint256",
            },
        ],
        name: "wrapToken",
        outputs: [
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
        inputs: [],
        name: "wrappedLiquidTokenAddress",
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
        stateMutability: "payable",
        type: "receive",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b506133ca806100206000396000f3fe6080604052600436106102605760003560e01c8063754ae09c11610144578063b3967113116100b6578063e173ad251161007a578063e173ad2514610778578063e2868d331461078d578063ea9853d0146107a2578063eb0a7fd0146107c2578063ed79f712146107e2578063edd4604c1461031157600080fd5b8063b3967113146106cd578063b89f319d14610703578063d547741f14610723578063ddd0638c14610743578063df5af13f1461076357600080fd5b806391d148541161010857806391d1485414610623578063940997f714610643578063a016b2cd14610663578063a217fddf14610683578063a4d1e2ca14610698578063a78a0158146106b857600080fd5b8063754ae09c1461056b5780637e531a391461058b5780637f4879aa146105d85780638456cb59146105ee57806385535cc51461060357600080fd5b806336568abe116101dd5780635c786892116101a15780635c786892146104a45780635c975abb146104c45780635e5a24a4146104e95780636371d6bb1461050b578063642024e41461052b57806372cfcaad1461054b57600080fd5b806336568abe146103f05780633f4ba83a14610410578063429e6e0f14610425578063430bf08a146104455780634a28ff241461046557600080fd5b80631f696df8116102245780631f696df814610338578063248a9ca314610370578063254c72a2146103905780632f2ff15d146103b057806333dc7f07146103d057600080fd5b806301ffc9a71461026c5780630690416a146102a15780630a69ba4d146102c35780630fed40b0146102f15780631ac5d67d1461031157600080fd5b3661026757005b600080fd5b34801561027857600080fd5b5061028c61028736600461287e565b6107f7565b60405190151581526020015b60405180910390f35b3480156102ad57600080fd5b506102c16102bc3660046128c4565b61082e565b005b3480156102cf57600080fd5b506102e36102de3660046128f7565b6108c5565b604051908152602001610298565b3480156102fd57600080fd5b506102c161030c366004612a58565b610ad5565b34801561031d57600080fd5b50610326600181565b60405160ff9091168152602001610298565b34801561034457600080fd5b50610358610353366004612b0c565b610d17565b6040516001600160a01b039091168152602001610298565b34801561037c57600080fd5b506102e361038b366004612b0c565b610d41565b34801561039c57600080fd5b506102c16103ab3660046128c4565b610d63565b3480156103bc57600080fd5b506102c16103cb366004612b25565b610e04565b3480156103dc57600080fd5b50600254610358906001600160a01b031681565b3480156103fc57600080fd5b506102c161040b366004612b25565b610e26565b34801561041c57600080fd5b506102c1610e5e565b34801561043157600080fd5b50600354610358906001600160a01b031681565b34801561045157600080fd5b50600454610358906001600160a01b031681565b34801561047157600080fd5b50610485610480366004612b55565b610e74565b604080516001600160a01b039093168352602083019190915201610298565b3480156104b057600080fd5b506102c16104bf366004612b96565b610f9c565b3480156104d057600080fd5b506000805160206133758339815191525460ff1661028c565b3480156104f557600080fd5b506102e360008051602061333583398151915281565b34801561051757600080fd5b506102e3610526366004612b0c565b610fb6565b34801561053757600080fd5b50610485610546366004612bcb565b6111ab565b34801561055757600080fd5b506102e3610566366004612c1c565b611339565b34801561057757600080fd5b506102c1610586366004612b96565b6114b8565b34801561059757600080fd5b506105cb60405180604001604052806014815260200173119d5b98dd1a5bdb881b9bdd08185b1b1bddd95960621b81525081565b6040516102989190612c7d565b3480156105e457600080fd5b506102e360055481565b3480156105fa57600080fd5b506102c16114ce565b34801561060f57600080fd5b506102c161061e3660046128c4565b6114e1565b34801561062f57600080fd5b5061028c61063e366004612b25565b611572565b34801561064f57600080fd5b506102e361065e366004612b0c565b6115aa565b34801561066f57600080fd5b506102c161067e366004612c90565b61178f565b34801561068f57600080fd5b506102e3600081565b3480156106a457600080fd5b506103586106b3366004612b0c565b611844565b3480156106c457600080fd5b50610485611854565b3480156106d957600080fd5b506103586106e83660046128c4565b6008602052600090815260409020546001600160a01b031681565b34801561070f57600080fd5b50600154610358906001600160a01b031681565b34801561072f57600080fd5b506102c161073e366004612b25565b61189d565b34801561074f57600080fd5b506102c161075e366004612cd2565b6118b9565b34801561076f57600080fd5b506105cb611ae9565b34801561078457600080fd5b506105cb611b77565b34801561079957600080fd5b506102e3611b84565b3480156107ae57600080fd5b506102c16107bd3660046128c4565b611b94565b3480156107ce57600080fd5b506102c16107dd366004612d9f565b611c35565b3480156107ee57600080fd5b50610358611d33565b60006001600160e01b03198216637965db0b60e01b148061082857506301ffc9a760e01b6001600160e01b03198316145b92915050565b600061083981611d3d565b61086e82604051806040016040528060138152602001726c6971756964546f6b656e416464726573735f60681b815250611d47565b6040516001600160a01b038316907f4245d51ab06b77fea049f6e1eab0e31b343fc4c1e9fe7774373362c37eb2034490600090a250600180546001600160a01b0319166001600160a01b0392909216919091179055565b6001546000906001600160a01b03848116911614806108f157506002546001600160a01b038481169116145b6109425760405162461bcd60e51b815260206004820152601760248201527f496e76616c696420746f6b656e2072657175657374656400000000000000000060448201526064015b60405180910390fd5b8160ff166001148061095757508160ff166002145b6109a35760405162461bcd60e51b815260206004820152601b60248201527f496e76616c696420736f7572636520746f2067657420707269636500000000006044820152606401610939565b6001600160a01b03808416600090815260086020526040812054909116908115610a39576000826001600160a01b031663feaf968c6040518163ffffffff1660e01b815260040160a060405180830381865afa158015610a07573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a2b9190612de7565b50919450610acd9350505050565b60008460ff16600214610a5357610a4e611d70565b610a5b565b610a5b611dae565b604051630681320d60e51b81526001600160a01b0388811660048301529192509082169063d02641a090602401602060405180830381865afa158015610aa5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ac99190612e37565b9150505b949350505050565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a008054600160401b810460ff16159067ffffffffffffffff16600081158015610b1b5750825b905060008267ffffffffffffffff166001148015610b385750303b155b905081158015610b46575080155b15610b645760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff191660011785558315610b8e57845460ff60401b1916600160401b1785555b610bbd8b6040518060400160405280600d81526020016c7661756c74416464726573735f60981b815250611d47565b610bf28a604051806040016040528060138152602001726c6971756964546f6b656e416464726573735f60681b815250611d47565b610c5687878080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505060408051808201909152600d81526c73747261746567794e616d655f60981b60208201529150611dc49050565b610c5e611de8565b610c69600033611df2565b50610c75896001611e97565b610c80886001611fcc565b600480546001600160a01b0319166001600160a01b038d161790556000610ca8878983612ed4565b50600180546001600160a01b0319166001600160a01b038c161790558315610d0a57845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b5050505050505050505050565b60068181548110610d2757600080fd5b6000918252602090912001546001600160a01b0316905081565b6000908152600080516020613355833981519152602052604090206001015490565b6000610d6e81611d3d565b610dad826040518060400160405280601a81526020017f777261707065644c6971756964546f6b656e416464726573735f000000000000815250611d47565b6040516001600160a01b038316907fce01361fe7ff662213b751c96882886f856789c4049c51e47af22049de7976b890600090a250600280546001600160a01b0319166001600160a01b0392909216919091179055565b610e0d82610d41565b610e1681611d3d565b610e208383611df2565b50505050565b6001600160a01b0381163314610e4f5760405163334bd91960e11b815260040160405180910390fd5b610e59828261210b565b505050565b6000610e6981611d3d565b610e71612187565b50565b600080600080516020613335833981519152610e8f81611d3d565b610eba866040518060400160405280600981526020016872656365697665725f60b81b815250611d47565b610ee2856040518060400160405280600681526020016561737365745f60d01b815250611d47565b610f11846040518060400160405280600d81526020016c617373657473416d6f756e745f60981b8152506121e7565b600080610f1f88888861220a565b9150915080600003610f4457604051637efa1e0f60e11b815260040160405180910390fd5b604080516001600160a01b03808b168252841660208201529081018290527ff69538dab01a66f366bf2dbbe6bea4efee94973f6d5d8d70d19dab18c1b3e8b19060600160405180910390a19097909650945050505050565b6000610fa781611d3d565b610fb2826001611fcc565b5050565b6000600080516020613335833981519152610fd081611d3d565b6002546001600160a01b031661101d5760405162461bcd60e51b81526020600482015260126024820152712737903232b334b732b2103bb930b83832b960711b6044820152606401610939565b60015460025460405163095ea7b360e01b81526001600160a01b0391821660048201526024810186905291169063095ea7b3906044016020604051808303816000875af1158015611072573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110969190612f95565b50600254604051630ea598cb60e41b8152600481018590526000916001600160a01b03169063ea598cb0906024016020604051808303816000875af11580156110e3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111079190612e37565b905080600003611147576002546040516333ece22360e21b81526001600160a01b0390911660048201526024810185905260016044820152606401610939565b600154600254604080516001600160a01b039384168152602081018890529290911690820152606081018290527fda542a6430bf8482eb425b35bad6701f112540783af4af76389552a2d8902e59906080015b60405180910390a191505b50919050565b6000806000805160206133358339815191526111c681611d3d565b6111ef876040518060400160405280600781526020016673656e6465725f60c81b815250611d47565b61121a866040518060400160405280600981526020016872656365697665725f60b81b815250611d47565b611242856040518060400160405280600681526020016561737365745f60d01b815250611d47565b611271846040518060400160405280600d81526020016c617373657473416d6f756e745f60981b8152506121e7565b6001600061127d612677565b9050600080611291838c8c8c8c600061268d565b9150915080600014806112b257506001546001600160a01b03838116911614155b156112d357604051630eeb421160e21b815260048101859052602401610939565b816001600160a01b0316896001600160a01b03167f59b7a96ada3a44d05c501ea0e559b7033ce7bd281bf88b061ceb5b29ad4a9fa28a84604051611321929190918252602082015260400190565b60405180910390a3909a909950975050505050505050565b600060008051602061333583398151915261135381611d3d565b8260ff166001148061136857508260ff166002145b6113b45760405162461bcd60e51b815260206004820152601b60248201527f496e76616c696420736f7572636520746f2067657420707269636500000000006044820152606401610939565b6001546000906113ce906001600160a01b031660026108c5565b6001546040516370a0823160e01b8152306004820152919250670de0b6b3a76400009183916001600160a01b0316906370a0823190602401602060405180830381865afa158015611423573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114479190612e37565b6114519190612fcd565b61145b9190612fe4565b6005819055600154604080516001600160a01b0390921682526020820192909252308183015290517f662f619155fcceea17128ce9cf93a4df288a2427524b2eabdf40a5013d9e94f99181900360600190a1505060055492915050565b60006114c381611d3d565b610fb2826001611e97565b60006114d981611d3d565b610e71612720565b60006114ec81611d3d565b61151b826040518060400160405280600d81526020016c7661756c74416464726573735f60981b815250611d47565b6040516001600160a01b038316907f5c06d966572db101b61cacf1a095f31609e34873f11016fc5cb333651e969f6790600090a250600480546001600160a01b0319166001600160a01b0392909216919091179055565b6000918252600080516020613355833981519152602090815260408084206001600160a01b0393909316845291905290205460ff1690565b60006000805160206133358339815191526115c481611d3d565b6002546001600160a01b03166116115760405162461bcd60e51b81526020600482015260126024820152712737903232b334b732b2103bb930b83832b960711b6044820152606401610939565b60025460405163095ea7b360e01b81526001600160a01b0390911660048201819052602482018590529063095ea7b3906044016020604051808303816000875af1158015611663573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116879190612f95565b50600254604051636f074d1f60e11b8152600481018590526000916001600160a01b03169063de0e9a3e906024016020604051808303816000875af11580156116d4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116f89190612e37565b905080600003611738576002546040516333ece22360e21b81526001600160a01b0390911660048201526024810185905260006044820152606401610939565b600254600154604080516001600160a01b039384168152602081018890529290911690820152606081018290527f7687e177cae37c3bc6b45449595322baa1bcb203db50ebab44854268528e8c319060800161119a565b600061179a81611d3d565b6117fe83838080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505060408051808201909152600d81526c73747261746567794e616d655f60981b60208201529150611dc49050565b7f21ce9ce25f0f85766c680deb376fbea42cd6d6911f217c0d89f14c439b84fcfd838360405161182f929190613006565b60405180910390a16000610e20838583612ed4565b60078181548110610d2757600080fd5b60008060405180604001604052806014815260200173119d5b98dd1a5bdb881b9bdd08185b1b1bddd95960621b81525060405162461bcd60e51b81526004016109399190612c7d565b6118a682610d41565b6118af81611d3d565b610e20838361210b565b60006118c481611d3d565b8251825160028210156118ea57604051630468e0af60e41b815260040160405180910390fd5b6118f5816001613035565b821461191457604051630d6c3bc160e41b815260040160405180910390fd5b60005b828110156119695761196186828151811061193457611934613048565b602002602001015160405180604001604052806007815260200166746f6b656e735f60c81b815250611d47565b600101611917565b5060005b818110156119c2576119ba85828151811061198a5761198a613048565b602002602001015162ffffff1660405180604001604052806005815260200164666565735f60d81b8152506121e7565b60010161196d565b50846000815181106119d6576119d6613048565b6020026020010151604051602001611a06919060609190911b6bffffffffffffffffffffffff1916815260140190565b60405160208183030381529060405260099081611a23919061305e565b5060005b81811015611aa9576009858281518110611a4357611a43613048565b602002602001015187836001611a599190613035565b81518110611a6957611a69613048565b6020026020010151604051602001611a839392919061311e565b60405160208183030381529060405260099081611aa0919061305e565b50600101611a27565b507fa0ddd263f8966deaa9209d36ecf63770a4baf7f627d164775a94f808930cd0486009604051611ada919061323c565b60405180910390a15050505050565b60098054611af690612e50565b80601f0160208091040260200160405190810160405280929190818152602001828054611b2290612e50565b8015611b6f5780601f10611b4457610100808354040283529160200191611b6f565b820191906000526020600020905b815481529060010190602001808311611b5257829003601f168201915b505050505081565b60008054611af690612e50565b6000611b8f60055490565b905090565b6000611b9f81611d3d565b611bde826040518060400160405280601881526020017f77697468647261775374726174656779416464726573735f0000000000000000815250611d47565b6040516001600160a01b038316907f28548fb82baba9340b788ecc4911d241c9508404c350e6964e447fbf8d62c12890600090a250600380546001600160a01b0319166001600160a01b0392909216919091179055565b6000611c4081611d3d565b6001546001600160a01b0384811691161480611c6957506002546001600160a01b038481169116145b8015611c7d57506001600160a01b03831615155b611cc15760405162461bcd60e51b8152602060048201526015602482015274125b9d985b1a59081d1bdad95b88195b9d195c9959605a1b6044820152606401610939565b604080516001600160a01b038086168252841660208201527fd2d8394cf7549a5ddbc2ba3dd7b2de8d53c891472d1f2907008ed6a10045fdae910160405180910390a1506001600160a01b03918216600090815260086020526040902080546001600160a01b03191691909216179055565b6000611b8f612677565b610e718133612769565b6001600160a01b038216610fb2578060405163eac0d38960e01b81526004016109399190612c7d565b6006805460009190611d849060019061324f565b81548110611d9457611d94613048565b6000918252602090912001546001600160a01b0316919050565b60006007600081548110611d9457611d94613048565b6000825111610fb257806040516318a996bb60e21b81526004016109399190612c7d565b611df06127a2565b565b6000600080516020613355833981519152611e0d8484611572565b611e8d576000848152602082815260408083206001600160a01b03871684529091529020805460ff19166001179055611e433390565b6001600160a01b0316836001600160a01b0316857f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a46001915050610828565b6000915050610828565b815160ff82168114611ed55760405163cb97bcb160e01b81526020600482015260066024820152656465706c6f7960d01b6044820152606401610939565b611ee16006600061284c565b7f7e68ba9b3bbcc418714dcc03de2c047ccdb19978700780676f593eb95af7f68083604051611f109190613262565b60405180910390a160005b81811015610e2057611f73848281518110611f3857611f38613048565b60200260200101516040518060400160405280601581526020017461646170746572734465706c6f79506174685f5b5d60581b815250611d47565b6006848281518110611f8757611f87613048565b60209081029190910181015182546001808201855560009485529290932090920180546001600160a01b0319166001600160a01b039093169290921790915501611f1b565b815160ff8216811461200c5760405163cb97bcb160e01b8152602060048201526008602482015267776974686472617760c01b6044820152606401610939565b6120186007600061284c565b7fdb2c7c26f26f22897028e2e018c1967eef4170d6a2c476a373823d8639da73ec836040516120479190613262565b60405180910390a160005b81811015610e20576120b284828151811061206f5761206f613048565b60200260200101516040518060400160405280601781526020017f61646170746572735769746864726177506174685f5b5d000000000000000000815250611d47565b60078482815181106120c6576120c6613048565b60209081029190910181015182546001808201855560009485529290932090920180546001600160a01b0319166001600160a01b039093169290921790915501612052565b60006000805160206133558339815191526121268484611572565b15611e8d576000848152602082815260408083206001600160a01b0387168085529252808320805460ff1916905551339287917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a46001915050610828565b61218f6127eb565b600080516020613375833981519152805460ff191681557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a150565b81600003610fb257806040516303b3e63560e41b81526004016109399190612c7d565b600254600090819081906001600160a01b0316612232576001546001600160a01b031661223f565b6002546001600160a01b03165b9050600061224e8260026108c5565b90506000670de0b6b3a7640000612263611dae565b6001600160a01b031663fc9cee3c6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156122a0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122c49190612e37565b6122d690670de0b6b3a7640000613035565b836122e989670de0b6b3a7640000612fcd565b6122f39190612fe4565b6122fd9190612fcd565b6123079190612fe4565b6002549091506000906001600160a01b039081169085160361241e5760015460009061233d906001600160a01b031660026108c5565b6123478486612fcd565b6123519190612fe4565b6001546040516370a0823160e01b81523060048201529192506001600160a01b0316906370a0823190602401602060405180830381865afa15801561239a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123be9190612e37565b81111561240d5760405162461bcd60e51b815260206004820152601960248201527f4e6f7420656e6f75676820746f6b656e7320746f2077726170000000000000006044820152606401610939565b61241681610fb6565b915050612421565b50805b6001546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a0823190602401602060405180830381865afa15801561246a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061248e9190612e37565b9050808211156124bb5760405163682324e760e11b81526004810182905260248101839052604401610939565b846001600160a01b031663095ea7b36124d2611dae565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602481018590526044016020604051808303816000875af115801561251f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906125439190612f95565b5060008061254f611dae565b6001600160a01b0316636a39fe60308e8e8e8c8a60096040518863ffffffff1660e01b815260040161258797969594939291906132af565b60408051808303816000875af11580156125a5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906125c99190613306565b60025491935091506001600160a01b0390811690881603612666576002546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a0823190602401602060405180830381865afa15801561262d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906126519190612e37565b9050801561266457612662816115aa565b505b505b909b909a5098505050505050505050565b60006006600081548110611d9457611d94613048565b604051635354c2b160e01b81526001600160a01b038681166004830152858116602483015284811660448301526064820184905282151560848301526000918291829182918b1690635354c2b19060a40160408051808303816000875af11580156126fc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906126669190613306565b61272861281b565b600080516020613375833981519152805460ff191660011781557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258336121c9565b6127738282611572565b610fb25760405163e2517d3f60e01b81526001600160a01b038216600482015260248101839052604401610939565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0054600160401b900460ff16611df057604051631afcd79f60e31b815260040160405180910390fd5b6000805160206133758339815191525460ff16611df057604051638dfc202b60e01b815260040160405180910390fd5b6000805160206133758339815191525460ff1615611df05760405163d93c066560e01b815260040160405180910390fd5b5080546000825590600052602060002090810190610e7191905b8082111561287a5760008155600101612866565b5090565b60006020828403121561289057600080fd5b81356001600160e01b0319811681146128a857600080fd5b9392505050565b6001600160a01b0381168114610e7157600080fd5b6000602082840312156128d657600080fd5b81356128a8816128af565b803560ff811681146128f257600080fd5b919050565b6000806040838503121561290a57600080fd5b8235612915816128af565b9150612923602084016128e1565b90509250929050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561296b5761296b61292c565b604052919050565b600067ffffffffffffffff82111561298d5761298d61292c565b5060051b60200190565b600082601f8301126129a857600080fd5b813560206129bd6129b883612973565b612942565b8083825260208201915060208460051b8701019350868411156129df57600080fd5b602086015b84811015612a045780356129f7816128af565b83529183019183016129e4565b509695505050505050565b60008083601f840112612a2157600080fd5b50813567ffffffffffffffff811115612a3957600080fd5b602083019150836020828501011115612a5157600080fd5b9250929050565b60008060008060008060a08789031215612a7157600080fd5b8635612a7c816128af565b95506020870135612a8c816128af565b9450604087013567ffffffffffffffff80821115612aa957600080fd5b612ab58a838b01612997565b95506060890135915080821115612acb57600080fd5b612ad78a838b01612997565b94506080890135915080821115612aed57600080fd5b50612afa89828a01612a0f565b979a9699509497509295939492505050565b600060208284031215612b1e57600080fd5b5035919050565b60008060408385031215612b3857600080fd5b823591506020830135612b4a816128af565b809150509250929050565b600080600060608486031215612b6a57600080fd5b8335612b75816128af565b92506020840135612b85816128af565b929592945050506040919091013590565b600060208284031215612ba857600080fd5b813567ffffffffffffffff811115612bbf57600080fd5b610acd84828501612997565b60008060008060808587031215612be157600080fd5b8435612bec816128af565b93506020850135612bfc816128af565b92506040850135612c0c816128af565b9396929550929360600135925050565b600060208284031215612c2e57600080fd5b6128a8826128e1565b6000815180845260005b81811015612c5d57602081850181015186830182015201612c41565b506000602082860101526020601f19601f83011685010191505092915050565b6020815260006128a86020830184612c37565b60008060208385031215612ca357600080fd5b823567ffffffffffffffff811115612cba57600080fd5b612cc685828601612a0f565b90969095509350505050565b60008060408385031215612ce557600080fd5b823567ffffffffffffffff80821115612cfd57600080fd5b612d0986838701612997565b9350602091508185013581811115612d2057600080fd5b85019050601f81018613612d3357600080fd5b8035612d416129b882612973565b81815260059190911b82018301908381019088831115612d6057600080fd5b928401925b82841015612d9057833562ffffff81168114612d815760008081fd5b82529284019290840190612d65565b80955050505050509250929050565b60008060408385031215612db257600080fd5b8235612dbd816128af565b91506020830135612b4a816128af565b805169ffffffffffffffffffff811681146128f257600080fd5b600080600080600060a08688031215612dff57600080fd5b612e0886612dcd565b9450602086015193506040860151925060608601519150612e2b60808701612dcd565b90509295509295909350565b600060208284031215612e4957600080fd5b5051919050565b600181811c90821680612e6457607f821691505b6020821081036111a557634e487b7160e01b600052602260045260246000fd5b601f821115610e59576000816000526020600020601f850160051c81016020861015612ead5750805b601f850160051c820191505b81811015612ecc57828155600101612eb9565b505050505050565b67ffffffffffffffff831115612eec57612eec61292c565b612f0083612efa8354612e50565b83612e84565b6000601f841160018114612f345760008515612f1c5750838201355b600019600387901b1c1916600186901b178355612f8e565b600083815260209020601f19861690835b82811015612f655786850135825560209485019460019092019101612f45565b5086821015612f825760001960f88860031b161c19848701351681555b505060018560011b0183555b5050505050565b600060208284031215612fa757600080fd5b815180151581146128a857600080fd5b634e487b7160e01b600052601160045260246000fd5b808202811582820484141761082857610828612fb7565b60008261300157634e487b7160e01b600052601260045260246000fd5b500490565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b8082018082111561082857610828612fb7565b634e487b7160e01b600052603260045260246000fd5b815167ffffffffffffffff8111156130785761307861292c565b61308c816130868454612e50565b84612e84565b602080601f8311600181146130c157600084156130a95750858301515b600019600386901b1c1916600185901b178555612ecc565b600085815260208120601f198616915b828110156130f0578886015182559484019460019091019084016130d1565b508582101561310e5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b600080855461312c81612e50565b60018281168015613144576001811461315957613188565b60ff1984168752821515830287019450613188565b8960005260208060002060005b8581101561317f5781548a820152908401908201613166565b50505082870194505b5050505060e89490941b6001600160e81b0319168452505060601b6bffffffffffffffffffffffff19166003820152601701919050565b600081546131cc81612e50565b8085526020600183811680156131e9576001811461320357613231565b60ff1985168884015283151560051b880183019550613231565b866000528260002060005b858110156132295781548a820186015290830190840161320e565b890184019650505b505050505092915050565b6020815260006128a860208301846131bf565b8181038181111561082857610828612fb7565b6020808252825182820181905260009190848201906040850190845b818110156132a35783516001600160a01b03168352928401929184019160010161327e565b50909695505050505050565b6001600160a01b03888116825287811660208301528681166040830152606082018690528416608082015260a0810183905260e060c082018190526000906132f9908301846131bf565b9998505050505050505050565b6000806040838503121561331957600080fd5b8251613324816128af565b602093909301519294929350505056fed1473398bb66596de5d1ea1fc8e303ff2ac23265adc9144b1b52065dc4f0934b02dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b626800cd5ed15c6e187e77e9aee88184c21f4f2182ab5827cb3b7e07fbedcd63f03300a26469706673582212202b1f85844f9fcdea648e6164c4cd34e09a2436167d8b4c623bd221cd771e99a764736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class StrSimpleStaking__factory extends ethers_1.ContractFactory {
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
exports.StrSimpleStaking__factory = StrSimpleStaking__factory;
StrSimpleStaking__factory.bytecode = _bytecode;
StrSimpleStaking__factory.abi = _abi;
//# sourceMappingURL=StrSimpleStaking__factory.js.map