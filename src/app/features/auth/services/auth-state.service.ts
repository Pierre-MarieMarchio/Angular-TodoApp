import { Injectable, signal, WritableSignal } from '@angular/core';
import { AuthTokens } from '../interfaces/auth-tokens.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private readonly authTokensSignal = signal<AuthTokens | null>(null);

  setAuthTokens(item: AuthTokens): void {
    this.authTokensSignal.set(item);
  }

  clearAuthToken(): void {
    this.authTokensSignal.set(null);
  }

  get authTokens(): WritableSignal<AuthTokens | null> {
    return this.authTokensSignal;
  }
}
