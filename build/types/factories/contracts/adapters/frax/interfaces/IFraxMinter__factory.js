"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IFraxMinter__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "recipient",
                type: "address",
            },
        ],
        name: "submitAndDeposit",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
];
class IFraxMinter__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IFraxMinter__factory = IFraxMinter__factory;
IFraxMinter__factory.abi = _abi;
//# sourceMappingURL=IFraxMinter__factory.js.map