import { Injectable } from '@angular/core';
import EthereumQRPlugin from 'ethereum-qr-code';
import { TransactionProvider } from './transaction';
import { Web3HelperProvider } from './web3-helper';

/*
  Generated class for the QrCodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QrCodeProvider {

  constructor(
    private transactionProvider: TransactionProvider,
    private web3Helper: Web3HelperProvider
  ) {
    console.log('Hello QrCodeProvider Provider');
  }

  async generate(amount, address?) {

    address = address || await this.web3Helper.getAccount();
    var amountInWei = await this.transactionProvider.getExpectedPriceInWei(amount);

    //https://github.com/jibrelnetwork/ethereum-qr-code
    return new EthereumQRPlugin().toDataUrl({
      to: this.transactionProvider.address,
      value: amountInWei.expectedPrice,
      //gas: 100000,
      //from: "0xsenderaddress",
      //chainId:"",

      mode: "contract_function",
      functionSignature: {
        name: "pay",
        payable: true,
        args: [
          {
            name: "seller",
            type: "address"
          },
          {
            name: "localAmount",
            type: "uint"
          }
        ]
      },
      argsDefaults: [
        {
          name: "seller",
          value: address
        },
        {
          name: "localAmount",
          value: amount
        }
      ]

    })
  }

  async parse(qrCode) {
    qrCode = JSON.parse(qrCode);
    return this.transactionProvider.generateReceipt(qrCode.argsDefaults[0].value, qrCode.argsDefaults[1].value);
  }

}
