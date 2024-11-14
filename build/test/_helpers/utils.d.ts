import { ContractTransactionReceipt, Contract, Signer } from "ethers";
export declare const testDeployStrategyFailure: (contractName: string, vaultAddress: string, liquidTokenAddress: string, adapterDeployPath: string[], adapterWithdrawPath: string[], strategyName: string, expectedError: string, expectedErrorMessage: string) => Promise<void>;
export declare const getVariableFromEvent: (contract: Contract, eventName: string, txReceipt: ContractTransactionReceipt | null, index: number) => Promise<string>;
export declare const getAllFromEvent: (contract: Contract, eventName: string, txReceipt: ContractTransactionReceipt | null) => Promise<object>;
export interface MainnetData {
    tokenInAddress: string;
    inAmount: bigint;
    tokenOutAddress: string;
    outAmount: bigint;
    delta: bigint;
}
export declare const getDelta: (tokenInAddress: string, tokenOutAddress: string, deployer: Signer, amountIn: bigint, adapterContract: Contract) => Promise<MainnetData>;
export declare const getQuoteFromUni: (protocol: string, swapExchange: Contract, amountOut: bigint, tokenIn: string, tokenOut: string, fee: bigint) => Promise<bigint>;
//# sourceMappingURL=utils.d.ts.map