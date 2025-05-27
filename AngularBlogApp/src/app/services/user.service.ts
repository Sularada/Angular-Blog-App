import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthenticatedUser, User } from '../components/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<AuthenticatedUser> {
    const user = { username: username, password: password };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }
    return this.http.post<AuthenticatedUser>('https://dummyjson.com/user/login', user, options).pipe(tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  public isUserLogged(): Boolean {
    const token = localStorage.getItem("accessToken")
    return token && token !== '' ? true : false;
  }

  public Logout(): void {
    localStorage.setItem("accessToken", '');
    localStorage.setItem("refreshToken", '');
  }

  public getUser(): Observable<User> {
    this.refreshToken().subscribe((data) => {
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("accessToken", data.accessToken);
    })
    const token = localStorage.getItem("accessToken");
    const options = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      }),
    }
    return this.http.get<User>('https://dummyjson.com/user/me', options).pipe(tap(),
      catchError(this.handleError)
    )
  }
  public refreshToken(): Observable<{ accessToken: string, refreshToken: string }> {
    const token = localStorage.getItem("refreshToken");
    const url = 'https://dummyjson.com/auth/refresh';
    const body = {
      refreshToken: token
    };

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<{ accessToken: string, refreshToken: string }>(url, body, options).pipe(
      tap(),
      catchError(this.handleError)
    );
  }
  handleError(err: HttpErrorResponse) {
    let errorMessage = ''
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'Bir hata oluştu ' + err.error.message
    } else {
      errorMessage = 'Sistemsel bir hata oluştu'
    }
    return throwError(() => new Error(errorMessage));
  }
}
