import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { PagedList } from '../models/common';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { DefaultUrlSerializer } from '@angular/router';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body, params } = request;
    //return fake data if if app is in dev mode
    if (new URL(window.location.href).port !== "4200")
      return next.handle(request);

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(3000))
      .pipe(dematerialize());


    function handleRoute() {
      switch (true) {
        case url.endsWith('/api/Product/ProductAdvancedSearch') && method === 'GET':
          return ProductSearch(params);
        case url.endsWith('/api/Product/ProductSimpleSearch') && method === 'GET':
          return ProductSearch(params);
        case url.endsWith('/api/Product/GetProduct') && method === 'GET':
          return GetProduct(params);
        case url.endsWith('/api/Product/EditProduct') && method === 'PUT':
          return ok();
        default:
          // pass through any requests not handled above  
          return next.handle(request);
      }
    }

    // route functions
    function GetProduct(params: HttpParams) {
      const product = {
        id: params.get('id'),
        categoryId: '1',
        category: { id: '1', name: 'category 1' },
        description: 'description of product ' + params.get('id'),
        name: 'product ' + params.get('id')
      } as Product;
      return ok(product);
    }
    function ProductSearch(params: HttpParams) {
      console.log(params);
      const products = [...Array(+params.get('pageSize')).keys()].map(x => <Product>{
        id: x.toString(),
        description: "description",
        name: "name",
        categoryId: "123",
        category: { id: "123", name: "", description: "" }
      });
      const page = <PagedList<Product>>{
        items: products,
        pageIndex: +params.get('pageIndex'),
        pageSize: +params.get('pageSize'),
        totalItemsCount: 100
      };
      return ok(page)
    }

    function authenticate() {
      const { username, password } = body;
      const user = users.find(x => x.username === username && x.password === password);
      if (!user) return error('Username or password is incorrect');
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: 'fake-jwt-token'
      })
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

