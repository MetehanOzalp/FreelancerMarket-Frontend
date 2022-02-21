import { AdvertCommentService } from './../../services/advert-comment.service';
import { AdvertComment } from './../../models/advertComment';
import { OrderService } from './../../services/order.service';
import { Order } from './../../models/order';
import { Advert } from './../../models/advert';
import { AdvertService } from './../../services/advert.service';
import { Component, OnInit, Input } from '@angular/core';
import { Freelancer } from 'src/app/models/freelancer';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-freelancer-detail',
  templateUrl: './freelancer-detail.component.html',
  styleUrls: ['./freelancer-detail.component.css'],
})
export class FreelancerDetailComponent implements OnInit {
  @Input() user: User;
  freelancer: Freelancer = {};
  adverts: Advert[] = [];
  advertComments: AdvertComment[] = [];
  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private advertService: AdvertService,
    private toastrService: ToastrService,
    private advertCommentService: AdvertCommentService
  ) {}

  ngOnInit(): void {
    this.getAdvertsByFreelancerId(this.user.id);
    this.getOrdersByFreelancerId(this.user.id);
    this.getCommentsByFreelancerId(this.user.id);
    this.userMappingToFreelancer();
  }

  userMappingToFreelancer() {
    let object = JSON.stringify(this.user);
    this.freelancer = JSON.parse(object);
  }

  getAdvertsByFreelancerId(freelancerId: number) {
    this.advertService.getByFreelancerId(freelancerId).subscribe(
      (response) => {
        this.adverts = response.data;
      },
      (responseError) => {
        this.toastrService.error(responseError.error.message, 'Hata');
      }
    );
  }

  getCommentsByFreelancerId(freelancerId: number) {
    this.advertCommentService
      .getByFreelancerId(freelancerId)
      .subscribe((response) => {
        this.advertComments = response.data;
      });
  }

  getOrdersByFreelancerId(freelancerId: number) {
    this.orderService.getByFreelancerId(freelancerId).subscribe((response) => {
      this.orders = response.data;
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
}
