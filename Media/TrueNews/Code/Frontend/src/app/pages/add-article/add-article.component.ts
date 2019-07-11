import { Web3Service } from './../../utils/web3.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';
import { ROUTES_CONFIG } from 'src/app/configs/routes.config';
import { DataService } from 'src/app/utils/data.service';
@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],

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
  providers: [DataService, Web3Service]
})
export class AddArticleComponent implements OnInit {
  myForm: FormGroup;
  canVote = false;
  error: boolean;

  @ViewChild('form', { static: false }) myNgForm; // just to call resetForm method

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private web3Service: Web3Service,
    @Inject(ROUTES_CONFIG) public routesConfig: any
  ) {
    //this.canVote = this.heroService.checkIfUserCanVote();

    this.myForm = this.fb.group({
      url: new FormControl('', [Validators.required])
      // ,
      // tokenNum: new FormControl(10000, Validators.required)
    });
  }

  ngOnInit() {}

  onSave() {
    try {
      this.web3Service.Rumors(this.myForm.value.url).then(tx => {
        console.log(tx, 'transaction ');

        this.router.navigate(['/']);
      });
    } catch (error) {
      console.log(error, 'error');
    }
  }
}
