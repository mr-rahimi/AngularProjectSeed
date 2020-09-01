import { SortingOption } from './sortingOption';

export class PagedSortedList<T> {
  pageIndex?: number;
  pageSize?: number;
  totalItemsCount?: number;
  sortingOptions?: SortingOption[] = [];
  items?: T[] = [];
}
