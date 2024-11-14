"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployLidoAdapter = exports.deploySwapper = exports.deployKelpAdapter = exports.deployRocketAdapter = exports.deployStaderAdapter = exports.deployEtherFiAdapter = exports.deployRenzoAdapter = exports.deployUniswapAdapter = exports.deployERC20 = exports.deployVaultV2Implementation = exports.deployWithdrawStrategy = exports.deployVaultStrategy = exports.deployMockAdapter = exports.deployProtocolMock = exports.deployOracleMock = exports.deployVaultMock = exports.deployVaultImplementation = exports.deployVaultsRegistry = exports.deployVaultsRegistryMock = exports.deployMasterTokenMock = exports.deployGenericWrapperMock = exports.deployTransferStrategy = exports.deployAggregatorToken = void 0;
const hardhat_1 = require("hardhat");
const VERBOSE = false;
async function checkContract(contract, name) {
    if (contract === undefined)
        throw new Error(`${name} NOT deployed.`);
    else if (VERBOSE) {
        const contractAddress = await contract.getAddress();
        console.log(`${name} contract deployed at: ${contractAddress}`);
    }
}
async function deployAggregatorToken(contractName, underlyingAsset, vaultsRegistry, ownerAddress, name, symbol) {
    if (VERBOSE)
        console.log(`\nDEPLOYING ${contractName} Contract`);
    const AggregatorTokenFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const aggregatorTokenContract = await hardhat_1.upgrades.deployProxy(AggregatorTokenFactory, [
        underlyingAsset,
        vaultsRegistry,
        ownerAddress,
        name,
        symbol,
    ]);
    await aggregatorTokenContract.waitForDeployment();
    await checkContract(aggregatorTokenContract, contractName);
    return aggregatorTokenContract;
}
exports.deployAggregatorToken = deployAggregatorToken;
async function deployTransferStrategy(aggregatorToken, ownerAddress) {
    const contractName = "UniformTransferStrategy";
    if (VERBOSE)
        console.log(`\nDEPLOYING ${contractName} Contract`);
    const UniformTransferStrategyFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const uniformTransferStrategyContract = await hardhat_1.upgrades.deployProxy(UniformTransferStrategyFactory, [aggregatorToken, ownerAddress]);
    await uniformTransferStrategyContract.waitForDeployment();
    await checkContract(uniformTransferStrategyContract, contractName);
    return uniformTransferStrategyContract;
}
exports.deployTransferStrategy = deployTransferStrategy;
async function deployGenericWrapperMock(contractName, liquidTokenAddress, tokenName, tokenSymbol, decimals) {
    if (VERBOSE)
        console.log(`\nDEPLOYING ${contractName} Contract`);
    const GenericWrapperMockFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const genericWrapperMockContract = (await GenericWrapperMockFactory.deploy(liquidTokenAddress, tokenName, tokenSymbol, decimals));
    await genericWrapperMockContract.waitForDeployment();
    await checkContract(genericWrapperMockContract, contractName);
    return genericWrapperMockContract;
}
exports.deployGenericWrapperMock = deployGenericWrapperMock;
async function deployMasterTokenMock(contractName, vaultsRegistryAddress, tokenName, tokenSymbol, decimals) {
    if (VERBOSE)
        console.log(`\nDEPLOYING ${contractName} Contract`);
    const MasterTokenMockFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const masterTokenMockContract = (await MasterTokenMockFactory.deploy(vaultsRegistryAddress, tokenName, tokenSymbol, decimals));
    await masterTokenMockContract.waitForDeployment();
    await checkContract(masterTokenMockContract, contractName);
    return masterTokenMockContract;
}
exports.deployMasterTokenMock = deployMasterTokenMock;
async function deployVaultsRegistryMock() {
    const contractName = "VaultsRegistryMock";
    if (VERBOSE)
        console.log(`\nDEPLOYING ${contractName} Contract`);
    const VaultsRegistryMockFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const vaultsRegistryMockContract = await hardhat_1.upgrades.deployProxy(VaultsRegistryMockFactory);
    await vaultsRegistryMockContract.waitForDeployment();
    await checkContract(vaultsRegistryMockContract, contractName);
    return vaultsRegistryMockContract;
}
exports.deployVaultsRegistryMock = deployVaultsRegistryMock;
async function deployVaultsRegistry(feeRate, vaultImplementationAddress) {
    const contractName = "VaultsRegistry";
    if (VERBOSE)
        console.log(`\nDEPLOYING ${contractName} Contract`);
    const VaultsRegistryFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const vaultsRegistryContract = await hardhat_1.upgrades.deployProxy(VaultsRegistryFactory, [
        feeRate,
        vaultImplementationAddress,
    ]);
    await vaultsRegistryContract.waitForDeployment();
    await checkContract(vaultsRegistryContract, contractName);
    return vaultsRegistryContract;
}
exports.deployVaultsRegistry = deployVaultsRegistry;
async function deployVaultImplementation() {
    const contractName = "Vault";
    if (VERBOSE)
        console.log(`\nDEPLOYING ${contractName} Contract Implementation`);
    const VaultFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const vaultImplementation = (await VaultFactory.deploy());
    await vaultImplementation.waitForDeployment();
    await checkContract(vaultImplementation, contractName);
    return vaultImplementation;
}
exports.deployVaultImplementation = deployVaultImplementation;
async function deployVaultMock(tokenAddress, name, symbol) {
    const contractName = "VaultMock";
    if (VERBOSE)
        console.log(`\nDEPLOYING ${contractName} Contract`);
    const VaultMockFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const vaultMockContract = await hardhat_1.upgrades.deployProxy(VaultMockFactory, [
        tokenAddress,
        name,
        symbol,
    ]);
    await vaultMockContract.waitForDeployment();
    await checkContract(vaultMockContract, contractName);
    return vaultMockContract;
}
exports.deployVaultMock = deployVaultMock;
async function deployOracleMock(contractName, tokenAddress, tokenName, tokenPrice) {
    if (VERBOSE)
        console.log(`\nDEPLOYING ${contractName} Contract`);
    const OracleMockFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const oracleMockContract = (await OracleMockFactory.deploy(tokenAddress, tokenName, tokenPrice));
    await oracleMockContract.waitForDeployment();
    await checkContract(oracleMockContract, contractName);
    return oracleMockContract;
}
exports.deployOracleMock = deployOracleMock;
async function deployProtocolMock(contractName, protocolName, assetAddress, liquidAssetAddress) {
    if (VERBOSE)
        console.log(`\nDEPLOYING ${contractName} Contract: ${protocolName}`);
    const MockProtocolFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const mockProtocolContract = (await MockProtocolFactory.deploy(protocolName, assetAddress, liquidAssetAddress));
    await mockProtocolContract.waitForDeployment();
    await checkContract(mockProtocolContract, contractName);
    return mockProtocolContract;
}
exports.deployProtocolMock = deployProtocolMock;
async function deployMockAdapter(contractName, protocolAddress) {
    if (VERBOSE)
        console.log(`\nDEPLOYING ${contractName} Contract`);
    const MockAdapterFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const mockAdapterContract = await hardhat_1.upgrades.deployProxy(MockAdapterFactory, [protocolAddress]);
    await mockAdapterContract.waitForDeployment();
    await checkContract(mockAdapterContract, contractName);
    return mockAdapterContract;
}
exports.deployMockAdapter = deployMockAdapter;
async function deployVaultStrategy(contractName, vaultAddress, liquidTokenAddress, adapterDeployPath, adapterWithdrawPath, strategyName) {
    if (VERBOSE)
        console.log(`\nDEPLOYING ${contractName} Contract`);
    const VaultStrategyFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const vaultStrategyContract = await hardhat_1.upgrades.deployProxy(VaultStrategyFactory, [
        vaultAddress,
        liquidTokenAddress,
        adapterDeployPath,
        adapterWithdrawPath,
        strategyName,
    ]);
    await vaultStrategyContract.waitForDeployment();
    await checkContract(vaultStrategyContract, contractName);
    return vaultStrategyContract;
}
exports.deployVaultStrategy = deployVaultStrategy;
async function deployWithdrawStrategy(contractName, vaultAddress, liquidTokenAddress, adaptersWithdrawPath, vaultStrategyAddress, withdrawStrategyName) {
    if (VERBOSE)
        console.log(`\nDEPLOYING ${contractName} Contract`);
    const VaultWithdrawStrategyFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const vaultWithdrawStrategyContract = await hardhat_1.upgrades.deployProxy(VaultWithdrawStrategyFactory, [
        vaultAddress,
        liquidTokenAddress,
        adaptersWithdrawPath,
        vaultStrategyAddress,
        withdrawStrategyName,
    ]);
    await vaultWithdrawStrategyContract.waitForDeployment();
    await checkContract(vaultWithdrawStrategyContract, contractName);
    return vaultWithdrawStrategyContract;
}
exports.deployWithdrawStrategy = deployWithdrawStrategy;
async function deployVaultV2Implementation() {
    const contractName = "VaultV2";
    if (VERBOSE)
        console.log(`\nDEPLOYING ${contractName} Contract`);
    const VaultV2Factory = await hardhat_1.ethers.getContractFactory(contractName);
    const vaultV2Implementation = (await VaultV2Factory.deploy());
    await vaultV2Implementation.waitForDeployment();
    await checkContract(vaultV2Implementation, contractName);
    return vaultV2Implementation;
}
exports.deployVaultV2Implementation = deployVaultV2Implementation;
async function deployERC20(name, symbol, decimals) {
    const contractName = "ERC20Mock";
    if (VERBOSE)
        console.log(`\nDEPLOYING ${contractName} Contract`);
    const ERC20MockFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const erc20MockContract = (await ERC20MockFactory.deploy(name, symbol, decimals));
    await erc20MockContract.waitForDeployment();
    await checkContract(erc20MockContract, contractName);
    return erc20MockContract;
}
exports.deployERC20 = deployERC20;
async function deployUniswapAdapter(contractName, protocolAddress, quoterAddress, wethAddress) {
    if (VERBOSE)
        console.log(`\nDEPLOYING ${contractName} Contract`);
    const MockAdapterFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const mockAdapterContract = await hardhat_1.upgrades.deployProxy(MockAdapterFactory, [
        protocolAddress,
        quoterAddress,
        wethAddress,
    ]);
    await mockAdapterContract.waitForDeployment();
    await checkContract(mockAdapterContract, contractName);
    return mockAdapterContract;
}
exports.deployUniswapAdapter = deployUniswapAdapter;
async function deployRenzoAdapter(contractName, liquifierAddress, ezETHAddress, stETHAddress) {
    if (VERBOSE)
        console.log(`DEPLOYING ${contractName} Contract`);
    const RenzoAdapterFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const renzoAdapterContract = await hardhat_1.upgrades.deployProxy(RenzoAdapterFactory, [
        liquifierAddress,
        ezETHAddress,
        stETHAddress,
    ]);
    await renzoAdapterContract.waitForDeployment();
    await checkContract(renzoAdapterContract, contractName);
    return renzoAdapterContract;
}
exports.deployRenzoAdapter = deployRenzoAdapter;
async function deployEtherFiAdapter(contractName, liquifierAddress, eETHAddress, weETHAddress) {
    if (VERBOSE)
        console.log(`DEPLOYING ${contractName} Contract`);
    const EtherFiAdapterFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const etherFiAdapterContract = await hardhat_1.upgrades.deployProxy(EtherFiAdapterFactory, [
        liquifierAddress,
        eETHAddress,
        weETHAddress,
    ]);
    await etherFiAdapterContract.waitForDeployment();
    await checkContract(etherFiAdapterContract, contractName);
    return etherFiAdapterContract;
}
exports.deployEtherFiAdapter = deployEtherFiAdapter;
async function deployStaderAdapter(contractName, protocolAddress, wETHAddress, ethXAdress) {
    if (VERBOSE)
        console.log(`DEPLOYING ${contractName} Contract`);
    const StderAdapterFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const staderAdapterContract = await hardhat_1.upgrades.deployProxy(StderAdapterFactory, [
        protocolAddress,
        wETHAddress,
        ethXAdress,
    ]);
    await staderAdapterContract.waitForDeployment();
    await checkContract(staderAdapterContract, contractName);
    return staderAdapterContract;
}
exports.deployStaderAdapter = deployStaderAdapter;
async function deployRocketAdapter(contractName, depositPoolAddress, rocketSettingsAddress, wETHAddress, rETHAddress) {
    if (VERBOSE)
        console.log(`DEPLOYING ${contractName} Contract`);
    const RocketAdapterFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const rocketAdapterContract = await hardhat_1.upgrades.deployProxy(RocketAdapterFactory, [
        depositPoolAddress,
        rocketSettingsAddress,
        wETHAddress,
        rETHAddress,
    ]);
    await rocketAdapterContract.waitForDeployment();
    await checkContract(rocketAdapterContract, contractName);
    return rocketAdapterContract;
}
exports.deployRocketAdapter = deployRocketAdapter;
async function deployKelpAdapter(contractName, kelpProtocolAddress, rsETHAddress) {
    if (VERBOSE)
        console.log(`DEPLOYING ${contractName} Contract`);
    const KelpAdapterFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const kelpAdapterContract = await hardhat_1.upgrades.deployProxy(KelpAdapterFactory, [
        kelpProtocolAddress,
        rsETHAddress,
    ]);
    await kelpAdapterContract.waitForDeployment();
    await checkContract(kelpAdapterContract, contractName);
    return kelpAdapterContract;
}
exports.deployKelpAdapter = deployKelpAdapter;
async function deploySwapper(contractName, defaultSlippage, adminAddress) {
    if (VERBOSE)
        console.log(`\nDEPLOYING ${contractName} Contract`);
    const SwapperFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const swapperContract = await hardhat_1.upgrades.deployProxy(SwapperFactory, [
        defaultSlippage,
        adminAddress,
    ]);
    await swapperContract.waitForDeployment();
    await checkContract(swapperContract, contractName);
    return swapperContract;
}
exports.deploySwapper = deploySwapper;
async function deployLidoAdapter(contractName, protocolAddress, wethAddress, wrapppedTokenAddress) {
    if (VERBOSE)
        console.log(`\nDEPLOYING ${contractName} Contract`);
    const LidoAdapterFactory = await hardhat_1.ethers.getContractFactory(contractName);
    const lidoAdapterContract = await hardhat_1.upgrades.deployProxy(LidoAdapterFactory, [
        protocolAddress,
        wethAddress,
        wrapppedTokenAddress,
    ]);
    await lidoAdapterContract.waitForDeployment();
    await checkContract(lidoAdapterContract, contractName);
    return lidoAdapterContract;
}
exports.deployLidoAdapter = deployLidoAdapter;
//# sourceMappingURL=_deployContracts.js.map