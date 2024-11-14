import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { MockAggregationExecutor, MockAggregationExecutorInterface } from "../../../../contracts/_mocks/1InchMock.sol/MockAggregationExecutor";
type MockAggregationExecutorConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class MockAggregationExecutor__factory extends ContractFactory {
    constructor(...args: MockAggregationExecutorConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<MockAggregationExecutor & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): MockAggregationExecutor__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5061011a806100206000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063b61d27f614602d575b600080fd5b604360383660046055565b6103e8949350505050565b60405190815260200160405180910390f35b60008060008060608587031215606a57600080fd5b84356001600160a01b0381168114608057600080fd5b935060208501359250604085013567ffffffffffffffff8082111560a357600080fd5b818701915087601f83011260b657600080fd5b81358181111560c457600080fd5b88602082850101111560d557600080fd5b9598949750506020019450505056fea26469706673582212200054a2048a1905da9468f549101523181d6fb3eeba9ee958b2d0e7c3cec26f9b64736f6c63430008180033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly name: "execute";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): MockAggregationExecutorInterface;
    static connect(address: string, runner?: ContractRunner | null): MockAggregationExecutor;
}
export {};
//# sourceMappingURL=MockAggregationExecutor__factory.d.ts.map