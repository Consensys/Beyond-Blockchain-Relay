import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateTransactionPage } from './create-transaction';

@NgModule({
  declarations: [
    CreateTransactionPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateTransactionPage),
  ],
})
export class CreateTransactionPageModule {}
