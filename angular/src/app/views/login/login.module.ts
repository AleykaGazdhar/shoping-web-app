import { NgModule } from '@angular/core';
import { SharedUiModule } from '../../shared-ui';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    LoginRoutingModule,
    SharedUiModule
  ]
})
export class LoginModule { }
