# Strategic trading contracts

Solidity/TypeScript trading-contract prototype derived from the Protofire YGRO/Solidity template. The checked-in manifest retains the upstream package identity; this is not a claim of audited production trading functionality.

## Inspected local setup

The repository contains `package-lock.json`, Hardhat configuration and `foundry.toml`. Commands are derived from those files, not executed during this audit:

```sh
npm ci --ignore-scripts
npm run compilehh
npm run test
```

Hardhat reads an ignored local `.env` with a `MNEMONIC` and RPC configuration. Use a newly generated disposable local-test wallet only; no secret or API key is supplied. Mainnet forking is disabled in the inspected Hardhat configuration. RPC/network integration and contract safety remain unverified. No chain transaction was performed.

The original README linked missing `.env.example`, console and test paths. Those instructions are retained only as [historical template notes](docs/TEMPLATE_LEGACY.md). Existing generated/dependency files are tracked; ignore rules do not remove them.

## Attribution and license

Derived from the Solidity template and the Protofire YGRO package identified in `package.json`. Preserve the existing [license](LICENSE) and upstream attribution. Historical installation/deployment notes are not validated operation instructions.
