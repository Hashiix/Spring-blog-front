import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RegisterPayload} from './register-payload';
import {Observable} from 'rxjs';
import {LoginPayload} from './login-payload';
import {JwtAutResponse} from './jwt-aut-response';
import {map} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';

const httpOptions = {
  headers: new HttpHeaders({
    'responseType': 'JSON'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://blogspring.herokuapp.com/api/auth/';

  constructor(private httpClient: HttpClient, private localStoraqeService: LocalStorageService) {
  }

  register(registerPayload: RegisterPayload): Observable<any> {
    return this.httpClient.post(this.url + 'signup', registerPayload);
  }

  login(loginPayload: LoginPayload): Observable<boolean> {
    return this.httpClient.post<JwtAutResponse>(this.url + 'login', loginPayload, httpOptions).pipe(map(data => {
      this.localStoraqeService.store('authenticationToken', data.authenticationToken);
      this.localStoraqeService.store('username', data.username);
      return true;
    }));
  }

  isAuthenticated(): boolean {
    return this.localStoraqeService.retrieve('username') != null && this.localStoraqeService.retrieve('username') != "Test3";
  }

  isAdmin(): boolean {
    return this.localStoraqeService.retrieve('username') == 'Test3' && this.localStoraqeService.retrieve('username') != null;
  }

  isNotAuthenticated(): boolean {
    return this.localStoraqeService.retrieve('username') == null;
  }

  logout() {
    this.localStoraqeService.clear('authenticationToken');
    this.localStoraqeService.clear('username');
  }
}
