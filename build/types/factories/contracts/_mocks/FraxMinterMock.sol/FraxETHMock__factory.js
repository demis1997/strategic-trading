"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FraxETHMock__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "balanceOf",
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
        name: "decimals",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x60c0604052600860809081526708ce4c2f0408aa8960c31b60a0526000906100279082610113565b506040805180820190915260068152650cce4f08aa8960d31b60208201526001906100529082610113565b506002805460ff1916601217905534801561006c57600080fd5b506101d2565b634e487b7160e01b600052604160045260246000fd5b600181811c9082168061009c57607f821691505b6020821081036100bc57634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561010e576000816000526020600020601f850160051c810160208610156100eb5750805b601f850160051c820191505b8181101561010a578281556001016100f7565b5050505b505050565b81516001600160401b0381111561012c5761012c610072565b6101408161013a8454610088565b846100c2565b602080601f831160018114610175576000841561015d5750858301515b600019600386901b1c1916600185901b17855561010a565b600085815260208120601f198616915b828110156101a457888601518255948401946001909101908401610185565b50858210156101c25787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6102fe806101e16000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806306fdde031461005c578063313ce5671461007a57806340c10f191461009957806370a08231146100ae57806395d89b41146100dc575b600080fd5b6100646100e4565b60405161007191906101b0565b60405180910390f35b6002546100879060ff1681565b60405160ff9091168152602001610071565b6100ac6100a736600461021b565b610172565b005b6100ce6100bc366004610245565b60036020526000908152604090205481565b604051908152602001610071565b6100646101a3565b600080546100f190610267565b80601f016020809104026020016040519081016040528092919081815260200182805461011d90610267565b801561016a5780601f1061013f5761010080835404028352916020019161016a565b820191906000526020600020905b81548152906001019060200180831161014d57829003601f168201915b505050505081565b6001600160a01b0382166000908152600360205260408120805483929061019a9084906102a1565b90915550505050565b600180546100f190610267565b60006020808352835180602085015260005b818110156101de578581018301518582016040015282016101c2565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b038116811461021657600080fd5b919050565b6000806040838503121561022e57600080fd5b610237836101ff565b946020939093013593505050565b60006020828403121561025757600080fd5b610260826101ff565b9392505050565b600181811c9082168061027b57607f821691505b60208210810361029b57634e487b7160e01b600052602260045260246000fd5b50919050565b808201808211156102c257634e487b7160e01b600052601160045260246000fd5b9291505056fea264697066735822122044d06995738ff086935cea25201bd7971f1d5ee9984c14513cf7649961f956ce64736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class FraxETHMock__factory extends ethers_1.ContractFactory {
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
exports.FraxETHMock__factory = FraxETHMock__factory;
FraxETHMock__factory.bytecode = _bytecode;
FraxETHMock__factory.abi = _abi;
//# sourceMappingURL=FraxETHMock__factory.js.map