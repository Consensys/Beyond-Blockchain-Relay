// Local networks
module.exports = {
    networks: {
      development: {
        host: "127.0.01",
        port: "8545",
        network_id: "*"
        compilers: {
        solc: {
        version: "^0.5.0", // A version or constraint - Ex. "^0.5.0"
                               // Can also be set to "native" to use a native solc
          //  docker: <boolean>, // Use a version obtained through docker
          //  settings: {
          //    optimizer: {
          //    enabled: <boolean>,
          //      runs: <number>   // Optimize for how many times you intend to run the code
          //    },
          //    evmVersion: <string> // Default: "byzantium"
          //  }
          }
        }
      }
    }
};
