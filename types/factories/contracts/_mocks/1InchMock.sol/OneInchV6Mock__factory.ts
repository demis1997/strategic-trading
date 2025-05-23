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
  OneInchV6Mock,
  OneInchV6MockInterface,
} from "../../../../contracts/_mocks/1InchMock.sol/OneInchV6Mock";

const _abi = [
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
        name: "srcToken",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "dstToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "returnAmount",
        type: "uint256",
      },
    ],
    name: "SwapExecuted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        internalType: "address",
        name: "srcToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "dstToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minReturn",
        type: "uint256",
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
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610255806100206000396000f3fe6080604052600436106100225760003560e01c8063a5d4096b1461002e57600080fd5b3661002957005b600080fd5b61004161003c3660046100ff565b610053565b60405190815260200160405180910390f35b6000606461006286600a6101cd565b61006c91906101ea565b610076908661020c565b9050856001600160a01b0316876001600160a01b0316336001600160a01b03167f764f0dc063c06f32d89a3f3af80c0db4be8a090901f589a478b447e0a51f09f188856040516100d0929190918252602082015260400190565b60405180910390a4979650505050505050565b80356001600160a01b03811681146100fa57600080fd5b919050565b600080600080600080600060c0888a03121561011a57600080fd5b610123886100e3565b9650610131602089016100e3565b955061013f604089016100e3565b9450606088013593506080880135925060a088013567ffffffffffffffff8082111561016a57600080fd5b818a0191508a601f83011261017e57600080fd5b81358181111561018d57600080fd5b8b602082850101111561019f57600080fd5b60208301945080935050505092959891949750929550565b634e487b7160e01b600052601160045260246000fd5b80820281158282048414176101e4576101e46101b7565b92915050565b60008261020757634e487b7160e01b600052601260045260246000fd5b500490565b818103818111156101e4576101e46101b756fea26469706673582212200ec2f6c0b8dc1c552807195400def4b85b6b1d0670c340443e360e21a1f4024e64736f6c63430008180033";

type OneInchV6MockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OneInchV6MockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class OneInchV6Mock__factory extends ContractFactory {
  constructor(...args: OneInchV6MockConstructorParams) {
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
      OneInchV6Mock & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): OneInchV6Mock__factory {
    return super.connect(runner) as OneInchV6Mock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OneInchV6MockInterface {
    return new Interface(_abi) as OneInchV6MockInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): OneInchV6Mock {
    return new Contract(address, _abi, runner) as unknown as OneInchV6Mock;
  }
}
