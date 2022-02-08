import { Advert } from './../../models/advert';
import { FavoriteService } from './../../services/favorite.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorities',
  templateUrl: './favorities.component.html',
  styleUrls: ['./favorities.component.css'],
})
export class FavoritiesComponent implements OnInit {
  user: User = {};
  adverts: Advert[] = [];
  dataLoaded: boolean = false;

  constructor(
    private userService: UserService,
    private favoriteService: FavoriteService,
    private jwtHelperService: JwtHelperService
  ) {}

  ngOnInit(): void {
    console.log('geldi');
    this.getUser();
  }

  getUser() {
    this.userService
      .getByUserName(
        this.jwtHelperService.decodeToken(localStorage.getItem('token')).sub
      )
      .subscribe((response) => {
        this.user = response.data;
        this.getFavorities();
      });
  }

  getFavorities() {
    this.favoriteService.getByUserId(this.user.id).subscribe((response) => {
      this.adverts = response.data;
      this.dataLoaded = true;
    });
  }
}
