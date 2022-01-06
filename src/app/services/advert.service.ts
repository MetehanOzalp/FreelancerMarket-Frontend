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

  getMostPopularFreelancers(): Observable<ListResponseModel<Advert>> {
    let newPath = this.apiUrl + '/getMostPopularJobAdverts';
    return this.httpClient.get<ListResponseModel<Advert>>(newPath);
  }
}
