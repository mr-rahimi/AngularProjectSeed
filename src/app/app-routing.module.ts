import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './templates/admin-panel/default-layout.component';
import { AuthGuard } from './shared/routing';
import { AccountPanelComponent } from './templates/account-panel/account-panel.component';

const routes: Routes = [
  {
    path: 'account',
    component: AccountPanelComponent,
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'admin-panel',
    component: DefaultLayoutComponent,
    loadChildren: () => import('./admin-panel/panel.module').then(m => m.PanelModule),
    canActivate: [AuthGuard],
    data: { permission: ['admin',"contentManager"] }
  },
  { path: '', redirectTo: 'admin-panel', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
