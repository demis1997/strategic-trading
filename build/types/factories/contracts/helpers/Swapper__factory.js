"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Swapper__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "AccessControlBadConfirmation",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "neededRole",
                type: "bytes32",
            },
        ],
        name: "AccessControlUnauthorizedAccount",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "target",
                type: "address",
            },
        ],
        name: "AddressEmptyCode",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "AddressInsufficientBalance",
        type: "error",
    },
    {
        inputs: [],
        name: "FailedInnerCall",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "addr",
                type: "address",
            },
        ],
        name: "InvalidAddress",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidInitialization",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "slippage",
                type: "uint256",
            },
        ],
        name: "InvalidSlippage",
        type: "error",
    },
    {
        inputs: [],
        name: "NotInitializing",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
        ],
        name: "SafeERC20FailedOperation",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "requested",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "maximum",
                type: "uint256",
            },
        ],
        name: "SlippageExceeded",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "tokenIn",
                type: "address",
            },
            {
                internalType: "address",
                name: "tokenOut",
                type: "address",
            },
        ],
        name: "TokenNotAllowed",
        type: "error",
    },
    {
        inputs: [],
        name: "ZeroAddressNotAllowed",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "oldSlippage",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "newSlippage",
                type: "uint256",
            },
        ],
        name: "DefaultSlippageUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint64",
                name: "version",
                type: "uint64",
            },
        ],
        name: "Initialized",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "previousAdminRole",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "newAdminRole",
                type: "bytes32",
            },
        ],
        name: "RoleAdminChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "RoleGranted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "RoleRevoked",
        type: "event",
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
                name: "receiver",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "tokenIn",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "tokenOut",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amountIn",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amountOut",
                type: "uint256",
            },
        ],
        name: "SwapExecuted",
        type: "event",
    },
    {
        inputs: [],
        name: "DEFAULT_ADMIN_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "SWAPPER_EXECUTOR",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "SWAPPER_RESOLVER",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "defaultSlippage",
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
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
        ],
        name: "getRoleAdmin",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "grantRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "hasRole",
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
                internalType: "uint256",
                name: "_defaultSlippage",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "adminAddress",
                type: "address",
            },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "callerConfirmation",
                type: "address",
            },
        ],
        name: "renounceRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "revokeRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "slippage",
                type: "uint256",
            },
        ],
        name: "setDefaultSlippage",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "tokenIn",
                type: "address",
            },
            {
                internalType: "address",
                name: "tokenOut",
                type: "address",
            },
            {
                components: [
                    {
                        internalType: "address",
                        name: "dexLocation",
                        type: "address",
                    },
                    {
                        internalType: "bytes",
                        name: "swapFunction",
                        type: "bytes",
                    },
                ],
                internalType: "struct Swapper.DexData",
                name: "dexData",
                type: "tuple",
            },
        ],
        name: "setDexData",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
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
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "receiver",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "tokenIn",
                type: "address",
            },
            {
                internalType: "address",
                name: "tokenOut",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "slippage",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "flags",
                type: "uint256",
            },
        ],
        name: "swap",
        outputs: [
            {
                internalType: "uint256",
                name: "swpAmount",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "swapData",
        outputs: [
            {
                internalType: "address",
                name: "dexLocation",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "swapFunction",
                type: "bytes",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b50611258806100206000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80635487404a11610097578063a6ba2c5611610066578063a6ba2c56146101e9578063cd3ba1fc14610210578063d547741f14610237578063da35a26f1461024a57600080fd5b80635487404a146101b257806379141918146101bb57806391d14854146101ce578063a217fddf146101e157600080fd5b806336568abe116100d357806336568abe146101585780633f2a683e1461016b57806344bd1afd1461017e5780634f746bfc1461019157600080fd5b806301ffc9a7146100fa578063248a9ca3146101225780632f2ff15d14610143575b600080fd5b61010d610108366004610daa565b61025d565b60405190151581526020015b60405180910390f35b610135610130366004610dd4565b610294565b604051908152602001610119565b610156610151366004610e02565b6102b6565b005b610156610166366004610e02565b6102d8565b610135610179366004610e32565b610310565b61015661018c366004610dd4565b610652565b6101a461019f366004610eac565b61069f565b604051610119929190610efe565b61013560005481565b6101566101c9366004610f40565b610757565b61010d6101dc366004610e02565b6107f5565b610135600081565b6101357f5aa37ac0d0eaed875b119bb6fc8b1404cfbcb3f1a462b57a17cf3b668601a6b281565b6101357f849275e18c3e4287af550deeb728f980a0ac1ba39d0ef37313497255f2dd4ab481565b610156610245366004610e02565b61082d565b610156610258366004610e02565b610849565b60006001600160e01b03198216637965db0b60e01b148061028e57506301ffc9a760e01b6001600160e01b03198316145b92915050565b6000908152600080516020611203833981519152602052604090206001015490565b6102bf82610294565b6102c881610a0d565b6102d28383610a1a565b50505050565b6001600160a01b03811633146103015760405163334bd91960e11b815260040160405180910390fd5b61030b8282610abf565b505050565b60007f5aa37ac0d0eaed875b119bb6fc8b1404cfbcb3f1a462b57a17cf3b668601a6b261033c81610a0d565b6001600160a01b0380871660009081526001602081815260408084208a8616855282528084208151808301909252805490951681529184018054939492939184019161038790610fa9565b80601f01602080910402602001604051908101604052809291908181526020018280546103b390610fa9565b80156104005780601f106103d557610100808354040283529160200191610400565b820191906000526020600020905b8154815290600101906020018083116103e357829003601f168201915b5050509190925250508151919250506001600160a01b031661044d57604051634afb130560e11b81526001600160a01b038089166004830152871660248201526044015b60405180910390fd5b6104626001600160a01b0388168b308b610b3b565b60008082600001516001600160a01b031683602001516040516104859190610fe3565b6000604051808303816000865af19150503d80600081146104c2576040519150601f19603f3d011682016040523d82523d6000602084013e6104c7565b606091505b5091509150816105115760405162461bcd60e51b815260206004820152601560248201527414ddd85c08195e1958dd5d1a5bdb8819985a5b1959605a1b6044820152606401610444565b808060200190518101906105259190610fff565b94506000612710610536898261102e565b610540908d611041565b61054a9190611058565b9050808610156105b95760405162461bcd60e51b815260206004820152603460248201527f526563656976656420616d6f756e74206c657373207468616e206d696e696d756044820152736d20736c69707061676520746f6c6572616e636560601b6064820152608401610444565b6105cd6001600160a01b038a168d88610ba2565b896001600160a01b03168c6001600160a01b03168e6001600160a01b03167f28d00b9419287441aad457025bbaa9aaead77e93e2739080543e5261012b0eee8c8f8b60405161063a939291906001600160a01b039390931683526020830191909152604082015260600190565b60405180910390a45050505050979650505050505050565b600061065d81610a0d565b60005460408051918252602082018490527f2bf28488f825d28ef86f4d9579750af1848405e1db4bb31d686a9f6722a51d29910160405180910390a150600055565b60016020818152600093845260408085209091529183529120805491810180546001600160a01b03909316926106d490610fa9565b80601f016020809104026020016040519081016040528092919081815260200182805461070090610fa9565b801561074d5780601f106107225761010080835404028352916020019161074d565b820191906000526020600020905b81548152906001019060200180831161073057829003601f168201915b5050505050905082565b7f849275e18c3e4287af550deeb728f980a0ac1ba39d0ef37313497255f2dd4ab461078181610a0d565b6001600160a01b038416158061079e57506001600160a01b038316155b156107bc576040516342bcdf7f60e11b815260040160405180910390fd5b6001600160a01b03808516600090815260016020908152604080832093871683529290522082906107ed82826110c2565b505050505050565b6000918252600080516020611203833981519152602090815260408084206001600160a01b0393909316845291905290205460ff1690565b61083682610294565b61083f81610a0d565b6102d28383610abf565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a008054600160401b810460ff16159067ffffffffffffffff1660008115801561088f5750825b905060008267ffffffffffffffff1660011480156108ac5750303b155b9050811580156108ba575080155b156108d85760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff19166001178555831561090257845460ff60401b1916600160401b1785555b6000871161092657604051633ea12f5b60e11b815260048101889052602401610444565b6001600160a01b03861661095857604051634726455360e11b81526001600160a01b0387166004820152602401610444565b60008781556109679087610a1a565b506109927f5aa37ac0d0eaed875b119bb6fc8b1404cfbcb3f1a462b57a17cf3b668601a6b287610a1a565b506109bd7f849275e18c3e4287af550deeb728f980a0ac1ba39d0ef37313497255f2dd4ab487610a1a565b508315610a0457845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b50505050505050565b610a178133610bd3565b50565b6000600080516020611203833981519152610a3584846107f5565b610ab5576000848152602082815260408083206001600160a01b03871684529091529020805460ff19166001179055610a6b3390565b6001600160a01b0316836001600160a01b0316857f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a4600191505061028e565b600091505061028e565b6000600080516020611203833981519152610ada84846107f5565b15610ab5576000848152602082815260408083206001600160a01b0387168085529252808320805460ff1916905551339287917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a4600191505061028e565b6040516001600160a01b0384811660248301528381166044830152606482018390526102d29186918216906323b872dd906084015b604051602081830303815290604052915060e01b6020820180516001600160e01b038381831617835250505050610c10565b6040516001600160a01b0383811660248301526044820183905261030b91859182169063a9059cbb90606401610b70565b610bdd82826107f5565b610c0c5760405163e2517d3f60e01b81526001600160a01b038216600482015260248101839052604401610444565b5050565b6000610c256001600160a01b03841683610c73565b90508051600014158015610c4a575080806020019051810190610c4891906111e0565b155b1561030b57604051635274afe760e01b81526001600160a01b0384166004820152602401610444565b6060610c8183836000610c88565b9392505050565b606081471015610cad5760405163cd78605960e01b8152306004820152602401610444565b600080856001600160a01b03168486604051610cc99190610fe3565b60006040518083038185875af1925050503d8060008114610d06576040519150601f19603f3d011682016040523d82523d6000602084013e610d0b565b606091505b5091509150610d1b868383610d25565b9695505050505050565b606082610d3a57610d3582610d81565b610c81565b8151158015610d5157506001600160a01b0384163b155b15610d7a57604051639996b31560e01b81526001600160a01b0385166004820152602401610444565b5080610c81565b805115610d915780518082602001fd5b604051630a12f52160e11b815260040160405180910390fd5b600060208284031215610dbc57600080fd5b81356001600160e01b031981168114610c8157600080fd5b600060208284031215610de657600080fd5b5035919050565b6001600160a01b0381168114610a1757600080fd5b60008060408385031215610e1557600080fd5b823591506020830135610e2781610ded565b809150509250929050565b600080600080600080600060e0888a031215610e4d57600080fd5b8735610e5881610ded565b96506020880135610e6881610ded565b9550604088013594506060880135610e7f81610ded565b93506080880135610e8f81610ded565b9699959850939692959460a0840135945060c09093013592915050565b60008060408385031215610ebf57600080fd5b8235610eca81610ded565b91506020830135610e2781610ded565b60005b83811015610ef5578181015183820152602001610edd565b50506000910152565b60018060a01b03831681526040602082015260008251806040840152610f2b816060850160208701610eda565b601f01601f1916919091016060019392505050565b600080600060608486031215610f5557600080fd5b8335610f6081610ded565b92506020840135610f7081610ded565b9150604084013567ffffffffffffffff811115610f8c57600080fd5b840160408187031215610f9e57600080fd5b809150509250925092565b600181811c90821680610fbd57607f821691505b602082108103610fdd57634e487b7160e01b600052602260045260246000fd5b50919050565b60008251610ff5818460208701610eda565b9190910192915050565b60006020828403121561101157600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b8181038181111561028e5761028e611018565b808202811582820484141761028e5761028e611018565b60008261107557634e487b7160e01b600052601260045260246000fd5b500490565b601f82111561030b576000816000526020600020601f850160051c810160208610156110a35750805b601f850160051c820191505b818110156107ed578281556001016110af565b81356110cd81610ded565b81546001600160a01b0319166001600160a01b0391909116178155600181810160208481013536869003601e1901811261110657600080fd5b8501803567ffffffffffffffff81111561111f57600080fd5b803603838301131561113057600080fd5b6111448161113e8654610fa9565b8661107a565b6000601f82116001811461117a576000831561116257508382018501355b600019600385901b1c1916600184901b1786556111d5565b600086815260209020601f19841690835b828110156111aa5786850188013582559387019390890190870161118b565b50848210156111c95760001960f88660031b161c198785880101351681555b505060018360011b0186555b505050505050505050565b6000602082840312156111f257600080fd5b81518015158114610c8157600080fdfe02dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b626800a26469706673582212202bf0cc97b79169461b6623299124f5c7aad824d26e722a0d0a0d76c16a1bab8864736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class Swapper__factory extends ethers_1.ContractFactory {
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
exports.Swapper__factory = Swapper__factory;
Swapper__factory.bytecode = _bytecode;
Swapper__factory.abi = _abi;
//# sourceMappingURL=Swapper__factory.js.map