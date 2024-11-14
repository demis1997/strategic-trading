"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaultV2__factory = void 0;
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
                internalType: "uint256",
                name: "_newValue",
                type: "uint256",
            },
        ],
        name: "addedMethodVaultV2",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "addedVariableVaultV2",
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
const _bytecode = "0x608060405234801561001057600080fd5b50613597806100206000396000f3fe6080604052600436106103855760003560e01c8063654aeebf116101d1578063b207256411610102578063cef14719116100a0578063dd62ed3e1161006f578063dd62ed3e14610a5d578063e6a00fef14610a7d578063ea9853d014610a9e578063ef8b30f71461099c57600080fd5b8063cef14719146109dc578063d547741f146109fd578063d905777e14610a1d578063da9b759d14610a3d57600080fd5b8063ba087652116100dc578063ba0876521461097c578063c63d75b614610681578063c6e6f5921461099c578063ce96cb77146109bc57600080fd5b8063b207256414610926578063b3d7f6b91461093c578063b460af941461095c57600080fd5b80639317c2001161016f578063964455eb11610149578063964455eb146108b1578063a1f504b7146108d1578063a217fddf146108f1578063a9059cbb1461090657600080fd5b80639317c2001461085c57806394bf804d1461087c57806395d89b411461089c57600080fd5b8063794c9599116101ab578063794c9599146107c75780637e531a39146107e75780638456cb591461082757806391d148541461083c57600080fd5b8063654aeebf146107675780636e553f651461078757806370a08231146107a757600080fd5b80632fe447bb116102b6578063402d267d116102545780635489becc116102235780635489becc146106d85780635b48b6b8146106ee5780635c975abb1461070e5780635e5a24a41461073357600080fd5b8063402d267d14610681578063429e6e0f146106a35780634641257d146106c35780634cdad5061461043f57600080fd5b806336568abe1161029057806336568abe1461061757806338d52e0f1461063757806339e3aca11461064c5780633f4ba83a1461066c57600080fd5b80632fe447bb146105af5780633129a242146105e2578063313ce5671461060257600080fd5b80630e1b456c1161032357806318160ddd116102fd57806318160ddd1461051b57806323b872dd1461054f578063248a9ca31461056f5780632f2ff15d1461058f57600080fd5b80630e1b456c1461049f57806313c5977d146104c157806316c2501e146104e357600080fd5b806306fdde031161035f57806306fdde031461041d57806307a2d13a1461043f578063095ea7b31461045f5780630a28a4771461047f57600080fd5b806301e1d1141461039157806301ffc9a7146103b9578063037897d6146103e957600080fd5b3661038c57005b600080fd5b34801561039d57600080fd5b506103a6610abe565b6040519081526020015b60405180910390f35b3480156103c557600080fd5b506103d96103d4366004612dc4565b610b8d565b60405190151581526020016103b0565b3480156103f557600080fd5b506103fe610bc4565b604080516001600160a01b0390931683526020830191909152016103b0565b34801561042957600080fd5b50610432610ecf565b6040516103b09190612e12565b34801561044b57600080fd5b506103a661045a366004612e45565b610f92565b34801561046b57600080fd5b506103d961047a366004612e73565b610f9f565b34801561048b57600080fd5b506103a661049a366004612e45565b610fb7565b3480156104ab57600080fd5b506103a66000805160206134e283398151915281565b3480156104cd57600080fd5b506104e16104dc366004612ead565b610fc4565b005b3480156104ef57600080fd5b50600054610503906001600160a01b031681565b6040516001600160a01b0390911681526020016103b0565b34801561052757600080fd5b507f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace02546103a6565b34801561055b57600080fd5b506103d961056a366004612ecb565b61107b565b34801561057b57600080fd5b506103a661058a366004612e45565b6110a1565b34801561059b57600080fd5b506104e16105aa366004612f0c565b6110c3565b3480156105bb57600080fd5b506003546105d090600160a01b900460ff1681565b60405160ff90911681526020016103b0565b3480156105ee57600080fd5b506104e16105fd366004612f3c565b6110e5565b34801561060e57600080fd5b506105d061117e565b34801561062357600080fd5b506104e1610632366004612f0c565b6111b0565b34801561064357600080fd5b506105036111e3565b34801561065857600080fd5b50600254610503906001600160a01b031681565b34801561067857600080fd5b506104e16111ff565b34801561068d57600080fd5b506103a661069c366004612f3c565b5060001990565b3480156106af57600080fd5b50600354610503906001600160a01b031681565b3480156106cf57600080fd5b506103fe611215565b3480156106e457600080fd5b506103a660045481565b3480156106fa57600080fd5b506104e1610709366004612f3c565b611333565b34801561071a57600080fd5b506000805160206135428339815191525460ff166103d9565b34801561073f57600080fd5b506103a67fd1473398bb66596de5d1ea1fc8e303ff2ac23265adc9144b1b52065dc4f0934b81565b34801561077357600080fd5b506104e1610782366004612f59565b6113cd565b34801561079357600080fd5b506103a66107a2366004612f0c565b61148b565b3480156107b357600080fd5b506103a66107c2366004612f3c565b611550565b3480156107d357600080fd5b506104e16107e2366004612f3c565b611578565b3480156107f357600080fd5b5061043260405180604001604052806014815260200173119d5b98dd1a5bdb881b9bdd08185b1b1bddd95960621b81525081565b34801561083357600080fd5b506104e161160f565b34801561084857600080fd5b506103d9610857366004612f0c565b611622565b34801561086857600080fd5b506104e161087736600461301f565b61165a565b34801561088857600080fd5b506103a6610897366004612f0c565b61193e565b3480156108a857600080fd5b50610432611982565b3480156108bd57600080fd5b506103a66108cc366004612f59565b6119c1565b3480156108dd57600080fd5b506104e16108ec366004612e45565b600555565b3480156108fd57600080fd5b506103a6600081565b34801561091257600080fd5b506103d9610921366004612e73565b611b60565b34801561093257600080fd5b506103a660055481565b34801561094857600080fd5b506103a6610957366004612e45565b611b6e565b34801561096857600080fd5b506103a66109773660046130cc565b611b7b565b34801561098857600080fd5b506103a66109973660046130cc565b611c44565b3480156109a857600080fd5b506103a66109b7366004612e45565b611d10565b3480156109c857600080fd5b506103a66109d7366004612f3c565b611d1d565b3480156109e857600080fd5b506003546103d990600160b01b900460ff1681565b348015610a0957600080fd5b506104e1610a18366004612f0c565b611d32565b348015610a2957600080fd5b506103a6610a38366004612f3c565b611d4e565b348015610a4957600080fd5b50600154610503906001600160a01b031681565b348015610a6957600080fd5b506103a6610a7836600461310e565b611d59565b348015610a8957600080fd5b506003546103d990600160a81b900460ff1681565b348015610aaa57600080fd5b506104e1610ab9366004612f3c565b611da3565b6002546040805180820190915260148152737661756c7453747261746567794164647265737360601b6020820152600091610b04916001600160a01b0390911690611e44565b600454600260009054906101000a90046001600160a01b03166001600160a01b031663e2868d336040518163ffffffff1660e01b8152600401602060405180830381865afa158015610b5a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b7e919061313c565b610b88919061316b565b905090565b60006001600160e01b03198216637965db0b60e01b1480610bbe57506301ffc9a760e01b6001600160e01b03198316145b92915050565b6000807fd1473398bb66596de5d1ea1fc8e303ff2ac23265adc9144b1b52065dc4f0934b610bf181611e71565b6002546040805180820190915260148152737661756c7453747261746567794164647265737360601b6020820152610c32916001600160a01b031690611e44565b610c6a6004546040518060400160405280601481526020017370656e64696e674465706f73697441737365747360601b815250611e7b565b600254604080516376bcfb8960e11b815290516000926001600160a01b03169163ed79f712916004808301926020929190829003018187875af1158015610cb5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cd9919061317e565b9050610ce36111e3565b6004805460405163095ea7b360e01b81526001600160a01b0385811693820193909352602481019190915291169063095ea7b3906044016020604051808303816000875af1158015610d39573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d5d919061319b565b5060025460009081906001600160a01b031663642024e43082610d7e6111e3565b600480546040516001600160e01b031960e088901b1681526001600160a01b0395861692810192909252928416602482015292166044830152606482015260840160408051808303816000875af1158015610ddd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e0191906131b8565b90925090506001600160a01b03821615801590610e1e5750600081115b15610e2d576000600455610e7a565b60405162461bcd60e51b815260206004820152601c60248201527f496e76616c69642072657475726e2066726f6d2053747261746567790000000060448201526064015b60405180910390fd5b60045460408051838152602081019290925233916001600160a01b038516917f16f99217dbd279dc7089ccb0efd8412a673ed6451b0b1f2b887520bf90babece910160405180910390a3909450925050509091565b7f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace0380546060916000805160206134c283398151915291610f0e906131e6565b80601f0160208091040260200160405190810160405280929190818152602001828054610f3a906131e6565b8015610f875780601f10610f5c57610100808354040283529160200191610f87565b820191906000526020600020905b815481529060010190602001808311610f6a57829003601f168201915b505050505091505090565b6000610bbe826000611e9e565b600033610fad818585611ef7565b5060019392505050565b6000610bbe826001611f04565b6000610fcf81611e71565b8115801590610fdf575081600114155b15610ffd5760405163416aebb560e11b815260040160405180910390fd5b604080518415158152602081018490527f2b94373784459659713b674b7cf24cc8195f18080957ee44f923c7f94f420706910160405180910390a18160000361105e5760038054841515600160a81b0260ff60a81b19909116179055505050565b6003805460ff60b01b1916600160b01b851515021790555b505050565b600033611089858285611f53565b611094858585611fb3565b60019150505b9392505050565b6000908152600080516020613502833981519152602052604090206001015490565b6110cc826110a1565b6110d581611e71565b6110df8383612012565b50505050565b60006110f081611e71565b61112782604051806040016040528060158152602001747661756c745374726174656779416464726573735f60581b815250611e44565b6040516001600160a01b038316907fff75b176244b4869d0f63bcd38c47fcf8d1c4867f9ff4ee2d18ff62e5cb3f79a90600090a250600280546001600160a01b0319166001600160a01b0392909216919091179055565b6000806000805160206135228339815191529050600081546111aa9190600160a01b900460ff1661321a565b91505090565b6001600160a01b03811633146111d95760405163334bd91960e11b815260040160405180910390fd5b61107682826120b7565b600080516020613522833981519152546001600160a01b031690565b600061120a81611e71565b611212612133565b50565b6000808061122281611e71565b6002546040805180820190915260148152737661756c7453747261746567794164647265737360601b6020820152611263916001600160a01b031690611e44565b600254604080516314f1402b60e31b8152815160009384936001600160a01b039091169263a78a01589260048083019392829003018187875af11580156112ae573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112d291906131b8565b915091506112dd3390565b6001600160a01b0316826001600160a01b03167f612393db0d818881e56e76cafa2c1f8c31c98b0c5d6bf12a78a0c149074f4d7b8360405161132191815260200190565b60405180910390a39093509150509091565b600061133e81611e71565b61137682604051806040016040528060168152602001757661756c74735265676973747279416464726573735f60501b815250611e44565b6040516001600160a01b038316907ff456cf93e413d2c9e331969506c9fec24d8a2f0c084a402f00d10e6128eacd9190600090a250600080546001600160a01b0319166001600160a01b0392909216919091179055565b60006113d881611e71565b8160ff16600114806113ed57508160ff166002145b6114345760405162461bcd60e51b8152602060048201526018602482015277496e76616c69642076616c756174696f6e536f757263655f60401b6044820152606401610e71565b60405160ff831681527f8293c6c4b7ac2c1602ceb85691cc993ed8db45ead0fe9e917c32b9a2ed98c6e59060200160405180910390a1506003805460ff909216600160a01b0260ff60a01b19909216919091179055565b60006000805160206134e28339815191526114a581611e71565b6114ad612193565b6114d684604051806040016040528060078152602001666173736574735f60c81b815250611e7b565b611501836040518060400160405280600981526020016872656365697665725f60b81b815250611e44565b6115096121c6565b600061151485611d10565b6001549091506115309085906001600160a01b031687846121ee565b8460046000828254611542919061316b565b909155509095945050505050565b6001600160a01b031660009081526000805160206134c2833981519152602052604090205490565b600061158381611e71565b6115b882604051806040016040528060138152602001726d6173746572546f6b656e416464726573735f60681b815250611e44565b6040516001600160a01b038316907fe9e97d114ee06d8e3bf5fa839071c8024f6937aaecebeb7cdf8881f8b1da3e5f90600090a250600180546001600160a01b0319166001600160a01b0392909216919091179055565b600061161a81611e71565b61121261227b565b6000918252600080516020613502833981519152602090815260408084206001600160a01b0393909316845291905290205460ff1690565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a008054600160401b810460ff16159067ffffffffffffffff166000811580156116a05750825b905060008267ffffffffffffffff1660011480156116bd5750303b155b9050811580156116cb575080155b156116e95760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff19166001178555831561171357845460ff60401b1916600160401b1785555b6117528b6040518060400160405280601781526020017f756e6465726c79696e67546f6b656e416464726573735f000000000000000000815250611e44565b6117878a604051806040016040528060138152602001726d6173746572546f6b656e416464726573735f60681b815250611e44565b6117bf89604051806040016040528060168152602001757661756c74735265676973747279416464726573735f60501b815250611e44565b6117ee886040518060400160405280600d81526020016c6f776e6572416464726573735f60981b815250611e44565b61181b876040518060400160405280600b81526020016a7368617265734e616d655f60a81b8152506122c4565b61184a866040518060400160405280600d81526020016c73686172657353796d626f6c5f60981b8152506122c4565b6118526122e8565b61185a6122f8565b611862612308565b61186b8b612310565b6118758787612321565b611880600089612012565b50600180546001600160a01b03808d166001600160a01b0319928316811790935560008054918d169190921617815560038054600160a11b60ff60a01b199091161790556040517fe9e97d114ee06d8e3bf5fa839071c8024f6937aaecebeb7cdf8881f8b1da3e5f9190a2831561193157845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b5050505050505050505050565b6040805180820182526014815273119d5b98dd1a5bdb881b9bdd08185b1b1bddd95960621b6020820152905162461bcd60e51b8152600091610e7191600401612e12565b7f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace0480546060916000805160206134c283398151915291610f0e906131e6565b60007fd1473398bb66596de5d1ea1fc8e303ff2ac23265adc9144b1b52065dc4f0934b6119ed81611e71565b8260ff1660011480611a0257508260ff166002145b611a495760405162461bcd60e51b8152602060048201526018602482015277496e76616c69642076616c756174696f6e536f757263655f60401b6044820152606401610e71565b6002546040805180820190915260148152737661756c7453747261746567794164647265737360601b6020820152611a8a916001600160a01b031690611e44565b6002546040516372cfcaad60e01b815260ff851660048201526000916001600160a01b0316906372cfcaad906024016020604051808303816000875af1158015611ad8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611afc919061313c565b9050600060045482611b0e919061316b565b6004546040805183815260208101869052808201929092525191925033917f61c280e478496b7f61c4ed50190cf3bc184e164b68f5bf3866e643e8902fe23c9181900360600190a29250505b50919050565b600033610fad818585611fb3565b6000610bbe826001611e9e565b60006000805160206134e2833981519152611b9581611e71565b611b9d612193565b611bc685604051806040016040528060078152602001666173736574735f60c81b815250611e7b565b611bee84604051806040016040528060068152602001656f776e65725f60d01b815250611e44565b611c19836040518060400160405280600981526020016872656365697665725f60b81b815250611e44565b611c21612333565b6000611c2c86610fb7565b9050611c3a8582888761235b565b5095945050505050565b60006000805160206134e2833981519152611c5e81611e71565b611c66612193565b611c8f85604051806040016040528060078152602001667368617265735f60c81b815250611e7b565b611cba836040518060400160405280600981526020016872656365697665725f60b81b815250611e44565b611ce284604051806040016040528060068152602001656f776e65725f60d01b815250611e44565b611cea612333565b6000611cf586610f92565b90506000611d058688848861235b565b979650505050505050565b6000610bbe826000611f04565b6000610bbe611d2b83611550565b6000611e9e565b611d3b826110a1565b611d4481611e71565b6110df83836120b7565b6000610bbe82611550565b6001600160a01b0391821660009081527f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace016020908152604080832093909416825291909152205490565b6000611dae81611e71565b611ded826040518060400160405280601881526020017f77697468647261775374726174656779416464726573735f0000000000000000815250611e44565b6040516001600160a01b038316907f28548fb82baba9340b788ecc4911d241c9508404c350e6964e447fbf8d62c12890600090a250600380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b038216611e6d578060405163eac0d38960e01b8152600401610e719190612e12565b5050565b61121281336124b3565b81600003611e6d57806040516303b3e63560e41b8152600401610e719190612e12565b600061109a611eab610abe565b611eb690600161316b565b611ec26000600a613317565b7f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace0254611eee919061316b565b859190856124ec565b611076838383600161253b565b600061109a611f1482600a613317565b7f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace0254611f40919061316b565b611f48610abe565b611eee90600161316b565b6000611f5f8484611d59565b905060001981146110df5781811015611fa457604051637dc7a0d960e11b81526001600160a01b03841660048201526024810182905260448101839052606401610e71565b6110df8484848403600061253b565b6001600160a01b038316611fdd57604051634b637e8f60e11b815260006004820152602401610e71565b6001600160a01b0382166120075760405163ec442f0560e01b815260006004820152602401610e71565b61107683838361261a565b600060008051602061350283398151915261202d8484611622565b6120ad576000848152602082815260408083206001600160a01b03871684529091529020805460ff191660011790556120633390565b6001600160a01b0316836001600160a01b0316857f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a46001915050610bbe565b6000915050610bbe565b60006000805160206135028339815191526120d28484611622565b156120ad576000848152602082815260408083206001600160a01b0387168085529252808320805460ff1916905551339287917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a46001915050610bbe565b61213b612758565b600080516020613542833981519152805460ff191681557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a150565b6000805160206135428339815191525460ff16156121c45760405163d93c066560e01b815260040160405180910390fd5b565b600354600160a81b900460ff16156121c45760035461121290600160a01b900460ff166119c1565b6000805160206135228339815191528054612214906001600160a01b0316863086612788565b61221e84836127ef565b836001600160a01b0316856001600160a01b03167fdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d7858560405161226c929190918252602082015260400190565b60405180910390a35050505050565b612283612193565b600080516020613542833981519152805460ff191660011781557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25833612175565b8151600003611e6d57806040516318a996bb60e21b8152600401610e719190612e12565b6122f0612825565b6121c461286e565b612300612825565b6121c461288f565b6121c4612825565b612318612825565b611212816128bd565b612329612825565b611e6d828261292f565b600354600160b01b900460ff16156121c45760035461121290600160a01b900460ff166119c1565b60035460408051808201909152601781527f776974686472617753747261746567794164647265737300000000000000000060208201526000916123aa916001600160a01b0390911690611e44565b600083600454106123d55783905083600460008282546123ca9190613326565b9091555061249d9050565b6003546000906001600160a01b0316634a28ff24306123f26111e3565b6040516001600160e01b031960e085901b1681526001600160a01b039283166004820152911660248201526044810188905260640160408051808303816000875af1158015612445573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061246991906131b8565b91505061249a816040518060400160405280600c81526020016b185cdcd95d1cd05b5bdd5b9d60a21b815250611e7b565b90505b6124aa8684888489612980565b95945050505050565b6124bd8282611622565b611e6d5760405163e2517d3f60e01b81526001600160a01b038216600482015260248101839052604401610e71565b6000806124fa868686612a35565b905061250583612af9565b801561252157506000848061251c5761251c613339565b868809115b156124aa5761253160018261316b565b9695505050505050565b6000805160206134c28339815191526001600160a01b0385166125745760405163e602df0560e01b815260006004820152602401610e71565b6001600160a01b03841661259e57604051634a1406b160e11b815260006004820152602401610e71565b6001600160a01b0380861660009081526001830160209081526040808320938816835292905220839055811561261357836001600160a01b0316856001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258560405161226c91815260200190565b5050505050565b6000805160206134c28339815191526001600160a01b038416612656578181600201600082825461264b919061316b565b909155506126c89050565b6001600160a01b038416600090815260208290526040902054828110156126a95760405163391434e360e21b81526001600160a01b03861660048201526024810182905260448101849052606401610e71565b6001600160a01b03851660009081526020839052604090209083900390555b6001600160a01b0383166126e6576002810180548390039055612705565b6001600160a01b03831660009081526020829052604090208054830190555b826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161274a91815260200190565b60405180910390a350505050565b6000805160206135428339815191525460ff166121c457604051638dfc202b60e01b815260040160405180910390fd5b6040516001600160a01b0384811660248301528381166044830152606482018390526110df9186918216906323b872dd906084015b604051602081830303815290604052915060e01b6020820180516001600160e01b038381831617835250505050612b26565b6001600160a01b0382166128195760405163ec442f0560e01b815260006004820152602401610e71565b611e6d6000838361261a565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0054600160401b900460ff166121c457604051631afcd79f60e31b815260040160405180910390fd5b612876612825565b600080516020613542833981519152805460ff19169055565b612897612825565b60017f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f0055565b6128c5612825565b6000805160206135228339815191526000806128e084612b89565b91509150816128f05760126128f2565b805b83546001600160a81b031916600160a01b60ff92909216919091026001600160a01b031916176001600160a01b0394909416939093179091555050565b612937612825565b6000805160206134c28339815191527f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace03612971848261339f565b50600481016110df838261339f565b6000805160206135228339815191526001600160a01b03868116908516146129ad576129ad848784611f53565b6129b78483612c65565b80546129cd906001600160a01b03168685612c9b565b836001600160a01b0316856001600160a01b0316876001600160a01b03167ffbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db8686604051612a25929190918252602082015260400190565b60405180910390a4505050505050565b6000838302816000198587098281108382030391505080600003612a6c57838281612a6257612a62613339565b049250505061109a565b808411612a8c5760405163227bc15360e01b815260040160405180910390fd5b6000848688096000868103871696879004966002600389028118808a02820302808a02820302808a02820302808a02820302808a02820302808a02909103029181900381900460010186841190950394909402919094039290920491909117919091029150509392505050565b60006002826003811115612b0f57612b0f61345f565b612b199190613475565b60ff166001149050919050565b6000612b3b6001600160a01b03841683612ccc565b90508051600014158015612b60575080806020019051810190612b5e919061319b565b155b1561107657604051635274afe760e01b81526001600160a01b0384166004820152602401610e71565b60408051600481526024810182526020810180516001600160e01b031663313ce56760e01b17905290516000918291829182916001600160a01b03871691612bd0916134a5565b600060405180830381855afa9150503d8060008114612c0b576040519150601f19603f3d011682016040523d82523d6000602084013e612c10565b606091505b5091509150818015612c2457506020815110155b15612c5857600081806020019051810190612c3f919061313c565b905060ff8111612c56576001969095509350505050565b505b5060009485945092505050565b6001600160a01b038216612c8f57604051634b637e8f60e11b815260006004820152602401610e71565b611e6d8260008361261a565b6040516001600160a01b0383811660248301526044820183905261107691859182169063a9059cbb906064016127bd565b606061109a8383600084600080856001600160a01b03168486604051612cf291906134a5565b60006040518083038185875af1925050503d8060008114612d2f576040519150601f19603f3d011682016040523d82523d6000602084013e612d34565b606091505b5091509150612531868383606082612d5457612d4f82612d9b565b61109a565b8151158015612d6b57506001600160a01b0384163b155b15612d9457604051639996b31560e01b81526001600160a01b0385166004820152602401610e71565b508061109a565b805115612dab5780518082602001fd5b604051630a12f52160e11b815260040160405180910390fd5b600060208284031215612dd657600080fd5b81356001600160e01b03198116811461109a57600080fd5b60005b83811015612e09578181015183820152602001612df1565b50506000910152565b6020815260008251806020840152612e31816040850160208701612dee565b601f01601f19169190910160400192915050565b600060208284031215612e5757600080fd5b5035919050565b6001600160a01b038116811461121257600080fd5b60008060408385031215612e8657600080fd5b8235612e9181612e5e565b946020939093013593505050565b801515811461121257600080fd5b60008060408385031215612ec057600080fd5b8235612e9181612e9f565b600080600060608486031215612ee057600080fd5b8335612eeb81612e5e565b92506020840135612efb81612e5e565b929592945050506040919091013590565b60008060408385031215612f1f57600080fd5b823591506020830135612f3181612e5e565b809150509250929050565b600060208284031215612f4e57600080fd5b813561109a81612e5e565b600060208284031215612f6b57600080fd5b813560ff8116811461109a57600080fd5b634e487b7160e01b600052604160045260246000fd5b600082601f830112612fa357600080fd5b813567ffffffffffffffff80821115612fbe57612fbe612f7c565b604051601f8301601f19908116603f01168101908282118183101715612fe657612fe6612f7c565b81604052838152866020858801011115612fff57600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060008060008060c0878903121561303857600080fd5b863561304381612e5e565b9550602087013561305381612e5e565b9450604087013561306381612e5e565b9350606087013561307381612e5e565b9250608087013567ffffffffffffffff8082111561309057600080fd5b61309c8a838b01612f92565b935060a08901359150808211156130b257600080fd5b506130bf89828a01612f92565b9150509295509295509295565b6000806000606084860312156130e157600080fd5b8335925060208401356130f381612e5e565b9150604084013561310381612e5e565b809150509250925092565b6000806040838503121561312157600080fd5b823561312c81612e5e565b91506020830135612f3181612e5e565b60006020828403121561314e57600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b80820180821115610bbe57610bbe613155565b60006020828403121561319057600080fd5b815161109a81612e5e565b6000602082840312156131ad57600080fd5b815161109a81612e9f565b600080604083850312156131cb57600080fd5b82516131d681612e5e565b6020939093015192949293505050565b600181811c908216806131fa57607f821691505b602082108103611b5a57634e487b7160e01b600052602260045260246000fd5b60ff8181168382160190811115610bbe57610bbe613155565b600181815b8085111561326e57816000190482111561325457613254613155565b8085161561326157918102915b93841c9390800290613238565b509250929050565b60008261328557506001610bbe565b8161329257506000610bbe565b81600181146132a857600281146132b2576132ce565b6001915050610bbe565b60ff8411156132c3576132c3613155565b50506001821b610bbe565b5060208310610133831016604e8410600b84101617156132f1575081810a610bbe565b6132fb8383613233565b806000190482111561330f5761330f613155565b029392505050565b600061109a60ff841683613276565b81810381811115610bbe57610bbe613155565b634e487b7160e01b600052601260045260246000fd5b601f821115611076576000816000526020600020601f850160051c810160208610156133785750805b601f850160051c820191505b8181101561339757828155600101613384565b505050505050565b815167ffffffffffffffff8111156133b9576133b9612f7c565b6133cd816133c784546131e6565b8461334f565b602080601f83116001811461340257600084156133ea5750858301515b600019600386901b1c1916600185901b178555613397565b600085815260208120601f198616915b8281101561343157888601518255948401946001909101908401613412565b508582101561344f5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052602160045260246000fd5b600060ff83168061349657634e487b7160e01b600052601260045260246000fd5b8060ff84160691505092915050565b600082516134b7818460208701612dee565b919091019291505056fe52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace005e7a68d59b8e969a6eba9014e1d53fa760e69bfc4c094dc44ed50004fdccdcd802dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b6268000773e532dfede91f04b12a73d3d2acd361424f41f76b4fb79f090161e36b4e00cd5ed15c6e187e77e9aee88184c21f4f2182ab5827cb3b7e07fbedcd63f03300a2646970667358221220c78b383e92ddeea167c1f023f5a72711316341fcd0134b69ec51206d1729e8ee64736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class VaultV2__factory extends ethers_1.ContractFactory {
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
exports.VaultV2__factory = VaultV2__factory;
VaultV2__factory.bytecode = _bytecode;
VaultV2__factory.abi = _abi;
//# sourceMappingURL=VaultV2__factory.js.map