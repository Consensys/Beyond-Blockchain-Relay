USE lending_dapp;

CREATE TABLE users (
  userId INTEGER(7) NOT NULL AUTO_INCREMENT,
  name VARCHAR(40),
  email VARCHAR(320),
  passwordHash VARCHAR(60),
  dateJoined DATETIME DEFAULT CURRENT_TIMESTAMP,
  daiPrincipal DECIMAL(18,8) DEFAULT 0,
  daiInterestWithdrawn DECIMAL(16,8) DEFAULT 0,
  usdcPrincipal DECIMAL(18,8) DEFAULT 0,
  usdcInterestWithdrawn DECIMAL(16,8) DEFAULT 0,
  userAddress VARCHAR(42),
  contractAddress VARCHAR(42),
  contractVersion VARCHAR(5),
  loginCount INTEGER(5) DEFAULT 0,
  lastLogin DATETIME,
  PRIMARY KEY(userId)
);

CREATE TABLE transactions (
  transactionId INTEGER(9) NOT NULL AUTO_INCREMENT,
  userId INTEGER(9),
  transactionType VARCHAR(20),
  token CHAR(4),
  transactionAmountToPrincipal DECIMAL(18,8) DEFAULT 0,
  transactionAmountToInterest DECIMAL(16,8) DEFAULT 0,
  transactionDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  txHash VARCHAR(66),
  PRIMARY KEY (transactionId),
  FOREIGN KEY (userId)
    REFERENCES users (userId)
);

CREATE TABLE admin (
  adminId INTEGER (3) NOT NULL AUTO_INCREMENT,
  adminAddress VARCHAR(42),
  active VARCHAR(1),
  PRIMARY KEY (adminId)
);

CREATE TABLE gas (
  contractGasPrice Decimal(3,1),
  transactionGasPrice Decimal(3,1)
);

CREATE TABLE interestRates (
  sevenDay Decimal(6,4),
  thirtyDay Decimal(6,4),
  sixtyDay Decimal(6,4)
);

CREATE TABLE exchangeRates (
  exchangeRate Decimal(20,20)
);
