import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class LoggedGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.router.navigate(['task/list'], { replaceUrl: true });
      return true;
    }
    return true;
  }
}
