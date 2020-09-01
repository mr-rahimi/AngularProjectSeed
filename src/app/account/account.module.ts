import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
//import { RegisterComponent } from './register/register.component';
//import { ConfirmationComponent } from './confirmation/confirmation.component';
//import { AccountingLayoutComponent } from './template/accounting-layout.component';
//import { ForbiddenComponent } from './forbidden/forbidden.component';
//import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { LocalizationModule } from '../shared/Localization/localization.module';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { RegisterComponent } from './register/register.component';
import { SendResetPasswordTokenComponent } from './send-reset-password-token/send-reset-password-token.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    EmailConfirmationComponent,
    RegisterComponent,
    SendResetPasswordTokenComponent,
    ResetPasswordComponent
    //ConfirmationComponent,
    //ForbiddenComponent,
    //AccountingLayoutComponent,
    //PasswordRecoveryComponent
  ],
  imports: [
    ReactiveFormsModule,
    AccountRoutingModule,
    SharedModule,
    LocalizationModule.forChild({
      moduleName: "account"
    }),
  ],
  providers: [],
  bootstrap: [LoginComponent]
})

export class AccountModule { }
