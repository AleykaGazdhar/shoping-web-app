import { NgModule } from '@angular/core';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedUiModule } from '../../shared-ui';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    SignupRoutingModule,
    ReactiveFormsModule,
    SharedUiModule,
    BsDatepickerModule.forRoot(),

  ]
})
export class SignupModule { }
