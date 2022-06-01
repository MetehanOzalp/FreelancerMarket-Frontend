import { AdvertCommentService } from './../../../services/advert-comment.service';
import { AdvertComment } from './../../../models/advertComment';
import { ToastrService } from 'ngx-toastr';
import { Freelancer } from './../../../models/freelancer';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-freelancer-comments',
  templateUrl: './freelancer-comments.component.html',
  styleUrls: ['./freelancer-comments.component.css'],
})
export class FreelancerCommentsComponent implements OnInit {
  freelancer: Freelancer = {};
  advertComments: AdvertComment[] = [];
  selectedComment: AdvertComment;
  commentsLoaded: boolean = false;
  commentPage: number = 1;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private jwthelperService: JwtHelperService,
    private advertCommentService: AdvertCommentService
  ) {}

  ngOnInit(): void {
    this.getFreelancer();
  }

  getFreelancer() {
    this.userService
      .getByUserName(
        this.jwthelperService.decodeToken(localStorage.getItem('token')).sub
      )
      .subscribe(
        (response) => {
          this.freelancer = response.data;
          this.getAdvertCommentByFreelancerId();
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message, 'Hata');
        }
      );
  }

  getAdvertCommentByFreelancerId() {
    this.advertCommentService.getByFreelancerId(this.freelancer.id).subscribe(
      (response) => {
        this.advertComments = response.data;
        this.commentsLoaded = true;
      },
      (responseError) => {
        this.toastrService.error(responseError.error.message, 'Hata');
      }
    );
  }

  selectComment(advertComment: AdvertComment) {
    this.selectedComment = advertComment;
  }
}
