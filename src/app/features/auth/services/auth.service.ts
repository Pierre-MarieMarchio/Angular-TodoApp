import { inject, Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { FormGroup } from '@angular/forms';
import { AuthRepositoryService } from '../repositories/auth-repository.service';
import { LoginForm } from '../interfaces/login-form.interface';
import { NavigationService } from '../../../shared/services/navigation.service';
import { UserStateService } from '../../../shared/services/user-state.service';
import { AuthStorageService } from './auth-storage.service';
import { AuthStateService } from './auth-state.service';
import { AuthResponse } from '../interfaces/login-response.interface';
import { Observable, tap } from 'rxjs';
import { User } from '../../../shared/interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authRepo = inject(AuthRepositoryService);
  private readonly authStorage = inject(AuthStorageService);
  private readonly authState = inject(AuthStateService);
  private readonly navigation = inject(NavigationService);
  private readonly userState = inject(UserStateService);

  public passwordMatch(registerForm: FormGroup<RegisterForm>): boolean {
    return registerForm.value.password1 === registerForm.value.password2;
  }

  public handleRegister(registerForm: FormGroup<RegisterForm>): void {
    const { email, password1: password } = registerForm.value;

    if (!email || !password) {
      return;
    }

    this.authRepo.register(email, password).subscribe({
      next: (response) => {
        if (response) {
          this.navigation.landingPage();
        }
      },
      error: (error) => console.error('Registration failed', error),
    });
  }

  public handleLogin(loginForm: FormGroup<LoginForm>): void {
    const { email, password } = loginForm.value;

    if (!email || !password) {
      return;
    }

    this.authRepo.login(email, password).subscribe({
      next: (response) => {
        if (response) {
          this.setStorage(response);
          this.updateAuthAndUserStates(response).subscribe({
            next: () => {
              this.navigation.todoListPage();
            },
          });
        } else {
          console.warn('Login failed, API returned no data.');
        }
      },
      error: (error) => console.error('Unexpected error', error),
    });
  }

  public authenticate(): void {
    const accesToken = this.authStorage.getAccessToken();
    const refreshToken = this.authStorage.getRefreshToken();

    if (!accesToken || !refreshToken) {
      return;
    }

    this.authState.setAuthTokens({ accesToken, refreshToken });

    this.authRepo.authenticate().subscribe({
      next: (response) => {
        if (response) {
          this.userState.setUser(response);
          this.refreshToken();
        } else {
          this.clearAuthData();
        }
      },
      error: (error) => console.error('Unexpected error', error),
    });
  }

  private refreshToken(): void {
    const refreshToken = this.authState.authTokens()?.refreshToken;

    if (!refreshToken) {
      return;
    }

    this.authRepo.refreshToken(refreshToken).subscribe({
      next: (response) => {
        if (response) {
          this.setStorage(response);
          this.updateAuthAndUserStates(response).subscribe();
        }
      },
      error: (error) => console.error('Refresh token failed', error),
    });
  }

  private updateAuthAndUserStates(
    response: AuthResponse
  ): Observable<User | null> {
    this.authState.setAuthTokens({
      accesToken: response.accessToken,
      refreshToken: response.refreshToken,
    });

    return this.authRepo.authenticate().pipe(
      tap((response) => {
        if (response) {
          this.userState.setUser(response);
        } else {
          this.clearAuthData();
        }
      })
    );
  }

  private setStorage(response: AuthResponse): void {
    this.authStorage.setAccessToken(response.accessToken);
    this.authStorage.setRefreshToken(response.refreshToken);
  }

  private clearAuthData(): void {
    this.authState.clearAuthToken();
    this.authStorage.clearTokens();
  }
}
