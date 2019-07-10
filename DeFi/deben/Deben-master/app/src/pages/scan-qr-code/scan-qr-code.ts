import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

declare var Instascan;

/**
 * Generated class for the ScanQrCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan-qr-code',
  templateUrl: 'scan-qr-code.html',
})
export class ScanQrCodePage {
  public scanner: any;
  public cameras: any;
  public isCameraAvailable: boolean;
  public currentCamera: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  dismiss(content?: string) {
    this.viewCtrl.dismiss(content);
  }

  async setupScanner() {
    try {
      this.cameras = await Instascan.Camera.getCameras();
      this.isCameraAvailable = this.cameras.length > 0;
      if (this.isCameraAvailable) this.currentCamera = this.cameras[this.cameras.length - 1];
    }
    catch (err) {
      console.error('getCameras', err);
    }
    this.scanner = new Instascan.Scanner({
      // The HTML element to use for the camera's video preview. Must be a <video> element.
      // When the camera is active, this element will have the "active" CSS class, otherwise,
      // it will have the "inactive" class. By default, an invisible element will be created to
      // host the video.
      video: document.getElementById('preview'),
      // Whether to horizontally mirror the video preview. This is helpful when trying to
      // scan a QR code with a user-facing camera. Default true.
      mirror: false
    });
    this.scanner.addListener('scan', content => this.dismiss(content));
  }

  async ionViewWillEnter() {
    await this.setupScanner();
    if (this.currentCamera) {
      this.scanner.start(this.currentCamera);
    } else {
      console.error('No cameras found.');
    }
  }

  ionViewWillLeave() {
    this.scanner.stop();
  }

}