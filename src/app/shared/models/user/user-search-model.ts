import { PagingOptions } from '../common/pagingOptions';

export class UserSearchModel1 implements PagingOptions {
  pageIndex: number;
  pageSize: number;
  name?: string;
  description?: string;
}
