import { ListResponseModel } from './../models/listResponseModel';
import { ResponseModel } from './../models/responseModel';
import { catchError, Observable, throwError } from 'rxjs';
import { Employer } from './../models/employer';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployerService {
  apiUrl = `${environment.apiUrl}/employers`;

  constructor(private httpClient: HttpClient) {}

  update(employer: Employer): Observable<ResponseModel> {
    let newPath = this.apiUrl + '/update';
    return this.httpClient.post<ListResponseModel<Employer>>(newPath, employer);
  }

  updateImage(employerImage: any): Observable<any> {
    let newPath = this.apiUrl + '/imageUpdate';
    return this.httpClient.post<ResponseModel>(newPath, employerImage, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
