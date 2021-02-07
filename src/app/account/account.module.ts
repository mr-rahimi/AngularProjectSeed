import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalizationModule } from '../shared/localization';
import { AccountRoutingModule } from './account.routing.module';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    ReactiveFormsModule,
    AccountRoutingModule,
    LocalizationModule.forRoot("account")
  ],
  entryComponents: [
  ],
  providers: [],
  bootstrap: []
})

export class AccountModule { }
