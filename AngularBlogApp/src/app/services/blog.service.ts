import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../components/blog-container/blog/blog';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  public addNewBlog(newBlog: Blog) {
    const body = JSON.stringify(newBlog)
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Blog>('https://dummyjson.com/posts/add', body, options)
  }

  public deleteBlog(postId: number): any {
    return this.http.delete<any>('https://dummyjson.com/posts/' + postId)
  }

  public getAllBlogTags(): any {
    return this.http.get('https://dummyjson.com/posts/tags')
  }
}

