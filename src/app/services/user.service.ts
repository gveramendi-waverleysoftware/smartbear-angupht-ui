import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Constants } from '../helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private constants: Constants
  ) { }

  listAll(): Observable<any> {
    return this.httpClient.get(this.constants.API_ENDPOINT + '/users');
  }

  create(data: any): Observable<any> {
    return this.httpClient.post(this.constants.API_ENDPOINT + '/users', data);
  }

  getById(id: string) {
    return this.httpClient.get(`${this.constants.API_ENDPOINT}/users/${id}`);
  }

  update(id: string, params: any) {
    return this.httpClient.put(`${this.constants.API_ENDPOINT}/users/${id}`, params)
      .pipe(map(x => {
        console.log("Updated");
        return x;
      }));
  }
  delete(id: string) {
    return this.httpClient.delete(`${this.constants.API_ENDPOINT}/users/${id}`)
      .pipe(map(x => {
        return x;
      }));
  }
}
