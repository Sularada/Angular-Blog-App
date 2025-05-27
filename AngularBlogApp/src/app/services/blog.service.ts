import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Blog } from '../components/blog-container/blog/blog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  public getBlogs(userId: string = ''): Observable<{ posts: Blog[], total: number, skip: number, limit: number }> {
    return this.http.get<{ posts: Blog[], total: number, skip: number, limit: number }>('https://dummyjson.com/posts' + userId)
  }
  public searchBlogs(userId: string = '', searchInput: string, orderInput: string): Observable<{ posts: Blog[], total: number, skip: number, limit: number }> {
    return this.http.get<{ posts: Blog[], total: number, skip: number, limit: number }>('https://dummyjson.com/posts' + userId + '/search?q=' + searchInput + '&sortBy=title&order=' + orderInput)
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

