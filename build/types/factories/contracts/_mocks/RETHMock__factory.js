"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RETHMock__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "_balances",
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
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
        ],
        name: "allowance",
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
                name: "recipient",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
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
        inputs: [
            {
                internalType: "uint256",
                name: "_rethAmount",
                type: "uint256",
            },
        ],
        name: "burn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "burnFrom",
        outputs: [],
        stateMutability: "nonpayable",
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
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "subtractedValue",
                type: "uint256",
            },
        ],
        name: "decreaseAllowance",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_rethAmount",
                type: "uint256",
            },
        ],
        name: "getEthValue",
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
        name: "getExchangeRate",
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
                name: "_ethAmount",
                type: "uint256",
            },
        ],
        name: "getRethValue",
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
        name: "getTotalCollateral",
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
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "addedValue",
                type: "uint256",
            },
        ],
        name: "increaseAllowance",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_account",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "newBalance",
                type: "uint256",
            },
        ],
        name: "mockBalanceOf",
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
        inputs: [
            {
                internalType: "uint8",
                name: "value",
                type: "uint8",
            },
        ],
        name: "setDecimals",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_exchangeRate",
                type: "uint256",
            },
        ],
        name: "setExchangeRate",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bool",
                name: "_value",
                type: "bool",
            },
        ],
        name: "setIsSafeApprove",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bool",
                name: "_value",
                type: "bool",
            },
        ],
        name: "setNeedToReturnValue",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bool",
                name: "_value",
                type: "bool",
            },
        ],
        name: "setReturnBoolValue",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_totalCollateral",
                type: "uint256",
            },
        ],
        name: "setTotalCollateral",
        outputs: [],
        stateMutability: "nonpayable",
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
    {
        inputs: [],
        name: "totalSupply",
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
                name: "recipient",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transfer",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                internalType: "address",
                name: "recipient",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x60806040526005805463ffffff001916620101001790553480156200002357600080fd5b506040805180820182526004808252630a48aa8960e31b6020808401829052845180860190955291845290830152906012828260036200006483826200013b565b5060046200007382826200013b565b50506005805460ff191660ff93909316929092179091555062000207915050565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680620000bf57607f821691505b602082108103620000e057634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111562000136576000816000526020600020601f850160051c81016020861015620001115750805b601f850160051c820191505b8181101562000132578281556001016200011d565b5050505b505050565b81516001600160401b0381111562000157576200015762000094565b6200016f81620001688454620000aa565b84620000e6565b602080601f831160018114620001a757600084156200018e5750858301515b600019600386901b1c1916600185901b17855562000132565b600085815260208120601f198616915b82811015620001d857888601518255948401946001909101908401620001b7565b5085821015620001f75787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b610fa080620002176000396000f3fe608060405234801561001057600080fd5b506004361061018e5760003560e01c80636ebcf607116100de578063a457c2d711610097578063d6eb591011610071578063d6eb5910146103d8578063db068e0e146103e0578063dd62ed3e146103f3578063e6aa216c1461042c57600080fd5b8063a457c2d714610386578063a9059cbb14610399578063cf787f79146103ac57600080fd5b80636ebcf607146102eb57806370a082311461030b57806379cc6790146103345780637a1395aa146103475780638b32fa231461036b57806395d89b411461037e57600080fd5b8063313ce5671161014b57806340c10f191161012557806340c10f191461029f57806342966c68146102b25780634346f03e146102c557806364794459146102d857600080fd5b8063313ce5671461024d57806335df40f214610262578063395093511461028c57600080fd5b806306fdde0314610193578063095ea7b3146101b157806318160ddd146101d457806323b872dd146101e6578063257224ab146101f95780632dbcb32b14610223575b600080fd5b61019b610434565b6040516101a89190610d3e565b60405180910390f35b6101c46101bf366004610da9565b6104c6565b60405190151581526020016101a8565b6002545b6040519081526020016101a8565b6101c46101f4366004610dd3565b610584565b610221610207366004610e0f565b600580549115156101000261ff0019909216919091179055565b005b610221610231366004610da9565b6001600160a01b03909116600090815260208190526040902055565b60055460405160ff90911681526020016101a8565b610221610270366004610e0f565b60058054911515620100000262ff000019909216919091179055565b6101c461029a366004610da9565b6105dd565b6102216102ad366004610da9565b610619565b6102216102c0366004610e31565b610627565b6101d86102d3366004610e31565b61065e565b6102216102e6366004610e31565b600655565b6101d86102f9366004610e4a565b60006020819052908152604090205481565b6101d8610319366004610e4a565b6001600160a01b031660009081526020819052604090205490565b610221610342366004610da9565b61066e565b610221610355366004610e65565b6005805460ff191660ff92909216919091179055565b6101d8610379366004610e31565b610678565b61019b610688565b6101c4610394366004610da9565b610697565b6101c46103a7366004610da9565b61072b565b6102216103ba366004610e0f565b6005805491151563010000000263ff00000019909216919091179055565b6006546101d8565b6102216103ee366004610e31565b600755565b6101d8610401366004610e88565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6007546101d8565b60606003805461044390610ebb565b80601f016020809104026020016040519081016040528092919081815260200182805461046f90610ebb565b80156104bc5780601f10610491576101008083540402835291602001916104bc565b820191906000526020600020905b81548152906001019060200180831161049f57829003601f168201915b5050505050905090565b60055460009062010000900460ff1680156104e95750600554610100900460ff16155b156104f65750600061057e565b60055462010000900460ff16801561051757506005546301000000900460ff165b801561052257508115155b801561055057503360009081526001602090815260408083206001600160a01b038716845290915290205415155b1561055d5750600061057e565b6105678383610765565b5060055462010000900460ff1661057a57005b5060015b92915050565b60055460009062010000900460ff1680156105a75750600554610100900460ff16155b156105b4575060006105d6565b6105bf848484610772565b5060055462010000900460ff166105d257005b5060015b9392505050565b3360008181526001602090815260408083206001600160a01b0387168452909152812054909161057a918590610614908690610f0b565b61081c565b6106238282610941565b5050565b610631338261066e565b60075433906108fc906106449084610f1e565b6040518115909202916000818181858888f1505050505050565b60006007548261057e9190610f35565b6106238282610a20565b60006007548261057e9190610f1e565b60606004805461044390610ebb565b3360009081526001602090815260408083206001600160a01b03861684529091528120548281101561071e5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b6105d2338585840361081c565b60055460009062010000900460ff16801561074e5750600554610100900460ff16155b1561075b5750600061057e565b6105678383610b66565b600061057a33848461081c565b600061077f848484610b6f565b6001600160a01b0384166000908152600160209081526040808320338452909152902054828110156108045760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b6064820152608401610715565b610811853385840361081c565b506001949350505050565b6001600160a01b03831661087e5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610715565b6001600160a01b0382166108df5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610715565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b0382166109975760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610715565b80600260008282546109a99190610f0b565b90915550506001600160a01b038216600090815260208190526040812080548392906109d6908490610f0b565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6001600160a01b038216610a805760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b6064820152608401610715565b6001600160a01b03821660009081526020819052604090205481811015610af45760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b6064820152608401610715565b6001600160a01b0383166000908152602081905260408120838303905560028054849290610b23908490610f57565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602001610934565b600061057a3384845b6001600160a01b038316610bd35760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610715565b6001600160a01b038216610c355760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610715565b6001600160a01b03831660009081526020819052604090205481811015610cad5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610715565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610ce4908490610f0b565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610d3091815260200190565b60405180910390a350505050565b60006020808352835180602085015260005b81811015610d6c57858101830151858201604001528201610d50565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b0381168114610da457600080fd5b919050565b60008060408385031215610dbc57600080fd5b610dc583610d8d565b946020939093013593505050565b600080600060608486031215610de857600080fd5b610df184610d8d565b9250610dff60208501610d8d565b9150604084013590509250925092565b600060208284031215610e2157600080fd5b813580151581146105d657600080fd5b600060208284031215610e4357600080fd5b5035919050565b600060208284031215610e5c57600080fd5b6105d682610d8d565b600060208284031215610e7757600080fd5b813560ff811681146105d657600080fd5b60008060408385031215610e9b57600080fd5b610ea483610d8d565b9150610eb260208401610d8d565b90509250929050565b600181811c90821680610ecf57607f821691505b602082108103610eef57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b8082018082111561057e5761057e610ef5565b808202811582820484141761057e5761057e610ef5565b600082610f5257634e487b7160e01b600052601260045260246000fd5b500490565b8181038181111561057e5761057e610ef556fea264697066735822122065e73f6e724bc08b194970c45921ed6b9c600a93ccad9682c85386b25981ce2f64736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class RETHMock__factory extends ethers_1.ContractFactory {
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
exports.RETHMock__factory = RETHMock__factory;
RETHMock__factory.bytecode = _bytecode;
RETHMock__factory.abi = _abi;
//# sourceMappingURL=RETHMock__factory.js.map