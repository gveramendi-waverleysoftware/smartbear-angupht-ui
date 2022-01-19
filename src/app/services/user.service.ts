import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../helpers/constants';

// TODO change url API

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient:HttpClient,
    private constants:Constants
  ) { }

  listAll(): Observable<any> {
    return this.httpClient.get(this.constants.API_ENDPOINT + '/users');
  }

}
