import { Injectable } from '@angular/core';
import contract from 'truffle-contract';
declare let require: any;
const Web3 = require('web3');
const trueNews = require('../../assets/contracts/NewsLimited.json');
declare let window: any;

@Injectable()
export class Web3Service {
  private web3: any;
  private web3EventReader: any;
  private accounts: string[];
  public ready = false;

  account;
  newscontract = contract(trueNews);
  status: string;
  constructor() {
    this.bootstrapWeb3();
  }

  public bootstrapWeb3() {
    Web3.providers.HttpProvider.prototype.sendAsync =
      Web3.providers.HttpProvider.prototype.send;
    const wsProviderUrl = 'wss://ropsten.infura.io/ws';
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
      this.web3EventReader = new Web3(wsProviderUrl);
      this.newscontract.setProvider(this.web3.currentProvider);
    } else {
      console.log('No web3? You should consider trying MetaMask!');

      // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
      Web3.providers.HttpProvider.prototype.sendAsync =
        Web3.providers.HttpProvider.prototype.send;
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      const wsLocalProviderUrl = 'ws://127.0.0.1:8545';

      this.web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:8545')
      );
      this.web3EventReader = new Web3(wsLocalProviderUrl);
      this.newscontract.setProvider(this.web3.currentProvider);
    }
    this.onReady();

    // const subscription = this.web3.eth
    //   .subscribe('newBlockHeaders', (error, blockHeader) => {
    //     if (error) return console.error(error);

    //     console.log('Successfully subscribed!', blockHeader);
    //   })
    //   .on('data', blockHeader => {
    //     console.log('data: ', blockHeader);
    //   });

    // // unsubscribes the subscription
    // subscription.unsubscribe((error, success) => { "0x40c7CD1020a177a514e0009b6989C14a69A6d192","0x8D9bA8F703d3b0a6e71D3950464d3541Cfb47Ff1"
    //   if (error) return console.error(error);

    //   console.log('Successfully unsubscribed!');
    // });
    //  setInterval(() => this.refreshProvider(this.web3, providerUrl), 100);
  }
  onReady() {
    // Bootstrap the IdentityManager abstraction for Use.
    this.web3.eth.net.getNetworkType().then(console.log);
    // Get the initial account balance so it can be displayed.
    this.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        alert('There was an error fetching your accounts.');
        return;
      }

      if (accs.length === 0) {
        alert(
          "Couldn't get any accounts! Make sure your Ethereum client is configured correctly."
        );
        return;
      }
      this.accounts = accs;
      this.account = this.accounts[0];
      console.log('this.account', this.account);
      // this.initplz(
      //   '0x8D9bA8F703d3b0a6e71D3950464d3541Cfb47Ff1',
      //   '0x8D9bA8F703d3b0a6e71D3950464d3541Cfb47Ff1'
      // ).
      //  this.refreshBalance();
    });
  }
  async getCurrentAccount() {
    this.accounts = await this.web3.eth.getAccounts();
    if (this.accounts.length === 0) {
      alert(
        `Couldn't get any accounts! Make sure your Ethereum client is configured correctly.`
      );
      return;
    }

    this.account = this.accounts[0];
    return this.account;
  }

  getCurrentProvider() {
    return this.web3.currentProvider;
  }

  setStatus(message: string) {
    this.status = message;
  }

  /**
   * Setter functions
   */

  async Rumors(url) {
    const result = await this.newscontract
      .deployed()
      .then(instance => {
        console.log(instance, 'instance');

        return instance.Rumors(
          url,

          {
            from: this.account
          }
        );
      })
      .then(res => {
        this.setStatus('Transaction complete!');
        return res;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }
  async initplz(url1, url2) {
    const result = await this.newscontract
      .deployed()
      .then(instance => {
        console.log(instance, 'instance');

        return instance.initplz(
          url1,
          url2,

          {
            from: this.account
          }
        );
      })
      .then(res => {
        this.setStatus('Transaction complete!');
        return res;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }
  async support(_jor, _amount) {
    const result = await this.newscontract
      .deployed()
      .then(instance => {
        return instance.support(
          _jor,
          _amount,

          {
            from: this.account
          }
        );
      })
      .then(res => {
        this.setStatus('Transaction complete!');
        return res;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }
  async rumorEvent() {
    return await this.newscontract
      .rumor(
        {
          filter: {
            myIndexedParam: [20, 23],
            myOtherIndexedParam: '0x123456789...'
          }, // Using an array means OR: e.g. 20 or 23
          fromBlock: 0
        },
        (error, event) => {
          console.log(event, ' fall back');
        }
      )
      .on('data', event => {
        console.log(event, 'data'); // same results as the optional callback above
      })
      .on('changed', event => {
        // remove event from local database
        console.log(event, 'changed');
      })
      .on('error', console.error);
  }
  async rumorEvent2() {
    return await this.newscontract
      .rumor({}, { fromBlock: 0, toBlock: 'latest' })
      .get((error, eventResult) => {
        if (error) {
          return error;
        } else {
          return JSON.stringify(eventResult);
        }
      });
  }
  async rumorEvent3() {
    console.log(this.web3, 'web3');

    const result = await this.newscontract
      .deployed()
      .then(instance => {
        console.log(instance, 'instance');

        return instance
          .rumor({}, { fromBlock: 0, toBlock: 'latest' })
          .get((error, eventResult) => {
            if (error) {
              return error;
            } else {
              return JSON.stringify(eventResult);
            }
          });
      })
      .then(res => {
        this.setStatus('Transaction complete!');
        return res;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }
  async getCount() {
    console.log('decimals');
    const result = await this.newscontract
      .deployed()
      .then(instance => {
        // meta = instance;
        console.log('instance', instance);

        return instance.rumorsCount.call();
      })
      .then(rs => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');

        return rs.toNumber();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }
  async getRumor(id) {
    console.log('decimals');
    const result = await this.newscontract
      .deployed()
      .then(instance => {
        // meta = instance;
        console.log('instance', instance);

        return instance.getRumor.call(id);
      })
      .then(rs => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }
  eventTest() {
    // myContract.events
    //   .rumor(
    //     {
    //       filter: {
    //         myIndexedParam: [20, 23],
    //         myOtherIndexedParam: '0x123456789...'
    //       }, // Using an array means OR: e.g. 20 or 23
    //       fromBlock: 0
    //     },
    //     (error, event) => {
    //       console.log(event);
    //     }
    //   )
    //   .on('data', event => {
    //     console.log(event); // same results as the optional callback above
    //   })
    //   .on('changed', event => {
    //     // remove event from local database
    //   })
    //   .on('error', console.error);
  }

  /**
   * Refreshes provider instance and attaches even handlers to it
   */
  refreshProvider(web3Obj, providerUrl) {
    const provider = new Web3.providers.WebsocketProvider(providerUrl);

    provider.on('end', event => this.retry(event, web3Obj, providerUrl));
    provider.on('error', event => this.retry(event, web3Obj, providerUrl));

    web3Obj.setProvider(provider);

    console.log('New Web3 provider initiated');

    return provider;

    // refreshProvider(web3, 'wss://mainnet.infura.io');
  }

  retry(event, web3Obj, providerUrl) {
    let retries = 0;

    if (event) {
      console.log('Web3 provider disconnected or errored.');
      retries += 1;

      if (retries > 5) {
        console.log(`Max retries of 5 exceeding: ${retries} times tried`);
        return setTimeout(this.refreshProvider(web3Obj, providerUrl), 5000);
      }
    } else {
      console.log(`Reconnecting web3 provider`);
      this.refreshProvider(web3Obj, providerUrl);
    }

    return null;
  }
}
