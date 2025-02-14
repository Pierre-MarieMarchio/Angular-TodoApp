import { Component, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { PrimaryButtonComponent } from '../../../../core/ui/primary-button/primary-button.component';
import { CardComponent } from '../../../../core/ui/card/card.component';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TodoForm } from '../../interfaces/todo-form.interface';

@Component({
  selector: 'app-todo-input',
  imports: [PrimaryButtonComponent, CardComponent, ReactiveFormsModule],
  templateUrl: './todo-input.component.html',
  styleUrl: './todo-input.component.scss',
})
export class TodoInputComponent {
  private readonly todosService = inject(TodosService);

  public todoForm = new FormGroup<TodoForm>({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
  });

  public createTodo() {
    const isValid = this.todoForm.valid;

    if (!isValid) {
      console.error('non valid todo');
      return;
    }

    this.todosService.createTodo(this.todoForm);
    this.todoForm.reset({ title: '' });
  }
}
