import { Component, OnInit, ViewChild } from '@angular/core';
import { BookEditModel } from '../../shared/models/book-management';
import { ObservableState, recordState, handleErrors, changeRouteOnSuccess } from '../../shared/helpers';
import { NgForm } from '@angular/forms';
import { BookManagementService } from '../../shared/services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
  constructor(
    public bookManagementService: BookManagementService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  editModel: BookEditModel = new BookEditModel();
  getState: ObservableState = new ObservableState();
  editState: ObservableState = new ObservableState();
  @ViewChild('formModel', { static: true }) public ngform: NgForm;
  
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
        this.editModel = x;
      });
  }
  onSubmit() {
    this.editState.Wait();
    this.bookManagementService.editBook(this.editModel)
      .pipe(
        handleErrors(this.ngform.form),
        recordState(this.editState),
        changeRouteOnSuccess(this.router, this.route, "../")
      )
      .subscribe();
  }

}
