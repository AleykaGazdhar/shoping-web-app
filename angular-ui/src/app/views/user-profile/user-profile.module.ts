import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { SharedUiModule } from '../../shared-ui';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    SharedUiModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class UserProfileModule { }
