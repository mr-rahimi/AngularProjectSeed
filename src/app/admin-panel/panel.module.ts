import { NgModule } from '@angular/core';
import { PanelRoutingModule } from './panel-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LocalizationModule } from '../shared/Localization/localization.module';

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        ReactiveFormsModule,
        PanelRoutingModule,
        LocalizationModule.forChild({
            moduleName: "panel"
        }),
        SharedModule
    ],
    entryComponents: [
    ],
    providers: [],
    bootstrap: [DashboardComponent]
})

export class PanelModule { }
