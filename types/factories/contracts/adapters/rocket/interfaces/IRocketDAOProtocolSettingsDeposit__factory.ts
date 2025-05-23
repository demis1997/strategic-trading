/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IRocketDAOProtocolSettingsDeposit,
  IRocketDAOProtocolSettingsDepositInterface,
} from "../../../../../contracts/adapters/rocket/interfaces/IRocketDAOProtocolSettingsDeposit";

const _abi = [
  {
    inputs: [],
    name: "getDepositEnabled",
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
    name: "getDepositFee",
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
    name: "getMaximumDepositPoolSize",
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
    name: "getMinimumDeposit",
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
] as const;

export class IRocketDAOProtocolSettingsDeposit__factory {
  static readonly abi = _abi;
  static createInterface(): IRocketDAOProtocolSettingsDepositInterface {
    return new Interface(_abi) as IRocketDAOProtocolSettingsDepositInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IRocketDAOProtocolSettingsDeposit {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as IRocketDAOProtocolSettingsDeposit;
  }
}
