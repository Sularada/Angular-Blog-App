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
  BehaviorSubject,
  combineLatest,
  Observable
} from 'rxjs';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-blog-container',
  standalone: true,
  imports: [BlogComponent, CommonModule, PaginatorModule],
  templateUrl: './blog-container.component.html',
  styleUrl: './blog-container.component.scss'
})
export class BlogContainerComponent {

  blogs: Blog[] = [];
  first: number = 0;
  rows: number = 10;
  total: number;
  filterInputs: Observable<{ search: string, order: string }>;
  private userId$ = new BehaviorSubject<string>('');
  asd = this.userId$.asObservable()

  @Input() set userId(value: string) {
    this.userId$.next(value);
  }

  constructor(
    private blogService: BlogService,
    private store: Store<{ blogFilter: { search: string, order: string } }>
  ) { }

  ngOnInit(): void {
    this.filterInputs = this.store.select('blogFilter');
    combineLatest([
      this.userId$,
      this.filterInputs
    ]).subscribe(([userId, filterInputs]) => {
      this.fetchBlogs(userId, filterInputs);
    });
  }

  fetchBlogs(userId: string, filterInputs: { search: string, order: string }) {
    if (!userId || userId === '') {
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
      this.fetchBlogs(this.userId, data);
    })

  }
}
