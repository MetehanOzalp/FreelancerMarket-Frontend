import { JwtHelperService } from '@auth0/angular-jwt';
import { AdvertService } from './../../../services/advert.service';
import { Advert } from './../../../models/advert';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-adverts',
  templateUrl: './my-adverts.component.html',
  styleUrls: ['./my-adverts.component.css'],
})
export class MyAdvertsComponent implements OnInit {
  adverts: Advert[] = [];
  advert: Advert = {};
  dataLoaded: boolean = false;

  constructor(
    private toastrService: ToastrService,
    private advertService: AdvertService,
    private jwtHelperService: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.getAdverts();
  }

  selectedAdvert(advert: Advert) {
    this.advert = advert;
  }

  getAdverts() {
    this.advertService
      .getByUserName(
        this.jwtHelperService.decodeToken(localStorage.getItem('token')).sub
      )
      .subscribe(
        (response) => {
          this.adverts = response.data;
          this.dataLoaded = true;
        },
        (responseError) => {
          this.dataLoaded = true;
          this.toastrService.error(responseError.error.message, 'Hata!');
        }
      );
  }

  deleteAdvert(event: any) {
    this.adverts = this.adverts.filter((x) => x.id != event);
  }
}
