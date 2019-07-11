const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require("./build/SchemeFactory.json");

const provider = new HDWalletProvider(
    /* Use your account 12 word mnemonic */,
    /* Your Infura Rinkebey API */
);

const web3 = new Web3(provider);

const deploy = async () => {
    
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account, ', accounts[0]);
    
    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: "0x"+compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '2000000' });

    console.log('Contract deployed at ', result.options.address ); // copy this and use in factory.js
}

deploy();
// USE THIS CONTRACT ADDRESS: 0x81580DdaB58990b238DF5B3C35F8248e8E39e85a

