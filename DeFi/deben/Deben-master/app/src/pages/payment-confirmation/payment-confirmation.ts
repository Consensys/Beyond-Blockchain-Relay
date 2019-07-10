import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TransactionProvider } from '../../providers/transaction';

/**
 * Generated class for the PaymentConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-confirmation',
  templateUrl: 'payment-confirmation.html',
})
export class PaymentConfirmationPage {

  transactionReceipt;
  invoice;
  confirmation;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public transactionProvider: TransactionProvider
  ) {
    this.transactionReceipt = this.navParams.get("transactionReceipt");
    this.invoice = this.navParams.get("invoice");
    this.confirmation = this.navParams.get("confirmation");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentConfirmationPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
