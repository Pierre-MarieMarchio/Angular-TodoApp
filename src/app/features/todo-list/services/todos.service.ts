import { inject, Injectable, Signal } from '@angular/core';
import { TodosRepositoriesService } from '../repositories/todos-repositories.service';
import { TodoItem } from '../interfaces/todo-item.interface';
import { TodoForm } from '../interfaces/todo-form.interface';
import { UserStateService } from '../../../shared/services/user-state.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private readonly todosRepo = inject(TodosRepositoriesService);
  private readonly user = inject(UserStateService);

  public getTodos(): Signal<TodoItem[]> {
    const todos = this.todosRepo.items;
    return todos;
  }

  public createTodo(item: FormGroup<TodoForm>): Promise<TodoItem> {
    let todo: TodoItem = {
      title: item.value.title!,
      isComplete: false,
      userId: this.user.user()?.id!,
    };

    return this.todosRepo.create(todo);
  }

  public updateTodo(item: TodoItem): Promise<TodoItem> {
    const response = this.todosRepo.update(item);
    return response;
  }

  public deleteTodo(id: string): Promise<void> {
    const response = this.todosRepo.delete(id);
    return response;
  }
}
