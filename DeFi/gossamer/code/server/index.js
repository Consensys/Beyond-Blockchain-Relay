const express = require('express');
const timeout = require('connect-timeout');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcryptjs');
const { AuthenticationClient } = require('auth0');
const fetch = require('node-fetch');

const authCongif = require('./auth.config.js');
const db = require('../database/database.js');
const interestRate = require('../data/averageInterestRate.js');
const getCTokenExchangeRate = require('../data/cTokenExchangeRateHistory.js');
const addressObj = require('../ethereum/addressReferences.js');

const {
  deployUserContract,
  callUserContractFunction,
  pollForDeposit,
  getUserAssetBalances,
  getCTokenConversionRate,
  getERC20Balance,
} = require('../ethereum/web3_functions.js');

const contractVersion = '0';

const app = express();
const PORT = 4000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '/../public/')));
// extend server timeout for the polling function
app.use('/pollForDeposit', (req, res, next) => {
  req.setTimeout((20 * 60 * 1000) + 1);
  next();
}, timeout('20m'));
app.use('/createSmartContract', (req, res, next) => {
  req.setTimeout((20 * 60 * 1000) + 1);
  next();
}, timeout('20m'));
app.use('/callSmartContractFunction', (req, res, next) => {
  req.setTimeout((20 * 60 * 1000) + 1);
  next();
}, timeout('20m'));
app.get('*', (req, res) => res.sendFile('index.html', { root: path.join(__dirname, '/../public/') }));


const auth0Client = new AuthenticationClient({
  domain: authCongif.domain,
  clientID: authCongif.client_id,
});

const getEmailFromAccessToken = accessToken => (
  new Promise((resolve, reject) => {
    auth0Client.users.getInfo(accessToken, (err, userInfo) => {
      if (err) {
        console.log('Something went wrong: ', err);
        reject(err);
      }
      resolve(userInfo.name);
    });
  })
);

const getEmailFromAccessTokenOrSend403 = async (res, accessToken) => {
  let email = null;
  try {
    email = await getEmailFromAccessToken(accessToken);
    if (accessToken && !email) {
      console.log('----- Auth error pulling email from access token -----');
    }
  } catch (error) {
    console.log(error);
    res.status(403).send(JSON.stringify({ error: 'Access token is invalid.' }));
  }
  return email;
};

const getTokenAddresses = (tokenStr) => {
  let tokenAddress;
  let cTokenAddress;

  if (tokenStr === 'DAI') {
    tokenAddress = addressObj.dai;
    cTokenAddress = addressObj.cDAI;
  } else if (tokenStr === 'USDC') {
    tokenAddress = addressObj.usdc;
    cTokenAddress = addressObj.cUSDC;
  }

  return { tokenAddress, cTokenAddress };
};

app.post('/createAccount', async (req, res) => {
  const { name, email, password } = req.body;
  const passwordHash = bcrypt.hashSync(password, 8);
  db.writeUserData({ name, email, passwordHash });
  res.end();
});

app.post('/login', async (req, res) => {
  const { accessToken } = req.body;
  const email = await getEmailFromAccessTokenOrSend403(res, accessToken);
  await db.updateLoginDataAndReturnCount(email);
  const dateOfFirstSupply = await db.getDateOfFirstSupply(email);
  const hasSupplied = dateOfFirstSupply.error === undefined;
  res.end(JSON.stringify(hasSupplied));
});

app.post('/getUserAssetBalances', async (req, res) => {
  const { userAddress } = req.body;
  const userAssetObj = await getUserAssetBalances(userAddress);
  res.end(JSON.stringify(userAssetObj));
});

