import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getSampleEmailConfirmationMessage(): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get<string>(this.baseUrl + 'api/Security/GetSampleEmailConfirmationMessage', { headers, responseType: 'text' as 'json' });
  }
}
