import { AdvertService } from './../../services/advert.service';
import { AdvertFilter } from '../../models/advertFilter';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Advert } from 'src/app/models/advert';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css'],
})
export class SubCategoryComponent implements OnInit {
  adverts: Advert[] = [];
  subCategoryName: string;
  filter: AdvertFilter = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private advertService: AdvertService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.subCategoryName = params['sub-category-name'];
      if (params['sub-category-name'] && params['filter']) {
        this.filter = JSON.parse(params['filter']);
      }
      this.getByPageNumberAndFilter();
    });
  }

  getByPageNumberAndFilter() {
    this.advertService
      .getByPageNumberAndFilter(1, this.subCategoryName, this.filter)
      .subscribe((response) => {
        this.adverts = response.data;
        console.log(this.adverts);
      });
  }

  createFilter() {
    if (Object.keys(this.filter).length !== 0) {
      this.router.navigate([
        'sub-categories/' + this.subCategoryName + '/',
        JSON.stringify(this.filter),
      ]);
    }
    if (
      (this.filter.maxPrice != null && this.filter.maxPrice.toString() == '') ||
      (this.filter.minPrice != null && this.filter.minPrice.toString() == '')
    ) {
      this.router.navigate(['sub-categories/' + this.subCategoryName]);
    }
  }
}
