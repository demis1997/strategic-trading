import { ethers } from "hardhat";
import { constants } from "../../scripts/_helpers/_deployAddresses";

export const ZERO_AMOUNT = BigInt("0");
export const ZERO_ADDRESS = ethers.ZeroAddress;
export const TEST_TIMEOUT = 1000000;
export const AMOUNT_1E18 = ethers.parseEther("1");

// Weth
export const WETH_ADDRESS = constants.MAINNET.weth; // 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

// Uniswap
// This is swap router v2
export const UNISWAP_ROUTER_ADDRESS = constants.MAINNET.uniswapRouter; // 0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45
export const UNISWAP_QUOTER_ADDRESS = constants.MAINNET.uniswapQuoterV2; // 0x61fFE014bA17989E743c5F6cB21bF9697530B21e;
// export const UNISWAP_FACTORY_ADDRESS = 0x1F98431c8aD98523631AE4a59f267346ea31F984;

// Lido
export const LIDO_IMPL = constants.MAINNET.lidoImplementation; // 0x17144556fd3424EDC8Fc8A4C940B2D04936d17eb;
export const LIDO_stETH_ADDRESS = constants.MAINNET.lidoStEth; // 0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84;
export const LIDO_WstETH_ADDRESS = constants.MAINNET.lidoWstEth; // 0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0;
// Renzo Protocol
export const RENZO_LIQUIFIER_ADDRESS = constants.MAINNET.renzo_liquifier;
export const RENZO_ezETH_ADDRESS = constants.MAINNET.renzo_ezEth;
// EtherFi
export const ETHERFI_LIQUIFIER_ADDRESS = constants.MAINNET.etherfi_liquifier; // 0x9ffdf407cde9a93c47611799da23924af3ef764f
export const ETHERFI_eETH_ADDRESS = constants.MAINNET.etherfi_eEth; // 0x35fA164735182de50811E8e2E824cFb9B6118ac2
export const ETHERFI_weETH_ADDRESS = constants.MAINNET.etherfi_weEth; // 0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee

// Kelp
export const KELP_DEPOSIT_POOL_ADDRESS = constants.MAINNET.kelp_deposit; //0x036676389e48133B63a802f8635AD39E752D375D;
export const KELP_rsETH_ADDRESS = constants.MAINNET.kelp_rsEth; //0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7;

// Rocket
export const ROCKET_RETH = constants.MAINNET.rocket_rETH;
export const ROCKET_DEPOSIT_POOL = constants.MAINNET.rocket_deposit;
export const ROCKET_DEPOSIT_SETTINGS = constants.MAINNET.rocket_deposit_settings;

// Stader
export const STADER_STAKE_MANAGER_ADDRESS = constants.MAINNET.stader_stake_manager;
export const STADER_ETHx_ADDRESS = constants.MAINNET.stader_ETHx;

// Uniswap pool wstETH - WETH
export const WstETH_WETH_POOL = constants.MAINNET.wsEth_weth_uni_pool; // 0x109830a1aaad605bbf02a9dfa7b0b92ec2fb7daa;
// Uniswap pool weETH - WETH ==> token pairs are bacwards use oracle instead
export const WeETH_WETH_POOL = constants.MAINNET.weEth_weth_uni_pool; // 0x7A415B19932c0105c82FDB6b720bb01B0CC2CAe3
// Uniswap pool rsETH - WETH
export const rsETH_WETH_POOL = constants.MAINNET.rsEth_weth_uni_pool; //0x059615EBf32C946aaab3D44491f78e4F8e97e1D3;
// Uniswap pool rsETH - WETH
export const ETHx_WETH_POOL = constants.MAINNET.ETHx_weth_uni_pool;

// chainklink price feed on mainnet
export const STETH_ETH_feed = constants.MAINNET.stEth_eth_feed; // 0x86392dC19c0b719886221c78AB11eb8Cf5c52812;
export const WeETH_ETH_feed = constants.MAINNET.weEth_eth_feed; // 0x5c9C449BbC9a6075A2c061dF312a35fd1E05fF22;
