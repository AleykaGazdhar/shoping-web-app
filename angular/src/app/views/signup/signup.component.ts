import { Component, OnInit } from '@angular/core';
import { signupUser } from './modules/signup.model';
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
import { environment } from '../../../environments/environment';

declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  /**signup: signupUser = new signupUser(); **/
  signupForm: any = new FormGroup({});

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.userFormValidation();
  }

  userFormValidation() {
    this.signupForm = this.fb.group(
      {
        fullName: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
          ],
        ],
        dob: [
          '',
          [
            Validators.required,
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
          ],
        ],
        phoneNumber: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
            Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          ],
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*[^A-Za-z0-9])(?=.*?[0-9]).{8,}$'
            ),
          ]),
        ],
        confirmpassword: ['', [Validators.required]],
        gender: 'male',
        status: 0,
        role: environment.role.userRole,

      },
      {
        validator: this.passwordConfirming,
      }
    );
  }

  passwordConfirming(c: any) {
    if (c.get('password').value !== c.get('confirmpassword').value) {
      return { invalid: true };
    } else {
      return true;
    }
  }

  get formError() {
    return this.signupForm.controls;
  }

  doSignUp() {
    this.spinner.show();
    let postDatails = Object.assign({}, this.signupForm.value);
    delete postDatails.confirmpassword;
    console.log(postDatails);
    this.usersService.doSignUp(postDatails).subscribe(
      {
        next: (data: any) => {
          this.spinner.hide();
          if (data.status == 200) {
            this.toastr.info(data.message, 'Success!');
            this.router.navigate(['/login']);
          }
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error(error.message, 'Error!');
        }
      }
    );
    return;
  }
}
