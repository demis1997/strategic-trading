export const constants = {
    MAINNET: {
        uniswapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
        uniswapQuoterV2: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
        lidoImplementation: "0x17144556fd3424EDC8Fc8A4C940B2D04936d17eb",
        lidoStEth: "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84",
        lidoWstEth: "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0",
        weth: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        etherfi_weEth: "0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee",
        etherfi_eEth: "0x35fA164735182de50811E8e2E824cFb9B6118ac2",
        etherfi_liquifier: "0x9ffdf407cde9a93c47611799da23924af3ef764f",
        kelp_deposit: "0x036676389e48133B63a802f8635AD39E752D375D",
        kelp_rsEth: "0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7",
        rocket_deposit: "0xDD3f50F8A6CafbE9b31a427582963f465E745AF8",
        rocket_rETH: "0xae78736Cd615f374D3085123A210448E74Fc6393",
        rocket_deposit_settings: "0xD846AA34caEf083DC4797d75096F60b6E08B7418",
        stader_stake_manager: "0xcf5EA1b38380f6aF39068375516Daf40Ed70D299",
        stader_ETHx: "0xA35b1B31Ce002FBF2058D22F30f95D405200A15b",
        renzo_liquifier: "0x74a09653A083691711cF8215a6ab074BB4e99ef5",
        renzo_ezEth: "0xbf5495Efe5DB9ce00f80364C8B423567e58d2110",
        stEth_eth_feed: "0x86392dC19c0b719886221c78AB11eb8Cf5c52812",
        weEth_eth_feed: "0x5c9C449BbC9a6075A2c061dF312a35fd1E05fF22",
        wsEth_weth_uni_pool: "0x109830a1aaad605bbf02a9dfa7b0b92ec2fb7daa",
        weEth_weth_uni_pool: "0x7A415B19932c0105c82FDB6b720bb01B0CC2CAe3", // better use the oracle weeth_eth_feed
        rsEth_weth_uni_pool: "0x059615EBf32C946aaab3D44491f78e4F8e97e1D3",
        ETHx_weth_uni_pool: "0x1b9669b12959Ad51B01FaBcF01EaBDFADB82f578",
        price_stEth_in_eth: "",
    },
    SEPOLIA: {
        uniswapRouter: "0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E", // real
        uniswapQuoterV2: "0xEd1f6473345F45b75F8179591dd5bA1888cf2FB3", // real
        lidoImplementation: "0x3e7e93ba66d26608c2ffe1630f445d8d29ac6c92", // real
        // lidoStEth: "0x3e3FE7dBc6B4C189E7128855dD526361c49b40Af", // real
        lidoStEth: "0xcE40749D74036963417d104397c9dC0a74041c2D", // mock
        lidoWstEth: "0xB82381A3fBD3FaFA77B3a7bE693342618240067b", // real
        // weth: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14", // real
        weth: "0x024963681f553902945F86b67FF9C0b7fa4c7D26", // mock
        etherfi_weEth: "",
        etherfi_eEth: "0xDfCA69EBa5C6109aE3183Ba5324313dfeECBd959", // mock
        etherfi_liquifier: "",
        kelp_deposit: "",
        kelp_rsEth: "0x1b1039663ee011c31B737Cd088Bf639Bb11159CB", // mock
        rocket_deposit: "",
        rocket_rETH: "",
        rocket_deposit_settings: "",
        stader_stake_manager: "",
        stader_ETHx: "0xE5006ecf47b8402329602002C381D28545Af4a1D", // mock
        renzo_liquifier: "",
        renzo_ezEth: "0x1d81182ffA764303482d92B3F8E033b08a8Ae71a", // mock
        stEth_eth_feed: "",
        weEth_eth_feed: "",
        wsEth_weth_uni_pool: "",
        weEth_weth_uni_pool: "",
        rsEth_weth_uni_pool: "",
        ETHx_weth_uni_pool: "",
        price_stEth_in_eth: "999831312753742400",
    },
};

export const deployedContracts = {
    MAINNET: {},
    SEPOLIA: {
        masterToken: "0x8D3d3c39EDb3F6f1C30D96086dBc70c66Ef8ff33",
        uniformTransferStrategy: "0x6aEEeEc4eeD8779012e3e9E028Ab4894f692a75f",
        vaultRegistry: "0x3462dCb6e262f0f1CfD684C4f0Fc672414bbb5A9",
    },
};

export const vaults = {
    MAINNET: {},
    SEPOLIA: {
        vault1: "0xC626e9e64292E5ad3292359dBe5A4eE65415b333", // strategy1
        vault2: "0xb493Df0C52B71cef7E177D8a7959EdcDB6fBb673", // strategy2
        vault3: "0xcdC0A7949095AB5fAd5d1828053730Edb20DBEAb", // strategy3
    },
};

export const strategies = {
    MAINNET: {},
    SEPOLIA: {
        strategy1: "0xB4B9e064e9E761Dc62e0311497efe70FdAC1D613", // LIDO - KELP
        strategy2: "0xBF03Aa86D9E11c7617fE34a9b6870BeBd0F851Ec", // LIDO - ETHERFI
        strategy3: "0xF2A3CeD311914F93d21910a1E9906FB879341973", // STADER - KELP
    },
};

export const adapters = {
    MAINNET: {},
    SEPOLIA: {
        weth_lido: "0x70bd7a8Be5e75f16d740178B1ecAb99ceD3C0178", // mock
        lido_etherfi: "0x4F7cedB4d9D4F7D9304F1321ce6dAF033D877Ab2", // mock
        lido_kelp: "0xF76eC58433858B77224d75857Bab37154a01bD14", // mock
        weth_stader: "0xE224E78DfC7576E22E5d59684d8FD18F60981a87", // mock
        stader_kelp: "0xA433E309fD32f1BDc92FdaaD3c040b38C8659Cb5", // mock
    },
};

export const oracles = {
    MAINNET: {},
    SEPOLIA: {
        oracle1Mock: "0x6194B9a6Cb811fa569d6407d735d92Bb778A6469", // kelp
        oracle2Mock: "0x5c0B7A578502EAEC549823e85A21EB38d72FC38E", // etherfi
    },
};
