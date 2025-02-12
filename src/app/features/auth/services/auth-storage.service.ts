import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  private readonly localStorage = inject(LocalStorageService);

  setAccessToken(token: string): void {
    this.localStorage.setItem('accesToken', token);
  }

  getAccessToken() {
    return this.localStorage.getItem('accesToken');
  }

  setRefreshToken(token: string): void {
    this.localStorage.setItem('refreshToken', token);
  }

  getRefreshToken() {
    return this.localStorage.getItem('refreshToken');
  }

  clearTokens(): void {
    this.localStorage.removeItem('accesToken');
    this.localStorage.removeItem('refreshToken');
  }
}
