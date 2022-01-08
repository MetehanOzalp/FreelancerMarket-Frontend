import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [AppComponent, NaviComponent, HomePageComponent, SidebarComponent, MostPopularFreelancersComponent, MostPopularJobAdvertsComponent, MostPopularServicesComponent, TopCategoryComponent, SubCategoryComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
