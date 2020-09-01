import { Category } from '../category';

export class Product {
  id?: string;
  name?: string;
  description?: string;
  categoryId?: string;
  category?: Category;
}
