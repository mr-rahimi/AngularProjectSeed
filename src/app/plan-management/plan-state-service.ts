import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';
import { ObservableState, recordState } from '../shared/helpers';
import { PagedSortedList, PagingOptions, PlanInListDto, PlanService, SimpleSearchModel } from '../shared/richbook-service-proxy';

@Injectable()
export class PlanStateService {
  constructor(private planService: PlanService) {
  }
  pagingOptions: PagingOptions = { pageIndex: 0, pageSize: 6 };
  simpleSearchModel: SimpleSearchModel = {};
  simpleSearch = true;
  public searchState: ObservableState = new ObservableState();
  public currentPage: PagedSortedList<PlanInListDto> = {
    items: [],
    pageIndex: 0,
    pageSize: 5,
    sortingOptions: [],
    totalItemsCount: 0
  };
  private _pageObservable: BehaviorSubject<PagedSortedList<PlanInListDto>> = new BehaviorSubject<PagedSortedList<PlanInListDto>>(this.currentPage);
  private _stateObservable: BehaviorSubject<ObservableState> = new BehaviorSubject<ObservableState>(this.searchState);

  refresh() {
    if (this.simpleSearch) {
      this.simpleSerach();
    }
  }
  private simpleSerach() {
    const x = { ...this.simpleSearchModel, ...this.pagingOptions  };
    this.searchState.Wait();
    this.planService.getPlanWithPagination(x)
      .pipe(
        share(),
        recordState(this.searchState)
      )
      .subscribe(x => {
        this.currentPage = x
        this._pageObservable.next(x);
      });
  }

  get page(): Observable<PagedSortedList<PlanInListDto>> {
    return this._pageObservable;
  }
  get state(): Observable<ObservableState> {
    return this._stateObservable;
  }
}
