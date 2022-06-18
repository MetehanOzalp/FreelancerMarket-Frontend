import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { TopCategoryService } from './../../services/top-category.service';
import { SubCategoryService } from './../../services/sub-category.service';
import { SubCategory } from './../../models/subCategory';
import { TopCategory } from './../../models/topCategory';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  isAuthenticated: boolean = false;
  isFreelancer: boolean = false;
  topCategories: TopCategory[] = [];
  subCategories: SubCategory[] = [];
  user: User = {};

  constructor(
    private topCategoryService: TopCategoryService,
    private subCategoryService: SubCategoryService,
    private jwtHelperService: JwtHelperService,
    private authService: AuthService,
    private userService: UserService
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
      this.user.operationClaims.forEach((element) => {
        if (element.claimName == 'ROLE_FREELANCER') {
          this.isFreelancer = true;
        }
      });
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

  getUrl(param: string) {
    return param.replace(/ /g, '-').toLocaleLowerCase('tr-TR');
  }
}
