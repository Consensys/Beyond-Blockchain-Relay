import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TransactionsPage } from '../pages/transactions/transactions';
import { CreateTransactionPage } from '../pages/create-transaction/create-transaction';
import { ScanQrCodePage } from '../pages/scan-qr-code/scan-qr-code';

import { TransactionProvider } from '../providers/transaction';
import { QrCodeProvider } from '../providers/qr-code';
import { PaymentConfirmationPage } from '../pages/payment-confirmation/payment-confirmation';
import { PaymentFormPage } from '../pages/payment-form/payment-form';
import { SeattleFormPage } from '../pages/seattle-form/seattle-form';
import { PaymentPayPage } from '../pages/payment-pay/payment-pay';
import { Web3HelperProvider } from '../providers/web3-helper';
import { SellerPage } from '../pages/seller/seller';
import { BuyerPage } from '../pages/buyer/buyer';
import { ComponentsModule } from '../components/components.module';
import { PaymentQrCodePage } from '../pages/payment-qr-code/payment-qr-code';
import { WalletErrorPage } from '../pages/wallet-error/wallet-error';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TransactionsPage,
    CreateTransactionPage,
    ScanQrCodePage,
    PaymentQrCodePage,
    PaymentFormPage,
    SeattleFormPage,
    PaymentPayPage,
    PaymentConfirmationPage,
    SellerPage,
    BuyerPage,
    WalletErrorPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { /*locationStrategy: 'path' */}, {
      links: [
        { component: SellerPage, name: 'SellerPage', segment: 'seller' },
        { component: BuyerPage, name: 'BuyerPage', segment: 'buyer' }
      ]
    }),
    BrowserAnimationsModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TransactionsPage,
    CreateTransactionPage,
    ScanQrCodePage,
    PaymentQrCodePage,
    PaymentFormPage,
    SeattleFormPage,
    PaymentPayPage,
    PaymentConfirmationPage,
    SellerPage,
    BuyerPage,
    WalletErrorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    TransactionProvider,
    QrCodeProvider,
    Web3HelperProvider
  ]
})
export class AppModule { }
