import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { SendResetPasswordTokenComponent } from './send-reset-password-token/send-reset-password-token.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      breadcrumb: 'Login'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      breadcrumb: 'Register'
    }
  },
  {
    path: 'send-reset-password-token',
    component: SendResetPasswordTokenComponent,
    data: {
      breadcrumb: 'SendResetPasswordToken'
    }
  },
  {
    path: 'reset-password/:username',
    component: ResetPasswordComponent,
    data: {
      breadcrumb: 'ResetPassword'
    }
  },
  {
    path: 'email-confirmation/:username',
    component: EmailConfirmationComponent,
    data: {
      breadcrumb: 'EmailConfirmation'
    }
  },
  //{
  //  path: '',
  //  redirectTo: 'Login',
  //  pathMatch: 'full',
  //}
];

@NgModule({
  imports: [
     RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
