import { SingleResponseModel } from './../models/singleResponseModel';
import { SubCategory } from './../models/subCategory';
import { ListResponseModel } from './../models/listResponseModel';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService {
  apiUrl = `${environment.apiUrl}/subCategories`;

  constructor(private httpClient: HttpClient) {}

  getSubCategories(): Observable<ListResponseModel<SubCategory>> {
    let newPath = this.apiUrl + '/getAll';
    return this.httpClient.get<ListResponseModel<SubCategory>>(newPath);
  }

  getNameOfSubCategory(
    name: string
  ): Observable<SingleResponseModel<SubCategory>> {
    let newPath = this.apiUrl + '/getByName?name=' + encodeURIComponent(name);
    return this.httpClient.get<SingleResponseModel<SubCategory>>(newPath);
  }

  getSubCategoriesByTopCategoryName(
    topCategoryName: string
  ): Observable<ListResponseModel<SubCategory>> {
    let newPath =
      this.apiUrl +
      '/getByTopCategoryName?topCategoryName=' +
      encodeURIComponent(topCategoryName);
    return this.httpClient.get<ListResponseModel<SubCategory>>(newPath);
  }

  getMostPopularSubCategories(): Observable<ListResponseModel<SubCategory>> {
    let newPath = this.apiUrl + '/getMostPopularSubCategories';
    return this.httpClient.get<ListResponseModel<SubCategory>>(newPath);
  }
}
