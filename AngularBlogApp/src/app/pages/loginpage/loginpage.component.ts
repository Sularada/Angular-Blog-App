import { Component } from '@angular/core';
import { LoginFormComponent } from "../../components/login-form/login-form.component";

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.scss'
})
export class LoginpageComponent {

}
