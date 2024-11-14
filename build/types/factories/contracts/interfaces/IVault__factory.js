"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IVault__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
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
        name: "InvalidTarget",
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
                name: "newAddress",
                type: "address",
            },
        ],
        name: "WithdrawStrategyAddressSet",
        type: "event",
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
];
class IVault__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IVault__factory = IVault__factory;
IVault__factory.abi = _abi;
//# sourceMappingURL=IVault__factory.js.map