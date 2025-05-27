import { Component, Input } from '@angular/core';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Blog } from './blog';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { CommentComponent } from "../../comment/comment.component";

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CardModule, Button, BadgeModule, CommonModule, CommentComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  @Input() blog!: Blog;
}
