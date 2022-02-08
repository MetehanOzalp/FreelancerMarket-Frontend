import { User } from './../../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User = {};
  isFreelancer: boolean = false;
  isEmployer: boolean = false;
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
          this.user.operationClaims.forEach((element) => {
            if (element.claimName == 'ROLE_FREELANCER') {
              this.isFreelancer = true;
            } else if (element.claimName == 'ROLE_EMPLOYER') {
              this.isEmployer = true;
            } else {
              this.router.navigate(['/']);
              this.toastrService.warning('Kullanıcı bulunamadı', 'Dikkat');
            }
          });
        },
        (responseError) => {
          this.dataLoaded = true;
          this.router.navigate(['/']);
          this.toastrService.warning(responseError.error.message, 'Dikkat');
        }
      );
  }
}
