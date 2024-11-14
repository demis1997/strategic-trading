"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IKelpProtocol__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "asset",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "depositAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "minRSETHAmountExpected",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "referralId",
                type: "string",
            },
        ],
        name: "depositAsset",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "asset",
                type: "address",
            },
        ],
        name: "getAssetCurrentLimit",
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
                name: "asset",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "getRsETHAmountToMint",
        outputs: [
            {
                internalType: "uint256",
                name: "rsethAmountToMint",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "minAmountToDeposit",
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
];
class IKelpProtocol__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IKelpProtocol__factory = IKelpProtocol__factory;
IKelpProtocol__factory.abi = _abi;
//# sourceMappingURL=IKelpProtocol__factory.js.map