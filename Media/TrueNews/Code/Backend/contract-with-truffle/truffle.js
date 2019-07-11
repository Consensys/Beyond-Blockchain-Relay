const HDWalletProvider = require('truffle-hdwallet-provider');

// First read in the secrets.json to get our mnemonic
let mnemonic = 'My menonic';

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*'
    },
    ropsten: {
      provider: new HDWalletProvider(
        mnemonic,
        'https://ropsten.infura.io/MYKEY'
      ),
      network_id: 3,
      gas: 4500000
    }
  },

  compilers: {
    solc: {
      version: '0.5.0',
      docker: true,
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  },
  mocha: {
    enableTimeouts: false
  }
};
