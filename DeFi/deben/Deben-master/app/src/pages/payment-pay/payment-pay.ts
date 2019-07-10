import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, ModalController, AlertController } from 'ionic-angular';
import { TransactionProvider } from '../../providers/transaction';
import { PaymentConfirmationPage } from '../payment-confirmation/payment-confirmation';

/**
 * Generated class for the PaymentPayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-pay',
  templateUrl: 'payment-pay.html',
})
export class PaymentPayPage {

  receipt;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    private transactionProvider: TransactionProvider,
    private alertCtrl: AlertController
  ) {
    this.receipt = this.navParams.get('receipt')
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPayPage');
  }

  async pay() {
    let loading = this.loadingCtrl.create({
      content: 'Waiting for transaction confirmation...'
    });
    loading.present();
    try {
      var transactionReceipt = await this.transactionProvider.pay(this.receipt.seller.address, this.receipt.local.amount);
      console.log(transactionReceipt);
      let invoiceIndex = parseInt(transactionReceipt.events.Paid.returnValues.invoiceId, 10);
      let invoice = await this.transactionProvider.getInvoice(invoiceIndex);

      this.viewCtrl.dismiss();
      loading.dismiss();

      let modal = this.modalCtrl.create(PaymentConfirmationPage, {
        transactionReceipt: transactionReceipt,
        invoice: invoice,
        confirmation: true
      });
      modal.present();

    } catch (err) {
      console.warn("agg", err);
      this.viewCtrl.dismiss();
      loading.dismiss();

      let alert = this.alertCtrl.create({
        title: 'Failed',
        subTitle: 'Transaction failed, make sure all the parameters are correct',
        buttons: ['Dismiss']
      });
      alert.present();
    }

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
