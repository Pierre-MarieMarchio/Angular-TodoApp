import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private email: string | null = null;

  constructor() {}

  getEmail(): string | null {
    return this.email;
  }

  setEmail(value: string): void {
    this.email = value;
  }

  submitEmail(email: string | null): void {
    console.log('email is : ' + email);
  }
}
