import { ethers } from "hardhat";
import {
    UNISWAP_ROUTER_ADDRESS,
    UNISWAP_QUOTER_ADDRESS,
    LIDO_stETH_ADDRESS,
    LIDO_WstETH_ADDRESS,
} from "./constants";

const UNISWAP = true;
const LIDO = true;

async function main(): Promise<void> {
    const [owner] = await ethers.getSigners();

    if (UNISWAP) {
        /// UNISWAP
        // Interface snippets for the Uniswap Router and Quoter contracts
        const uniswapGenericAbi = ["function WETH9() external view returns (address)"];

        // Connect to the Uniswap Router contract
        const Router = new ethers.Contract(UNISWAP_ROUTER_ADDRESS, uniswapGenericAbi, owner);

        // Connect to the Uniswap Quoter contract
        const Quoter = new ethers.Contract(UNISWAP_QUOTER_ADDRESS, uniswapGenericAbi, owner);

        try {
            const wethAddressRouter = await Router.WETH9();
            console.log("Router WETH Address:", wethAddressRouter);
        } catch (error) {
            console.error("Failed to call WETH9() on Router", error);
        }
        try {
            const wethAddressQuoter = await Quoter.WETH9();
            console.log("Quoter WETH Address:", wethAddressQuoter);
        } catch (error) {
            console.error("Failed to call WETH9() Quoter", error);
        }
    }

    if (LIDO) {
        /// LIDO
        // Interface for Lido stETH
        const lidoAbi = [
            "function getFeeDistribution() external view returns (uint16, uint16, uint16)",
        ];

        // Interface for Lido WstETH
        const lidoWstETHAbi = ["function stEthPerToken() external view returns (uint256)"];

        // Connect to LIDO stETH contract
        const Lido = new ethers.Contract(LIDO_stETH_ADDRESS, lidoAbi, owner);

        // Connect to LIDO WstETH contract
        const WstETH = new ethers.Contract(LIDO_WstETH_ADDRESS, lidoWstETHAbi, owner);

        try {
            const variable = await Lido.getFeeDistribution();
            console.log("Lido FeeDistribution:", variable);
        } catch (error) {
            console.error("Failed to call getFeeDistribution() on Lido", error);
        }

        try {
            const variable = await WstETH.stEthPerToken();
            console.log("Lido stEthPerToken:", variable);
        } catch (error) {
            console.error("Failed to call stEthPerToken() on Lido", error);
        }
    }
}

main().catch(error => {
    console.error("Error in main execution:", error);
    process.exitCode = 1;
});

// npx hardhat run test/_helpers/_fork-test.ts --network anvil
// npx hardhat run test/_helpers/_fork-test.ts --network hardhat
