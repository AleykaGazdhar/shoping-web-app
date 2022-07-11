import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared-ui/services/api.service';
import { ProductService } from '../products/product.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productsList: any[] = [];
  constructor(
    private apiService: ApiService,
    private productService: ProductService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getProductsList();
  }
  getProductsList() {
    this.productService.getProductsList({ status: 1 }).subscribe({
      //only shows pbject whose status is 1
      next: (dataRes: any) => {
        this.spinner.show();
        if (dataRes.status == 200) {
          this.spinner.hide();
          this.productsList = dataRes.data;
          this.spinner.hide();
        }
      },
      error: (error: any) => {
        this.spinner.hide();
      },
    });
  }
}
