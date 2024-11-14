export declare function configVault(vaultContractAddress: string, vaultStrategyAddress: string, withdrawStrategyAddress: string): Promise<void>;
export declare function configDepositStrategy(contractName: string, vaultStrategyAddress: string, withdrawStrategyAddress: string, wrapperAddress: string | null): Promise<void>;
export declare function configSwapPath(contractName: string, strDeployContractAddress: string, tokens: string[], fees: bigint[]): Promise<void>;
//# sourceMappingURL=_configContracts.d.ts.map