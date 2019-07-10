const BigNumber = require('bignumber.js');
require('dotenv').config();
const path = require("path");

usePlugin("@nomiclabs/buidler-truffle5")
usePlugin("@nomiclabs/buidler-web3");

const INFURA_KEY = process.env["INFURA_KEY"];
const BNify = s => new BigNumber(String(s));

task("accounts", "Prints a list of the available accounts", async () => {
  const accounts = await ethereum.send("eth_accounts");
  const balances = await Promise.all(accounts.map(a => web3.eth.getBalance(a)));
  console.log("Accounts:", balances.map((b, i) => ({address: accounts[i], balance: web3.utils.fromWei(b, "ether")})));
});

task("iDAI", "Call method on iDAI contract. eg `npx buidler iDAI --method tokenPrice`")
  .addParam("method", "The method of the contract")
  .setAction(async taskArgs => {
    const iERC20 = artifacts.require('iToken');
    const iDAI = await iERC20.at('0x14094949152eddbfcd073717200da82fed8dc960'); // mainnet
    const res = await iDAI[taskArgs.method].call();

    console.log(`RES: ${res.toString()}`)
  });

task("cDAI", "Call method on cDAI contract. eg `npx buidler cDAI --method exchangeRateStored`")
  .addParam("method", "The method of the contract")
  .setAction(async taskArgs => {
    const cERC20 = artifacts.require('CERC20');
    const cDAI = await cERC20.at('0xf5dce57282a584d2746faf1593d3121fcac444dc'); // mainnet
    const res = await cDAI[taskArgs.method].call();

    console.log(`RES: ${res.toString()}`)
  });
task("cDAI:rate", "cDAI to DAI rate")
  .setAction(async taskArgs => {
    const cERC20 = artifacts.require('CERC20');
    const cDAI = await cERC20.at('0x6d7f0754ffeb405d23c51ce938289d4835be3b14'); // rinkeby
    let res = await cDAI.exchangeRateStored.call();
    res = BNify(1e18).div(BNify(res).div(1e18)).div(1e8);
    console.log(`RES: ${res.toString()}`)
  });

task("cDAI:apr", "Get apr")
  .setAction(async taskArgs => {
    const cERC20 = artifacts.require('CERC20');
    const cDAI = await cERC20.at('0xf5dce57282a584d2746faf1593d3121fcac444dc'); // mainnet
    let res = await cDAI.supplyRatePerBlock.call();

    res = BNify(res).times('2102400').times('100').integerValue(BigNumber.ROUND_FLOOR)
    console.log(`RES: ${res.toString()}`)
  });

task("TokenizedRegistry", "Call TokenizedRegistry")
  .setAction(async taskArgs => {
    const tokenizedRegistry = artifacts.require('TokenizedRegistry');
    const reg = await tokenizedRegistry.at('0xd03eea21041a19672e451bcbb413ce8be72d0381'); // ropsten
    let res = await reg.getTokens.call(BNify(0), BNify(20), BNify(0));

    console.log(`RES: ${res.toString()}`)
  });


module.exports = {
  version: '0.5.2',
  paths: {
    artifacts: "./client/src/contracts"
  },
  networks: {
    develop: {
      url: `https://ropsten.infura.io/v3/${INFURA_KEY}`
    }
  }
};
