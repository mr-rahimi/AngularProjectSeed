import { Injectable, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { toHttpParams, toFormData } from '../helpers';
import { SimpleSearchModel, PagingOptions, SortingOption, PagedList } from '../models/common';
import { ProductSearchModel, Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }
  productAdvancedSearch(model: ProductSearchModel & PagingOptions & SortingOption): Observable<PagedList<Product>> {
    return this.http.get<PagedList<Product>>(this.baseUrl + 'api/Product/ProductAdvancedSearch', { params: toHttpParams(model) });
  }
  productSimpleSearch(model: SimpleSearchModel & PagingOptions & SortingOption): Observable<PagedList<Product>> {
    return this.http.get<PagedList<Product>>(this.baseUrl + 'api/Product/ProductSimpleSearch', { params: toHttpParams(model) });
  }
  createProduct(model: Product): Observable<void> {
    return this.http.post<void>(this.baseUrl + 'api/Product/CreateProduct', toFormData(model));
  }
  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + 'api/Product/GetProduct', { params: toHttpParams({id}) });
  }
  editProduct(model: Product): Observable<void> {
    return this.http.put<void>(this.baseUrl + 'api/Product/EditProduct', toFormData(model));
  }
}
