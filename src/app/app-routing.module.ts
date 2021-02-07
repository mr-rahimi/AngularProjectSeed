import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountPanelComponent, DesignerPanelComponent } from './core/templates';
import { GuestPanelComponent } from './core/templates/guest-panel/guest-panel.component';

const routes: Routes = [
  {
    path: 'panel',
    component: DesignerPanelComponent,
    //data: {
    //  breadcrumb: 'dashboard'
    //},
    children: [
      {
        path: 'dashboard',
        data: { 
          breadcrumb: 'dashboard'
        },
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'plan',
        data: {
          breadcrumb: 'plan'
        },
        loadChildren: () => import('./plan-management').then(m => m.PlanManagementModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ],
    
  },
  {
    path: 'account',
    component: AccountPanelComponent,
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
