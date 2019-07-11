/* eslint-disable no-await-in-loop */
const fromWei = (amountOfTokens, decimals) => (amountOfTokens / (10 ** decimals));

const toBaseUnits = async (amountOfTokens, contract) => {
  const decimals = await contract.methods.decimals().call();
  return (amountOfTokens * (10 ** decimals));
};

const formatBalance = async (balance, contract) => {
  const decimals = await contract.methods.decimals().call();
  return fromWei(balance, decimals);
};

const waitFor = time => new Promise(resolve => setTimeout(resolve, time));

const verifyTransactionConfirmations = (txHash, gasLimitReached, web3) => new Promise(async (resolve, reject) => {
  const minsToWaitForConfirmation = gasLimitReached ? 60 : 1;
  let globalTimeoutCounter = 1000 * 60 * minsToWaitForConfirmation;
  const estimatedBlockTimeSecs = 20;
  const pollingFrequency = 1000 * estimatedBlockTimeSecs;
  let txSuccess = false;
  while (!txSuccess && globalTimeoutCounter > 0) {
    await waitFor(pollingFrequency);
    const tx = await web3.eth.getTransaction(txHash);
    const currentBlock = await web3.eth.getBlockNumber();

    if (tx && tx.blockNumber) {
      const txConfirmations = currentBlock - tx.blockNumber;
      if (txConfirmations >= 1) {
        txSuccess = true;
      }
    }

    globalTimeoutCounter -= pollingFrequency;
  }

  if (globalTimeoutCounter > 0) {
    resolve();
  } else {
    const errorObj = new Error('Transction not verified after 1 min; likely cause is Ethereum network congestion.');
    errorObj.txHash = txHash;
    errorObj.confirmationTimeout = true;
    reject(errorObj);
  }
});

module.exports = {
  toBaseUnits,
  formatBalance,
  verifyTransactionConfirmations,
  waitFor,
};
