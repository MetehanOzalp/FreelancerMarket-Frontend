import { ToastrService } from 'ngx-toastr';
import { OrderAddDto } from './../../../models/orderAddDto';
import { OrderService } from './../../../services/order.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './../../../models/user';
import { UserService } from './../../../services/user.service';
import { Advert } from './../../../models/advert';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css'],
})
export class OrderAddComponent implements OnInit {
  @Input() advert: Advert;
  user: User = {};

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private toastrService: ToastrService,
    private jwtHelperService: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  addOrder() {
    if (this.advert.id && this.user.id) {
      let order: OrderAddDto = {
        userId: this.user.id,
        advertId: this.advert.id,
      };
      this.orderService.add(order).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message, 'Hata!');
        }
      );
    }
  }

  getUser() {
    if (localStorage.getItem('token')) {
      this.userService
        .getByUserName(
          this.jwtHelperService.decodeToken(localStorage.getItem('token')).sub
        )
        .subscribe((response) => {
          this.user = response.data;
        });
    }
  }
}
