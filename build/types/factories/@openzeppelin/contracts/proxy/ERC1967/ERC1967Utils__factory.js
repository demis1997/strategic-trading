"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC1967Utils__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "admin",
                type: "address",
            },
        ],
        name: "ERC1967InvalidAdmin",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "beacon",
                type: "address",
            },
        ],
        name: "ERC1967InvalidBeacon",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "implementation",
                type: "address",
            },
        ],
        name: "ERC1967InvalidImplementation",
        type: "error",
    },
    {
        inputs: [],
        name: "ERC1967NonPayable",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "previousAdmin",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "newAdmin",
                type: "address",
            },
        ],
        name: "AdminChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "beacon",
                type: "address",
            },
        ],
        name: "BeaconUpgraded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "implementation",
                type: "address",
            },
        ],
        name: "Upgraded",
        type: "event",
    },
];
const _bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212209068c6752c3401fdf9e59cbe48503cfe5483a28bb4bac15895b92a3caa5712e064736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class ERC1967Utils__factory extends ethers_1.ContractFactory {
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
exports.ERC1967Utils__factory = ERC1967Utils__factory;
ERC1967Utils__factory.bytecode = _bytecode;
ERC1967Utils__factory.abi = _abi;
//# sourceMappingURL=ERC1967Utils__factory.js.map