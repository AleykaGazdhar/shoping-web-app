import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared-ui/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../shared-ui';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productsList: any[] = [];
  userId: string = ''
  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private usersService: UsersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      this.userId = res.userId;
      if (this.userId) {
        this.activateAccount();
      }
    });
  }
  activateAccount() {
    this.spinner.show();
    this.usersService.activate({ _id: this.userId, status: 1 }).subscribe({
      next: (dataRes: any) => {
        this.spinner.show();
        if (dataRes.status == 200) {
          this.toastr.success(dataRes.message + ' Please login to continue', 'Success!');
          this.productsList = dataRes.data;
        }
        this.spinner.hide();
      },
      error: (error: any) => {
        this.spinner.hide();
      },
    });
  }
  commingSoon() {
    this.toastr.info('This feature is Comming Soon...');
  };
}
