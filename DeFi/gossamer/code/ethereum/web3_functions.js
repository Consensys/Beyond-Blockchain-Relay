/* eslint-disable no-await-in-loop */

const Bitski = require('./bitksi.js');
const customUtils = require('./custom_utils.js');
const { ERC20ABI, cTokenABI } = require('./compound_ABIs.js');
const { abi, bytecode } = require('./build/contracts/LenderContractWallet.json');
const addressObj = require('./addressReferences.js');

const web3 = Bitski.connectWeb3();

const buildDeployContractTxObj = async (sendingAddress, encodedData, gasLimit, gasPriceInGWei, nonce) => {
  const gasPrice = web3.utils.toWei(`${gasPriceInGWei}`, 'gwei');
  const txObject = {
    id: nonce,
    jsonrpc: '2.0',
    method: 'eth_sendTransaction',
    params: [{
      nonce: web3.utils.toHex(nonce),
      gas: web3.utils.toHex(gasLimit),
      gasPrice: web3.utils.toHex(gasPrice),
      from: sendingAddress,
      data: encodedData,
    }],
  };

  return txObject;
};

const buildFunctionCallTxObj = async (sendingAddress, contractAddress, encodedData, gasLimit, gasPriceInGWei, nonce) => {
  const gasPrice = web3.utils.toWei(`${gasPriceInGWei}`, 'gwei');
  const txObject = {
    id: nonce,
    jsonrpc: '2.0',
    method: 'eth_sendTransaction',
    params: [{
      nonce: web3.utils.toHex(nonce),
      gas: web3.utils.toHex(gasLimit),
      gasPrice: web3.utils.toHex(gasPrice),
      from: sendingAddress,
      to: contractAddress,
      data: encodedData,
    }],
  };

  return txObject;
};

const checkForSuccessfulTx = async (txHashArr) => {
  let txHash;
  let contractAddress;
  let txSuccess = false;
  for (let i = 0; i < txHashArr.length; i += 1) {
    const receipt = await web3.eth.getTransactionReceipt(txHashArr[i]);
    if (receipt && receipt.status) {
      txHash = txHashArr[i];
      ({ contractAddress } = receipt);
      txSuccess = true;
      break;
    }
  }

  if (!txSuccess) {
    txHash = txHashArr.pop();
  }

  return { txHash, contractAddress, txSuccess };
};

const deployUserContract = async (adminAddress, adminAddresses, userAddress, baseGasPrice) => {
  const gasLimit = 2000000;
  const types = new Array(adminAddresses.length + 1).fill('address');
  const params = [userAddress, ...adminAddresses];
  const encodeParameter = web3.eth.abi.encodeParameters(types, params).slice('0x'.length);
  const data = bytecode.concat(encodeParameter);
  const nonce = await web3.eth.getTransactionCount(adminAddress);

  const txHashArr = [];
  let transactionConfirmed = false;
  const gasPriceLimit = 15;
  let gasPrice = baseGasPrice;
  const gasPriceIncrease = 5;
  let gasLimitReached = false;
  while (!transactionConfirmed) {
    console.log(gasPrice);
    transactionConfirmed = true;
    if (gasPrice > gasPriceLimit) {
      gasLimitReached = true;
    }
    try {
      const txObj = await buildDeployContractTxObj(adminAddress, data, gasLimit, gasPrice, nonce);
      const txHash = await Bitski.sendTx(txObj);
      txHashArr.push(txHash);
      await customUtils.verifyTransactionConfirmations(txHash, gasLimitReached, web3);
    } catch (error) {
      // how should I handle non-confirmation errors?
      if (error.confirmationTimeout) {
        transactionConfirmed = false;
        gasPrice += gasPriceIncrease;
      }
    }
  }


  const { contractAddress } = await checkForSuccessfulTx(txHashArr);
  return contractAddress;
};

