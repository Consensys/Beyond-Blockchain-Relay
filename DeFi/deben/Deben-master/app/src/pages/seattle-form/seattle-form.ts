import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, ToastController, ModalController } from 'ionic-angular';
import { ScanQrCodePage } from '../../pages/scan-qr-code/scan-qr-code';
import { TransactionProvider } from '../../providers/transaction';
import { PaymentPayPage } from '../payment-pay/payment-pay';

import 'rxjs/add/operator/debounceTime';

/**
 * Generated class for the SeattleFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-seattle-form',
  templateUrl: 'seattle-form.html',
})
export class SeattleFormPage {

  qrForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private transactionProvider: TransactionProvider
  ) {
    this.qrForm = this.formBuilder.group({
      address: ['', [Validators.required]],
      amount: ['', [Validators.required]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeattleFormPage');
  }

  openScannerModal() {
    let scannerModal = this.modalCtrl.create(ScanQrCodePage);
    scannerModal.present();

    scannerModal.onDidDismiss(content => {
      if (content) {
        console.log(content);
        let scannedQRcode = JSON.parse(content);
        this.toastCtrl.create({
          message: 'QR Scanned successfully!',
          duration: 3000,
          position: 'bottom'
        }).present();

        this.qrForm.controls['address'].setValue(scannedQRcode.argsDefaults[0].value);
        this.qrForm.controls['amount'].setValue(scannedQRcode.argsDefaults[1].value);
        this.onSubmit();
      }
    })
  }

  async onSubmit() {
    let loading = this.loadingCtrl.create({
      content: 'Fetching receipt info...'
    });
    loading.present();

    let receipt = await this.transactionProvider.generateReceipt(
      this.qrForm.controls['address'].value,
      this.qrForm.controls['amount'].value
    );

    let seattlePayModal = this.modalCtrl.create(PaymentPayPage, { receipt: receipt });
    seattlePayModal.present();
    loading.dismiss();
  }

}
