import { Injectable } from '@angular/core';
import Web3 from 'web3';

/*
  Generated class for the Web3HelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Web3HelperProvider {

  web3;

  constructor() {
    console.log('Hello Web3HelperProvider Provider');
    this.web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  }

  async getAccount(i = 0) {
    return (await this.web3.eth.getAccounts())[i];
  }

  hasWallet() {
    return Web3.givenProvider != null;
  }

  async isAccountUnlocked() {
    return (await this.web3.eth.getAccounts()).length > 0;
  }

  async isOnProperNetwork(){
    return (await this.web3.eth.net.getNetworkType()) == 'ropsten';
  }

}
