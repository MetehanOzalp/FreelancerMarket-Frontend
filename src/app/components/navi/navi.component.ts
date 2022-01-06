import { TopCategoryService } from './../../services/top-category.service';
import { SubCategoryService } from './../../services/sub-category.service';
import { SubCategory } from './../../models/subCategory';
import { TopCategory } from './../../models/topCategory';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  isAuthenticated: boolean = false;
  topCategories: TopCategory[] = [];
  subCategories: SubCategory[] = [];

  constructor(
    private topCategoryService: TopCategoryService,
    private subCategoryService: SubCategoryService
  ) {}

  ngOnInit(): void {
    this.getTopCategories();
    this.getSubCategories();
  }

  getSubCategories() {
    this.subCategoryService.getSubCategories().subscribe((response) => {
      this.subCategories = response.data;
    });
  }

  getTopCategories() {
    this.topCategoryService.getTopCategories().subscribe((response) => {
      this.topCategories = response.data;
    });
  }

  getSubCategoriesByTopCategory(id: number) {
    return this.subCategories.filter((x) => x.topCategoryId == id);
  }
}
