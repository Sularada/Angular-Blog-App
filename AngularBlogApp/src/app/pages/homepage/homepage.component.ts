import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { BlogContainerComponent } from "../../components/blog-container/blog-container.component";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent, BlogContainerComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  constructor(private userService: UserService) { }
  public ngOnInit(): void {
    this.userService.login("emilys", "emilyspass").subscribe(data => data)
  }
}
