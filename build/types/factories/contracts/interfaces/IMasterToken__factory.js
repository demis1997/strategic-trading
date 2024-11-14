"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMasterToken__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "getUserSharesBalance",
        outputs: [
            {
                internalType: "uint256",
                name: "userSharesBalance",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
];
class IMasterToken__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IMasterToken__factory = IMasterToken__factory;
IMasterToken__factory.abi = _abi;
//# sourceMappingURL=IMasterToken__factory.js.map