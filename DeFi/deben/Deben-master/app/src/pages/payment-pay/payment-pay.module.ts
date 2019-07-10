import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentPayPage } from './payment-pay';

@NgModule({
  declarations: [
    PaymentPayPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentPayPage),
  ],
})
export class PaymentPayPageModule {}
