import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from "../../shared-ui/services/api.service";
import { ProductService } from '../products/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productID: any;
  productData: any = {};
  constructor( private route: ActivatedRoute,
               private router: Router,
               private productService: ProductService,
               private apiService: ApiService,
               private spinner: NgxSpinnerService,
               private toastr: ToastrService,
    ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
       this.productID = params.get('id');
       this.getProductDetails();
    });
  };

  getProductDetails(){
    this.spinner.show();
    this.productService.getProductsList({_id: this.productID}).subscribe({
      next: (dataRes: any) => {
        this.spinner.hide();
        console.log("dataRes=======",dataRes)
        if (dataRes.status == 200) {
              this.productData = dataRes.data;
        }
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error(error.message, 'Error!');
      },
    });

  }
}
