import { Component } from '@angular/core';
import { HeaderComponent } from "../../../../core/layouts/header/header.component";
import { RegisterFormComponent } from "../../components/register-form/register-form.component";

@Component({
  selector: 'app-signup-page',
  imports: [HeaderComponent, RegisterFormComponent],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {

}
 