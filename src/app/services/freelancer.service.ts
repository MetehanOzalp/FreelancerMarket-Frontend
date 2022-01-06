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

  getMostPopularFreelancers(): Observable<ListResponseModel<Freelancer>> {
    let newPath = this.apiUrl + '/getMostPopularFreelancers';
    return this.httpClient.get<ListResponseModel<Freelancer>>(newPath);
  }
}
