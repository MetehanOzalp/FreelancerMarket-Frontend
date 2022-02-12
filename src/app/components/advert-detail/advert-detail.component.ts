import { AdvertComment } from './../../models/advertComment';
import { AdvertCommentService } from './../../services/advert-comment.service';
import { UserService } from './../../services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './../../services/auth.service';
import { Order } from './../../models/order';
import { OrderService } from './../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { Advert } from 'src/app/models/advert';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertService } from './../../services/advert.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advert-detail',
  templateUrl: './advert-detail.component.html',
  styleUrls: ['./advert-detail.component.css'],
})
export class AdvertDetailComponent implements OnInit {
  advert: Advert = {};
  adverts: Advert[] = [];
  advertComments: AdvertComment[] = [];
  orders: Order[] = [];
  dataLoaded: boolean = false;
  canComment: boolean = false;
  userId: number;

  constructor(
    private router: Router,
    private userService: UserService,
    private orderService: OrderService,
    private advertService: AdvertService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private jwtHelperService: JwtHelperService,
    private advertCommentService: AdvertCommentService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id'] && Number.parseInt(params['id'])) {
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
        this.advertComments = response.data;
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

  canCommentCheck() {
    if (localStorage.getItem('token')) {
      this.userService
        .getByUserName(
          this.jwtHelperService.decodeToken(localStorage.getItem('token')).sub
        )
        .subscribe((response) => {
          this.userId = response.data.id;
          this.orders.forEach((element) => {
            if (
              element.userId == this.userId &&
              element.advertId == this.advert.id
            ) {
              this.canComment = true;
            }
          });
        });
    }
  }

  getOrdersByFreelancerId(freelancerId: number) {
    this.orderService.getByFreelancerId(freelancerId).subscribe(
      (response) => {
        this.orders = response.data;
        this.canCommentCheck();
      },
      (responseError) => {
        this.toastrService.error(responseError.error.message, 'Hata');
      }
    );
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
}
