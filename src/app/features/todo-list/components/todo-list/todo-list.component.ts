import { Component, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from "../../../../core/ui/primary-button/primary-button.component";

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, PrimaryButtonComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  private readonly todosService = inject(TodosService);
  readonly todosList = this.todosService.todos;

  addtest() {
    this.todosService.addUser()
  }

  deletetest() {}
}
