import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentQrCodePage } from './payment-qr-code';

@NgModule({
  declarations: [
    PaymentQrCodePage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentQrCodePage),
  ],
})
export class PaymentQrCodePageModule {}
