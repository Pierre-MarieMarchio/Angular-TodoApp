import { inject, Injectable } from '@angular/core';
import { TodosRepositoriesService } from '../repositories/todos-repositories.service';
import { TodoItem } from '../interfaces/todo-item.interface';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private readonly todosRepo = inject(TodosRepositoriesService);

  public readonly todos = this.todosRepo.items;

  addUser() {
    const user: TodoItem = {
      title: 'string',
      isComplete: false,
      userId: '6f563ab1-bbe9-4882-a192-b81da8e20743',
    };

    this.todosRepo.create(user);
  }
}
