import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewPlanComponent } from './pages/new-plan/new-plan.component';
import { PlanListComponent } from './pages/plan-list/plan-list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'PlanList'
    },
    component: PlanListComponent
  },
  {
    path: 'new-plan',
    data: {
      breadcrumb: 'newPlan'
    },
    component: NewPlanComponent
  }
];

@NgModule({
  imports: [
     RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class  PlanManagementRoutingModule { }
