/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  I1inchAggregatorV6,
  I1inchAggregatorV6Interface,
} from "../../../../contracts/interfaces/I1inchAggregatorV6.sol/I1inchAggregatorV6";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IAggregationExecutor",
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
        internalType: "struct I1inchAggregatorV6.SwapDescription",
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
] as const;

export class I1inchAggregatorV6__factory {
  static readonly abi = _abi;
  static createInterface(): I1inchAggregatorV6Interface {
    return new Interface(_abi) as I1inchAggregatorV6Interface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): I1inchAggregatorV6 {
    return new Contract(address, _abi, runner) as unknown as I1inchAggregatorV6;
  }
}
