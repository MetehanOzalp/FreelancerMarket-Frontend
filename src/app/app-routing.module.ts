import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopCategoryComponent } from './components/top-category/top-category.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },
  {
    path: 'top-categories/:top-category-name',
    pathMatch: 'full',
    component: TopCategoryComponent,
  },
  {
    path: 'sub-categories/:sub-category-name',
    pathMatch: 'full',
    component: SubCategoryComponent,
  },
  {
    path: 'sub-categories/:sub-category-name/:filter',
    pathMatch: 'full',
    component: SubCategoryComponent,
  },
  {
    path: 'search/:filter',
    pathMatch: 'full',
    component: SearchComponent,
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent,
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'users/:userName',
    pathMatch: 'full',
    component: UserDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
