import { type ContractRunner } from "ethers";
import type { IVaultsRegistry, IVaultsRegistryInterface } from "../../../contracts/interfaces/IVaultsRegistry";
export declare class IVaultsRegistry__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "DefaultFeeRateError";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "FailedVaultDeployment";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "target";
            readonly type: "string";
        }];
        readonly name: "ZeroAddress";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "newFeeRate";
            readonly type: "uint256";
        }];
        readonly name: "DefaultFeeRateSet";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "vault";
            readonly type: "address";
        }];
        readonly name: "VaultDeployed";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "newImplementation";
            readonly type: "address";
        }];
        readonly name: "VaultImplementationChanged";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "vaultAddress";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "bool";
            readonly name: "status";
            readonly type: "bool";
        }];
        readonly name: "VaultStatusChanged";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "vaultAddress_";
            readonly type: "address";
        }];
        readonly name: "isVaultActive";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IVaultsRegistryInterface;
    static connect(address: string, runner?: ContractRunner | null): IVaultsRegistry;
}
//# sourceMappingURL=IVaultsRegistry__factory.d.ts.map