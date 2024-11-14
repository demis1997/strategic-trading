"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafeERC20__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "currentAllowance",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "requestedDecrease",
                type: "uint256",
            },
        ],
        name: "SafeERC20FailedDecreaseAllowance",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
        ],
        name: "SafeERC20FailedOperation",
        type: "error",
    },
];
const _bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212205be4415957576b39c3e94bb9cd245f947a85d3d5eb777d54dca5e167437f0c3864736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class SafeERC20__factory extends ethers_1.ContractFactory {
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
exports.SafeERC20__factory = SafeERC20__factory;
SafeERC20__factory.bytecode = _bytecode;
SafeERC20__factory.abi = _abi;
//# sourceMappingURL=SafeERC20__factory.js.map