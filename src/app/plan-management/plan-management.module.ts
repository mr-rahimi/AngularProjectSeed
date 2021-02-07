import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PlanManagementRoutingModule } from './plan-management.routing.module';
import { PlanListComponent } from './pages/plan-list/plan-list.component';
import { LocalizationModule } from '../shared/localization';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RichbookServiceProxyModule } from '../shared/richbook-service-proxy';
import { PlanStateService } from './plan-state-service';
import { CommonModule } from '@angular/common';
import { NewPlanComponent } from './pages/new-plan/new-plan.component';

@NgModule({
  declarations: [
    PlanListComponent,
    NewPlanComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PlanManagementRoutingModule,
    LocalizationModule.forRoot("plan-management"),
    NgbPaginationModule,
    RichbookServiceProxyModule
  ],
  entryComponents: [
  ],
  providers: [PlanStateService],
  bootstrap: []
})

export class PlanManagementModule { }
