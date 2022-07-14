import { Component, OnInit } from '@angular/core';
import {currentUser, GlobalService,
  JwtService,
  UsersService,} from '../../shared-ui'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  currentUser: currentUser = new currentUser();
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.jwtService.getCurrentUser();
  }

}
