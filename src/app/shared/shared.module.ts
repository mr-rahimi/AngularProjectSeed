import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorAlertComponent } from './components/errorAlert/errorAlert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequiredDirective } from './components/required-asterisk/required.directive';
import { CustomInputComponent } from './components/date-mask/date-mask';
import { TextMaskModule } from 'angular2-text-mask';
import { AuthDirective } from './Permission/auth.directive';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { FormGroupErrorsPipe } from './pipes/from-group-errors.pipe';
import { NgbdSortableHeader } from './components/table/sortable.directive';
import { MinValidator, UrlValidator } from './validators';
import { ToastsContainer } from './components/toast';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CaptchaComponent } from './components/captcha/captcha.component';
import { SafePipe } from './pipes/safe-pipe';
import { DateTimePipe, DateFormatterPipe, TimeFormatterPipe } from './pipes/dateTime.pipe';
import { DatepickerComponent } from './components/date-picker/date-picker';
import { CookieService } from 'ngx-cookie-service'
import { PricePipe } from './pipes/price-pipe';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './components/confirmation-dialog/confirmation-dialog.service';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
@NgModule({
  declarations: [
    //validation directive
    MinValidator,
    UrlValidator,
    //other elements
    ToastsContainer,
    AuthDirective,
    ErrorAlertComponent,
    //RequiredDirective,
    CustomInputComponent,
    DatepickerComponent,
    FormGroupErrorsPipe,
    DateTimePipe,
    DateFormatterPipe,
    TimeFormatterPipe,
    SafePipe,
    PricePipe,
    CaptchaComponent,
    NgbdSortableHeader,
    ConfirmationDialogComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    TextMaskModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    //validation directive
    MinValidator,
    UrlValidator,
    //other elements
    //RequiredDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthDirective,
    ErrorAlertComponent,
    CustomInputComponent,
    DatepickerComponent,
    ToastsContainer,
    CaptchaComponent,
    DateTimePipe,
    TimeFormatterPipe,
    DateFormatterPipe,
    SafePipe,
    PricePipe,
    FormGroupErrorsPipe,
    NgbdSortableHeader,
    LoadingSpinnerComponent
  ],
  entryComponents: [ConfirmationDialogComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    CookieService,
    ConfirmationDialogService
  ]
})
export class SharedModule {

}
