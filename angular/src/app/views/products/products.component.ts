import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GlobalService, AlertService, UsersService } from '../../shared-ui';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ProductService } from "../products/product.service";
import { currentProduct } from "../../shared-ui/models/current-product";
declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productForm: any = new FormGroup({});
  productnfo: currentProduct = new currentProduct();
  userRoles: any = environment.role;


  @ViewChild('ProductModal', { static: false })
  public ProductModal: any = ModalDirective;
  productsList: any[] = [];

 // for angular DB Table
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  @ViewChild('deleteUserModal', { static: false })
  public deleteUserModal: any = ModalDirective;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private usersService: UsersService,
    private productService: ProductService,
    ) {
    }

  ngOnInit(): void {
    this.dtOptions = {
      responsive: true,
      scrollX: true,
      scrollY: '350px',
      scrollCollapse: true,
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
    this.userRoles = Object.keys(this.userRoles);

    this.productFormValidation();
    this.getProductsList();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next('');
  }

  getProductsList() {
    this.productService.getProductsList().subscribe(
      {
        next:
        (dataRes: any) => {
          this.spinner.show();
          if (dataRes.status == 200) {
            this.spinner.hide();
            this.datatableElement.dtInstance.then(
              (dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next('');
                this.productsList = dataRes.data;
                this.spinner.hide();
              }
            );
          }
        },
        error:(error: any) => {
          this.spinner.hide();
          this.toastr.error(error.message, 'Error!');
        }
      }
    );
  }

  changeUserStatus(user: any) {
    let postData = {
      _id: user._id,
      status: user.status ? 1: 0,
    };
    // HERE WE CAN CALL API FOR SAVING DATA
    this.productService.addProduct(postData).subscribe(
      (dataRes: any) => {
        if (dataRes.status === 200) {
          dataRes = dataRes.data;
          this.spinner.hide();
          this.toastr.success(
            'Product status has been changed successfully.',
            'Success!'
          );
          let index = this.productsList.findIndex((x) => x._id === dataRes._id);
          if (index) {
            this.productsList[index].status = dataRes.status;
          }
        }
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error(error.message, 'Error!');
      }
    );
  }

  showUserDeleteModal(product: any) {
    this.productnfo = product;
    this.deleteUserModal.show();
  }


  productFormValidation () {
    this.productForm = this.fb.group({
      _id: '',
      status: 1,
      productname: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
        ],
      ],
      productprice: [
        '',
        [
          Validators.required,
          Validators.maxLength(5),
          Validators.minLength(1),
        ],
      ],
      productmargin: [
        '',
      [
        Validators.required,
        Validators.maxLength(5),
      ],
      ],
      Productdescription: [
        '',
        [
          Validators.required,
          Validators.maxLength(300),
        ],
      ],
    });
  }


  closeModel() {
    this.ProductModal.hide();
  }
  showeModel(product?:any) {
    this.productForm.reset(product)
    this.ProductModal.show();
  }

  get formError() {
    return this.productForm.controls;
  }

  addProduct() {
    console.log(this.productForm.value);
    this.productService.addProduct(this.productForm.value).subscribe(
      (data: any) => {
        this.spinner.show();
        if(data.status == 200) {
          this.toastr.info(data.message, 'Success! Product is added.');
          this.ProductModal.hide();
          this.spinner.hide();
          this.getProductsList();
        }
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error(error.message, 'Error!');
      }
    );
  }
}
