import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentConfirmationPage } from './payment-confirmation';

@NgModule({
  declarations: [
    PaymentConfirmationPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentConfirmationPage),
  ],
})
export class PaymentConfirmationPageModule {}
