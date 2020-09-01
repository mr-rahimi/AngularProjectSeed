import { Injectable, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { toFormData } from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getClientSettings(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/Configuration/GetClientSettings');
  }
}
