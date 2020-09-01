import { Injectable, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { toHttpParams, toFormData } from '../helpers';
import { SimpleSearchModel, PagingOptions, SortingOption, PagedList } from '../models/common';
import { ProductSearchModel, Product } from '../models/product';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }
  categorySimpleSearch(model: SimpleSearchModel & PagingOptions & SortingOption): Observable<PagedList<Category>> {
    return this.http.get<PagedList<Category>>(this.baseUrl + 'api/Category/CategorySimpleSearch', { params: toHttpParams(model) });
  }
}
