import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { Router } from '@angular/router';
import { JwtService, UsersService } from '..';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private subject = new Subject<any>();
  users = 'users';

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private router: Router,
    private apiService: ApiService,
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) { }

  patternMatchRegex(inputVal: any, InputType: string) {
    let RegEx: any = '';
    if (InputType === 'email') {
      RegEx = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$');
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


}