const callUserContractFunction = async (transactionType, adminAddress, userContractAddress, tokenAddress, cTokenAddress, baseGasPrice, amount) => {
  const contract = new web3.eth.Contract(abi, userContractAddress);
  let gasLimit;
  let data;
  if (transactionType === 'approve') {
    gasLimit = 75000;
    data = contract.methods.approveCTokenContract(tokenAddress, cTokenAddress).encodeABI();
  } else if (transactionType === 'supply') {
    gasLimit = 250000;
    data = contract.methods.supplyToMoneyMarket(tokenAddress, cTokenAddress).encodeABI();
  } else if (transactionType === 'withdraw') {
    gasLimit = 400000;
    const cTokenContract = new web3.eth.Contract(ERC20ABI, cTokenAddress);
    const amountInBaseUnits = Math.floor(await customUtils.toBaseUnits(amount, cTokenContract));
    const formattedAmountToWithdraw = web3.utils.toBN(amountInBaseUnits).toString();
    data = contract.methods.withdrawFromMoneyMarket(tokenAddress, cTokenAddress, formattedAmountToWithdraw).encodeABI();
  }

  const nonce = await web3.eth.getTransactionCount(adminAddress);
  const txHashArr = [];
  let transactionConfirmed = false;
  const gasPriceLimit = 30;
  let gasPrice = baseGasPrice;
  const gasPriceIncrease = 5;
  let gasLimitReached = false;
  while (!transactionConfirmed) {
    console.log(gasPrice);
    transactionConfirmed = true;
    if (gasPrice > gasPriceLimit) {
      gasLimitReached = true;
    }
    try {
      const txObj = await buildFunctionCallTxObj(adminAddress, userContractAddress, data, gasLimit, gasPrice, nonce);
      const txHash = await Bitski.sendTx(txObj);
      txHashArr.push(txHash);
      await customUtils.verifyTransactionConfirmations(txHash, gasLimitReached, web3);
    } catch (error) {
      console.log(error);
      // how should we handle non-confirmation errors?
      if (error.confirmationTimeout) {
        transactionConfirmed = false;
        gasPrice += gasPriceIncrease;
      }
    }
  }


  const { txHash, txSuccess } = await checkForSuccessfulTx(txHashArr);
  return { txHash, txSuccess };
};


const contractPollingPromise = (address, contract) => new Promise(async (resolve) => {
  const minsUntilTimeout = 20;
  const pollingFrequency = 1000 * 2;
  let globalTimeoutAllotment = 1000 * 60 * minsUntilTimeout;
  let balance;

  while (!balance && globalTimeoutAllotment > 0) {
    balance = Number(await contract.methods.balanceOf(address).call());
    globalTimeoutAllotment -= pollingFrequency;
    await customUtils.waitFor(pollingFrequency);
    console.log('Checking for deposit...');
  }

  if (globalTimeoutAllotment > 0) {
    resolve(balance);
  } else {
    resolve(0);
  }
});

const pollForDeposit = async (userContractAddress, tokenAddress) => {
  const contract = new web3.eth.Contract(ERC20ABI, tokenAddress);
  const tokensReceived = await contractPollingPromise(userContractAddress, contract);
  const formattedTokensReceived = await customUtils.formatBalance(tokensReceived, contract);
  return formattedTokensReceived;
};

const getETHBalance = async (userAddress) => {
  const balance = await web3.eth.getBalance(userAddress);
  const formattedBalance = await web3.utils.fromWei(balance);
  return formattedBalance;
};

const getERC20Balance = async (userAddress, tokenAddress) => {
  try {
    const contract = new web3.eth.Contract(ERC20ABI, tokenAddress);
    const balance = await contract.methods.balanceOf(userAddress).call();
    const formattedBalance = await customUtils.formatBalance(balance, contract);
    return formattedBalance;
  } catch (error) {
    console.log('Could not get balance, probably because there is no contract wallet created yet');
    return 0;
  }
};

const getUserAssetBalances = async (userAddress) => {
  const resolvedDataArr = await Promise.all([
    getETHBalance(userAddress),
    getERC20Balance(userAddress, addressObj.dai),
    getERC20Balance(userAddress, addressObj.usdc),
    getERC20Balance(userAddress, addressObj.zrx),
    getERC20Balance(userAddress, addressObj.bat),
    getERC20Balance(userAddress, addressObj.rep),
  ]).then(data => data);

  return {
    ETH: resolvedDataArr[0],
    DAI: resolvedDataArr[1],
    USDC: resolvedDataArr[2],
    ZRX: resolvedDataArr[3],
    BAT: resolvedDataArr[4],
    REP: resolvedDataArr[5],
  };
};

const getCTokenConversionRate = async (cTokenAddress) => {
  try {
    const contract = new web3.eth.Contract(cTokenABI, cTokenAddress);
    const exchangeRate = await contract.methods.exchangeRateCurrent().call();
    return exchangeRate;
  } catch (error) {
    return 0;
  }
};

module.exports = {
  deployUserContract,
  callUserContractFunction,
  pollForDeposit,
  getUserAssetBalances,
  getCTokenConversionRate,
  getERC20Balance,
};
