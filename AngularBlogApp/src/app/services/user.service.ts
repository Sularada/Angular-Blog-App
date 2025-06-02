import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthenticatedUser, User } from '../components/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  isloggedIn: Boolean = false

  public login(username: string, password: string): Observable<AuthenticatedUser> {
    const user = { username: username, password: password };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }
    return this.http.post<AuthenticatedUser>('https://dummyjson.com/user/login', user, options).pipe(map(response => {
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      this.isloggedIn = true;
      return response;
    }))
  }

  public isUserLogged(): Boolean {
    return this.isloggedIn
  }

  public Logout(): void {
    this.isloggedIn = false;
    localStorage.setItem("accessToken", '');
    localStorage.setItem("refreshToken", '');
  }

  public getUser(): Observable<User> {
    const token = localStorage.getItem("accessToken");
    const options = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      }),
    }
    return this.http.get<User>('https://dummyjson.com/user/me', options);
  }
  public refreshToken(): Observable<{ accessToken: string, refreshToken: string }> {
    const token = localStorage.getItem("refreshToken");
    const url = 'https://dummyjson.com/auth/refresh';
    const body = {
      refreshToken: token,
      expiresInMins: 1,
    };

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<{ accessToken: string, refreshToken: string }>(url, body, options).pipe(map((response) => {
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      console.log("token process")
      return response;
    }))
  }

}
