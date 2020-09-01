import { Component, OnInit, ViewChild } from '@angular/core';
import { SecurityHelper, ObservableState, handleErrors, recordState } from '../../shared/helpers';
import { AccountService } from '../../shared/services';
import { PermissionService } from '../../shared/Permission';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigurationProvider } from '../../shared/config';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-send-reset-password-token',
  templateUrl: './send-reset-password-token.component.html',
  styleUrls: ['./send-reset-password-token.component.scss']
})
export class SendResetPasswordTokenComponent implements OnInit {

  constructor(
    private securityHelper: SecurityHelper,
    private accountService: AccountService,
    private permissionService: PermissionService,
    private router: Router,
    private route: ActivatedRoute,
    private configurationProvider: ConfigurationProvider,
    private recaptchaV3Service: ReCaptchaV3Service) { }

  sendResetPasswordToken: { username?: string } = {};
  @ViewChild('formModel', { static: true }) public ngform: NgForm;
  recaptchaToken: string = null;
  sendTokenState: ObservableState = new ObservableState();
  ngOnInit() {
    const username: string = this.route.snapshot.queryParams['username'];
    this.sendResetPasswordToken.username = username;
  }
  onSubmit() {
    this.sendTokenState.Wait();
    this.recaptchaV3Service.execute("sendResetPasswordToken")
      .subscribe((token) => {
        this.recaptchaToken = token;
        this.accountService.sendResetPasswordToken(this.sendResetPasswordToken.username, this.recaptchaToken)
          .pipe(
            handleErrors(this.ngform.form),
            recordState(this.sendTokenState)
          )
          .subscribe(() => {
            this.router.navigate(["../reset-password", this.sendResetPasswordToken.username], { relativeTo: this.route });

          });
      });
  }

}
