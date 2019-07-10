/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

var HDWalletProvider = require("truffle-hdwallet-provider");

var infura_apikey = "39L4CW0Z7li9TKB58aTN",
  mnemonic = "nice defy will train slight photo hammer peasant clap worry wise rescue";


module.exports = {
  /*solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },*/
  networks: {
    ganache: {
      host: "localhost",
      port: 7545,
      gas: 6721975,
      gasPrice: 20000000000,
      network_id: "5777"
    },
    ropsten: {
      provider: function () { return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/" + infura_apikey); },
      network_id: 3,
      gas: 4712388,
      gasPrice: 100000000000,
    },
    kovan: {
      provider: function () { return new HDWalletProvider(mnemonic, "https://kovan.infura.io/" + infura_apikey); },
      network_id: 42,
      gas: 6000000,
      gasPrice: 100000000000,
    },
    rinkeby: {
      provider: function () { return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/" + infura_apikey); },
      network_id: 4,
      gas: 6995951,
      gasPrice: 800000000000,
    },
    testrpc: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    },
  }
};