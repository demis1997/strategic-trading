"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapV3RouterMock__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "bytes",
                        name: "path",
                        type: "bytes",
                    },
                    {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "amountOut",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "amountInMaximum",
                        type: "uint256",
                    },
                ],
                internalType: "struct UniswapV3RouterMock.ExactOutputParams",
                name: "",
                type: "tuple",
            },
        ],
        name: "exactOutput",
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
    {
        inputs: [],
        name: "output",
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
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "setExactOutput",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b50610118806100206000396000f3fe60806040526004361060305760003560e01c806309b81346146035578063747ca476146059578063f20eaeb8146077575b600080fd5b60476040366004608b565b5060005490565b60405190815260200160405180910390f35b348015606457600080fd5b506075607036600460ca565b600055565b005b348015608257600080fd5b50604760005481565b600060208284031215609c57600080fd5b813567ffffffffffffffff81111560b257600080fd5b82016080818503121560c357600080fd5b9392505050565b60006020828403121560db57600080fd5b503591905056fea2646970667358221220b74d77385eadd450e6f973de73fc3b60e78141b65a4b88e0d8ed448221f8159864736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class UniswapV3RouterMock__factory extends ethers_1.ContractFactory {
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
exports.UniswapV3RouterMock__factory = UniswapV3RouterMock__factory;
UniswapV3RouterMock__factory.bytecode = _bytecode;
UniswapV3RouterMock__factory.abi = _abi;
//# sourceMappingURL=UniswapV3RouterMock__factory.js.map