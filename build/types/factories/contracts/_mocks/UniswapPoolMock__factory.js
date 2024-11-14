"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapPoolMock__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "uint160",
                name: "sqrtPriceX96_",
                type: "uint160",
            },
        ],
        name: "setSlot0",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token0_",
                type: "address",
            },
        ],
        name: "setToken0",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "slot0",
        outputs: [
            {
                internalType: "uint160",
                name: "",
                type: "uint160",
            },
            {
                internalType: "int24",
                name: "",
                type: "int24",
            },
            {
                internalType: "uint16",
                name: "",
                type: "uint16",
            },
            {
                internalType: "uint16",
                name: "",
                type: "uint16",
            },
            {
                internalType: "uint16",
                name: "",
                type: "uint16",
            },
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
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
        name: "sqrtPriceX96",
        outputs: [
            {
                internalType: "uint160",
                name: "",
                type: "uint160",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "token0",
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
const _bytecode = "0x608060405234801561001057600080fd5b506101b8806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80630dfe16811461005c5780631859ba571461008c5780633850c7bd146100be5780638db791d214610103578063c6e426bd14610116575b600080fd5b60005461006f906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6100bc61009a36600461015e565b600180546001600160a01b0319166001600160a01b0392909216919091179055565b005b600154604080516001600160a01b039092168252600060208301819052908201819052606082018190526080820181905260a0820181905260c082015260e001610083565b60015461006f906001600160a01b031681565b6100bc61012436600461015e565b600080546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b038116811461015b57600080fd5b50565b60006020828403121561017057600080fd5b813561017b81610146565b939250505056fea2646970667358221220ecfa63c1d56f7b7aeea0540dd19f1402693af021c73837d81a155498c420026064736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class UniswapPoolMock__factory extends ethers_1.ContractFactory {
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
exports.UniswapPoolMock__factory = UniswapPoolMock__factory;
UniswapPoolMock__factory.bytecode = _bytecode;
UniswapPoolMock__factory.abi = _abi;
//# sourceMappingURL=UniswapPoolMock__factory.js.map