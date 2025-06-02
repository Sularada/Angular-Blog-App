import { Router, type CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let isauthenticated = inject(UserService).isUserLogged()
  let router = inject(Router)

  if (isauthenticated) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
