require('dotenv').config({path: __dirname + '/.env'})

module.exports = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/healthcare-dapp',
  SECRET: process.env.SECRET || 'fc545f1731e52071edb34a93ca8c5d41dc3959ae2fa9764184a2e1d74f0551f2e377d4d45bd3cd0ce32808780207b8873fba39d216269218875878e843cab342'
};
