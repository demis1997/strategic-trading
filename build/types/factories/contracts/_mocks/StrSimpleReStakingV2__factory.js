"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrSimpleReStakingV2__factory = void 0;
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
                internalType: "uint256",
                name: "_newValue",
                type: "uint256",
            },
        ],
        name: "addedMethodStrategyV2",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "addedVariableStrategyV2",
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
const _bytecode = "0x608060405234801561001057600080fd5b506134f8806100206000396000f3fe6080604052600436106102765760003560e01c80637e531a391161014f578063b3967113116100c1578063e173ad251161007a578063e173ad25146107c4578063e2868d33146107d9578063ea9853d0146107ee578063eb0a7fd01461080e578063ed79f7121461082e578063edd4604c1461084357600080fd5b8063b3967113146106f9578063b89f319d1461072f578063d547741f1461074f578063d9d12ad01461076f578063ddd0638c1461078f578063df5af13f146107af57600080fd5b8063940997f711610113578063940997f7146106595780639c56266614610679578063a016b2cd1461068f578063a217fddf146106af578063a4d1e2ca146106c4578063a78a0158146106e457600080fd5b80637e531a39146105a15780637f4879aa146105ee5780638456cb591461060457806385535cc51461061957806391d148541461063957600080fd5b80633f4ba83a116101e85780635c975abb116101ac5780635c975abb146104da5780635e5a24a4146104ff5780636371d6bb14610521578063642024e41461054157806372cfcaad14610561578063754ae09c1461058157600080fd5b80633f4ba83a14610426578063429e6e0f1461043b578063430bf08a1461045b5780634a28ff241461047b5780635c786892146104ba57600080fd5b80631f696df81161023a5780631f696df81461034e578063248a9ca314610386578063254c72a2146103a65780632f2ff15d146103c657806333dc7f07146103e657806336568abe1461040657600080fd5b806301ffc9a7146102825780630690416a146102b75780630a69ba4d146102d95780630fed40b0146103075780631ac5d67d1461032757600080fd5b3661027d57005b600080fd5b34801561028e57600080fd5b506102a261029d3660046129ac565b610858565b60405190151581526020015b60405180910390f35b3480156102c357600080fd5b506102d76102d23660046129f2565b61088f565b005b3480156102e557600080fd5b506102f96102f4366004612a25565b610926565b6040519081526020016102ae565b34801561031357600080fd5b506102d7610322366004612b86565b610b36565b34801561033357600080fd5b5061033c600281565b60405160ff90911681526020016102ae565b34801561035a57600080fd5b5061036e610369366004612c3a565b610d78565b6040516001600160a01b0390911681526020016102ae565b34801561039257600080fd5b506102f96103a1366004612c3a565b610da2565b3480156103b257600080fd5b506102d76103c13660046129f2565b610dc4565b3480156103d257600080fd5b506102d76103e1366004612c53565b610e65565b3480156103f257600080fd5b5060025461036e906001600160a01b031681565b34801561041257600080fd5b506102d7610421366004612c53565b610e87565b34801561043257600080fd5b506102d7610ebf565b34801561044757600080fd5b5060035461036e906001600160a01b031681565b34801561046757600080fd5b5060045461036e906001600160a01b031681565b34801561048757600080fd5b5061049b610496366004612c83565b610ed5565b604080516001600160a01b0390931683526020830191909152016102ae565b3480156104c657600080fd5b506102d76104d5366004612cc4565b611005565b3480156104e657600080fd5b506000805160206134a38339815191525460ff166102a2565b34801561050b57600080fd5b506102f960008051602061346383398151915281565b34801561052d57600080fd5b506102f961053c366004612c3a565b61101f565b34801561054d57600080fd5b5061049b61055c366004612cf9565b611214565b34801561056d57600080fd5b506102f961057c366004612d4a565b61146a565b34801561058d57600080fd5b506102d761059c366004612cc4565b6115e8565b3480156105ad57600080fd5b506105e160405180604001604052806014815260200173119d5b98dd1a5bdb881b9bdd08185b1b1bddd95960621b81525081565b6040516102ae9190612dab565b3480156105fa57600080fd5b506102f960055481565b34801561061057600080fd5b506102d76115fe565b34801561062557600080fd5b506102d76106343660046129f2565b611611565b34801561064557600080fd5b506102a2610654366004612c53565b6116a2565b34801561066557600080fd5b506102f9610674366004612c3a565b6116da565b34801561068557600080fd5b506102f9600a5481565b34801561069b57600080fd5b506102d76106aa366004612dbe565b6118bf565b3480156106bb57600080fd5b506102f9600081565b3480156106d057600080fd5b5061036e6106df366004612c3a565b611974565b3480156106f057600080fd5b5061049b611984565b34801561070557600080fd5b5061036e6107143660046129f2565b6008602052600090815260409020546001600160a01b031681565b34801561073b57600080fd5b5060015461036e906001600160a01b031681565b34801561075b57600080fd5b506102d761076a366004612c53565b6119cd565b34801561077b57600080fd5b506102d761078a366004612c3a565b600a55565b34801561079b57600080fd5b506102d76107aa366004612e00565b6119e9565b3480156107bb57600080fd5b506105e1611c19565b3480156107d057600080fd5b506105e1611ca7565b3480156107e557600080fd5b506102f9611cb4565b3480156107fa57600080fd5b506102d76108093660046129f2565b611cc4565b34801561081a57600080fd5b506102d7610829366004612ecd565b611d65565b34801561083a57600080fd5b5061036e611e63565b34801561084f57600080fd5b5061033c600181565b60006001600160e01b03198216637965db0b60e01b148061088957506301ffc9a760e01b6001600160e01b03198316145b92915050565b600061089a81611e6d565b6108cf82604051806040016040528060138152602001726c6971756964546f6b656e416464726573735f60681b815250611e77565b6040516001600160a01b038316907f4245d51ab06b77fea049f6e1eab0e31b343fc4c1e9fe7774373362c37eb2034490600090a250600180546001600160a01b0319166001600160a01b0392909216919091179055565b6001546000906001600160a01b038481169116148061095257506002546001600160a01b038481169116145b6109a35760405162461bcd60e51b815260206004820152601760248201527f496e76616c696420746f6b656e2072657175657374656400000000000000000060448201526064015b60405180910390fd5b8160ff16600114806109b857508160ff166002145b610a045760405162461bcd60e51b815260206004820152601b60248201527f496e76616c696420736f7572636520746f206765742070726963650000000000604482015260640161099a565b6001600160a01b03808416600090815260086020526040812054909116908115610a9a576000826001600160a01b031663feaf968c6040518163ffffffff1660e01b815260040160a060405180830381865afa158015610a68573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a8c9190612f15565b50919450610b2e9350505050565b60008460ff16600214610ab457610aaf611ea0565b610abc565b610abc611ede565b604051630681320d60e51b81526001600160a01b0388811660048301529192509082169063d02641a090602401602060405180830381865afa158015610b06573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b2a9190612f65565b9150505b949350505050565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a008054600160401b810460ff16159067ffffffffffffffff16600081158015610b7c5750825b905060008267ffffffffffffffff166001148015610b995750303b155b905081158015610ba7575080155b15610bc55760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff191660011785558315610bef57845460ff60401b1916600160401b1785555b610c1e8b6040518060400160405280600d81526020016c7661756c74416464726573735f60981b815250611e77565b610c538a604051806040016040528060138152602001726c6971756964546f6b656e416464726573735f60681b815250611e77565b610cb787878080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505060408051808201909152600d81526c73747261746567794e616d655f60981b60208201529150611ef49050565b610cbf611f18565b610cca600033611f22565b50610cd6896002611fc7565b610ce18860016120fc565b600480546001600160a01b0319166001600160a01b038d161790556000610d09878983613002565b50600180546001600160a01b0319166001600160a01b038c161790558315610d6b57845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b5050505050505050505050565b60068181548110610d8857600080fd5b6000918252602090912001546001600160a01b0316905081565b6000908152600080516020613483833981519152602052604090206001015490565b6000610dcf81611e6d565b610e0e826040518060400160405280601a81526020017f777261707065644c6971756964546f6b656e416464726573735f000000000000815250611e77565b6040516001600160a01b038316907fce01361fe7ff662213b751c96882886f856789c4049c51e47af22049de7976b890600090a250600280546001600160a01b0319166001600160a01b0392909216919091179055565b610e6e82610da2565b610e7781611e6d565b610e818383611f22565b50505050565b6001600160a01b0381163314610eb05760405163334bd91960e11b815260040160405180910390fd5b610eba828261223b565b505050565b6000610eca81611e6d565b610ed26122b7565b50565b600080610ee0612317565b600080516020613463833981519152610ef881611e6d565b610f23866040518060400160405280600981526020016872656365697665725f60b81b815250611e77565b610f52846040518060400160405280600d81526020016c617373657473416d6f756e745f60981b815250612348565b610f7a856040518060400160405280600681526020016561737365745f60d01b815250611e77565b600080610f8888888861236b565b9150915080600003610fad57604051637efa1e0f60e11b815260040160405180910390fd5b604080516001600160a01b03808b168252841660208201529081018290527ff69538dab01a66f366bf2dbbe6bea4efee94973f6d5d8d70d19dab18c1b3e8b19060600160405180910390a19097909650945050505050565b600061101081611e6d565b61101b8260016120fc565b5050565b600060008051602061346383398151915261103981611e6d565b6002546001600160a01b03166110865760405162461bcd60e51b81526020600482015260126024820152712737903232b334b732b2103bb930b83832b960711b604482015260640161099a565b60015460025460405163095ea7b360e01b81526001600160a01b0391821660048201526024810186905291169063095ea7b3906044016020604051808303816000875af11580156110db573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110ff91906130c3565b50600254604051630ea598cb60e41b8152600481018590526000916001600160a01b03169063ea598cb0906024016020604051808303816000875af115801561114c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111709190612f65565b9050806000036111b0576002546040516333ece22360e21b81526001600160a01b039091166004820152602481018590526001604482015260640161099a565b600154600254604080516001600160a01b039384168152602081018890529290911690820152606081018290527fda542a6430bf8482eb425b35bad6701f112540783af4af76389552a2d8902e59906080015b60405180910390a191505b50919050565b60008061121f612317565b60008051602061346383398151915261123781611e6d565b611260876040518060400160405280600781526020016673656e6465725f60c81b815250611e77565b61128b866040518060400160405280600981526020016872656365697665725f60b81b815250611e77565b6112b3856040518060400160405280600681526020016561737365745f60d01b815250611e77565b6112e2846040518060400160405280600d81526020016c617373657473416d6f756e745f60981b815250612348565b600160006112ee6127d6565b9050600080611302838c8c8c8c60006127ec565b915091508060000361132a57604051630eeb421160e21b81526004810185905260240161099a565b60029350611336611ea0565b60405163095ea7b360e01b81526001600160a01b038083166004830152602482018490529194509083169063095ea7b3906044016020604051808303816000875af1158015611389573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113ad91906130c3565b506000806113c0853030878760006127ec565b9150915080600014806113e157506001546001600160a01b03838116911614155b1561140257604051630eeb421160e21b81526004810187905260240161099a565b816001600160a01b03168b6001600160a01b03167f59b7a96ada3a44d05c501ea0e559b7033ce7bd281bf88b061ceb5b29ad4a9fa28c84604051611450929190918252602082015260400190565b60405180910390a3909c909b509950505050505050505050565b600060008051602061346383398151915261148481611e6d565b8260ff166001148061149957508260ff166002145b6114e55760405162461bcd60e51b815260206004820152601b60248201527f496e76616c696420736f7572636520746f206765742070726963650000000000604482015260640161099a565b6001546000906114fe906001600160a01b031685610926565b6001546040516370a0823160e01b8152306004820152919250670de0b6b3a76400009183916001600160a01b0316906370a0823190602401602060405180830381865afa158015611553573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115779190612f65565b61158191906130fb565b61158b9190613112565b6005819055600154604080516001600160a01b0390921682526020820192909252308183015290517f662f619155fcceea17128ce9cf93a4df288a2427524b2eabdf40a5013d9e94f99181900360600190a1505060055492915050565b60006115f381611e6d565b61101b826002611fc7565b600061160981611e6d565b610ed261287f565b600061161c81611e6d565b61164b826040518060400160405280600d81526020016c7661756c74416464726573735f60981b815250611e77565b6040516001600160a01b038316907f5c06d966572db101b61cacf1a095f31609e34873f11016fc5cb333651e969f6790600090a250600480546001600160a01b0319166001600160a01b0392909216919091179055565b6000918252600080516020613483833981519152602090815260408084206001600160a01b0393909316845291905290205460ff1690565b60006000805160206134638339815191526116f481611e6d565b6002546001600160a01b03166117415760405162461bcd60e51b81526020600482015260126024820152712737903232b334b732b2103bb930b83832b960711b604482015260640161099a565b60025460405163095ea7b360e01b81526001600160a01b0390911660048201819052602482018590529063095ea7b3906044016020604051808303816000875af1158015611793573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117b791906130c3565b50600254604051636f074d1f60e11b8152600481018590526000916001600160a01b03169063de0e9a3e906024016020604051808303816000875af1158015611804573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118289190612f65565b905080600003611868576002546040516333ece22360e21b81526001600160a01b039091166004820152602481018590526000604482015260640161099a565b600254600154604080516001600160a01b039384168152602081018890529290911690820152606081018290527f7687e177cae37c3bc6b45449595322baa1bcb203db50ebab44854268528e8c3190608001611203565b60006118ca81611e6d565b61192e83838080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505060408051808201909152600d81526c73747261746567794e616d655f60981b60208201529150611ef49050565b7f21ce9ce25f0f85766c680deb376fbea42cd6d6911f217c0d89f14c439b84fcfd838360405161195f929190613134565b60405180910390a16000610e81838583613002565b60078181548110610d8857600080fd5b60008060405180604001604052806014815260200173119d5b98dd1a5bdb881b9bdd08185b1b1bddd95960621b81525060405162461bcd60e51b815260040161099a9190612dab565b6119d682610da2565b6119df81611e6d565b610e81838361223b565b60006119f481611e6d565b825182516002821015611a1a57604051630468e0af60e41b815260040160405180910390fd5b611a25816001613163565b8214611a4457604051630d6c3bc160e41b815260040160405180910390fd5b60005b82811015611a9957611a91868281518110611a6457611a64613176565b602002602001015160405180604001604052806007815260200166746f6b656e735f60c81b815250611e77565b600101611a47565b5060005b81811015611af257611aea858281518110611aba57611aba613176565b602002602001015162ffffff1660405180604001604052806005815260200164666565735f60d81b815250612348565b600101611a9d565b5084600081518110611b0657611b06613176565b6020026020010151604051602001611b36919060609190911b6bffffffffffffffffffffffff1916815260140190565b60405160208183030381529060405260099081611b53919061318c565b5060005b81811015611bd9576009858281518110611b7357611b73613176565b602002602001015187836001611b899190613163565b81518110611b9957611b99613176565b6020026020010151604051602001611bb39392919061324c565b60405160208183030381529060405260099081611bd0919061318c565b50600101611b57565b507fa0ddd263f8966deaa9209d36ecf63770a4baf7f627d164775a94f808930cd0486009604051611c0a919061336a565b60405180910390a15050505050565b60098054611c2690612f7e565b80601f0160208091040260200160405190810160405280929190818152602001828054611c5290612f7e565b8015611c9f5780601f10611c7457610100808354040283529160200191611c9f565b820191906000526020600020905b815481529060010190602001808311611c8257829003601f168201915b505050505081565b60008054611c2690612f7e565b6000611cbf60055490565b905090565b6000611ccf81611e6d565b611d0e826040518060400160405280601881526020017f77697468647261775374726174656779416464726573735f0000000000000000815250611e77565b6040516001600160a01b038316907f28548fb82baba9340b788ecc4911d241c9508404c350e6964e447fbf8d62c12890600090a250600380546001600160a01b0319166001600160a01b0392909216919091179055565b6000611d7081611e6d565b6001546001600160a01b0384811691161480611d9957506002546001600160a01b038481169116145b8015611dad57506001600160a01b03831615155b611df15760405162461bcd60e51b8152602060048201526015602482015274125b9d985b1a59081d1bdad95b88195b9d195c9959605a1b604482015260640161099a565b604080516001600160a01b038086168252841660208201527fd2d8394cf7549a5ddbc2ba3dd7b2de8d53c891472d1f2907008ed6a10045fdae910160405180910390a1506001600160a01b03918216600090815260086020526040902080546001600160a01b03191691909216179055565b6000611cbf6127d6565b610ed281336128c8565b6001600160a01b03821661101b578060405163eac0d38960e01b815260040161099a9190612dab565b6006805460009190611eb49060019061337d565b81548110611ec457611ec4613176565b6000918252602090912001546001600160a01b0316919050565b60006007600081548110611ec457611ec4613176565b600082511161101b57806040516318a996bb60e21b815260040161099a9190612dab565b611f20612901565b565b6000600080516020613483833981519152611f3d84846116a2565b611fbd576000848152602082815260408083206001600160a01b03871684529091529020805460ff19166001179055611f733390565b6001600160a01b0316836001600160a01b0316857f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a46001915050610889565b6000915050610889565b815160ff821681146120055760405163cb97bcb160e01b81526020600482015260066024820152656465706c6f7960d01b604482015260640161099a565b6120116006600061297a565b7f7e68ba9b3bbcc418714dcc03de2c047ccdb19978700780676f593eb95af7f680836040516120409190613390565b60405180910390a160005b81811015610e81576120a384828151811061206857612068613176565b60200260200101516040518060400160405280601581526020017461646170746572734465706c6f79506174685f5b5d60581b815250611e77565b60068482815181106120b7576120b7613176565b60209081029190910181015182546001808201855560009485529290932090920180546001600160a01b0319166001600160a01b03909316929092179091550161204b565b815160ff8216811461213c5760405163cb97bcb160e01b8152602060048201526008602482015267776974686472617760c01b604482015260640161099a565b6121486007600061297a565b7fdb2c7c26f26f22897028e2e018c1967eef4170d6a2c476a373823d8639da73ec836040516121779190613390565b60405180910390a160005b81811015610e81576121e284828151811061219f5761219f613176565b60200260200101516040518060400160405280601781526020017f61646170746572735769746864726177506174685f5b5d000000000000000000815250611e77565b60078482815181106121f6576121f6613176565b60209081029190910181015182546001808201855560009485529290932090920180546001600160a01b0319166001600160a01b039093169290921790915501612182565b600060008051602061348383398151915261225684846116a2565b15611fbd576000848152602082815260408083206001600160a01b0387168085529252808320805460ff1916905551339287917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a46001915050610889565b6122bf61294a565b6000805160206134a3833981519152805460ff191681557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a150565b6000805160206134a38339815191525460ff1615611f205760405163d93c066560e01b815260040160405180910390fd5b8160000361101b57806040516303b3e63560e41b815260040161099a9190612dab565b600254600090819081906001600160a01b0316612393576001546001600160a01b03166123a0565b6002546001600160a01b03165b905060006123af826002610926565b90506000670de0b6b3a76400006123c4611ede565b6001600160a01b031663fc9cee3c6040518163ffffffff1660e01b8152600401602060405180830381865afa158015612401573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906124259190612f65565b61243790670de0b6b3a7640000613163565b8361244a89670de0b6b3a76400006130fb565b6124549190613112565b61245e91906130fb565b6124689190613112565b6002549091506000906001600160a01b039081169085160361257f5760015460009061249e906001600160a01b03166002610926565b6124a884866130fb565b6124b29190613112565b6001546040516370a0823160e01b81523060048201529192506001600160a01b0316906370a0823190602401602060405180830381865afa1580156124fb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061251f9190612f65565b81111561256e5760405162461bcd60e51b815260206004820152601960248201527f4e6f7420656e6f75676820746f6b656e7320746f207772617000000000000000604482015260640161099a565b6125778161101f565b915050612582565b50805b6040516370a0823160e01b81523060048201526000906001600160a01b038616906370a0823190602401602060405180830381865afa1580156125c9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906125ed9190612f65565b90508082111561261a5760405163682324e760e11b8152600481018290526024810183905260440161099a565b846001600160a01b031663095ea7b3612631611ede565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602481018590526044016020604051808303816000875af115801561267e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906126a291906130c3565b506000806126ae611ede565b6001600160a01b0316636a39fe60308e8e8e8c8a60096040518863ffffffff1660e01b81526004016126e697969594939291906133dd565b60408051808303816000875af1158015612704573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906127289190613434565b60025491935091506001600160a01b03908116908816036127c5576002546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a0823190602401602060405180830381865afa15801561278c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906127b09190612f65565b905080156127c3576127c1816116da565b505b505b909b909a5098505050505050505050565b60006006600081548110611ec457611ec4613176565b604051635354c2b160e01b81526001600160a01b038681166004830152858116602483015284811660448301526064820184905282151560848301526000918291829182918b1690635354c2b19060a40160408051808303816000875af115801561285b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906127c59190613434565b612887612317565b6000805160206134a3833981519152805460ff191660011781557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258336122f9565b6128d282826116a2565b61101b5760405163e2517d3f60e01b81526001600160a01b03821660048201526024810183905260440161099a565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0054600160401b900460ff16611f2057604051631afcd79f60e31b815260040160405180910390fd5b6000805160206134a38339815191525460ff16611f2057604051638dfc202b60e01b815260040160405180910390fd5b5080546000825590600052602060002090810190610ed291905b808211156129a85760008155600101612994565b5090565b6000602082840312156129be57600080fd5b81356001600160e01b0319811681146129d657600080fd5b9392505050565b6001600160a01b0381168114610ed257600080fd5b600060208284031215612a0457600080fd5b81356129d6816129dd565b803560ff81168114612a2057600080fd5b919050565b60008060408385031215612a3857600080fd5b8235612a43816129dd565b9150612a5160208401612a0f565b90509250929050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715612a9957612a99612a5a565b604052919050565b600067ffffffffffffffff821115612abb57612abb612a5a565b5060051b60200190565b600082601f830112612ad657600080fd5b81356020612aeb612ae683612aa1565b612a70565b8083825260208201915060208460051b870101935086841115612b0d57600080fd5b602086015b84811015612b32578035612b25816129dd565b8352918301918301612b12565b509695505050505050565b60008083601f840112612b4f57600080fd5b50813567ffffffffffffffff811115612b6757600080fd5b602083019150836020828501011115612b7f57600080fd5b9250929050565b60008060008060008060a08789031215612b9f57600080fd5b8635612baa816129dd565b95506020870135612bba816129dd565b9450604087013567ffffffffffffffff80821115612bd757600080fd5b612be38a838b01612ac5565b95506060890135915080821115612bf957600080fd5b612c058a838b01612ac5565b94506080890135915080821115612c1b57600080fd5b50612c2889828a01612b3d565b979a9699509497509295939492505050565b600060208284031215612c4c57600080fd5b5035919050565b60008060408385031215612c6657600080fd5b823591506020830135612c78816129dd565b809150509250929050565b600080600060608486031215612c9857600080fd5b8335612ca3816129dd565b92506020840135612cb3816129dd565b929592945050506040919091013590565b600060208284031215612cd657600080fd5b813567ffffffffffffffff811115612ced57600080fd5b610b2e84828501612ac5565b60008060008060808587031215612d0f57600080fd5b8435612d1a816129dd565b93506020850135612d2a816129dd565b92506040850135612d3a816129dd565b9396929550929360600135925050565b600060208284031215612d5c57600080fd5b6129d682612a0f565b6000815180845260005b81811015612d8b57602081850181015186830182015201612d6f565b506000602082860101526020601f19601f83011685010191505092915050565b6020815260006129d66020830184612d65565b60008060208385031215612dd157600080fd5b823567ffffffffffffffff811115612de857600080fd5b612df485828601612b3d565b90969095509350505050565b60008060408385031215612e1357600080fd5b823567ffffffffffffffff80821115612e2b57600080fd5b612e3786838701612ac5565b9350602091508185013581811115612e4e57600080fd5b85019050601f81018613612e6157600080fd5b8035612e6f612ae682612aa1565b81815260059190911b82018301908381019088831115612e8e57600080fd5b928401925b82841015612ebe57833562ffffff81168114612eaf5760008081fd5b82529284019290840190612e93565b80955050505050509250929050565b60008060408385031215612ee057600080fd5b8235612eeb816129dd565b91506020830135612c78816129dd565b805169ffffffffffffffffffff81168114612a2057600080fd5b600080600080600060a08688031215612f2d57600080fd5b612f3686612efb565b9450602086015193506040860151925060608601519150612f5960808701612efb565b90509295509295909350565b600060208284031215612f7757600080fd5b5051919050565b600181811c90821680612f9257607f821691505b60208210810361120e57634e487b7160e01b600052602260045260246000fd5b601f821115610eba576000816000526020600020601f850160051c81016020861015612fdb5750805b601f850160051c820191505b81811015612ffa57828155600101612fe7565b505050505050565b67ffffffffffffffff83111561301a5761301a612a5a565b61302e836130288354612f7e565b83612fb2565b6000601f841160018114613062576000851561304a5750838201355b600019600387901b1c1916600186901b1783556130bc565b600083815260209020601f19861690835b828110156130935786850135825560209485019460019092019101613073565b50868210156130b05760001960f88860031b161c19848701351681555b505060018560011b0183555b5050505050565b6000602082840312156130d557600080fd5b815180151581146129d657600080fd5b634e487b7160e01b600052601160045260246000fd5b8082028115828204841417610889576108896130e5565b60008261312f57634e487b7160e01b600052601260045260246000fd5b500490565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b80820180821115610889576108896130e5565b634e487b7160e01b600052603260045260246000fd5b815167ffffffffffffffff8111156131a6576131a6612a5a565b6131ba816131b48454612f7e565b84612fb2565b602080601f8311600181146131ef57600084156131d75750858301515b600019600386901b1c1916600185901b178555612ffa565b600085815260208120601f198616915b8281101561321e578886015182559484019460019091019084016131ff565b508582101561323c5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b600080855461325a81612f7e565b600182811680156132725760018114613287576132b6565b60ff19841687528215158302870194506132b6565b8960005260208060002060005b858110156132ad5781548a820152908401908201613294565b50505082870194505b5050505060e89490941b6001600160e81b0319168452505060601b6bffffffffffffffffffffffff19166003820152601701919050565b600081546132fa81612f7e565b80855260206001838116801561331757600181146133315761335f565b60ff1985168884015283151560051b88018301955061335f565b866000528260002060005b858110156133575781548a820186015290830190840161333c565b890184019650505b505050505092915050565b6020815260006129d660208301846132ed565b81810381811115610889576108896130e5565b6020808252825182820181905260009190848201906040850190845b818110156133d15783516001600160a01b0316835292840192918401916001016133ac565b50909695505050505050565b6001600160a01b03888116825287811660208301528681166040830152606082018690528416608082015260a0810183905260e060c08201819052600090613427908301846132ed565b9998505050505050505050565b6000806040838503121561344757600080fd5b8251613452816129dd565b602093909301519294929350505056fed1473398bb66596de5d1ea1fc8e303ff2ac23265adc9144b1b52065dc4f0934b02dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b626800cd5ed15c6e187e77e9aee88184c21f4f2182ab5827cb3b7e07fbedcd63f03300a2646970667358221220577e5a93d9b7c04aac1ab2bd482c1c1ffdd35f5589081db83c7ecc42b7dc479664736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class StrSimpleReStakingV2__factory extends ethers_1.ContractFactory {
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
exports.StrSimpleReStakingV2__factory = StrSimpleReStakingV2__factory;
StrSimpleReStakingV2__factory.bytecode = _bytecode;
StrSimpleReStakingV2__factory.abi = _abi;
//# sourceMappingURL=StrSimpleReStakingV2__factory.js.map