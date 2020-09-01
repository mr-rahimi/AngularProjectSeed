export class PagedList<T> {
  pageIndex: number;
  pageSize: number;
  totalItemsCount: number;
  items: T[] = [];
}
