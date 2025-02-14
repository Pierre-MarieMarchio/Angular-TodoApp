import {
  Component,
  
  inject,
  input,
  signal,
  
} from '@angular/core';
import { CardComponent } from '../../../../core/ui/card/card.component';
import { PrimaryButtonComponent } from '../../../../core/ui/primary-button/primary-button.component';
import { TodosService } from '../../services/todos.service';
import { TodoItem } from '../../interfaces/todo-item.interface';

@Component({
  selector: 'app-todo-item',
  imports: [CardComponent, PrimaryButtonComponent],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  private readonly todosService = inject(TodosService);

  public readonly todo = input<TodoItem>();
  public isEditing = false;
  public isComplete = signal<boolean>(this.todo()?.isComplete!);
  

  public enableEdit(): void {
    if (!this.todo()?.isComplete) {
      this.isEditing = true;
    }
  }

  public updateTodo(): void {
    const todo: TodoItem = {
      id: this.todo()?.id,
      title: this.todo()?.title!,
      isComplete: this.isComplete(),
      userId: this.todo()?.userId!,
    };
    this.todosService.updateTodo(todo);
  }

  public deleteTodo(): void {
    this.todosService.deleteTodo(this.todo()?.id!);
  }

  public updateTitle(newTitle: string): void {
    if (this.todo()) {
      this.todo()!.title = newTitle;
      this.isEditing = false;
      this.updateTodo();
    }
  }
}
