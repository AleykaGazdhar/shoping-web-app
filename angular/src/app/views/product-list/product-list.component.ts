import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { currentUser, GlobalService, JwtService, UsersService } from '../../shared-ui';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ProductService } from '../products/product.service';
import { environment } from '../../../environments/environment';
declare var $: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  orderList: any[] = [];
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  currentUser: currentUser = new currentUser();
  uRoles: any = environment.role;
  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private jwtService: JwtService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.jwtService.getCurrentUser();
    this.dtOptions = {
      responsive: true,
      scrollX: true,
      scrollY: '350px',
      scrollCollapse: true,
      pageLength:10,
      columnDefs: [
        /* {
          targets: 4,
          orderable: false,
          searchable: false,
        },
        {
          targets: 5,
          orderable: false,
          searchable: false,
        }, */
      ],
    };
    this.getorderList();
  }


  ngAfterViewInit(): void {
    this.dtTrigger.next('');
  }

  getorderList() {
    this.spinner.show();
    let whereObj = {};
    if(this.currentUser.role == this.uRoles.userRole) {
      whereObj = {userId: this.currentUser._id}
    }
    this.productService.getOrderList(whereObj).subscribe({
      next: (dataRes: any) => {
        console.log("dataRes========", dataRes);
        if (dataRes.status == 200) {
          this.datatableElement.dtInstance.then(
            (dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next('');
              this.orderList = dataRes.data;
              this.spinner.hide();
            }
          );
        }
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error(error.message, 'Error!');
      },
    });
  }
}
