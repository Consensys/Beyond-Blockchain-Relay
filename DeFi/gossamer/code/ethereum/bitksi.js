const Web3 = require('web3');
const Bitski = require('bitski-node');
const fetch = require('node-fetch');

const bitskiCredentials = require('./bitski.config.js');

const bitskiURL = 'https://api.bitski.com/v1/web3/rinkeby';

const connectWeb3 = () => {
  const bitskiProviderOptions = {
    network: 'rinkeby',
    credentials: {
      id: bitskiCredentials.credentialID,
      secret: bitskiCredentials.credentialSecret,
    },
  };

  const rpcURL = Bitski.getProvider(bitskiCredentials.clientID, bitskiProviderOptions);
  return new Web3(rpcURL);
};

const getToken = () => new Promise(async (resolve, reject) => {
  const postObj = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${bitskiCredentials.credentialID}:${bitskiCredentials.credentialSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials&scope=eth_sign',
  };

  const rawToken = await fetch('https://account.bitski.com/oauth2/token', postObj);
  const token = await rawToken.json();
  if (token.access_token) {
    resolve(token.access_token);
  } else {
    console.log('Error getting access token: ');
    console.log(token);
    reject();
  }
});

const sendTx = txObject => new Promise(async (resolve, reject) => {
  const accessToken = await getToken();

  const postObj = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(txObject),
  };

  const rawResponse = await fetch(bitskiURL, postObj);
  const txResponse = await rawResponse.json();

  if (txResponse.result) {
    resolve(txResponse.result);
  } else {
    console.log('Error sending transaction: ');
    console.log(txResponse);
    reject(new Error(txResponse.error.message));
  }
});


module.exports = { connectWeb3, sendTx };
