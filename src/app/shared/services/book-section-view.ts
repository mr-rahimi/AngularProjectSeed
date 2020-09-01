import { Injectable, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { toHttpParams, toFormData } from '../helpers';
import { BookSectionViewModel } from '../models/book-section-view/bookSectionViewModel';
import { HelpItemModel, BookSectionChallengeQuestionModel, BookSectionChallengeResponseModel, BookSectionChallengeResultModel, BookContentItem } from '../models/book-section-view';
import { KnowledgeModel } from '../models/knowledge';

@Injectable({
  providedIn: 'root'
})
export class BookSectionViewService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }
  getBookContents(type: string, bookId: string): Observable<BookContentItem> {
    return this.http.get<BookContentItem>(this.baseUrl + 'api/BookSectionView/GetBookContents', { params: toHttpParams({ type, bookId }) });
  }
  getLastViewSection(type: string, bookId: string): Observable<string> {
    return this.http.get<string>(this.baseUrl + 'api/BookSectionView/GetLastViewSection', { params: toHttpParams({ type, bookId }) });
  }
  getBookSection(type: string, bookId: string, bookSectionId: string): Observable<BookSectionViewModel> {
    return this.http.get<BookSectionViewModel>(this.baseUrl + 'api/BookSectionView/GetBookSection', { params: toHttpParams({ type, bookId, bookSectionId }) });
  }
  getHelp(type: string, bookId: string, bookSectionId: string, helpId: string): Observable<HelpItemModel> {
    return this.http.get<HelpItemModel>(this.baseUrl + 'api/BookSectionView/GetHelp', { params: toHttpParams({ type, bookId, bookSectionId, helpId }) });
  }
  getChallenges(type: string, bookId: string, bookSectionId: string): Observable<BookSectionChallengeQuestionModel[]> {
    return this.http.get<BookSectionChallengeQuestionModel[]>(this.baseUrl + 'api/BookSectionView/GetChallenges', { params: toHttpParams({ type, bookId, bookSectionId }) });
  }
  examineChallenges(type: string, bookId: string, bookSectionId: string, responses: BookSectionChallengeResponseModel[]): Observable<BookSectionChallengeResultModel[]> {
    return this.http.post<BookSectionChallengeResultModel[]>(this.baseUrl + 'api/BookSectionView/ExamineChallenges', toFormData({ type, bookId, bookSectionId, responses }));
  }
}
