import { HttpClient } from '@angular/common/http';
import { inject, Injectable, resource, ResourceRef } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://localhost:7115/api';

  getObservable<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`);
  }

  postObservable<T>(endpoint: string, body: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body);
  }

  updateObservable<T>(endpoint: string, body: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body);
  }

  deleteObservable<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`);
  }

  getResource<T>(endpoint: string): ResourceRef<T | undefined> {
    return resource({
      loader: async () => await firstValueFrom(this.getObservable<T>(endpoint)),
    });
  }
}
