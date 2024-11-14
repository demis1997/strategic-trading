import fs from "fs-extra";
import * as path from "path";

// Function to update the deployments log file
export async function updateDeploymentLog(
    network: string,
    contractName: string,
    contractAddress: string,
): Promise<void> {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");
    const logEntry = `${network.toUpperCase()} | ${formattedDate} | ${contractName} | ${contractAddress}\n`;

    // Adjust the logFilePath to navigate up one directory and then to _addressesLog
    const logFilePath = path.join(__dirname, "..", "_addressesLog", "deployments.txt");

    try {
        // Read the existing content of the file
        let existingContent = "";
        if (await fs.pathExists(logFilePath)) {
            existingContent = await fs.readFile(logFilePath, "utf8");
        }

        // Write the new log entry followed by the existing content
        await fs.writeFile(logFilePath, logEntry + existingContent, "utf8");
        console.log("Deployment log updated successfully.");
    } catch (error) {
        console.error("An error occurred while updating the deployment log:", error);
    }
}
