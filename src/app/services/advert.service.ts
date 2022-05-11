import { ResponseModel } from './../models/responseModel';
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

  add(advertAddModel: any): Observable<any> {
    let newPath = this.apiUrl + '/add';
    return this.httpClient.post<ResponseModel>(newPath, advertAddModel, {
      reportProgress: true,
      observe: 'events',
    });
  }

  update(advertUpdateModel: any): Observable<any> {
    let newPath = this.apiUrl + '/update';
    return this.httpClient.post<ResponseModel>(newPath, advertUpdateModel, {
      reportProgress: true,
      observe: 'events',
    });
  }

  delete(advertId: number): Observable<ResponseModel> {
    let newPath = this.apiUrl + '/delete?advertId=' + advertId;
    return this.httpClient.delete<ResponseModel>(newPath);
  }

  getById(id: number): Observable<SingleResponseModel<Advert>> {
    let newPath = this.apiUrl + '/getById?id=' + id;
    return this.httpClient.get<SingleResponseModel<Advert>>(newPath);
  }

  getByUserName(userName: string): Observable<ListResponseModel<Advert>> {
    let newPath = this.apiUrl + '/getByUserName?userName=' + userName;
    return this.httpClient.get<ListResponseModel<Advert>>(newPath);
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
    subCategoryName: string,
    filter: AdvertFilter
  ): Observable<ListResponseModel<Advert>> {
    let newPath =
      this.apiUrl +
      '/getByFilter?subCategoryName=' +
      encodeURIComponent(subCategoryName);
    return this.httpClient.post<ListResponseModel<Advert>>(newPath, filter);
  }

  getByPageNumberAndSearchFilter(
    filter: AdvertSearchFilter
  ): Observable<ListResponseModel<Advert>> {
    let newPath = this.apiUrl + '/getBySearchFilter';
    return this.httpClient.post<ListResponseModel<Advert>>(newPath, filter);
  }
}
