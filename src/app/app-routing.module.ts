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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
