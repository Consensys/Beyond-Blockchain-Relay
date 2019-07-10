import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { QrCodeProvider } from '../../providers/qr-code'
import { Web3HelperProvider } from '../../providers/web3-helper';
import { PaymentQrCodePage } from '../payment-qr-code/payment-qr-code';

declare var blockies;

/**
 * Generated class for the CreateTransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-transaction',
  templateUrl: 'create-transaction.html',
})
export class CreateTransactionPage {
  account: string;
  qrForm: FormGroup;
  generating: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private qrCodeProvider: QrCodeProvider,
    private web3Helper: Web3HelperProvider,
    private modalCtrl: ModalController
  ) {

    this.qrForm = this.formBuilder.group({
      amount: ['', [Validators.required]],
      account: [{ value: '', disabled: true }, [Validators.required]],
      //currency: ['', [Validators.required]]
    });

    this.web3Helper.getAccount().then((account) => {
      this.account = account;
      this.qrForm.controls['account'].setValue(this.account);
    });

    // this.qrForm.valueChanges.subscribe((val) => this.genQRcode(val));
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad CreateTransactionPage');
  }

  async genQRcode(val?) {
    val = val || this.qrForm.value;

    if (val && this.qrForm.valid) {
      this.generating = true;

      let qrCode = await this.qrCodeProvider.generate(val.amount);

      let paymentQrCodeModal = this.modalCtrl.create(PaymentQrCodePage, {
        dataURL: qrCode.dataURL,
        amount: val.amount,
        account: this.account,
      });
      paymentQrCodeModal.present();

      this.generating = false;
      this.qrForm.reset({ account: this.account });
    }
  }

}
