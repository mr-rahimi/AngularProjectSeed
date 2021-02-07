import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  }
];

@NgModule({
  imports: [
     RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class  DashboardRoutingModule { }
