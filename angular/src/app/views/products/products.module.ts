import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedUiModule } from '../../shared-ui';



@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedUiModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
