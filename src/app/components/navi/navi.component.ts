import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { AdvertSearchFilter } from './../../models/advertSearchFilter';
import { TopCategoryService } from './../../services/top-category.service';
import { SubCategoryService } from './../../services/sub-category.service';
import { SubCategory } from './../../models/subCategory';
import { TopCategory } from './../../models/topCategory';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  isAuthenticated: boolean = false;
  topCategories: TopCategory[] = [];
  subCategories: SubCategory[] = [];
  filter: AdvertSearchFilter = {};
  user: User = {};

  constructor(
    private topCategoryService: TopCategoryService,
    private subCategoryService: SubCategoryService,
    private jwtHelperService: JwtHelperService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAuthentication();
    if (this.isAuthenticated) {
      this.getUser();
    }
    this.getTopCategories();
    this.getSubCategories();
  }

  checkAuthentication() {
    if (this.authService.isAuthenticated()) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

  getUser() {
    let userName = this.jwtHelperService.decodeToken(
      localStorage.getItem('token')
    ).sub;
    this.userService.getByUserName(userName).subscribe((response) => {
      this.user = response.data;
    });
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

  createFilter() {
    if (this.filter.term != undefined || this.filter.term != null) {
      this.router.navigate(['search/', JSON.stringify(this.filter)]);
    }
  }

  getUrl(param: string) {
    return param.replace(/ /g, '-').toLocaleLowerCase('tr-TR');
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }
}
