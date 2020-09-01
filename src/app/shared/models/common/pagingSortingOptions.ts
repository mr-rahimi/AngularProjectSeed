import { PagingOptions } from './pagingOptions';
import { SortingOption } from './sortingOption';

export interface IPagingSortingOptions extends PagingOptions {
  sortingOptions: SortingOption[];
}
