import { type ContractRunner } from "ethers";
import type { IUniswapV3Protocol, IUniswapV3ProtocolInterface } from "../../../../../contracts/adapters/uniswap/interfaces/IUniswapV3Protocol";
export declare class IUniswapV3Protocol__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "bytes";
                readonly name: "path";
                readonly type: "bytes";
            }, {
                readonly internalType: "address";
                readonly name: "recipient";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amountOut";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "amountInMaximum";
                readonly type: "uint256";
            }];
            readonly internalType: "struct IUniswapV3Protocol.ExactOutputParams";
            readonly name: "params";
            readonly type: "tuple";
        }];
        readonly name: "exactOutput";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amountIn";
            readonly type: "uint256";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "path";
            readonly type: "bytes";
        }, {
            readonly internalType: "uint256";
            readonly name: "amountOut";
            readonly type: "uint256";
        }];
        readonly name: "quoteExactOutput";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amountIn";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint160[]";
            readonly name: "sqrtPriceX96AfterList";
            readonly type: "uint160[]";
        }, {
            readonly internalType: "uint32[]";
            readonly name: "initializedTicksCrossedList";
            readonly type: "uint32[]";
        }, {
            readonly internalType: "uint256";
            readonly name: "gasEstimate";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "slot0";
        readonly outputs: readonly [{
            readonly internalType: "uint160";
            readonly name: "sqrtPriceX96";
            readonly type: "uint160";
        }, {
            readonly internalType: "int24";
            readonly name: "tick";
            readonly type: "int24";
        }, {
            readonly internalType: "uint16";
            readonly name: "observationIndex";
            readonly type: "uint16";
        }, {
            readonly internalType: "uint16";
            readonly name: "observationCardinality";
            readonly type: "uint16";
        }, {
            readonly internalType: "uint16";
            readonly name: "observationCardinalityNext";
            readonly type: "uint16";
        }, {
            readonly internalType: "uint8";
            readonly name: "feeProtocol";
            readonly type: "uint8";
        }, {
            readonly internalType: "bool";
            readonly name: "unlocked";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "token0";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IUniswapV3ProtocolInterface;
    static connect(address: string, runner?: ContractRunner | null): IUniswapV3Protocol;
}
//# sourceMappingURL=IUniswapV3Protocol__factory.d.ts.map