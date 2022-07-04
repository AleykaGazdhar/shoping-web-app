import {
  Component,
  OnInit,
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
constructor(
  private jwtService: JwtService,
    private router: Router,
    private globalService: GlobalService,
    private toastr: ToastrService,
    private usersService: UsersService,
    private spinner: NgxSpinnerService
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
    console.log("this.currentUser======", this.currentUser);
  }
}
