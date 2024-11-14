"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockAggregationExecutor__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
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
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "execute",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b5061011a806100206000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063b61d27f614602d575b600080fd5b604360383660046055565b6103e8949350505050565b60405190815260200160405180910390f35b60008060008060608587031215606a57600080fd5b84356001600160a01b0381168114608057600080fd5b935060208501359250604085013567ffffffffffffffff8082111560a357600080fd5b818701915087601f83011260b657600080fd5b81358181111560c457600080fd5b88602082850101111560d557600080fd5b9598949750506020019450505056fea26469706673582212200054a2048a1905da9468f549101523181d6fb3eeba9ee958b2d0e7c3cec26f9b64736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class MockAggregationExecutor__factory extends ethers_1.ContractFactory {
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
exports.MockAggregationExecutor__factory = MockAggregationExecutor__factory;
MockAggregationExecutor__factory.bytecode = _bytecode;
MockAggregationExecutor__factory.abi = _abi;
//# sourceMappingURL=MockAggregationExecutor__factory.js.map