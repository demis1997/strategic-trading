"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KelpMock__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "contract ERC20Mock",
                name: "rsETH_",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "assetCurrentLimit",
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
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        name: "depositAsset",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "getAssetCurrentLimit",
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
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "getRsETHAmountToMint",
        outputs: [
            {
                internalType: "uint256",
                name: "rsethAmountToMint",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "minAmountToDeposit",
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
        name: "rsETH",
        outputs: [
            {
                internalType: "contract ERC20Mock",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "limit",
                type: "uint256",
            },
        ],
        name: "setAssetCurrentLimit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "setRsETHAmountToMint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "min",
                type: "uint256",
            },
        ],
        name: "setminAmountToDeposit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "toMint",
                type: "uint256",
            },
        ],
        name: "setrsETHAmountToMint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b506040516103b83803806103b883398101604081905261002f91610054565b600380546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b610325806100936000396000f3fe608060405234801561001057600080fd5b506004361061009d5760003560e01c8063b205e6c111610066578063b205e6c11461011c578063ba5bb4421461012f578063c3ae176614610145578063ca58e4ff146100e5578063fd83f9af1461015857600080fd5b8062b83bce146100a257806337ece810146100d2578063778fbe60146100e7578063884c1056146100fe5780639d45f18a14610113575b600080fd5b6003546100b5906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6100e56100e03660046101da565b600155565b005b6100f060015481565b6040519081526020016100c9565b6100f061010c36600461020f565b5060025490565b6100f060025481565b6100e561012a3660046101da565b600055565b6100f061013d366004610231565b505060005490565b6100e561015336600461025b565b61016b565b6100e56101663660046101da565b600255565b6003546000546040516340c10f1960e01b815233600482015260248101919091526001600160a01b03909116906340c10f1990604401600060405180830381600087803b1580156101bb57600080fd5b505af11580156101cf573d6000803e3d6000fd5b505050505050505050565b6000602082840312156101ec57600080fd5b5035919050565b80356001600160a01b038116811461020a57600080fd5b919050565b60006020828403121561022157600080fd5b61022a826101f3565b9392505050565b6000806040838503121561024457600080fd5b61024d836101f3565b946020939093013593505050565b60008060008060006080868803121561027357600080fd5b61027c866101f3565b94506020860135935060408601359250606086013567ffffffffffffffff808211156102a757600080fd5b818801915088601f8301126102bb57600080fd5b8135818111156102ca57600080fd5b8960208285010111156102dc57600080fd5b969995985093965060200194939250505056fea2646970667358221220d145f365e63215e2b7b16f6576f0e825a29f84259938ca61802377bed5885ef764736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class KelpMock__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(rsETH_, overrides) {
        return super.getDeployTransaction(rsETH_, overrides || {});
    }
    deploy(rsETH_, overrides) {
        return super.deploy(rsETH_, overrides || {});
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
exports.KelpMock__factory = KelpMock__factory;
KelpMock__factory.bytecode = _bytecode;
KelpMock__factory.abi = _abi;
//# sourceMappingURL=KelpMock__factory.js.map