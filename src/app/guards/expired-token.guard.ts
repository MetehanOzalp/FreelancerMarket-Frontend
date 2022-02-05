import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, timer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ExpiredTokenGuard implements CanActivate {
  token: string;
  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private jwtHelperService: JwtHelperService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.token = localStorage.getItem('token');
    if (this.token && this.jwtHelperService.isTokenExpired(this.token)) {
      this.toastrService.info('Oturumun süresi doldu!', 'İnfo');
      localStorage.clear();
      this.router.navigate(['/login']).then(() => {
        timer(400).subscribe((p) => {
          window.location.reload();
        });
      });
    }
    return true;
  }
}
