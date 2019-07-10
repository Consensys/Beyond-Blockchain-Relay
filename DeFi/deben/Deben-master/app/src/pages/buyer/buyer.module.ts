import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyerPage } from './buyer';

@NgModule({
  declarations: [
    BuyerPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyerPage),
  ]
})
export class BuyerPageModule {}
