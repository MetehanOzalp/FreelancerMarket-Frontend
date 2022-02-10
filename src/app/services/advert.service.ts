import { SingleResponseModel } from './../models/singleResponseModel';
import { AdvertSearchFilter } from './../models/advertSearchFilter';
import { AdvertFilter } from '../models/advertFilter';
import { ListResponseModel } from './../models/listResponseModel';
import { Advert } from './../models/advert';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdvertService {
  apiUrl = `${environment.apiUrl}/adverts`;

  constructor(private httpClient: HttpClient) {}

  getById(id: number): Observable<SingleResponseModel<Advert>> {
    let newPath = this.apiUrl + '/getById?id=' + id;
    return this.httpClient.get<SingleResponseModel<Advert>>(newPath);
  }

  getByFreelancerId(
    freelancerId: number
  ): Observable<ListResponseModel<Advert>> {
    let newPath =
      this.apiUrl + '/getByFreelancerId?freelancerId=' + freelancerId;
    return this.httpClient.get<ListResponseModel<Advert>>(newPath);
  }

  getMostPopularJobAdverts(): Observable<ListResponseModel<Advert>> {
    let newPath = this.apiUrl + '/getMostPopularJobAdverts';
    return this.httpClient.get<ListResponseModel<Advert>>(newPath);
  }

  getByPageNumberAndFilter(
    pageNumber: number,
    subCategoryName: string,
    filter: AdvertFilter
  ): Observable<ListResponseModel<Advert>> {
    let newPath =
      this.apiUrl +
      '/getByFilter?pageNumber=' +
      pageNumber +
      '&subCategoryName=' +
      encodeURIComponent(subCategoryName);
    return this.httpClient.post<ListResponseModel<Advert>>(newPath, filter);
  }

  getByPageNumberAndSearchFilter(
    pageNumber: number,
    filter: AdvertSearchFilter
  ): Observable<ListResponseModel<Advert>> {
    let newPath = this.apiUrl + '/getBySearchFilter?pageNumber=' + pageNumber;
    return this.httpClient.post<ListResponseModel<Advert>>(newPath, filter);
  }
}
