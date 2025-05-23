"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IBeacon__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "implementation",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
class IBeacon__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IBeacon__factory = IBeacon__factory;
IBeacon__factory.abi = _abi;
//# sourceMappingURL=IBeacon__factory.js.map