app.post('/getUserData', async (req, res) => {
  const { accessToken } = req.body;
  const email = await getEmailFromAccessTokenOrSend403(res, accessToken);

  // won't need this anymore when there's no longer a need for the "primary token" distinction
  const approvedTokensArr = await db.pullApprovedTokens(email);
  // placeholder until a user supplies a token
  let primaryToken = 'DAI';
  let userHasSuppliedBefore = false;
  if (approvedTokensArr.length) {
    [primaryToken] = approvedTokensArr;
    userHasSuppliedBefore = true;
  }

  const { name, userAddress, contractAddress } = await db.getUserData(email);
  const { cTokenAddress } = getTokenAddresses(primaryToken);
  const balance = await getERC20Balance(contractAddress, cTokenAddress);
  const { principal, interestWithdrawn } = await db.getUserPrincipalAndInterestWithdrawn(email, primaryToken);

  // get user transaction history
  const rawTransactionHistory = await db.getUserTransactionHistory(email);
  const transactionHistory = rawTransactionHistory.map((row) => {
    let action;
    let amount;
    if (row.transactionType === 'supply') {
      action = 'Deposit';
      amount = row.transactionAmountToPrincipal;
    } else {
      action = 'Withdrawal';
      amount = (row.transactionAmountToPrincipal + row.transactionAmountToInterest) * -1;
    }

    return {
      action,
      amount,
      token: row.token,
      date: row.transactionDate,
      txHash: row.txHash,
    };
  });

  // get user date of first supply
  let dateOfFirstSupply = await db.getDateOfFirstSupply(email);
  if (dateOfFirstSupply.error) {
    dateOfFirstSupply = '';
  }

  const userData = {
    name,
    userAddress,
    contractAddress,
    balance,
    principal,
    interestWithdrawn,
    userHasSuppliedBefore,
    primaryToken,
    transactionHistory,
    dateOfFirstSupply,
  };
  res.end(JSON.stringify(userData));
});

app.post('/getCTokenConversionRate', async (req, res) => {
  const { token } = req.body;
  const { cTokenAddress } = getTokenAddresses(token);
  const scaledExchangeRate = await getCTokenConversionRate(cTokenAddress);

  let exchangeRate;
  // Compound scales exchange rate by 10^18...not sure why I need to divide by 10^10 after that
  if (token === 'DAI') {
    exchangeRate = scaledExchangeRate / (10 ** 16) / (10 ** 12);
  } else if (token === 'USDC') {
    exchangeRate = scaledExchangeRate / (10 ** 16);
  }
  res.end(JSON.stringify(exchangeRate));
});

app.post('/getCTokenExchangeRateHistory', async (req, res) => {
  const { token, dateOfFirstSupply, userTransactionHistory } = req.body;
  // use getTokenAddresses function when we've transitioned to mainnet
  const cDAIAddress = '0xf5dce57282a584d2746faf1593d3121fcac444dc';
  const cUSDCAddress = '0x39aa39c021dfbae8fac545936693ac917d5e7563';
  let tokenAddress;

  if (token === 'DAI') {
    tokenAddress = cDAIAddress;
  } else if (token === 'USDC') {
    tokenAddress = cUSDCAddress;
  }

  let dailyTokenBalance = [];

  if (dateOfFirstSupply.length) {
    const startDate = new Date(dateOfFirstSupply);
    const exchangeRateHistory = await getCTokenExchangeRate(tokenAddress, startDate);
    const filteredUserTransactionHistory = userTransactionHistory.filter(transaction => transaction.token === token);

    const dailyCTokenHistory = [];
    const startingDay = new Date(userTransactionHistory[0].date.slice(0, 10));
    const startingDayInUnix = startingDay.getTime() / 1000;
    const todayInUnix = new Date().getTime() / 1000;
    const dayInSecs = 60 * 60 * 24;

    let currentBalance = 0;
    let currentIndex = 0;
    let dayCount = 0;
    let currentTimeInUnix = startingDayInUnix;

    while (currentTimeInUnix < todayInUnix) {
      let dailyNetChange = 0;
      currentTimeInUnix += dayInSecs;
      for (let i = currentIndex; i < filteredUserTransactionHistory.length; i += 1) {
        const transactionTimeInUnix = new Date(filteredUserTransactionHistory[i].date).getTime() / 1000;
        if (transactionTimeInUnix < currentTimeInUnix) {
          // to be more precise i could get the exchange rate at the exact time the supply/withdrawal happened
          dailyNetChange += (filteredUserTransactionHistory[i].amount / exchangeRateHistory[dayCount].exchangeRate);
          currentIndex += 1;
        } else {
          break;
        }
      }

      currentBalance += dailyNetChange;
      dailyCTokenHistory.push(currentBalance);
      dayCount += 1;
    }

    dailyTokenBalance = exchangeRateHistory.map((exchangeRateObj, i) => {
      const balance = dailyCTokenHistory[i] * exchangeRateObj.exchangeRate;
      return { balance, date: exchangeRateObj.date };
    });
  }

  res.end(JSON.stringify(dailyTokenBalance));
});

