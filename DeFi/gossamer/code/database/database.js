const db = require('./databaseConnection.js');

const executeQuery = async (queryString, valueArray) => {
  let result;
  try {
    result = await db.query(queryString, valueArray);
  } catch (error) {
    console.log(error);
    result = 'error';
  }
  return result;
};

const checkoutAvailableAdminAddress = async () => {
  let queryString = 'SELECT adminAddress FROM admin WHERE active = "N" LIMIT 1';
  const queryResults = await executeQuery(queryString);

  if (!queryResults[0]) {
    return null;
  }

  const { adminAddress } = queryResults[0];
  queryString = 'UPDATE admin SET active = "Y" WHERE adminAddress = ?';
  await executeQuery(queryString, [adminAddress]);
  console.log('admin account checked out');
  return adminAddress;
};

const returnAdminAddress = async (adminAddress) => {
  const queryString = 'UPDATE admin SET active = "N" WHERE adminAddress = ?';
  console.log('admin account returned');
  return executeQuery(queryString, [adminAddress]);
};

const writeUserData = async (dataObj) => {
  const queryString = 'INSERT INTO users SET ?';
  return executeQuery(queryString, [dataObj]);
};

const updateLoginDataAndReturnCount = async (email) => {
  let queryString = 'SELECT loginCount FROM users WHERE email = ?';
  const queryResults = await executeQuery(queryString, [email]);
  const { loginCount } = queryResults[0];

  queryString = 'UPDATE users SET loginCount = loginCount + 1, lastLogin = NOW() WHERE email = ?';
  await executeQuery(queryString, [email]);

  return loginCount;
};

const getPasswordHash = async (email) => {
  const queryString = 'SELECT passwordHash FROM users WHERE email = ?';
  const queryResults = executeQuery(queryString, [email]);
  return queryResults[0].passwordHash;
};

const updateUserAddresses = async (email, contractAddress, userAddress, contractVersion) => {
  const queryString = 'UPDATE users SET contractAddress = ?, userAddress = ?, contractVersion = ? WHERE email = ?';
  return executeQuery(queryString, [contractAddress, userAddress, contractVersion, email]);
};

const getUserData = async (email) => {
  const queryString = 'SELECT name, userAddress, contractAddress FROM users WHERE email = ?';
  const queryResults = await executeQuery(queryString, [email]);
  let data;
  try {
    const { name, userAddress, contractAddress } = queryResults[0];
    data = { name, userAddress, contractAddress };
  } catch (error) {
    data = { error: 'Cannot find user data in database', Email: email };
  }
  return data;
};

const getUserId = async (email) => {
  const queryString = 'SELECT userId FROM users WHERE email = ?';
  const queryResults = await executeQuery(queryString, [email]);
  return queryResults[0].userId;
};

const getDateOfFirstSupply = async (email) => {
  const queryString = 'SELECT transactionDate FROM transactions WHERE userId = ? AND transactionType = "supply" ORDER BY transactionDate ASC LIMIT 1';
  const userId = await getUserId(email);
  const queryResults = await executeQuery(queryString, [userId]);
  let data;
  try {
    data = queryResults[0].transactionDate;
  } catch (error) {
    data = { error: 'Cannot get user supply date...they probably have not supplied yet', Email: email };
  }
  return data;
};

const getUserPrincipalAndInterestWithdrawn = async (email, token) => {
  let principal = 0;
  let interestWithdrawn = 0;

  if (token === 'DAI') {
    const queryString = 'SELECT daiPrincipal, daiInterestWithdrawn FROM users WHERE email = ?';
    const queryResults = await executeQuery(queryString, [email]);
    principal = queryResults[0].daiPrincipal;
    interestWithdrawn = queryResults[0].daiInterestWithdrawn;
  }

  if (token === 'USDC') {
    const queryString = 'SELECT usdcPrincipal, usdcInterestWithdrawn FROM users WHERE email = ?';
    const queryResults = await executeQuery(queryString, [email]);
    principal = queryResults[0].usdcPrincipal;
    interestWithdrawn = queryResults[0].usdcInterestWithdrawn;
  }

  return { principal, interestWithdrawn };
};

const getUserTransactionHistory = async (email) => {
  const userId = await getUserId(email);
  const queryString = 'SELECT * FROM transactions WHERE userId = ? AND (transactionType = "supply" OR transactionType = "withdraw")';
  const queryResults = await executeQuery(queryString, [userId]);
  return queryResults;
};

const pullApprovedTokens = async (email) => {
  const userId = await getUserId(email);
  const queryString = 'SELECT DISTINCT token FROM transactions WHERE userId = ? AND transactionType = "approve"';
  const queryResults = await executeQuery(queryString, [userId]);
  const tokens = queryResults.map(row => row.token);
  return tokens;
};

const updateBalancesIfNecessary = async (userId, token, transactionType, transactionAmountToPrincipal, transactionAmountToInterest) => {
  let queryString;
  if (transactionType === 'supply') {
    if (token === 'DAI') {
      queryString = 'UPDATE users SET daiPrincipal = daiPrincipal + ? WHERE userId = ?';
    } else if (token === 'USDC') {
      queryString = 'UPDATE users SET usdcPrincipal = usdcPrincipal + ? WHERE userId = ?';
    }
    return executeQuery(queryString, [transactionAmountToPrincipal, userId]);
  }

  if (transactionType === 'withdraw') {
    if (token === 'DAI') {
      queryString = 'UPDATE users SET daiPrincipal = daiPrincipal - ?, daiInterestWithdrawn = daiInterestWithdrawn + ? WHERE userId = ?';
    } else if (token === 'USDC') {
      queryString = 'UPDATE users SET usdcPrincipal = usdcPrincipal - ?, usdcInterestWithdrawn = usdcInterestWithdrawn + ? WHERE userId = ?';
    }
    return executeQuery(queryString, [transactionAmountToPrincipal, transactionAmountToInterest, userId]);
  }

  return null;
};

const deletePendingSupplies = async (userId, token) => {
  const queryString = 'DELETE FROM transactions WHERE userId = ? AND token = ? AND transactionType = "supply (in progress)"';
  return executeQuery(queryString, [userId, token]);
};

const writeTransactionDataAndUpdateBalances = async (email, dataObj) => {
  const data = dataObj;
  data.userId = await getUserId(email);

  const {
    userId,
    token,
    transactionType,
    transactionAmountToPrincipal,
    transactionAmountToInterest,
  } = data;

  await updateBalancesIfNecessary(userId, token, transactionType, transactionAmountToPrincipal, transactionAmountToInterest);

  const queryString = 'INSERT INTO transactions SET ?';
  await executeQuery(queryString, [data]);
  return deletePendingSupplies(userId, token);
};

const getGasPrice = async (transactionType) => {
  let results;
  if (transactionType === 'contract') {
    const queryString = 'SELECT contractGasPrice FROM gas';
    const queryResults = await executeQuery(queryString);
    results = queryResults[0].contractGasPrice;
  } else if (transactionType === 'transaction') {
    const queryString = 'SELECT transactionGasPrice FROM gas';
    const queryResults = await executeQuery(queryString);
    results = queryResults[0].transactionGasPrice;
  }
  return results;
};

module.exports = {
  checkoutAvailableAdminAddress,
  returnAdminAddress,
  writeUserData,
  updateLoginDataAndReturnCount,
  getPasswordHash,
  updateUserAddresses,
  getUserPrincipalAndInterestWithdrawn,
  getUserData,
  getDateOfFirstSupply,
  getUserTransactionHistory,
  pullApprovedTokens,
  writeTransactionDataAndUpdateBalances,
  getGasPrice,
};
