import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentFormPage } from './payment-form';

@NgModule({
  declarations: [
    PaymentFormPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentFormPage),
  ],
})
export class PaymentFormPageModule {}
