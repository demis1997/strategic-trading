/* eslint-disable @typescript-eslint/require-await */
import { ethers, upgrades } from "hardhat";
import { Contract } from "ethers";

const VERBOSE = true;
// const VERBOSE = false;

async function checkContract(contract: Contract, name: string): Promise<void> {
    if (contract === undefined) throw new Error(`${name} NOT deployed.`);
    else if (VERBOSE) {
        const contractAddress = await contract.getAddress();
        console.log(`${name} contract deployed at: ${contractAddress}`);
    }
}

export async function deployAggregatorToken(
    contractName: string,
    underlyingAsset: string,
    vaultsRegistry: string,
    ownerAddress: string,
    name: string,
    symbol: string,
): Promise<Contract> {
    if (VERBOSE) console.log(`\nDEPLOYING ${contractName} Contract`);

    const AggregatorTokenFactory = await ethers.getContractFactory(contractName);
    const aggregatorTokenContract = await upgrades.deployProxy(AggregatorTokenFactory, [
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

export async function deployUniformTransferStrategy(
    aggregatorToken: string,
    ownerAddress: string,
): Promise<Contract> {
    const contractName = "UniformTransferStrategy";
    if (VERBOSE) console.log(`\nDEPLOYING ${contractName} Contract`);

    const UniformTransferStrategyFactory = await ethers.getContractFactory(contractName);
    const uniformTransferStrategyContract = await upgrades.deployProxy(
        UniformTransferStrategyFactory,
        [aggregatorToken, ownerAddress],
    );
    await uniformTransferStrategyContract.waitForDeployment();

    await checkContract(uniformTransferStrategyContract, contractName);

    return uniformTransferStrategyContract;
}

// MasterTokenMock
export async function deployGenericWrapperMock(
    contractName: string,
    liquidTokenAddress: string,
    tokenName: string,
    tokenSymbol: string,
    decimals: bigint,
): Promise<Contract> {
    if (VERBOSE) console.log(`\nDEPLOYING ${contractName} Contract`);

    const GenericWrapperMockFactory = await ethers.getContractFactory(contractName);
    const genericWrapperMockContract = (await GenericWrapperMockFactory.deploy(
        liquidTokenAddress,
        tokenName,
        tokenSymbol,
        decimals,
    )) as Contract;
    await genericWrapperMockContract.waitForDeployment();

    await checkContract(genericWrapperMockContract, contractName);

    return genericWrapperMockContract;
}

// MasterTokenMock
export async function deployMasterTokenMock(
    contractName: string,
    vaultsRegistryAddress: string,
    tokenName: string,
    tokenSymbol: string,
    decimals: bigint,
): Promise<Contract> {
    if (VERBOSE) console.log(`\nDEPLOYING ${contractName} Contract`);

    const MasterTokenMockFactory = await ethers.getContractFactory(contractName);
    const masterTokenMockContract = (await MasterTokenMockFactory.deploy(
        vaultsRegistryAddress,
        tokenName,
        tokenSymbol,
        decimals,
    )) as Contract;
    await masterTokenMockContract.waitForDeployment();

    await checkContract(masterTokenMockContract, contractName);

    return masterTokenMockContract;
}

export async function deployVaultsRegistryMock(): Promise<Contract> {
    const contractName = "VaultsRegistryMock";
    if (VERBOSE) console.log(`\nDEPLOYING ${contractName} Contract`);

    const VaultsRegistryMockFactory = await ethers.getContractFactory(contractName);
    const vaultsRegistryMockContract = await upgrades.deployProxy(VaultsRegistryMockFactory);
    await vaultsRegistryMockContract.waitForDeployment();

    await checkContract(vaultsRegistryMockContract, contractName);

    return vaultsRegistryMockContract;
}

export async function deployVaultsRegistry(
    feeRate: bigint,
    vaultImplementationAddress: string,
): Promise<Contract> {
    const contractName = "VaultsRegistry";
    if (VERBOSE) console.log(`\nDEPLOYING ${contractName} Contract`);

    const VaultsRegistryFactory = await ethers.getContractFactory(contractName);
    const vaultsRegistryContract = await upgrades.deployProxy(VaultsRegistryFactory, [
        feeRate,
        vaultImplementationAddress,
    ]);
    await vaultsRegistryContract.waitForDeployment();

    await checkContract(vaultsRegistryContract, contractName);

    return vaultsRegistryContract;
    //
}

export async function deployVaultImplementation(): Promise<Contract> {
    const contractName = "Vault";
    if (VERBOSE) console.log(`\nDEPLOYING ${contractName} Contract Implementation`);

    const VaultFactory = await ethers.getContractFactory(contractName);
    const vaultImplementation = (await VaultFactory.deploy()) as unknown as Contract;
    await vaultImplementation.waitForDeployment();

    await checkContract(vaultImplementation, contractName);

    return vaultImplementation;
}

// Vault Mock
export async function deployVaultMock(
    tokenAddress: string,
    name: string,
    symbol: string,
): Promise<Contract> {
    const contractName = "VaultMock";
    if (VERBOSE) console.log(`\nDEPLOYING ${contractName} Contract`);

    const VaultMockFactory = await ethers.getContractFactory(contractName);

    const vaultMockContract = await upgrades.deployProxy(VaultMockFactory, [
        tokenAddress,
        name,
        symbol,
    ]);
    await vaultMockContract.waitForDeployment();

    await checkContract(vaultMockContract, contractName);

    return vaultMockContract;
}

// Oracle Mock
export async function deployOracleMock(
    contractName: string,
    oracleTokens: string,
    tokenAddress: string,
    tokenName: string,
    tokenPrice: bigint,
): Promise<Contract> {
    if (VERBOSE) console.log(`\nDEPLOYING ${contractName} Contract`);

    const OracleMockFactory = await ethers.getContractFactory(contractName);
    const oracleMockContract = (await OracleMockFactory.deploy(
        oracleTokens,
        tokenAddress,
        tokenName,
        tokenPrice,
    )) as Contract;
    await oracleMockContract.waitForDeployment();

    await checkContract(oracleMockContract, contractName);

    return oracleMockContract;
}

// ProtocolMock
export async function deployProtocolMock(
    contractName: string,
    protocolName: string,
    assetAddress: string,
    liquidAssetAddress: string,
): Promise<Contract> {
    if (VERBOSE) console.log(`\nDEPLOYING ${contractName} Contract: ${protocolName}`);

    const MockProtocolFactory = await ethers.getContractFactory(contractName);

    const mockProtocolContract = (await MockProtocolFactory.deploy(
        protocolName,
        assetAddress,
        liquidAssetAddress,
    )) as Contract;
    await mockProtocolContract.waitForDeployment();

    await checkContract(mockProtocolContract, contractName);

    return mockProtocolContract;
}

export async function deployMockAdapter(
    contractName: string,
    protocolAddress: string,
): Promise<Contract> {
    if (VERBOSE) console.log(`\nDEPLOYING ${contractName} Contract`);

    const MockAdapterFactory = await ethers.getContractFactory(contractName);
    const mockAdapterContract = await upgrades.deployProxy(MockAdapterFactory, [protocolAddress]);

    await mockAdapterContract.waitForDeployment();

    await checkContract(mockAdapterContract, contractName);

    return mockAdapterContract;
}

export async function deployVaultStrategy(
    contractName: string,
    vaultAddress: string,
    liquidTokenAddress: string,
    adapterDeployPath: string[],
    adapterWithdrawPath: string[],
    strategyName: string,
): Promise<Contract> {
    if (VERBOSE) console.log(`\nDEPLOYING ${contractName} Contract`);

    const VaultStrategyFactory = await ethers.getContractFactory(contractName);
    const vaultStrategyContract = await upgrades.deployProxy(VaultStrategyFactory, [
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

export async function deployWithdrawStrategy(
    contractName: string,
    vaultAddress: string,
    liquidTokenAddress: string,
    adaptersWithdrawPath: string[],
    vaultStrategyAddress: string,
    withdrawStrategyName: string,
): Promise<Contract> {
    if (VERBOSE) console.log(`\nDEPLOYING ${contractName} Contract`);

    const VaultWithdrawStrategyFactory = await ethers.getContractFactory(contractName);
    const vaultWithdrawStrategyContract = await upgrades.deployProxy(VaultWithdrawStrategyFactory, [
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

export async function deployVaultV2Implementation(): Promise<Contract> {
    const contractName = "VaultV2";
    if (VERBOSE) console.log(`\nDEPLOYING ${contractName} Contract`);

    const VaultV2Factory = await ethers.getContractFactory(contractName);
    const vaultV2Implementation = (await VaultV2Factory.deploy()) as unknown as Contract;
    await vaultV2Implementation.waitForDeployment();

    await checkContract(vaultV2Implementation, contractName);

    return vaultV2Implementation;
}

export async function deployERC20(
    name: string,
    symbol: string,
    decimals: number,
): Promise<Contract> {
    const contractName = "ERC20Mock";
    if (VERBOSE) console.log(`\nDEPLOYING ${contractName} Contract`);

    const ERC20MockFactory = await ethers.getContractFactory(contractName);
    const erc20MockContract = (await ERC20MockFactory.deploy(
        name,
        symbol,
        decimals,
    )) as unknown as Contract;
    await erc20MockContract.waitForDeployment();

    await checkContract(erc20MockContract, contractName);

    return erc20MockContract;
}

export async function deployUniswapAdapter(
    contractName: string,
    protocolAddress: string,
    quoterAddress: string,
    wethAddress: string,
): Promise<Contract> {
    if (VERBOSE) console.log(`\nDEPLOYING ${contractName} Contract`);

    const MockAdapterFactory = await ethers.getContractFactory(contractName);
    const mockAdapterContract = await upgrades.deployProxy(MockAdapterFactory, [
        protocolAddress,
        quoterAddress,
        wethAddress,
    ]);

    await mockAdapterContract.waitForDeployment();

    await checkContract(mockAdapterContract, contractName);

    return mockAdapterContract;
}
export async function deployRenzoAdapter(
    contractName: string,
    liquifierAddress: string,
    ezETHAddress: string,
    stETHAddress: string,
): Promise<Contract> {
    if (VERBOSE) console.log(`DEPLOYING ${contractName} Contract`);

    const RenzoAdapterFactory = await ethers.getContractFactory(contractName);
    const renzoAdapterContract = await upgrades.deployProxy(RenzoAdapterFactory, [
        liquifierAddress,
        ezETHAddress,
        stETHAddress,
    ]);

    await renzoAdapterContract.waitForDeployment();

    await checkContract(renzoAdapterContract, contractName);

    return renzoAdapterContract;
}
export async function deployEtherFiAdapter(
    contractName: string,
    liquifierAddress: string,
    eETHAddress: string,
    weETHAddress: string,
): Promise<Contract> {
    if (VERBOSE) console.log(`DEPLOYING ${contractName} Contract`);

    const EtherFiAdapterFactory = await ethers.getContractFactory(contractName);
    const etherFiAdapterContract = await upgrades.deployProxy(EtherFiAdapterFactory, [
        liquifierAddress,
        eETHAddress,
        weETHAddress,
    ]);

    await etherFiAdapterContract.waitForDeployment();

    await checkContract(etherFiAdapterContract, contractName);

    return etherFiAdapterContract;
}

export async function deployStaderAdapter(
    contractName: string,
    protocolAddress: string,
    wETHAddress: string,
    ethXAdress: string,
): Promise<Contract> {
    if (VERBOSE) console.log(`DEPLOYING ${contractName} Contract`);

    const StderAdapterFactory = await ethers.getContractFactory(contractName);
    const staderAdapterContract = await upgrades.deployProxy(StderAdapterFactory, [
        protocolAddress,
        wETHAddress,
        ethXAdress,
    ]);

    await staderAdapterContract.waitForDeployment();

    await checkContract(staderAdapterContract, contractName);

    return staderAdapterContract;
}

export async function deployRocketAdapter(
    contractName: string,
    depositPoolAddress: string,
    rocketSettingsAddress: string,
    wETHAddress: string,
    rETHAddress: string,
): Promise<Contract> {
    if (VERBOSE) console.log(`DEPLOYING ${contractName} Contract`);

    const RocketAdapterFactory = await ethers.getContractFactory(contractName);
    const rocketAdapterContract = await upgrades.deployProxy(RocketAdapterFactory, [
        depositPoolAddress,
        rocketSettingsAddress,
        wETHAddress,
        rETHAddress,
    ]);

    await rocketAdapterContract.waitForDeployment();

    await checkContract(rocketAdapterContract, contractName);

    return rocketAdapterContract;
}

export async function deployKelpAdapter(
    contractName: string,
    kelpProtocolAddress: string,
    rsETHAddress: string,
): Promise<Contract> {
    if (VERBOSE) console.log(`DEPLOYING ${contractName} Contract`);

    const KelpAdapterFactory = await ethers.getContractFactory(contractName);
    const kelpAdapterContract = await upgrades.deployProxy(KelpAdapterFactory, [
        kelpProtocolAddress,
        rsETHAddress,
    ]);

    await kelpAdapterContract.waitForDeployment();

    await checkContract(kelpAdapterContract, contractName);

    return kelpAdapterContract;
}

export async function deployLidoAdapter(
    contractName: string,
    protocolAddress: string,
    wethAddress: string,
    wrapppedTokenAddress: string,
): Promise<Contract> {
    if (VERBOSE) console.log(`\nDEPLOYING ${contractName} Contract`);

    const LidoAdapterFactory = await ethers.getContractFactory(contractName);
    const lidoAdapterContract = await upgrades.deployProxy(LidoAdapterFactory, [
        protocolAddress,
        wethAddress,
        wrapppedTokenAddress,
    ]);

    await lidoAdapterContract.waitForDeployment();

    await checkContract(lidoAdapterContract, contractName);

    return lidoAdapterContract;
}
