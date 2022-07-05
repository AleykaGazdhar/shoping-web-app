import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
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
declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productForm: any = new FormGroup({});

  @ViewChild('ProductModal', { static: false })
  public ProductModal: any = ModalDirective;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private usersService: UsersService
    ) { }

  ngOnInit(): void {
    this.productFormValidation();
  }

  productFormValidation () {
    this.productForm = this.fb.group({
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
  showeModel() {
    this.ProductModal.show();
  }

  get formError() {
    return this.productForm.controls;
  }

  addProduct() {
    console.log(this.productForm.value);
    this.usersService.addProduct(this.productForm.value).subscribe(
      (data: any) => {
        this.spinner.show();
        if(data.status == 200) {
          this.toastr.info(data.message, 'Success! Product is added.');
          this.router.navigate(['/products']);
        }
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error(error.message, 'Error!');
      }
    );
  }
}
