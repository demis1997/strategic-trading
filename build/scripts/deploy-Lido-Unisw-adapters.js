"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const _deployContracts_1 = require("./_deployContracts");
const _deployAddresses_1 = require("./_helpers/_deployAddresses");
const DEPLOY_ORACLE_MOCK = true;
const DEPLOY_PROTOCOL_MOCK = false;
const DEPLOY_LIDO = false;
const DEPLOY_UNISWAP = false;
const CONFIG = false;
const NETWORK = "SEPOLIA";
const WETH = _deployAddresses_1.constants[NETWORK].weth;
const LIDO_stETH_ADDRESS = _deployAddresses_1.constants[NETWORK].lidoStEth;
const LIDO_WstETH_ADDRESS = _deployAddresses_1.constants[NETWORK].lidoWstEth;
const STETH_PRICE_IN_ETH = BigInt(_deployAddresses_1.constants[NETWORK].price_stEth_in_eth);
const UNISWAP_ROUTER_ADDRESS = _deployAddresses_1.constants[NETWORK].uniswapRouter;
const UNISWAP_QUOTER_ADDRESS = _deployAddresses_1.constants[NETWORK].uniswapQuoterV2;
let PROTOCOL_MOCK = _deployAddresses_1.deployedContracts[NETWORK].protocolMock;
let ORACLE_MOCK = _deployAddresses_1.deployedContracts[NETWORK].oracleMock;
let LIDO_ADAPTER = _deployAddresses_1.deployedContracts[NETWORK].lidoAdapter;
let UNISWAP_ADAPTER = _deployAddresses_1.deployedContracts[NETWORK].uniswapAdapter;
async function main() {
    console.clear();
    const [deployer] = await hardhat_1.ethers.getSigners();
    console.log("\n");
    console.log("Network:", hardhat_1.network.name);
    console.log("deployerAddress :>> ", deployer.address);
    console.log("\n");
    console.log("\nDEPLOYING....");
    console.log("==================================================================");
    let protocol01MockContract;
    if (DEPLOY_PROTOCOL_MOCK) {
        protocol01MockContract = (await (0, _deployContracts_1.deployProtocolMock)("Protocol01Mock", "Staking Protocol", WETH, LIDO_WstETH_ADDRESS));
        PROTOCOL_MOCK = await protocol01MockContract.getAddress();
    }
    else {
        protocol01MockContract = await hardhat_1.ethers.getContractAt("Protocol01Mock", PROTOCOL_MOCK);
    }
    let oracleMockContract;
    if (DEPLOY_ORACLE_MOCK) {
        oracleMockContract = (await (0, _deployContracts_1.deployOracleMock)("OracleMock", LIDO_stETH_ADDRESS, "steth", STETH_PRICE_IN_ETH));
        ORACLE_MOCK = await oracleMockContract.getAddress();
    }
    else {
        oracleMockContract = await hardhat_1.ethers.getContractAt("OracleMock", ORACLE_MOCK);
    }
    let lidoAdapterContract;
    if (DEPLOY_LIDO) {
        lidoAdapterContract = (await (0, _deployContracts_1.deployLidoAdapter)("LidoAdapter", LIDO_stETH_ADDRESS, WETH, LIDO_WstETH_ADDRESS));
        LIDO_ADAPTER = await lidoAdapterContract.getAddress();
    }
    else {
        lidoAdapterContract = await hardhat_1.ethers.getContractAt("LidoAdapter", LIDO_ADAPTER);
    }
    let uniswapAdapterContract;
    if (DEPLOY_UNISWAP) {
        uniswapAdapterContract = (await (0, _deployContracts_1.deployUniswapAdapter)("UniswapV3Adapter", NETWORK == "SEPOLIA" ? PROTOCOL_MOCK : UNISWAP_ROUTER_ADDRESS, UNISWAP_QUOTER_ADDRESS, WETH));
        UNISWAP_ADAPTER = await uniswapAdapterContract.getAddress();
        await uniswapAdapterContract.setPoolPerTokenForPrice(_deployAddresses_1.constants[NETWORK].etherfi_weEth, _deployAddresses_1.constants[NETWORK].weEth_weth_uni_pool);
        await uniswapAdapterContract.setPoolPerTokenForPrice(LIDO_WstETH_ADDRESS, _deployAddresses_1.constants[NETWORK].wsEth_weth_uni_pool);
    }
    else {
        uniswapAdapterContract = await hardhat_1.ethers.getContractAt("UniswapV3Adapter", UNISWAP_ADAPTER);
    }
    if (CONFIG) {
        const roleToAssign = await protocol01MockContract.DEFAULT_ADMIN_ROLE();
        await protocol01MockContract.grantRole(roleToAssign, LIDO_ADAPTER);
        await protocol01MockContract.grantRole(roleToAssign, UNISWAP_ADAPTER);
        await uniswapAdapterContract.setUniswapRouterAddress(NETWORK == "SEPOLIA" ? PROTOCOL_MOCK : UNISWAP_ROUTER_ADDRESS);
    }
    console.log("==================================================================");
}
main()
    .then(() => console.log("\nFinished..."))
    .catch((error) => {
    console.error(error);
    throw new Error();
});
//# sourceMappingURL=deploy-Lido-Unisw-adapters.js.map