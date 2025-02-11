import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthRepositoryService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl: string = 'https://localhost:7115';

  public register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user).pipe(
      catchError((error) => {
        console.error('Error registering user', error);
        return of(null);
      }),
      map((response) => {
        if (response === null || Object.keys(response).length === 0) {
          return {
            success: true,
            message: 'Registration successful',
          };
        }
        return response;
      })
    );
  }

  public login(user: User): Observable<LoginResponse | null> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, user).pipe(
      tap((response) => console.log('API Response:', response)),
      catchError((error) => {
        console.error('Error logging in user', error);
        return of(null);
      })
    );
  }
}
