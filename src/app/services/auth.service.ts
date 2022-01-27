import { TokenModel } from './../models/tokenModel';
import { SingleResponseModel } from './../models/singleResponseModel';
import { UserForLoginDto } from './../models/userForLoginDto';
import { EmployerForRegisterDto } from './../models/employerForRegisterDto';
import { ResponseModel } from './../models/responseModel';
import { Observable } from 'rxjs';
import { FreelancerForRegisterDto } from './../models/freelancerForRegisterDto';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = `${environment.apiUrl}/auth`;

  constructor(private httpClient: HttpClient) {}

  registorForFreelancer(
    freelancerForRegisterDto: FreelancerForRegisterDto
  ): Observable<ResponseModel> {
    let newPath = this.apiUrl + '/registerForFreelancer';
    return this.httpClient.post<ResponseModel>(
      newPath,
      freelancerForRegisterDto
    );
  }

  registorForEmployer(
    employerForRegisterDto: EmployerForRegisterDto
  ): Observable<ResponseModel> {
    let newPath = this.apiUrl + '/registerForEmployer';
    return this.httpClient.post<ResponseModel>(newPath, employerForRegisterDto);
  }

  login(
    userForLoginDto: UserForLoginDto
  ): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + '/login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      newPath,
      userForLoginDto
    );
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
