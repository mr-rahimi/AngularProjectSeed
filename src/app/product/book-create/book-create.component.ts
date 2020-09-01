import { Component, OnInit, ViewChild } from '@angular/core';
import { BookManagementService } from '../../shared/services';
import { Router, ActivatedRoute } from '@angular/router';
import { BookCreateModel } from '../../shared/models/book-management/bookCreateModel';
import { ObservableState, handleErrors, recordState, changeRouteOnSuccess } from '../../shared/helpers';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {

  constructor(
    private bookManagementService: BookManagementService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  createModel: BookCreateModel = new BookCreateModel();
  creationState: ObservableState = new ObservableState();
  @ViewChild('formModel', { static: true }) public ngform: NgForm;
  
  ngOnInit() {
  }

  onSubmit() {
    this.creationState.Start();
    this.bookManagementService.createBook(this.createModel)
      .pipe(
        handleErrors(this.ngform.form),
        recordState(this.creationState),
        changeRouteOnSuccess(this.router, this.route, "../")
      )
      .subscribe();
  }

}
