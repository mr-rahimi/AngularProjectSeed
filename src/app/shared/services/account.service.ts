import { Injectable, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { toFormData } from '../helpers';
import { ConfirmationModel, RegisterModel, LoginCredentialsModel, ResetPasswordModel, TokenModel } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  sendResetPasswordToken(username: string, recaptchaToken: string): Observable<void> {
    return this.http.post<void>(this.baseUrl + 'api/Account/SendResetPasswordToken', toFormData({ username, recaptchaToken }));
  }
  confirmEmail(model: ConfirmationModel, recaptchaToken: string): Observable<void> {
    return this.http.post<void>(this.baseUrl + 'api/Account/ConfirmEmail', toFormData({ ...model, recaptchaToken }));
  }
  registerUser(model: RegisterModel, recaptchaToken: string): Observable<void> {
    return this.http.post<void>(this.baseUrl + 'api/Account/Register', toFormData({ ...model, recaptchaToken }));
  }
  login(model: LoginCredentialsModel): Observable<TokenModel> {
    return this.http.post<TokenModel>(this.baseUrl + 'api/Account/Login', toFormData(model));
  }
  resetPassword(model: ResetPasswordModel, recaptchaToken: string): Observable<void> {
    return this.http.post<void>(this.baseUrl + 'api/Account/ResetPassword', toFormData({ ...model, recaptchaToken }));
  }
}
