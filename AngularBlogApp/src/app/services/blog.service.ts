import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Blog } from '../components/blog-container/blog/blog';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  public getBlogs(userId: number, limit: number, skip: number): Observable<{ posts: Blog[], total: number, skip: number, limit: number }> {
    return this.http.get<{ posts: Blog[], total: number, skip: number, limit: number }>('https://dummyjson.com/posts/user/' + userId + "?limit=" + limit + "&skip=" + skip)
  }

  public searchBlogs(searchInput: string, orderInput: string, limit: number, skip: number): Observable<{ posts: Blog[], total: number, skip: number, limit: number }> {
    return this.http.get<{ posts: Blog[], total: number, skip: number, limit: number }>('https://dummyjson.com/posts/search?q=' + searchInput + '&sortBy=title&order=' + orderInput + "&limit=" + limit + "&skip=" + skip)
  }

  public getBlogComments(userId: number) {
    return this.http.get<{ comments: Comment[], total: number, skip: number, limit: number }>('https://dummyjson.com/posts/' + userId + "/comments")
  }

  public addNewBlog(newBlog: Blog): boolean {
    const body = JSON.stringify(newBlog)
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const blog = this.http.post<Blog>('https://dummyjson.com/posts/add', body, options).pipe(catchError(this.handleError))
    if (blog) {
      return true
    } else {
      return false
    }
  }

  public deleteBlog(postId): boolean {
    const blog = this.http.delete<number>('https://dummyjson.com/posts/' + postId).pipe(catchError(this.handleError))
    if (blog) {
      return true
    } else {
      return false
    }
  }

  public getAllBlogTags(): any {
    return this.http.get('https://dummyjson.com/posts/tags')
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

