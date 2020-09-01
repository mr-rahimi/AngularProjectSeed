import { Component, OnInit } from '@angular/core';
import { Book } from '../../shared/models/book-management';
import { BookManagementService } from '../../shared/services';
import { Router, ActivatedRoute } from '@angular/router';
import { ObservableState, recordState, recordErrors, changeRouteOnSuccess } from '../../shared/helpers';
import { BusinessError } from '../../shared/models/common';

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.scss']
})
export class BookDeleteComponent implements OnInit {

  constructor(
    private bookManagementService: BookManagementService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  deleteModel: Book = new Book();
  getState: ObservableState = new ObservableState();
  deleteState: ObservableState = new ObservableState();
  businessErrors: BusinessError[] = [];

  ngOnInit() {
    this.getProduct();
  }
  getProduct(): void {
    const id: string = this.route.snapshot.queryParamMap.get('id');
    this.getState.Wait();
    this.bookManagementService.getBook(id)
      .pipe(
        recordState(this.getState)
      )
      .subscribe(x => {
        this.deleteModel = x;
      });
  }
  onSubmit() {
    this.deleteState.Wait();
    this.bookManagementService.deleteBook(this.deleteModel.id)
      .pipe(
        recordErrors(this.businessErrors),
        recordState(this.deleteState),
        changeRouteOnSuccess(this.router, this.route, "../")
      )
      .subscribe();
  }
}
