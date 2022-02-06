import { Order } from './../models/order';
import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiUrl = `${environment.apiUrl}/orders`;

  constructor(private httpClient: HttpClient) {}

  getByFreelancerId(
    freelancerId: number
  ): Observable<ListResponseModel<Order>> {
    let newPath = this.apiUrl + '/getByFreelancerId?id=' + freelancerId;
    return this.httpClient.get<ListResponseModel<Order>>(newPath);
  }
}
