"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IEtherFiLiquifier__factory = void 0;
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
            {
                internalType: "address",
                name: "_referral",
                type: "address",
            },
        ],
        name: "depositWithERC20",
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
class IEtherFiLiquifier__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IEtherFiLiquifier__factory = IEtherFiLiquifier__factory;
IEtherFiLiquifier__factory.abi = _abi;
//# sourceMappingURL=IEtherFiLiquifier__factory.js.map