app.post('/getAverageInterestRate', async (req, res) => {
  const { token, timePeriodInDays } = req.body;
  // use getTokenAddresses function when we've transitioned to mainnet
  const cDAIAddress = '0xf5dce57282a584d2746faf1593d3121fcac444dc';
  const cUSDCAddress = '0x39aa39c021dfbae8fac545936693ac917d5e7563';
  let tokenAddress;

  if (token === 'DAI') {
    tokenAddress = cDAIAddress;
  } else if (token === 'USDC') {
    tokenAddress = cUSDCAddress;
  }

  const averageInterestRate = await interestRate.getAverage(tokenAddress, timePeriodInDays);
  res.end(JSON.stringify(averageInterestRate));
});

app.post('/getHistoricalInterestRates', async (req, res) => {
  const { token, dateOfFirstSupply } = req.body;
  let interestRates = [];
  if (dateOfFirstSupply.length) {
    try {
      const startDate = new Date(dateOfFirstSupply);
      // use getTokenAddresses function when we've transitioned to mainnet
      const cDAIAddress = '0xf5dce57282a584d2746faf1593d3121fcac444dc';
      const cUSDCAddress = '0x39aa39c021dfbae8fac545936693ac917d5e7563';
      let tokenAddress;

      if (token === 'DAI') {
        tokenAddress = cDAIAddress;
      } else if (token === 'USDC') {
        tokenAddress = cUSDCAddress;
      }
      interestRates = await interestRate.getHistorical(tokenAddress, startDate);
    } catch (error) {
      console.log(error);
    }
  }
  res.end(JSON.stringify(interestRates));
});

app.post('/getTokenToUSDConversionRate', async (req, res) => {
  const { token } = req.body;
  const rawPriceObj = await fetch(`https://api.coinbase.com/v2/prices/${token}-USD/spot`);
  const priceObj = await rawPriceObj.json();
  res.end(JSON.stringify(priceObj.data.amount));
});

app.post('/getUserTransactionHistory', async (req, res) => {
  const { accessToken } = req.body;
  const email = await getEmailFromAccessTokenOrSend403(res, accessToken);
  const transactionHistory = await db.getUserTransactionHistory(email);
  const formattedTransactionHistoryArr = transactionHistory.map((row) => {
    let action;
    let amount;
    if (row.transactionType === 'supply') {
      action = 'Deposit';
      amount = row.transactionAmountToPrincipal;
    } else {
      action = 'Withdrawal';
      amount = (row.transactionAmountToPrincipal + row.transactionAmountToInterest) * -1;
    }

    return {
      action,
      amount,
      token: row.token,
      date: row.transactionDate,
      txHash: row.txHash,
    };
  });
  res.end(JSON.stringify(formattedTransactionHistoryArr));
});

