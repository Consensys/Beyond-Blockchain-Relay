import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { PaymentFormPage } from '../payment-form/payment-form';
import { TransactionsPage } from '../transactions/transactions';

/**
 * Generated class for the BuyerPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buyer',
  templateUrl: 'buyer.html'
})
export class BuyerPage {

  pages = [
    { title: 'Pay', component: PaymentFormPage, icon: 'cash', params: {} },
    { title: 'Transactions', component: TransactionsPage, icon: 'filing', params: { type: 'buyer' } }
  ];

  constructor(public navCtrl: NavController) { }

}
