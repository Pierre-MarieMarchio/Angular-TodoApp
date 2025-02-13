import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, resource } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseRepositoryService<T> {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiURL;
  protected abstract readonly resource: string;

  protected listResource = resource({
    loader: async () =>
      await firstValueFrom(
        this.http.get<T[]>(`${this.baseUrl}/${this.resource}`)
      ),
  });

  items = computed<T[]>(() => this.listResource.value() ?? []);

  async getById(id: string): Promise<T> {
    return await firstValueFrom(
      this.http.get<T>(`${this.baseUrl}/${this.resource}/${id}`)
    );
  }

  async create(item: T): Promise<T> {
    const newItem = await firstValueFrom(
      this.http.post<T>(`${this.baseUrl}/${this.resource}`, item)
    );
    this.listResource.reload();
    return newItem;
  }

  async update(item: T & { id: string }): Promise<T> {
    const updatedItem = await firstValueFrom(
      this.http.put<T>(`${this.baseUrl}/${this.resource}/${item.id}`, item)
    );
    this.listResource.reload();
    return updatedItem;
  }

  async delete(id: string): Promise<void> {
    await firstValueFrom(
      this.http.delete<T>(`${this.baseUrl}/${this.resource}/${id}`)
    );
    this.listResource.reload();
  }
}
