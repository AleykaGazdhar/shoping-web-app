import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService, JwtService, UsersService } from '../../shared-ui';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../environments/environment';

class loginUser {
  email: string = '';
  password: string = '';
  remember: boolean = false;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login: loginUser = new loginUser();
  currentUser: any;
  fieldTextType: boolean = false;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private jwtService: JwtService,
    private usersService: UsersService,
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.spinner.hide();
    let rememberMeCookie = this.jwtService.getCookie(environment.cookieToken);
    if (rememberMeCookie) {
      this.login = rememberMeCookie;
    }
  }
  //login with Api
  doLogin() {
    let loginPostData = this.login;
    this.spinner.show();
    if (loginPostData.remember) {
      this.jwtService.setCookie(environment.cookieToken, loginPostData);
    } else {
      this.jwtService.deleteCookie(environment.cookieToken);
    }
    this.usersService.doSignIn(loginPostData).subscribe(
      (data: any) => {
        this.spinner.hide();
        if (data.status == 200) {
          let userDetails = data.data;
          this.jwtService.saveToken(userDetails.authorization);
          this.jwtService.saveCurrentUser(JSON.stringify(userDetails));
          this.jwtService.getCurrentUser();
          this.globalService.sendActionChildToParent('Loggin');
          this.router.navigate(['/user-profile']);
        } else if (data.status == 201) {
          this.toastr.warning(data.message, 'Warning');
        } else {
          this.toastr.error(data.message, 'Error');
        }
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error(error.message, 'Error');
      }
    );
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}