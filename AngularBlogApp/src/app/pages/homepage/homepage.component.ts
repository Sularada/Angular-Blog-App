import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { BlogContainerComponent } from "../../components/blog-container/blog-container.component";
import { BlogFilterComponent } from "../../components/blog-filter/blog-filter.component";
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent, BlogContainerComponent, BlogFilterComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  constructor() { }
  userId: Observable<number> = of(-1);
}
