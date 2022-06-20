import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser, IUserLogin } from '../../../feature/auth/models/user.model';
import { IResponse } from '../../models/response.model';
import { CoreService } from '../core/core.service';

@Injectable()
export class AuthService {
  currentUser: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);

  constructor(private coreService: CoreService) {}

  login(username: string, password: string): Observable<IResponse> {
    return this.coreService.execGetJson(endpoint.login).pipe(
      map((users: IUserLogin[]) => {
        const response: IResponse = { error: false, message: '', data: '' };
        let isFind = false;
        users.map((user: IUserLogin) => {
          if (!isFind) {
            if (user.username === username) {
              if (user.password !== password) {
                response.error = true;
                response.message = 'Contraseña incorrecta';
              } else {
                response.error = false;
                response.message = `Bienvenido !!`;
                response.data = user;
                isFind = true;
              }
            } else {
              response.error = true;
              response.message = 'Usuario no encontrado';
            }
          }
        });
        return response;
      })
    );
  }

  getUser(uuid: string): Observable<IResponse> {
    return this.coreService.execGetJson(endpoint.find).pipe(
      map((users: IUser[]) => {
        const response: IResponse = { error: false, message: '', data: '' };
        let isFind = false;
        users.map((user: IUser) => {
          if (!isFind) {
            if (user.uuid === uuid) {
              response.data = user;
              isFind = true;
            }
          }
        });
        return response;
      })
    );
  }

  logout(): Observable<IResponse> {
    return this.coreService.execGetJson(endpoint.login).pipe(
      map(() => {
        const response: IResponse = { error: false, message: '', data: '' };
        response.message = 'Regresa pronto !!';
        return response;
      })
    );
  }

  setCurrentUser(user: IUser) {
    this.currentUser.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
}

export enum endpoint {
  login = 'user/login.json',
  find = 'user/find.json',
}
