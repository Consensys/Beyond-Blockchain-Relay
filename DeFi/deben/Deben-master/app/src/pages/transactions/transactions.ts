import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
import { TransactionProvider } from '../../providers/transaction'
import { Web3HelperProvider } from '../../providers/web3-helper';
import { PaymentConfirmationPage } from '../payment-confirmation/payment-confirmation';
/**
 * Generated class for the TransactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {

  screenWidth = screen.width;
  type;
  transactions = [];
  allTransactions = [];
  checkedTransactions = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private transactionProvider: TransactionProvider,
    private web3Helper: Web3HelperProvider
  ) {
    this.loadTransactions()
  }

  async loadTransactions() {
    this.transactions = [];
    this.allTransactions = this.transactions;

    this.type = this.navParams.get("type");
    let filter = {};
    filter[this.type] = await this.web3Helper.getAccount()
    return (await this.transactionProvider.getPaid({
      inVoices: this.transactions,
      filter: filter
    }));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionsPage');
  }

  async doRefresh(refresher) {
    await this.loadTransactions();
    refresher.complete();
  }

  toggleCheckedTranscation(event, checkedTranscation: any) {
    if (event.checked) {
      this.checkedTransactions.push(checkedTranscation);
    } else {
      let index = this.removeCheckedTransaction(checkedTranscation);
      this.checkedTransactions.splice(index, 1);
    }
  }

  removeCheckedTransaction(checkedTranscation: any) {
    return this.checkedTransactions.findIndex((transcation) => {
      return transcation === checkedTranscation;
    })
  }

  emptyCheckedTransactions() {
    this.checkedTransactions = [];
  }

  onSettleClicked() {
    this.transactionProvider.settle(this.checkedTransactions.map(tra => tra.id), "0x0000000000000000000000000000000000000000");
    this.emptyCheckedTransactions();
  }

  getItems(event) {

    // set val to the value of the searchbar
    const val = event.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.transactions = this.allTransactions.filter((item) => {
        console.log(item.localAmount.toString().indexOf(val.toLowerCase()));
        return (item.buyer.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (item.seller.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (item.localAmount.toString().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.transactions = this.allTransactions;
    }
  }

  onCancel(event) {
    this.transactions = this.allTransactions;
    console.log(event);
  }

  openInvoiceModal(invo) {
    let modal = this.modalCtrl.create(PaymentConfirmationPage, {
      invoice: invo
    });
    modal.present();
  }

}
