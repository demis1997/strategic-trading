"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IEtherFiWithdrawRequestNFT__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "requestId",
                type: "uint256",
            },
        ],
        name: "claimWithdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "getClaimableAmount",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
class IEtherFiWithdrawRequestNFT__factory {
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.IEtherFiWithdrawRequestNFT__factory = IEtherFiWithdrawRequestNFT__factory;
IEtherFiWithdrawRequestNFT__factory.abi = _abi;
//# sourceMappingURL=IEtherFiWithdrawRequestNFT__factory.js.map