"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vault__factory = void 0;
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
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "allowance",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "needed",
                type: "uint256",
            },
        ],
        name: "ERC20InsufficientAllowance",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
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
        name: "ERC20InsufficientBalance",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "approver",
                type: "address",
            },
        ],
        name: "ERC20InvalidApprover",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "receiver",
                type: "address",
            },
        ],
        name: "ERC20InvalidReceiver",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "ERC20InvalidSender",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
        ],
        name: "ERC20InvalidSpender",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "receiver",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "assets",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "max",
                type: "uint256",
            },
        ],
        name: "ERC4626ExceededMaxDeposit",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "receiver",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "shares",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "max",
                type: "uint256",
            },
        ],
        name: "ERC4626ExceededMaxMint",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "shares",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "max",
                type: "uint256",
            },
        ],
        name: "ERC4626ExceededMaxRedeem",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "assets",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "max",
                type: "uint256",
            },
        ],
        name: "ERC4626ExceededMaxWithdraw",
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
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "accountBalance",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "requestedAmount",
                type: "uint256",
            },
        ],
        name: "InsufficientAssetsToWithdraw",
        type: "error",
    },
    {
        inputs: [],
        name: "InsufficientFundsForAssetsDeployment",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "vaultAsset",
                type: "address",
            },
            {
                internalType: "address",
                name: "returnedAsset",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "assetsAmount",
                type: "uint256",
            },
        ],
        name: "InvalidAssetReturned",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidInitialization",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidTarget",
        type: "error",
    },
    {
        inputs: [],
        name: "MathOverflowedMulDiv",
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
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
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
            {
                indexed: false,
                internalType: "uint256",
                name: "pendingDepositAssets",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "caller",
                type: "address",
            },
        ],
        name: "AssetsDeployed",
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
                name: "owner",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "assets",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "shares",
                type: "uint256",
            },
        ],
        name: "Deposit",
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
                indexed: false,
                internalType: "uint256",
                name: "tokenAmount",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "caller",
                type: "address",
            },
        ],
        name: "HarvestExecuted",
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
                internalType: "bool",
                name: "status",
                type: "bool",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "target",
                type: "uint256",
            },
        ],
        name: "LiveValuationSet",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "newAddress",
                type: "address",
            },
        ],
        name: "MasterTokenAddressSet",
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
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Transfer",
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
                internalType: "uint8",
                name: "valuationSource",
                type: "uint8",
            },
        ],
        name: "ValuationSourceSet",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "newAddress",
                type: "address",
            },
        ],
        name: "VaultStrategyAddressSet",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "vaultValuation",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "deployedAssetsValue",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "pendingDepositAssets",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "caller",
                type: "address",
            },
        ],
        name: "VaultValuationUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "newAddress",
                type: "address",
            },
        ],
        name: "VaultsRegistryAddressSet",
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
                name: "receiver",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "assets",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "shares",
                type: "uint256",
            },
        ],
        name: "Withdraw",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "newAddress",
                type: "address",
            },
        ],
        name: "WithdrawStrategyAddressSet",
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
        name: "MASTER_TOKEN_ROLE",
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
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
        ],
        name: "allowance",
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
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "asset",
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
                name: "account",
                type: "address",
            },
        ],
        name: "balanceOf",
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
                internalType: "uint256",
                name: "shares",
                type: "uint256",
            },
        ],
        name: "convertToAssets",
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
                internalType: "uint256",
                name: "assets",
                type: "uint256",
            },
        ],
        name: "convertToShares",
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
        name: "decimals",
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
        name: "deployAssets",
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
                internalType: "uint256",
                name: "assets_",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "receiver_",
                type: "address",
            },
        ],
        name: "deposit",
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
        inputs: [],
        name: "harvest",
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
                name: "underlyingTokenAddress_",
                type: "address",
            },
            {
                internalType: "address",
                name: "masterTokenAddress_",
                type: "address",
            },
            {
                internalType: "address",
                name: "vaultsRegistryAddress_",
                type: "address",
            },
            {
                internalType: "address",
                name: "ownerAddress_",
                type: "address",
            },
            {
                internalType: "string",
                name: "sharesName_",
                type: "string",
            },
            {
                internalType: "string",
                name: "sharesSymbol_",
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
        name: "liveValuationOnDeposit",
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
        name: "liveValuationOnWithdraw",
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
        name: "masterTokenAddress",
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
        ],
        name: "maxDeposit",
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
        name: "maxMint",
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
                name: "owner",
                type: "address",
            },
        ],
        name: "maxRedeem",
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
                name: "owner",
                type: "address",
            },
        ],
        name: "maxWithdraw",
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
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "mint",
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
        name: "name",
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
        name: "pendingDepositAssets",
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
                internalType: "uint256",
                name: "assets",
                type: "uint256",
            },
        ],
        name: "previewDeposit",
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
                internalType: "uint256",
                name: "shares",
                type: "uint256",
            },
        ],
        name: "previewMint",
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
                internalType: "uint256",
                name: "shares",
                type: "uint256",
            },
        ],
        name: "previewRedeem",
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
                internalType: "uint256",
                name: "assets",
                type: "uint256",
            },
        ],
        name: "previewWithdraw",
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
                internalType: "uint256",
                name: "shares_",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "owner_",
                type: "address",
            },
            {
                internalType: "address",
                name: "receiver_",
                type: "address",
            },
        ],
        name: "redeem",
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
                internalType: "bool",
                name: "status_",
                type: "bool",
            },
            {
                internalType: "uint256",
                name: "target_",
                type: "uint256",
            },
        ],
        name: "setLiveValuation",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "masterTokenAddress_",
                type: "address",
            },
        ],
        name: "setMasterTokenAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "valuationSource_",
                type: "uint8",
            },
        ],
        name: "setValuationSource",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "vaultStrategyAddress_",
                type: "address",
            },
        ],
        name: "setVaultStrategyAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "vaultsRegistryAddress_",
                type: "address",
            },
        ],
        name: "setVaultsRegistryAddress",
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
        name: "symbol",
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
        name: "totalAssets",
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
        name: "totalSupply",
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
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "transfer",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
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
                internalType: "uint8",
                name: "valuationSource_",
                type: "uint8",
            },
        ],
        name: "updateVaultValuation",
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
        name: "valuationSource",
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
        name: "vaultStrategyAddress",
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
        name: "vaultsRegistryAddress",
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
                name: "assets_",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "owner_",
                type: "address",
            },
            {
                internalType: "address",
                name: "receiver_",
                type: "address",
            },
        ],
        name: "withdraw",
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
        stateMutability: "payable",
        type: "receive",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b5061354b806100206000396000f3fe60806040526004361061036f5760003560e01c80635e5a24a4116101c6578063b3d7f6b9116100f7578063d547741f11610095578063dd62ed3e1161006f578063dd62ed3e14610a11578063e6a00fef14610a31578063ea9853d014610a52578063ef8b30f71461095057600080fd5b8063d547741f146109b1578063d905777e146109d1578063da9b759d146109f157600080fd5b8063c63d75b6116100d1578063c63d75b61461066b578063c6e6f59214610950578063ce96cb7714610970578063cef147191461099057600080fd5b8063b3d7f6b9146108f0578063b460af9414610910578063ba0876521461093057600080fd5b806391d148541161016457806395d89b411161013e57806395d89b4114610886578063964455eb1461089b578063a217fddf146108bb578063a9059cbb146108d057600080fd5b806391d14854146108265780639317c2001461084657806394bf804d1461086657600080fd5b806370a08231116101a057806370a0823114610791578063794c9599146107b15780637e531a39146107d15780638456cb591461081157600080fd5b80635e5a24a41461071d578063654aeebf146107515780636e553f651461077157600080fd5b80632fe447bb116102a0578063402d267d1161023e5780634cdad506116102185780634cdad506146104295780635489becc146106c25780635b48b6b8146106d85780635c975abb146106f857600080fd5b8063402d267d1461066b578063429e6e0f1461068d5780634641257d146106ad57600080fd5b806336568abe1161027a57806336568abe1461060157806338d52e0f1461062157806339e3aca1146106365780633f4ba83a1461065657600080fd5b80632fe447bb146105995780633129a242146105cc578063313ce567146105ec57600080fd5b80630e1b456c1161030d57806318160ddd116102e757806318160ddd1461050557806323b872dd14610539578063248a9ca3146105595780632f2ff15d1461057957600080fd5b80630e1b456c1461048957806313c5977d146104ab57806316c2501e146104cd57600080fd5b806306fdde031161034957806306fdde031461040757806307a2d13a14610429578063095ea7b3146104495780630a28a4771461046957600080fd5b806301e1d1141461037b57806301ffc9a7146103a3578063037897d6146103d357600080fd5b3661037657005b600080fd5b34801561038757600080fd5b50610390610a72565b6040519081526020015b60405180910390f35b3480156103af57600080fd5b506103c36103be366004612d78565b610b41565b604051901515815260200161039a565b3480156103df57600080fd5b506103e8610b78565b604080516001600160a01b03909316835260208301919091520161039a565b34801561041357600080fd5b5061041c610e83565b60405161039a9190612dc6565b34801561043557600080fd5b50610390610444366004612df9565b610f46565b34801561045557600080fd5b506103c3610464366004612e27565b610f53565b34801561047557600080fd5b50610390610484366004612df9565b610f6b565b34801561049557600080fd5b5061039060008051602061349683398151915281565b3480156104b757600080fd5b506104cb6104c6366004612e61565b610f78565b005b3480156104d957600080fd5b506000546104ed906001600160a01b031681565b6040516001600160a01b03909116815260200161039a565b34801561051157600080fd5b507f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace0254610390565b34801561054557600080fd5b506103c3610554366004612e7f565b61102f565b34801561056557600080fd5b50610390610574366004612df9565b611055565b34801561058557600080fd5b506104cb610594366004612ec0565b611077565b3480156105a557600080fd5b506003546105ba90600160a01b900460ff1681565b60405160ff909116815260200161039a565b3480156105d857600080fd5b506104cb6105e7366004612ef0565b611099565b3480156105f857600080fd5b506105ba611132565b34801561060d57600080fd5b506104cb61061c366004612ec0565b611164565b34801561062d57600080fd5b506104ed611197565b34801561064257600080fd5b506002546104ed906001600160a01b031681565b34801561066257600080fd5b506104cb6111b3565b34801561067757600080fd5b50610390610686366004612ef0565b5060001990565b34801561069957600080fd5b506003546104ed906001600160a01b031681565b3480156106b957600080fd5b506103e86111c9565b3480156106ce57600080fd5b5061039060045481565b3480156106e457600080fd5b506104cb6106f3366004612ef0565b6112e7565b34801561070457600080fd5b506000805160206134f68339815191525460ff166103c3565b34801561072957600080fd5b506103907fd1473398bb66596de5d1ea1fc8e303ff2ac23265adc9144b1b52065dc4f0934b81565b34801561075d57600080fd5b506104cb61076c366004612f0d565b611381565b34801561077d57600080fd5b5061039061078c366004612ec0565b61143f565b34801561079d57600080fd5b506103906107ac366004612ef0565b611504565b3480156107bd57600080fd5b506104cb6107cc366004612ef0565b61152c565b3480156107dd57600080fd5b5061041c60405180604001604052806014815260200173119d5b98dd1a5bdb881b9bdd08185b1b1bddd95960621b81525081565b34801561081d57600080fd5b506104cb6115c3565b34801561083257600080fd5b506103c3610841366004612ec0565b6115d6565b34801561085257600080fd5b506104cb610861366004612fd3565b61160e565b34801561087257600080fd5b50610390610881366004612ec0565b6118f2565b34801561089257600080fd5b5061041c611936565b3480156108a757600080fd5b506103906108b6366004612f0d565b611975565b3480156108c757600080fd5b50610390600081565b3480156108dc57600080fd5b506103c36108eb366004612e27565b611b14565b3480156108fc57600080fd5b5061039061090b366004612df9565b611b22565b34801561091c57600080fd5b5061039061092b366004613080565b611b2f565b34801561093c57600080fd5b5061039061094b366004613080565b611bf8565b34801561095c57600080fd5b5061039061096b366004612df9565b611cc4565b34801561097c57600080fd5b5061039061098b366004612ef0565b611cd1565b34801561099c57600080fd5b506003546103c390600160b01b900460ff1681565b3480156109bd57600080fd5b506104cb6109cc366004612ec0565b611ce6565b3480156109dd57600080fd5b506103906109ec366004612ef0565b611d02565b3480156109fd57600080fd5b506001546104ed906001600160a01b031681565b348015610a1d57600080fd5b50610390610a2c3660046130c2565b611d0d565b348015610a3d57600080fd5b506003546103c390600160a81b900460ff1681565b348015610a5e57600080fd5b506104cb610a6d366004612ef0565b611d57565b6002546040805180820190915260148152737661756c7453747261746567794164647265737360601b6020820152600091610ab8916001600160a01b0390911690611df8565b600454600260009054906101000a90046001600160a01b03166001600160a01b031663e2868d336040518163ffffffff1660e01b8152600401602060405180830381865afa158015610b0e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b3291906130f0565b610b3c919061311f565b905090565b60006001600160e01b03198216637965db0b60e01b1480610b7257506301ffc9a760e01b6001600160e01b03198316145b92915050565b6000807fd1473398bb66596de5d1ea1fc8e303ff2ac23265adc9144b1b52065dc4f0934b610ba581611e25565b6002546040805180820190915260148152737661756c7453747261746567794164647265737360601b6020820152610be6916001600160a01b031690611df8565b610c1e6004546040518060400160405280601481526020017370656e64696e674465706f73697441737365747360601b815250611e2f565b600254604080516376bcfb8960e11b815290516000926001600160a01b03169163ed79f712916004808301926020929190829003018187875af1158015610c69573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c8d9190613132565b9050610c97611197565b6004805460405163095ea7b360e01b81526001600160a01b0385811693820193909352602481019190915291169063095ea7b3906044016020604051808303816000875af1158015610ced573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d11919061314f565b5060025460009081906001600160a01b031663642024e43082610d32611197565b600480546040516001600160e01b031960e088901b1681526001600160a01b0395861692810192909252928416602482015292166044830152606482015260840160408051808303816000875af1158015610d91573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610db5919061316c565b90925090506001600160a01b03821615801590610dd25750600081115b15610de1576000600455610e2e565b60405162461bcd60e51b815260206004820152601c60248201527f496e76616c69642072657475726e2066726f6d2053747261746567790000000060448201526064015b60405180910390fd5b60045460408051838152602081019290925233916001600160a01b038516917f16f99217dbd279dc7089ccb0efd8412a673ed6451b0b1f2b887520bf90babece910160405180910390a3909450925050509091565b7f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace03805460609160008051602061347683398151915291610ec29061319a565b80601f0160208091040260200160405190810160405280929190818152602001828054610eee9061319a565b8015610f3b5780601f10610f1057610100808354040283529160200191610f3b565b820191906000526020600020905b815481529060010190602001808311610f1e57829003601f168201915b505050505091505090565b6000610b72826000611e52565b600033610f61818585611eab565b5060019392505050565b6000610b72826001611eb8565b6000610f8381611e25565b8115801590610f93575081600114155b15610fb15760405163416aebb560e11b815260040160405180910390fd5b604080518415158152602081018490527f2b94373784459659713b674b7cf24cc8195f18080957ee44f923c7f94f420706910160405180910390a1816000036110125760038054841515600160a81b0260ff60a81b19909116179055505050565b6003805460ff60b01b1916600160b01b851515021790555b505050565b60003361103d858285611f07565b611048858585611f67565b60019150505b9392505050565b60009081526000805160206134b6833981519152602052604090206001015490565b61108082611055565b61108981611e25565b6110938383611fc6565b50505050565b60006110a481611e25565b6110db82604051806040016040528060158152602001747661756c745374726174656779416464726573735f60581b815250611df8565b6040516001600160a01b038316907fff75b176244b4869d0f63bcd38c47fcf8d1c4867f9ff4ee2d18ff62e5cb3f79a90600090a250600280546001600160a01b0319166001600160a01b0392909216919091179055565b6000806000805160206134d683398151915290506000815461115e9190600160a01b900460ff166131ce565b91505090565b6001600160a01b038116331461118d5760405163334bd91960e11b815260040160405180910390fd5b61102a828261206b565b6000805160206134d6833981519152546001600160a01b031690565b60006111be81611e25565b6111c66120e7565b50565b600080806111d681611e25565b6002546040805180820190915260148152737661756c7453747261746567794164647265737360601b6020820152611217916001600160a01b031690611df8565b600254604080516314f1402b60e31b8152815160009384936001600160a01b039091169263a78a01589260048083019392829003018187875af1158015611262573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611286919061316c565b915091506112913390565b6001600160a01b0316826001600160a01b03167f612393db0d818881e56e76cafa2c1f8c31c98b0c5d6bf12a78a0c149074f4d7b836040516112d591815260200190565b60405180910390a39093509150509091565b60006112f281611e25565b61132a82604051806040016040528060168152602001757661756c74735265676973747279416464726573735f60501b815250611df8565b6040516001600160a01b038316907ff456cf93e413d2c9e331969506c9fec24d8a2f0c084a402f00d10e6128eacd9190600090a250600080546001600160a01b0319166001600160a01b0392909216919091179055565b600061138c81611e25565b8160ff16600114806113a157508160ff166002145b6113e85760405162461bcd60e51b8152602060048201526018602482015277496e76616c69642076616c756174696f6e536f757263655f60401b6044820152606401610e25565b60405160ff831681527f8293c6c4b7ac2c1602ceb85691cc993ed8db45ead0fe9e917c32b9a2ed98c6e59060200160405180910390a1506003805460ff909216600160a01b0260ff60a01b19909216919091179055565b600060008051602061349683398151915261145981611e25565b611461612147565b61148a84604051806040016040528060078152602001666173736574735f60c81b815250611e2f565b6114b5836040518060400160405280600981526020016872656365697665725f60b81b815250611df8565b6114bd61217a565b60006114c885611cc4565b6001549091506114e49085906001600160a01b031687846121a2565b84600460008282546114f6919061311f565b909155509095945050505050565b6001600160a01b03166000908152600080516020613476833981519152602052604090205490565b600061153781611e25565b61156c82604051806040016040528060138152602001726d6173746572546f6b656e416464726573735f60681b815250611df8565b6040516001600160a01b038316907fe9e97d114ee06d8e3bf5fa839071c8024f6937aaecebeb7cdf8881f8b1da3e5f90600090a250600180546001600160a01b0319166001600160a01b0392909216919091179055565b60006115ce81611e25565b6111c661222f565b60009182526000805160206134b6833981519152602090815260408084206001600160a01b0393909316845291905290205460ff1690565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a008054600160401b810460ff16159067ffffffffffffffff166000811580156116545750825b905060008267ffffffffffffffff1660011480156116715750303b155b90508115801561167f575080155b1561169d5760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff1916600117855583156116c757845460ff60401b1916600160401b1785555b6117068b6040518060400160405280601781526020017f756e6465726c79696e67546f6b656e416464726573735f000000000000000000815250611df8565b61173b8a604051806040016040528060138152602001726d6173746572546f6b656e416464726573735f60681b815250611df8565b61177389604051806040016040528060168152602001757661756c74735265676973747279416464726573735f60501b815250611df8565b6117a2886040518060400160405280600d81526020016c6f776e6572416464726573735f60981b815250611df8565b6117cf876040518060400160405280600b81526020016a7368617265734e616d655f60a81b815250612278565b6117fe866040518060400160405280600d81526020016c73686172657353796d626f6c5f60981b815250612278565b61180661229c565b61180e6122ac565b6118166122bc565b61181f8b6122c4565b61182987876122d5565b611834600089611fc6565b50600180546001600160a01b03808d166001600160a01b0319928316811790935560008054918d169190921617815560038054600160a11b60ff60a01b199091161790556040517fe9e97d114ee06d8e3bf5fa839071c8024f6937aaecebeb7cdf8881f8b1da3e5f9190a283156118e557845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b5050505050505050505050565b6040805180820182526014815273119d5b98dd1a5bdb881b9bdd08185b1b1bddd95960621b6020820152905162461bcd60e51b8152600091610e2591600401612dc6565b7f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace04805460609160008051602061347683398151915291610ec29061319a565b60007fd1473398bb66596de5d1ea1fc8e303ff2ac23265adc9144b1b52065dc4f0934b6119a181611e25565b8260ff16600114806119b657508260ff166002145b6119fd5760405162461bcd60e51b8152602060048201526018602482015277496e76616c69642076616c756174696f6e536f757263655f60401b6044820152606401610e25565b6002546040805180820190915260148152737661756c7453747261746567794164647265737360601b6020820152611a3e916001600160a01b031690611df8565b6002546040516372cfcaad60e01b815260ff851660048201526000916001600160a01b0316906372cfcaad906024016020604051808303816000875af1158015611a8c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ab091906130f0565b9050600060045482611ac2919061311f565b6004546040805183815260208101869052808201929092525191925033917f61c280e478496b7f61c4ed50190cf3bc184e164b68f5bf3866e643e8902fe23c9181900360600190a29250505b50919050565b600033610f61818585611f67565b6000610b72826001611e52565b6000600080516020613496833981519152611b4981611e25565b611b51612147565b611b7a85604051806040016040528060078152602001666173736574735f60c81b815250611e2f565b611ba284604051806040016040528060068152602001656f776e65725f60d01b815250611df8565b611bcd836040518060400160405280600981526020016872656365697665725f60b81b815250611df8565b611bd56122e7565b6000611be086610f6b565b9050611bee8582888761230f565b5095945050505050565b6000600080516020613496833981519152611c1281611e25565b611c1a612147565b611c4385604051806040016040528060078152602001667368617265735f60c81b815250611e2f565b611c6e836040518060400160405280600981526020016872656365697665725f60b81b815250611df8565b611c9684604051806040016040528060068152602001656f776e65725f60d01b815250611df8565b611c9e6122e7565b6000611ca986610f46565b90506000611cb98688848861230f565b979650505050505050565b6000610b72826000611eb8565b6000610b72611cdf83611504565b6000611e52565b611cef82611055565b611cf881611e25565b611093838361206b565b6000610b7282611504565b6001600160a01b0391821660009081527f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace016020908152604080832093909416825291909152205490565b6000611d6281611e25565b611da1826040518060400160405280601881526020017f77697468647261775374726174656779416464726573735f0000000000000000815250611df8565b6040516001600160a01b038316907f28548fb82baba9340b788ecc4911d241c9508404c350e6964e447fbf8d62c12890600090a250600380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b038216611e21578060405163eac0d38960e01b8152600401610e259190612dc6565b5050565b6111c68133612467565b81600003611e2157806040516303b3e63560e41b8152600401610e259190612dc6565b600061104e611e5f610a72565b611e6a90600161311f565b611e766000600a6132cb565b7f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace0254611ea2919061311f565b859190856124a0565b61102a83838360016124ef565b600061104e611ec882600a6132cb565b7f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace0254611ef4919061311f565b611efc610a72565b611ea290600161311f565b6000611f138484611d0d565b905060001981146110935781811015611f5857604051637dc7a0d960e11b81526001600160a01b03841660048201526024810182905260448101839052606401610e25565b611093848484840360006124ef565b6001600160a01b038316611f9157604051634b637e8f60e11b815260006004820152602401610e25565b6001600160a01b038216611fbb5760405163ec442f0560e01b815260006004820152602401610e25565b61102a8383836125ce565b60006000805160206134b6833981519152611fe184846115d6565b612061576000848152602082815260408083206001600160a01b03871684529091529020805460ff191660011790556120173390565b6001600160a01b0316836001600160a01b0316857f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a46001915050610b72565b6000915050610b72565b60006000805160206134b683398151915261208684846115d6565b15612061576000848152602082815260408083206001600160a01b0387168085529252808320805460ff1916905551339287917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a46001915050610b72565b6120ef61270c565b6000805160206134f6833981519152805460ff191681557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a150565b6000805160206134f68339815191525460ff16156121785760405163d93c066560e01b815260040160405180910390fd5b565b600354600160a81b900460ff1615612178576003546111c690600160a01b900460ff16611975565b6000805160206134d683398151915280546121c8906001600160a01b031686308661273c565b6121d284836127a3565b836001600160a01b0316856001600160a01b03167fdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d78585604051612220929190918252602082015260400190565b60405180910390a35050505050565b612237612147565b6000805160206134f6833981519152805460ff191660011781557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25833612129565b8151600003611e2157806040516318a996bb60e21b8152600401610e259190612dc6565b6122a46127d9565b612178612822565b6122b46127d9565b612178612843565b6121786127d9565b6122cc6127d9565b6111c681612871565b6122dd6127d9565b611e2182826128e3565b600354600160b01b900460ff1615612178576003546111c690600160a01b900460ff16611975565b60035460408051808201909152601781527f7769746864726177537472617465677941646472657373000000000000000000602082015260009161235e916001600160a01b0390911690611df8565b6000836004541061238957839050836004600082825461237e91906132da565b909155506124519050565b6003546000906001600160a01b0316634a28ff24306123a6611197565b6040516001600160e01b031960e085901b1681526001600160a01b039283166004820152911660248201526044810188905260640160408051808303816000875af11580156123f9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061241d919061316c565b91505061244e816040518060400160405280600c81526020016b185cdcd95d1cd05b5bdd5b9d60a21b815250611e2f565b90505b61245e8684888489612934565b95945050505050565b61247182826115d6565b611e215760405163e2517d3f60e01b81526001600160a01b038216600482015260248101839052604401610e25565b6000806124ae8686866129e9565b90506124b983612aad565b80156124d55750600084806124d0576124d06132ed565b868809115b1561245e576124e560018261311f565b9695505050505050565b6000805160206134768339815191526001600160a01b0385166125285760405163e602df0560e01b815260006004820152602401610e25565b6001600160a01b03841661255257604051634a1406b160e11b815260006004820152602401610e25565b6001600160a01b038086166000908152600183016020908152604080832093881683529290522083905581156125c757836001600160a01b0316856001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258560405161222091815260200190565b5050505050565b6000805160206134768339815191526001600160a01b03841661260a57818160020160008282546125ff919061311f565b9091555061267c9050565b6001600160a01b0384166000908152602082905260409020548281101561265d5760405163391434e360e21b81526001600160a01b03861660048201526024810182905260448101849052606401610e25565b6001600160a01b03851660009081526020839052604090209083900390555b6001600160a01b03831661269a5760028101805483900390556126b9565b6001600160a01b03831660009081526020829052604090208054830190555b826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516126fe91815260200190565b60405180910390a350505050565b6000805160206134f68339815191525460ff1661217857604051638dfc202b60e01b815260040160405180910390fd5b6040516001600160a01b0384811660248301528381166044830152606482018390526110939186918216906323b872dd906084015b604051602081830303815290604052915060e01b6020820180516001600160e01b038381831617835250505050612ada565b6001600160a01b0382166127cd5760405163ec442f0560e01b815260006004820152602401610e25565b611e21600083836125ce565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0054600160401b900460ff1661217857604051631afcd79f60e31b815260040160405180910390fd5b61282a6127d9565b6000805160206134f6833981519152805460ff19169055565b61284b6127d9565b60017f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f0055565b6128796127d9565b6000805160206134d683398151915260008061289484612b3d565b91509150816128a45760126128a6565b805b83546001600160a81b031916600160a01b60ff92909216919091026001600160a01b031916176001600160a01b0394909416939093179091555050565b6128eb6127d9565b6000805160206134768339815191527f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace036129258482613353565b50600481016110938382613353565b6000805160206134d68339815191526001600160a01b038681169085161461296157612961848784611f07565b61296b8483612c19565b8054612981906001600160a01b03168685612c4f565b836001600160a01b0316856001600160a01b0316876001600160a01b03167ffbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db86866040516129d9929190918252602082015260400190565b60405180910390a4505050505050565b6000838302816000198587098281108382030391505080600003612a2057838281612a1657612a166132ed565b049250505061104e565b808411612a405760405163227bc15360e01b815260040160405180910390fd5b6000848688096000868103871696879004966002600389028118808a02820302808a02820302808a02820302808a02820302808a02820302808a02909103029181900381900460010186841190950394909402919094039290920491909117919091029150509392505050565b60006002826003811115612ac357612ac3613413565b612acd9190613429565b60ff166001149050919050565b6000612aef6001600160a01b03841683612c80565b90508051600014158015612b14575080806020019051810190612b12919061314f565b155b1561102a57604051635274afe760e01b81526001600160a01b0384166004820152602401610e25565b60408051600481526024810182526020810180516001600160e01b031663313ce56760e01b17905290516000918291829182916001600160a01b03871691612b8491613459565b600060405180830381855afa9150503d8060008114612bbf576040519150601f19603f3d011682016040523d82523d6000602084013e612bc4565b606091505b5091509150818015612bd857506020815110155b15612c0c57600081806020019051810190612bf391906130f0565b905060ff8111612c0a576001969095509350505050565b505b5060009485945092505050565b6001600160a01b038216612c4357604051634b637e8f60e11b815260006004820152602401610e25565b611e21826000836125ce565b6040516001600160a01b0383811660248301526044820183905261102a91859182169063a9059cbb90606401612771565b606061104e8383600084600080856001600160a01b03168486604051612ca69190613459565b60006040518083038185875af1925050503d8060008114612ce3576040519150601f19603f3d011682016040523d82523d6000602084013e612ce8565b606091505b50915091506124e5868383606082612d0857612d0382612d4f565b61104e565b8151158015612d1f57506001600160a01b0384163b155b15612d4857604051639996b31560e01b81526001600160a01b0385166004820152602401610e25565b508061104e565b805115612d5f5780518082602001fd5b604051630a12f52160e11b815260040160405180910390fd5b600060208284031215612d8a57600080fd5b81356001600160e01b03198116811461104e57600080fd5b60005b83811015612dbd578181015183820152602001612da5565b50506000910152565b6020815260008251806020840152612de5816040850160208701612da2565b601f01601f19169190910160400192915050565b600060208284031215612e0b57600080fd5b5035919050565b6001600160a01b03811681146111c657600080fd5b60008060408385031215612e3a57600080fd5b8235612e4581612e12565b946020939093013593505050565b80151581146111c657600080fd5b60008060408385031215612e7457600080fd5b8235612e4581612e53565b600080600060608486031215612e9457600080fd5b8335612e9f81612e12565b92506020840135612eaf81612e12565b929592945050506040919091013590565b60008060408385031215612ed357600080fd5b823591506020830135612ee581612e12565b809150509250929050565b600060208284031215612f0257600080fd5b813561104e81612e12565b600060208284031215612f1f57600080fd5b813560ff8116811461104e57600080fd5b634e487b7160e01b600052604160045260246000fd5b600082601f830112612f5757600080fd5b813567ffffffffffffffff80821115612f7257612f72612f30565b604051601f8301601f19908116603f01168101908282118183101715612f9a57612f9a612f30565b81604052838152866020858801011115612fb357600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060008060008060c08789031215612fec57600080fd5b8635612ff781612e12565b9550602087013561300781612e12565b9450604087013561301781612e12565b9350606087013561302781612e12565b9250608087013567ffffffffffffffff8082111561304457600080fd5b6130508a838b01612f46565b935060a089013591508082111561306657600080fd5b5061307389828a01612f46565b9150509295509295509295565b60008060006060848603121561309557600080fd5b8335925060208401356130a781612e12565b915060408401356130b781612e12565b809150509250925092565b600080604083850312156130d557600080fd5b82356130e081612e12565b91506020830135612ee581612e12565b60006020828403121561310257600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b80820180821115610b7257610b72613109565b60006020828403121561314457600080fd5b815161104e81612e12565b60006020828403121561316157600080fd5b815161104e81612e53565b6000806040838503121561317f57600080fd5b825161318a81612e12565b6020939093015192949293505050565b600181811c908216806131ae57607f821691505b602082108103611b0e57634e487b7160e01b600052602260045260246000fd5b60ff8181168382160190811115610b7257610b72613109565b600181815b8085111561322257816000190482111561320857613208613109565b8085161561321557918102915b93841c93908002906131ec565b509250929050565b60008261323957506001610b72565b8161324657506000610b72565b816001811461325c576002811461326657613282565b6001915050610b72565b60ff84111561327757613277613109565b50506001821b610b72565b5060208310610133831016604e8410600b84101617156132a5575081810a610b72565b6132af83836131e7565b80600019048211156132c3576132c3613109565b029392505050565b600061104e60ff84168361322a565b81810381811115610b7257610b72613109565b634e487b7160e01b600052601260045260246000fd5b601f82111561102a576000816000526020600020601f850160051c8101602086101561332c5750805b601f850160051c820191505b8181101561334b57828155600101613338565b505050505050565b815167ffffffffffffffff81111561336d5761336d612f30565b6133818161337b845461319a565b84613303565b602080601f8311600181146133b6576000841561339e5750858301515b600019600386901b1c1916600185901b17855561334b565b600085815260208120601f198616915b828110156133e5578886015182559484019460019091019084016133c6565b50858210156134035787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052602160045260246000fd5b600060ff83168061344a57634e487b7160e01b600052601260045260246000fd5b8060ff84160691505092915050565b6000825161346b818460208701612da2565b919091019291505056fe52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace005e7a68d59b8e969a6eba9014e1d53fa760e69bfc4c094dc44ed50004fdccdcd802dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b6268000773e532dfede91f04b12a73d3d2acd361424f41f76b4fb79f090161e36b4e00cd5ed15c6e187e77e9aee88184c21f4f2182ab5827cb3b7e07fbedcd63f03300a2646970667358221220e314924d748709bba0a97579b647d9a87486b29716f2f99aff4f4bf037ad262c64736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class Vault__factory extends ethers_1.ContractFactory {
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
exports.Vault__factory = Vault__factory;
Vault__factory.bytecode = _bytecode;
Vault__factory.abi = _abi;
//# sourceMappingURL=Vault__factory.js.map