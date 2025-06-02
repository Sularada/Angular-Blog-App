import { Component, Input } from '@angular/core';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Blog } from './blog';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { CommentComponent } from "../../comment/comment.component";
import { BlogService } from 'src/app/services/blog.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CardModule, Button, BadgeModule, CommonModule, CommentComponent, ToastModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  constructor(private blogService: BlogService, private messageService: MessageService) { }
  @Input() blog!: Blog;
  @Input() userId!: number;
  deleteBlog(id: number) {
    this.blogService.deleteBlog(id).subscribe((data: any) => {
      if (data?.isDeleted) {
        this.messageService.add({ severity: 'success', summary: 'Delete Blog Success', detail: 'Blog  delete successfully' });
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Delete Blog Error', detail: 'Blog can not delete! Please try again.' });
      }
    })
  }
}
