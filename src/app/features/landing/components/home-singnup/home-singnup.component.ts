import { Component, inject } from '@angular/core';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';
import { EmailService } from '../../../../shared/services/email.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-singnup',
  imports: [PrimaryButtonComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './home-singnup.component.html',
  styleUrl: './home-singnup.component.scss',
})
export class HomeSingnupComponent {
  emailService = inject(EmailService);

  applyForm = new FormGroup({
    email: new FormControl(''),
  });

  emailsubmit() {
    console.log(this.applyForm.value.email);
  }
}
