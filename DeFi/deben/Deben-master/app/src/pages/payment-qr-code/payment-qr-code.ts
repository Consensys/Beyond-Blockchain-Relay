import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { TransactionProvider } from '../../providers/transaction';
import { PaymentConfirmationPage } from '../payment-confirmation/payment-confirmation';

/**
 * Generated class for the PaymentQrCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-qr-code',
  templateUrl: 'payment-qr-code.html',
})
export class PaymentQrCodePage {

  account;
  localAmount;
  dataURL;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    private transactionProvider: TransactionProvider
  ) {
    this.dataURL = this.navParams.get('dataURL');
    this.account = this.navParams.get('account');
    this.localAmount = this.navParams.get('amount');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentQrCodePage');
    this.transactionProvider.getNextPaid(this.localAmount).then((tran) => {
      let modal = this.modalCtrl.create(PaymentConfirmationPage, {
        invoice: tran,
        confirmation: true
      });
      this.dismiss();
      modal.present();
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
