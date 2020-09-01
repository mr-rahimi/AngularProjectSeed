import { Injectable, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { toFormData, toHttpParams } from '../helpers';
import { UserSearchModel, UserModel, EditPermissionModel, RoleModel } from '../models/user-management';
import { PagingOptions, PagedList, SimpleSearchModel } from '../models/common';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  userAdvancedSearch(model: UserSearchModel & PagingOptions): Observable<PagedList<UserModel>> {
    return this.http.get<PagedList<UserModel>>(this.baseUrl + 'api/UserManagement/UserAdvancedSearch', { params: toHttpParams(model) });
  }
  userSimpleSearch(model: SimpleSearchModel & PagingOptions): Observable<PagedList<UserModel>> {
    return this.http.get<PagedList<UserModel>>(this.baseUrl + 'api/UserManagement/UserAdvancedSearch', { params: toHttpParams(model) });
  }
  roleSimpleSearch(model: SimpleSearchModel & PagingOptions): Observable<PagedList<RoleModel>> {
    return this.http.get<PagedList<UserModel>>(this.baseUrl + 'api/UserManagement/RoleSimpleSearch', { params: toHttpParams(model) });
  }
  getPermission(username: string): Observable<EditPermissionModel> {
    return this.http.get<EditPermissionModel>(this.baseUrl + 'api/UserManagement/GetPermission', { params: toHttpParams({ username }) });
  }
  setPermission(model: EditPermissionModel): Observable<void> {
    return this.http.post<void>(this.baseUrl + 'api/UserManagement/SetPermission', toFormData(model));
  }
}
