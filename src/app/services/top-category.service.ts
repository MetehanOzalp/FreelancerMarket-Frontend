import { ListResponseModel } from './../models/listResponseModel';
import { TopCategory } from './../models/topCategory';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TopCategoryService {
  apiUrl = `${environment.apiUrl}/topCategories`;

  constructor(private httpClient: HttpClient) {}

  getTopCategories(): Observable<ListResponseModel<TopCategory>> {
    let newPath = this.apiUrl + '/getAll';
    return this.httpClient.get<ListResponseModel<TopCategory>>(newPath);
  }
}
