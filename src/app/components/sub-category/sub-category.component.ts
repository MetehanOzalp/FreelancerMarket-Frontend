import { ToastrService } from 'ngx-toastr';
import { FreelancerDetailComponent } from './../freelancer-detail/freelancer-detail.component';
import { SubCategoryService } from './../../services/sub-category.service';
import { AdvertService } from './../../services/advert.service';
import { AdvertFilter } from '../../models/advertFilter';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Advert } from 'src/app/models/advert';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css'],
})
export class SubCategoryComponent implements OnInit {
  adverts: Advert[] = [];
  subCategoryName: string;
  filter: AdvertFilter = {};
  dataLoaded: Boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private advertService: AdvertService,
    private subCategoryService: SubCategoryService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.subCategoryName = params['sub-category-name'].replace(/-/g, ' ');
      this.formatTheSubCategoryName();
      this.getNameOfSubCategory();
      if (params['sub-category-name'] && params['filter']) {
        this.filter = JSON.parse(params['filter']);
      }
    });
  }

  formatTheSubCategoryName() {
    if (this.subCategoryName) {
      this.subCategoryName = this.subCategoryName
        .toLowerCase()
        .split(' ')
        .map(function (i: any) {
          if (i.length > 2) {
            return i.charAt(0).toUpperCase() + i.substr(1);
          } else {
            return i;
          }
        })
        .join(' ');
    }
  }

  getNameOfSubCategory() {
    this.subCategoryService
      .getNameOfSubCategory(this.subCategoryName)
      .subscribe(
        (response) => {
          this.subCategoryName = response.data.name;
          this.getByPageNumberAndFilter();
        },
        (responseError) => {
          this.toastrService.warning(responseError.error.message, 'Dikkat');
          this.router.navigate(['/']);
        }
      );
  }

  getByPageNumberAndFilter() {
    this.advertService
      .getByPageNumberAndFilter(1, this.subCategoryName, this.filter)
      .subscribe((response) => {
        this.adverts = response.data;
        this.dataLoaded = true;
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
      this.router.navigate([
        'sub-categories/' +
          this.subCategoryName.replace(/ /g, '-').toLocaleLowerCase('tr-TR') +
          '/',
        JSON.stringify(this.filter),
      ]);
    }
    if (
      this.filter.maxPrice == undefined &&
      this.filter.minPrice == undefined
    ) {
      this.router.navigate([
        'sub-categories/' +
          this.subCategoryName.replace(/ /g, '-').toLocaleLowerCase('tr-TR'),
      ]);
    }
  }
}
