"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Math__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "MathOverflowedMulDiv",
        type: "error",
    },
];
const _bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212202e1a42b3389c405d27ca541948e0d702a56c49b768dc430c6662618b867d919f64736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class Math__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    connect(runner) {
        return super.connect(runner);
    }
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.Math__factory = Math__factory;
Math__factory.bytecode = _bytecode;
Math__factory.abi = _abi;
//# sourceMappingURL=Math__factory.js.map