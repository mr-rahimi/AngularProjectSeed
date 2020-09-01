import { Injectable, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { toHttpParams, toFormData } from '../helpers';
import { SimpleSearchModel, PagingOptions, PagedList } from '../models/common';
import { Book, BookDetailsModel, PostModel, BookCreateModel, BookSectionCreateModel, BookSectionIntroductionModel, BookSectionImageModel, BookSectionPassageModel, BookSectionHelpItemModel, BookSectionKnowledgesModel, BookSectionChallengeModel, BookSectionPublishStatusModel, BookShoppingModel } from '../models/book-management';

@Injectable({
  providedIn: 'root'
})
export class BookManagementService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }
  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(this.baseUrl + 'api/BookManagement/GetBook', { params: toHttpParams({ id }) });
  }
  getBookDetails(id: string): Observable<BookDetailsModel> {
    return this.http.get<BookDetailsModel>(this.baseUrl + 'api/BookManagement/GetBookDetails', { params: toHttpParams({ id }) });
  }
  bookSectionsSimpleSearch(model: { id: string } & SimpleSearchModel & PagingOptions): Observable<PagedList<PostModel>> {
    return this.http.get<PagedList<PostModel>>(this.baseUrl + 'api/BookManagement/BookSectionsSimpleSearch', { params: toHttpParams(model) });
  }
  bookSimpleSearch(model: SimpleSearchModel & PagingOptions): Observable<PagedList<Book>> {
    return this.http.get<PagedList<Book>>(this.baseUrl + 'api/BookManagement/BookSimpleSearch', { params: toHttpParams(model) });
  }
  createBook(model: BookCreateModel): Observable<PagedList<void>> {
    return this.http.post<PagedList<void>>(this.baseUrl + 'api/BookManagement/CreateBook', toFormData(model));
  }
  editBook(model: BookCreateModel): Observable<void> {
    return this.http.put<void>(this.baseUrl + 'api/BookManagement/EditBook', toFormData(model));
  }
  deleteBook(id: string): Observable<PagedList<void>> {
    return this.http.delete<PagedList<void>>(this.baseUrl + 'api/BookManagement/DeleteBook', { params: toHttpParams({id}) });
  }
  deleteBookSection(bookSectionId: string): Observable<PagedList<void>> {
    return this.http.delete<PagedList<void>>(this.baseUrl + 'api/BookManagement/DeleteBookSection', { params: toHttpParams({ bookSectionId }) });
  }
  createBookSection(model: BookSectionCreateModel): Observable<PagedList<void>> {
    return this.http.post<PagedList<void>>(this.baseUrl + 'api/BookManagement/CreateBookSection', toFormData(model));
  }
  //edit book section introduction
  getBookSectionIntroduction(bookSectionId: string): Observable<BookSectionIntroductionModel> {
    return this.http.get<BookSectionIntroductionModel>(this.baseUrl + 'api/BookManagement/GetBookSectionIntroduction', { params: toHttpParams({ bookSectionId }) });
  }
  setBookSectionIntroduction(model: BookSectionIntroductionModel): Observable<void> {
    return this.http.patch<void>(this.baseUrl + 'api/BookManagement/SetBookSectionIntroduction', toFormData(model));
  }
  //edit book section image
  getBookSectionImage(bookSectionId: string): Observable<BookSectionImageModel> {
    return this.http.get<BookSectionImageModel>(this.baseUrl + 'api/BookManagement/GetBookSectionImage', { params: toHttpParams({ bookSectionId }) });
  }
  setBookSectionImage(model: BookSectionImageModel): Observable<void> {
    return this.http.patch<void>(this.baseUrl + 'api/BookManagement/SetBookSectionImage', toFormData(model));
  }
  //edit book section passage
  getBookSectionPassage(bookSectionId: string): Observable<BookSectionPassageModel> {
    return this.http.get<BookSectionPassageModel>(this.baseUrl + 'api/BookManagement/GetBookSectionPassage', { params: toHttpParams({ bookSectionId }) });
  }
  setBookSectionPassage(model: BookSectionPassageModel): Observable<void> {
    return this.http.patch<void>(this.baseUrl + 'api/BookManagement/SetBookSectionPassage', toFormData(model));
  }
  getBookSectionHelps(bookSectionId: string): Observable<BookSectionHelpItemModel[]> {
    return this.http.get<BookSectionHelpItemModel[]>(this.baseUrl + 'api/BookManagement/GetBookSectionHelps', { params: toHttpParams({ bookSectionId }) });
  }
  addHelpItemToBookSection(model: BookSectionHelpItemModel): Observable<string> {
    return this.http.post<string>(this.baseUrl + 'api/BookManagement/AddHelpItemToBookSection', toFormData(model));
  }
  removeHelpItemFromBookSection(helpItemId: string): Observable<PagedList<void>> {
    return this.http.delete<PagedList<void>>(this.baseUrl + 'api/BookManagement/RemoveHelpItemFromBookSection', { params: toHttpParams({ helpItemId }) });
  }
  editHelpItemOfBookSection(model: BookSectionHelpItemModel): Observable<void> {
    return this.http.put<void>(this.baseUrl + 'api/BookManagement/EditHelpItemOfBookSection', toFormData(model));
  }
  getHelpItemOfBookSection(helpItemId: string): Observable<BookSectionHelpItemModel> {
    return this.http.get<BookSectionHelpItemModel>(this.baseUrl + 'api/BookManagement/GetHelpItemOfBookSection', { params: toHttpParams({ helpItemId }) });
  }
  getBookSectionKnowledges(bookSectionId: string): Observable<BookSectionKnowledgesModel> {
    return this.http.get<BookSectionKnowledgesModel>(this.baseUrl + 'api/BookManagement/GetBookSectionKnowledges', { params: toHttpParams({ bookSectionId }) });
  }
  setBookSectionKnowledges(model: BookSectionKnowledgesModel): Observable<void> {
    return this.http.patch<void>(this.baseUrl + 'api/BookManagement/SetBookSectionKnowledges', toFormData(model));
  }
  getBookSectionChallenges(bookSectionId: string): Observable<BookSectionChallengeModel[]> {
    return this.http.get<BookSectionChallengeModel[]>(this.baseUrl + 'api/BookManagement/GetBookSectionChallenges', { params: toHttpParams({ bookSectionId }) });
  }
  removeChallengeFromBookSection(challengeId: string): Observable<PagedList<void>> {
    return this.http.delete<PagedList<void>>(this.baseUrl + 'api/BookManagement/RemoveChallengeFromBookSection', { params: toHttpParams({ challengeId }) });
  }
  addChallengeToBookSection(model: BookSectionChallengeModel): Observable<string> {
    return this.http.post<string>(this.baseUrl + 'api/BookManagement/AddChallengeToBookSection', toFormData(model));
  }
  editChallengeOfBookSection(model: BookSectionChallengeModel): Observable<void> {
    return this.http.put<void>(this.baseUrl + 'api/BookManagement/EditChallengeOfBookSection', toFormData(model));
  }
  getBookSectionPublishStatus(bookSectionId: string): Observable<BookSectionPublishStatusModel> {
    return this.http.get<BookSectionPublishStatusModel>(this.baseUrl + 'api/BookManagement/GetBookSectionPublishStatus', { params: toHttpParams({ bookSectionId }) });
  }
  setBookSectionPublishStatus(model: BookSectionPublishStatusModel): Observable<void> {
    return this.http.patch<void>(this.baseUrl + 'api/BookManagement/SetBookSectionPublishStatus', toFormData(model));
  }
  getShoppingInfo(bookId: string): Observable<BookShoppingModel> {
    return this.http.get<BookShoppingModel>(this.baseUrl + 'api/BookManagement/GetShoppingInfo', { params: toHttpParams({ bookId }) });
  }
  setShoppingInfo(model: BookShoppingModel): Observable<void> {
    return this.http.put<void>(this.baseUrl + 'api/BookManagement/SetShoppingInfo', toFormData(model));
  }
}
