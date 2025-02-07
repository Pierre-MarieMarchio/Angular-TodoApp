import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/registerForm.interface';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'https://localhost:7115/api';

  constructor() {}

  public handleRegister(registerForm: FormGroup<RegisterForm>): void {
    const email = registerForm.value.email;
    const userName = registerForm.value.userName;
    const password = registerForm.value.password1;

    const user = {
      username: userName,
      email: email,
      password: password,
    };

    this.postData('User', user);
  }

  public passwordMatch(registerForm: FormGroup<RegisterForm>): boolean {
    if (registerForm.value.password1 != registerForm.value.password2) {
      return false;
    }
    return true;
  }

  private async postData<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      return response.json() as Promise<T>;
    } catch (error) {
      console.error('Erreur lors de la requête POST', error);
      throw error;
    }
  }
}
