import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LocalizationModule } from '../shared/Localization/localization.module';
import { RoutingModule } from './routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { BookListComponent} from './book-list/book-list.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookDeleteComponent } from './book-delete/book-delete.component';
import { BookDetailsComponent } from './book-details/book-details.component';

@NgModule({
  declarations: [
    BookListComponent,
    BookCreateComponent,
    BookEditComponent,
    BookDeleteComponent,
    BookDetailsComponent
  ],
  imports: [
    ReactiveFormsModule,
    RoutingModule,
    SharedModule,
    LocalizationModule.forChild({
      moduleName: "book-management"
    }),
    NgbModule,
    NgSelectModule
  ],
  entryComponents: [
  ],
  providers: []
})

export class Module { }
