import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MostPopularFreelancersComponent } from './components/home-page/most-popular-freelancers/most-popular-freelancers.component';
import { MostPopularJobAdvertsComponent } from './components/home-page/most-popular-job-adverts/most-popular-job-adverts.component';
import { MostPopularServicesComponent } from './components/home-page/most-popular-services/most-popular-services.component';
import { TopCategoryComponent } from './components/top-category/top-category.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { SearchComponent } from './components/search/search.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { FavoriteAddComponent } from './components/favorite-add/favorite-add.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { FreelancerDetailComponent } from './components/freelancer-detail/freelancer-detail.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { WalletComponent } from './components/wallet/wallet.component';
import { FavoritiesComponent } from './components/favorities/favorities.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EmployerProfileComponent } from './components/profile/employer-profile/employer-profile.component';
import { FreelancerProfileComponent } from './components/profile/freelancer-profile/freelancer-profile.component';
import { ProfileSettingComponent } from './components/profile-setting/profile-setting.component';
import { ChangePasswordComponent } from './components/profile-setting/change-password/change-password.component';
import { AdvertDetailComponent } from './components/advert-detail/advert-detail.component';
import { AdvertCommentAddComponent } from './components/advert-comment-add/advert-comment-add.component';
import { FreelancerPanelComponent } from './components/freelancer-panel/freelancer-panel.component';
import { AdvertAddComponent } from './components/freelancer-panel/advert-add/advert-add.component';
import { FreelancerPanelSidebarComponent } from './components/freelancer-panel/freelancer-panel-sidebar/freelancer-panel-sidebar.component';
import { MyAdvertsComponent } from './components/freelancer-panel/my-adverts/my-adverts.component';
import { AdvertDeleteComponent } from './components/freelancer-panel/advert-delete/advert-delete.component';
import { AdvertEditComponent } from './components/freelancer-panel/advert-edit/advert-edit.component';
import { DefaultComponent } from './components/freelancer-panel/default/default.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { AuthenticatedNavbarComponent } from './components/navi/authenticated-navbar/authenticated-navbar.component';
import { UnauthenticatedNavbarComponent } from './components/navi/unauthenticated-navbar/unauthenticated-navbar.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    HomePageComponent,
    SidebarComponent,
    MostPopularFreelancersComponent,
    MostPopularJobAdvertsComponent,
    MostPopularServicesComponent,
    TopCategoryComponent,
    SubCategoryComponent,
    SearchComponent,
    RegisterComponent,
    LoginComponent,
    FavoriteAddComponent,
    ProductCardComponent,
    UserDetailComponent,
    FreelancerDetailComponent,
    DateAgoPipe,
    WalletComponent,
    FavoritiesComponent,
    ProfileComponent,
    EmployerProfileComponent,
    FreelancerProfileComponent,
    ProfileSettingComponent,
    ChangePasswordComponent,
    AdvertDetailComponent,
    AdvertCommentAddComponent,
    FreelancerPanelComponent,
    AdvertAddComponent,
    FreelancerPanelSidebarComponent,
    MyAdvertsComponent,
    AdvertDeleteComponent,
    AdvertEditComponent,
    DefaultComponent,
    AuthenticatedNavbarComponent,
    UnauthenticatedNavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
    NgxStarRatingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
