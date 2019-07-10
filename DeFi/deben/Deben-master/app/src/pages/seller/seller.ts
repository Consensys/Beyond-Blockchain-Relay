import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { CreateTransactionPage } from '../create-transaction/create-transaction';
import { TransactionsPage } from '../transactions/transactions';

/**
 * Generated class for the SellerPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-seller',
  templateUrl: 'seller.html'
})
export class SellerPage {

  pages = [
    { title: 'New', component: CreateTransactionPage, icon: 'add', params: {} },
    { title: 'Transactions', component: TransactionsPage, icon: 'cash', params: {type:'seller'} }
  ];

  constructor(public navCtrl: NavController) { }

}
