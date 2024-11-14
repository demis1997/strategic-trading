"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counter__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "int256",
                name: "_count",
                type: "int256",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "decrementCount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "getCount",
        outputs: [
            {
                internalType: "int256",
                name: "count_",
                type: "int256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "incrementCount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "int256",
                name: "count_",
                type: "int256",
            },
        ],
        name: "setCount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b506040516101c93803806101c983398101604081905261002f91610037565b600055610050565b60006020828403121561004957600080fd5b5051919050565b61016a8061005f6000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063a87d942c14610051578063b7f90f1214610066578063e5071b8e14610070578063fc583c8d14610078575b600080fd5b60005460405190815260200160405180910390f35b61006e61008b565b005b61006e6100a4565b61006e6100863660046100b6565b600055565b600160008082825461009d91906100e5565b9091555050565b600160008082825461009d919061010c565b6000602082840312156100c857600080fd5b5035919050565b634e487b7160e01b600052601160045260246000fd5b8181036000831280158383131683831282161715610105576101056100cf565b5092915050565b808201828112600083128015821682158216171561012c5761012c6100cf565b50509291505056fea2646970667358221220477660fd1e9513dd4527d6dab273055fe355acecf9466a2180978538c622020e64736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class Counter__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(_count, overrides) {
        return super.getDeployTransaction(_count, overrides || {});
    }
    deploy(_count, overrides) {
        return super.deploy(_count, overrides || {});
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
exports.Counter__factory = Counter__factory;
Counter__factory.bytecode = _bytecode;
Counter__factory.abi = _abi;
//# sourceMappingURL=Counter__factory.js.map