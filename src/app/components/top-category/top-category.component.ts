import { SubCategoryService } from './../../services/sub-category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategory } from 'src/app/models/subCategory';

@Component({
  selector: 'app-top-category',
  templateUrl: './top-category.component.html',
  styleUrls: ['./top-category.component.css'],
})
export class TopCategoryComponent implements OnInit {
  topCategoryName: string;
  subCategories: SubCategory[];
  dataLoaded: Boolean = false;

  constructor(
    private subCategoryService: SubCategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.activatedRoute.params.subscribe((params) => {
      this.dataLoaded = false;
      this.subCategories = [];
      this.topCategoryName = params['top-category-name'].replace(/-/g, ' ');
      this.formatTheTopCategoryName();
      this.getSubCategoriesByTopCategoryName();
    });
  }

  formatTheTopCategoryName() {
    if (this.topCategoryName) {
      this.topCategoryName = this.topCategoryName
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

  getSubCategoriesByTopCategoryName() {
    this.subCategoryService
      .getSubCategoriesByTopCategoryName(this.topCategoryName)
      .subscribe((response) => {
        this.subCategories = response.data;
        this.dataLoaded = true;
      });
  }

  getUrl(param: string) {
    return param.replace(/ /g, '-').toLocaleLowerCase('tr-TR');
  }
}
