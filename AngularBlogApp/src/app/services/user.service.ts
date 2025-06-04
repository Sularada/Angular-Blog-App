import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { AuthenticatedUser, User } from '../components/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  isloggedIn = !!localStorage.getItem("accessToken");

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
    const storedAccessToken = localStorage.getItem("accessToken");
    if (!storedAccessToken) {
      return null;
    }
    const options = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + storedAccessToken
      }),
    }
    return this.http.get<User>('https://dummyjson.com/user/me', options);
  }
  public refreshToken(): Observable<{ accessToken: string, refreshToken: string }> {
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (!storedRefreshToken) {
      return throwError(() => new Error("No refresh token available"));
    }
    const url = 'https://dummyjson.com/auth/refresh';
    const body = {
      refreshToken: localStorage.getItem("refreshToken"),
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


// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, of } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { tap } from 'rxjs/operators';

// @Injectable({ providedIn: 'root' })
// export class UserService {
//   private _isRefreshing = false;
//   private _refreshTokenSubject = new BehaviorSubject<string | null>(null);

//   get isRefreshing(): boolean {
//     return this._isRefreshing;
//   }

//   set isRefreshing(val: boolean) {
//     this._isRefreshing = val;
//   }

//   get refreshTokenSubject(): BehaviorSubject<string | null> {
//     return this._refreshTokenSubject;
//   }

//   constructor(private http: HttpClient) {}

//   refreshToken(): Observable<{ accessToken: string; refreshToken: string }> {
//     const storedRefreshToken = localStorage.getItem('refreshToken');
//     if (!storedRefreshToken) return of(); // boş dön

//     return this.http.post<{ accessToken: string; refreshToken: string }>(
//       '/auth/refresh',
//       { refreshToken: storedRefreshToken }
//     ).pipe(
//       tap(tokens => {
//         localStorage.setItem('accessToken', tokens.accessToken);
//         localStorage.setItem('refreshToken', tokens.refreshToken);
//         this._refreshTokenSubject.next(tokens.accessToken);
//       })
//     );
//   }
// }
