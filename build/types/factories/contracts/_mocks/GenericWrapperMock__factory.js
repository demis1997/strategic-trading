"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericWrapperMock__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "liquidToken_",
                type: "address",
            },
            {
                internalType: "string",
                name: "name_",
                type: "string",
            },
            {
                internalType: "string",
                name: "symbol_",
                type: "string",
            },
            {
                internalType: "uint8",
                name: "decimals_",
                type: "uint8",
            },
        ],
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
        inputs: [],
        name: "amountToReturn",
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
        inputs: [],
        name: "expectToFail",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
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
        inputs: [],
        name: "liquidToken",
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
                internalType: "uint256",
                name: "amountToReturn_",
                type: "uint256",
            },
        ],
        name: "setAmountToReturn",
        outputs: [],
        stateMutability: "nonpayable",
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
                internalType: "bool",
                name: "value_",
                type: "bool",
            },
        ],
        name: "setExpectToFail",
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
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amount_",
                type: "uint256",
            },
        ],
        name: "unwrap",
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
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amount_",
                type: "uint256",
            },
        ],
        name: "wrap",
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
const _bytecode = "0x60806040526005805463ffffff001916620101001790553480156200002357600080fd5b50604051620016673803806200166783398101604081905262000046916200017b565b82828282826003620000598382620002b0565b506004620000688282620002b0565b5050600580546001600160a01b039099166401000000000263ffffff01600160c01b031990991660ff909316929092179790971790555050633ade68b1600655506200037c92505050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620000db57600080fd5b81516001600160401b0380821115620000f857620000f8620000b3565b604051601f8301601f19908116603f01168101908282118183101715620001235762000123620000b3565b81604052838152602092508660208588010111156200014157600080fd5b600091505b8382101562000165578582018301518183018401529082019062000146565b6000602085830101528094505050505092915050565b600080600080608085870312156200019257600080fd5b84516001600160a01b0381168114620001aa57600080fd5b60208601519094506001600160401b0380821115620001c857600080fd5b620001d688838901620000c9565b94506040870151915080821115620001ed57600080fd5b50620001fc87828801620000c9565b925050606085015160ff811681146200021457600080fd5b939692955090935050565b600181811c908216806200023457607f821691505b6020821081036200025557634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620002ab576000816000526020600020601f850160051c81016020861015620002865750805b601f850160051c820191505b81811015620002a75782815560010162000292565b5050505b505050565b81516001600160401b03811115620002cc57620002cc620000b3565b620002e481620002dd84546200021f565b846200025b565b602080601f8311600181146200031c5760008415620003035750858301515b600019600386901b1c1916600185901b178555620002a7565b600085815260208120601f198616915b828110156200034d578886015182559484019460019091019084016200032c565b50858210156200036c5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6112db806200038c6000396000f3fe608060405234801561001057600080fd5b506004361061018e5760003560e01c806379cc6790116100de578063c128f75d11610097578063de0e9a3e11610071578063de0e9a3e14610426578063e500590114610439578063ea598cb014610442578063feaa09941461045557600080fd5b8063c128f75d146103b4578063cf787f79146103c1578063dd62ed3e146103ed57600080fd5b806379cc67901461032e5780637a1395aa1461034157806395d89b41146103655780639f95f8c11461036d578063a457c2d71461038e578063a9059cbb146103a157600080fd5b8063313ce5671161014b57806340c10f191161012557806340c10f191461029f57806366cd5dc7146102b25780636ebcf607146102e557806370a082311461030557600080fd5b8063313ce5671461024d57806335df40f214610262578063395093511461028c57600080fd5b806306fdde0314610193578063095ea7b3146101b157806318160ddd146101d457806323b872dd146101e6578063257224ab146101f95780632dbcb32b14610223575b600080fd5b61019b610468565b6040516101a89190611070565b60405180910390f35b6101c46101bf3660046110db565b6104fa565b60405190151581526020016101a8565b6002545b6040519081526020016101a8565b6101c46101f4366004611105565b6105b8565b610221610207366004611152565b600580549115156101000261ff0019909216919091179055565b005b6102216102313660046110db565b6001600160a01b03909116600090815260208190526040902055565b60055460405160ff90911681526020016101a8565b610221610270366004611152565b60058054911515620100000262ff000019909216919091179055565b6101c461029a3660046110db565b610611565b6102216102ad3660046110db565b61064d565b6005546102cd9064010000000090046001600160a01b031681565b6040516001600160a01b0390911681526020016101a8565b6101d86102f336600461116f565b60006020819052908152604090205481565b6101d861031336600461116f565b6001600160a01b031660009081526020819052604090205490565b61022161033c3660046110db565b61065b565b61022161034f36600461118a565b6005805460ff191660ff92909216919091179055565b61019b610665565b61022161037b366004611152565b6007805460ff1916911515919091179055565b6101c461039c3660046110db565b610674565b6101c46103af3660046110db565b610708565b6007546101c49060ff1681565b6102216103cf366004611152565b6005805491151563010000000263ff00000019909216919091179055565b6101d86103fb3660046111ad565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6101d86104343660046111e0565b610742565b6101d860065481565b6101d86104503660046111e0565b610989565b6102216104633660046111e0565b600655565b606060038054610477906111f9565b80601f01602080910402602001604051908101604052809291908181526020018280546104a3906111f9565b80156104f05780601f106104c5576101008083540402835291602001916104f0565b820191906000526020600020905b8154815290600101906020018083116104d357829003601f168201915b5050505050905090565b60055460009062010000900460ff16801561051d5750600554610100900460ff16155b1561052a575060006105b2565b60055462010000900460ff16801561054b57506005546301000000900460ff165b801561055657508115155b801561058457503360009081526001602090815260408083206001600160a01b038716845290915290205415155b15610591575060006105b2565b61059b8383610a97565b5060055462010000900460ff166105ae57005b5060015b92915050565b60055460009062010000900460ff1680156105db5750600554610100900460ff16155b156105e85750600061060a565b6105f3848484610aa4565b5060055462010000900460ff1661060657005b5060015b9392505050565b3360008181526001602090815260408083206001600160a01b038716845290915281205490916105ae918590610648908690611249565b610b4e565b6106578282610c73565b5050565b6106578282610d52565b606060048054610477906111f9565b3360009081526001602090815260408083206001600160a01b0386168452909152812054828110156106fb5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b6106063385858403610b4e565b60055460009062010000900460ff16801561072b5750600554610100900460ff16155b15610738575060006105b2565b61059b8383610e98565b60075460009060ff161561078a5760405162461bcd60e51b815260206004820152600f60248201526e1d5b9ddc985c081c995d995c9d1959608a1b60448201526064016106f2565b6000600654633ade68b10361079f57826107a3565b6006545b9050806000036107b65750600092915050565b6005546040516370a0823160e01b81523060048201526401000000009091046001600160a01b0316906370a0823190602401602060405180830381865afa158015610805573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610829919061125c565b8111156108785760405162461bcd60e51b815260206004820181905260248201527f4e6f7420656e6f756768206c6971756964546f6b656e20746f2072657475726e60448201526064016106f2565b306323b872dd336040516001600160e01b031960e084901b1681526001600160a01b039091166004820152306024820152604481018490526064016020604051808303816000875af11580156108d2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108f69190611275565b5060055464010000000090046001600160a01b031663a9059cbb336040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602481018690526044016020604051808303816000875af115801561095e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109829190611275565b5092915050565b60075460009060ff16156109cf5760405162461bcd60e51b815260206004820152600d60248201526c1ddc985c081c995d995c9d1959609a1b60448201526064016106f2565b6000600654633ade68b1036109e457826109e8565b6006545b9050806000036109fb5750600092915050565b60055464010000000090046001600160a01b03166323b872dd336040516001600160e01b031960e084901b1681526001600160a01b039091166004820152306024820152604481018690526064016020604051808303816000875af1158015610a68573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a8c9190611275565b506105b2338261064d565b60006105ae338484610b4e565b6000610ab1848484610ea1565b6001600160a01b038416600090815260016020908152604080832033845290915290205482811015610b365760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b60648201526084016106f2565b610b438533858403610b4e565b506001949350505050565b6001600160a01b038316610bb05760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016106f2565b6001600160a01b038216610c115760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016106f2565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b038216610cc95760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016106f2565b8060026000828254610cdb9190611249565b90915550506001600160a01b03821660009081526020819052604081208054839290610d08908490611249565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6001600160a01b038216610db25760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016106f2565b6001600160a01b03821660009081526020819052604090205481811015610e265760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016106f2565b6001600160a01b0383166000908152602081905260408120838303905560028054849290610e55908490611292565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602001610c66565b60006105ae3384845b6001600160a01b038316610f055760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016106f2565b6001600160a01b038216610f675760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016106f2565b6001600160a01b03831660009081526020819052604090205481811015610fdf5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016106f2565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290611016908490611249565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161106291815260200190565b60405180910390a350505050565b60006020808352835180602085015260005b8181101561109e57858101830151858201604001528201611082565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b03811681146110d657600080fd5b919050565b600080604083850312156110ee57600080fd5b6110f7836110bf565b946020939093013593505050565b60008060006060848603121561111a57600080fd5b611123846110bf565b9250611131602085016110bf565b9150604084013590509250925092565b801515811461114f57600080fd5b50565b60006020828403121561116457600080fd5b813561060a81611141565b60006020828403121561118157600080fd5b61060a826110bf565b60006020828403121561119c57600080fd5b813560ff8116811461060a57600080fd5b600080604083850312156111c057600080fd5b6111c9836110bf565b91506111d7602084016110bf565b90509250929050565b6000602082840312156111f257600080fd5b5035919050565b600181811c9082168061120d57607f821691505b60208210810361122d57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b808201808211156105b2576105b2611233565b60006020828403121561126e57600080fd5b5051919050565b60006020828403121561128757600080fd5b815161060a81611141565b818103818111156105b2576105b261123356fea264697066735822122014e5f08d3d1b3ef879ff0de3f14e744b88fcd2d93709b3bcc738abfd273704af64736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class GenericWrapperMock__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(liquidToken_, name_, symbol_, decimals_, overrides) {
        return super.getDeployTransaction(liquidToken_, name_, symbol_, decimals_, overrides || {});
    }
    deploy(liquidToken_, name_, symbol_, decimals_, overrides) {
        return super.deploy(liquidToken_, name_, symbol_, decimals_, overrides || {});
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
exports.GenericWrapperMock__factory = GenericWrapperMock__factory;
GenericWrapperMock__factory.bytecode = _bytecode;
GenericWrapperMock__factory.abi = _abi;
//# sourceMappingURL=GenericWrapperMock__factory.js.map