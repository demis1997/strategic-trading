"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EETHMock__factory = void 0;
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
];
const _bytecode = "0x60806040526005805463ffffff001916620101001790553480156200002357600080fd5b506040805180820182526004808252630ca8aa8960e31b6020808401829052845180860190955291845290830152906012828260036200006483826200013b565b5060046200007382826200013b565b50506005805460ff191660ff93909316929092179091555062000207915050565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680620000bf57607f821691505b602082108103620000e057634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111562000136576000816000526020600020601f850160051c81016020861015620001115750805b601f850160051c820191505b8181101562000132578281556001016200011d565b5050505b505050565b81516001600160401b0381111562000157576200015762000094565b6200016f81620001688454620000aa565b84620000e6565b602080601f831160018114620001a757600084156200018e5750858301515b600019600386901b1c1916600185901b17855562000132565b600085815260208120601f198616915b82811015620001d857888601518255948401946001909101908401620001b7565b5085821015620001f75787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b610e1b80620002176000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c806340c10f19116100ad57806395d89b411161007157806395d89b41146102c5578063a457c2d7146102cd578063a9059cbb146102e0578063cf787f79146102f3578063dd62ed3e1461031f57600080fd5b806340c10f19146102325780636ebcf6071461024557806370a082311461026557806379cc67901461028e5780637a1395aa146102a157600080fd5b8063257224ab116100f4578063257224ab1461018c5780632dbcb32b146101b6578063313ce567146101e057806335df40f2146101f5578063395093511461021f57600080fd5b806306fdde0314610126578063095ea7b31461014457806318160ddd1461016757806323b872dd14610179575b600080fd5b61012e610358565b60405161013b9190610c0b565b60405180910390f35b610157610152366004610c76565b6103ea565b604051901515815260200161013b565b6002545b60405190815260200161013b565b610157610187366004610ca0565b6104a8565b6101b461019a366004610cdc565b600580549115156101000261ff0019909216919091179055565b005b6101b46101c4366004610c76565b6001600160a01b03909116600090815260208190526040902055565b60055460405160ff909116815260200161013b565b6101b4610203366004610cdc565b60058054911515620100000262ff000019909216919091179055565b61015761022d366004610c76565b610501565b6101b4610240366004610c76565b61053d565b61016b610253366004610cfe565b60006020819052908152604090205481565b61016b610273366004610cfe565b6001600160a01b031660009081526020819052604090205490565b6101b461029c366004610c76565b61054b565b6101b46102af366004610d19565b6005805460ff191660ff92909216919091179055565b61012e610555565b6101576102db366004610c76565b610564565b6101576102ee366004610c76565b6105f8565b6101b4610301366004610cdc565b6005805491151563010000000263ff00000019909216919091179055565b61016b61032d366004610d3c565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b60606003805461036790610d6f565b80601f016020809104026020016040519081016040528092919081815260200182805461039390610d6f565b80156103e05780601f106103b5576101008083540402835291602001916103e0565b820191906000526020600020905b8154815290600101906020018083116103c357829003601f168201915b5050505050905090565b60055460009062010000900460ff16801561040d5750600554610100900460ff16155b1561041a575060006104a2565b60055462010000900460ff16801561043b57506005546301000000900460ff165b801561044657508115155b801561047457503360009081526001602090815260408083206001600160a01b038716845290915290205415155b15610481575060006104a2565b61048b8383610632565b5060055462010000900460ff1661049e57005b5060015b92915050565b60055460009062010000900460ff1680156104cb5750600554610100900460ff16155b156104d8575060006104fa565b6104e384848461063f565b5060055462010000900460ff166104f657005b5060015b9392505050565b3360008181526001602090815260408083206001600160a01b0387168452909152812054909161049e918590610538908690610dbf565b6106e9565b610547828261080e565b5050565b61054782826108ed565b60606004805461036790610d6f565b3360009081526001602090815260408083206001600160a01b0386168452909152812054828110156105eb5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b6104f633858584036106e9565b60055460009062010000900460ff16801561061b5750600554610100900460ff16155b15610628575060006104a2565b61048b8383610a33565b600061049e3384846106e9565b600061064c848484610a3c565b6001600160a01b0384166000908152600160209081526040808320338452909152902054828110156106d15760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b60648201526084016105e2565b6106de85338584036106e9565b506001949350505050565b6001600160a01b03831661074b5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016105e2565b6001600160a01b0382166107ac5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016105e2565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b0382166108645760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016105e2565b80600260008282546108769190610dbf565b90915550506001600160a01b038216600090815260208190526040812080548392906108a3908490610dbf565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6001600160a01b03821661094d5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016105e2565b6001600160a01b038216600090815260208190526040902054818110156109c15760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016105e2565b6001600160a01b03831660009081526020819052604081208383039055600280548492906109f0908490610dd2565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602001610801565b600061049e3384845b6001600160a01b038316610aa05760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016105e2565b6001600160a01b038216610b025760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016105e2565b6001600160a01b03831660009081526020819052604090205481811015610b7a5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016105e2565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610bb1908490610dbf565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610bfd91815260200190565b60405180910390a350505050565b60006020808352835180602085015260005b81811015610c3957858101830151858201604001528201610c1d565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b0381168114610c7157600080fd5b919050565b60008060408385031215610c8957600080fd5b610c9283610c5a565b946020939093013593505050565b600080600060608486031215610cb557600080fd5b610cbe84610c5a565b9250610ccc60208501610c5a565b9150604084013590509250925092565b600060208284031215610cee57600080fd5b813580151581146104fa57600080fd5b600060208284031215610d1057600080fd5b6104fa82610c5a565b600060208284031215610d2b57600080fd5b813560ff811681146104fa57600080fd5b60008060408385031215610d4f57600080fd5b610d5883610c5a565b9150610d6660208401610c5a565b90509250929050565b600181811c90821680610d8357607f821691505b602082108103610da357634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b808201808211156104a2576104a2610da9565b818103818111156104a2576104a2610da956fea2646970667358221220c5b18c5892b88c4248302cac0602ad2fdd1181bfe9a218d309a840ce26d5aed064736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class EETHMock__factory extends ethers_1.ContractFactory {
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
exports.EETHMock__factory = EETHMock__factory;
EETHMock__factory.bytecode = _bytecode;
EETHMock__factory.abi = _abi;
//# sourceMappingURL=EETHMock__factory.js.map