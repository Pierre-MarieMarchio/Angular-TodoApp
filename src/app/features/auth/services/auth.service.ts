import { inject, Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { FormGroup } from '@angular/forms';
import { AuthRepositoryService } from '../repositories/auth-repository.service';
import { LoginForm } from '../interfaces/login-form.interface';
import { NavigationService } from '../../../shared/services/navigation.service';
import { UserStateService } from '../../../shared/services/user-state.service';
import { AuthStorageService } from './auth-storage.service';
import { AuthStateService } from './auth-state.service';
import { LoginResponse } from '../interfaces/login-response.interface';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authRepo = inject(AuthRepositoryService);
  private readonly authStorage = inject(AuthStorageService);
  private readonly authState = inject(AuthStateService);
  private readonly navigation = inject(NavigationService);
  private readonly userState = inject(UserStateService);

  public handleRegister(registerForm: FormGroup<RegisterForm>): void {
    const email = registerForm.value.email;
    const password = registerForm.value.password1;

    this.authRepo.register(email!, password!).subscribe({
      next: (response) => {
        if (response) {
          this.navigation.landingPage();
        }
      },
      error: (error) => console.error('Registration failed', error),
    });
  }

  public handleLogin(loginForm: FormGroup<LoginForm>): void {
    const email = loginForm.value.email;
    const password = loginForm.value.password;

    this.authRepo.login(email!, password!).subscribe({
      next: (response) => {
        if (response) {
          console.log('in login');

          this.setStorage(response);
          this.setUserStates(response);
          this.navigation.todoListPage();
        } else {
          console.warn('Login failed, API returned no data.');
        }
      },
      error: (error) => console.error('Unexpected error', error),
    });
  }

  public authenticate(): void {
    this.authState.setAuthTokens({
      accesToken: this.authStorage.getAccessToken()!,
      refreshToken: this.authStorage.getRefreshToken()!,
    });

    this.authRepo.authenticate().subscribe({
      next: (response) => {
        if (response) {
          console.log(response);

          this.userState.setUser(response);
        } else {
          this.authState.clearAuthToken();
          this.authStorage.clearTokens();
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

  private setUserStates(response: LoginResponse): void {
    this.authState.setAuthTokens({
      accesToken: response.accessToken,
      refreshToken: response.refreshToken,
    });

    this.authRepo.authenticate().subscribe({
      next: (response) => {
        if (response) {
          this.userState.setUser(response);
        } else {
          this.authState.clearAuthToken();
          this.authStorage.clearTokens();
        }
      },
      error: (error) => console.error('Unexpected error', error),
    });
  }

  private setStorage(response: LoginResponse): void {
    this.authStorage.setAccessToken(response.accessToken);
    this.authStorage.setRefreshToken(response.refreshToken);
  }
}
