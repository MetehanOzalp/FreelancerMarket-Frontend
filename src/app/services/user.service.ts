import { Observable } from 'rxjs';
import { User } from './../models/user';
import { SingleResponseModel } from './../models/singleResponseModel';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = `${environment.apiUrl}/users`;

  constructor(private httpClient: HttpClient) {}

  getByUserName(userName: string): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + '/getByUserName?userName=' + userName;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  getUserImages(userNames: string[]): Observable<any> {
    let newPath = this.apiUrl + '/getUserImages';
    return this.httpClient.post<any>(newPath, userNames);
  }
}
