"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapV3QuoterMock__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "amountIn",
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
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "quoteExactOutput",
        outputs: [
            {
                internalType: "uint256",
                name: "",
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
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amountIn_",
                type: "uint256",
            },
        ],
        name: "setQuoteExactOutput",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b5061025e806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80632f80bb1d146100465780634f8e87e11461007b5780636bed55a614610090575b600080fd5b6100626100543660046100bd565b505060008054916060918291565b6040516100729493929190610172565b60405180910390f35b61008e61008936600461020f565b600055565b005b61009960005481565b604051908152602001610072565b634e487b7160e01b600052604160045260246000fd5b600080604083850312156100d057600080fd5b823567ffffffffffffffff808211156100e857600080fd5b818501915085601f8301126100fc57600080fd5b81358181111561010e5761010e6100a7565b604051601f8201601f19908116603f01168101908382118183101715610136576101366100a7565b8160405282815288602084870101111561014f57600080fd5b826020860160208301376000602093820184015298969091013596505050505050565b600060808201868352602060808185015281875180845260a086019150828901935060005b818110156101bc5784516001600160a01b031683529383019391830191600101610197565b50508481036040860152865180825290820192508187019060005b818110156101f957825163ffffffff16855293830193918301916001016101d7565b5050505060609290920192909252949350505050565b60006020828403121561022157600080fd5b503591905056fea2646970667358221220995e4f930f2d12449e13c1f664dd220935efcd642f4f424dd5400aa773a5cfbc64736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class UniswapV3QuoterMock__factory extends ethers_1.ContractFactory {
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
exports.UniswapV3QuoterMock__factory = UniswapV3QuoterMock__factory;
UniswapV3QuoterMock__factory.bytecode = _bytecode;
UniswapV3QuoterMock__factory.abi = _abi;
//# sourceMappingURL=UniswapV3QuoterMock__factory.js.map