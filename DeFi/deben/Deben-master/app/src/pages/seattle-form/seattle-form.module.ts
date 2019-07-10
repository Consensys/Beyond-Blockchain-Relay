import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeattleFormPage } from './seattle-form';

@NgModule({
  declarations: [
    SeattleFormPage,
  ],
  imports: [
    IonicPageModule.forChild(SeattleFormPage),
  ],
})
export class SeattleFormPageModule {}
