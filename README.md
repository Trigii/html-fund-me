# html fund me

This repository contains the minimalistic frontend of the [Hardhat Fund Me](https://github.com/Trigii/hardhat-fund-me) Dapp repository.

## Install Dependencies

```sh
yarn
```

## Usage

1. On a second terminal run:

```sh
git clone https://github.com/Trigii/hardhat-fund-me.git
cd hardhat-fund-me
yarn
yarn hardhat node
```

This will deploy a sample contract and start a local hardhat blockchain.

2. Update your `constants.js` with the new contract address.
   In your constants.js file, update the variable contractAddress with the address of the deployed "FundMe" contract. You'll see it near the top of the hardhat output.

3. Connect your metamask to your local hardhat blockchain.
    > PLEASE USE A METAMASK ACCOUNT THAT ISNT ASSOCIATED WITH ANY REAL MONEY.

In the output of the above command, take one of the private key accounts and import it into your metamask.

Additionally, add your localhost with chainid 31337 to your metamask.

4. Reserve the front end with `yarn http-server`, input an amount in the text box, and hit fund button after connecting

```sh
OPTION 1:
- Go live with the live share extension in VSCode (recommended)

OPTION 2:
yarn http-server
```

Connect to the corresponding URL on your favorite web browser.

### Troubleshooting

If you reset the localhost node, you will encounter an error like the following:

```
MetaMask - RPC Error: Internal JSON-RPC error...
```

To address this problem, go to:
`Metamask -> Configuration -> Advanced -> Delete Activity Data and Nonce`
