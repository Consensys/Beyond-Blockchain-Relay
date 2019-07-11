const HDWalletProvider = require('truffle-hdwallet-provider');

const mnemonic = 'need to create a mnemonic and put it here if i want to deploy from truffle';

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/b73d1b6d7b9240278995bbdf02cdc0b4'),
      gasPrice: 2000000000,
      network_id: 4,
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '^0.5.8',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};
