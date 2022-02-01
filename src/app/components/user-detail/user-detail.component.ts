import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  userName: string;
  user: User = {};
  isFreelancer: boolean = false;
  dataLoaded: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.userName = params['userName'];
      if (this.userName) {
        this.getByUserName();
      }
    });
  }

  getByUserName() {
    this.userService.getByUserName(this.userName).subscribe(
      (response) => {
        this.user = response.data;
        this.dataLoaded = true;
        this.user.operationClaims.forEach((element) => {
          if (element.claimName == 'ROLE_FREELANCER') {
            this.isFreelancer = true;
          } else {
            this.router.navigate(['/']);
            this.toastrService.warning('Freelancer bulunamadı', 'Dikkat');
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
