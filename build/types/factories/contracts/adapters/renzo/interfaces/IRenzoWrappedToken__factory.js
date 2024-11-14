"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRenzoWrappedToken__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pzETHAddress",
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
                name: "_ezETHAmount",
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
class IRenzoWrappedToken__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IRenzoWrappedToken__factory = IRenzoWrappedToken__factory;
IRenzoWrappedToken__factory.abi = _abi;
//# sourceMappingURL=IRenzoWrappedToken__factory.js.map