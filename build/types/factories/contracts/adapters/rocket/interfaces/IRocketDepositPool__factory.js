"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRocketDepositPool__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "deposit",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "getBalance",
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
class IRocketDepositPool__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IRocketDepositPool__factory = IRocketDepositPool__factory;
IRocketDepositPool__factory.abi = _abi;
//# sourceMappingURL=IRocketDepositPool__factory.js.map