import { Injectable, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { toFormData } from '../helpers';
import { TodaysPostModel } from '../models/settings-management';

@Injectable({
  providedIn: 'root'
})
export class SettingsManagementService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getTodaysPost(): Observable<TodaysPostModel> {
    return this.http.get<TodaysPostModel>(this.baseUrl + 'api/SettingsManagement/GetTodaysPost');
  }
  setTodaysPost(model: TodaysPostModel): Observable<void> {
    return this.http.post<void>(this.baseUrl + 'api/SettingsManagement/SetTodaysPost', toFormData(model));
  }
}
