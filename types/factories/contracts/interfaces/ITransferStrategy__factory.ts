/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  ITransferStrategy,
  ITransferStrategyInterface,
} from "../../../contracts/interfaces/ITransferStrategy";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "from_",
        type: "address",
      },
      {
        internalType: "address",
        name: "to_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "assetAmount",
        type: "uint256",
      },
    ],
    name: "executePartialTransferStrategy",
    outputs: [
      {
        internalType: "address[]",
        name: "vaults",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "shares",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class ITransferStrategy__factory {
  static readonly abi = _abi;
  static createInterface(): ITransferStrategyInterface {
    return new Interface(_abi) as ITransferStrategyInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ITransferStrategy {
    return new Contract(address, _abi, runner) as unknown as ITransferStrategy;
  }
}
