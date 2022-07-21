import { Component, OnInit } from '@angular/core';
import {
  currentUser, GlobalService,
  JwtService,
  UsersService,
} from '../../shared-ui';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  currentUser: currentUser = new currentUser();
  userStaticDetail: any = {};
  fieldTextType: boolean = false;

  requiredValidation: any = {
    fullName: '',
    phoneNumber: '',
  };
  inValidateCheck: any = {
    phoneNumber: false,
    strongPasswordCheck: false,
  };

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.jwtService.getCurrentUser();
    this.userStaticDetail = { ...this.currentUser };
  }

  checkvalidation(key: any) {
    let profileValidate: any = { ...this.currentUser };
    if (profileValidate[key]) {
      return 'text-success';
    } else {
      return 'text-danger';
    }
  }

  uploadProfile() {
    const ObjectKeys = Object.keys(this.requiredValidation);
    let postData: any = { ...this.currentUser };
    const found = ObjectKeys.filter((key: any) => {
      return !postData[key];
    });
    console.log("found=====", found);
    // this.spinner.show();
    if (found.length) {
      this.toastr.warning('*Fill All Fields are mandatory.', 'Warning');
      this.spinner.hide();
      return false;
    } else if (postData.password && postData.password !== postData.confirm_password) {
      this.toastr.warning('*Please write same password.', 'Warning');
      this.spinner.hide();
      return false;
    }
    else {
      this.doSignUp(postData);
    }
    return;
  }

  doSignUp(postData: any) {
    let savePassword = postData.password;
    this.usersService.doSignUp(postData).subscribe((data: any) => {
      this.spinner.hide();
      if (data.status === 200) {
        let userDetails = data.data;
        delete userDetails.profileOldImage;
        if (savePassword) {
          this.jwtService.destroyToken();
          this.globalService.logOut();
          this.router.navigate(["/login"]);
          this.toastr.success(data.message, 'Success');
        } else {
          this.toastr.success(data.message, 'Success');
          this.jwtService.saveCurrentUser(JSON.stringify(userDetails));
          this.currentUser = this.jwtService.getCurrentUser();
          this.userStaticDetail = { ...this.currentUser };
          this.globalService.sendActionChildToParent('updatedUserInfo')
        }
      } else {
        this.toastr.error(data.message, 'Error');
        this.spinner.hide();
      }
    }, (error: any) => {
      this.spinner.hide()
      this.toastr.error(error, 'Error!');
    });
    return;
  }

  patternMatchCheck(profileValue: any, validateType: string) {
    const validate = this.globalService.patternMatchRegex(profileValue, validateType)
    this.inValidateCheck[validateType] = validate;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}



