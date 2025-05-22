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
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ThemeComponent, MenubarModule, CommonModule, BadgeModule, AvatarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private userService: UserService, private store: Store<{ userState: Boolean }>) { }
  items: MenuItem[] = [];
  isUserLogged$: Observable<Boolean> = this.store.select('userState');

  logout() {
    this.userService.Logout();
    this.store.dispatch(logout());
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        link: '',
      }
    ]

  }
}
