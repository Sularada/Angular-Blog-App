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
    localStorage.setItem("accessToken",'');
  }

  public getUser():Observable<User>{
      const token = localStorage.getItem("accessToken");
       const options = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      }),
    }
      return this.http.get<User>('https://dummyjson.com/user/me', options).pipe(tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    )
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
