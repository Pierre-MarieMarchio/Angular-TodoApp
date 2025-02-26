import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthResponse } from '../interfaces/login-response.interface';
import { User } from '../../../shared/interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthRepositoryService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl: string = 'https://localhost:7115';

  public register(email: string, password: string): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/register`, { email: email, password: password })
      .pipe(
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

  public login(
    email: string,
    password: string
  ): Observable<AuthResponse | null> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/login`, {
        email: email,
        password: password,
      })
      .pipe(
        catchError((error) => {
          console.error('Error logging in user', error);
          return of(null);
        })
      );
  }

  public authenticate(): Observable<User | null> {
    return this.http.get<User>(`${this.baseUrl}/manage/info-custom`).pipe(
      catchError((error) => {
        console.error('Error logging in user', error);
        return of(null);
      })
    );
  }

  public refreshToken(token: string): Observable<AuthResponse | null> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/refresh`, { refreshToken: token })
      .pipe(
        catchError((error) => {
          console.error('Error logging in user', error);
          return of(null);
        })
      );
  }
}
