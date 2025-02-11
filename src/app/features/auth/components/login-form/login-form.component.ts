import { Component, inject } from '@angular/core';
import { CardFooterComponent } from '../../../../core/ui/card-footer/card-footer.component';
import { PrimaryButtonComponent } from '../../../../core/ui/primary-button/primary-button.component';
import { CardBodyComponent } from '../../../../core/ui/card-body/card-body.component';
import { CardHeaderComponent } from '../../../../core/ui/card-header/card-header.component';
import { CardComponent } from '../../../../core/ui/card/card.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginForm } from '../../interfaces/login-form.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  imports: [
    CardFooterComponent,
    PrimaryButtonComponent,
    CardBodyComponent,
    CardHeaderComponent,
    CardComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  private readonly authService = inject(AuthService);

  loginForm = new FormGroup<LoginForm>({
    email: new FormControl('', {
      nonNullable: true,
    }),
    password: new FormControl('', {
      nonNullable: true,
    }),
  });

  handleLogin() {
    this.authService.handleLogin(this.loginForm);
  }
}
