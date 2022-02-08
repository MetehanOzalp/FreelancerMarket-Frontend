import { Wallet } from './../models/wallet';
import { SingleResponseModel } from './../models/singleResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  apiUrl = `${environment.apiUrl}/wallets`;

  constructor(private httpClient: HttpClient) {}

  getWallet(userId: number): Observable<SingleResponseModel<Wallet>> {
    let newPath = this.apiUrl + '/getByUserId?userId=' + userId;
    return this.httpClient.get<SingleResponseModel<Wallet>>(newPath);
  }
}
