import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocalizationModule } from './shared/localization';
import { GuestPanelComponent, AccountPanelComponent, DesignerPanelComponent } from './core/templates';
import { BreadcrumbModule } from './shared/breadcrumb';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    GuestPanelComponent,
    AccountPanelComponent,
    DesignerPanelComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    LocalizationModule.forRoot("app"),
    BreadcrumbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
