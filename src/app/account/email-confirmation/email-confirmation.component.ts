import { Component, OnInit, ViewChild } from '@angular/core';
import { SecurityHelper, ObservableState, handleErrors, recordState } from '../../shared/helpers';
import { AccountService } from '../../shared/services';
import { PermissionService } from '../../shared/Permission';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigurationProvider } from '../../shared/config';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ConfirmationModel } from '../../shared/models/account';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {

  constructor(
    private securityHelper: SecurityHelper,
    private accountService: AccountService,
    private permissionService: PermissionService,
    private router: Router,
    private route: ActivatedRoute,
    private configurationProvider: ConfigurationProvider,
    private recaptchaV3Service: ReCaptchaV3Service) { }

  emailConfirmationModel: ConfirmationModel = {};
  @ViewChild('formModel', { static: true }) public ngform: NgForm;
  recaptchaToken: string = null;
  confirmationState: ObservableState = new ObservableState();
  invalidRequest = false;
  ngOnInit() {
    const username: string = this.route.snapshot.paramMap.get('username');
    this.emailConfirmationModel.username = username;

    const token: string = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.emailConfirmationModel.token = token;
      this.onSubmit();
    }

  }
  onSubmit() {

    this.confirmationState.Wait();
    this.recaptchaV3Service.execute("emailConfirmation")
      .subscribe((token) => {
        this.recaptchaToken = token;
        this.accountService.confirmEmail(this.emailConfirmationModel, this.recaptchaToken)
          .pipe(
            handleErrors(this.ngform.form),
            recordState(this.confirmationState)
          )
          .subscribe(() => {
            this.router.navigateByUrl('/user-panel');
          });
      });
  }

}
