import { Injectable, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { UserProfileModel, ChangePasswordModel, EditUserProfileModel } from '../models/user-profile';
import { toFormData } from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class ProfileManagementService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getUserProfile(): Observable<UserProfileModel> {
    return this.http.get<UserProfileModel>(this.baseUrl + 'api/ProfileManagement/GetUserProfile');
  }
  changePassword(model: ChangePasswordModel): Observable<void> {
    return this.http.post<void>(this.baseUrl + 'api/ProfileManagement/ChangePassword', toFormData(model));
  }
  setUserProfile(model: EditUserProfileModel): Observable<void> {
    return this.http.put<void>(this.baseUrl + 'api/ProfileManagement/SetUserProfile', toFormData(model));
  }
}
