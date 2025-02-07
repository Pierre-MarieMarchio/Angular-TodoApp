import { Component, inject } from '@angular/core';
import { CardHeaderComponent } from '../../../../shared/components/card-header/card-header.component';
import { CardBodyComponent } from '../../../../shared/components/card-body/card-body.component';
import { CardFooterComponent } from '../../../../shared/components/card-footer/card-footer.component';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterForm } from '../../interfaces/registerForm.interface';
import { EmailService } from '../../../../shared/services/email.service';
import { AuthService } from '../../services/auth.service';

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
    userName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(50)],
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
