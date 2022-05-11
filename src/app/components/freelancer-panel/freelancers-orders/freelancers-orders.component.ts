import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from './../../../services/order.service';
import { Order } from './../../../models/order';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-freelancers-orders',
  templateUrl: './freelancers-orders.component.html',
  styleUrls: ['./freelancers-orders.component.css'],
})
export class FreelancersOrdersComponent implements OnInit {
  orders: Order[] = [];
  dataLoaded: boolean = false;

  constructor(
    private orderService: OrderService,
    private toastrService: ToastrService,
    private jwtHelperService: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.getOrderByFreelancerUserName();
  }

  getOrderByFreelancerUserName() {
    this.orderService
      .getByFreelancerUserName(
        this.jwtHelperService.decodeToken(localStorage.getItem('token')).sub
      )
      .subscribe(
        (response) => {
          this.orders = response.data.sort(function (a, b) {
            return <any>new Date(b.createdDate) - <any>new Date(a.createdDate);
          });
          this.dataLoaded = true;
        },
        (responseError) => {
          this.dataLoaded = true;
          this.toastrService.error(responseError.error.message, 'Hata!');
        }
      );
  }
}
