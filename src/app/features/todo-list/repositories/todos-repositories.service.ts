import { Injectable } from '@angular/core';
import { BaseRepositoryService } from '../../../core/bases/base-repository.service';
import { TodoItem } from '../interfaces/todo-item.interface';

@Injectable({
  providedIn: 'root',
})
export class TodosRepositoriesService extends BaseRepositoryService<TodoItem> {
  protected readonly resource = 'TodoIem';
}
