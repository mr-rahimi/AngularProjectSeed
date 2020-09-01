import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { DefaultUrlSerializer } from '@angular/router';
import { Product } from '../../models/product';
import { PagedList } from '../../models/common';
import { Book } from '../../models/book-management';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeBookManagementServiceInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body, params } = request;
    //return fake data if if app is in dev mode
    if (new URL(window.location.href).port !== "4200")
      return next.handle(request);

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      //.pipe(delay(500))
      .pipe(dematerialize());


    function handleRoute() {
      switch (true) {
        case url.endsWith('api/BookManagement/BookSimpleSearch') && method === 'GET':
          return BookSearch(params);
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
    function BookSearch(params: HttpParams) {
      const books = [...Array(+params.get('pageSize')).keys()].map(x => <Book>{
        id: x.toString(),
        description: "description",
        name: "name",
        imageUrl:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
      });
      const page = <PagedList<Book>>{
        items: books,
        pageIndex: +params.get('pageIndex'),
        pageSize: +params.get('pageSize'),
        totalItemsCount: 100
      };
      return ok(page)
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

