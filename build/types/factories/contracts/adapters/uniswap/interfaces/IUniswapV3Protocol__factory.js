"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IUniswapV3Protocol__factory = void 0;
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
                internalType: "struct IUniswapV3Protocol.ExactOutputParams",
                name: "params",
                type: "tuple",
            },
        ],
        name: "exactOutput",
        outputs: [
            {
                internalType: "uint256",
                name: "amountIn",
                type: "uint256",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "path",
                type: "bytes",
            },
            {
                internalType: "uint256",
                name: "amountOut",
                type: "uint256",
            },
        ],
        name: "quoteExactOutput",
        outputs: [
            {
                internalType: "uint256",
                name: "amountIn",
                type: "uint256",
            },
            {
                internalType: "uint160[]",
                name: "sqrtPriceX96AfterList",
                type: "uint160[]",
            },
            {
                internalType: "uint32[]",
                name: "initializedTicksCrossedList",
                type: "uint32[]",
            },
            {
                internalType: "uint256",
                name: "gasEstimate",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "slot0",
        outputs: [
            {
                internalType: "uint160",
                name: "sqrtPriceX96",
                type: "uint160",
            },
            {
                internalType: "int24",
                name: "tick",
                type: "int24",
            },
            {
                internalType: "uint16",
                name: "observationIndex",
                type: "uint16",
            },
            {
                internalType: "uint16",
                name: "observationCardinality",
                type: "uint16",
            },
            {
                internalType: "uint16",
                name: "observationCardinalityNext",
                type: "uint16",
            },
            {
                internalType: "uint8",
                name: "feeProtocol",
                type: "uint8",
            },
            {
                internalType: "bool",
                name: "unlocked",
                type: "bool",
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
class IUniswapV3Protocol__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IUniswapV3Protocol__factory = IUniswapV3Protocol__factory;
IUniswapV3Protocol__factory.abi = _abi;
//# sourceMappingURL=IUniswapV3Protocol__factory.js.map