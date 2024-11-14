"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenzoProtocolMock__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "contract ERC20Mock",
                name: "stETH_",
                type: "address",
            },
            {
                internalType: "contract ERC20Mock",
                name: "ezETH_",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_token",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "deposit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "ezETH",
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
        inputs: [],
        name: "stETH",
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
        inputs: [],
        name: "tokensPerStEth",
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
];
const _bytecode = "0x6080604052600160025534801561001557600080fd5b5060405161036b38038061036b83398101604081905261003491610081565b600080546001600160a01b039384166001600160a01b031991821617909155600180549290931691161790556100b4565b80516001600160a01b038116811461007c57600080fd5b919050565b6000806040838503121561009457600080fd5b61009d83610065565b91506100ab60208401610065565b90509250929050565b6102a8806100c36000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806313a73c781461005157806347e7ef24146100815780639576a0c814610096578063c1fe3e48146100ad575b600080fd5b600154610064906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b61009461008f366004610211565b6100c0565b005b61009f60025481565b604051908152602001610078565b600054610064906001600160a01b031681565b6000546001600160a01b0383811691161461012d5760405162461bcd60e51b8152602060048201526024808201527f52656e7a6f50726f746f636f6c4d6f636b3a20556e737570706f72746564207460448201526337b5b2b760e11b606482015260840160405180910390fd5b6000546040516323b872dd60e01b8152336004820152306024820152604481018390526001600160a01b03909116906323b872dd906064016020604051808303816000875af1158015610184573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101a89190610249565b506001546040516340c10f1960e01b8152336004820152602481018390526001600160a01b03909116906340c10f1990604401600060405180830381600087803b1580156101f557600080fd5b505af1158015610209573d6000803e3d6000fd5b505050505050565b6000806040838503121561022457600080fd5b82356001600160a01b038116811461023b57600080fd5b946020939093013593505050565b60006020828403121561025b57600080fd5b8151801515811461026b57600080fd5b939250505056fea2646970667358221220670cb3cf722ed08a12f5bf67032fcaaa3ee59d84bcb74c21bdd70e3ccdcaba5064736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class RenzoProtocolMock__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(stETH_, ezETH_, overrides) {
        return super.getDeployTransaction(stETH_, ezETH_, overrides || {});
    }
    deploy(stETH_, ezETH_, overrides) {
        return super.deploy(stETH_, ezETH_, overrides || {});
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
exports.RenzoProtocolMock__factory = RenzoProtocolMock__factory;
RenzoProtocolMock__factory.bytecode = _bytecode;
RenzoProtocolMock__factory.abi = _abi;
//# sourceMappingURL=RenzoProtocolMock__factory.js.map