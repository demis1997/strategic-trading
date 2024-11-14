"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEETHMock__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "contract ERC20Mock",
                name: "eETH_",
                type: "address",
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
        name: "eETH",
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
        inputs: [
            {
                internalType: "uint256",
                name: "perShare",
                type: "uint256",
            },
        ],
        name: "setTokenPerShare",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "stEthPerToken",
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
                name: "amount",
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
const _bytecode = "0x60806040526005805463ffffff0019166201010017905560016006553480156200002857600080fd5b5060405162001241380380620012418339810160408190526200004b91620000db565b6040805180820182526005808252640eeca8aa8960db1b6020808401829052845180860190955291845290830152906012828260036200008c8382620001b4565b5060046200009b8282620001b4565b5050600580546001600160a01b039096166401000000000263ffffff01600160c01b031990961660ff909316929092179490941790555062000280915050565b600060208284031215620000ee57600080fd5b81516001600160a01b03811681146200010657600080fd5b9392505050565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806200013857607f821691505b6020821081036200015957634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620001af576000816000526020600020601f850160051c810160208610156200018a5750805b601f850160051c820191505b81811015620001ab5782815560010162000196565b5050505b505050565b81516001600160401b03811115620001d057620001d06200010d565b620001e881620001e1845462000123565b846200015f565b602080601f831160018114620002205760008415620002075750858301515b600019600386901b1c1916600185901b178555620001ab565b600085815260208120601f198616915b82811015620002515788860151825594840194600190910190840162000230565b5085821015620002705787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b610fb180620002906000396000f3fe608060405234801561001057600080fd5b50600436106101585760003560e01c806340c10f19116100c357806395d89b411161007c57806395d89b411461034f578063a457c2d714610357578063a9059cbb1461036a578063cf787f791461037d578063dd62ed3e146103a9578063ea598cb0146103e257600080fd5b806340c10f19146102b35780636ebcf607146102c657806370a08231146102e657806379cc67901461030f5780637a1395aa146103225780639576a0c81461034657600080fd5b8063257224ab11610115578063257224ab146101fa5780632dbcb32b14610224578063313ce5671461024e57806335df40f214610263578063395093511461028d57806339a93077146102a057600080fd5b8063035faf821461015d57806306fdde0314610174578063095ea7b3146101895780630de371e2146101ac57806318160ddd146101df57806323b872dd146101e7575b600080fd5b6006545b6040519081526020015b60405180910390f35b61017c6103f5565b60405161016b9190610d48565b61019c610197366004610db3565b610487565b604051901515815260200161016b565b6005546101c79064010000000090046001600160a01b031681565b6040516001600160a01b03909116815260200161016b565b600254610161565b61019c6101f5366004610ddd565b610545565b610222610208366004610e2a565b600580549115156101000261ff0019909216919091179055565b005b610222610232366004610db3565b6001600160a01b03909116600090815260208190526040902055565b60055460405160ff909116815260200161016b565b610222610271366004610e2a565b60058054911515620100000262ff000019909216919091179055565b61019c61029b366004610db3565b61059e565b6102226102ae366004610e47565b600655565b6102226102c1366004610db3565b6105da565b6101616102d4366004610e60565b60006020819052908152604090205481565b6101616102f4366004610e60565b6001600160a01b031660009081526020819052604090205490565b61022261031d366004610db3565b6105e8565b610222610330366004610e7b565b6005805460ff191660ff92909216919091179055565b61016160065481565b61017c6105f2565b61019c610365366004610db3565b610601565b61019c610378366004610db3565b610695565b61022261038b366004610e2a565b6005805491151563010000000263ff00000019909216919091179055565b6101616103b7366004610e9e565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6101616103f0366004610e47565b6106cf565b60606003805461040490610ed1565b80601f016020809104026020016040519081016040528092919081815260200182805461043090610ed1565b801561047d5780601f106104525761010080835404028352916020019161047d565b820191906000526020600020905b81548152906001019060200180831161046057829003601f168201915b5050505050905090565b60055460009062010000900460ff1680156104aa5750600554610100900460ff16155b156104b75750600061053f565b60055462010000900460ff1680156104d857506005546301000000900460ff165b80156104e357508115155b801561051157503360009081526001602090815260408083206001600160a01b038716845290915290205415155b1561051e5750600061053f565b610528838361076f565b5060055462010000900460ff1661053b57005b5060015b92915050565b60055460009062010000900460ff1680156105685750600554610100900460ff16155b1561057557506000610597565b61058084848461077c565b5060055462010000900460ff1661059357005b5060015b9392505050565b3360008181526001602090815260408083206001600160a01b0387168452909152812054909161053b9185906105d5908690610f21565b610826565b6105e4828261094b565b5050565b6105e48282610a2a565b60606004805461040490610ed1565b3360009081526001602090815260408083206001600160a01b0386168452909152812054828110156106885760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b6105933385858403610826565b60055460009062010000900460ff1680156106b85750600554610100900460ff16155b156106c55750600061053f565b6105288383610b70565b600080600654836106e09190610f34565b6005546040516323b872dd60e01b81523360048201523060248201526044810186905291925064010000000090046001600160a01b0316906323b872dd906064016020604051808303816000875af1158015610740573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107649190610f4b565b5061053f33826105da565b600061053b338484610826565b6000610789848484610b79565b6001600160a01b03841660009081526001602090815260408083203384529091529020548281101561080e5760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b606482015260840161067f565b61081b8533858403610826565b506001949350505050565b6001600160a01b0383166108885760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b606482015260840161067f565b6001600160a01b0382166108e95760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b606482015260840161067f565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b0382166109a15760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640161067f565b80600260008282546109b39190610f21565b90915550506001600160a01b038216600090815260208190526040812080548392906109e0908490610f21565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6001600160a01b038216610a8a5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b606482015260840161067f565b6001600160a01b03821660009081526020819052604090205481811015610afe5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b606482015260840161067f565b6001600160a01b0383166000908152602081905260408120838303905560028054849290610b2d908490610f68565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200161093e565b600061053b3384845b6001600160a01b038316610bdd5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b606482015260840161067f565b6001600160a01b038216610c3f5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b606482015260840161067f565b6001600160a01b03831660009081526020819052604090205481811015610cb75760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b606482015260840161067f565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610cee908490610f21565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610d3a91815260200190565b60405180910390a350505050565b60006020808352835180602085015260005b81811015610d7657858101830151858201604001528201610d5a565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b0381168114610dae57600080fd5b919050565b60008060408385031215610dc657600080fd5b610dcf83610d97565b946020939093013593505050565b600080600060608486031215610df257600080fd5b610dfb84610d97565b9250610e0960208501610d97565b9150604084013590509250925092565b8015158114610e2757600080fd5b50565b600060208284031215610e3c57600080fd5b813561059781610e19565b600060208284031215610e5957600080fd5b5035919050565b600060208284031215610e7257600080fd5b61059782610d97565b600060208284031215610e8d57600080fd5b813560ff8116811461059757600080fd5b60008060408385031215610eb157600080fd5b610eba83610d97565b9150610ec860208401610d97565b90509250929050565b600181811c90821680610ee557607f821691505b602082108103610f0557634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b8082018082111561053f5761053f610f0b565b808202811582820484141761053f5761053f610f0b565b600060208284031215610f5d57600080fd5b815161059781610e19565b8181038181111561053f5761053f610f0b56fea26469706673582212200644ccb952d21cd7972f760938b2ba00b318491368ecba55a338fd7447fd25ad64736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class WEETHMock__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(eETH_, overrides) {
        return super.getDeployTransaction(eETH_, overrides || {});
    }
    deploy(eETH_, overrides) {
        return super.deploy(eETH_, overrides || {});
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
exports.WEETHMock__factory = WEETHMock__factory;
WEETHMock__factory.bytecode = _bytecode;
WEETHMock__factory.abi = _abi;
//# sourceMappingURL=WEETHMock__factory.js.map