"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IEtherFiLiqudityPool__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "recipient",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "requestWithdraw",
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
class IEtherFiLiqudityPool__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IEtherFiLiqudityPool__factory = IEtherFiLiqudityPool__factory;
IEtherFiLiqudityPool__factory.abi = _abi;
//# sourceMappingURL=IEtherFiLiqudityPool__factory.js.map