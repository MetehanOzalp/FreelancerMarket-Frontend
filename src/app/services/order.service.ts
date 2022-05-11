import { ResponseModel } from './../models/responseModel';
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

  add(order: Order): Observable<ResponseModel> {
    let newPath = this.apiUrl + '/add';
    return this.httpClient.post<ResponseModel>(newPath, order);
  }

  confirm(orderId: number): Observable<ResponseModel> {
    let newPath = this.apiUrl + '/confirm?id=' + orderId;
    return this.httpClient.post<ResponseModel>(newPath, null);
  }

  getByFreelancerId(
    freelancerId: number
  ): Observable<ListResponseModel<Order>> {
    let newPath = this.apiUrl + '/getByFreelancerId?id=' + freelancerId;
    return this.httpClient.get<ListResponseModel<Order>>(newPath);
  }

  getByUserName(userName: string): Observable<ListResponseModel<Order>> {
    let newPath = this.apiUrl + '/getByUserName?userName=' + userName;
    return this.httpClient.get<ListResponseModel<Order>>(newPath);
  }

  getByFreelancerUserName(userName: string): Observable<ListResponseModel<Order>> {
    let newPath = this.apiUrl + '/getByFreelancerUserName?userName=' + userName;
    return this.httpClient.get<ListResponseModel<Order>>(newPath);
  }
}
