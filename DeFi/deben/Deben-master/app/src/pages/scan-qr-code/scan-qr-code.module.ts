import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanQrCodePage } from './scan-qr-code';

@NgModule({
  declarations: [
    ScanQrCodePage,
  ],
  imports: [
    IonicPageModule.forChild(ScanQrCodePage),
  ]
})
export class ScanQrCodePageModule { }
