"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IAdapter__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "OnlyWETHAllowed",
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
                name: "liquidTokenQty_",
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
class IAdapter__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IAdapter__factory = IAdapter__factory;
IAdapter__factory.abi = _abi;
//# sourceMappingURL=IAdapter__factory.js.map