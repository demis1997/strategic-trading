import { type ContractRunner } from "ethers";
import type { IRocketDAOProtocolSettingsDeposit, IRocketDAOProtocolSettingsDepositInterface } from "../../../../../contracts/adapters/rocket/interfaces/IRocketDAOProtocolSettingsDeposit";
export declare class IRocketDAOProtocolSettingsDeposit__factory {
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
    }];
    static createInterface(): IRocketDAOProtocolSettingsDepositInterface;
    static connect(address: string, runner?: ContractRunner | null): IRocketDAOProtocolSettingsDeposit;
}
//# sourceMappingURL=IRocketDAOProtocolSettingsDeposit__factory.d.ts.map