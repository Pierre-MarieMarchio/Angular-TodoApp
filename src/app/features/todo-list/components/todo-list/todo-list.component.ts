import { Component, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  private readonly todosService = inject(TodosService);
  readonly todosList = this.todosService.getTodos();
}
