import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { StaderMock, StaderMockInterface } from "../../../../contracts/_mocks/adapters/StaderMock";
type StaderMockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class StaderMock__factory extends ContractFactory {
    constructor(...args: StaderMockConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<StaderMock & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): StaderMock__factory;
    static readonly bytecode = "0x608060405260001960025534801561001657600080fd5b50610255806100266000396000f3fe6080604052600436106100865760003560e01c80638fcc9cfb116100595780638fcc9cfb14610124578063bb371fdd14610144578063ef8b30f714610164578063f340fa0114610186578063f5bade661461019457600080fd5b806302329a291461008b57806341b3d185146100bb5780635c975abb146100e45780636083e59a1461010e575b600080fd5b34801561009757600080fd5b506100b96100a63660046101b4565b6000805460ff1916911515919091179055565b005b3480156100c757600080fd5b506100d160015481565b6040519081526020015b60405180910390f35b3480156100f057600080fd5b506000546100fe9060ff1681565b60405190151581526020016100db565b34801561011a57600080fd5b506100d160025481565b34801561013057600080fd5b506100b961013f3660046101dd565b600155565b34801561015057600080fd5b506100b961015f3660046101dd565b600255565b34801561017057600080fd5b506100d161017f3660046101dd565b5060035490565b6100d161017f3660046101f6565b3480156101a057600080fd5b506100b96101af3660046101dd565b600355565b6000602082840312156101c657600080fd5b813580151581146101d657600080fd5b9392505050565b6000602082840312156101ef57600080fd5b5035919050565b60006020828403121561020857600080fd5b81356001600160a01b03811681146101d657600080fdfea26469706673582212202ed0a2209911308f2d97c70b1adb1023adcbd6e0adde6d1116a0d6d7520d8ccc64736f6c63430008180033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "deposit";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "maxDeposit";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "minDeposit";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bool";
            readonly name: "pause_";
            readonly type: "bool";
        }];
        readonly name: "pause";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "paused";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly name: "previewDeposit";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "prev";
            readonly type: "uint256";
        }];
        readonly name: "setDeposit";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "max";
            readonly type: "uint256";
        }];
        readonly name: "setMaxDeposit";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "min";
            readonly type: "uint256";
        }];
        readonly name: "setMinDeposit";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): StaderMockInterface;
    static connect(address: string, runner?: ContractRunner | null): StaderMock;
}
export {};
//# sourceMappingURL=StaderMock__factory.d.ts.map