import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private readonly router = inject(Router);
  private email: string | null = null;

  constructor() {}

  getEmail(): string | null {
    return this.email;
  }

  setEmail(value: string): void {
    this.email = value;
  }

  submitEmail(email: string ): void {
    this.setEmail(email);
    this.router.navigate(['/signup']);
  }
}
