"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ITransferStrategy__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "from_",
                type: "address",
            },
            {
                internalType: "address",
                name: "to_",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "assetAmount",
                type: "uint256",
            },
        ],
        name: "executePartialTransferStrategy",
        outputs: [
            {
                internalType: "address[]",
                name: "vaults",
                type: "address[]",
            },
            {
                internalType: "uint256[]",
                name: "shares",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
class ITransferStrategy__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.ITransferStrategy__factory = ITransferStrategy__factory;
ITransferStrategy__factory.abi = _abi;
//# sourceMappingURL=ITransferStrategy__factory.js.map