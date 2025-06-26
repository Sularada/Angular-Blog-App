import { Component, Input } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';
import { CommonModule } from '@angular/common';
import { BlogService } from 'src/app/services/blog.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [OverlayPanelModule, InputGroupModule, InputGroupAddonModule, ButtonModule, InputTextModule, ChipsModule, CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() userId: number;
  comments: Comment[] = null;
  constructor(private blogService: BlogService) { }
  openComments(op, $event) {
    if (this.comments == null) {
      this.blogService.getBlogComments(this.userId).subscribe((data) => {
        this.comments = data.comments
      })
    }
    op.toggle($event)
  }
}
