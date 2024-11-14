"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ICounter__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "decrementCount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "getCount",
        outputs: [
            {
                internalType: "int256",
                name: "count",
                type: "int256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "incrementCount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "int256",
                name: "count",
                type: "int256",
            },
        ],
        name: "setCount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
class ICounter__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.ICounter__factory = ICounter__factory;
ICounter__factory.abi = _abi;
//# sourceMappingURL=ICounter__factory.js.map