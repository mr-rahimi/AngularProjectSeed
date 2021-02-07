import { Component, OnInit } from '@angular/core';
import { PlanStateService } from '../../plan-state-service';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss']
})
export class PlanListComponent implements OnInit {

  constructor(
    public service: PlanStateService
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
