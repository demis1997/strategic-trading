/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IMasterToken,
  IMasterTokenInterface,
} from "../../../contracts/interfaces/IMasterToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "getUserSharesBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "userSharesBalance",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IMasterToken__factory {
  static readonly abi = _abi;
  static createInterface(): IMasterTokenInterface {
    return new Interface(_abi) as IMasterTokenInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IMasterToken {
    return new Contract(address, _abi, runner) as unknown as IMasterToken;
  }
}
