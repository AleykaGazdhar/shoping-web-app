import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import{
  currentUser,
  GlobalService,
  JwtService,
  UsersService,
} from '../app/shared-ui';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ProductService } from '../app//views/products/product.service';
import { data } from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'shopping-website';
  loadingLabel: string = "Loading... Please Wait.";
  subscription: Subscription  = new Subscription();
  currentUser: currentUser = new currentUser();
  addClassActiveUser: boolean = false;
  showNav: boolean = false;
  uRoles: any = environment.role;
  @ViewChild('quickSerachWrap', { static: false})
  public quickSerachWrap: any = ModalDirective;
  productSearch: any = {
    productSearchText: '',
  };
  quickSearchProductList: any[] = [];
  loadingListings: boolean = false;
  productItem: any;

constructor(
  private jwtService: JwtService,
    private router: Router,
    private globalService: GlobalService,
    private toastr: ToastrService,
    private usersService: UsersService,
    private spinner: NgxSpinnerService,
    private productService: ProductService
) {
  this.subscription = this.globalService
      .getActionChildToParent()
      .subscribe( (message) => {
        if (message) {
          this.currentUser = this.jwtService.getCurrentUser();
        }
      });
}
ngOnInit(): void {
    this.currentUser = this.jwtService.getCurrentUser();
  }

  logout() {
    this.jwtService.destroyToken();
    this.globalService.logOut();
    // this.router.navigate(['/login']);
    this.toastr.info('You have logged out successfully.', 'Success');
  }

  toggleNavbar() {
    this.showNav = !this.showNav;
  }

  getProductSearchdata(searchProductData: String) {
    this.spinner.show();
    let validString = searchProductData.replace(/\s/g, ''); //remove space from serached data
    if(validString) {
      this.productService.searchProductData({ productSearch: searchProductData }).subscribe(
        (data) => {
          if (data.status == 200) {
            this.spinner.hide();
            this.quickSearchProductList = data.data;
          } else {
            this.spinner.hide();
            this.quickSearchProductList = [{error: 'No Data Found'}];
          }
        },
        (error) => {
          this.spinner.hide();
        }
      );
    } else {
      this.quickSearchProductList = [];
      this.toastr.warning('Please Enter Product Name.', 'warning');
      this.spinner.hide();
    }
  }

 // to blank the field everytime we open the seach bar!!
  closeModel() {
   this.quickSerachWrap.hide();
   this.quickSearchProductList = [];
   this.productSearch.productSearchText = ''

  }

  showModel( ) {
    this.quickSerachWrap.show();
  }
}
