/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type {
  KelpMock,
  KelpMockInterface,
} from "../../../../contracts/_mocks/adapters/KelpMock";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract ERC20Mock",
        name: "rsETH_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "assetCurrentLimit",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "depositAsset",
    outputs: [],
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
    ],
    name: "getAssetCurrentLimit",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "getRsETHAmountToMint",
    outputs: [
      {
        internalType: "uint256",
        name: "rsethAmountToMint",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minAmountToDeposit",
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
    name: "rsETH",
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
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
    ],
    name: "setAssetCurrentLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "setRsETHAmountToMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "min",
        type: "uint256",
      },
    ],
    name: "setminAmountToDeposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "toMint",
        type: "uint256",
      },
    ],
    name: "setrsETHAmountToMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516103b83803806103b883398101604081905261002f91610054565b600380546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b610325806100936000396000f3fe608060405234801561001057600080fd5b506004361061009d5760003560e01c8063b205e6c111610066578063b205e6c11461011c578063ba5bb4421461012f578063c3ae176614610145578063ca58e4ff146100e5578063fd83f9af1461015857600080fd5b8062b83bce146100a257806337ece810146100d2578063778fbe60146100e7578063884c1056146100fe5780639d45f18a14610113575b600080fd5b6003546100b5906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6100e56100e03660046101da565b600155565b005b6100f060015481565b6040519081526020016100c9565b6100f061010c36600461020f565b5060025490565b6100f060025481565b6100e561012a3660046101da565b600055565b6100f061013d366004610231565b505060005490565b6100e561015336600461025b565b61016b565b6100e56101663660046101da565b600255565b6003546000546040516340c10f1960e01b815233600482015260248101919091526001600160a01b03909116906340c10f1990604401600060405180830381600087803b1580156101bb57600080fd5b505af11580156101cf573d6000803e3d6000fd5b505050505050505050565b6000602082840312156101ec57600080fd5b5035919050565b80356001600160a01b038116811461020a57600080fd5b919050565b60006020828403121561022157600080fd5b61022a826101f3565b9392505050565b6000806040838503121561024457600080fd5b61024d836101f3565b946020939093013593505050565b60008060008060006080868803121561027357600080fd5b61027c866101f3565b94506020860135935060408601359250606086013567ffffffffffffffff808211156102a757600080fd5b818801915088601f8301126102bb57600080fd5b8135818111156102ca57600080fd5b8960208285010111156102dc57600080fd5b969995985093965060200194939250505056fea26469706673582212207928674f11036a65ff0bf53ad9b27c4bf2f57aeb3991a328fc94a5f9f20c03f264736f6c63430008180033";

type KelpMockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: KelpMockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class KelpMock__factory extends ContractFactory {
  constructor(...args: KelpMockConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    rsETH_: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(rsETH_, overrides || {});
  }
  override deploy(
    rsETH_: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(rsETH_, overrides || {}) as Promise<
      KelpMock & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): KelpMock__factory {
    return super.connect(runner) as KelpMock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): KelpMockInterface {
    return new Interface(_abi) as KelpMockInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): KelpMock {
    return new Contract(address, _abi, runner) as unknown as KelpMock;
  }
}
