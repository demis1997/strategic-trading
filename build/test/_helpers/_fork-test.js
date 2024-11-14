"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const constants_1 = require("./constants");
const UNISWAP = true;
const LIDO = true;
async function main() {
    const [owner] = await hardhat_1.ethers.getSigners();
    if (UNISWAP) {
        const uniswapGenericAbi = ["function WETH9() external view returns (address)"];
        const Router = new hardhat_1.ethers.Contract(constants_1.UNISWAP_ROUTER_ADDRESS, uniswapGenericAbi, owner);
        const Quoter = new hardhat_1.ethers.Contract(constants_1.UNISWAP_QUOTER_ADDRESS, uniswapGenericAbi, owner);
        try {
            const wethAddressRouter = await Router.WETH9();
            console.log("Router WETH Address:", wethAddressRouter);
        }
        catch (error) {
            console.error("Failed to call WETH9() on Router", error);
        }
        try {
            const wethAddressQuoter = await Quoter.WETH9();
            console.log("Quoter WETH Address:", wethAddressQuoter);
        }
        catch (error) {
            console.error("Failed to call WETH9() Quoter", error);
        }
    }
    if (LIDO) {
        const lidoAbi = [
            "function getFeeDistribution() external view returns (uint16, uint16, uint16)",
        ];
        const lidoWstETHAbi = ["function stEthPerToken() external view returns (uint256)"];
        const Lido = new hardhat_1.ethers.Contract(constants_1.LIDO_stETH_ADDRESS, lidoAbi, owner);
        const WstETH = new hardhat_1.ethers.Contract(constants_1.LIDO_WstETH_ADDRESS, lidoWstETHAbi, owner);
        try {
            const variable = await Lido.getFeeDistribution();
            console.log("Lido FeeDistribution:", variable);
        }
        catch (error) {
            console.error("Failed to call getFeeDistribution() on Lido", error);
        }
        try {
            const variable = await WstETH.stEthPerToken();
            console.log("Lido stEthPerToken:", variable);
        }
        catch (error) {
            console.error("Failed to call stEthPerToken() on Lido", error);
        }
    }
}
main().catch(error => {
    console.error("Error in main execution:", error);
    process.exitCode = 1;
});
//# sourceMappingURL=_fork-test.js.map