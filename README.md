

&nbsp;


# [Forked from Solidity Template](#solidity-template)

Solidity template for Ethereum smart contracts

&nbsp;

#### [Install Node dependencies](#install-node-dependencies)

```sh
npm i
```

&nbsp;

#### [Install Foundry](#install-foundry)

```sh
curl -L https://foundry.paradigm.xyz | bash
```

Then, in a new terminal session or after reloading your `PATH`, run this to get
the latest [`forge`](https://book.getfoundry.sh/reference/forge/forge) and [`cast`](https://book.getfoundry.sh/reference/cast/cast) binaries:

```sh
foundryup
```

&nbsp;

#### [Copy over a new `.env` file](#copy-over-a-new-env-file)

```sh
cp .env.example .env
```

Fill in *at least* your [`MNEMONIC`](https://metamask.zendesk.com/hc/en-us/articles/360015290032-How-to-reveal-your-Secret-Recovery-Phrase)

&nbsp;

#### [Run the FORGE tests with Forge](#run-the-unit-tests-with-forge)

```sh
forge test
```

This will run everything in [test/foundry/](./test/foundry/), which utilizes [Forge](https://book.getfoundry.sh/forge/tests) to test contract code.

&nbsp;

#### [Run unitest and integration tests with Hardhat](#run-the-integration-tests-with-hardhat)

```sh
npm run test
npm run integration-test
```

This will run everything in 
[test/integration/](.test/integration/)
[test/unitest/](.test/unitest/)
which utilizes [Hardhat](https://hardhat.org/hardhat-runner/docs/getting-started#overview) to tests for full usage scenarios.

&nbsp;

#### [Deploy to Goerli test network](#deploy-to-goerli-test-network)

Create a [.env](./.env) file matching the variables seen in [.env.example](./.env.example).

Getting fully prepared may involve getting a [`INFURA_API_KEY`](https://docs.infura.io/infura/getting-started) by signing up, and getting some test ETH on your target network via a [facet](https://goerlifaucet.com/).

Then run:

```sh
npm run deploy -- --network goerli
```

This will automatically update [deployments.json](./deployments.json), which gets exported with your [NPM package](./package.json). It will also become the default address to use when interacting with your contracts with the [CLI](./scripts/console).

&nbsp;

#### [Generate documentation](#generate-documentation)

```sh
npm run doc
```

Sets up API docs from the [NatSpec](https://docs.soliditylang.org/en/latest/natspec-format.html) comments in your contract interfaces (ignoring implementations and libraries).

If desired, this can be updated to included all contract comments, and the path can be updated to a different location (such as if you want a seperate `docs` repository for your project).

&nbsp;

## [Scripts](#scripts)

### Coverage
```sh
npm run coverage
```

### Contracts Size
```sh
npm run size
```

### Contracts Slither Interactive
```sh
npm run slither
```

### Contracts Slither Directly
```sh
npm run slither-default
```

&nbsp;

## [Deployments](#deployments)

All contract addresses for each network are stored in [deployments.json](./deployments.json).

&nbsp;

## [License](#license)

The code in this project is licensed under the [MIT License](./LICENSE).

