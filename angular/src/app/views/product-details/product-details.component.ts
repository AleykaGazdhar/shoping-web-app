import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared-ui/services/api.service';
import { ProductService } from '../products/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import{
  currentUser,
  GlobalService,
  JwtService,
  UsersService,
} from '../../shared-ui';

declare let Razorpay: any;

// dummy card number : 4111 1111 1111 1111
// Expiry date: 0524 (MMYY)
// CSC/CVV: 100

export class rayzorPayConfig {
  fullName: string = '';
  amount: string = '0';
  email: string = '';
  userId: string = '';
  razorpayOrderId: any = '';
  razorpayPaymentId: any = '';
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  orderDetails: rayzorPayConfig = new rayzorPayConfig();
  currentUser: currentUser = new currentUser();

  productID: any;
  productData: any = {};
  quantity: any= 1;
  RAZORPAY_OPTIONS: any = {
    key: 'rzp_test_Cl5FzNaTJyToxF',
    amount: '',
    name: 'Novopay',
    order_id: '',
    description: 'Load Wallet',
    image:
      'https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg',
    handler: (res: any) => {},
    prefill: {
      name: '',
      email: '',
      contact: '',
      method: '',
    },
    modal: {},
    theme: {
      color: '#0096C5',
    },
  };
  rzp1: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private _GlobalService: GlobalService,
    private jwtService: JwtService,
  ) {}

  ngOnInit() {
    this.currentUser = this.jwtService.getCurrentUser();
    if( this.currentUser &&  this.currentUser._id) {
      this.orderDetails.fullName = this.currentUser.firstname
      this.orderDetails.email = this.currentUser.email
      this.orderDetails.userId = this.currentUser._id
    }
    this.route.paramMap.subscribe((params) => {
      this.productID = params.get('id');
      this.getProductDetails();
    });
  }

  getProductDetails() {
    this.spinner.show();
    this.productService.getProductsList({ _id: this.productID }).subscribe({
      next: (dataRes: any) => {
        this.spinner.hide();
        if (dataRes.status == 200) {
          this.productData = dataRes.data[0];
        }
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error(error.message, 'Error!');
      },
    });
  }
  calculateMargin() {
    if (Number(this.productData.productmargin)) {
      let perceVal:any = this.productData.productprice * (this.productData.productmargin/100)
      perceVal = this.productData.productprice-perceVal;
      perceVal = (perceVal*this.quantity).toFixed(2)
      this.orderDetails.amount = perceVal;
      return perceVal;
    } else {
      let perceVal: any = this.productData.productprice * this.quantity;
      this.orderDetails.amount = perceVal;
      return perceVal
    }
  }
  commingSoon() {
    this.toastr.error('This feature is Comming Soon');
  };



  razorPay() {
    if(this.currentUser && this.currentUser._id) {
      let postData: any = Object.assign({}, this.orderDetails);
      postData.amount = Number(postData.amount).toFixed(2);
      this.productService.razorPayCreateOrder(postData).subscribe((data: any) => {
        this.RAZORPAY_OPTIONS.key = data.razor_key_id;
        this.RAZORPAY_OPTIONS.amount = data.order.amount;
        this.RAZORPAY_OPTIONS.name = this.orderDetails.fullName;
        this.RAZORPAY_OPTIONS.order_id = data.order.id;
        this.RAZORPAY_OPTIONS.email = this.currentUser.email;
        this.RAZORPAY_OPTIONS.handler = this.razorPaySuccessHandler.bind(this);
        console.log('this.RAZORPAY_OPTIONS: ', this.RAZORPAY_OPTIONS);
        this.rzp1 = new Razorpay(this.RAZORPAY_OPTIONS);
        this.rzp1.open();
      });
    } else {
      this._GlobalService.productViewid = this.productData._id
      this.router.navigate(['/login']);
    }
  }

  razorPaySuccessHandler(response: any) {
    if (response && response.razorpay_payment_id) {
      const postData = Object.assign({}, this.orderDetails);
      postData.razorpayOrderId = response.razorpay_order_id;
      postData.razorpayPaymentId = response.razorpay_payment_id;
      postData.amount = Number(postData.amount).toFixed(2);
      this.toastr.success('Payment has been done Successfully');
      this.toastr.success('Payment has been done Successfully');
      this.savePaymentData(postData);
    } else {
      this.toastr.error('Payment Failed');
    }
  }

  savePaymentData(postdata: any) {
    const self = this;
    this.spinner.show();
    let postData: any = postdata;
    postData.productDetails = this.productData;
    postData.quantity = this.quantity;
    this.productService.razorPayOrdayPayment(postData).subscribe(
      (data: any) => {
        this.spinner.hide();
        if (data.status === 200) {
          self.toastr.success('Payment has been succesfully.', 'Success!');
          this.orderDetails = new rayzorPayConfig();
          this.router.navigate(['/order-list']);
        } else {
          this.toastr.error('Payment Failed');
        }
      },
      (error: any) => {
        console.log('error: ', error);
      }
    );
  }


}
