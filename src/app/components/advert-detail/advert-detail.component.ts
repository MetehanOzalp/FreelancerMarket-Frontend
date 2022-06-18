import { AdvertComment } from './../../models/advertComment';
import { AdvertCommentService } from './../../services/advert-comment.service';
import { UserService } from './../../services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Order } from './../../models/order';
import { OrderService } from './../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { Advert } from 'src/app/models/advert';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertService } from './../../services/advert.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-advert-detail',
  templateUrl: './advert-detail.component.html',
  styleUrls: ['./advert-detail.component.css'],
  providers: [{ provide: Window, useValue: window }],
})
export class AdvertDetailComponent implements OnInit {
  advert: Advert = {};
  adverts: Advert[] = [];
  advertComments: AdvertComment[] = [];
  selectedComment: AdvertComment;
  orders: Order[] = [];
  dataLoaded: boolean = false;
  canComment: boolean = false;
  commentLoaded: boolean = false;
  userId: number;
  commentPage: number = 1;

  constructor(
    private router: Router,
    private userService: UserService,
    private orderService: OrderService,
    private advertService: AdvertService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private jwtHelperService: JwtHelperService,
    private advertCommentService: AdvertCommentService,
    @Inject(Window) private window: Window
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id'] && Number.parseInt(params['id'])) {
        this.getUserInfo();
        this.getByAdvertId(params['id']);
      }
    });
  }

  getByAdvertId(id: number) {
    this.advertService.getById(id).subscribe(
      (response) => {
        this.advert = response.data;
        this.getAdvertsByFreelancerId(this.advert.freelancerId);
        this.getOrdersByFreelancerId(this.advert.freelancerId);
        this.getAdvertCommentsByAdvertId(this.advert.id);
        this.dataLoaded = true;
      },
      (responseError) => {
        this.router.navigate(['/']);
        this.toastrService.error(responseError.error.message, 'Hata');
      }
    );
  }

  getAdvertCommentsByAdvertId(id: number) {
    this.advertCommentService.getByAdvertId(id).subscribe(
      (response) => {
        this.advertComments = response.data.sort(function (a, b) {
          return <any>new Date(b.date) - <any>new Date(a.date);
        });
        this.commentLoaded = true;
      },
      (responseError) => {
        this.toastrService.error(responseError.error.message, 'Hata');
      }
    );
  }

  getAdvertsByFreelancerId(freelancerId: number) {
    this.advertService.getByFreelancerId(freelancerId).subscribe(
      (response) => {
        this.adverts = response.data;
        this.adverts.forEach((element) => {
          if (element.id == this.advert.id) {
            let index = this.adverts.findIndex((x) => x.id == element.id);
            this.adverts.splice(index, 1);
          }
        });
        if (this.adverts.length > 4) {
          this.adverts.length = 4;
        }
      },
      (responseError) => {
        this.toastrService.error(responseError.error.message, 'Hata');
      }
    );
  }

  getUserInfo() {
    if (localStorage.getItem('token')) {
      this.userService
        .getByUserName(
          this.jwtHelperService.decodeToken(localStorage.getItem('token')).sub
        )
        .subscribe((response) => {
          this.userId = response.data.id;
        });
    }
  }

  canCommentCheck() {
    if (localStorage.getItem('token')) {
      this.orders.forEach((element) => {
        if (
          element.userId == this.userId &&
          element.advertId == this.advert.id
        ) {
          this.canComment = true;
        }
      });
    }
  }

  canCommentResponseCheck(comment: AdvertComment) {
    if (localStorage.getItem('token')) {
      if (
        this.userId == this.advert.freelancerId ||
        this.userId == comment.userId
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getOrdersByFreelancerId(freelancerId: number) {
    this.orderService.getByFreelancerId(freelancerId).subscribe((response) => {
      this.orders = response.data;
      if (this.orders.length != 0) {
        this.canCommentCheck();
      }
    });
  }

  getLastCompletedOrderDate() {
    if (this.orders.length != 0) {
      for (let index = 0; index < this.orders.length; index++) {
        if (this.orders[index].status) {
          return this.orders[index].createdDate;
        }
      }
    }
    return null;
  }

  getCreatedDate(date: Date) {
    const months = [
      'Ocak',
      'Şubat',
      'Mart',
      'Nisan',
      'Mayıs',
      'Haziran',
      'Temmuz',
      'Ağustos',
      'Eylül',
      'Ekim',
      'Kasım',
      'Aralık',
    ];
    var newDate = new Date(date);
    return months[newDate.getMonth()] + ' ' + newDate.getFullYear();
  }

  getUrl(param: string) {
    return param.replace(/ /g, '-').toLocaleLowerCase('tr-TR');
  }

  sendMessage(userName: string) {
    this.router.navigate(['/messages/' + userName]);
  }

  selectComment(comment: AdvertComment) {
    this.selectedComment = comment;
  }

  onEdit() {
    this.window.document.getElementById('comments').scrollIntoView();
  }
}
