import { SingleResponseModel } from './../models/singleResponseModel';
import { ResponseModel } from './../models/responseModel';
import { Observable } from 'rxjs';
import { Skill } from './../models/skill';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  apiUrl = `${environment.apiUrl}/skills`;

  constructor(private httpClient: HttpClient) {}

  add(skill: Skill): Observable<SingleResponseModel<Skill>> {
    let newPath = this.apiUrl + '/add';
    return this.httpClient.post<SingleResponseModel<Skill>>(newPath, skill);
  }

  delete(id: number): Observable<ResponseModel> {
    let newPath = this.apiUrl + '/delete?id=' + id;
    return this.httpClient.delete<ResponseModel>(newPath);
  }
}
