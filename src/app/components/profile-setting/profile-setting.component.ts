import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.css'],
})
export class ProfileSettingComponent implements OnInit {
  user: User = {};
  dataLoaded: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastrService: ToastrService,
    private jwtHelperService: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.getByUserName();
  }

  getByUserName() {
    this.userService
      .getByUserName(
        this.jwtHelperService.decodeToken(localStorage.getItem('token')).sub
      )
      .subscribe(
        (response) => {
          this.user = response.data;
          this.dataLoaded = true;
        },
        (responseError) => {
          this.dataLoaded = true;
          this.router.navigate(['/']);
          this.toastrService.warning(responseError.error.message, 'Dikkat');
        }
      );
  }
}
