import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthRepositoryService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl: string = 'https://localhost:7115';

  async login(item: User): Promise<void> {
    await firstValueFrom(
      this.http.post<User>(`${this.baseUrl}/login?useCookies=true`, item)
    );
  }

  async register(item: User): Promise<void> {
    await firstValueFrom(
      this.http.post<User>(`${this.baseUrl}/register`, item)
    );
  }
}
