import { type ContractRunner } from "ethers";
import type { IBaseStrategy, IBaseStrategyInterface } from "../../../contracts/interfaces/IBaseStrategy";
export declare class IBaseStrategy__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "target";
            readonly type: "string";
        }];
        readonly name: "EmptyString";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ExecuteWithdrawWStrategyError";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "target";
            readonly type: "string";
        }];
        readonly name: "InvalidAdaptersPath";
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
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "target";
            readonly type: "string";
        }];
        readonly name: "ZeroAmount";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address[]";
            readonly name: "newDeployPath";
            readonly type: "address[]";
        }];
        readonly name: "AdaptersDeployPathSet";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address[]";
            readonly name: "newWithdrawPath";
            readonly type: "address[]";
        }];
        readonly name: "AdaptersWithdrawPathSet";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "LiquidTokenSet";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "priceFeed";
            readonly type: "address";
        }];
        readonly name: "PriceFeedSet";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "name";
            readonly type: "string";
        }];
        readonly name: "StrategyNameSet";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "TokenWrapperSet";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "vaultAddress";
            readonly type: "address";
        }];
        readonly name: "VaultAddressSet";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "strategyAddress";
            readonly type: "address";
        }];
        readonly name: "WithdrawStrategyAddressSet";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "receiver";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "asset";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "assetsAmount";
            readonly type: "uint256";
        }];
        readonly name: "WithdrawStrategyExecuted";
        readonly type: "event";
    }];
    static createInterface(): IBaseStrategyInterface;
    static connect(address: string, runner?: ContractRunner | null): IBaseStrategy;
}
//# sourceMappingURL=IBaseStrategy__factory.d.ts.map