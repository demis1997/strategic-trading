"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRenzoLiquifier__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_token",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "deposit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
class IRenzoLiquifier__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IRenzoLiquifier__factory = IRenzoLiquifier__factory;
IRenzoLiquifier__factory.abi = _abi;
//# sourceMappingURL=IRenzoLiquifier__factory.js.map