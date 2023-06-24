import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
// import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { LoginResp } from '../interfaces/login-resp.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { tokenHeader } from '../utils/getConfig';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  /**
   * We're sending a GET request to the server, and if the server responds with a 200 status code,
   * we're setting the token in local storage and returning true. If the server responds with a 401
   * status code, we're returning false
   * @returns Observable<boolean>
   */
  checkToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http
      .get<LoginResp>(`${base_url}/auth/renew`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        tap((resp) => {
          console.log(resp);
          localStorage.setItem('token', resp.token);
        }),
        map((resp) => true),
        catchError((error) => of(false))
      );
  }

  getInfo(): Observable<LoginResp> {
    const token = localStorage.getItem('token') || '';
    return this.http.get<LoginResp>(`${base_url}/auth/renew`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * We're making a POST request to the /users endpoint, passing in the formData object as the body of
   * the request. We're then using the tap operator to store the token in localStorage
   * @param {RegisterForm} formData - RegisterForm
   * @returns Observable<LoginResp>
   */
  createUser(formData: RegisterForm): Observable<LoginResp> {
    return this.http.post<LoginResp>(`${base_url}/auth/signup`, formData).pipe(
      tap((resp) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  /**
   * We're making a POST request to the `/users/login` endpoint, passing in the form data, and then
   * we're using the `tap` operator to store the token in local storage
   * @param {LoginForm} formData - LoginForm
   * @returns Observable<LoginResp>
   */
  login(formData: LoginForm): Observable<LoginResp> {
    return this.http.post<LoginResp>(`${base_url}/auth/login`, formData).pipe(
      tap((resp) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }
}
