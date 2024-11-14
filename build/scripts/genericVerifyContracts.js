"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = __importDefault(require("hardhat"));
const IMPLEMENTATION = "0x4b1407d18C0EA0FE07670AF299A10CAF2C25B472";
async function main() {
    console.clear();
    if (!IMPLEMENTATION) {
        throw new Error("Invalid parameters detected");
    }
    await hardhat_1.default
        .run("verify:verify", {
        address: IMPLEMENTATION,
        constructorArguments: [
            "0xD7045Db74A11175a61175c05976c601Fa7F71F6a",
            "LYS",
            "LYS",
            BigInt(18),
        ],
    })
        .catch(ignoreAlreadyVerifiedError);
}
function ignoreAlreadyVerifiedError(err) {
    if (err.message.includes("Contract source code already verified")) {
        console.log("contract already verfied, skipping");
        return;
    }
    else {
        throw err;
    }
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=genericVerifyContracts.js.map