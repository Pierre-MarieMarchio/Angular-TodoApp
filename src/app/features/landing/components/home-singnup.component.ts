import { Component, inject } from '@angular/core';
import { PrimaryButtonComponent } from '../../../core/ui/primary-button/primary-button.component';
import { EmailService } from '../../../shared/services/email.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-singnup',
  imports: [PrimaryButtonComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './home-singnup.component.html',
  styleUrl: './home-singnup.component.scss',
})
export class HomeSingnupComponent {
  private readonly emailService = inject(EmailService);

  applyForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
      ],
    }),
  });

  handleSubmit() {
    const email = this.applyForm.value.email;
    const isValid = this.applyForm.valid;
    if (email && isValid) {
      this.emailService.submitEmail(email);
    }
  }
}
