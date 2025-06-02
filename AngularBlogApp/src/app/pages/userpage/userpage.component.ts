import { Component } from '@angular/core';
import { UserComponent } from '../../components/user/user.component'
import { BlogContainerComponent } from '../../components/blog-container/blog-container.component'
import { UserService } from 'src/app/services/user.service';
import { User } from '../../components/user/user';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-userpage',
  standalone: true,
  imports: [UserComponent, BlogContainerComponent, CommonModule],
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.scss'
})
export class UserpageComponent {
  userId: Observable<number>;
  constructor(private userService: UserService) { }

  public ngOnInit(): void {
    this.userService.getUser().subscribe((user: User) => {
      this.userId = of(user.id)
    })
  }
}
