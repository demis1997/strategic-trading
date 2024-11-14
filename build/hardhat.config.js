"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.explorerUrl = exports.UrlType = exports.chainIds = exports.GAS_MODE = exports.VERBOSE = void 0;
require("@nomicfoundation/hardhat-toolbox");
require("@primitivefi/hardhat-dodoc");
require("@typechain/hardhat");
require("hardhat-contract-sizer");
require("@openzeppelin/hardhat-upgrades");
require("@nomicfoundation/hardhat-ethers");
const dotenv = __importStar(require("dotenv"));
const fs_1 = require("fs");
const task_names_1 = require("hardhat/builtin-tasks/task-names");
const config_1 = require("hardhat/config");
const path_1 = require("path");
const toml = __importStar(require("toml"));
dotenv.config({ path: (0, path_1.resolve)(__dirname, "./.env") });
exports.VERBOSE = process.env.VERBOSE == "TRUE" ? true : false;
exports.GAS_MODE = process.env.GAS_MODE == "TRUE" ? true : false;
exports.chainIds = {
    sepolia: 11155111,
    arbitrum: 42161,
    "arbitrum-goerli": 421613,
    avalanche: 43114,
    "avalanche-fuji": 43113,
    bsc: 56,
    goerli: 5,
    hardhat: 31337,
    mainnet: 1,
    optimism: 10,
    "optimism-goerli": 420,
    "polygon-mainnet": 137,
    "polygon-mumbai": 80001,
};
function getChainConfig(chain) {
    let jsonRpcUrl;
    switch (chain) {
        case "sepolia":
            jsonRpcUrl = `https://rpc.ankr.com/eth_sepolia/${process.env.ANKR_ETH_API_KEY}`;
            break;
        case "arbitrum":
            jsonRpcUrl = `https://arb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
            break;
        case "arbitrum-goerli":
            jsonRpcUrl = `https://arb-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
            break;
        case "avalanche":
            jsonRpcUrl = "https://api.avax.network/ext/bc/C/rpc";
            break;
        case "avalanche-fuji":
            jsonRpcUrl = "https://api.avax-test.network/ext/bc/C/rpc";
            break;
        case "bsc":
            jsonRpcUrl = "https://bsc-dataseed1.binance.org";
            break;
        case "optimism":
            jsonRpcUrl = "https://mainnet.optimism.io";
            break;
        case "optimism-goerli":
            jsonRpcUrl = `https://opt-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
            break;
        case "polygon-mainnet":
            jsonRpcUrl = `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
            break;
        case "polygon-mumbai":
            jsonRpcUrl = `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
            break;
        default:
            jsonRpcUrl = `https://eth-${chain}.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`;
    }
    return {
        accounts: {
            mnemonic: process.env.MNEMONIC,
            path: "m/44'/60'/0'/0",
        },
        chainId: exports.chainIds[chain],
        url: jsonRpcUrl,
    };
}
var UrlType;
(function (UrlType) {
    UrlType["ADDRESS"] = "address";
    UrlType["TX"] = "tx";
})(UrlType || (exports.UrlType = UrlType = {}));
function explorerUrl(chainId, type, param) {
    switch (chainId) {
        case exports.chainIds.arbitrum:
            return `https://arbiscan.io/${type}/${param}`;
        case exports.chainIds["arbitrum-goerli"]:
            return `https://goerli.arbiscan.io/${type}/${param}`;
        case exports.chainIds.avalanche:
            return `https://snowtrace.io/${type}/${param}`;
        case exports.chainIds["avalanche-fuji"]:
            return `https://testnet.snowtrace.io/${type}/${param}`;
        case exports.chainIds.bsc:
            return `https://bscscan.com/${type}/${param}`;
        case exports.chainIds.goerli:
            return `https://goerli.etherscan.io/${type}/${param}`;
        case exports.chainIds.mainnet:
            return `https://etherscan.io/${type}/${param}`;
        case exports.chainIds.optimism:
            return `https://optimistic.etherscan.io/${type}/${param}`;
        case exports.chainIds["optimism-goerli"]:
            return `https://goerli-optimism.etherscan.io/${type}/${param}`;
        case exports.chainIds["polygon-mainnet"]:
            return `https://polygonscan.com/${type}/${param}`;
        case exports.chainIds["polygon-mumbai"]:
            return `https://mumbai.polygonscan.com/${type}/${param}`;
        default:
            return `https://etherscan.io/${type}/${param}`;
    }
}
exports.explorerUrl = explorerUrl;
const SOLC_DEFAULT = "0.8.24";
let foundry;
try {
    foundry = toml.parse((0, fs_1.readFileSync)("./foundry.toml").toString());
    foundry.profile.default.solc = foundry.profile.default["solc-version"]
        ? foundry.profile.default["solc-version"]
        : SOLC_DEFAULT;
}
catch (error) {
    foundry = {
        profile: {
            default: {
                solc: SOLC_DEFAULT,
            },
        },
    };
}
(0, config_1.subtask)(task_names_1.TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS).setAction(async (_, __, runSuper) => {
    const paths = await runSuper();
    return paths.filter((p) => !p.endsWith(".t.sol"));
});
const config = {
    paths: {
        artifacts: "./artifacts",
        cache: "./cache",
        sources: "./contracts",
        tests: "./test",
    },
    defaultNetwork: "hardhat",
    solidity: {
        version: foundry.profile?.default?.solc || SOLC_DEFAULT,
        settings: {
            optimizer: {
                enabled: foundry.profile?.default?.optimizer || true,
                runs: foundry.profile?.default?.optimizer_runs || 200,
                details: {
                    yul: foundry.profile?.default?.optimizer_details?.yul || true,
                },
            },
            viaIR: foundry.profile?.default?.via_ir || false,
        },
    },
    networks: {
        hardhat: {
            accounts: {
                mnemonic: process.env.MNEMONIC,
            },
            forking: {
                url: `https://mainnet.infura.io/v3/${process.env.INFURA_ETH_API_KEY}`,
                enabled: false,
            },
            chainId: exports.chainIds.hardhat,
        },
        anvil: {
            url: "http://127.0.0.1:8545",
        },
        sepolia: {
            accounts: {
                mnemonic: process.env.MNEMONIC,
                path: "m/44'/60'/0'/0",
            },
            chainId: 11155111,
            url: `https://sepolia.infura.io/v3/${process.env.INFURA_ETH_API_KEY}`,
            gas: 3000000,
            gasPrice: 5000000000,
        },
        arbitrum: getChainConfig("arbitrum"),
        "arbitrum-goerli": getChainConfig("arbitrum-goerli"),
        avalanche: getChainConfig("avalanche"),
        "avalanche-fuji": getChainConfig("avalanche-fuji"),
        bsc: getChainConfig("bsc"),
        goerli: getChainConfig("goerli"),
        mainnet: getChainConfig("mainnet"),
        optimism: getChainConfig("optimism"),
        "optimism-goerli": getChainConfig("optimism-goerli"),
        "polygon-mainnet": getChainConfig("polygon-mainnet"),
        "polygon-mumbai": getChainConfig("polygon-mumbai"),
    },
    gasReporter: {
        currency: "USD",
        enabled: exports.GAS_MODE,
        coinmarketcap: process.env.CMC_API_KEY,
        excludeContracts: ["./contracts/_mocks"],
        src: "./contracts",
    },
    etherscan: {
        apiKey: {
            sepolia: process.env.ETHERSCAN_API_KEY || "",
            arbitrum: process.env.ARBISCAN_API_KEY || "",
            "arbitrum-goerli": process.env.ARBISCAN_API_KEY || "",
            avalanche: process.env.SNOWTRACE_API_KEY || "",
            "avalanche-fuji": process.env.SNOWTRACE_API_KEY || "",
            bsc: process.env.BSCSCAN_API_KEY || "",
            goerli: process.env.ETHERSCAN_API_KEY || "",
            mainnet: process.env.ETHERSCAN_API_KEY || "",
            optimism: process.env.OPTIMISM_API_KEY || "",
            "optimism-goerli": process.env.OPTIMISM_API_KEY || "",
            "polygon-mainnet": process.env.POLYGONSCAN_API_KEY || "",
            "polygon-mumbai": process.env.POLYGONSCAN_API_KEY || "",
        },
    },
    typechain: {
        target: "ethers-v6",
        outDir: "types/",
    },
    dodoc: {
        outputDir: process.env.DOC_GEN_LOCAL_PATH,
        runOnCompile: false,
        debugMode: false,
        keepFileStructure: false,
        freshOutput: false,
        include: ["contracts/interfaces"],
    },
    contractSizer: {
        alphaSort: true,
        runOnCompile: false,
        disambiguatePaths: false,
    },
};
exports.default = config;
//# sourceMappingURL=hardhat.config.js.map