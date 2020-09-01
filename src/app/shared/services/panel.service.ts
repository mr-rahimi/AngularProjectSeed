import { Injectable, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }
  ForAdministrator() {
    return this.http.get<string>(this.baseUrl + 'api/Panel/ForAdministrator');
  }
}
