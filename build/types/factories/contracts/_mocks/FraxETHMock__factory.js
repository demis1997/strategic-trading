"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FraxETHMock__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
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
                name: "allowance",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "needed",
                type: "uint256",
            },
        ],
        name: "ERC20InsufficientAllowance",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "balance",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "needed",
                type: "uint256",
            },
        ],
        name: "ERC20InsufficientBalance",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "approver",
                type: "address",
            },
        ],
        name: "ERC20InvalidApprover",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "receiver",
                type: "address",
            },
        ],
        name: "ERC20InvalidReceiver",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "ERC20InvalidSender",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
        ],
        name: "ERC20InvalidSpender",
        type: "error",
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
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
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
                name: "from",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "burn",
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
                name: "to",
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
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
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
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
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
const _bytecode = "0x608060405234801561001057600080fd5b506040518060400160405280600a815260200169233930bc1022ba3432b960b11b815250604051806040016040528060068152602001650cce4f08aa8960d31b81525081600390816100629190610118565b50600461006f8282610118565b5050506101d7565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806100a157607f821691505b6020821081036100c157634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115610113576000816000526020600020601f850160051c810160208610156100f05750805b601f850160051c820191505b8181101561010f578281556001016100fc565b5050505b505050565b81516001600160401b0381111561013157610131610077565b6101458161013f845461008d565b846100c7565b602080601f83116001811461017a57600084156101625750858301515b600019600386901b1c1916600185901b17855561010f565b600085815260208120601f198616915b828110156101a95788860151825594840194600190910190840161018a565b50858210156101c75787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6107e3806101e66000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c806340c10f191161007157806340c10f191461012357806370a082311461013857806395d89b41146101615780639dc29fac14610169578063a9059cbb1461017c578063dd62ed3e1461018f57600080fd5b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100ef57806323b872dd14610101578063313ce56714610114575b600080fd5b6100b66101c8565b6040516100c3919061062c565b60405180910390f35b6100df6100da366004610697565b61025a565b60405190151581526020016100c3565b6002545b6040519081526020016100c3565b6100df61010f3660046106c1565b610274565b604051601281526020016100c3565b610136610131366004610697565b610298565b005b6100f36101463660046106fd565b6001600160a01b031660009081526020819052604090205490565b6100b66102a6565b610136610177366004610697565b6102b5565b6100df61018a366004610697565b6102bf565b6100f361019d36600461071f565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6060600380546101d790610752565b80601f016020809104026020016040519081016040528092919081815260200182805461020390610752565b80156102505780601f1061022557610100808354040283529160200191610250565b820191906000526020600020905b81548152906001019060200180831161023357829003601f168201915b5050505050905090565b6000336102688185856102cd565b60019150505b92915050565b6000336102828582856102df565b61028d858585610362565b506001949350505050565b6102a282826103c1565b5050565b6060600480546101d790610752565b6102a282826103f7565b600033610268818585610362565b6102da838383600161042d565b505050565b6001600160a01b03838116600090815260016020908152604080832093861683529290522054600019811461035c578181101561034d57604051637dc7a0d960e11b81526001600160a01b038416600482015260248101829052604481018390526064015b60405180910390fd5b61035c8484848403600061042d565b50505050565b6001600160a01b03831661038c57604051634b637e8f60e11b815260006004820152602401610344565b6001600160a01b0382166103b65760405163ec442f0560e01b815260006004820152602401610344565b6102da838383610502565b6001600160a01b0382166103eb5760405163ec442f0560e01b815260006004820152602401610344565b6102a260008383610502565b6001600160a01b03821661042157604051634b637e8f60e11b815260006004820152602401610344565b6102a282600083610502565b6001600160a01b0384166104575760405163e602df0560e01b815260006004820152602401610344565b6001600160a01b03831661048157604051634a1406b160e11b815260006004820152602401610344565b6001600160a01b038085166000908152600160209081526040808320938716835292905220829055801561035c57826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516104f491815260200190565b60405180910390a350505050565b6001600160a01b03831661052d578060026000828254610522919061078c565b9091555061059f9050565b6001600160a01b038316600090815260208190526040902054818110156105805760405163391434e360e21b81526001600160a01b03851660048201526024810182905260448101839052606401610344565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b0382166105bb576002805482900390556105da565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161061f91815260200190565b60405180910390a3505050565b60006020808352835180602085015260005b8181101561065a5785810183015185820160400152820161063e565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b038116811461069257600080fd5b919050565b600080604083850312156106aa57600080fd5b6106b38361067b565b946020939093013593505050565b6000806000606084860312156106d657600080fd5b6106df8461067b565b92506106ed6020850161067b565b9150604084013590509250925092565b60006020828403121561070f57600080fd5b6107188261067b565b9392505050565b6000806040838503121561073257600080fd5b61073b8361067b565b91506107496020840161067b565b90509250929050565b600181811c9082168061076657607f821691505b60208210810361078657634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561026e57634e487b7160e01b600052601160045260246000fdfea2646970667358221220f616686a0c94cfb9939d2a702c190360e087d97f45150db59cc07ff3e9b61a9b64736f6c63430008180033";
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