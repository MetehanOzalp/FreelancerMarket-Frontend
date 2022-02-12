import { ListResponseModel } from './../models/listResponseModel';
import { ResponseModel } from './../models/responseModel';
import { Observable } from 'rxjs';
import { AdvertComment } from './../models/advertComment';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdvertCommentService {
  apiUrl = `${environment.apiUrl}/advertComments`;

  constructor(private httpClient: HttpClient) {}

  add(advertComment: AdvertComment): Observable<ResponseModel> {
    let newPath = this.apiUrl + '/add';
    return this.httpClient.post<ResponseModel>(newPath, advertComment);
  }

  getByAdvertId(id: number): Observable<ListResponseModel<AdvertComment>> {
    let newPath = this.apiUrl + '/getByAdvertId?advertCommentId=' + id;
    return this.httpClient.get<ListResponseModel<AdvertComment>>(newPath);
  }
}
