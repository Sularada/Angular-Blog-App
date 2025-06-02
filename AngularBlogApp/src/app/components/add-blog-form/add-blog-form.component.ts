import { Component, Input } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Blog } from '../blog-container/blog/blog';
import { FloatLabelModule } from "primeng/floatlabel"
import { BlogService } from 'src/app/services/blog.service';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BadgeModule } from 'primeng/badge';

interface Tag {
  name: string,
  slug: string,
  url: string
}
@Component({
  selector: 'app-add-blog-form',
  standalone: true,
  imports: [SidebarModule, ButtonModule, ReactiveFormsModule, FloatLabelModule, MultiSelectModule, CommonModule, FormsModule, ToastModule, InputTextModule, InputTextareaModule, BadgeModule],
  templateUrl: './add-blog-form.component.html',
  styleUrl: './add-blog-form.component.scss', providers: [MessageService]
})
export class AddBlogFormComponent {
  blog: any;
  constructor(private blogService: BlogService, private messageService: MessageService) { }

  tags!: Tag[];
  selectedTags!: Tag[];
  @Input() userId: number;
  sidebarVisible: boolean = false;
  newBlog: Blog;

  addNewBlogForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(15)]),
    body: new FormControl('', [Validators.required, Validators.minLength(50)]),
  })

  async ngOnInit() {
    this.blogService.getAllBlogTags().subscribe((data: []) => {
      this.tags = data
    })
  }

  onSubmit() {
    const tags = this.selectedTags.map(tag => tag.name)
    this.newBlog = { title: this.addNewBlogForm.value.title, body: this.addNewBlogForm.value.body, tags: tags, userId: this.userId }
    this.blogService.addNewBlog(this.newBlog).subscribe((data: any) => {
      if (data != null || undefined) {
        this.messageService.add({ severity: 'success', summary: 'Add New Blog', detail: 'Your new blog add successfully' });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Add New Blog', detail: 'Your new blog can not add! Please try again.' });
      }
    })
    this.selectedTags = []
    this.addNewBlogForm.reset()
    this.sidebarVisible = false
  }
}
