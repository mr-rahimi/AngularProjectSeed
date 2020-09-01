import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { PagingOptions } from '../shared/models/common/pagingOptions';
import { SimpleSearchModel } from '../shared/models/common/simple-search-model';
import { PagedSortedList } from '../shared/models/common/sortedList';
import { share } from 'rxjs/operators';
import { ObservableState, recordState } from '../shared/helpers';
import { BookManagementService } from '../shared/services';
import { Book } from '../shared/models/book-management';

@Injectable({ providedIn: 'root' })
export class BookListService {
  constructor(private bookManagementService: BookManagementService) {
  }
  pagingOptions: PagingOptions = { pageIndex: 0, pageSize: 5 };
  simpleSearchModel: SimpleSearchModel = {};
  simpleSearch = true;
  public searchState: ObservableState = new ObservableState();
  public currentPage: PagedSortedList<Book> = {
    items: [],
    pageIndex: 0,
    pageSize: 5,
    sortingOptions: [],
    totalItemsCount: 0
  };
  private _pageObservable: BehaviorSubject<PagedSortedList<Book>> = new BehaviorSubject<PagedSortedList<Book>>(this.currentPage);
  private _stateObservable: BehaviorSubject<ObservableState> = new BehaviorSubject<ObservableState>(this.searchState);

  refresh() {
    if (this.simpleSearch) {
      this.simpleSerach();
    }
  }
  private simpleSerach() {
    const x = { ...this.simpleSearchModel, ...this.pagingOptions };
    this.searchState.Wait();
    this.bookManagementService.bookSimpleSearch(x)
      .pipe(
        share(),
        recordState(this.searchState)
      )
      .subscribe(x => {
        this.currentPage = x
        this._pageObservable.next(x);
      });
  }

  get page(): Observable<PagedSortedList<Book>> {
    return this._pageObservable;
  }
  get state(): Observable<ObservableState> {
    return this._stateObservable;
  }
}
