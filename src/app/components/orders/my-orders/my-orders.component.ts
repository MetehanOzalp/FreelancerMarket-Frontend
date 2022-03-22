import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Order } from './../../../models/order';
import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];
  dataLoaded: boolean = false;

  constructor(
    private orderService: OrderService,
    private toastrService: ToastrService,
    private jwtHelperService: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.getOrderByUserName();
  }

  getOrderByUserName() {
    this.orderService
      .getByUserName(
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

  confirm(orderId: number) {
    this.orderService.confirm(orderId).subscribe(
      (response) => {
        this.toastrService.success(response.message, 'Başarılı');
        this.ngOnInit();
      },
      (responseError) => {
        this.toastrService.error(responseError.error.message, 'Hata!');
      }
    );
  }
}
