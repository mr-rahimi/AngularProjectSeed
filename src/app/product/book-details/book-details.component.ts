import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookManagementService } from '../../shared/services';
import { BookDetailsModel } from '../../shared/models/book-management';
import { ObservableState, recordState } from '../../shared/helpers';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  constructor(
    private bookManagementService: BookManagementService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  detailsModel: BookDetailsModel = new BookDetailsModel();
  getState: ObservableState = new ObservableState();

  ngOnInit() {
    this.getBook();
  }
  getBook(): void {
    const id: string = this.route.snapshot.queryParamMap.get('id');
    this.getState.Wait();
    this.bookManagementService.getBookDetails(id)
      .pipe(
        recordState(this.getState)
      )
      .subscribe(x => {
        this.detailsModel = x;
      });
  }

}
