import { Advert } from './../models/advert';
import { ListResponseModel } from './../models/listResponseModel';
import { ResponseModel } from './../models/responseModel';
import { Observable } from 'rxjs';
import { FavoriteAddDto } from './../models/favoriteAddDto';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  apiUrl = `${environment.apiUrl}/favorities`;

  constructor(private httpClient: HttpClient) {}

  add(favoriteAddDto: FavoriteAddDto): Observable<ResponseModel> {
    let newPath = this.apiUrl + '/add';
    return this.httpClient.post<ResponseModel>(newPath, favoriteAddDto);
  }

  delete(userId: number, advertId: number): Observable<ResponseModel> {
    let newPath =
      this.apiUrl + '/delete?userId=' + userId + '&advertId=' + advertId;
    return this.httpClient.delete<ResponseModel>(newPath);
  }

  getByUserId(userId: number): Observable<ListResponseModel<Advert>> {
    let newPath = this.apiUrl + '/getByUserId?userId=' + userId;
    return this.httpClient.get<ListResponseModel<Advert>>(newPath);
  }
}
