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
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
