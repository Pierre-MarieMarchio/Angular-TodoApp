import { Component } from '@angular/core';
import { LoginFormComponent } from "../../components/login-form/login-form.component";
import { HeaderComponent } from "../../../../core/layouts/header/header.component";

@Component({
  selector: 'app-login-page',
  imports: [LoginFormComponent, HeaderComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

}
