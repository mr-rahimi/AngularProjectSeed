export interface PagingOptions {
  pageIndex?: number;
  pageSize?: number;
}
export interface SortingOption {
  field?: string;
  order?: string;
}

export interface PagedList<T> {
  pageIndex: number;
  pageSize: number;
  totalItemsCount: number;
  items: T[];
}
export interface PagedSortedList<T> extends PagedList<T> {
  
  sortingOptions?: SortingOption[];
  
}

export class SimpleSearchModel {
  key?: string;
}
export class PagingModel {
  pagingOptions?: PagingOptions;
}
