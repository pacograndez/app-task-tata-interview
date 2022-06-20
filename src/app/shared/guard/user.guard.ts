import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private toastService: ToastrService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return true;
    }
    this.toastService.warning('¡¡Acceso denegado!! Debes de inciar sesión para acceder');
    return false;
  }
}
