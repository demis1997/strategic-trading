import "@nomicfoundation/hardhat-toolbox";
import "@primitivefi/hardhat-dodoc";
import "@typechain/hardhat";
import "hardhat-contract-sizer";
import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-ethers";
import { HardhatUserConfig } from "hardhat/config";
export declare const VERBOSE: boolean;
export declare const GAS_MODE: boolean;
export declare const chainIds: {
    sepolia: number;
    arbitrum: number;
    "arbitrum-goerli": number;
    avalanche: number;
    "avalanche-fuji": number;
    bsc: number;
    goerli: number;
    hardhat: number;
    mainnet: number;
    optimism: number;
    "optimism-goerli": number;
    "polygon-mainnet": number;
    "polygon-mumbai": number;
};
export declare enum UrlType {
    ADDRESS = "address",
    TX = "tx"
}
export declare function explorerUrl(chainId: number | undefined, type: UrlType, param: string): string;
declare const config: HardhatUserConfig;
export default config;
//# sourceMappingURL=hardhat.config.d.ts.map