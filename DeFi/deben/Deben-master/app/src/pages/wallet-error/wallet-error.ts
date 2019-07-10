import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WalletErrorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet-error',
  templateUrl: 'wallet-error.html',
})
export class WalletErrorPage {

  error = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.error = navParams.get("error");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletErrorPage');
  }

}
