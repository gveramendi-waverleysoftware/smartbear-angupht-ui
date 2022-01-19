import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// TODO change url API
const baseUrl = "http://localhost:3000/users/";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient:HttpClient
  ) { }

  listAll(): Observable<any> {
    return this.httpClient.get(baseUrl);
  }

}
