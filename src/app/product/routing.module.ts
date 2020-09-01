import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookDeleteComponent } from './book-delete/book-delete.component';
import { BookDetailsComponent } from './book-details/book-details.component';

const routes: Routes = [
  {
    path: '',
    component: BookListComponent
  },
  {
    path: 'create-book',
    data: {
      breadcrumb: 'CreateBook'
    },
    component: BookCreateComponent
  },
  {
    path: 'edit-book',
    data: {
      breadcrumb: 'EditBook'
    },
    component: BookEditComponent
  },
  {
    path: 'delete-book',
    data: {
      breadcrumb: 'DeleteBook'
    },
    component: BookDeleteComponent
  },
  {
    path: 'details-book',
    data: {
      breadcrumb: 'DetailsBook'
    },
    component: BookDetailsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [],
})
export class RoutingModule { }
