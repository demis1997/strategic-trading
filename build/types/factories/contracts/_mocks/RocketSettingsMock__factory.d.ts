import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { RocketSettingsMock, RocketSettingsMockInterface } from "../../../contracts/_mocks/RocketSettingsMock";
type RocketSettingsMockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class RocketSettingsMock__factory extends ContractFactory {
    constructor(...args: RocketSettingsMockConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<RocketSettingsMock & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): RocketSettingsMock__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5061019e806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80636ada78471161005b5780636ada7847146100e257806370e5e4f8146100f8578063e78ec42e1461010b578063fd6ce89e1461011e57600080fd5b8063035cf1421461008d5780630de705b5146100a4578063490ae210146100ac5780635b17d04b146100c1575b600080fd5b6001545b6040519081526020015b60405180910390f35b600354610091565b6100bf6100ba366004610126565b600355565b005b6100bf6100cf36600461013f565b6000805460ff1916911515919091179055565b60005460ff16604051901515815260200161009b565b6100bf610106366004610126565b600255565b6100bf610119366004610126565b600155565b600254610091565b60006020828403121561013857600080fd5b5035919050565b60006020828403121561015157600080fd5b8135801515811461016157600080fd5b939250505056fea26469706673582212201408d4e831f80f514a5001d5fd45663a399566c5d33d845a0d13599c4c98adaf64736f6c63430008180033";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "getDepositEnabled";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getDepositFee";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getMaximumDepositPoolSize";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getMinimumDeposit";
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
            readonly name: "_depositEnabled";
            readonly type: "bool";
        }];
        readonly name: "setDepositEnabled";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "_depositFee";
            readonly type: "uint256";
        }];
        readonly name: "setDepositFee";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "_maximumDepositPoolSize";
            readonly type: "uint256";
        }];
        readonly name: "setMaximumDepositPoolSize";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "_minimumDeposit";
            readonly type: "uint256";
        }];
        readonly name: "setMinimumDeposit";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): RocketSettingsMockInterface;
    static connect(address: string, runner?: ContractRunner | null): RocketSettingsMock;
}
export {};
//# sourceMappingURL=RocketSettingsMock__factory.d.ts.map