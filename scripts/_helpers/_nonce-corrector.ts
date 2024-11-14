/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers, network } from "hardhat";
import axios from "axios";

/// ==========================================================================================
/// ACTIONS ==================================================================================
/// ==========================================================================================

const CHECK = true;
// const CHECK = false;

// const CORRECT = true;
const CORRECT = false;

/// ==========================================================================================
/// ADDRESSES ==================================================================================
/// ==========================================================================================

async function main(): Promise<void> {
    const [deployer] = await ethers.getSigners();

    console.clear();

    if (CHECK) {
        const provider = new ethers.JsonRpcProvider(
            `https://sepolia.infura.io/v3/${process.env.INFURA_ETH_API_KEY}`,
        );
        const wallet = new ethers.Wallet(String(process.env.MY_DEPLOYER_PK), provider);
        const walletAddress = wallet.address;

        const etherscanApiKey = String(process.env.ETHERSCAN_API_KEY);
        const etherscanApiUrl = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${etherscanApiKey}`;

        const network = await provider.getNetwork();
        const chainId = network.chainId;

        console.log("\nNetwork:", network.name);
        console.log("ChainId:", chainId);
        console.log("Deployer Address:", deployer.address);

        // Get the latest transaction count
        const transactionCount = await provider.getTransactionCount(walletAddress);
        // Get the pending transaction count
        const pendingTransactionCount = await provider.getTransactionCount(
            walletAddress,
            "pending",
        );

        console.log(`Transaction count (latest): ${transactionCount}`);
        console.log(`Pending transaction count: ${pendingTransactionCount}`);

        // If there are pending transactions, fetch and display them
        if (CORRECT) {
            if (pendingTransactionCount > transactionCount) {
                console.log("Pending transactions detected:");

                try {
                    const response = await axios.get(etherscanApiUrl);
                    const transactions = response.data.result;

                    console.log(`Fetched ${transactions.length} transactions from Etherscan`);

                    // Extract nonces from confirmed transactions
                    const confirmedNonces = transactions
                        .filter((tx: { confirmations: string }) => tx.confirmations !== "0")
                        .map((tx: { nonce: string }) => parseInt(tx.nonce));

                    // Identify missing nonces
                    const allNonces = Array.from({ length: pendingTransactionCount }, (_, i) => i);
                    const missingNonces = allNonces.filter(
                        nonce => !confirmedNonces.includes(nonce) && nonce >= transactionCount,
                    );

                    if (missingNonces.length === 0) {
                        console.log("No pending transactions found.");
                    } else {
                        for (const nonce of missingNonces) {
                            console.log(`Pending transaction with nonce: ${nonce}`);

                            // Create a new transaction to replace the pending transaction
                            const newTx = {
                                to: walletAddress, // You can replace this with the actual recipient
                                value: ethers.parseEther("0"), // You can replace this with the actual value
                                gasLimit: 21000, // Basic gas limit for a simple transfer
                                nonce: nonce,
                                gasPrice: ethers.parseUnits("100", "gwei"), // Adjust gas price as needed
                                chainId: chainId,
                            };

                            try {
                                const signedTx = await wallet.signTransaction(newTx);
                                const txResponse = await provider.broadcastTransaction(signedTx);
                                console.log(`Speeding up transaction: ${txResponse.hash}`);
                            } catch (error) {
                                console.error("Error sending new transaction:", error);
                            }
                        }
                    }
                } catch (error) {
                    console.error("Error fetching transactions from Etherscan:", error);
                }
            } else {
                console.log("No pending transactions.");
            }
        }
    }

    console.log("==================================================================");
}

main()
    .then(() => console.log("\nFinished..."))
    .catch((error: Error) => {
        console.error(error);
        throw new Error();
    });
