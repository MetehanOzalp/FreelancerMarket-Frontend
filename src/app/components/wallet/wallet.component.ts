import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
})
export class WalletComponent implements OnInit {
  user: User = {};
  dataLoaded: boolean = false;

  constructor(
    private userService: UserService,
    private jwtHelperService: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.userService
      .getByUserName(this.jwtHelperService.decodeToken().sub)
      .subscribe((response) => {
        this.user = response.data;
        this.user.walletTransactions.forEach((element) => {
          console.log('geldi');
          if (element.transactionName == 'MONEY_WITHDRAW') {
            element.transactionName = 'Giden Para';
          } else if (element.transactionName == 'MONEY_DEPOSIT') {
            element.transactionName = 'Gelen Para';
          }
        });
        this.dataLoaded = true;
      });
  }
}
