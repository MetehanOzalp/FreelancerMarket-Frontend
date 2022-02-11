import { ResponseModel } from './../models/responseModel';
import { SingleResponseModel } from './../models/singleResponseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from './../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Freelancer } from '../models/freelancer';

@Injectable({
  providedIn: 'root',
})
export class FreelancerService {
  apiUrl = `${environment.apiUrl}/freelancers`;

  constructor(private httpClient: HttpClient) {}

  update(freelancer: Freelancer): Observable<ResponseModel> {
    let newPath = this.apiUrl + '/update';
    return this.httpClient.post<ListResponseModel<Freelancer>>(
      newPath,
      freelancer
    );
  }

  updateImage(freelancerImage: any): Observable<any> {
    let newPath = this.apiUrl + '/imageUpdate';
    return this.httpClient.post<ResponseModel>(newPath, freelancerImage, {
      reportProgress: true,
      observe: 'events',
    });
  }

  getMostPopularFreelancers(): Observable<ListResponseModel<Freelancer>> {
    let newPath = this.apiUrl + '/getMostPopularFreelancers';
    return this.httpClient.get<ListResponseModel<Freelancer>>(newPath);
  }
}
