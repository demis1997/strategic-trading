"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FraxMinterMock__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "contract FraxETHMock",
                name: "_frxETH",
                type: "address",
            },
            {
                internalType: "contract SfrxETHMock",
                name: "_sfrxETH",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "frxETH",
        outputs: [
            {
                internalType: "contract FraxETHMock",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "sfrxETH",
        outputs: [
            {
                internalType: "contract SfrxETHMock",
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
                internalType: "address",
                name: "_recipient",
                type: "address",
            },
        ],
        name: "submitAndDeposit",
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
];
const _bytecode = "0x608060405234801561001057600080fd5b5060405161025038038061025083398101604081905261002f91610078565b600080546001600160a01b039384166001600160a01b031991821617909155600180549290931691161790556100b2565b6001600160a01b038116811461007557600080fd5b50565b6000806040838503121561008b57600080fd5b825161009681610060565b60208401519092506100a781610060565b809150509250929050565b61018f806100c16000396000f3fe6080604052600436106100345760003560e01c80634dcd454714610039578063565d3e6e1461005f578063c9ac8c8e14610097575b600080fd5b61004c610047366004610129565b6100b7565b6040519081526020015b60405180910390f35b34801561006b57600080fd5b5060005461007f906001600160a01b031681565b6040516001600160a01b039091168152602001610056565b3480156100a357600080fd5b5060015461007f906001600160a01b031681565b6001546040516340c10f1960e01b81526001600160a01b038381166004830152346024830181905260009390929116906340c10f1990604401600060405180830381600087803b15801561010a57600080fd5b505af115801561011e573d6000803e3d6000fd5b509295945050505050565b60006020828403121561013b57600080fd5b81356001600160a01b038116811461015257600080fd5b939250505056fea2646970667358221220e14acbe1202c9448d2c2008e4550051461d2f47177d5e60d2862636e0956963d64736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class FraxMinterMock__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(_frxETH, _sfrxETH, overrides) {
        return super.getDeployTransaction(_frxETH, _sfrxETH, overrides || {});
    }
    deploy(_frxETH, _sfrxETH, overrides) {
        return super.deploy(_frxETH, _sfrxETH, overrides || {});
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
exports.FraxMinterMock__factory = FraxMinterMock__factory;
FraxMinterMock__factory.bytecode = _bytecode;
FraxMinterMock__factory.abi = _abi;
//# sourceMappingURL=FraxMinterMock__factory.js.map