import { Component } from '@angular/core';
import { ThemeComponent } from "./theme/theme.component";
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { UserService } from 'src/app/services/user.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from '../../store/user/user.actions';
import { User } from '../user/user';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ThemeComponent, MenubarModule, CommonModule, BadgeModule, AvatarModule, MenuModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private userService: UserService, private store: Store<{ userState: Boolean }>) { }
  items: MenuItem[];
  navbarEnd: MenuItem[];
  user: User;
  isUserLogged$: Observable<Boolean> = this.store.select('userState');

  logout() {
    this.userService.Logout();
    this.store.dispatch(logout());
  }
  ngOnInit() {
    this.isUserLogged$.subscribe((isLoged) => {
      if (isLoged) {
        this.userService.getUser().subscribe(
          { next: (value: User) => this.user = value }
        )
      } else {
        this.user = null
      }
    })
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        link: '',
      }
    ]
    this.navbarEnd = [
      {
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-user',
            route: '/user'
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out', route: "/",
            func: true,
          },
        ]
      }
    ]
  }
}
