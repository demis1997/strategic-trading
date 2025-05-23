"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proxy__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        stateMutability: "payable",
        type: "fallback",
    },
];
class Proxy__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.Proxy__factory = Proxy__factory;
Proxy__factory.abi = _abi;
//# sourceMappingURL=Proxy__factory.js.map