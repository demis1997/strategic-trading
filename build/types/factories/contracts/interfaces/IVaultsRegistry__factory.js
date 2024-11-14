"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IVaultsRegistry__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "DefaultFeeRateError",
        type: "error",
    },
    {
        inputs: [],
        name: "FailedVaultDeployment",
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
                indexed: false,
                internalType: "uint256",
                name: "newFeeRate",
                type: "uint256",
            },
        ],
        name: "DefaultFeeRateSet",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "vault",
                type: "address",
            },
        ],
        name: "VaultDeployed",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "newImplementation",
                type: "address",
            },
        ],
        name: "VaultImplementationChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "vaultAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "status",
                type: "bool",
            },
        ],
        name: "VaultStatusChanged",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "vaultAddress_",
                type: "address",
            },
        ],
        name: "isVaultActive",
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
class IVaultsRegistry__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IVaultsRegistry__factory = IVaultsRegistry__factory;
IVaultsRegistry__factory.abi = _abi;
//# sourceMappingURL=IVaultsRegistry__factory.js.map