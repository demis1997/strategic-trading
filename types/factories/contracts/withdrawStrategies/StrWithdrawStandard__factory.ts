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
import type { NonPayableOverrides } from "../../../common";
import type {
  StrWithdrawStandard,
  StrWithdrawStandardInterface,
} from "../../../contracts/withdrawStrategies/StrWithdrawStandard";

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
        internalType: "string",
        name: "target",
        type: "string",
      },
    ],
    name: "EmptyString",
    type: "error",
  },
  {
    inputs: [],
    name: "EnforcedPause",
    type: "error",
  },
  {
    inputs: [],
    name: "ExecuteWithdrawWStrategyError",
    type: "error",
  },
  {
    inputs: [],
    name: "ExpectedPause",
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
    name: "InvalidAdaptersPath",
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
    name: "ReentrancyGuardReentrantCall",
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
        indexed: false,
        internalType: "address[]",
        name: "newDeployPath",
        type: "address[]",
      },
    ],
    name: "AdaptersDeployPathSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address[]",
        name: "newWithdrawPath",
        type: "address[]",
      },
    ],
    name: "AdaptersWithdrawPathSet",
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
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "LiquidTokenSet",
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
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "priceFeed",
        type: "address",
      },
    ],
    name: "PriceFeedSet",
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
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "StrategyNameSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "TokenWrapperSet",
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
        name: "vaultAddress",
        type: "address",
      },
    ],
    name: "VaultAddressSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "strategyAddress",
        type: "address",
      },
    ],
    name: "WithdrawStrategyAddressSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "assetsAmount",
        type: "uint256",
      },
    ],
    name: "WithdrawStrategyExecuted",
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
    name: "VAULT_MANAGER_ROLE",
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
    name: "WITHDRAW_ADAPTERS_QTY",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "adaptersDeployPath",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "adaptersWithdrawPath",
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
    name: "deployedAssetsValue",
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
    name: "executeWithdrawStrategy",
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
        internalType: "address",
        name: "token_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "source_",
        type: "uint256",
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
        name: "vaultAddress_",
        type: "address",
      },
      {
        internalType: "address",
        name: "liquidTokenAddress_",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "adaptersWithdrawPath_",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "vaultStrategyAddress_",
        type: "address",
      },
      {
        internalType: "string",
        name: "strategyName_",
        type: "string",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "liquidTokenAddress",
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
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "priceFeedPerToken",
    outputs: [
      {
        internalType: "address",
        name: "priceFeed",
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
        internalType: "address[]",
        name: "adaptersWithdrawPath_",
        type: "address[]",
      },
    ],
    name: "setAdaptersWithdrawPath",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "liquidTokenAddress_",
        type: "address",
      },
    ],
    name: "setLiquidTokenAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token_",
        type: "address",
      },
      {
        internalType: "address",
        name: "feed_",
        type: "address",
      },
    ],
    name: "setPriceFeedPerToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "strategyName_",
        type: "string",
      },
    ],
    name: "setStrategyName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "vaultAddress_",
        type: "address",
      },
    ],
    name: "setVaultAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "withdrawStrategyAddress_",
        type: "address",
      },
    ],
    name: "setWithdrawStrategyAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "wrappedLiquidTokenAddress_",
        type: "address",
      },
    ],
    name: "setWrappedLiquidTokenAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "strategyName",
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
    name: "vaultAddress",
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
    name: "vaultStrategyAddress",
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
    name: "withdrawStrategyAddress",
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
    name: "wrappedLiquidTokenAddress",
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
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50611d32806100206000396000f3fe6080604052600436106101f25760003560e01c80637e531a391161010d578063b3967113116100a0578063d547741f1161006f578063d547741f1461060b578063e173ad251461062b578063ea9853d014610640578063eb0a7fd014610660578063edd4604c1461068057600080fd5b8063b396711314610575578063b89f319d146105ab578063ba7a3ad5146105cb578063c9f7153c146105eb57600080fd5b806391d14854116100dc57806391d1485414610500578063a016b2cd14610520578063a217fddf14610540578063a4d1e2ca1461055557600080fd5b80637e531a39146104685780637f4879aa146104b55780638456cb59146104cb57806385535cc5146104e057600080fd5b806339e3aca1116101855780634a28ff24116101545780634a28ff24146103b05780635c786892146103ef5780635c975abb1461040f5780635e5a24a41461043457600080fd5b806339e3aca11461033b5780633f4ba83a1461035b578063429e6e0f14610370578063430bf08a1461039057600080fd5b8063254c72a2116101c1578063254c72a2146102bb5780632f2ff15d146102db57806333dc7f07146102fb57806336568abe1461031b57600080fd5b806301ffc9a7146101fe5780630690416a146102335780631f696df814610255578063248a9ca31461028d57600080fd5b366101f957005b600080fd5b34801561020a57600080fd5b5061021e610219366004611698565b6106a7565b60405190151581526020015b60405180910390f35b34801561023f57600080fd5b5061025361024e3660046116e5565b6106de565b005b34801561026157600080fd5b50610275610270366004611700565b610775565b6040516001600160a01b03909116815260200161022a565b34801561029957600080fd5b506102ad6102a8366004611700565b61079f565b60405190815260200161022a565b3480156102c757600080fd5b506102536102d63660046116e5565b6107c1565b3480156102e757600080fd5b506102536102f6366004611719565b610862565b34801561030757600080fd5b50600254610275906001600160a01b031681565b34801561032757600080fd5b50610253610336366004611719565b610884565b34801561034757600080fd5b50600954610275906001600160a01b031681565b34801561036757600080fd5b506102536108bc565b34801561037c57600080fd5b50600354610275906001600160a01b031681565b34801561039c57600080fd5b50600454610275906001600160a01b031681565b3480156103bc57600080fd5b506103d06103cb366004611745565b6108d2565b604080516001600160a01b03909316835260208301919091520161022a565b3480156103fb57600080fd5b5061025361040a36600461183c565b61094a565b34801561041b57600080fd5b50600080516020611cdd8339815191525460ff1661021e565b34801561044057600080fd5b506102ad7fd1473398bb66596de5d1ea1fc8e303ff2ac23265adc9144b1b52065dc4f0934b81565b34801561047457600080fd5b506104a860405180604001604052806014815260200173119d5b98dd1a5bdb881b9bdd08185b1b1bddd95960621b81525081565b60405161022a9190611871565b3480156104c157600080fd5b506102ad60005481565b3480156104d757600080fd5b50610253610964565b3480156104ec57600080fd5b506102536104fb3660046116e5565b610977565b34801561050c57600080fd5b5061021e61051b366004611719565b610a08565b34801561052c57600080fd5b5061025361053b366004611909565b610a40565b34801561054c57600080fd5b506102ad600081565b34801561056157600080fd5b50610275610570366004611700565b610af5565b34801561058157600080fd5b506102756105903660046116e5565b6008602052600090815260409020546001600160a01b031681565b3480156105b757600080fd5b50600154610275906001600160a01b031681565b3480156105d757600080fd5b506102536105e636600461194b565b610b05565b3480156105f757600080fd5b506102ad6106063660046119e7565b610d7a565b34801561061757600080fd5b50610253610626366004611719565b610f7c565b34801561063757600080fd5b506104a8610f98565b34801561064c57600080fd5b5061025361065b3660046116e5565b611026565b34801561066c57600080fd5b5061025361067b366004611a11565b6110c7565b34801561068c57600080fd5b50610695600181565b60405160ff909116815260200161022a565b60006001600160e01b03198216637965db0b60e01b14806106d857506301ffc9a760e01b6001600160e01b03198316145b92915050565b60006106e9816111c5565b61071e82604051806040016040528060138152602001726c6971756964546f6b656e416464726573735f60681b8152506111cf565b6040516001600160a01b038316907f4245d51ab06b77fea049f6e1eab0e31b343fc4c1e9fe7774373362c37eb2034490600090a250600180546001600160a01b0319166001600160a01b0392909216919091179055565b6005818154811061078557600080fd5b6000918252602090912001546001600160a01b0316905081565b6000908152600080516020611cbd833981519152602052604090206001015490565b60006107cc816111c5565b61080b826040518060400160405280601a81526020017f777261707065644c6971756964546f6b656e416464726573735f0000000000008152506111cf565b6040516001600160a01b038316907fce01361fe7ff662213b751c96882886f856789c4049c51e47af22049de7976b890600090a250600280546001600160a01b0319166001600160a01b0392909216919091179055565b61086b8261079f565b610874816111c5565b61087e83836111f8565b50505050565b6001600160a01b03811633146108ad5760405163334bd91960e11b815260040160405180910390fd5b6108b7828261129d565b505050565b60006108c7816111c5565b6108cf611319565b50565b6000807fd1473398bb66596de5d1ea1fc8e303ff2ac23265adc9144b1b52065dc4f0934b6108ff816111c5565b6040805180820182526014815273119d5b98dd1a5bdb881b9bdd08185b1b1bddd95960621b6020820152905162461bcd60e51b81526109419190600401611871565b60405180910390fd5b6000610955816111c5565b610960826001611379565b5050565b600061096f816111c5565b6108cf6114b8565b6000610982816111c5565b6109b1826040518060400160405280600d81526020016c7661756c74416464726573735f60981b8152506111cf565b6040516001600160a01b038316907f5c06d966572db101b61cacf1a095f31609e34873f11016fc5cb333651e969f6790600090a250600480546001600160a01b0319166001600160a01b0392909216919091179055565b6000918252600080516020611cbd833981519152602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6000610a4b816111c5565b610aaf83838080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505060408051808201909152600d81526c73747261746567794e616d655f60981b602082015291506115019050565b7f21ce9ce25f0f85766c680deb376fbea42cd6d6911f217c0d89f14c439b84fcfd8383604051610ae0929190611a3b565b60405180910390a1600761087e838583611af4565b6006818154811061078557600080fd5b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a008054600160401b810460ff16159067ffffffffffffffff16600081158015610b4b5750825b905060008267ffffffffffffffff166001148015610b685750303b155b905081158015610b76575080155b15610b945760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff191660011785558315610bbe57845460ff60401b1916600160401b1785555b610bed8b6040518060400160405280600d81526020016c7661756c74416464726573735f60981b8152506111cf565b610c228a604051806040016040528060138152602001726c6971756964546f6b656e416464726573735f60681b8152506111cf565b610c5988604051806040016040528060158152602001747661756c745374726174656779416464726573735f60581b8152506111cf565b610cbd87878080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505060408051808201909152600d81526c73747261746567794e616d655f60981b602082015291506115019050565b610cc8896001611379565b610cd0611525565b610cdb6000336111f8565b50600480546001600160a01b03808e166001600160a01b031992831617909255600180548d841690831617905560098054928b16929091169190911790556007610d26878983611af4565b508315610d6d57845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b5050505050505050505050565b6001546000906001600160a01b0384811691161480610da657506002546001600160a01b038481169116145b610df25760405162461bcd60e51b815260206004820152601760248201527f496e76616c696420746f6b656e207265717565737465640000000000000000006044820152606401610941565b8160011480610e015750816002145b610e4d5760405162461bcd60e51b815260206004820152601b60248201527f496e76616c696420736f7572636520746f2067657420707269636500000000006044820152606401610941565b6001600160a01b03808416600090815260086020526040812054909116908115610ee3576000826001600160a01b031663feaf968c6040518163ffffffff1660e01b815260040160a060405180830381865afa158015610eb1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ed59190611bcf565b50919450610f749350505050565b600084600214610efa57610ef561152f565b610f02565b610f0261156d565b604051630681320d60e51b81526001600160a01b0388811660048301529192509082169063d02641a090602401602060405180830381865afa158015610f4c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f709190611c1f565b9150505b949350505050565b610f858261079f565b610f8e816111c5565b61087e838361129d565b60078054610fa590611a6a565b80601f0160208091040260200160405190810160405280929190818152602001828054610fd190611a6a565b801561101e5780601f10610ff35761010080835404028352916020019161101e565b820191906000526020600020905b81548152906001019060200180831161100157829003601f168201915b505050505081565b6000611031816111c5565b611070826040518060400160405280601881526020017f77697468647261775374726174656779416464726573735f00000000000000008152506111cf565b6040516001600160a01b038316907f28548fb82baba9340b788ecc4911d241c9508404c350e6964e447fbf8d62c12890600090a250600380546001600160a01b0319166001600160a01b0392909216919091179055565b60006110d2816111c5565b6001546001600160a01b03848116911614806110fb57506002546001600160a01b038481169116145b801561110f57506001600160a01b03831615155b6111535760405162461bcd60e51b8152602060048201526015602482015274125b9d985b1a59081d1bdad95b88195b9d195c9959605a1b6044820152606401610941565b604080516001600160a01b038086168252841660208201527fd2d8394cf7549a5ddbc2ba3dd7b2de8d53c891472d1f2907008ed6a10045fdae910160405180910390a1506001600160a01b03918216600090815260086020526040902080546001600160a01b03191691909216179055565b6108cf8133611583565b6001600160a01b038216610960578060405163eac0d38960e01b81526004016109419190611871565b6000600080516020611cbd8339815191526112138484610a08565b611293576000848152602082815260408083206001600160a01b03871684529091529020805460ff191660011790556112493390565b6001600160a01b0316836001600160a01b0316857f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a460019150506106d8565b60009150506106d8565b6000600080516020611cbd8339815191526112b88484610a08565b15611293576000848152602082815260408083206001600160a01b0387168085529252808320805460ff1916905551339287917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a460019150506106d8565b6113216115bc565b600080516020611cdd833981519152805460ff191681557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a150565b815160ff821681146113b95760405163cb97bcb160e01b8152602060048201526008602482015267776974686472617760c01b6044820152606401610941565b6113c560066000611666565b7fdb2c7c26f26f22897028e2e018c1967eef4170d6a2c476a373823d8639da73ec836040516113f49190611c38565b60405180910390a160005b8181101561087e5761145f84828151811061141c5761141c611c85565b60200260200101516040518060400160405280601781526020017f61646170746572735769746864726177506174685f5b5d0000000000000000008152506111cf565b600684828151811061147357611473611c85565b60209081029190910181015182546001808201855560009485529290932090920180546001600160a01b0319166001600160a01b0390931692909217909155016113ff565b6114c06115ec565b600080516020611cdd833981519152805460ff191660011781557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2583361135b565b600082511161096057806040516318a996bb60e21b81526004016109419190611871565b61152d61161d565b565b600580546000919061154390600190611c9b565b8154811061155357611553611c85565b6000918252602090912001546001600160a01b0316919050565b6000600660008154811061155357611553611c85565b61158d8282610a08565b6109605760405163e2517d3f60e01b81526001600160a01b038216600482015260248101839052604401610941565b600080516020611cdd8339815191525460ff1661152d57604051638dfc202b60e01b815260040160405180910390fd5b600080516020611cdd8339815191525460ff161561152d5760405163d93c066560e01b815260040160405180910390fd5b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0054600160401b900460ff1661152d57604051631afcd79f60e31b815260040160405180910390fd5b50805460008255906000526020600020908101906108cf91905b808211156116945760008155600101611680565b5090565b6000602082840312156116aa57600080fd5b81356001600160e01b0319811681146116c257600080fd5b9392505050565b80356001600160a01b03811681146116e057600080fd5b919050565b6000602082840312156116f757600080fd5b6116c2826116c9565b60006020828403121561171257600080fd5b5035919050565b6000806040838503121561172c57600080fd5b8235915061173c602084016116c9565b90509250929050565b60008060006060848603121561175a57600080fd5b611763846116c9565b9250611771602085016116c9565b9150604084013590509250925092565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126117a857600080fd5b8135602067ffffffffffffffff808311156117c5576117c5611781565b8260051b604051601f19603f830116810181811084821117156117ea576117ea611781565b604052938452602081870181019490810192508785111561180a57600080fd5b6020870191505b8482101561183157611822826116c9565b83529183019190830190611811565b979650505050505050565b60006020828403121561184e57600080fd5b813567ffffffffffffffff81111561186557600080fd5b610f7484828501611797565b60006020808352835180602085015260005b8181101561189f57858101830151858201604001528201611883565b506000604082860101526040601f19601f8301168501019250505092915050565b60008083601f8401126118d257600080fd5b50813567ffffffffffffffff8111156118ea57600080fd5b60208301915083602082850101111561190257600080fd5b9250929050565b6000806020838503121561191c57600080fd5b823567ffffffffffffffff81111561193357600080fd5b61193f858286016118c0565b90969095509350505050565b60008060008060008060a0878903121561196457600080fd5b61196d876116c9565b955061197b602088016116c9565b9450604087013567ffffffffffffffff8082111561199857600080fd5b6119a48a838b01611797565b95506119b260608a016116c9565b945060808901359150808211156119c857600080fd5b506119d589828a016118c0565b979a9699509497509295939492505050565b600080604083850312156119fa57600080fd5b611a03836116c9565b946020939093013593505050565b60008060408385031215611a2457600080fd5b611a2d836116c9565b915061173c602084016116c9565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b600181811c90821680611a7e57607f821691505b602082108103611a9e57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156108b7576000816000526020600020601f850160051c81016020861015611acd5750805b601f850160051c820191505b81811015611aec57828155600101611ad9565b505050505050565b67ffffffffffffffff831115611b0c57611b0c611781565b611b2083611b1a8354611a6a565b83611aa4565b6000601f841160018114611b545760008515611b3c5750838201355b600019600387901b1c1916600186901b178355611bae565b600083815260209020601f19861690835b82811015611b855786850135825560209485019460019092019101611b65565b5086821015611ba25760001960f88860031b161c19848701351681555b505060018560011b0183555b5050505050565b805169ffffffffffffffffffff811681146116e057600080fd5b600080600080600060a08688031215611be757600080fd5b611bf086611bb5565b9450602086015193506040860151925060608601519150611c1360808701611bb5565b90509295509295909350565b600060208284031215611c3157600080fd5b5051919050565b6020808252825182820181905260009190848201906040850190845b81811015611c795783516001600160a01b031683529284019291840191600101611c54565b50909695505050505050565b634e487b7160e01b600052603260045260246000fd5b818103818111156106d857634e487b7160e01b600052601160045260246000fdfe02dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b626800cd5ed15c6e187e77e9aee88184c21f4f2182ab5827cb3b7e07fbedcd63f03300a264697066735822122017c33f700899798acc9dbc50b196e4482c1349d0cef14e114a425f3ab394156864736f6c63430008180033";

type StrWithdrawStandardConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StrWithdrawStandardConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StrWithdrawStandard__factory extends ContractFactory {
  constructor(...args: StrWithdrawStandardConstructorParams) {
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
      StrWithdrawStandard & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): StrWithdrawStandard__factory {
    return super.connect(runner) as StrWithdrawStandard__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StrWithdrawStandardInterface {
    return new Interface(_abi) as StrWithdrawStandardInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): StrWithdrawStandard {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as StrWithdrawStandard;
  }
}
