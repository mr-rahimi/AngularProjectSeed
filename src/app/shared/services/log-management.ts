import { Injectable, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { toHttpParams } from '../helpers';
import { PagingOptions, PagedList, SimpleSearchModel } from '../models/common';
import { LogSearchModel, LogModel } from '../models/log-management';

@Injectable({
  providedIn: 'root'
})
export class LogManagementService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  logAdvancedSearch(model: LogSearchModel & PagingOptions): Observable<PagedList<LogModel>> {
    return this.http.get<PagedList<LogModel>>(this.baseUrl + 'api/LogManagement/LogAdvancedSearch', { params: toHttpParams(model) });
  }
  logSimpleSearch(model: SimpleSearchModel & PagingOptions): Observable<PagedList<LogModel>> {
    return this.http.get<PagedList<LogModel>>(this.baseUrl + 'api/LogManagement/LogAdvancedSearch', { params: toHttpParams(model) });
  }
  getLog(id: string): Observable<LogModel> {
    return this.http.get<LogModel>(this.baseUrl + 'api/LogManagement/GetLog', { params: toHttpParams({id}) });
  }
}
