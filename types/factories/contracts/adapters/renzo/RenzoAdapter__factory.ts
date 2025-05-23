/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type {
  RenzoAdapter,
  RenzoAdapterInterface,
} from "../../../../contracts/adapters/renzo/RenzoAdapter";

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
    name: "EnforcedPause",
    type: "error",
  },
  {
    inputs: [],
    name: "ExpectedPause",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedInnerCall",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyWETHAllowed",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
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
        name: "required",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "actual",
        type: "uint256",
      },
    ],
    name: "SlippageExceededOnDeposit",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "required",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "actual",
        type: "uint256",
      },
    ],
    name: "SlippageExceededOnWithdrawal",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "target",
        type: "string",
      },
    ],
    name: "ZeroAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "target",
        type: "string",
      },
    ],
    name: "ZeroAmount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "which",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "AddressUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "liquidTkn",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "liquidTknAmount",
        type: "uint256",
      },
    ],
    name: "DepositedOnProtocol",
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
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
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
        indexed: false,
        internalType: "uint256",
        name: "newSlippage",
        type: "uint256",
      },
    ],
    name: "SlippageUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "caller_",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "receiver_",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "liquidTokenAddress_",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountSpent",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "asset_",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "assetsAmount_",
        type: "uint256",
      },
    ],
    name: "WithdrawFromProtocol",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
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
    name: "REVERT_MSG",
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
    name: "VAULT_STRATEGY_ROLE",
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
    name: "claimEarnings",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
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
        internalType: "address",
        name: "sender_",
        type: "address",
      },
      {
        internalType: "address",
        name: "receiver_",
        type: "address",
      },
      {
        internalType: "address",
        name: "token_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenAmount_",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    name: "deposit",
    outputs: [
      {
        internalType: "address",
        name: "liquidTkn",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "liquidTknAmount",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "ezETHAddress",
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
    inputs: [],
    name: "getProtocol",
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
    inputs: [],
    name: "getSlippage",
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
        name: "",
        type: "address",
      },
    ],
    name: "getTokenPrice",
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
        internalType: "address",
        name: "liquifierAddress_",
        type: "address",
      },
      {
        internalType: "address",
        name: "ezETHAddress_",
        type: "address",
      },
      {
        internalType: "address",
        name: "stETHAddress_",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "liquifierAddress",
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
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
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
    inputs: [],
    name: "protocolName",
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
        internalType: "address",
        name: "liquifierAddress_",
        type: "address",
      },
    ],
    name: "setLiquifierAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "slippage_",
        type: "uint256",
      },
    ],
    name: "setSlippage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "wethAddress_",
        type: "address",
      },
    ],
    name: "setWETHAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "slippage",
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
    name: "stETHAddress",
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
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "wethAddress",
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
        name: "",
        type: "address",
      },
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
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "withdraw",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
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
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50611a0b806100206000396000f3fe6080604052600436106101a35760003560e01c80638456cb59116100e0578063c0c53b8b11610084578063d547741f11610061578063d547741f1461051f578063e567e8691461053f578063f0fa55a914610554578063fc9cee3c1461057457005b8063c0c53b8b146104c1578063d02641a0146104e1578063d16352af1461050157005b8063a117d59b116100bd578063a117d59b1461044c578063a217fddf1461046c578063ada50c9b14610481578063bcaa0a5b146104a157005b80638456cb59146103f757806391d148541461040c578063970de3811461042c57005b80634f0e0ef3116101475780636a39fe60116101245780636a39fe601461034a5780636a4234eb1461036a5780637160ad991461038a5780637e531a39146103aa57005b80634f0e0ef3146102ae5780635354c2b1146102e65780635c975abb1461032557005b80632f2ff15d116101805780632f2ff15d1461024357806336568abe146102635780633e032a3b146102835780633f4ba83a1461029957005b806301ffc9a7146101ac5780631bacfd0b146101e1578063248a9ca31461022357005b366101aa57005b005b3480156101b857600080fd5b506101cc6101c73660046115b0565b610589565b60405190151581526020015b60405180910390f35b3480156101ed57600080fd5b506102157f4fe08aea4652d25d7d2c09148537810c0b7e49021cc60dd467483872e4452ff581565b6040519081526020016101d8565b34801561022f57600080fd5b5061021561023e3660046115da565b6105c0565b34801561024f57600080fd5b506101aa61025e36600461160f565b6105e2565b34801561026f57600080fd5b506101aa61027e36600461160f565b610604565b34801561028f57600080fd5b5061021560015481565b3480156102a557600080fd5b506101aa61063c565b3480156102ba57600080fd5b506000546102ce906001600160a01b031681565b6040516001600160a01b0390911681526020016101d8565b3480156102f257600080fd5b50610306610301366004611649565b610652565b604080516001600160a01b0390931683526020830191909152016101d8565b34801561033157600080fd5b506000805160206119b68339815191525460ff166101cc565b34801561035657600080fd5b506103066103653660046116c1565b6109f4565b34801561037657600080fd5b506101aa6103853660046117c8565b610a3d565b34801561039657600080fd5b506004546102ce906001600160a01b031681565b3480156103b657600080fd5b506103ea60405180604001604052806014815260200173119d5b98dd1a5bdb881b9bdd08185b1b1bddd95960621b81525081565b6040516101d89190611807565b34801561040357600080fd5b506101aa610af3565b34801561041857600080fd5b506101cc61042736600461160f565b610b06565b34801561043857600080fd5b5061030661044736600461183a565b610b3e565b34801561045857600080fd5b506101aa6104673660046117c8565b610b8b565b34801561047857600080fd5b50610215600081565b34801561048d57600080fd5b506005546102ce906001600160a01b031681565b3480156104ad57600080fd5b506003546102ce906001600160a01b031681565b3480156104cd57600080fd5b506101aa6104dc366004611864565b610c4c565b3480156104ed57600080fd5b506102156104fc3660046117c8565b610e50565b34801561050d57600080fd5b506003546001600160a01b03166102ce565b34801561052b57600080fd5b506101aa61053a36600461160f565b610e9b565b34801561054b57600080fd5b506103ea610eb7565b34801561056057600080fd5b506101aa61056f3660046115da565b610f45565b34801561058057600080fd5b50600154610215565b60006001600160e01b03198216637965db0b60e01b14806105ba57506301ffc9a760e01b6001600160e01b03198316145b92915050565b6000908152600080516020611996833981519152602052604090206001015490565b6105eb826105c0565b6105f481610fb4565b6105fe8383610fbe565b50505050565b6001600160a01b038116331461062d5760405163334bd91960e11b815260040160405180910390fd5b6106378282611063565b505050565b600061064781610fb4565b61064f6110df565b50565b60008061065d61113f565b610665611172565b7f4fe08aea4652d25d7d2c09148537810c0b7e49021cc60dd467483872e4452ff561068f81610fb4565b6106b8886040518060400160405280600781526020016673656e6465725f60c81b8152506111bc565b6106e3876040518060400160405280600981526020016872656365697665725f60b81b8152506111bc565b61070b8660405180604001604052806006815260200165746f6b656e5f60d01b8152506111bc565b610739856040518060400160405280600c81526020016b746f6b656e416d6f756e745f60a01b8152506111e9565b61074e6001600160a01b03871689308861120c565b60035460405163095ea7b360e01b81526001600160a01b039182166004820152602481018790529087169063095ea7b3906044016020604051808303816000875af11580156107a1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107c591906118a7565b506000670de0b6b3a7640000600154670de0b6b3a76400006107e791906118da565b6107f190886118ed565b6107fb9190611904565b6003546040516311f9fbc960e21b81526001600160a01b038a81166004830152602482018a90529293509116906347e7ef2490604401600060405180830381600087803b15801561084b57600080fd5b505af192505050801561085c575060015b610903573d80801561088a576040519150601f19603f3d011682016040523d82523d6000602084013e61088f565b606091505b5080516000036108fb5760405162461bcd60e51b815260206004820152602c60248201527f5472616e73616374696f6e20726576657274656420776974686f75742061207260448201526b6561736f6e20737472696e6760a01b60648201526084015b60405180910390fd5b805181602001fd5b600480546040516370a0823160e01b815230928101929092526000916001600160a01b03909116906370a0823190602401602060405180830381865afa158015610951573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109759190611926565b9050818110156109a25760405163c60d402760e01b815260048101839052602481018290526044016108f2565b6004546001600160a01b031694509250826109be858a83611273565b5050506109ea60017f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f0055565b9550959350505050565b60008060405180604001604052806014815260200173119d5b98dd1a5bdb881b9bdd08185b1b1bddd95960621b81525060405162461bcd60e51b81526004016108f29190611807565b6000610a4881610fb4565b610a76826040518060400160405280600c81526020016b77657468416464726573735f60a01b8152506111bc565b6040516a776574684164647265737360a81b8152600b016040519081900381206001600160a01b0384168252907f943e9d45a11aaae5d87503e3bc248665d9807856e5cf2bdb4a988bee444227819060200160405180910390a250600080546001600160a01b0319166001600160a01b0392909216919091179055565b6000610afe81610fb4565b61064f6112ca565b6000918252600080516020611996833981519152602090815260408084206001600160a01b0393909316845291905290205460ff1690565b60405162461bcd60e51b815260206004820152601d60248201527f636c61696d4561726e696e6773206e6f7420696d706c656d656e746564000000604482015260009081906064016108f2565b6000610b9681610fb4565b610bc982604051806040016040528060118152602001706c6971756966696572416464726573735f60781b8152506111bc565b604051706c6971756966696572416464726573735f60781b81526011016040519081900381206001600160a01b0384168252907f943e9d45a11aaae5d87503e3bc248665d9807856e5cf2bdb4a988bee444227819060200160405180910390a250600380546001600160a01b0319166001600160a01b0392909216919091179055565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a008054600160401b810460ff16159067ffffffffffffffff16600081158015610c925750825b905060008267ffffffffffffffff166001148015610caf5750303b155b905081158015610cbd575080155b15610cdb5760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff191660011785558315610d0557845460ff60401b1916600160401b1785555b610d3888604051806040016040528060118152602001706c6971756966696572416464726573735f60781b8152506111bc565b610d66876040518060400160405280600c81526020016b657a4554484164647265737360a01b8152506111bc565b610d94866040518060400160405280600c81526020016b73744554484164647265737360a01b8152506111bc565b610d9c611313565b610da461131b565b610dac61132b565b610db7600033610fbe565b50600380546001600160a01b03808b166001600160a01b031992831617909255600480548a84169083161790556005805492891692909116919091179055668e1bc9bf0400006001558315610e4657845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b5050505050505050565b60405162461bcd60e51b815260206004820152601d60248201527f676574546f6b656e5072696365206e6f7420696d706c656d656e74656400000060448201526000906064016108f2565b610ea4826105c0565b610ead81610fb4565b6105fe8383611063565b60028054610ec49061193f565b80601f0160208091040260200160405190810160405280929190818152602001828054610ef09061193f565b8015610f3d5780601f10610f1257610100808354040283529160200191610f3d565b820191906000526020600020905b815481529060010190602001808311610f2057829003601f168201915b505050505081565b6000610f5081610fb4565b610f7b8260405180604001604052806009815260200168736c6970706167655f60b81b8152506111e9565b6040518281527ff5a802650e0a86db227cc342f06327d2ca0ff5cf2b12e0084fc5d8a7db2c54fd9060200160405180910390a150600155565b61064f813361133b565b6000600080516020611996833981519152610fd98484610b06565b611059576000848152602082815260408083206001600160a01b03871684529091529020805460ff1916600117905561100f3390565b6001600160a01b0316836001600160a01b0316857f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a460019150506105ba565b60009150506105ba565b600060008051602061199683398151915261107e8484610b06565b15611059576000848152602082815260408083206001600160a01b0387168085529252808320805460ff1916905551339287917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a460019150506105ba565b6110e7611374565b6000805160206119b6833981519152805460ff191681557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a150565b6000805160206119b68339815191525460ff16156111705760405163d93c066560e01b815260040160405180910390fd5b565b7f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f008054600119016111b657604051633ee5aeb560e01b815260040160405180910390fd5b60029055565b6001600160a01b0382166111e5578060405163eac0d38960e01b81526004016108f29190611807565b5050565b816000036111e557806040516303b3e63560e41b81526004016108f29190611807565b6040516001600160a01b0384811660248301528381166044830152606482018390526105fe9186918216906323b872dd906084015b604051602081830303815290604052915060e01b6020820180516001600160e01b0383818316178352505050506113a4565b6040516001600160a01b0383811660248301526044820183905261063791859182169063a9059cbb90606401611241565b60017f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f0055565b6112d261113f565b6000805160206119b6833981519152805460ff191660011781557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25833611121565b611170611407565b611323611407565b611170611450565b611333611407565b611170611458565b6113458282610b06565b6111e55760405163e2517d3f60e01b81526001600160a01b0382166004820152602481018390526044016108f2565b6000805160206119b68339815191525460ff1661117057604051638dfc202b60e01b815260040160405180910390fd5b60006113b96001600160a01b03841683611479565b905080516000141580156113de5750808060200190518101906113dc91906118a7565b155b1561063757604051635274afe760e01b81526001600160a01b03841660048201526024016108f2565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0054600160401b900460ff1661117057604051631afcd79f60e31b815260040160405180910390fd5b6112a4611407565b611460611407565b6000805160206119b6833981519152805460ff19169055565b60606114878383600061148e565b9392505050565b6060814710156114b35760405163cd78605960e01b81523060048201526024016108f2565b600080856001600160a01b031684866040516114cf9190611979565b60006040518083038185875af1925050503d806000811461150c576040519150601f19603f3d011682016040523d82523d6000602084013e611511565b606091505b509150915061152186838361152b565b9695505050505050565b6060826115405761153b82611587565b611487565b815115801561155757506001600160a01b0384163b155b1561158057604051639996b31560e01b81526001600160a01b03851660048201526024016108f2565b5080611487565b8051156115975780518082602001fd5b604051630a12f52160e11b815260040160405180910390fd5b6000602082840312156115c257600080fd5b81356001600160e01b03198116811461148757600080fd5b6000602082840312156115ec57600080fd5b5035919050565b80356001600160a01b038116811461160a57600080fd5b919050565b6000806040838503121561162257600080fd5b82359150611632602084016115f3565b90509250929050565b801515811461064f57600080fd5b600080600080600060a0868803121561166157600080fd5b61166a866115f3565b9450611678602087016115f3565b9350611686604087016115f3565b925060608601359150608086013561169d8161163b565b809150509295509295909350565b634e487b7160e01b600052604160045260246000fd5b600080600080600080600060e0888a0312156116dc57600080fd5b6116e5886115f3565b96506116f3602089016115f3565b9550611701604089016115f3565b945060608801359350611716608089016115f3565b925060a0880135915060c088013567ffffffffffffffff8082111561173a57600080fd5b818a0191508a601f83011261174e57600080fd5b813581811115611760576117606116ab565b604051601f8201601f19908116603f01168101908382118183101715611788576117886116ab565b816040528281528d60208487010111156117a157600080fd5b82602086016020830137600060208483010152809550505050505092959891949750929550565b6000602082840312156117da57600080fd5b611487826115f3565b60005b838110156117fe5781810151838201526020016117e6565b50506000910152565b60208152600082518060208401526118268160408501602087016117e3565b601f01601f19169190910160400192915050565b6000806040838503121561184d57600080fd5b611856836115f3565b9150611632602084016115f3565b60008060006060848603121561187957600080fd5b611882846115f3565b9250611890602085016115f3565b915061189e604085016115f3565b90509250925092565b6000602082840312156118b957600080fd5b81516114878161163b565b634e487b7160e01b600052601160045260246000fd5b818103818111156105ba576105ba6118c4565b80820281158282048414176105ba576105ba6118c4565b60008261192157634e487b7160e01b600052601260045260246000fd5b500490565b60006020828403121561193857600080fd5b5051919050565b600181811c9082168061195357607f821691505b60208210810361197357634e487b7160e01b600052602260045260246000fd5b50919050565b6000825161198b8184602087016117e3565b919091019291505056fe02dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b626800cd5ed15c6e187e77e9aee88184c21f4f2182ab5827cb3b7e07fbedcd63f03300a2646970667358221220ea8995d20cf35b631e1d12289e181ebd36ccff23c241c9227165f28aa779e55364736f6c63430008180033";

type RenzoAdapterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RenzoAdapterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class RenzoAdapter__factory extends ContractFactory {
  constructor(...args: RenzoAdapterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      RenzoAdapter & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): RenzoAdapter__factory {
    return super.connect(runner) as RenzoAdapter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RenzoAdapterInterface {
    return new Interface(_abi) as RenzoAdapterInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): RenzoAdapter {
    return new Contract(address, _abi, runner) as unknown as RenzoAdapter;
  }
}
