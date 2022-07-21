import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { JwtService, UsersService } from '..';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private subject = new Subject<any>();
  baseUrl: string = environment.baseUrl;
  users = 'users';

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private router: Router,
    private titleService: Title,
    private apiService: ApiService,
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) {}

  patternMatchRegex(inputVal: any, InputType: string) {
    let RegEx: any = '';
    if (InputType === 'email') {
      RegEx = new RegExp('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$');
    } else if (InputType === 'phoneNumber') {
      RegEx = new RegExp('^((\\+91-?)|0)?[0-9]{10}$');
    } else if (InputType === 'strongPasswordCheck') {
      RegEx = new RegExp(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*[^A-Za-z0-9])(?=.*?[0-9]).{8,}$'
      );
    }
    const validRex = RegEx.test(inputVal);
    return validRex;
  }

  getLoadingLabel(): Observable<any> {
    return this.subject.asObservable();
  }

  setLoadingLabel(action: string) {
    this.subject.next({ text: action });
  }

  sendActionChildToParent(action: string) {
    this.subject.next({ text: action });
  }

  getActionChildToParent(): Observable<any> {
    return this.subject.asObservable();
  }

  authentication() {
    const userInfo = this.jwtService.loggedUserInfo;
    if (userInfo && userInfo.email) {
      const loginInfo = {
        email: userInfo.email,
      };
      this.usersService.authentication(loginInfo).subscribe(
        (data) => {
          if (!data.currentUser) {
            this.spinner.hide();
            this.jwtService.destroyToken();
            this.sendActionChildToParent('Logout');
            this.router.navigate(['/login']);
          }
        },
        (error) => {}
      );
    }
  }

  logOut() {
    this.sendActionChildToParent('loggedOut');
    const userInfo = this.jwtService.loggedUserInfo;
    if (userInfo && userInfo.email) {
      const loginInfo = {
        email: userInfo.email,
      };
      this.usersService.logout().subscribe(
        (data) => {},
        (error) => {}
      );
    }
  }

  getPageTitle(title: any) {
    this.titleService.setTitle(title);
  }

  localUpload(image: any, folderName: string) {
    const extension = image.name.substring(image.name.lastIndexOf('.'));
    let fileName = image.name.replace(
      image.name.substr(image.name.lastIndexOf('.')),
      ''
    );
    fileName = fileName.replace(/[.]/g, '');
    let newFileName = fileName.replace(/[.\s]/g, '-') + extension;
    newFileName = newFileName + '###' + folderName;
    const formData = new FormData();
    formData.append('image', image, newFileName);
    return this.httpClient.post(this.baseUrl + 'uploadImage', formData);
  }
}
