import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  currentUser,
  GlobalService,
  JwtService,
  UsersService,
} from '../app/shared-ui';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { data } from 'jquery';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shopping-website';
  loadingLabel: string = "Loading... Please Wait.";
  subscription: Subscription = new Subscription();
  currentUser: currentUser = new currentUser();
  addClassActiveUser: boolean = false;
  showNav: boolean = false;
  uRoles: any = environment.role;
  @ViewChild('quickSerachWrap', { static: false })
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
  ) {
    this.subscription = this.globalService
      .getActionChildToParent()
      .subscribe((message) => {
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
  getProductSearchdata() {
    this.toastr.info('This Feature is coming soon....', 'Success');
  }

  // to blank the field everytime we open the seach bar!!
  closeModel() {
    this.quickSerachWrap.hide();
    this.quickSearchProductList = [];
    this.productSearch.productSearchText = ''

  }

  showModel() {
    this.quickSerachWrap.show();
  }
}
