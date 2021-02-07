import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages';

const routes: Routes = [
  {
    path: 'login',
    data: {
      breadcrumb: 'Login'
    },
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
     RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class  AccountRoutingModule { }
