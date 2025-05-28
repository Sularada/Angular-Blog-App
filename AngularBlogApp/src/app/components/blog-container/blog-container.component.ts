import {
  Component,
  Input,
} from '@angular/core';
import { BlogComponent } from "./blog/blog.component";
import { CommonModule } from '@angular/common';
import { Blog } from './blog/blog';
import { BlogService } from 'src/app/services/blog.service';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  Observable
} from 'rxjs';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { AddBlogFormComponent } from "../add-blog-form/add-blog-form.component";

@Component({
  selector: 'app-blog-container',
  standalone: true,
  imports: [BlogComponent, CommonModule, PaginatorModule, AddBlogFormComponent],
  templateUrl: './blog-container.component.html',
  styleUrl: './blog-container.component.scss'
})
export class BlogContainerComponent {

  blogs: Blog[] = [];
  first: number = 0;
  rows: number = 10;
  total: number;
  filterInputs: Observable<{ search: string, order: string }>;

  @Input() userId?: Observable<number>;
  userIdConst: number;
  constructor(
    private blogService: BlogService,
    private store: Store<{ blogFilter: { search: string, order: string } }>
  ) { }

  ngOnInit(): void {
    this.filterInputs = this.store.select('blogFilter');
    console.log("User id: " + this.userId)
    combineLatest([
      this.userId,
      this.filterInputs
    ]).subscribe(([userId, filterInputs]) => {
      this.fetchBlogs(userId, filterInputs);
      this.userIdConst = userId;
    });

  }

  fetchBlogs(userId: number, filterInputs: { search: string, order: string }, isFilterChange: boolean = true) {
    if (isFilterChange) {
      this.first = 0
    }
    if (userId === -1) {
      this.blogService
        .searchBlogs(filterInputs.search, filterInputs.order, this.rows, this.first)
        .subscribe((response) => {
          this.blogs = response.posts;
          this.total = response.total
        });
    } else {
      this.blogService
        .getBlogs(userId, this.rows, this.first)
        .subscribe((response) => {
          this.blogs = response.posts;
        });
    }
  }
  onPageChange(event: PaginatorState) {
    this.first = event.first
    this.rows = event.rows
    this.filterInputs.subscribe((data) => {
      this.fetchBlogs(this.userIdConst, data, false);
    })
  }
}