app.post('/createSmartContract', async (req, res) => {
  const adminAddress = await db.checkoutAvailableAdminAddress();
  const gasPriceInGwei = await db.getGasPrice('contract');

  if (!adminAddress) {
    console.log('Admin accounts busy!');
    res.end(JSON.stringify({ error: 'Admin accounts busy!' }));
  } else {
    const { accessToken, userAddress } = req.body;
    const email = await getEmailFromAccessTokenOrSend403(res, accessToken);
    let { contractAddress } = await db.getUserData(email);

    if (contractAddress) {
      res.send(JSON.stringify(contractAddress));
    } else {
      try {
        contractAddress = await deployUserContract(adminAddress, addressObj.adminArray, userAddress, gasPriceInGwei);
        console.log(contractAddress);
        res.send(JSON.stringify(contractAddress));
        db.updateUserAddresses(email, contractAddress, userAddress, contractVersion);
      } catch (error) {
        // will need more error handling here
        console.log(error);
        res.send(JSON.stringify({ error: 'It is taking longer than usual to confirm transactions. Network must be busy!' }));
      }
    }
    db.returnAdminAddress(adminAddress);
  }
});

app.post('/pollForDeposit', async (req, res) => {
  const { accessToken, token } = req.body;
  const email = await getEmailFromAccessTokenOrSend403(res, accessToken);
  const { contractAddress } = await db.getUserData(email);
  const { tokenAddress } = getTokenAddresses(token);
  const transactionAmountToPrincipal = await pollForDeposit(contractAddress, tokenAddress);
  console.log(transactionAmountToPrincipal);
  res.send(JSON.stringify(transactionAmountToPrincipal));
  db.writeTransactionDataAndUpdateBalances(email, { token, transactionAmountToPrincipal, transactionType: 'supply (in progress)' });
});

const approveTokenIfNecessary = async (email, token, adminAddress, contractAddress, tokenAddress, cTokenAddress, gasPriceInGwei) => {
  const approvedTokenArr = await db.pullApprovedTokens(email);
  if (!approvedTokenArr.includes(token)) {
    const { txHash, txSuccess } = await callUserContractFunction('approve', adminAddress, contractAddress, tokenAddress, cTokenAddress, gasPriceInGwei);
    if (txSuccess) {
      console.log(`${token} approved: ${txHash}`);
      db.writeTransactionDataAndUpdateBalances(email, { token, txHash, transactionType: 'approve' });
    } else {
      throw Error('approval of token failed');
    }
  }
};

app.post('/callSmartContractFunction', async (req, res) => {
  const adminAddress = await db.checkoutAvailableAdminAddress();
  const gasPriceInGwei = await db.getGasPrice('transaction');
  let data;

  if (!adminAddress) {
    console.log('Admin accounts busy!');
    data = { error: 'Admin accounts busy!' };
  } else {
    const {
      accessToken,
      token,
      transactionType,
      transactionAmountToPrincipal,
      transactionAmountToInterest,
      cTokenExchangeRate,
    } = req.body;

    try {
      const totalTransactionAmountInCTokens = (Number(transactionAmountToPrincipal) + Number(transactionAmountToInterest)) / Number(cTokenExchangeRate);
      const email = await getEmailFromAccessTokenOrSend403(res, accessToken);
      const { contractAddress } = await db.getUserData(email);
      const { tokenAddress, cTokenAddress } = getTokenAddresses(token);
      await approveTokenIfNecessary(email, token, adminAddress, contractAddress, tokenAddress, cTokenAddress, gasPriceInGwei);
      const { txHash, txSuccess } = await callUserContractFunction(transactionType, adminAddress, contractAddress, tokenAddress, cTokenAddress, gasPriceInGwei, totalTransactionAmountInCTokens);
      console.log(`${token} ${transactionType}: ${txHash}`);
      if (txSuccess) {
        data = txHash;
        const writeDataObj = {
          token,
          transactionType,
          transactionAmountToPrincipal,
          transactionAmountToInterest,
          txHash,
        };
        db.writeTransactionDataAndUpdateBalances(email, writeDataObj);
      } else {
        throw Error('supply/withdrawal was reverted');
      }
    } catch (error) {
      console.log(error);
      data = { error: 'Error calling smart contract function', transactionType, errorMessage: error };
    }

    res.send(JSON.stringify(data));
    db.returnAdminAddress(adminAddress);
  }
});
