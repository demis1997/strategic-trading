"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaultsRegistryMock__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "vaultAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "status",
                type: "bool",
            },
        ],
        name: "VaultStatusChanged",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "vaultAddress_",
                type: "address",
            },
        ],
        name: "isVaultActive",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "vaultAddress_",
                type: "address",
            },
            {
                internalType: "bool",
                name: "status_",
                type: "bool",
            },
        ],
        name: "setVaultStatus",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "validVaults",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b50610225806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80630c5aed571461004657806360d712fc146100865780636657fc671461009b575b600080fd5b610072610054366004610191565b6001600160a01b031660009081526020819052604090205460ff1690565b604051901515815260200160405180910390f35b6100996100943660046101b3565b6100be565b005b6100726100a9366004610191565b60006020819052908152604090205460ff1681565b6001600160a01b0382166101185760405162461bcd60e51b815260206004820152601d60248201527f7661756c74416464726573735f206973207a65726f2061646472657373000000604482015260640160405180910390fd5b6001600160a01b03821660008181526020818152604091829020805460ff191685151590811790915591519182527f32a7de7321c9403d8687817e59bda821c4153c1ba40a38e43d5405070cdfb384910160405180910390a25050565b80356001600160a01b038116811461018c57600080fd5b919050565b6000602082840312156101a357600080fd5b6101ac82610175565b9392505050565b600080604083850312156101c657600080fd5b6101cf83610175565b9150602083013580151581146101e457600080fd5b80915050925092905056fea2646970667358221220c2a97587e3a0c8456f229ac23f805c89f01a5cfeda887122dd57edd88ce54aa664736f6c63430008180033";
const isSuperArgs = (xs) => xs.length > 1;
class VaultsRegistryMock__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    connect(runner) {
        return super.connect(runner);
    }
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.VaultsRegistryMock__factory = VaultsRegistryMock__factory;
VaultsRegistryMock__factory.bytecode = _bytecode;
VaultsRegistryMock__factory.abi = _abi;
//# sourceMappingURL=VaultsRegistryMock__factory.js.map