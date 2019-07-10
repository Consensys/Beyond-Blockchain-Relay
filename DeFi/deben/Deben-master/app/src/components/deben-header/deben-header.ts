import { Component } from '@angular/core';

/**
 * Generated class for the DebenHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'deben-header',
  templateUrl: 'deben-header.html'
})
export class DebenHeaderComponent {

  text: string;

  constructor() {
    console.log('Hello DebenHeaderComponent Component');
    this.text = 'Hello World';
  }

}
