import { Injectable, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { toHttpParams, toFormData } from '../helpers';
import { PagingOptions, PagedList, SimpleSearchModel } from '../models/common';
import { Product, ProductSearchModel, OrderViewModel, InvoiceViewModel, GeneratePaymentLinkForInvoiceModel, ConfirmPamentResultModel } from '../models/shopping';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  productAdvancedSearch(model: ProductSearchModel & PagingOptions): Observable<PagedList<Product>> {
    return this.http.get<PagedList<Product>>(this.baseUrl + 'api/Shopping/ProductAdvancedSearch', { params: toHttpParams(model) });
  }
  productSimpleSearch(model: SimpleSearchModel & PagingOptions): Observable<PagedList<Product>> {
    return this.http.get<PagedList<Product>>(this.baseUrl + 'api/Shopping/ProductSimpleSearch', { params: toHttpParams(model) });
  }
  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + 'api/Shopping/GetProduct', { params: toHttpParams({ id }) });
  }
  getOpenOrder(): Observable<OrderViewModel> {
    return this.http.get<OrderViewModel>(this.baseUrl + 'api/Shopping/GetOpenOrder');
  }
  addProductToOrder(productId: string): Observable<OrderViewModel> {
    return this.http.put<OrderViewModel>(this.baseUrl + 'api/Shopping/AddProductToOrder', toFormData({ productId }));
  }
  removeItemFromOrder(itemId: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'api/Shopping/RemoveItemFromOrder', { params: toHttpParams({ itemId }) });
  }
  issueInvoice(): Observable<InvoiceViewModel> {
    return this.http.post<InvoiceViewModel>(this.baseUrl + 'api/Shopping/IssueInvoice', {});
  }
  cancelInvoice(): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'api/Shopping/CancelInvoice', {});
  }
  generatePaymentLinkForInvoice(model: GeneratePaymentLinkForInvoiceModel): Observable<string> {
    return this.http.post<string>(this.baseUrl + 'api/Shopping/GeneratePaymentLinkForInvoice', toFormData(model), { responseType: 'text' as 'json' });
  }
  confirmPayment(trackId: string): Observable<ConfirmPamentResultModel> {
    return this.http.post<ConfirmPamentResultModel>(this.baseUrl + 'api/Shopping/ConfirmPayment', toFormData({ trackId }));
  }
}
