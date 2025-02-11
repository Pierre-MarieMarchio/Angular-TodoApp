import { Component, inject } from '@angular/core';

import { PrimaryButtonComponent } from '../../../../core/ui/primary-button/primary-button.component';
import { CardComponent } from '../../../../core/ui/card/card.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterForm } from '../../interfaces/register-form.interface';
import { EmailService } from '../../../../shared/services/email.service';
import { AuthService } from '../../services/auth.service';
import { CardHeaderComponent } from '../../../../core/ui/card-header/card-header.component';
import { CardBodyComponent } from '../../../../core/ui/card-body/card-body.component';
import { CardFooterComponent } from '../../../../core/ui/card-footer/card-footer.component';

@Component({
  selector: 'app-register-form',
  imports: [
    CardHeaderComponent,
    CardBodyComponent,
    CardFooterComponent,
    PrimaryButtonComponent,
    CardComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  private readonly emailService = inject(EmailService);
  private readonly authService = inject(AuthService);

  registerForm = new FormGroup<RegisterForm>({
    email: new FormControl(this.emailService.getEmail() ?? '', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
      ],
    }),
    password1: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100),
      ],
    }),
    password2: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100),
      ],
    }),
  });

  handleSubmit() {
    if (!this.authService.passwordMatch(this.registerForm)) {
      return;
    }

    this.authService.handleRegister(this.registerForm);
  }
}
