import { Component } from '@angular/core';
import { BlogComponent } from "./blog/blog.component";
import { CommonModule } from '@angular/common';
import { Blog } from './blog/blog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-container',
  standalone: true,
  imports: [BlogComponent, CommonModule],
  templateUrl: './blog-container.component.html',
  styleUrl: './blog-container.component.scss'
})
export class BlogContainerComponent {
  blogs: Blog[] = [];
  constructor(private blogService: BlogService) { }


  public ngOnInit(): void {
    this.blogService.getBlogs().subscribe((blogs: { posts: Blog[], total: number, skip: number, limit: number }) => this.blogs = blogs.posts)
  }
}
