import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { DebenHeaderComponent } from './deben-header/deben-header';
import { AccountIconComponent } from './account-icon/account-icon';

@NgModule({
	declarations: [DebenHeaderComponent, AccountIconComponent],
	imports: [CommonModule, IonicModule],
	exports: [DebenHeaderComponent, AccountIconComponent]
})
export class ComponentsModule { }
