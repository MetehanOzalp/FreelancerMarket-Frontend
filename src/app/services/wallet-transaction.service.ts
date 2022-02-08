import { Observable } from 'rxjs';
import { WalletTransaction } from './../models/walletTransaction';
import { ListResponseModel } from './../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WalletTransactionService {
  apiUrl = `${environment.apiUrl}/walletTransactions`;

  constructor(private httpClient: HttpClient) {}

  getWalletTransactions(
    userId: number
  ): Observable<ListResponseModel<WalletTransaction>> {
    let newPath = this.apiUrl + '/getByUserId?userId=' + userId;
    return this.httpClient.get<ListResponseModel<WalletTransaction>>(newPath);
  }
}
