import { Injectable } from '@angular/core';
import { Web3HelperProvider } from './web3-helper';

/*
  Generated class for the TransactionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TransactionProvider {

  public contract = new this.web3Helper.web3.eth.Contract(
    [{ "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "invoices", "outputs": [{ "name": "seller", "type": "address" }, { "name": "buyer", "type": "address" }, { "name": "liquidityProvider", "type": "address" }, { "name": "localAmount", "type": "uint256" }, { "name": "stableCoinAmount", "type": "uint256" }, { "name": "weiAmount", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "renounceOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "USD2EGP", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "seller", "type": "address" }, { "indexed": true, "name": "buyer", "type": "address" }, { "indexed": true, "name": "invoiceId", "type": "uint256" }, { "indexed": false, "name": "change", "type": "uint256" }], "name": "Paid", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "seller", "type": "address" }, { "indexed": true, "name": "liquidityProvider", "type": "address" }, { "indexed": true, "name": "invoiceId", "type": "uint256" }], "name": "Settled", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "previousOwner", "type": "address" }], "name": "OwnershipRenounced", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "constant": true, "inputs": [], "name": "invoicesLength", "outputs": [{ "name": "length", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_USD2EGP", "type": "uint256" }], "name": "updateExchangerate", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getExpectedRateInWei", "outputs": [{ "name": "expectedRate", "type": "uint256" }, { "name": "slippageRate", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "localAmount", "type": "uint256" }], "name": "getExpectedPriceInWei", "outputs": [{ "name": "expectedPrice", "type": "uint256" }, { "name": "slippagePrice", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "localAmount", "type": "uint256" }], "name": "getExpectedPriceInStable", "outputs": [{ "name": "price", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "seller", "type": "address" }, { "name": "localAmount", "type": "uint256" }], "name": "pay", "outputs": [{ "name": "invoiceId", "type": "uint256" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "invoicesIndex", "type": "uint256[]" }, { "name": "liquidityProvider", "type": "address" }], "name": "settle", "outputs": [{ "name": "totalDAI", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }],
    "0x22529f0c2ac84fbdf1b3b523deabce9ffdd03496"
  );

  public web3 = this.web3Helper.web3;

  constructor(private web3Helper: Web3HelperProvider) {
  }

  public get address() { return this.contract.options.address; }
  public get abi() { return this.contract.options.jsonInterface; }

  public async getExpectedPriceInWei(localAmount: number) {
    return this.contract.methods.getExpectedPriceInWei(localAmount).call();
  }

  async generateReceipt(seller, localAmount) {
    var amountInWei = await this.getExpectedPriceInWei(localAmount);
    return {
      slippagePrice: {
        eth: amountInWei.slippagePrice / Math.pow(10, 18),
        wei: amountInWei.slippagePrice
      },
      expectedPrice: {
        eth: amountInWei.expectedPrice / Math.pow(10, 18),
        wei: amountInWei.expectedPrice
      },
      seller: {
        address: seller
      },
      local: {
        currency: "EGP",
        amount: localAmount
      }
    }
  }

  public async pay(seller: string, localAmount: number) {
    return this.contract.methods.pay(seller, localAmount).send({
      from: await this.web3Helper.getAccount(),
      value: (await this.getExpectedPriceInWei(localAmount)).slippagePrice,
      //gas: 500000
    });
  }

  public async settle(invoicesIndex: number[], liquidityProvider: string) {
    return this.contract.methods.settle(invoicesIndex, liquidityProvider).send({
      from: await this.web3Helper.getAccount()
    });
  }

  public async getInvoice(id) {
    let paidEvents = await this.contract.getPastEvents('Paid', {
      filter: { invoiceId: id }, fromBlock: 0, toBlock: 'latest'
    });

    let settledEvents = await this.contract.getPastEvents('Settled', {
      filter: { invoiceId: id }, fromBlock: 0, toBlock: 'latest'
    });

    let invo = await this.contract.methods.invoices(id).call();

    return {
      id: id,

      seller: invo.seller,
      buyer: invo.buyer,
      liquidityProvider: invo.liquidityProvider,

      localAmount: invo.localAmount,
      stableCoinAmount: invo.stableCoinAmount,
      weiAmount: invo.weiAmount,
      ethAmount: invo.weiAmount / Math.pow(10, 18),

      paid: paidEvents[0] || null,
      paidAt: paidEvents[0] ? new Date((await this.web3.eth.getBlock(paidEvents[0].blockNumber)).timestamp * 1000) : null,

      settled: settledEvents[0] || null,
      settledAt: settledEvents[0] ? new Date((await this.web3.eth.getBlock(settledEvents[0].blockNumber)).timestamp * 1000) : null,
    };
  }

  public async getUnsettled({ inVoices = [] }) {

    let filter = {
      seller: await this.web3Helper.getAccount()
    }

    let paidEvents = await this.contract.getPastEvents('Paid', {
      filter: filter, fromBlock: 0, toBlock: 'latest'
    });

    let settledEvents = await this.contract.getPastEvents('Settled', {
      filter: filter, fromBlock: 0, toBlock: 'latest'
    });

    let settled = [];
    for (const key in settledEvents) {
      let id = parseInt(settledEvents[key].returnValues.invoiceId, 10);
      settled[id] = false;
    }

    for (const key in paidEvents) {
      let id = parseInt(paidEvents[key].returnValues.invoiceId, 10);
      if (!settled[id]) {
        inVoices.push(await this.getInvoice(id));
      }
    }

    return inVoices;
  }

  public async getPaid({ inVoices = [], filter = {}, fromBlock = 0, toBlock = 'latest' }) {

    let events = await this.contract.getPastEvents('Paid', {
      filter: filter, fromBlock: fromBlock, toBlock: toBlock
    });

    for (const key in events) {
      let id = parseInt(events[key].returnValues.invoiceId, 10);
      inVoices.push(await this.getInvoice(id));
    }
    inVoices.map(inVoice => inVoice.checked = false);
    return inVoices;
  }

  public async getNextPaid(localAmount, interval = 4000) {
    return new Promise(async (resolve, reject) => {
      let lastBlock = this.web3.eth.blockNumber;

      let activeInterval = setInterval(async () => {
        let trans = await this.getPaid({
          filter: {
            seller: await this.web3Helper.getAccount()
          }, fromBlock: lastBlock
        });
        for (const key in trans) {
          let tra = trans[key];
          if (tra.localAmount == localAmount) {
            clearTimeout(activeInterval);
            resolve(tra);
          }
        }
      }, interval);

      //this.contract.once('Paid', { filter: filter, fromBlock: 0 }, function (error, event) { error ? reject(error) : resolve(event); });
    });
  }

}
