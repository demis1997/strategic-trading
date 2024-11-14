import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, BigNumberish, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { Counter, CounterInterface } from "../../contracts/Counter";
type CounterConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Counter__factory extends ContractFactory {
    constructor(...args: CounterConstructorParams);
    getDeployTransaction(_count: BigNumberish, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(_count: BigNumberish, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<Counter & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): Counter__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b506040516101c93803806101c983398101604081905261002f91610037565b600055610050565b60006020828403121561004957600080fd5b5051919050565b61016a8061005f6000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063a87d942c14610051578063b7f90f1214610066578063e5071b8e14610070578063fc583c8d14610078575b600080fd5b60005460405190815260200160405180910390f35b61006e61008b565b005b61006e6100a4565b61006e6100863660046100b6565b600055565b600160008082825461009d91906100e5565b9091555050565b600160008082825461009d919061010c565b6000602082840312156100c857600080fd5b5035919050565b634e487b7160e01b600052601160045260246000fd5b8181036000831280158383131683831282161715610105576101056100cf565b5092915050565b808201828112600083128015821682158216171561012c5761012c6100cf565b50509291505056fea2646970667358221220477660fd1e9513dd4527d6dab273055fe355acecf9466a2180978538c622020e64736f6c63430008180033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "int256";
            readonly name: "_count";
            readonly type: "int256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [];
        readonly name: "decrementCount";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getCount";
        readonly outputs: readonly [{
            readonly internalType: "int256";
            readonly name: "count_";
            readonly type: "int256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "incrementCount";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "int256";
            readonly name: "count_";
            readonly type: "int256";
        }];
        readonly name: "setCount";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): CounterInterface;
    static connect(address: string, runner?: ContractRunner | null): Counter;
}
export {};
//# sourceMappingURL=Counter__factory.d.ts.map