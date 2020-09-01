import { Component, OnInit, ViewChild } from '@angular/core';
import { SecurityHelper, ObservableState, handleErrors, recordState } from '../../shared/helpers';
import { AccountService } from '../../shared/services';
import { PermissionService } from '../../shared/Permission';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigurationProvider } from '../../shared/config';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ConfirmationModel, ResetPasswordModel } from '../../shared/models/account';
import { NgForm, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    private securityHelper: SecurityHelper,
    private accountService: AccountService,
    private permissionService: PermissionService,
    private router: Router,
    private route: ActivatedRoute,
    private configurationProvider: ConfigurationProvider,
    private recaptchaV3Service: ReCaptchaV3Service) { }

  resetPasswordModel: ResetPasswordModel = {};
  @ViewChild('formModel', { static: true }) public ngform: NgForm;
  recaptchaToken: string = null;
  resetPasswordState: ObservableState = new ObservableState();
  invalidRequest = false;
  ngOnInit() {
    const username: string = this.route.snapshot.paramMap.get('username');
    this.resetPasswordModel.userName = username;

    const token: string = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.resetPasswordModel.token = token;
    }
    //set form validation
    this.ngform.form.setValidators(this.checkPasswords);
    this.ngform.form.updateValueAndValidity();
  }
  checkPasswords(group: FormGroup) { 
    const pass = group.get('newPassword');
    const confirmPass = group.get('confirmNewPassword');
    if (!pass || !confirmPass)
      return null;

    if (!pass.value || !confirmPass.value)
      return null;

    return pass.value === confirmPass.value ? null : { passwordsAreNotSame: true }
  }
  onSubmit() {

    this.resetPasswordState.Wait();
    this.recaptchaV3Service.execute("emailConfirmation")
      .subscribe((token) => {
        this.recaptchaToken = token;
        this.accountService.resetPassword(this.resetPasswordModel, this.recaptchaToken)
          .pipe(
            handleErrors(this.ngform.form),
            recordState(this.resetPasswordState)
          )
          .subscribe(() => {
            this.router.navigate(["../../login"], { relativeTo: this.route });
          });
      });
  }

}
