import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../shared/routing';

const routes: Routes = [
  {
    path: 'dashboard',
    data: {
      breadcrumb: 'Dashboard'
    },
    component: DashboardComponent,
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'product',
    loadChildren: () => import('../product/module').then(m => m.Module),
    canActivate: [AuthGuard],
    data: {
      permission: ['admin', "contentManager"],
      breadcrumb: 'Products'
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
