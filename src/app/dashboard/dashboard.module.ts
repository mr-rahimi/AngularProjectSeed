import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalizationModule } from '../shared/localization';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { IndexComponent } from './pages';

@NgModule({
    declarations: [
        IndexComponent
    ],
    imports: [
        ReactiveFormsModule,
        DashboardRoutingModule,
        LocalizationModule.forRoot("dashboard")
    ],
    entryComponents: [
    ],
    providers: [],
    bootstrap: []
})

export class DashboardModule { }
