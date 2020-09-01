import { Injectable, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import * as jwt_decode from 'jwt-decode';
import { Observable, of } from 'rxjs';
import { switchMap, switchMapTo, map, catchError } from 'rxjs/operators';
import { isString, isNumber } from 'util';
import { CookieService } from 'ngx-cookie-service';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
//import { UserModel } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class SecurityHelper {
  constructor(
    private cookieService: CookieService
  ) {
  }
  static access_token_key= "access_token";
  //static refresh_token_key: string = "refresh_token";

  static exp_time_key = "exp";
  static role_claim_key = "roles";
  static username_claim_key = "sub";
  static displayname_claim_key = "given_name";

  saveAccessToken(token: string): void {
    this.cookieService.set(SecurityHelper.access_token_key, token,this.getExpTime(token),"/");
    //localStorage.setItem(SecurityHelper.access_token_key, token);
    
  }
  removeAccessToken(): void {
    this.cookieService.delete(SecurityHelper.access_token_key, "/");
    //localStorage.setItem(SecurityHelper.access_token_key, token);
  }
  getAccessToken(): string {
    const token = this.cookieService.get(SecurityHelper.access_token_key);
    return token ==="" ? null:token;

    //return localStorage.getItem(SecurityHelper.access_token_key);
  }
  isAuthenticated(): boolean {
    return this.getAccessToken() ? true : false;
  }
  getUserPayload(): any {
    const token = this.getAccessToken();
    if (!token)
      return null;
    if (!isString(token))
      return null;
    const decoded = jwt_decode(token);
    return decoded;
  }
  getUserRoles(): string[] {
    const payLoad = this.getUserPayload();
    if (!payLoad)
      return [];
    const roles = payLoad[SecurityHelper.role_claim_key];
    if (!roles) {
      return [];
    }

    if (Array.isArray(roles)) {
      return roles.map(role => role);
    } else {
      return [roles.toLowerCase()];
    }
  }
  getUserName(): string {
    const payLoad = this.getUserPayload();
    if (!payLoad)
      return null;
    return payLoad[SecurityHelper.username_claim_key];
  }
  getDisplayName(): string {
    const payLoad = this.getUserPayload();
    if (!payLoad)
      return null;
    return payLoad[SecurityHelper.username_claim_key];
  }
  getExpTime(token:string): number {
    const payLoad = this.getPayload(token);
    if (!payLoad)
      return null;
    return payLoad[SecurityHelper.exp_time_key];
  }
  isTokenExpired(): boolean {
    const token = this.getAccessToken();
    if (!token)
      return null;

    const payLoad = this.getPayload(token);
    if (!payLoad)
      return null;
    const exp = payLoad[SecurityHelper.exp_time_key];
    return isNumber(exp) && Date.now() >= exp * 1000
  }
  getPayload(token: string): any {
    var decoded = jwt_decode(token);
    return decoded;
  }
  isUserInRole(rolename: string): boolean {
    return this.getUserRoles()
      .some(value => value.toLowerCase() == rolename.toLowerCase());
  }
  hasUserAnyRoles(rolenames: string[]): boolean {
    return rolenames.some(rolename => this.isUserInRole(rolename))
  }
}
