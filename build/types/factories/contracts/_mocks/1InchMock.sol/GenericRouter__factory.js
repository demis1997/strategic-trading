"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericRouter__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
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
        inputs: [],
        name: "InvalidMsgValue",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "returnAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "minReturnAmount",
                type: "uint256",
            },
        ],
        name: "ReturnAmountIsNotEnough",
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
        inputs: [],
        name: "ZeroMinReturn",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "contract MockAggregationExecutor",
                name: "executor",
                type: "address",
            },
            {
                components: [
                    {
                        internalType: "contract IERC20",
                        name: "srcToken",
                        type: "address",
                    },
                    {
                        internalType: "contract IERC20",
                        name: "dstToken",
                        type: "address",
                    },
                    {
                        internalType: "address payable",
                        name: "srcReceiver",
                        type: "address",
                    },
                    {
                        internalType: "address payable",
                        name: "dstReceiver",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "minReturnAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "flags",
                        type: "uint256",
                    },
                ],
                internalType: "struct GenericRouter.SwapDescription",
                name: "desc",
                type: "tuple",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "swap",
        outputs: [
            {
                internalType: "uint256",
                name: "returnAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "spentAmount",
                type: "uint256",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b506107de806100206000396000f3fe60806040526004361061001e5760003560e01c806307ed237914610023575b600080fd5b6100366100313660046105d9565b61004f565b6040805192835260208301919091520160405180910390f35b6000808460a00135600003610076576040516298b77960e21b815260040160405180910390fd5b6000806100866020880188610677565b6001600160a01b031614905060c0860135600216156100d557806100ab5760006100b1565b85608001355b34116100d057604051631841b4e160e01b815260040160405180910390fd5b610106565b806100e15760006100e7565b85608001355b341461010657604051631841b4e160e01b815260040160405180910390fd5b80610142576101423361011f6060890160408a01610677565b608089013561013160208b018b610677565b6001600160a01b0316929190610380565b604051635b0e93fb60e11b81526001600160a01b0388169063b61d27f69061017890339060808b0135908a908a90600401610694565b6020604051808303816000875af1158015610197573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101bb91906106dc565b92506080860135915060c0860135600116156102f45760006101e06020880188610677565b6040516370a0823160e01b81523060048201526001600160a01b0391909116906370a0823190602401602060405180830381865afa158015610226573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061024a91906106dc565b905060018111156102875760001901610263818461070b565b9250610287338261027760208b018b610677565b6001600160a01b031691906103ed565b6102958360a089013561071e565b6102a360808901358661071e565b10156102ee578360808801356102bd8560a08b013561071e565b6102c79190610735565b604051630325276360e11b8152600481019290925260248201526044015b60405180910390fd5b50610326565b8560a0013583101561032657604051630325276360e11b81526004810184905260a087013560248201526044016102e5565b6000806103396080890160608a01610677565b6001600160a01b03161461035c576103576080880160608901610677565b61035e565b335b9050610375818561027760408b0160208c01610677565b505094509492505050565b6040516001600160a01b0384811660248301528381166044830152606482018390526103e79186918216906323b872dd906084015b604051602081830303815290604052915060e01b6020820180516001600160e01b038381831617835250505050610423565b50505050565b6040516001600160a01b0383811660248301526044820183905261041e91859182169063a9059cbb906064016103b5565b505050565b60006104386001600160a01b03841683610486565b9050805160001415801561045d57508080602001905181019061045b9190610757565b155b1561041e57604051635274afe760e01b81526001600160a01b03841660048201526024016102e5565b60606104948383600061049d565b90505b92915050565b6060814710156104c25760405163cd78605960e01b81523060048201526024016102e5565b600080856001600160a01b031684866040516104de9190610779565b60006040518083038185875af1925050503d806000811461051b576040519150601f19603f3d011682016040523d82523d6000602084013e610520565b606091505b509150915061053086838361053c565b925050505b9392505050565b6060826105515761054c82610598565b610535565b815115801561056857506001600160a01b0384163b155b1561059157604051639996b31560e01b81526001600160a01b03851660048201526024016102e5565b5080610535565b8051156105a85780518082602001fd5b604051630a12f52160e11b815260040160405180910390fd5b50565b6001600160a01b03811681146105c157600080fd5b6000806000808486036101208112156105f157600080fd5b85356105fc816105c4565b945060e0601f198201121561061057600080fd5b5060208501925061010085013567ffffffffffffffff8082111561063357600080fd5b818701915087601f83011261064757600080fd5b81358181111561065657600080fd5b88602082850101111561066857600080fd5b95989497505060200194505050565b60006020828403121561068957600080fd5b8135610535816105c4565b6001600160a01b0385168152602081018490526060604082018190528101829052818360808301376000818301608090810191909152601f909201601f191601019392505050565b6000602082840312156106ee57600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b81810381811115610497576104976106f5565b8082028115828204841417610497576104976106f5565b60008261075257634e487b7160e01b600052601260045260246000fd5b500490565b60006020828403121561076957600080fd5b8151801515811461053557600080fd5b6000825160005b8181101561079a5760208186018101518583015201610780565b50600092019182525091905056fea2646970667358221220b47412bd9edba8460f7b876946ce214731d3fb2b25036552d50f9f9a10f76fdc64736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class GenericRouter__factory extends ethers_1.ContractFactory {
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
exports.GenericRouter__factory = GenericRouter__factory;
GenericRouter__factory.bytecode = _bytecode;
GenericRouter__factory.abi = _abi;
//# sourceMappingURL=GenericRouter__factory.js.map