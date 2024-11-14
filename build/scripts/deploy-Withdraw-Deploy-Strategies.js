"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const _deployContracts_1 = require("./_deployContracts");
const _configContracts_1 = require("./_configContracts");
const _deployAddresses_1 = require("./_helpers/_deployAddresses");
const constants_1 = require("test/_helpers/constants");
const DEPLOY_STD_STRATEGY = true;
const DEPLOY_WTD_STRATEGY = true;
const CONFIG_DEPLOY_STRATEGY_AS_WITHDRAW = true;
const NETWORK = "SEPOLIA";
const CONTRACT_NAME = "StrSimpleStaking";
const UNI_PATH_FEE = BigInt(100);
const WETH = _deployAddresses_1.constants[NETWORK].weth;
const LIDO_stETH = _deployAddresses_1.constants[NETWORK].lidoStEth;
const LIDO_WstETH = _deployAddresses_1.constants[NETWORK].lidoWstEth;
const REAL_PRICE_FEED = _deployAddresses_1.constants[NETWORK].price_stEth_in_eth;
const VAULT = _deployAddresses_1.deployedContracts[NETWORK].vaultSimpleStaking;
const LIDO = _deployAddresses_1.deployedContracts[NETWORK].lidoAdapter;
const UNISWAP = _deployAddresses_1.deployedContracts[NETWORK].uniswapAdapter;
const ORACLE_MOCK = _deployAddresses_1.deployedContracts[NETWORK].oracleMock;
let VAULT_STRATEGY = "0xb804b49468De9C2B0E5A7f89b0726a7F7DA1bA42";
let WITHDRAW_STRATEGY = "0xFa1EDF1A0cEB62Db77c13da2DA99f17a81760D22";
async function main() {
    let roleToAssign;
    console.clear();
    const [deployer] = await hardhat_1.ethers.getSigners();
    console.log("\n");
    console.log("Network:", hardhat_1.network.name);
    console.log("deployerAddress :>> ", deployer.address);
    console.log("\n");
    console.log("\nDEPLOYING....");
    console.log("==================================================================");
    let strategyContract;
    if (DEPLOY_STD_STRATEGY) {
        strategyContract = (await (0, _deployContracts_1.deployVaultStrategy)(CONTRACT_NAME, VAULT, LIDO_stETH, [LIDO], [UNISWAP], "Simple Staking Strategy"));
        VAULT_STRATEGY = await strategyContract.getAddress();
        await strategyContract.setPriceFeedPerToken(LIDO_stETH, NETWORK == "SEPOLIA" ? ORACLE_MOCK : REAL_PRICE_FEED);
        await (0, _configContracts_1.configSwapPath)(CONTRACT_NAME, VAULT_STRATEGY, [WETH, LIDO_WstETH], [UNI_PATH_FEE]);
    }
    else {
        strategyContract = await hardhat_1.ethers.getContractAt("StrSimpleStaking", VAULT_STRATEGY);
    }
    let wStrategyContract;
    if (DEPLOY_WTD_STRATEGY) {
        wStrategyContract = (await (0, _deployContracts_1.deployWithdrawStrategy)("StrWithdrawStandard", VAULT, LIDO_stETH, [], VAULT_STRATEGY, "Standard Withdraw Strategy"));
        WITHDRAW_STRATEGY = await wStrategyContract.getAddress();
    }
    else {
        wStrategyContract = await hardhat_1.ethers.getContractAt("StrWithdrawStandard", WITHDRAW_STRATEGY);
    }
    if (DEPLOY_STD_STRATEGY) {
        await (0, _configContracts_1.configDepositStrategy)("StrSimpleStaking", VAULT_STRATEGY, DEPLOY_WTD_STRATEGY ? WITHDRAW_STRATEGY : constants_1.ZERO_ADDRESS, LIDO_WstETH);
    }
    if (CONFIG_DEPLOY_STRATEGY_AS_WITHDRAW)
        await (0, _configContracts_1.configVault)(VAULT, VAULT_STRATEGY, VAULT_STRATEGY);
    else
        await (0, _configContracts_1.configVault)(VAULT, VAULT_STRATEGY, WITHDRAW_STRATEGY);
    roleToAssign = await strategyContract.VAULT_MANAGER_ROLE();
    await strategyContract.grantRole(roleToAssign, VAULT);
    await strategyContract.grantRole(roleToAssign, WITHDRAW_STRATEGY);
    roleToAssign = await wStrategyContract.VAULT_MANAGER_ROLE();
    await wStrategyContract.grantRole(roleToAssign, VAULT);
    const lidoAdapter = await hardhat_1.ethers.getContractAt("LidoAdapter", LIDO);
    roleToAssign = await lidoAdapter.VAULT_STRATEGY_ROLE();
    await lidoAdapter.grantRole(roleToAssign, VAULT_STRATEGY);
    const uniswapAdapter = await hardhat_1.ethers.getContractAt("UniswapV3Adapter", UNISWAP);
    roleToAssign = await uniswapAdapter.VAULT_STRATEGY_ROLE();
    await uniswapAdapter.grantRole(roleToAssign, VAULT_STRATEGY);
    console.log("==================================================================");
}
main()
    .then(() => console.log("\nFinished..."))
    .catch((error) => {
    console.error(error);
    throw new Error();
});
//# sourceMappingURL=deploy-Withdraw-Deploy-Strategies.js.map