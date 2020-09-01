import { Component, OnInit, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { BookListService } from '../book-list.service';
import { NgbdSortableHeader } from '../../shared/components/table/sortable.directive';

@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit, OnDestroy {

  constructor(
    public service: BookListService,
  ) {
  }
  onPageChange(event: number) {
    this.service.pagingOptions.pageIndex = event - 1;
    this.service.refresh();
  }
  onPageSizeChange() {
    this.service.refresh();
  }
  ngOnDestroy(): void {
  }
  ngOnInit() {
    this.service.refresh();
  }
}
