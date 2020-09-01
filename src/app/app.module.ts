import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { LocalizationModule } from './shared/Localization/localization.module';
import { AuthInterceptor } from './shared/interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultLayoutComponent } from './templates/admin-panel/default-layout.component';
import { BreadcrumbModule } from './shared/BreadCrumb';
import { FakeProductServiceInterceptor, FakeBookManagementServiceInterceptor } from './shared/interceptor/fake-services';
import { AccountPanelComponent } from './templates/account-panel/account-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    AccountPanelComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    LocalizationModule.forRoot({
      moduleName: "app"
    }),
    BreadcrumbModule,
    SharedModule
  ],
  providers: [
    //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeProductServiceInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBookManagementServiceInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
