import { Web3Service } from 'src/app/utils/web3.service';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID
} from '@angular/core';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';
import { ROUTES_CONFIG } from '../../../configs/routes.config';
// import { CookieService } from 'ngx-cookie';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition(
        '* => *',
        useAnimation(fadeIn, {
          params: { timing: 1, delay: 0 }
        })
      )
    ])
  ],
  providers: [Web3Service]
})
export class ArticleCardComponent implements OnInit {
  /**description: "Welcome to Medium, a place where words matter. Medium taps into the brains of the world’s most insightful writers, thinkers, and storytellers to bring you the smartest takes on topics that matter. So whatever your interest, you can always find fresh thinking and unique perspectives."
image: "https://cdn-images-1.medium.com/max/1200/1*L0zf9ap8xoInVbm78siJBA.png"
title: "Medium – a place to read and write big ideas and important stories"
url: "https://medium.com/" */

  @Input() article;

  canVote: boolean;
  isBrowser: boolean;

  constructor(
    // private heroService: HeroService,
    private router: Router,
    private snackBar: MatSnackBar,
    private i18n: I18n,
    private web3Service: Web3Service,
    //private cookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(ROUTES_CONFIG) public routesConfig: any
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    console.log(this.article, 'article');

    // this.canVote = this.heroService.checkIfUserCanVote();
  }

  like(address, amount) {
    this.web3Service.support(address, amount).then(s => {
      console.log(s, 'tx');
    });
  }
  onNavigate(url) {
    window.open(url, '_blank');
  }
}
