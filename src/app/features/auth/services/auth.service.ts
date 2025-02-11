import { inject, Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { FormGroup } from '@angular/forms';
import { AuthRepositoryService } from '../repositories/auth-repository.service';
import { User } from '../interfaces/user.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { NavigationService } from '../../../shared/services/navigation.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authRepo = inject(AuthRepositoryService);
  navigate = inject(NavigationService);

  public handleRegister(registerForm: FormGroup<RegisterForm>): void {
    const email = registerForm.value.email;
    const password = registerForm.value.password1;

    const user: User = {
      email: email ?? '',
      password: password ?? '',
    };

    this.authRepo.register(user).subscribe({
      next: (response) => {
        if (response) {
          this.navigate.landingPage();
        }
      },
      error: (error) => console.error('Registration failed', error),
    });
  }

  public handleLogin(loginForm: FormGroup<LoginForm>): void {
    const email = loginForm.value.email;
    const password = loginForm.value.password;

    const user: User = {
      email: email ?? '',
      password: password ?? '',
    };

    this.authRepo.login(user).subscribe({
      next: (success) => {
        if (success) {
          this.navigate.todoListPage();
        } else {
          console.warn('Login failed, API returned no data.');
        }
      },
      error: (error) => console.error('Unexpected error', error),
    });
  }

  public passwordMatch(registerForm: FormGroup<RegisterForm>): boolean {
    if (registerForm.value.password1 != registerForm.value.password2) {
      return false;
    }
    return true;
  }
}
