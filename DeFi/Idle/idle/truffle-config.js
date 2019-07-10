'use strict';
require('babel-register');
require('babel-polyfill');
require('chai/register-should');
const path = require("path");
require('dotenv').config();
const HDWalletProvider = require("truffle-hdwallet-provider");
const INFURA_KEY = process.env["INFURA_KEY"];

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  compilers: {
    solc: {
      version: "0.5.2",
      optimizer: {
        enabled: true,
        runs: 1
      }
    }
  },
  networks: {
    local: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*'
    },
    ropsten: {
      provider() {
        return new HDWalletProvider(process.env["TESTNET_MNEMONIC"], `https://ropsten.infura.io/v3/${INFURA_KEY}`)
      },
      gasPrice: 7000000000, // 7 gwei
      network_id: 3
    },
    rinkeby: {
      provider() {
        return new HDWalletProvider(process.env["TESTNET_MNEMONIC"], `https://rinkeby.infura.io/v3/${INFURA_KEY}`)
      },
      gasPrice: 7000000000, // 7 gwei
      network_id: 4
    },
    live: {
      provider() {
        return new HDWalletProvider(process.env["MAINNET_MNEMONIC"], `https://mainnet.infura.io/v3/${INFURA_KEY}`);
      },
      gasPrice: 3000000000, // 3 gwei
      network_id: 1
    }
  },
  mocha: {
    useColors: true,
    // reporter: 'eth-gas-reporter',
    // reporterOptions : {
    //   currency: 'EUR',
    //   gasPrice: 5,
    //   onlyCalledMethods: false
    // }
  }
};
