import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from './user';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  constructor(private userService: UserService) { }
  authUser: User;
  public ngOnInit(): void {
    this.userService.getUser().subscribe(
      { next: (value: User) => this.authUser = value }

    )
  }
}
