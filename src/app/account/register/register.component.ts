import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, ValidatorFn, ValidationErrors, FormGroup } from '@angular/forms';
import { AccountService } from '../../shared/services';
import { handleErrors, SecurityHelper, ObservableState, recordState } from '../../shared/helpers';
import { PermissionService } from '../../shared/Permission';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigurationProvider } from '../../shared/config';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { RegisterModel } from '../../shared/models/account';

@Component({
  selector: 'account-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private configurationProvider: ConfigurationProvider,
    private recaptchaV3Service: ReCaptchaV3Service) { }

  registerModel: RegisterModel = {};
  recaptchaToken: string = null;
  @ViewChild('formModel', { static: true }) public ngform: NgForm;
  registerState: ObservableState = new ObservableState();
  get siteKey(): string {
    return this.configurationProvider.config.captchaSiteKey;
  }
  ngOnInit() {
    this.ngform.form.setValidators(this.checkPasswords);
    this.ngform.form.updateValueAndValidity();
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.get('password');
    const confirmPass = group.get('confirmPassword');
    if (!pass || !confirmPass)
      return null;

    if (!pass.value || !confirmPass.value)
      return null;

    return pass.value === confirmPass.value ? null : { passwordsAreNotSame: true }
  }
  
  onSubmit() {

    this.registerState.Wait();
    this.recaptchaV3Service.execute("register")
      .subscribe((token) => {
        this.recaptchaToken = token;
        this.accountService.registerUser(this.registerModel, this.recaptchaToken)
          .pipe(
            handleErrors(this.ngform.form),
            recordState(this.registerState)
          )
          .subscribe(() => {
            this.router.navigate(["../email-confirmation", this.registerModel.email], { relativeTo: this.route });
          });
      });
  }
}
