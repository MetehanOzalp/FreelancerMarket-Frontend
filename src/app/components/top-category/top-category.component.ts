import { SubCategoryService } from './../../services/sub-category.service';
import { TopCategoryService } from './../../services/top-category.service';
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

  constructor(
    private subCategoryService: SubCategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.topCategoryName = params['top-category-name'];
    });
    this.getSubCategoriesByTopCategoryName();
  }

  getSubCategoriesByTopCategoryName() {
    this.subCategoryService
      .getSubCategoriesByTopCategoryName(this.topCategoryName)
      .subscribe((response) => {
        this.subCategories = response.data;
      });
  }
}
