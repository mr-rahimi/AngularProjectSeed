import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../shared/services';
import { LoginCredentialsModel } from '../../shared/models/account';
import { SecurityHelper, handleErrors, ObservableState, recordState } from '../../shared/helpers';
import { PermissionService } from '../../shared/Permission';
import { ConfigurationProvider } from '../../shared/config';
import { Subscription, concat } from 'rxjs';
import { ReCaptchaV3Service } from 'ng-recaptcha';


@Component({
  selector: 'account-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private securityHelper: SecurityHelper,
    private accountService: AccountService,
    private permissionService: PermissionService,
    private router: Router,
    private route: ActivatedRoute,
    private configurationProvider: ConfigurationProvider,
    private recaptchaV3Service: ReCaptchaV3Service) { }

  loginModel: LoginCredentialsModel = {};
  @ViewChild('formModel', { static: true }) public ngform: NgForm;
  loginState: ObservableState = new ObservableState();
  private singleExecutionSubscription: Subscription;
  get siteKey(): string {
    return this.configurationProvider.config.captchaSiteKey;
  }
  ngOnInit() {
    //console.log(this.configurationProvider.config.captchaSiteKey);
  }
  onSubmit() {
    const returnUrl: string = this.route.snapshot.queryParamMap.get('returnurl');

    this.loginState.Wait();
    this.recaptchaV3Service.execute("login")
      .subscribe((token) => {
        this.loginModel.recaptchaToken = token;
        this.accountService.login(this.loginModel)
          .pipe(
            handleErrors(this.ngform.form),
            recordState(this.loginState)
          )
          .subscribe(x => {
            this.securityHelper.saveAccessToken(x.accessToken);
            //console.log(this.securityHelper.getUserRoles());
            this.permissionService.LoadPermissions(this.securityHelper.getUserRoles());
            if (returnUrl)
              this.router.navigateByUrl(returnUrl);
            else
              this.router.navigateByUrl('/user-panel');
          });
      });
  }
}
