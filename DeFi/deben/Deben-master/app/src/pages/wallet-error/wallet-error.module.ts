import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletErrorPage } from './wallet-error';

@NgModule({
  declarations: [
    WalletErrorPage,
  ],
  imports: [
    IonicPageModule.forChild(WalletErrorPage),
  ],
})
export class WalletErrorPageModule {}
