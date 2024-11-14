"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RocketSettingsMock__factory = void 0;
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
    {
        inputs: [
            {
                internalType: "bool",
                name: "_depositEnabled",
                type: "bool",
            },
        ],
        name: "setDepositEnabled",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_depositFee",
                type: "uint256",
            },
        ],
        name: "setDepositFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_maximumDepositPoolSize",
                type: "uint256",
            },
        ],
        name: "setMaximumDepositPoolSize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_minimumDeposit",
                type: "uint256",
            },
        ],
        name: "setMinimumDeposit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b5061019e806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80636ada78471161005b5780636ada7847146100e257806370e5e4f8146100f8578063e78ec42e1461010b578063fd6ce89e1461011e57600080fd5b8063035cf1421461008d5780630de705b5146100a4578063490ae210146100ac5780635b17d04b146100c1575b600080fd5b6001545b6040519081526020015b60405180910390f35b600354610091565b6100bf6100ba366004610126565b600355565b005b6100bf6100cf36600461013f565b6000805460ff1916911515919091179055565b60005460ff16604051901515815260200161009b565b6100bf610106366004610126565b600255565b6100bf610119366004610126565b600155565b600254610091565b60006020828403121561013857600080fd5b5035919050565b60006020828403121561015157600080fd5b8135801515811461016157600080fd5b939250505056fea26469706673582212201408d4e831f80f514a5001d5fd45663a399566c5d33d845a0d13599c4c98adaf64736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class RocketSettingsMock__factory extends ethers_1.ContractFactory {
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
exports.RocketSettingsMock__factory = RocketSettingsMock__factory;
RocketSettingsMock__factory.bytecode = _bytecode;
RocketSettingsMock__factory.abi = _abi;
//# sourceMappingURL=RocketSettingsMock__factory.js.map