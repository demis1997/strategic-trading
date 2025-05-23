import { Contract } from "ethers";
export declare function deployAggregatorToken(contractName: string, underlyingAsset: string, vaultsRegistry: string, ownerAddress: string, name: string, symbol: string): Promise<Contract>;
export declare function deployTransferStrategy(aggregatorToken: string, ownerAddress: string): Promise<Contract>;
export declare function deployGenericWrapperMock(contractName: string, liquidTokenAddress: string, tokenName: string, tokenSymbol: string, decimals: bigint): Promise<Contract>;
export declare function deployMasterTokenMock(contractName: string, vaultsRegistryAddress: string, tokenName: string, tokenSymbol: string, decimals: bigint): Promise<Contract>;
export declare function deployVaultsRegistryMock(): Promise<Contract>;
export declare function deployVaultsRegistry(feeRate: bigint, vaultImplementationAddress: string): Promise<Contract>;
export declare function deployVaultImplementation(): Promise<Contract>;
export declare function deployVaultMock(tokenAddress: string, name: string, symbol: string): Promise<Contract>;
export declare function deployOracleMock(contractName: string, tokenAddress: string, tokenName: string, tokenPrice: bigint): Promise<Contract>;
export declare function deployProtocolMock(contractName: string, protocolName: string, assetAddress: string, liquidAssetAddress: string): Promise<Contract>;
export declare function deployMockAdapter(contractName: string, protocolAddress: string): Promise<Contract>;
export declare function deployVaultStrategy(contractName: string, vaultAddress: string, liquidTokenAddress: string, adapterDeployPath: string[], adapterWithdrawPath: string[], strategyName: string): Promise<Contract>;
export declare function deployWithdrawStrategy(contractName: string, vaultAddress: string, liquidTokenAddress: string, adaptersWithdrawPath: string[], vaultStrategyAddress: string, withdrawStrategyName: string): Promise<Contract>;
export declare function deployVaultV2Implementation(): Promise<Contract>;
export declare function deployERC20(name: string, symbol: string, decimals: number): Promise<Contract>;
export declare function deployUniswapAdapter(contractName: string, protocolAddress: string, quoterAddress: string, wethAddress: string): Promise<Contract>;
export declare function deployRenzoAdapter(contractName: string, liquifierAddress: string, ezETHAddress: string, stETHAddress: string): Promise<Contract>;
export declare function deployEtherFiAdapter(contractName: string, liquifierAddress: string, eETHAddress: string, weETHAddress: string): Promise<Contract>;
export declare function deployStaderAdapter(contractName: string, protocolAddress: string, wETHAddress: string, ethXAdress: string): Promise<Contract>;
export declare function deployRocketAdapter(contractName: string, depositPoolAddress: string, rocketSettingsAddress: string, wETHAddress: string, rETHAddress: string): Promise<Contract>;
export declare function deployKelpAdapter(contractName: string, kelpProtocolAddress: string, rsETHAddress: string): Promise<Contract>;
export declare function deploySwapper(contractName: string, defaultSlippage: number, adminAddress: string): Promise<Contract>;
export declare function deployLidoAdapter(contractName: string, protocolAddress: string, wethAddress: string, wrapppedTokenAddress: string): Promise<Contract>;
//# sourceMappingURL=_deployContracts.d.ts.map