import { NgModule } from '@angular/core';
import { SharedUiModule } from '../../shared-ui';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    SignupRoutingModule,
    ReactiveFormsModule,
    SharedUiModule

  ]
})
export class SignupModule { }
