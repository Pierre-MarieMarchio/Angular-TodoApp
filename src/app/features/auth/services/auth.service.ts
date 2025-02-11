import { inject, Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { FormGroup } from '@angular/forms';
import { AuthRepositoryService } from '../repositories/auth-repository.service';
import { User } from '../interfaces/user.interface';
import { LoginForm } from '../interfaces/login-form.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authRepo = inject(AuthRepositoryService);

  public handleRegister(registerForm: FormGroup<RegisterForm>): void {
    const email = registerForm.value.email;
    const password = registerForm.value.password1;

    const user: User = {
      email: email ?? '',
      password: password ?? '',
    };

    console.log(user);
    this.authRepo.register(user);
  }

  public handleLogin(loginForm: FormGroup<LoginForm>): void {
    const email = loginForm.value.email;
    const password = loginForm.value.password;

    const user: User = {
      email: email ?? '',
      password: password ?? '',
    };

    console.log(user);
    this.authRepo.login(user);
  }

  public passwordMatch(registerForm: FormGroup<RegisterForm>): boolean {
    if (registerForm.value.password1 != registerForm.value.password2) {
      return false;
    }
    return true;
  }
}
