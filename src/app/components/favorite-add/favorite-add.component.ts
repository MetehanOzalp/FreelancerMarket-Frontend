import { FavoriteAddDto } from './../../models/favoriteAddDto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { AuthService } from './../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-add',
  templateUrl: './favorite-add.component.html',
  styleUrls: ['./favorite-add.component.css'],
})
export class FavoriteAddComponent implements OnInit {
  @Input() advertId: number;
  user: User = {};
  itInFavourites: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private toastrService: ToastrService,
    private favoriteService: FavoriteService,
    private jwtHelperService: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.checkIfItInFavourites();
  }

  checkIfItInFavourites() {
    if (this.authService.isAuthenticated()) {
      this.userService
        .getByUserName(this.jwtHelperService.decodeToken().sub)
        .subscribe((response) => {
          this.user = response.data;
          for (let index = 0; index < this.user.favorities.length; index++) {
            if (this.advertId == this.user.favorities[index].advertId) {
              this.itInFavourites = true;
            }
          }
        });
    }
  }

  addToFavorities() {
    if (this.authService.isAuthenticated()) {
      let favoriteAddDto: FavoriteAddDto = {
        userId: this.user.id,
        advertId: this.advertId,
      };
      this.favoriteService.add(favoriteAddDto).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.itInFavourites = true;
          this.ngOnInit();
        },
        (responseError) => {
          this.toastrService.warning(responseError.error.message, 'Dikkat');
        }
      );
    } else {
      this.toastrService.info(
        'Favorilere eklemek için giriş yapmanız gerekir',
        'Dikkat'
      );
    }
  }

  deleteToFavorities() {
    if (this.authService.isAuthenticated()) {
      this.favoriteService.delete(this.user.id, this.advertId).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.itInFavourites = false;
          this.ngOnInit();
        },
        (responseError) => {
          this.toastrService.warning(responseError.error.message, 'Dikkat');
        }
      );
    } else {
      this.toastrService.info(
        'Favorilerden çıkarmak için giriş yapmanız gerekir',
        'Dikkat'
      );
    }
  }
}
