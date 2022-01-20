import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../helpers/constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private constants: Constants) { }
  login(username: string, password: string): Observable<any> {
    const auth = {
      email: username,
      password: password
    }
    return this.http.post(this.constants.API_ENDPOINT + '/login', auth, httpOptions);
  }
  changePassword(id: number, newPassword: string, confirmPassword: string, oldPassword: string): Observable<any> {
    const change = {
      password: newPassword,
      password2: confirmPassword,
      old_password: oldPassword
    }
    return this.http.put(this.constants.API_ENDPOINT + '/users/change_password/' + id, change, httpOptions);
  }
  currentUSer(): Observable<any> {
    return this.http.get(this.constants.API_ENDPOINT + '/users/current_user');
  }
}
