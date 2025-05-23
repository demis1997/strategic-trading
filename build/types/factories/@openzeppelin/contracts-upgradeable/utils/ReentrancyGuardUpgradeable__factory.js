"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReentrancyGuardUpgradeable__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "InvalidInitialization",
        type: "error",
    },
    {
        inputs: [],
        name: "NotInitializing",
        type: "error",
    },
    {
        inputs: [],
        name: "ReentrancyGuardReentrantCall",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint64",
                name: "version",
                type: "uint64",
            },
        ],
        name: "Initialized",
        type: "event",
    },
];
class ReentrancyGuardUpgradeable__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.ReentrancyGuardUpgradeable__factory = ReentrancyGuardUpgradeable__factory;
ReentrancyGuardUpgradeable__factory.abi = _abi;
//# sourceMappingURL=ReentrancyGuardUpgradeable__factory.js.map