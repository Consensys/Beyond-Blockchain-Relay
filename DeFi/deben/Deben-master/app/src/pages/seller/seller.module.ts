import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SellerPage } from './seller';

@NgModule({
  declarations: [
    SellerPage,
  ],
  imports: [
    IonicPageModule.forChild(SellerPage),
  ]
})
export class SellerPageModule {}
