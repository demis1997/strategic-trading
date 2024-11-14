"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRocketDAOProtocolSettingsDeposit__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "getDepositEnabled",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getDepositFee",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getMaximumDepositPoolSize",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getMinimumDeposit",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
class IRocketDAOProtocolSettingsDeposit__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IRocketDAOProtocolSettingsDeposit__factory = IRocketDAOProtocolSettingsDeposit__factory;
IRocketDAOProtocolSettingsDeposit__factory.abi = _abi;
//# sourceMappingURL=IRocketDAOProtocolSettingsDeposit__factory.js.map