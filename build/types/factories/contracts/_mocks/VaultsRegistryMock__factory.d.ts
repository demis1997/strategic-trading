import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { VaultsRegistryMock, VaultsRegistryMockInterface } from "../../../contracts/_mocks/VaultsRegistryMock";
type VaultsRegistryMockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class VaultsRegistryMock__factory extends ContractFactory {
    constructor(...args: VaultsRegistryMockConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<VaultsRegistryMock & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): VaultsRegistryMock__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50610225806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80630c5aed571461004657806360d712fc146100865780636657fc671461009b575b600080fd5b610072610054366004610191565b6001600160a01b031660009081526020819052604090205460ff1690565b604051901515815260200160405180910390f35b6100996100943660046101b3565b6100be565b005b6100726100a9366004610191565b60006020819052908152604090205460ff1681565b6001600160a01b0382166101185760405162461bcd60e51b815260206004820152601d60248201527f7661756c74416464726573735f206973207a65726f2061646472657373000000604482015260640160405180910390fd5b6001600160a01b03821660008181526020818152604091829020805460ff191685151590811790915591519182527f32a7de7321c9403d8687817e59bda821c4153c1ba40a38e43d5405070cdfb384910160405180910390a25050565b80356001600160a01b038116811461018c57600080fd5b919050565b6000602082840312156101a357600080fd5b6101ac82610175565b9392505050565b600080604083850312156101c657600080fd5b6101cf83610175565b9150602083013580151581146101e457600080fd5b80915050925092905056fea2646970667358221220c2a97587e3a0c8456f229ac23f805c89f01a5cfeda887122dd57edd88ce54aa664736f6c63430008180033";
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
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
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "vaultAddress_";
            readonly type: "address";
        }, {
            readonly internalType: "bool";
            readonly name: "status_";
            readonly type: "bool";
        }];
        readonly name: "setVaultStatus";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "validVaults";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): VaultsRegistryMockInterface;
    static connect(address: string, runner?: ContractRunner | null): VaultsRegistryMock;
}
export {};
//# sourceMappingURL=VaultsRegistryMock__factory.d.ts.map