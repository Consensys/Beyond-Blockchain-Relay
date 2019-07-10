import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SellerPage } from '../seller/seller';
import { BuyerPage } from '../buyer/buyer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) { }

  goToBuyer() { this.navCtrl.push(BuyerPage); }

  goToSeller() { this.navCtrl.push(SellerPage); }

}
