import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ObservableState, handleErrors, recordState, changeRouteOnSuccess } from '../../shared/helpers';
import { BookCreateModel } from '../../shared/models/book/bookCreateModel';
import { BookService } from '../../shared/services';

@Component({
  selector: 'book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {

  constructor(
    private bookService: BookService,
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
    this.bookService.createBook(this.createModel)
      .pipe(
        handleErrors(this.ngform.form),
        recordState(this.creationState),
        changeRouteOnSuccess(this.router, this.route, "../")
      )
      .subscribe();
  }

}
