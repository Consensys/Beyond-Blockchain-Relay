import { Component, Input, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

declare var blockies;

/**
 * Generated class for the AccountIconComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'account-icon',
  templateUrl: 'account-icon.html'
})
export class AccountIconComponent implements AfterViewInit {

  @ViewChild('accountIconParent') accountIconParent: ElementRef;

  private _account: string;

  @Input()
  size: number = 5;

  @Input()
  scale: number = 10;

  icon: HTMLCanvasElement;

  constructor(
    private renderer: Renderer2,
  ) { }

  get account(): string {
    return this._account;
  }

  @Input()
  set account(account: string) {
    if (account && account !== this._account) {
      this._account = account.toLowerCase();
      this.renderIconCanvas();
    };
  }

  generateIconCanvas() {
    let icon = blockies.create({ // All options are optional
      seed: this._account, // seed used to generate icon data, default: random
      size: this.size, // width/height of the icon in blocks, default: 8
      scale: this.scale, // width/height of each block in pixels, default: 4
    });
    return icon;
  }

  renderIconCanvas() {
    this.icon = this.generateIconCanvas();
    Array.from(this.accountIconParent.nativeElement.children).forEach(child => {
      this.renderer.removeChild(this.accountIconParent.nativeElement, child);
    });
    this.renderer.appendChild(this.accountIconParent.nativeElement, this.icon);
  }

  ngAfterViewInit() {
    this.renderIconCanvas();
  }

}
