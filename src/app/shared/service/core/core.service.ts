import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CoreService {
  API_URL = 'assets/json/';

  constructor(private httpClient: HttpClient) {}

  execGetJson(api: string, body?: any): Observable<any> {
    console.log(this.API_URL + api);
    return this.httpClient.get<any>(`${this.API_URL}${api}`, body);
  }
}
