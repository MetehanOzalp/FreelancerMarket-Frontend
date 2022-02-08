import { ProfileSettingComponent } from './components/profile-setting/profile-setting.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FavoritiesComponent } from './components/favorities/favorities.component';
import { LoginGuard } from './guards/login.guard';
import { WalletComponent } from './components/wallet/wallet.component';
import { ExpiredTokenGuard } from './guards/expired-token.guard';
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
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
    canActivate: [ExpiredTokenGuard],
  },
  {
    path: 'top-categories/:top-category-name',
    pathMatch: 'full',
    component: TopCategoryComponent,
    canActivate: [ExpiredTokenGuard],
  },
  {
    path: 'sub-categories/:sub-category-name',
    pathMatch: 'full',
    component: SubCategoryComponent,
    canActivate: [ExpiredTokenGuard],
  },
  {
    path: 'sub-categories/:sub-category-name/:filter',
    pathMatch: 'full',
    component: SubCategoryComponent,
    canActivate: [ExpiredTokenGuard],
  },
  {
    path: 'search/:filter',
    pathMatch: 'full',
    component: SearchComponent,
    canActivate: [ExpiredTokenGuard],
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent,
    canActivate: [ExpiredTokenGuard],
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
    canActivate: [ExpiredTokenGuard],
  },
  {
    path: 'users/:userName',
    pathMatch: 'full',
    component: UserDetailComponent,
    canActivate: [ExpiredTokenGuard],
  },
  {
    path: 'wallet',
    pathMatch: 'full',
    component: WalletComponent,
    canActivate: [LoginGuard, ExpiredTokenGuard],
  },
  {
    path: 'favorities',
    pathMatch: 'full',
    component: FavoritiesComponent,
    canActivate: [LoginGuard, ExpiredTokenGuard],
  },
  {
    path: 'profile',
    pathMatch: 'full',
    component: ProfileComponent,
    canActivate: [LoginGuard, ExpiredTokenGuard],
  },
  {
    path: 'profile/settings',
    pathMatch: 'full',
    component: ProfileSettingComponent,
    canActivate: [LoginGuard, ExpiredTokenGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
