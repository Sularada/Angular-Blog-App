import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login } from '../../store/user/user.actions';
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  constructor(private userService: UserService, private router: Router,
    private store: Store<{ userState: Boolean }>
  ) {}
  userState: Observable<Boolean> = this.store.select('userState');
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(2)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })
  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.userService.login(this.loginForm.value.username!, this.loginForm.value.password!).subscribe({
      next: user => {
        localStorage.setItem("accessToken", user.accessToken);
        this.router.navigate(['']);
        this.store.dispatch(login())
      },
      error: () => {
        alert("Giriş başarısız! Lütfen kullanıcı adı ve şifrenizi kontrol edin.");
      }
    })
  }

}
