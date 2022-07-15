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
import { ProductService } from '../products/product.service';
import { currentProduct } from '../../shared-ui/models/current-product';
declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
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

  @ViewChild('deleteProductrModal', { static: false })
  public deleteProductrModal: any = ModalDirective;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private usersService: UsersService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
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
    this.userRoles = Object.keys(this.userRoles);

    this.productFormValidation();
    this.getProductsList();
  }
  productFormValidation() {
    this.productForm = this.fb.group({
      _id: '',
      status: 1,
      productname: ['', [Validators.required, Validators.maxLength(50)]],
      productprice: [
        '',
        [Validators.required, Validators.maxLength(5), Validators.minLength(1)],
      ],
      productmargin: ['', [Validators.required, Validators.maxLength(5)]],
      productImg: ['', [Validators.required]],
      Productdescription: [
        '',
        [Validators.required, Validators.maxLength(500)],
      ],
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next('');
  }

  getProductsList() {
    this.spinner.show();
    this.productService.getProductsList({}).subscribe({
      next: (dataRes: any) => {
        if (dataRes.status == 200) {
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
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error(error.message, 'Error!');
      },
    });
  }

  changeUserStatus(user: any) {
    let postData = {
      _id: user._id,
      status: user.status ? 1 : 0,
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

  closeModel() {
    this.ProductModal.hide();
    this.deleteProductrModal.hide();
  }

  showeModel(product?: any) {
    this.productFormValidation();
    if (product) {
      this.productForm.reset(product);
    }
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
        if (data.status == 200) {
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

  showUserDeleteModal(product: any) {
    this.productnfo = Object.assign({}, product);
    this.deleteProductrModal.show();
  }

  deleteProduct() {
    this.spinner.show();
    this.productService.deleteProduct(this.productnfo).subscribe(
      (dataRes: any) => {
        if (dataRes.status === 200) {
          this.closeModel();
          this.spinner.hide();
          this.getProductsList();
          this.toastr.success('Product deleted successfully.', 'Success');
        }
      },
      (error: any) => {
        this.closeModel();
        this.spinner.hide();
        this.toastr.error(
          'There are some server error. Please check connection.',
          'Error'
        );
      }
    );
  }
//Sir given code
  onFileSelected(event?: any) {
    this.productForm.get('productImg').setValue('');
    if (event.target.files && event.target.files.length) {
      this.spinner.show();
      const reader = new FileReader();
      const file: File = event.target.files[0];
      var type = file.type;
      var fileType = type.split('/');
      if (fileType[0] === 'image') {
        console.log('11111111111111111')
        // if (fileType[0] === 'video' || fileType[0] === 'image') {
          reader.readAsDataURL(file);
          reader.onload = () => {
            let base64Image: any = reader.result as string; //Base64 string for preview image
            console.log("base64Image========", base64Image);
            this.productForm.get('productImg').setValue(base64Image);
            this.spinner.hide();
          };
        } else {
        console.log('222222222222222222')
        this.spinner.hide();
        this.toastr.error('Please select product photo.', 'Validation');
        $('input[type=file]').val('');
      }
    } else {
      $('input[type=file]').val('');
    }
  }
}
