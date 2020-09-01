import { Injectable, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { toHttpParams } from '../helpers';
import { PagingOptions, PagedList, SimpleSearchModel } from '../models/common';
import { UserBookModel } from '../models/user-reading';
import { UserBookDetailsModel } from '../models/user-reading/userBookDetailsModel';
import { UserBookSectionModel } from '../models/user-reading/userBookSectionModel';

@Injectable({
  providedIn: 'root'
})
export class UserReadingService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  userBooksSimpleSearch(model: SimpleSearchModel & PagingOptions): Observable<PagedList<UserBookModel>> {
    return this.http.get<PagedList<UserBookModel>>(this.baseUrl + 'api/UserReading/UserBooksSimpleSearch', { params: toHttpParams(model) });
  }
  getBookDetails(bookId: string): Observable<UserBookDetailsModel> {
    return this.http.get<UserBookDetailsModel>(this.baseUrl + 'api/UserReading/GetBookDetails', { params: toHttpParams({bookId}) });
  }
  getBookSectionDetails(bookSectionId: string): Observable<UserBookSectionModel> {
    return this.http.get<UserBookSectionModel>(this.baseUrl + 'api/UserReading/GetBookSectionDetails', { params: toHttpParams({ bookSectionId }) });
  }
}
