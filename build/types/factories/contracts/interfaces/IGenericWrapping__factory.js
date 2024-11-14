"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IGenericWrapping__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amount_",
                type: "uint256",
            },
        ],
        name: "unwrap",
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
                internalType: "uint256",
                name: "amount_",
                type: "uint256",
            },
        ],
        name: "wrap",
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
];
class IGenericWrapping__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IGenericWrapping__factory = IGenericWrapping__factory;
IGenericWrapping__factory.abi = _abi;
//# sourceMappingURL=IGenericWrapping__factory.js.map