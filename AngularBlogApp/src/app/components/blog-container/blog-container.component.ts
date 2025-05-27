import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';
import { BlogComponent } from "./blog/blog.component";
import { CommonModule } from '@angular/common';
import { Blog } from './blog/blog';
import { BlogService } from 'src/app/services/blog.service';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  combineLatest,
  Subscription
} from 'rxjs';

@Component({
  selector: 'app-blog-container',
  standalone: true,
  imports: [BlogComponent, CommonModule],
  templateUrl: './blog-container.component.html',
  styleUrl: './blog-container.component.scss'
})
export class BlogContainerComponent implements OnInit, OnDestroy {

  blogs: Blog[] = [];

  // userId artık observable olarak takip ediliyor
  private userId$ = new BehaviorSubject<string>('');

  @Input() set userId(value: string) {
    this.userId$.next(value);
  }

  private subscription!: Subscription;

  constructor(
    private blogService: BlogService,
    private store: Store<{ blogFilter: { search: string, order: string } }>,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const filterInputs = this.store.select('blogFilter');
    this.subscription = combineLatest([
      this.userId$,
      filterInputs
    ]).subscribe(([userId, filterInputs]) => {
      this.fetchBlogs(userId, filterInputs);
    });
  }

  fetchBlogs(userId: string, filterInputs: { search: string, order: string }) {
    if (!userId || userId === '') {
      this.blogService
        .searchBlogs(userId, filterInputs.search, filterInputs.order)
        .subscribe((response) => {
          this.blogs = response.posts;

        });
    } else {
      this.blogService
        .getBlogs(userId)
        .subscribe((response) => {
          this.blogs = response.posts;

        });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
