import { ResponseModel } from './../models/responseModel';
import { Observable } from 'rxjs';
import { AdvertCommentResponse } from './../models/advertCommentResponse';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdvertCommentResponseService {
  apiUrl = `${environment.apiUrl}/advertCommentResponses`;

  constructor(private httpClient: HttpClient) {}

  add(advertCommentResponse: AdvertCommentResponse): Observable<ResponseModel> {
    let newPath = this.apiUrl + '/add';
    return this.httpClient.post<ResponseModel>(newPath, advertCommentResponse);
  }
}
