import { OperationClaim } from './../models/operationClaim';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FreelancerGuard implements CanActivate {
  token: string = localStorage.getItem('token');
  operationClaims: OperationClaim[] = [];
  isFreelancer: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastrService: ToastrService,
    private jwtHelperService: JwtHelperService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.token) {
      return new Observable<boolean>((obs) => {
        this.userService
          .getByUserName(this.jwtHelperService.decodeToken(this.token).sub)
          .subscribe((response) => {
            this.operationClaims = response.data.operationClaims;
            this.operationClaims.forEach((element) => {
              if (element.claimName == 'ROLE_FREELANCER') {
                this.isFreelancer = true;
              }
            });
            if (this.isFreelancer) {
              obs.next(true);
            } else {
              this.router.navigate(['/']);
              this.toastrService.error('Bu işlem için yetkiniz yok', 'Hata!');
              obs.next(false);
            }
          });
      });
    } else {
      this.router.navigate(['/']);
      this.toastrService.info('Bu işlem için lütfen giriş yapınız', 'Dikkat');
      return false;
    }
  }
}
