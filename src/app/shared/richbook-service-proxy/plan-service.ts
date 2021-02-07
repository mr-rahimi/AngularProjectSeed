import { Inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { toHttpParams, toFormData } from '../helpers';
import { PagingOptions, PagedList, PlanInListDto, SimpleSearchModel } from '.';
@Injectable()
export class PlanService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }
  getPlanWithPagination(model: SimpleSearchModel & PagingOptions): Observable<PagedList<PlanInListDto>> {
    console.log(toHttpParams( model ));
    return this.http.get<PagedList<PlanInListDto>>(this.baseUrl + 'api/Plan/GetPlanWithPagination', { params: toHttpParams(model) });
  }
}
