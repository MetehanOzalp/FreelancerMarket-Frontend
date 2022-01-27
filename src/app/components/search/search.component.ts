import { SubCategory } from 'src/app/models/subCategory';
import { AdvertService } from './../../services/advert.service';
import { AdvertSearchFilter } from './../../models/advertSearchFilter';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Advert } from 'src/app/models/advert';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  adverts: Advert[] = [];
  subCategories: SubCategory[] = [];
  filter: AdvertSearchFilter = {};
  dataLoaded: Boolean = false;
  didCategoriesCome: Boolean = false;
  term: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private advertService: AdvertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataLoaded = false;
    this.activatedRoute.params.subscribe((params) => {
      if (params['filter']) {
        if (JSON.parse(params['filter']).term != this.filter.term) {
          this.subCategories = [];
        }
        this.filter = JSON.parse(params['filter']);
        this.didCategoriesCome = false;
        this.getByPageNumberAndSearchFilter();
      }
    });
  }

  getByPageNumberAndSearchFilter() {
    this.advertService
      .getByPageNumberAndSearchFilter(1, this.filter)
      .subscribe((response) => {
        this.adverts = response.data;
        this.dataLoaded = true;
        if (!this.didCategoriesCome) {
          this.getCategoryOfJobAdverts();
        }
      });
  }

  createFilter() {
    if (Object.keys(this.filter).length !== 0) {
      if (
        this.filter.maxPrice != null &&
        this.filter.maxPrice != undefined &&
        this.filter.maxPrice.toString() == ''
      ) {
        this.filter.maxPrice = undefined;
      }
      if (
        this.filter.minPrice != null &&
        this.filter.minPrice != undefined &&
        this.filter.minPrice.toString() == ''
      ) {
        this.filter.minPrice = undefined;
      }
      if (
        this.filter.slug != null &&
        this.filter.slug != undefined &&
        this.filter.slug.toString() == 'undefined'
      ) {
        this.filter.slug = undefined;
      }
      this.router.navigate(['search/', JSON.stringify(this.filter)]);
    }
  }

  getCategoryOfJobAdverts() {
    for (let i = 0; i < this.adverts.length; i++) {
      let isThere: Boolean = false;
      for (let j = 0; j < this.subCategories.length; j++) {
        if (
          this.subCategories.length != 0 &&
          this.adverts[i].subCategory.name == this.subCategories[j].name
        ) {
          isThere = true;
        }
      }
      if (!isThere) {
        this.subCategories.push(this.adverts[i].subCategory);
      }
    }
    this.didCategoriesCome = true;
  }
}
